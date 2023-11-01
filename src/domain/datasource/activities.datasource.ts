import { ActivitiesDto } from '../dtos'
import { ActivitiesEntity } from '../entities/activities.entity'

export abstract class ActivitiesDatasource {
  abstract createAct (createActivitiesDto: ActivitiesDto): Promise<ActivitiesEntity>
  abstract getActivitiesByEventId (userId: string): Promise<ActivitiesEntity[]>
  abstract update (updateActivityDto: ActivitiesDto): Promise<ActivitiesEntity>
  abstract getById (eventId: string): Promise<ActivitiesEntity[]>
}
