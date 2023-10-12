import { UserEntity } from '../../../domain'
import { PostgresDb } from '../postgres.database'

interface GetUserByProps {
  field: string;
  value: any;
}

export class UserModel {
  static async getUsers (): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM users;',
        params: []
      })
      return response
    } catch (error) {
      return null
    }
  }

  static async getUserBy ({ field, value }: GetUserByProps): Promise<any | null> {
    try {
      const response = await PostgresDb.query({
        query: `SELECT * FROM users WHERE ${field} = $1;`,
        params: [value]
      })

      if (response?.length === 0) {
        return null
      }
      return response
    } catch (error) {
      return null
    }
  }

  static async checkUserEmailAlreadyExist (email: string): Promise<boolean> {
    try {
      const response = await PostgresDb.query({
        query: 'SELECT * FROM users WHERE email = $1;',
        params: [email]
      })

      if (!response) {
        return false
      }
      if (response.length > 0) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  static async updateUserById (id: string, user: UserEntity): Promise<any | null> {
    try {
      const response = await PostgresDb.query({
        query: `
        UPDATE users 
        SET 
          user_name = $1,
          nick_name = $2,
          email = $3,
          password = $4,
          is_enable = $5,
          profile_image = $6
        WHERE id = $7;
      `,
        params: [
          user.user_name,
          user.nick_name,
          user.email,
          user.password,
          user.is_enable.toString(), // bolean
          user.profile_image ?? '',
          user.user_id
        ]
      })

      return response
    } catch (error) {
      return null
    }
  }

  static async createUser (user: UserEntity): Promise<any | null> {
    try {
      const response = await PostgresDb.query({
        query: `
        INSERT INTO users 
        (
          user_id,
          user_name,
          nick_name,
          email,
          password,
          is_enable,
          profile_image
        ) VALUES ($1, $2, $3, $4, $5, $6, $7);
      `,
        params: [
          user.user_id,
          user.user_name,
          user.nick_name,
          user.email,
          user.password,
          user.is_enable.toString(), // bolean
          user.profile_image ?? ''
        ]
      })

      return response
    } catch (error) {
      return null
    }
  }
}
