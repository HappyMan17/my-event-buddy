import { UuidAdapter } from '../../config'
import { ActivitiesModel } from '../../data/postgres'
import { CustomError, ActivitiesDatasource, ActivitiesEntity } from '../../domain'
import { ActivitiesDto } from '../../domain/dtos'

export class ActivitiesDatasourceImpl implements ActivitiesDatasource {
  async createAct (createActivitiesDto: ActivitiesDto): Promise<ActivitiesEntity> {
    const { event_id, user_id, description, total_activity_value, is_by_percentage } = createActivitiesDto

    try {
      // 1. Se pueden crear eventos con el mismo nombre?

      // 2. Event.
      const newActivities = new ActivitiesEntity(
        UuidAdapter.generateV4uuid(),
        event_id,
        user_id,
        description,
        total_activity_value,
        is_by_percentage
      )

      const activitieCreated = await ActivitiesModel.createAct(newActivities)

      if (!activitieCreated) {
        throw CustomError.badRequest('Activitie Not Created')
      }

      return newActivities
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
