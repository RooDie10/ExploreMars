import express, { Request, Response } from 'express'
import { makeProp } from './main_router'
import { FirestoreDB } from '../repo/firestore'
import { firestoreConfig } from '../repo/config'

export const adminRouter = () => {
  const db = new FirestoreDB(firestoreConfig)
  const router = express.Router()

  router.get('/', (req: Request, res: Response) => {
    let prop = makeProp(req)
    prop.state = 0
    res.render('admin', prop)
  })

  router.get('/users', async (req: Request, res: Response) => {
    let prop = makeProp(req)
    const users = await db.getUsers()
    prop.users = users
    prop.state = 1
    res.render('admin', prop)
  })

  router.get('/orders', async (req: Request, res: Response) => {
    let prop = makeProp(req)

    const levels = await db.getLevels()
    prop.levels = levels
    
    let users
    if (req.query.levelId)
      users = await db.getUsersByLevel(req.query.levelId.toString())
    else users = await db.getUsersByLevel()
    prop.users = users

    prop.state = 2
    res.render('admin', prop)
  })

  return router
}
