import { UpdateUserDto, UserToUpdate, UserUpdateProfileImage } from '../dtos'

export abstract class UserDatasource {
  abstract update (UpdateUserDto: UpdateUserDto): Promise<UserToUpdate>
  abstract updateImage (UpdateUserDto: UserUpdateProfileImage): Promise<UserUpdateProfileImage>
}
