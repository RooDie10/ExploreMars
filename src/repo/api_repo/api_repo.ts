import { Status } from '../../types/api'
import { Repo } from '../repo'
import { Request } from 'express'

export class APIRepo extends Repo {
  async signIn(req: Request): Promise<Status> {
    const result = await this.usersDb.findUser({
      email: req.body.email,
      password: req.body.password
    })

    if (result.errors.length > 0) {
      switch (result.errors[0].field) {
        case 'email':
          return {
            errors: [{ field: 'email', message: result.errors[0].message }]
          }

        case 'password':
          return {
            errors: [{ field: 'password', message: result.errors[0].message }]
          }
      }
    }
    return { errors: [], data: result.data }
  }

  async signUp(req: Request): Promise<Status> {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    const newUser = await this.usersDb.addUser(user)

    if (newUser === null) {
      return {
        errors: [{ field: 'email', message: 'User already exists' }]
      }
    }
    let userName
    if (newUser.userData) userName = newUser.userData.name
    const result = { id: newUser.id, name: userName, level: null }
    return { errors: [], data: result }
  }

  async buyLevel(req: Request): Promise<Status> {
    if (req.signedCookies.user === undefined)
      return {
        errors: [{ field: null, message: 'You need to sign in first' }]
      }

    const userId = req.signedCookies.user.id
    const selectedLevelId = req.body.selectedLevelId
    await this.usersDb.buyLevel(userId, selectedLevelId)

    const user = req.signedCookies.user
    user.level = selectedLevelId

    return { errors: [], data: user }
  }
  logOut(req: Request): boolean {
    const ref = req.get('referer')
    if (ref?.includes('/profile')) return true
    return false
  }

  async deleteLevel(req: Request): Promise<Boolean> {
    const result = await this.db.deleteLevel(req.params.id)
    return result
  }

  async addLevel(req: Request): Promise<void> {
    const included = req.body.included.split('; ')
    const levelData = {
      type: req.body.type,
      description: req.body.description,
      included: included,
      price: req.body.price
    }
    await this.db.addLevel(levelData)
  }

  async updateLevel(req: Request): Promise<void> {
    const included = req.body.included.split('; ')
    const levelData = {
      type: req.body.type,
      description: req.body.description,
      included: included,
      price: req.body.price
    }
    await this.db.editLevel(levelData, req.params.id)
  }

  async deleteUser(req: Request): Promise<void> {
    await this.usersDb.deleteUser(req.params.id)
  }
  async updateUser(req: Request): Promise<void> {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      level: req.body.level
    }
    await this.usersDb.editUser(userData, req.params.id)
  }
}
