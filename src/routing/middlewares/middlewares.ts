import { Request, Response, NextFunction } from 'express'

export const isUserAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.signedCookies.user !== undefined) return next()
  res.redirect('/')
}

export const isUserAdmin = (req: Request, res: Response, next: NextFunction) => {  
  if('admin' in req.signedCookies.user) return next()
  res.redirect('/')
  
} 