import { Request, Response, NextFunction } from 'express'

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any } | any
  }
}

export const isUserAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user != null) return next()
  res.redirect('back')
}

export const isUserAdmin = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.user.session);
  
  if('admin' in req.session.user) return next()
  res.redirect('back')
  
} 