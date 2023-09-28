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

    const {user_name, nick_name, email, password, profile_image} = registerUserDto;

    try {
      
      // 1. Verificar si el correo existe
      const exist = await UserModel.checkUserEmailAlreadyExist(email);

      if (exist) {
        throw CustomError.badRequest('Email already exist');
      }

      // 2. hash de contraseña.
      const newUser: UserEntity = {
        user_id: '',
        user_name,
        nick_name,
        email,
        password: this.hashPassword(password),
        profile_image,
        is_enable: false,
      };

      const userCreated = await UserModel.createUser(newUser);

      if (!userCreated) {
        throw CustomError.badRequest('User Not Created')
      }

      // 3. Mapear respuesta a nuestra entidad.
      // configurar para no retornar la contrasena
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
