import { ActivitiesDto } from '../dtos'
import { ActivitiesEntity } from '../entities/activities.entity'

export abstract class ActivitiesRepository {
  abstract createAct (createActivitiesDto: ActivitiesDto): Promise<ActivitiesEntity>
  abstract getActivitiesByEventId (userId: string): Promise<ActivitiesEntity[]>
  abstract update (activitie: ActivitiesDto): Promise<ActivitiesEntity>
  abstract getById (activityId: string): Promise<ActivitiesEntity>
}
