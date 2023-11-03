import { ContactsDto, Contacts } from '../dtos'
import { ContactsEntity } from '../entities/contacts.entity'

export abstract class ContactsDatasource {
  abstract addContacts (createContactsDto: ContactsDto): Promise <ContactsEntity>
  abstract getContacts (contactId: string): Promise <ContactsEntity>
  abstract getContactsBy (contacts: Contacts): Promise <Contacts>
}
