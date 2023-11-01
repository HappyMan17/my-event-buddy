import { ActivitiesDatasource, ActivitiesEntity, ActivitiesRepository } from '../../domain'
import { ActivitiesDto, ActivityToUpdate } from '../../domain/dtos'

export class ActivitiesRepositoryImpl implements ActivitiesRepository {
  constructor (
    private readonly activitiesDatasource: ActivitiesDatasource
  ) {}

  async createAct (createActivitiesDto: ActivitiesDto): Promise<ActivitiesEntity> {
    return await new Promise((resolve) => {
      resolve(
        this.activitiesDatasource.createAct(createActivitiesDto)
      )
    })
  }

  async getActivitiesByEventId (userId: string): Promise<ActivitiesEntity[]> {
    return await new Promise((resolve) => {
      resolve(
        this.activitiesDatasource.getActivitiesByEventId(userId)
      )
    })
  }

  async update (activity: ActivityToUpdate): Promise<ActivityToUpdate> {
    return await new Promise((resolve) => {
      resolve(
        this.activitiesDatasource.update(activity)
      )
    })
  }

  async getById (eventId: string): Promise<ActivitiesEntity[]> {
    return await new Promise((resolve) => {
      resolve(
        this.activitiesDatasource.getById(eventId)
      )
    })
  }
}
