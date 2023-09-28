import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from '../../domain'

export class AuthRepositoryImpl implements AuthRepository {
  constructor (
    private readonly authDatasource: AuthDatasource
  ) {}

  async register (registerrUserDto: RegisterUserDto): Promise<UserEntity> {
    return await new Promise((resolve) => {
      resolve(
        this.authDatasource.register(registerrUserDto)
      )
    })
  }
  // throw new Error("Method not implemented.");
}
