import { EventDatasource, EventEntity, EventRepository } from '../../domain'
import { CreateEventDto } from '../../domain/dtos'

export class EventRepositoryImpl implements EventRepository {
  constructor (
    private readonly eventDatasource: EventDatasource
  ) {}

  async create (createEventDto: CreateEventDto): Promise<EventEntity> {
    return await new Promise((resolve) => {
      resolve(
        this.eventDatasource.create(createEventDto)
      )
    })
  }
}
