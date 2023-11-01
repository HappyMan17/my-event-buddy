import { EventDto, EventToUpdate, EventUpdateLogo } from '../dtos'
import { EventEntity } from '../entities/event.entity'

export abstract class EventRepository {
  abstract create (createEventDto: EventDto): Promise<EventEntity>
  abstract updateImage (eventDto: EventUpdateLogo): Promise<EventUpdateLogo>
  abstract getEvent (eventId: string): Promise<EventEntity>
  abstract updateEvent (eventToUpdate: EventToUpdate): Promise<EventToUpdate>
}
