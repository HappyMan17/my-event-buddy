import { Router } from 'express'
import { EventDatasourceImpl, EventRepositoryImpl } from '../../infrastructure'
import { EventController } from './eventController'
import { AuthMiddleware, FileMiddleware } from '../midleware'
// import { AuthController } from './controller'

export class EventRoutes {
  static get routes (): Router {
    const router = Router()

    // data source with postgres:
    const datasource = new EventDatasourceImpl()
    const EventRepository = new EventRepositoryImpl(datasource)

    const controller = new EventController(EventRepository)
    const multerUpload = new FileMiddleware('eventLogo')

    // get user event
    router.get('/', AuthMiddleware.validateJWT, controller.getUserEvents)

    // routes:
    router.get('/all', controller.getEvents)

    // create user
    router.post('/create', AuthMiddleware.validateJWT, controller.createEvent)

    // update event
    router.put('/update', AuthMiddleware.validateJWT, controller.updateEvent)

    // upload images
    router.put('/upload', multerUpload.manageFile, controller.updateImage)

    // get event by id
    router.get('/:eventId', AuthMiddleware.validateJWT, controller.getEventById)

    // default url
    router.use('/*', (req, res) => {
      res.status(400).json({ message: 'event route not found' })
    })

    return router
  }
}
