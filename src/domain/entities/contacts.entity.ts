export class ContactsEntity {
  constructor (
    public contact_id: string,
    public user_id: string,
    public friend_id?: string[]
  ) {}
}
