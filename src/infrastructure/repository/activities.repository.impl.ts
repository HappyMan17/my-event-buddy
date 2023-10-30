import { ActivitiesDatasource, ActivitiesEntity, ActivitiesRepository } from '../../domain'
import { ActivitiesDto } from '../../domain/dtos'

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

  async getActivitiesByUserId (userId: string): Promise<ActivitiesEntity[]> {
    return await new Promise((resolve) => {
      resolve(
        this.activitiesDatasource.getActivitiesByUserId(userId)
      )
    })
  }
}
