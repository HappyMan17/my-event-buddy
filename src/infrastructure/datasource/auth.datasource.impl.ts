import { BcryptAdapter, UuidAdapter } from '../../config/'
import { UserModel } from '../../data/postgres'
import { AuthDatasource, RegisterUserDto, UserEntity, CustomError } from '../../domain/'
import { LoginUserDto, UserFromLogin, UserFromRegister } from '../../domain/dtos'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {
  constructor (
    // hidden dependency broken, but dependency used as default
    // now we have an option to use another passed throw the
    // constructor
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async register (registerUserDto: RegisterUserDto): Promise<UserFromRegister> {
    const { user_name, nick_name, email, password, profile_image } = registerUserDto

    try {
      // 1. Verificar si el correo existe
      const exist = await UserModel.checkUserEmailAlreadyExist(email)

      if (exist) {
        throw CustomError.badRequest('Email already exist')
      }

      // 2. hash de contraseña.
      const newUser = new UserEntity(
        UuidAdapter.generateV4uuid(),
        user_name,
        nick_name,
        email,
        this.hashPassword(password),
        true,
        profile_image
      )

      const userCreated = await UserModel.createUser(newUser)

      if (!userCreated) {
        throw CustomError.badRequest('User Not Created')
      }

      return {
        user_id: newUser.user_id,
        user_name,
        email,
        nick_name,
        profile_image
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async login (loginUserDto: LoginUserDto): Promise<UserFromLogin> {
    const { email, password } = loginUserDto
    try {
      // 1. Verificar si el correo existe
      const usersFound = await UserModel.getUserBy({ field: 'email', value: email })

      if (!usersFound) {
        throw CustomError.badRequest('invalid email or password')
      }

      const user = usersFound[0]

      if (!this.comparePassword(password, user.password)) {
        throw CustomError.badRequest('invalid password')
      }
      return {
        user_id: user.user_id,
        user_name: user.user_name,
        nick_name: user.nick_name,
        email
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
