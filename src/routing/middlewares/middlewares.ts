import { Request, Response, NextFunction } from 'express'

export const isUserAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.signedCookies.user !== undefined) return next()
  res.redirect('back')
}

export const isUserAdmin = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.signedCookies.user);
  
  if('admin' in req.signedCookies.user) return next()
  res.redirect('back')
  
} 