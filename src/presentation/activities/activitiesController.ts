import { Request, Response } from 'express'
import { ActivitiesRepository, CustomError } from '../../domain'
import { ActivitiesDto } from '../../domain/dtos'
import { ActivitiesModel } from '../../data/postgres'
import { ActivitiesEntityMapper } from '../../infrastructure/mappers'

export class ActivitiesController {
  constructor (
    private readonly activitieRepository: ActivitiesRepository
  ) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log(error)

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createActivities = async (req: Request, res: Response) => {
    const [error, createActivitieDto] = ActivitiesDto.createAct(req.body)

    if (error) return res.status(400).json({ error })

    this.activitieRepository.createAct(createActivitieDto!)
      .then(async (activity) => {
        res.json({
          activity
        })
      })
      .catch(error => this.handleError(error, res))
  }

  getActivities = async (req: Request, res: Response): Promise<void> => {
    const response = await ActivitiesModel.getActivities()
    if (response) {
      // mapping
      const activities = response.map(event => ActivitiesEntityMapper.activitiesEntityFromObject(event))
      res.status(200).json(activities)
    } else {
      res.status(400).json({ message: 'error' })
    }
  }
}
