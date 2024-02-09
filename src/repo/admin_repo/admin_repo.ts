import { Prop } from '../../types/api'
import { Repo } from '../repo'
import { Request } from 'express'

export class AdminRepo extends Repo {
  makeMainPage(req: Request): Prop {
    let prop = this.makeProp(req)
    prop.state = 0
    return prop
  }

  async makeUsersPage(req: Request): Promise<Prop> {
    let prop = this.makeProp(req)
    const users = await this.usersDb.getUsers()
    prop.users = users
    prop.state = 1
    return prop
  }

  async makeSingleUserPage(req: Request): Promise<Prop | false> {
    let prop = this.makeProp(req)
    if (req.query.status) {
      prop.state = 7
      prop.levels = await this.db.getLevels()
    } else prop.state = 6

    const user = await this.usersDb.getUserById(req.params.id)
    if (!user) return false
    prop.user = user

    return prop
  }

  async makeOrdersPage(req: Request): Promise<Prop> {
    let prop = this.makeProp(req)

    const levels = await this.db.getLevels()
    prop.levels = levels

    let users
    if (req.query.levelId)
      users = await this.usersDb.getUsersByLevel(req.query.levelId.toString())
    else users = await this.usersDb.getUsersByLevel()
    prop.users = users

    prop.state = 2
    return prop
  }

  async makeLevelsPage(req: Request): Promise<Prop> {
    let prop = this.makeProp(req)

    const levels = await this.db.getLevels()
    prop.levels = levels

    prop.state = 3
    return prop
  }

  async makeSingleLevelPage(req: Request): Promise<Prop | false> {
    let prop = this.makeProp(req)
    if (req.query.status) prop.state = 5
    else prop.state = 4

    const level = await this.db.getLevel(req.params.id)
    if (!level) return false
    prop.level = level
    return prop
  }
}
