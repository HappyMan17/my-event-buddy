import { Request, Response } from 'express'
import { CustomError, UserRepository } from '../../domain'
import { UpdateUserDto } from '../../domain/dtos'
import { renameFile } from '../../config'

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
    // console.log({ req, body: req.body, ms: 'update' })
    const [error, updateUserDto] = UpdateUserDto.create(req.body)

    if (error) return res.status(400).json({ error })

    this.userRepository.update(updateUserDto!)
      .then(async (user) => {
        res.status(200).json({
          user
        })
      })
      .catch(error => this.handleError(error, res))
  }

  updateUserProfileImage = async (req: Request, res: Response) => {
    // console.log({ req, body: req.body, ms: 'image' })

    const [error, updateUserDto] = UpdateUserDto.updateImage(req.body)

    if (error) return res.status(400).json({ error })

    const newFilePath = `./src/uploads/profile_images/userProfileImage_${updateUserDto?.user_id}.jpg`
    await renameFile('./src/uploads/profile_images/userProfileImage.jpg', newFilePath)

    updateUserDto!.profile_image = `userProfileImage_${updateUserDto?.user_id}.jpg`
    // console.log({ dto: updateUserDto!.profile_image })
    this.userRepository.updateUserImage(updateUserDto!)
      .then(async (user) => {
        res.status(200).json(user)
      })
      .catch(error => this.handleError(error, res))
  }
}
