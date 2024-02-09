import express, { Request, Response } from 'express'
import { isUserAuth } from './middlewares/middlewares'
import { FirestoreDB, UsersFirestoreDB } from '../repo/db/firestore'
import { firestoreConfig } from '../repo/db/config'
import { Prop } from '../types/api'
import { MainRepo } from '../repo/main_repo/main_repo'

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
  const repo = new MainRepo()

  router.get('/', (req: Request, res: Response) => {
    const prop = repo.makeIndexPage(req)
    res.render('index', prop)
  })

  router.get('/profile', isUserAuth, async (req: Request, res: Response) => {
    const prop = await repo.makeProfilePage(req)
    res.render('profile', prop)
  })

  router.get('/levels', async (req: Request, res: Response) => {
    const prop = await repo.makeLevelPage(req)
    res.render('levels', prop)
  })

  return router
}
