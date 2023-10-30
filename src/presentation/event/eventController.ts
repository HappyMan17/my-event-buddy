import { Request, Response } from 'express'
import { CustomError, EventRepository } from '../../domain'
import { EventDto } from '../../domain/dtos'
import { EventModel } from '../../data/postgres'
import { EventEntityMapper } from '../../infrastructure/mappers/event.mapper'
import { renameFile } from '../../config'

export class EventController {
  constructor (
    private readonly eventRepository: EventRepository
  ) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log(error)

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createEvent = async (req: Request, res: Response) => {
    const [error, createEventDto] = EventDto.create(req.body)

    if (error) return res.status(400).json({ error })

    this.eventRepository.create(createEventDto!)
      .then(async (event) => {
        res.json({
          event
        })
      })
      .catch(error => this.handleError(error, res))
  }

  getEvents = async (req: Request, res: Response): Promise<void> => {
    const response = await EventModel.getEvents()
    if (response && response.length > 0) {
      // mapping
      const events = response.map(event => EventEntityMapper.eventEntityFromObject(event))
      res.status(200).json(events)
    } else {
      res.status(200).json(response)
    }
  }

  getUserEvents = async (req: Request, res: Response): Promise<void> => {
    const response = await EventModel.getEventsByUserId(req.body.user_id)
    if (response && response.length > 0) {
      // mapping
      const events = response.map(event => EventEntityMapper.eventEntityFromObject(event))
      res.status(200).json(events)
    } else {
      res.status(200).json(response)
    }
  }

  updateImage = async (req: Request, res: Response) => {
    // console.log({ req, body: req.body, ms: 'image' })

    const [error, updateEventDto] = EventDto.updateImage(req.body)

    if (error) return res.status(400).json({ error })

    const newFilePath = `./src/uploads/event_logos/eventLogo_${updateEventDto?.event_id}.jpg`
    await renameFile('./src/uploads/profile_images/eventLogo.jpg', newFilePath)

    updateEventDto!.logo = `eventLogo__${updateEventDto?.event_id}.jpg`
    // console.log({ dto: updateUserDto!.profile_image })
    this.eventRepository.updateImage(updateEventDto!)
      .then(async (event) => {
        res.status(200).json(event)
      })
      .catch(error => this.handleError(error, res))
  }
}
