import { UpdateUserDto, UserToUpdate, UserUpdateProfileImage } from '../dtos'
import { UserEntity } from '../entities/user.entity'

export abstract class UserDatasource {
  abstract getUserById (getUserDto: { user_id: string }): Promise<UserEntity>
  abstract update (UpdateUserDto: UpdateUserDto): Promise<UserToUpdate>
  abstract updateImage (UpdateUserDto: UserUpdateProfileImage): Promise<UserUpdateProfileImage>
}
