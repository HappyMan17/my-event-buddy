import { Request, Response } from 'express'
import { CustomError, UserRepository } from '../../domain/'
import { UpdateUserDto } from '../../domain/dtos'

export class UserController {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log(error) // Winston recommended

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  /**
   * Update user
   * @param req
   * @param res
   * @returns http response
   */
  updateUser = async (req: Request, res: Response) => {
    const [error, updateUserDto] = UpdateUserDto.create(req.body)

    if (error) return res.status(400).json({ error })

    this.userRepository.update(updateUserDto!)
      .then(async (user) => {
        res.json({
          user
        })
      })
      .catch(error => this.handleError(error, res))
  }
}
