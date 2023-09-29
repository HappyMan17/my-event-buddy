import { CustomError, UserEntity } from '../../domain'

export class UserEntityMapper {
  /**
   * Builds a UserEntity from the db response
   * @param object
   * @returns UserEntity
   */
  static userEntityFromObject (object: Record<string, any>): UserEntity {
    try {
      const { user_id, user_name, email, password, nick_name, profile_image } = object

      if (!user_id) throw CustomError.badRequest('Missing user_')
      if (!user_name) throw CustomError.badRequest('Missing nameuser_')
      if (!nick_name) throw CustomError.badRequest('Missing nick name')
      if (!email) throw CustomError.badRequest('Missing email')
      if (!password) throw CustomError.badRequest('Missing password')

      return new UserEntity(
        user_id,
        nick_name,
        user_name,
        email,
        password,
        true,
        profile_image
      )
    } catch (error) {
      throw CustomError.internalServer('User not created.')
    }
  }
}
