import { Router } from 'express'
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure/'
import { AuthController } from './controller'

export class AuthRoutes {
  static get routes (): Router {
    const router = Router()

    // data source with postgres:
    const datasource = new AuthDatasourceImpl()
    const authRepository = new AuthRepositoryImpl(datasource)

    const controller = new AuthController(authRepository)

    // define main routes
    router.post('/login', controller.loginUser)

    router.post('/register', controller.registerUser)

    // router.get('/', AuthMiddleware.validateJWT, controller.getUser);
    router.get('/all', controller.getUsers)

    // default url
    router.use('/*', (req, res) => {
      res.status(400).json({ message: 'route not found' })
    })

    return router
  }
}
