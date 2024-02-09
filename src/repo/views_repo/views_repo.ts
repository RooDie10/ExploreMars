import { Prop } from '../../types/api'
import { Repo } from '../repo'
import { Request } from 'express'

export class ViewsRepo extends Repo {
  makeHeaderView(req: Request): Prop {
    let prop
    if (this.checkUser(req))
      prop = { isUserAuth: true, userData: req.signedCookies.user }
    else prop = { isUserAuth: false, userData: null }
    return prop
  }

  makeBuyLevelView(req: Request): Prop {
    let prop
    if (this.checkUser(req))
      prop = { isUserAuth: true, userData: req.signedCookies.user }
    else prop = { isUserAuth: false, userData: null }
    return prop
  }
}
