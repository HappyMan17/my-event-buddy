import { ContactsModel } from '../../data/postgres'
import { ContactsDatasource, CustomError, ContactsEntity } from '../../domain'
import { ContactsEntityMapper } from '../mappers/contacts.mapper'

export class ContactsDatasourceImpl implements ContactsDatasource {
  async getContactById (getContactsDto: { contact_id: string }): Promise<ContactsEntity> {
    const { contact_id } = getContactsDto
    try {
      const contact = await ContactsModel.getContactsBy({ field: 'contact_id', value: contact_id })

      if (!contact) {
        throw CustomError.badRequest('Could not get the contact')
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
}
