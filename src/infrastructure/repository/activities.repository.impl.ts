import { ActivitiesDatasource, ActivitiesEntity, ActivitiesRepository } from '../../domain'
import { ActivitiesDto, ActivityContact, ActivityToUpdate } from '../../domain/dtos'

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

  async getActivityContacts (activityId: string): Promise<ActivityContact[]> {
    return await new Promise((resolve) => {
      resolve(
        this.activitiesDatasource.getActivityContacts(activityId)
      )
    })
  }

  async addActivityContact (activityContact: ActivityContact): Promise<ActivityContact[]> {
    return await new Promise((resolve) => {
      resolve(
        this.activitiesDatasource.addActivityContact(activityContact)
      )
    })
  }
}
