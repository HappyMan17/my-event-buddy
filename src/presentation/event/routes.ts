import { Router } from 'express'
import { EventDatasourceImpl, EventRepositoryImpl } from '../../infrastructure'
import { EventController } from './eventController'
// import { AuthController } from './controller'

export class EventRoutes {
  static get routes (): Router {
    const router = Router()

    // data source with postgres:
    const datasource = new EventDatasourceImpl()
    const UserRepository = new EventRepositoryImpl(datasource)

    const controller = new EventController(UserRepository)

    // routes:
    router.put('/create', controller.createEvent)
    router.get('/all', controller.getEvents)

    // default url
    router.use('/*', (req, res) => {
      res.status(400).json({ message: 'event route not found' })
    })

    return router
  }
}
