import { AuthDatasource, AuthRepository, RegisterUserDto } from '../../domain'
import { UserFromRegister } from '../../domain/dtos'

export class AuthRepositoryImpl implements AuthRepository {
  constructor (
    private readonly authDatasource: AuthDatasource
  ) {}

  async register (registerrUserDto: RegisterUserDto): Promise<UserFromRegister> {
    return await new Promise((resolve) => {
      resolve(
        this.authDatasource.register(registerrUserDto)
      )
    })
  }
  // throw new Error("Method not implemented.");
}
