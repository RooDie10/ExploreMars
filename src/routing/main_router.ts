import express, { Request, Response } from 'express'
import { isUserAuth } from './middlewares/middlewares'
import { FirestoreDB } from '../repo/firestore'
import { firestoreConfig } from '../repo/config'
import { Prop } from '../types/api'

const checkUser = (req: Request) => {
  if (req.session.user) return true
  return false
}

const makeProp = (req: Request): Prop => {
  if (checkUser(req)) return { isUserAuth: true, userData: req.session.user }
  else return { isUserAuth: false, userData: null }
}

export const mainRouter = () => {
  const router = express.Router()
  const db = new FirestoreDB(firestoreConfig)

  router.get('/', (req: Request, res: Response) => {
    const prop = makeProp(req)
    res.render('index', prop)
  })

  router.get('/profile', isUserAuth, async (req: Request, res: Response) => {
    let user = await db.getUserById(req.session.user.id)
    let level = null
    if (req.session.user.level)
      level = await db.getLevels(req.session.user.level)
    let prop = makeProp(req)

    ;(prop.user = user), (prop.level = level)
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