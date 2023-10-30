import { ActivitiesDto } from '../dtos'
import { ActivitiesEntity } from '../entities/activities.entity'

export abstract class ActivitiesDatasource {
  abstract createAct (createActivitiesDto: ActivitiesDto): Promise<ActivitiesEntity>
}
