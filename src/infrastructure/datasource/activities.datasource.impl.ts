import { UuidAdapter } from '../../config'
import { ActivitiesModel } from '../../data/postgres'
import { CustomError, ActivitiesDatasource, ActivitiesEntity } from '../../domain'
import { ActivitiesDto, ActivityToUpdate } from '../../domain/dtos'
import { ActivitiesEntityMapper } from '../mappers'

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
        is_by_percentage,
        false
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

  async getById (eventId: string) {
    try {
      const activities = await ActivitiesModel.getActivitiesById(eventId)

      if (!activities || activities.length === 0) {
        throw CustomError.badRequest('Activitie Not Found')
      }

      return activities.map(activity => ActivitiesEntityMapper.activitiesEntityFromObject(activity))
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async getActivitiesByEventId (userId: string) {
    try {
      const activities = await ActivitiesModel.getActivitiesByEvent(userId)

      if (!activities) {
        throw CustomError.badRequest('Activitie Not Created')
      }

      return activities
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async update (updateActivityDto: ActivityToUpdate): Promise<ActivityToUpdate> {
    const {
      activity_id,
      description,
      total_activity_value,
      is_by_percentage,
      has_been_done
    } = updateActivityDto

    try {
      const newActivityData: ActivityToUpdate = {
        activity_id,
        description,
        total_activity_value,
        is_by_percentage,
        has_been_done
      }

      const activity = ActivitiesModel.updateActivity(newActivityData)

      if (!activity) {
        throw CustomError.badRequest('Activity not Updated')
      }

      return newActivityData
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
