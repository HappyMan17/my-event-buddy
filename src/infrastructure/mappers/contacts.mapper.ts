import { CustomError, ContactsEntity } from '../../domain'

export class ContactsEntityMapper {
  /**
   * Builds a ContactsEntity from the db response
   * @param object
   * @returns ContactsEntity
   */
  static contactsEntityFromObject (object: Record<string, any>): ContactsEntity {
    try {
      const { contact_id, user_id, friend_id } = object

      if (!contact_id) throw CustomError.badRequest('Missing user_')
      if (!user_id) throw CustomError.badRequest('Missing nameuser_')
      if (!friend_id) throw CustomError.badRequest('Missing nick name')

      return new ContactsEntity(
        contact_id,
        user_id,
        friend_id
      )
    } catch (error) {
      throw CustomError.internalServer('User not created.')
    }
  }
}
