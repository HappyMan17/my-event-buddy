import { EventContact, EventDto, EventToUpdate, EventUpdateLogo } from '../dtos'
import { EventEntity } from '../entities/event.entity'

export abstract class EventDatasource {
  abstract create (createEventDto: EventDto): Promise<EventEntity>
  abstract updateImage (eventDto: EventUpdateLogo): Promise<EventUpdateLogo>
  abstract getEvent (eventId: string): Promise<EventEntity>
  abstract updateEvent (event: EventToUpdate): Promise<EventToUpdate>
  abstract getEventContacts (eventId: string): Promise<EventContact[]>
  abstract addEventContact (eventContact: EventContact): Promise<EventContact[]>
}
