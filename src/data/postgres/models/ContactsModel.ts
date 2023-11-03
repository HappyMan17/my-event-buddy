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

  static async getContactsBy ({ field, value }: GetContactsByProps): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: `SELECT * FROM contacts WHERE ${field} = $1;`,
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

  static async addContacts (contacts: ContactsEntity): Promise<any[] | null> {
    try {
      const response = await PostgresDb.query({
        query: `
          INSERT INTO contacts 
          (
            contact_id,
            user_id,
            friend_id
          ) VALUES ($1, $2, $3);
        `,
        params: [
          contacts.contact_id,
          contacts.user_id,
          contacts.friend_id
        ]
      })

      return response
    } catch (error) {
      return null
    }
  }
}
