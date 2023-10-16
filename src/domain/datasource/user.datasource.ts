import { UpdateUserDto, UserToUpdate } from '../dtos'

export abstract class UserDatasource {
  abstract update (UpdateUserDto: UpdateUserDto): Promise<UserToUpdate>
}
