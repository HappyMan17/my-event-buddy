import { AuthDatasource, AuthRepository, RegisterUserDto } from '../../domain'
import { LoginUserDto, UserFromLogin, UserFromRegister } from '../../domain/dtos'

export class AuthRepositoryImpl implements AuthRepository {
  constructor (
    private readonly authDatasource: AuthDatasource
  ) {}

  async login (loginUserDto: LoginUserDto): Promise<UserFromLogin> {
    return await new Promise((resolve) => {
      resolve(
        this.authDatasource.login(loginUserDto)
      )
    })
  }

  async register (registerrUserDto: RegisterUserDto): Promise<UserFromRegister> {
    return await new Promise((resolve) => {
      resolve(
        this.authDatasource.register(registerrUserDto)
      )
    })
  }
  // throw new Error("Method not implemented.");
}
