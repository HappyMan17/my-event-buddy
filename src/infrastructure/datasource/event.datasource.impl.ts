import { UuidAdapter } from '../../config'
import { EventModel } from '../../data/postgres'
import { CustomError, EventDatasource, EventEntity } from '../../domain'
import { CreateEventDto } from '../../domain/dtos'

export class EventDatasourceImpl implements EventDatasource {
  async create (createEventDto: CreateEventDto): Promise<EventEntity> {
    const { user_id, event_name, description, type, logo } = createEventDto

    try {
      // 1. Se pueden crear eventos con el mismo nombre?

      // 2. Event.
      const newEvent = new EventEntity(
        UuidAdapter.generateV4uuid(),
        user_id,
        event_name,
        description,
        type,
        logo,
        false
      )

      const eventCreated = await EventModel.create(newEvent)

      if (!eventCreated) {
        throw CustomError.badRequest('Event Not Created')
      }

      return new EventEntity(
        eventCreated[0].event_id,
        user_id,
        event_name,
        description,
        type,
        logo,
        false
      )
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
