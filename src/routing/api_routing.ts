import express, { Request, Response } from 'express'
import { FirestoreDB } from '../repo/firestore'
import { firestoreConfig } from '../repo/config'

export const apiRouter = () => {
  const router = express.Router()
  const db = new FirestoreDB(firestoreConfig)

  router.post('/login', async (req: Request, res: Response) => {
    const user = await db.findUser({
      email: req.body.email,
      password: req.body.password
    })
    res.send(user)
  })

  return router
}
