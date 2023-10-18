import { UpdateUserDto, UserToUpdate } from '../dtos/'

export abstract class UserRepository {
  abstract update (UpdateUserDto: UpdateUserDto): Promise<UserToUpdate>
}
