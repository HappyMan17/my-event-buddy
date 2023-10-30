import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
import { UserRoutes } from './user/routes'
import { EventRoutes } from './event/routes'
import { ActivitiesRoutes } from './activities/routes'
// import { AuthMiddleware } from "./middleware/auth.middleware";

export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    // define main routes
    router.use('/api/auth', AuthRoutes.routes)
    // router.use('/api/auth/user', AuthRoutes.routes)

    // user routes
    router.use('/api/user', UserRoutes.routes)

    // user routes
    router.use('/api/event', EventRoutes.routes)

    router.use('/api/activity', ActivitiesRoutes.routes)

    router.get('/', (req, res) => {
      res.json({ message: 'main route' })
    })

    // router.get('/api/', AuthMiddleware.validateJWT, UserRoutes.routes);

    return router
  }
}
