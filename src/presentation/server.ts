import express, { Router } from 'express';

interface StartOptions {
  port?: number;
  routes: Router;
}

export class Server {
  private app = express();

  public async start(options: StartOptions) {
    //middlewares
    this.setupMiddlewares();


    // Using defined routes
    this.app.use(options.routes)

    // Listening on port
    this.app.listen(options.port, () => {
      console.log(`Server running on this.port ${options.port}`);
    })
  }

  private setupMiddlewares() {
    this.app.use(express.json());
  }

}