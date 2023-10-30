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
    const UserRepository = new EventRepositoryImpl(datasource)

    const controller = new EventController(UserRepository)
    const multerUpload = new FileMiddleware('eventLogo')

    // routes:
    // get user event
    router.get('/', AuthMiddleware.validateJWT, controller.getUserEvents)

    // get event by id
    router.get('/:eventId', controller.getEventById)

    // create user
    router.post('/create', AuthMiddleware.validateJWT, controller.createEvent)

    // upload images
    router.put('/upload', multerUpload.manageFile, controller.updateImage)

    router.get('/all', controller.getEvents)

    // default url
    router.use('/*', (req, res) => {
      res.status(400).json({ message: 'event route not found' })
    })

    return router
  }
}
