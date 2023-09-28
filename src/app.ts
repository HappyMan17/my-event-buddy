import { envs } from './config'
import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'

(() => {
  void main()
})()

async function main () {
  await new Server()
    .start({
      port: envs.PORT,
      routes: AppRoutes.routes
    })
}
