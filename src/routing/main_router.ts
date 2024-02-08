import express, { Request, Response } from 'express'
import { isUserAuth, } from './middlewares/middlewares'
import { FirestoreDB, UsersFirestoreDB} from '../repo/db/firestore'
import { firestoreConfig } from '../repo/db/config'
import { Prop } from '../types/api'

export const checkUser = (req: Request) => {
  if (req.signedCookies.user !== undefined) return true
  return false
}

export const makeProp = (req: Request): Prop => {
  if (checkUser(req))
    return {
      isUserAuth: true,
      userData: req.signedCookies.user
    }

  return {
    isUserAuth: false,
    userData: null
  }
}

export const mainRouter = () => {
  const router = express.Router()
  const db = new FirestoreDB(firestoreConfig)
  const usersDb = new UsersFirestoreDB(firestoreConfig)
  router.get('/', (req: Request, res: Response) => {
    const prop = makeProp(req)
    res.render('index', prop)
  })

  router.get('/profile', isUserAuth, async (req: Request, res: Response) => {
    let user = await usersDb.getUserById(req.signedCookies.user.id)
    let level = null

    let prop = makeProp(req)

    if (req.signedCookies.user.level)
      level = await db.getLevel(req.signedCookies.user.level)

    prop.user = user
    prop.level = level
    res.render('profile', prop)
  })

  router.get('/levels', async (req: Request, res: Response) => {
    let levels = await db.getLevels()
    let prop = makeProp(req)

    prop.levels = levels

    res.render('levels', prop)
  })

  return router
}
