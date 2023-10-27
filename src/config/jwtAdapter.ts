import jwt from 'jsonwebtoken'
import { envs } from './envs'

const JWT_SEED = envs.JWT_SEED

export interface PayloadType {
  id: string
}

export class JwtAdapter {
  static async generateToken (
    payload: any,
    duration: string = '2h'
  ): Promise<string | null> {
    return await new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) {
          resolve(null)
          return
        }
        resolve(token!)
      })
    })
  }

  /**
   * Decodes the token to get the payload
   * @param token
   * @returns payload
   */
  static async validateToken<T> (token: string): Promise<T | null> {
    return await new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) {
          resolve(null)
          return
        }
        resolve(decoded as T)
      })
    })
  }
}
