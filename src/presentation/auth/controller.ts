// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Request, Response } from 'express'
import { LoginUserDto, RegisterUserDto } from '../../domain/dtos/'
import { AuthRepository, CustomError } from '../../domain'
import { JwtAdapter } from '../../config/'
import { UserModel } from '../../data/postgres'
import { UserEntityMapper } from '../../infrastructure'

export class AuthController {
  constructor (
    private readonly authRepository: AuthRepository
  ) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log(error) // Winston recommended

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  /**
   * Register user
   * @param req
   * @param res
   * @returns http response
   */
  registerUser = (req: Request, res: Response) => {
    // using dto to filter the req.body
    const [error, registerUserDto] = RegisterUserDto.create(req.body)

    // attributes not found in the dto:
    if (error) return res.status(400).json({ error })

    // Register user:
    this.authRepository.register(registerUserDto!)
      .then(async (user) => {
        res.json({
          user
          // token: await JwtAdapter.generateToken({ id: user.user_id })
        })
      })
      .catch(error => this.handleError(error, res))
  }

  /**
   * Loggin user //todo
   * @param req
   * @param res
   * @returns http response
   */
  loginUser = async (req: Request, res: Response) => {
    // using dto to filter the req.body
    const [error, loginUserDto] = LoginUserDto.create(req.body)

    // attributes not found in the dto:
    if (error) return res.status(400).json({ error })

    // Register user:
    this.authRepository.login(loginUserDto!)
      .then(async (user) => {
        res.json({
          user,
          token: await JwtAdapter.generateToken({ id: user.user_id })
        })
      })
      .catch(error => this.handleError(error, res))
  }

  /**
  * Get all users
  * @param req
  * @param res
  * @returns http response
  */
  getUsers = async (req: Request, res: Response): Promise<void> => {
    const response = await UserModel.getUsers()
    if (response) {
      // mapping
      const users = response.map(user => UserEntityMapper.userEntityFromObject(user))
      res.status(200).json(users)
    } else {
      res.status(200).json(response)
    }
  }
}
