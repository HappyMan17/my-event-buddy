import { NextFunction, Response, Request } from 'express'
import multer from 'multer'

export class FileMiddleware {
  private readonly fileName
  private readonly saveFolder
  constructor (
    fileName: string,
    saveFolder: string = './src/uploads/profile_images'
  ) {
    this.fileName = fileName
    this.saveFolder = saveFolder
  }

  manageFile = (req: Request, res: Response, next: NextFunction) => {
    console.log({ req })
    try {
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, this.saveFolder)
        },
        filename: (req, file, cb) => {
          console.log({ file, name: this.fileName })
          // cb(null, this.fileName)
          cb(null, `${this.fileName}.jpg`)
        }
      })

      const upload = multer({ storage }).array('files') // Create multer instance

      // Handle file upload using multer
      upload(req, res, (err) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'File Upload Error' })
        }
        next()
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
