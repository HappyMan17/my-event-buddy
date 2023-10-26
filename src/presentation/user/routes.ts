import { Router } from 'express'
import { UserDatasourceImpl, UserRepositoryImpl } from '../../infrastructure'
import { UserController } from './userController'
import { upload } from '../../config'
// import { AuthController } from './controller'

export class UserRoutes {
  static get routes (): Router {
    const router = Router()

    // data source with postgres:
    const datasource = new UserDatasourceImpl()
    const UserRepository = new UserRepositoryImpl(datasource)

    const controller = new UserController(UserRepository)

    // routes:
    // router.get('/', AuthMiddleware.validateJWT, controller.getUser);
    router.put('/update', upload.array('files'), controller.updateUser)

    // default url
    router.use('/*', (req, res) => {
      res.status(400).json({ message: 'user route not found' })
    })

    return router
  }
}
