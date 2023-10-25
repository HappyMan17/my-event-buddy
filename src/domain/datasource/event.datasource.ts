import { EventDto } from '../dtos'
import { EventEntity } from '../entities/event.entity'

export abstract class EventDatasource {
  abstract create (createEventDto: EventDto): Promise<EventEntity>
}
