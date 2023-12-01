import { ActivitiesDto, ActivityToUpdate, ActivityContact } from '../dtos'
import { ActivitiesEntity } from '../entities/activities.entity'

export abstract class ActivitiesRepository {
  abstract createAct (createActivitiesDto: ActivitiesDto): Promise<ActivitiesEntity>
  abstract getActivitiesByEventId (userId: string): Promise<ActivitiesEntity[]>
  abstract update (activitie: ActivityToUpdate): Promise<ActivityToUpdate>
  abstract getById (eventId: string): Promise<ActivitiesEntity[]>
  abstract getActivityContacts (eventId: string): Promise<ActivityContact[]>
  abstract addActivityContact (activityContact: ActivityContact): Promise<ActivityContact[]>
}
