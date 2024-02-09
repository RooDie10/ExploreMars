import express, { Request, Response } from 'express'
import { ViewsRepo } from '../repo/views_repo/views_repo'

const checkUser = (req: Request) => {
  if (req.signedCookies.user !== undefined) return true
  return false
}

export const viewsRouter = () => {
  const router = express.Router()
  const repo = new ViewsRepo()

  router.get('/header', (req: Request, res: Response) => {
    const prop = repo.makeHeaderView(req)
    res.render('partials/header/header_sign', prop)
  })

  router.get('/buy_level', (req: Request, res: Response) => {
    const prop = repo.makeBuyLevelView(req)
    res.render('partials/levels/buy_level', prop)
  })

  return router
}
