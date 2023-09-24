import { Router } from "express";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure/";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    const controller = new AuthController(authRepository);

    // define main routes
    // router.post('/login', controller.loginUser);

    // router.post('/register', controller.registerUser);

    // router.get('/', AuthMiddleware.validateJWT, controller.getUser);
    router.get('/all', controller.getUsers);

    return router;
  }
}