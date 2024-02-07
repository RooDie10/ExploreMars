import express, { Request, Response } from 'express'
import { makeProp } from './main_router'
import { FirestoreDB, UsersFirestoreDB} from '../repo/firestore'
import { firestoreConfig } from '../repo/config'

export const adminRouter = () => {
  const db = new FirestoreDB(firestoreConfig)
  const usersDb = new UsersFirestoreDB(firestoreConfig)
  const router = express.Router()

  router.get('/', (req: Request, res: Response) => {
    let prop = makeProp(req)
    prop.state = 0
    res.render('admin', prop)
  })

  router.get('/users', async (req: Request, res: Response) => {
    let prop = makeProp(req)
    const users = await usersDb.getUsers()
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
      users = await usersDb.getUsersByLevel(req.query.levelId.toString())
    else users = await usersDb.getUsersByLevel()
    prop.users = users

    prop.state = 2
    res.render('admin', prop)
  })

  router.get('/levels', async (req: Request, res:Response) => {
    let prop = makeProp(req)
    
    const levels = await db.getLevels()
    prop.levels = levels
    
    prop.state = 3
    res.render('admin', prop)
  })
  return router
}
