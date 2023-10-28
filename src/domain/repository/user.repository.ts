import { UpdateUserDto, UserToUpdate, UserUpdateProfileImage } from '../dtos/'

export abstract class UserRepository {
  abstract update (UpdateUserDto: UpdateUserDto): Promise<UserToUpdate>
  abstract updateUserImage (UpdateUserDto: UserUpdateProfileImage): Promise<UserUpdateProfileImage>
}
