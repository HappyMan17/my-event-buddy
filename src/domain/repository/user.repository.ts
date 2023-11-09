import { UpdateUserDto, UserToUpdate, UserUpdateProfileImage } from '../dtos/'
import { UserEntity } from '../entities/user.entity'

export abstract class UserRepository {
  abstract getUserById (getUserDto: { user_id: string }): Promise<UserEntity>
  abstract getUserBy (object: { key: string, value: string }): Promise<UserEntity>
  abstract update (UpdateUserDto: UpdateUserDto): Promise<UserToUpdate>
  abstract updateUserImage (UpdateUserDto: UserUpdateProfileImage): Promise<UserUpdateProfileImage>
}
