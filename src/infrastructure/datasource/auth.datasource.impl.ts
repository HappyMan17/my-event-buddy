import { BcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../data/postgres";
import { AuthDatasource } from "../../domain/";
import { RegisterUserDto } from "../../domain/";
import { UserEntity } from "../../domain/";
import { CustomError } from "../../domain/";
import { UserEntityMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

  constructor(
    // hidden dependency broken, but dependency used as default
    // now we have an option to use another passed throw the 
    // constructor
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const {user_name, nick_name, email, password} = registerUserDto;

    try {
      
      // 1. Verificar si el correo existe
      const exist = await UserModel.checkUserEmailAlreadyExist(email);

      if (exist) {
        throw CustomError.badRequest('Email already exist');
      }

      // await createNewUser({name, email, password})
      // 2. hash de contraseña.
      // const user = await UserModel.create({
      //   name, 
      //   email, 
      //   password: this.hashPassword(password),
      // })
      // 3. Mapear respuesta a nuestra entidad.
      //use the UserEntityMapper
      return UserEntityMapper
      .userEntityFromObject({
        user_name,
        nick_name,
        email,
        password,
      });

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer()
    }

  }
}
