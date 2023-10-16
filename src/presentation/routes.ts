import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
// import { AuthMiddleware } from "./middleware/auth.middleware";

export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    // define main routes
    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/auth/user', AuthRoutes.routes)

    router.get('/', (req, res) => {
      res.json({ message: 'main route' })
    })

    // router.get('/api/', AuthMiddleware.validateJWT, UserRoutes.routes);

    return router
  }
}
