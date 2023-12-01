import { CustomError, ContactsEntity } from '../../domain'

export class ContactsEntityMapper {
  /**
   * Builds a ContactsEntity from the db response
   * @param object
   * @returns ContactsEntity
   */
  static contactsEntityFromObject (object: Record<string, any>): ContactsEntity {
    try {
      const {
        contact_id,
        user_id,
        friend_id,
        has_associated_event,
        has_pending_request,
        user_name,
        nick_name,
        email,
        profile_image
      } = object

      if (!contact_id) throw CustomError.badRequest('Missing contact id')
      if (!user_id) throw CustomError.badRequest('Missing user id')
      if (!friend_id) throw CustomError.badRequest('Missing friend id')

      return new ContactsEntity(
        user_id,
        friend_id,
        has_associated_event,
        has_pending_request,
        contact_id,
        user_name,
        nick_name,
        email,
        profile_image
      )
    } catch (error) {
      throw CustomError.internalServer('contact not found.')
    }
  }
}
