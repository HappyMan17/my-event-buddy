import { UserModel } from '../../data/postgres'
import { UserDatasource, UpdateUserDto, CustomError, UserEntity } from '../../domain'
import { UserToUpdate, UserUpdateProfileImage } from '../../domain/dtos'
import { UserEntityMapper } from '../mappers'

export class UserDatasourceImpl implements UserDatasource {
  async getUserById (getUserDto: { user_id: string }): Promise<UserEntity[]> {
    const { user_id } = getUserDto
    try {
      const user = await UserModel.getUserBy({ field: 'id', value: user_id })
      console.log({ user }) // todo remove

      if (!user) {
        throw CustomError.badRequest('User Not Updated')
      }

      const users = user.map(user => UserEntityMapper.userEntityFromObject(user))

      return users
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

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

      if (!user) {
        throw CustomError.badRequest('User Not Updated')
      }

      return {
        user_id,
        user_name,
        nick_name,
        profile_image
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async updateImage (updateUserDto: UserUpdateProfileImage): Promise<UserUpdateProfileImage> {
    const { user_id, profile_image } = updateUserDto
    try {
      const newUserAttributes: UserUpdateProfileImage = {
        profile_image,
        user_id
      }

      const user = await UserModel.updateUserImageById(newUserAttributes)

      if (!user) {
        throw CustomError.badRequest('User Not Updated')
      }

      return {
        user_id,
        profile_image
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
