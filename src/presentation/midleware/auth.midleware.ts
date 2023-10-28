import { NextFunction, Request, Response } from 'express'
import { JwtAdapter, PayloadType } from '../../config/'

export class AuthMiddleware {
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    console.log({ ms: 'auth' })
    const authorization = req.header('Authorization')

    if (!authorization) return res.status(401).json({ error: 'No token provided' })

    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No Bearer token provided' })
    }

    const token = authorization.split(' ').at(1) ?? ''

    try {
      const payload = await JwtAdapter.validateToken<PayloadType>(token)
      // console.log({ payload })
      if (!payload) return res.status(401).json({ error: 'Invalid token provided' })
      // console.log({ payload })
      // const user = await UserModel.getUserById(payload.id);
      // if (!user) return res.status(401).json({ error: 'invalid token - user not found' })

      // Payload added to the req body
      req.body.user_id = payload.id

      next()
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
