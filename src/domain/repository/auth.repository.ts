import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";



export abstract class AuthRepository {
  // abstract login (loginUserDto): Promise<UserEntity>
  abstract register( registerrUserDto: RegisterUserDto ): Promise<UserEntity>
}