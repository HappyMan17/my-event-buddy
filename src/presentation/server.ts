import express, { Router } from 'express'
import cors from 'cors'
import { k } from '../config'

interface StartOptions {
  port?: number;
  routes: Router;
}

export class Server {
  private readonly app = express()

  public async start (options: StartOptions) {
    // middlewares
    this.setupMiddlewares()

    // Using defined routes
    this.app.use(options.routes)

    // Listening on port
    this.app.listen(options.port, () => {
      console.log(`Server running on this.port ${options.port}`)
    })
  }

  private setupMiddlewares () {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use('/profile_images', express.static('./src/uploads'))
    this.app.use(cors({
      origin: (origin, callback) => {
        if (!origin) {
          callback(null, true)
          return
        }
        if (k.ACCEPTED_ORIGINS.includes(origin)) {
          callback(null, true)
          return
        }
        callback(new Error('Not allowed by CORS'))
      }
    }))
  }
}
