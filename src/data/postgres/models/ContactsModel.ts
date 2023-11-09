import { ContactsEntity } from '../../../domain'
import { PostgresDb } from '../postgres.database'

interface GetContactsByProps {
  field: string;
  value: any;
}

export class ContactsModel {
  static async getContacts (): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query:
        `
        SELECT 
          c.contact_id, c.user_id, c.friend_id, c.has_associated_event, c.has_pending_request,
          u.user_name, u.nick_name, u.email, u.profile_image
        FROM contacts c
          JOIN users u ON c.friend_id = u.user_id;
        `,
        params: []
      })
      return response
    } catch (error) {
      return null
    }
  }

  static async getContactBy ({ field, value }: GetContactsByProps): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query:
        `
          SELECT 
            c.user_id, c.friend_id, c.has_associated_event, c.has_pending_request,
            u.user_name, u.nick_name, u.email, u.profile_image
          FROM contacts c
            JOIN users u ON c.friend_id = u.user_id
          WHERE c.${field} = $1;
        `,
        params: [value]
      })

      if (!response || response.length === 0) {
        return null
      }
      return response
    } catch (error) {
      return null
    }
  }

  /*
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
  */

  static async create (contact: ContactsEntity): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: `
          INSERT INTO contacts 
          (
            contact_id,
            user_id,
            friend_id,
            has_associated_event,
            has_pending_request
          ) VALUES ($1, $2, $3, $4, $5);
        `,
        params: [
          contact.contact_id!,
          contact.user_id,
          contact.friend_id,
          false.toString(),
          false.toString()
        ]
      })

      return response
    } catch (error) {
      return null
    }
  }
}
