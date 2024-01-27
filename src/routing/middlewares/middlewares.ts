import { Request, Response, NextFunction } from 'express'

export const isUserAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user != null) return next()
  res.redirect('back')
}
