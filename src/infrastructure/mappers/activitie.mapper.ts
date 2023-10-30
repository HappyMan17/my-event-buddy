import { ActivitiesEntity, CustomError } from '../../domain'

export class ActivitiesEntityMapper {
  /**
   * Builds a UserEntity from the db response
   * @param object
   * @returns UserEntity
   */
  static activitiesEntityFromObject (object: Record<string, any>): ActivitiesEntity {
    try {
      const { activitie_id, event_id, user_id, description, total_activity_value, is_by_percentage } = object

      if (!description) throw CustomError.badRequest('Missing description')
      if (!total_activity_value) throw CustomError.badRequest('Missing activity total value')

      return new ActivitiesEntity(
        activitie_id,
        event_id,
        user_id,
        description,
        total_activity_value,
        is_by_percentage
      )
    } catch (error) {
      throw CustomError.internalServer('Missing some activity fields.')
    }
  }
}
