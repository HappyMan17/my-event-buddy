import { EventDatasource, EventEntity, EventRepository } from '../../domain'
import { EventDto } from '../../domain/dtos'

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
}
