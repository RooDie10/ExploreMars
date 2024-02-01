import express, { Request, Response } from 'express'
import { makeProp } from './main_router'

export const adminRouter = () => {
  const router = express.Router()

  router.get('/', (req: Request, res: Response) => {
    const prop = makeProp(req)
    res.render('admin', prop)
  })

  return router
}
