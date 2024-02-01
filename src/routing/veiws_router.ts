import express, { Request, Response } from 'express'

const checkUser = (req: Request) => {
  if (req.signedCookies.user !== undefined) return true
  return false
}

export const viewsRouter = () => {
  const router = express.Router()

  router.get('/header', (req: Request, res: Response) => {
    let prop
    if (checkUser(req)) prop = { isUserAuth: true, userData: req.signedCookies.user }
    else prop = { isUserAuth: false }
    res.render('partials/header/header_sign', prop)
  })

  router.get('/buy_level', (req: Request, res: Response) => {
    let prop
    if(checkUser(req)) prop = { isUserAuth: true, userData: req.signedCookies.user }
    else prop = { isUserAuth: false }
    res.render('partials/levels/buy_level', prop)
  })

  return router
}
