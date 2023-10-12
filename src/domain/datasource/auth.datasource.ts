import { LoginUserDto, UserFromLogin, UserFromRegister } from '../dtos'
import { RegisterUserDto } from '../dtos/auth/register-user.dto'

export abstract class AuthDatasource {
  abstract login (loginUserDto: LoginUserDto): Promise<UserFromLogin>
  abstract register (registerUserDto: RegisterUserDto): Promise<UserFromRegister>
}
