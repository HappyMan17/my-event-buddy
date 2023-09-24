import { envs } from './config';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server'

(() => {
  main();
})()

async function main() {

  new Server()
  .start({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

}