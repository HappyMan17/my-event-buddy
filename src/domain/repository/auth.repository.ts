import { RegisterUserDto, UserFromLogin, UserFromRegister, LoginUserDto } from '../dtos/'

export abstract class AuthRepository {
  abstract login (loginUserDto: LoginUserDto): Promise<UserFromLogin>
  abstract register (registerrUserDto: RegisterUserDto): Promise<UserFromRegister>
}
