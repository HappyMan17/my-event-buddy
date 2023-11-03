import { Contacts } from '../types'

export class ContactsDto {
  private constructor (
    public contact_id: string,
    public user_id: string,
    public friend_id: string
  ) {}

  static addContacts (object: Record<string, any | null>): [string?, ContactsDto?] {
    const {
      contact_id,
      user_id,
      friend_id
    } = object

    if (!contact_id) return ['Missing contact id', undefined]
    if (!user_id) return ['Missing user name', undefined]

    return [
      undefined,
      {
        contact_id,
        user_id,
        friend_id
      }
    ]
  }

  static update (object: Record<string, any | null>): [string?, Contacts?] {
    const {
      contact_id,
      user_id,
      friend_id
    } = object

    if (!contact_id) return ['Missing contact id', undefined]
    if (!user_id) return ['Missing user name', undefined]

    return [
      undefined,
      {
        contact_id,
        user_id,
        friend_id
      }
    ]
  }
}
