import express, {Request, Response} from 'express'

export const adminRouter = () => {
  const router = express.Router()

  router.get('/', (req: Request, res: Response) => {
    res.render('admin', {})
  })

  return router
  
}