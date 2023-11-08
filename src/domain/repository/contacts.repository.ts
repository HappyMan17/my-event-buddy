import { Contacts, ContactsDto } from '../dtos/'
import { ContactsEntity } from '../entities/contacts.entity'

export abstract class ContactsRepository {
  abstract create (createContactsDto: ContactsDto): Promise <ContactsEntity>
  abstract getContacts (): Promise <ContactsEntity[]>
  abstract getContactById (contacts: Contacts): Promise <ContactsEntity>
}
