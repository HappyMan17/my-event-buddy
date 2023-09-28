import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
// import { AuthMiddleware } from "./middleware/auth.middleware";

export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    // define main routes
    router.use('/api/auth', AuthRoutes.routes)

    // router.get('/api/', AuthMiddleware.validateJWT, UserRoutes.routes);

    return router
  }
}
