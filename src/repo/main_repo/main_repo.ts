import { Prop } from '../../types/api'
import { Repo } from '../repo'
import { Request } from 'express'

export class MainRepo extends Repo {
  makeIndexPage(req: Request): Prop {
    return this.makeProp(req)
  }

  async makeProfilePage(req: Request): Promise<Prop> {
    let user = await this.usersDb.getUserById(req.signedCookies.user.id)
    let level = null

    let prop = this.makeProp(req)

    if (req.signedCookies.user.level)
      level = await this.db.getLevel(req.signedCookies.user.level)

    prop.user = user
    prop.level = level
    return prop
  }

  async makeLevelPage(req: Request): Promise<Prop> {
    let levels = await this.db.getLevels()
    let prop = this.makeProp(req)

    prop.levels = levels

    return prop
  }
}
