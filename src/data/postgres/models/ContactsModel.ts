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
        query: 'SELECT * FROM contacts;',
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
        query: `SELECT * FROM contacts WHERE ${field} = $1;`,
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

  static async create (contacts: ContactsEntity): Promise<any[] | null> {
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
          contacts.contact_id!,
          contacts.user_id,
          contacts.friend_id,
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
