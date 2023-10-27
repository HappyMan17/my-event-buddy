import { UserEntity } from '../../../domain'
import { UserToUpdate, UserUpdateProfileImage } from '../../../domain/dtos'
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

  static async getUserBy ({ field, value }: GetUserByProps): Promise<any[] | null> {
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

  static async updateUserById (user: UserToUpdate): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: `
          UPDATE users
          SET (user_name, nick_name, profile_image) = ($1, $2, $3)
          WHERE user_id = $4;
        `,
        params: [
          user.user_name,
          user.nick_name,
          user.profile_image ?? '',
          user.user_id
        ]
      })

      return response
    } catch (error) {
      return null
    }
  }

  static async updateUserImageById (user: UserUpdateProfileImage): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: `
          UPDATE users
          SET profile_image = $1
          WHERE user_id = $2;
        `,
        params: [
          user.profile_image ?? '',
          user.user_id
        ]
      })

      return response
    } catch (error) {
      return null
    }
  }

  static async createUser (user: UserEntity): Promise<any[] | null> {
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
