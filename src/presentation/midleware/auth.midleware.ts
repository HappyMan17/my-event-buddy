import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwtAdapter";

export class AuthMiddleware {

  static validateJWT = async(req: Request, res: Response, next: NextFunction) => {

    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({error: 'No token provided'});
    if (authorization.startsWith('Bearer '))  return res.status(401).json({error: 'No Bearer token provided'});

    const token = authorization.split(' ').at(1) || '';

    try {

      const payload = await JwtAdapter.validateToken(token);
      if (!payload) return res.status(401).json({error: 'Invalid token provided'});

      // const user = await UserModel.findById(payload.id);

      // Payload added to the req body
      req.body.payload = payload;

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  }

}
