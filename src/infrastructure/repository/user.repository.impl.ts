import { UserDatasource, UserRepository } from '../../domain'
import { UpdateUserDto, UserToUpdate } from '../../domain/dtos'

export class UserRepositoryImpl implements UserRepository {
  constructor (
    private readonly userDatasource: UserDatasource
  ) {}

  async update (updateUserDto: UpdateUserDto): Promise<UserToUpdate> {
    return await new Promise((resolve) => {
      resolve(
        this.userDatasource.update(updateUserDto)
      )
    })
  }
}
