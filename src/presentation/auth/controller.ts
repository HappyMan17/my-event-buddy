import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto"
import { AuthRepository, CustomError } from "../../domain";
import { JwtAdapter } from "../../config/jwtAdapter";
import { PostgresDb } from "../../data/postgres/postgres.database";
import { UserModel } from "../../data/postgres";
import { UserEntityMapper } from "../../infrastructure";

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
        token: await JwtAdapter.generateToken({id: user.user_id}),
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
  getUsers = async (req: Request, res: Response) => {
    const response = await UserModel.getUsers();
    if (response) {
      // mapping
      const users = response.map(user => UserEntityMapper.userEntityFromObject(user));
      res.status(200).json(users);
    } else {
      res.status(200).json(response);
    }
  }

}