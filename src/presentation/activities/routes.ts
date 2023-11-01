import { Router } from 'express'
import { ActivitiesDatasourceImpl, ActivitiesRepositoryImpl } from '../../infrastructure'
import { ActivitiesController } from './activitiesController'
import { AuthMiddleware } from '../midleware/'
// import { AuthController } from './controller'

export class ActivitiesRoutes {
  static get routes (): Router {
    const router = Router()

    // data source with postgres:
    const datasource = new ActivitiesDatasourceImpl()
    const activityRepository = new ActivitiesRepositoryImpl(datasource)

    const controller = new ActivitiesController(activityRepository)

    // get activities by user
    router.get('/', AuthMiddleware.validateJWT, controller.getEventActivities)

    // routes:
    router.get('/all', controller.getActivities)

    // Update activity
    router.put('/update', AuthMiddleware.validateJWT, controller.updateActivity)

    router.post('/create', AuthMiddleware.validateJWT, controller.createActivities)

    // get by id
    router.get('/:eventId', AuthMiddleware.validateJWT, controller.getActivitiesByEventId)

    // default url
    router.use('/*', (req, res) => {
      res.status(400).json({ message: 'activitie route not found' })
    })

    return router
  }
}
