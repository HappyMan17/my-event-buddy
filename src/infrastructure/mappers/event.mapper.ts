import { CustomError, EventEntity } from '../../domain'
import { EventContact } from '../../domain/dtos'

export class EventEntityMapper {
  /**
   * Builds a UserEntity from the db response
   * @param object
   * @returns UserEntity
   */
  static eventEntityFromObject (object: Record<string, any>): EventEntity {
    try {
      const { event_id, event_date, user_id, event_name, description, type, logo, has_activity, has_been_done } = object

      if (!event_id) throw CustomError.badRequest('Missing event id')
      if (!event_date) throw CustomError.badRequest('Missing event date')
      if (!user_id) throw CustomError.badRequest('Missing user id')
      if (!event_name) throw CustomError.badRequest('Missing event name')
      if (!description) throw CustomError.badRequest('Missing event description')
      if (!type) throw CustomError.badRequest('Missing event type')

      return new EventEntity(
        event_id,
        event_date,
        user_id,
        event_name,
        description,
        type,
        logo,
        has_activity,
        has_been_done
      )
    } catch (error) {
      throw CustomError.internalServer('Missing some event fields.')
    }
  }

  /**
   * Builds an event_contact entity from the db response
   * @param object
   * @returns event_contact
   */
  static eventContactFromObject (object: Record<string, any>): EventContact {
    try {
      const { event_id, contact_id } = object

      if (!event_id) throw CustomError.badRequest('Missing event id')
      if (!contact_id) throw CustomError.badRequest('Missing contact id')

      return {
        event_id,
        contact_id
      }
    } catch (error) {
      throw CustomError.internalServer('Missing some event fields.')
    }
  }
}
