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
    const UserRepository = new ActivitiesRepositoryImpl(datasource)

    const controller = new ActivitiesController(UserRepository)

    // routes:
    router.get('/all', controller.getActivities)
    // get activities by user
    router.get('/', AuthMiddleware.validateJWT, controller.getEventActivities)

    // get by id
    router.get('/:activityId', AuthMiddleware.validateJWT, controller.getActivityById)

    // Update activity
    router.put('/update', AuthMiddleware.validateJWT, controller.updateActivity)

    router.put('/create', AuthMiddleware.validateJWT, controller.createActivities)

    // default url
    router.use('/*', (req, res) => {
      res.status(400).json({ message: 'activitie route not found' })
    })

    return router
  }
}
