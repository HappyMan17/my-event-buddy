import { ActivitiesEntity, CustomError } from '../../domain'
import { ActivityContact } from '../../domain/dtos'

export class ActivitiesEntityMapper {
  /**
   * Builds a UserEntity from the db response
   * @param object
   * @returns UserEntity
   */
  static activitiesEntityFromObject (object: Record<string, any>): ActivitiesEntity {
    try {
      const { activity_id, event_id, user_id, description, total_activity_value, is_by_percentage, has_been_done } = object

      if (!description) throw CustomError.badRequest('Missing description')
      if (!total_activity_value) throw CustomError.badRequest('Missing activity total value')

      return new ActivitiesEntity(
        activity_id,
        event_id,
        user_id,
        description,
        total_activity_value,
        is_by_percentage,
        has_been_done
      )
    } catch (error) {
      throw CustomError.internalServer('Missing some activity fields.')
    }
  }

  /**
   * Builds an event_contact entity from the db response
   * @param object
   * @returns event_contact
   */
  static activityContactFromObject (object: Record<string, any>): ActivityContact {
    try {
      const { activity_id, user_id } = object
      if (!activity_id) throw CustomError.badRequest('Missing activity id')
      if (!user_id) throw CustomError.badRequest('Missing contact id')
      return {
        activity_id,
        user_id
      }
    } catch (error) {
      throw CustomError.internalServer('Missing some event fields.')
    }
  }
}
