import { UuidAdapter } from '../../config'
import { ContactsModel } from '../../data/postgres'
import { ContactsDatasource, CustomError, ContactsEntity, ContactsDto } from '../../domain'
import { ContactsEntityMapper } from '../mappers/contacts.mapper'

export class ContactsDatasourceImpl implements ContactsDatasource {
  async getContactById (contactId: string): Promise<ContactsEntity> {
    const response = await ContactsModel.getContactBy({ field: 'contact_id', value: contactId })

    if (!response) {
      throw CustomError.badRequest('Could not create the contact')
    }

    const contacts = response.map(contact => ContactsEntityMapper.contactsEntityFromObject(contact))

    return contacts[0]
  }

  async create (contactToCreate: ContactsDto): Promise<ContactsEntity> {
    const { user_id, friend_id } = contactToCreate
    try {
      const contact = await ContactsModel.create(new ContactsEntity(
        user_id,
        friend_id,
        false,
        false,
        UuidAdapter.generateV4uuid()
      ))

      if (!contact) {
        throw CustomError.badRequest('Could not create the contact')
      }

      const contacts = contact.map(contact => ContactsEntityMapper.contactsEntityFromObject(contact))

      return contacts[0]
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async getContacts (): Promise<ContactsEntity[]> {
    try {
      const contacts = await ContactsModel.getContacts()

      if (!contacts || contacts.length === 0) {
        throw CustomError.badRequest('Could not get the contacts')
      }

      return contacts.map(contact => ContactsEntityMapper.contactsEntityFromObject(contact))
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
