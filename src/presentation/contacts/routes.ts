import { Router } from 'express'
import { AuthMiddleware } from '../midleware'
import { ContactsDatasourceImpl } from '../../infrastructure/datasource/contacts.datasource.impl'
import { ContactsRepositoryImpl } from '../../infrastructure/repository/contacts.repository.impl'
import { ContactController } from './contactsController'

export class ContactRoutes {
  static get routes (): Router {
    const router = Router()

    // data source with postgres:
    const datasource = new ContactsDatasourceImpl()
    const EventRepository = new ContactsRepositoryImpl(datasource)

    const controller = new ContactController(EventRepository)

    // get user contacts
    router.get('/', AuthMiddleware.validateJWT, controller.getUserContacts)

    // routes:
    router.get('/all', controller.getContacts)

    // create contact
    router.post('/create', AuthMiddleware.validateJWT, controller.create)

    // update contact
    // router.put('/update', AuthMiddleware.validateJWT, controller.updateEvent)

    // get contact by id
    router.get('/:contactId', AuthMiddleware.validateJWT, controller.getContactById)

    // default url
    router.use('/*', (req, res) => {
      res.status(400).json({ message: 'contact route not found' })
    })

    return router
  }
}
