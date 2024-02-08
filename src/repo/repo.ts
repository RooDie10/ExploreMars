import { Prop } from '../types/api'
import { firestoreConfig } from './db/config'
import { FirestoreDB, UsersFirestoreDB } from './db/firestore'
import { Request, Response } from 'express'

export class Repo {
  protected db = new FirestoreDB(firestoreConfig)
  protected usersDb = new UsersFirestoreDB(firestoreConfig)

  protected checkUser(req: Request) {
    if (req.signedCookies.user !== undefined) return true
    return false
  }

  protected makeProp(req: Request): Prop {
    if (this.checkUser(req))
      return {
        isUserAuth: true,
        userData: req.signedCookies.user
      }

    return {
      isUserAuth: false,
      userData: null
    }
  }
}
