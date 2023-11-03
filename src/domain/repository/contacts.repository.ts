import { Contacts, ContactsDto } from '../dtos/'
import { ContactsEntity } from '../entities/contacts.entity'

export abstract class ContactsRepository {
  abstract create (createContactsDto: ContactsDto): Promise <ContactsEntity>
  abstract getContacts (contactId: string): Promise <ContactsEntity>
  abstract update (contacts: Contacts): Promise <Contacts>
}
