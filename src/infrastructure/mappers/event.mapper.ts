import { CustomError, EventEntity } from '../../domain'

export class EventEntityMapper {
  /**
   * Builds a UserEntity from the db response
   * @param object
   * @returns UserEntity
   */
  static eventEntityFromObject (object: Record<string, any>): EventEntity {
    try {
      const { event_id, user_id, event_name, description, type, logo, has_activity, has_been_done } = object

      if (!event_id) throw CustomError.badRequest('Missing event id')
      if (!user_id) throw CustomError.badRequest('Missing user id')
      if (!event_name) throw CustomError.badRequest('Missing event name')
      if (!description) throw CustomError.badRequest('Missing event description')
      if (!type) throw CustomError.badRequest('Missing event type')

      return new EventEntity(
        event_id,
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
}
