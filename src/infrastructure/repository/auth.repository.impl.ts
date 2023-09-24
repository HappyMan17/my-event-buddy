import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {

  constructor(
    private readonly authDatasource: AuthDatasource,
  ){}

  register(registerrUserDto: RegisterUserDto): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      resolve(
        this.authDatasource.register(registerrUserDto)
      )
    })
  }
  // throw new Error("Method not implemented.");
}