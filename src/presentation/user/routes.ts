import { Router } from 'express'
import { UserDatasourceImpl, UserRepositoryImpl } from '../../infrastructure'
import { UserController } from './userController'
import { FileMiddleware, AuthMiddleware } from '../midleware/'

export class UserRoutes {
  static get routes (): Router {
    const router = Router()

    // data source with postgres:
    const datasource = new UserDatasourceImpl()
    const UserRepository = new UserRepositoryImpl(datasource)

    const controller = new UserController(UserRepository)

    const multerUpload = new FileMiddleware('userProfileImage')

    // routes:
    router.get('/', AuthMiddleware.validateJWT, controller.getUserById)
    // router.put('/update', multerUpload.manageFile, controller.updateUser)
    // router.put('/update', asyncMiddlewareWrapper(AuthMiddleware.validateJWT), controller.updateUser)
    router.put('/update', AuthMiddleware.validateJWT, controller.updateUser)
    router.put('/upload', multerUpload.manageFile, controller.updateUserProfileImage)

    // default url
    router.use('/*', (req, res) => {
      res.status(400).json({ message: 'user route not found' })
    })

    return router
  }
}
