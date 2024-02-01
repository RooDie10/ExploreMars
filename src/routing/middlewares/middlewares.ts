import { Request, Response, NextFunction } from 'express'

export const isUserAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.signedCookies.user !== undefined) return next()
  res.redirect('back')
}

// export const isUserAdmin = (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.user.session);
  
//   if('admin' in req.session.user) return next()
//   res.redirect('back')
  
// } 