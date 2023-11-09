import { UserModel } from '../../data/postgres'
import { UserDatasource, UpdateUserDto, CustomError, UserEntity } from '../../domain'
import { UserToUpdate, UserUpdateProfileImage } from '../../domain/dtos'
import { UserEntityMapper } from '../mappers'

export class UserDatasourceImpl implements UserDatasource {
  async getUserById (getUserDto: { user_id: string }): Promise<UserEntity> {
    const { user_id } = getUserDto
    try {
      const user = await UserModel.getUserBy({ field: 'user_id', value: user_id })

      if (!user) {
        throw CustomError.badRequest('Could not get the user')
      }

      const users = user.map(user => UserEntityMapper.userEntityFromObject(user))

      return users[0]
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async getUserBy (object: { key: string, value: string }): Promise<UserEntity> {
    try {
      const user = await UserModel.getUserBy({ field: object.key, value: object.value })

      if (!user) {
        throw CustomError.badRequest('Could not get the user')
      }

      const users = user.map(user => UserEntityMapper.userEntityFromObject(user))

      return users[0]
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
