import express, { Request, Response } from 'express'
import { makeProp } from './main_router'
import { FirestoreDB } from '../repo/firestore'
import { firestoreConfig } from '../repo/config'

export const adminRouter = () => {
  const db = new FirestoreDB(firestoreConfig)
  const router = express.Router()

  router.get('/', (req: Request, res: Response) => {
    let prop = makeProp(req)
    prop.state = undefined
    res.render('admin', prop)
  })

  router.get('/users', (_req: Request, res: Response) => {
    res.redirect('/admin')
  })

  return router
}
