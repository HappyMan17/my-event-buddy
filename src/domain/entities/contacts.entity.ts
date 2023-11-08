export class ContactsEntity {
  constructor (
    public user_id: string,
    public friend_id: string,
    public has_associated_event: boolean,
    public has_pending_request: boolean,
    public contact_id?: string
  ) {}
}
