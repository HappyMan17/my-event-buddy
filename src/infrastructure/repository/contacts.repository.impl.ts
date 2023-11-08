import { ContactsRepository, ContactsEntity, ContactsDatasource } from '../../domain'
import { ContactsDto } from '../../domain/dtos'

export class ContactsRepositoryImpl implements ContactsRepository {
  constructor (
    private readonly contactDatasource: ContactsDatasource
  ) {}

  async create (contactToCreate: ContactsDto): Promise<ContactsEntity> {
    return await new Promise((resolve) => {
      resolve(
        this.contactDatasource.create(contactToCreate)
      )
    })
  }

  async getContacts (): Promise<ContactsEntity[]> {
    return await new Promise((resolve) => {
      resolve(
        this.contactDatasource.getContacts()
      )
    })
  }

  async getContactById (contactId: string): Promise<ContactsEntity> {
    return await new Promise((resolve) => {
      resolve(
        this.contactDatasource.getContactById(contactId)
      )
    })
  }
}
