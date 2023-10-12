import { UserFromRegister } from '../dtos'
import { RegisterUserDto } from '../dtos/auth/register-user.dto'

export abstract class AuthDatasource {
  // abstract login (loginUserDto): Promise<UserEntity>
  abstract register (registerUserDto: RegisterUserDto): Promise<UserFromRegister>
}
