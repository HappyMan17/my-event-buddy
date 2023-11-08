import { Request, Response } from 'express'
import { ContactsRepository, CustomError } from '../../domain'
import { ContactsDto } from '../../domain/dtos'
import { ContactsModel } from '../../data/postgres'
import { ContactsEntityMapper } from '../../infrastructure/mappers/contacts.mapper'

export class ContactController {
  constructor (
    private readonly contactRepository: ContactsRepository
  ) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log(error)

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  create = async (req: Request, res: Response) => {
    const [error, contactDto] = ContactsDto.create(req.body)

    if (error) return res.status(400).json({ error })

    this.contactRepository.create(contactDto!)
      .then(async (contact) => {
        res.json({
          contact
        })
      })
      .catch(error => this.handleError(error, res))
  }

  // updateEvent = async (req: Request, res: Response) => {
  //   const [error, eventToUpdate] = EventDto.update(req.body)

  //   if (error) return res.status(400).json({ error })

  //   this.eventRepository.updateEvent(eventToUpdate!)
  //     .then(async (event) => {
  //       res.json({
  //         event
  //       })
  //     })
  //     .catch(error => this.handleError(error, res))
  // }

  getContacts = async (req: Request, res: Response): Promise<void> => {
    const response = await ContactsModel.getContacts()
    if (response && response.length > 0) {
      // mapping
      const contacts = response.map(contact => ContactsEntityMapper.contactsEntityFromObject(contact))
      res.status(200).json(contacts)
    } else {
      res.status(200).json(response)
    }
  }

  getContactById = async (req: Request, res: Response): Promise<void> => {
    const contactId = req.params.contactId

    if (!contactId) {
      res.status(400).json({ ms: 'contact id not provided.' })
      return
    }

    this.contactRepository.getContactById(contactId)
      .then(async (contact) => {
        res.json({
          contact
        })
      })
      .catch(error => this.handleError(error, res))
  }
}
