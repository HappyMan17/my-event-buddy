export class ContactsDto {
  private constructor (
    public user_id: string,
    public friend_id: string,
    public has_associated_event?: boolean,
    public has_pending_request?: boolean
  ) {}

  static create (object: Record<string, any | null>): [string?, ContactsDto?] {
    const {
      friend_id
    } = object

    if (!object.user_id) return ['Missing user id', undefined]
    // if (!user_id) return ['Missing user name', undefined]
    if (!friend_id) return ['Missing friend name', undefined]

    return [
      undefined,
      {
        user_id: object.user_id,
        // user_id,
        friend_id
      }
    ]
  }

  static update (object: Record<string, any | null>): [string?, ContactsDto?] {
    const {
      user_id,
      friend_id,
      has_associated_event,
      has_pending_request
    } = object

    if (!friend_id) return ['Missing friend name', undefined]
    if (!user_id) return ['Missing user name', undefined]

    return [
      undefined,
      {
        user_id,
        friend_id,
        has_associated_event,
        has_pending_request
      }
    ]
  }
}
