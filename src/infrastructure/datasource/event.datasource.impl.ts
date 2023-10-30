import { UuidAdapter } from '../../config'
import { EventModel } from '../../data/postgres'
import { CustomError, EventDatasource, EventEntity } from '../../domain'
import { EventDto, EventUpdateLogo } from '../../domain/dtos'
import { EventEntityMapper } from '../mappers'

export class EventDatasourceImpl implements EventDatasource {
  async create (createEventDto: EventDto): Promise<EventEntity> {
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
        false,
        false
      )

      const eventCreated = await EventModel.create(newEvent)

      if (!eventCreated) {
        throw CustomError.badRequest('Event Not Created')
      }

      return new EventEntity(
        newEvent.event_id,
        user_id,
        event_name,
        description,
        type,
        logo,
        false,
        false
      )
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async updateImage (eventDto: EventUpdateLogo): Promise<EventUpdateLogo> {
    const { event_id, logo } = eventDto
    try {
      const eventLogoAttributes: EventUpdateLogo = {
        event_id,
        logo
      }

      const event = await EventModel.updateEventLogo(eventLogoAttributes)

      if (!event) {
        throw CustomError.badRequest('Event Not Updated')
      }

      return {
        event_id,
        logo
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async getEvent (eventId: string): Promise<EventEntity> {
    try {
      const event = await EventModel.getEventById(eventId)

      if (!event || event.length === 0) {
        throw CustomError.badRequest('Event Not found')
      }

      return EventEntityMapper.eventEntityFromObject(event[0])
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
