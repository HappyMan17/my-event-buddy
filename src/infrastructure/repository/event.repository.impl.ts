import { EventDatasource, EventEntity, EventRepository } from '../../domain'
import { EventDto, EventUpdateLogo } from '../../domain/dtos'

export class EventRepositoryImpl implements EventRepository {
  constructor (
    private readonly eventDatasource: EventDatasource
  ) {}

  async create (createEventDto: EventDto): Promise<EventEntity> {
    return await new Promise((resolve) => {
      resolve(
        this.eventDatasource.create(createEventDto)
      )
    })
  }

  async updateImage (eventDto: EventUpdateLogo): Promise<EventUpdateLogo> {
    return await new Promise((resolve) => {
      resolve(
        this.eventDatasource.updateImage(eventDto)
      )
    })
  }

  async getEvent (eventId: string): Promise<EventEntity> {
    return await new Promise((resolve) => {
      resolve(
        this.eventDatasource.getEvent(eventId)
      )
    })
  }
}
