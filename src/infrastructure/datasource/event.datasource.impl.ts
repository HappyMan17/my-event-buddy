import { UuidAdapter } from '../../config'
import { EventModel } from '../../data/postgres'
import { CustomError, EventDatasource, EventEntity } from '../../domain'
import { EventContact, EventDto, EventToUpdate, EventUpdateLogo } from '../../domain/dtos'
import { EventEntityMapper } from '../mappers'

export class EventDatasourceImpl implements EventDatasource {
  async addEventContact (eventContact: EventContact): Promise<EventContact[]> {
    try {
      const newEventContact: EventContact = {
        event_contacts_id: UuidAdapter.generateV4uuid(),
        event_id: eventContact.event_id,
        contact_id: eventContact.contact_id
      }
      const response = await EventModel.addContactToEvent(newEventContact)

      if (!response) {
        throw CustomError.badRequest('Contacts Not added to event')
      }

      return response
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async getEventContacts (eventId: string): Promise<EventContact[]> {
    try {
      const response = await EventModel.getEventContacts(eventId)

      if (!response) {
        throw CustomError.badRequest('Contacts Not found')
      }

      const contacts = response.map(contact => EventEntityMapper.eventContactFromObject(contact))

      return contacts
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async create (createEventDto: EventDto): Promise<EventEntity> {
    const { user_id, event_date, event_name, description, type, logo } = createEventDto

    try {
      // 1. Se pueden crear eventos con el mismo nombre?
      // console.log({ date: event_date, type: typeof event_date })
      // 2. Event.
      const newEvent = new EventEntity(
        UuidAdapter.generateV4uuid(),
        event_date,
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
        event_date,
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

  async updateEvent (eventToUpdate: EventToUpdate): Promise<EventToUpdate> {
    const { event_id, event_date, event_name, description, type, has_activity, has_been_done } = eventToUpdate

    try {
      // 1. Se pueden crear eventos con el mismo nombre?

      // 2. Event.
      const newEvent = {
        event_id,
        event_date,
        event_name,
        description,
        type,
        has_activity,
        has_been_done
      }

      const eventCreated = await EventModel.update(newEvent)

      if (!eventCreated) {
        throw CustomError.badRequest('Event Not Created')
      }

      return newEvent
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
