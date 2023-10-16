import { Router } from 'express'
import { UserDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure'
// import { AuthController } from './controller'

export class AuthRoutes {
  static get routes (): Router {
    const router = Router()

    // data source with postgres:
    const datasource = new UpdateDatasourceImpl()
    const authRepository = new AuthRepositoryImpl(datasource)

    const controller = new AuthController(authRepository)

    // define main routes
    // router.get('/', AuthMiddleware.validateJWT, controller.getUser);
    router.put('/update', controller.registerUser)

    // default url
    router.use('/*', (req, res) => {
      res.status(400).json({ message: 'route not found' })
    })

    return router
  }
}
