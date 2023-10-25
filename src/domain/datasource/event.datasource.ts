import { CreateEventDto } from '../dtos'
import { EventEntity } from '../entities/event.entity'

export abstract class EventDatasource {
  abstract create (createEventDto: CreateEventDto): Promise<EventEntity>
}
