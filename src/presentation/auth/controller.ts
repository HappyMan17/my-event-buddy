import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto"
import { AuthRepository, CustomError } from "../../domain";
import { JwtAdapter } from "../../config/jwtAdapter";
import { PostgresDb } from "../../data/postgres/postgres.database";

export class AuthController {
    constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error); //Winston
    return res.status(500).json({error: 'Internal Server Error'});
  }

  // Register User
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    
    if (error) return res.status(400).json({error});

    this.authRepository.register(registerUserDto!)
    .then(async (user) => {
      
      res.json({
        user,
        token: await JwtAdapter.generateToken({id: user.id}),
      });

    })
    .catch(error => this.handleError(error, res))

    res.json(registerUserDto);
  }

  // Login user
  loginUser = async (req: Request, res: Response) => {
    res.json('loginUser controller')
  }

  // Get user
  getUser = async (req: Request, res: Response) => {
    const response = await PostgresDb.query({
      query: 'SELECT * FROM users;',
      params: [],
    });
    console.log({response})
    // UserModel.find().then(users => res.json(users, token: req.body.token))

  }

}