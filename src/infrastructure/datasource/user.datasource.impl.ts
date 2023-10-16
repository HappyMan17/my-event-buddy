import { UserModel } from '../../data/postgres'
import { UserDatasource, UpdateUserDto, CustomError } from '../../domain'
import { UserToUpdate } from '../../domain/dtos'

export class UserDatasourceImpl implements UserDatasource {
  async update (updateUserDto: UpdateUserDto): Promise<UserToUpdate> {
    const { user_id, user_name, nick_name, profile_image } = updateUserDto
    try {
      const newUserAttributes: UserToUpdate = {
        user_name,
        nick_name,
        profile_image,
        user_id
      }

      const user = await UserModel.updateUserById(newUserAttributes)

      return {
        user_id: user.user_id,
        user_name: user.user_name,
        nick_name: user.nick_name,
        profile_image: user.profile_image
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
