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

  async makeBuyLevelView(req: Request): Promise<Prop> {
    let prop: Prop
    if (this.checkUser(req)) {
      prop = { isUserAuth: true, userData: req.signedCookies.user }

      if (req.signedCookies.user.level) {
        const level = await this.db.getLevel(req.signedCookies.user.level)
        prop!.user = { level: level!.data.type }
      }
    } else prop = { isUserAuth: false, userData: null }
    return prop
  }

  async makeLevelData(req: Request): Promise<Prop> {
    const prop = this.makeProp(req)
    const id = req.query.id!.toString()
    const level = await this.db.getLevel(id)
    prop.level = level
    return prop
  }
}
