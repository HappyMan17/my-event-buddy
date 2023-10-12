import { RegisterUserDto, UserFromRegister } from '../dtos/'

export abstract class AuthRepository {
  // abstract login (loginUserDto): Promise<UserEntity>
  abstract register (registerrUserDto: RegisterUserDto): Promise<UserFromRegister>
}
