import { Router } from 'express'
import { EventDatasourceImpl, EventRepositoryImpl } from '../../infrastructure'
import { EventController } from './eventController'
import { AuthMiddleware } from '../midleware'
// import { AuthController } from './controller'

export class EventRoutes {
  static get routes (): Router {
    const router = Router()

    // data source with postgres:
    const datasource = new EventDatasourceImpl()
    const UserRepository = new EventRepositoryImpl(datasource)

    const controller = new EventController(UserRepository)

    // routes:
    // get user event
    router.get('/', AuthMiddleware.validateJWT, controller.getUserEvents)

    // create user
    router.put('/create', AuthMiddleware.validateJWT, controller.createEvent)
    router.get('/all', controller.getEvents)

    // default url
    router.use('/*', (req, res) => {
      res.status(400).json({ message: 'event route not found' })
    })

    return router
  }
}
