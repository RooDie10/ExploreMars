import express, { Request, Response } from 'express'
import { FirestoreDB } from '../repo/firestore'
import { firestoreConfig } from '../repo/config'

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any }
  }
}

export const apiRouter = () => {
  const router = express.Router()
  const db = new FirestoreDB(firestoreConfig)

  router.post('/login', async (req: Request, res: Response) => {
    const user = await db.findUser({
      email: req.body.email,
      password: req.body.password
    })
    if (!user)
      return res.send({
        isUser: false,
        message: 'email or password incorrect'
      })
    req.session.regenerate((err) => {
      if (err) throw Error(err)
    })
    req.session.user = user
    req.session.save((err) => {
      if (err) throw Error(err)
    })
    res.send({ isUser: true, message: 'success' })
  })

  router.get('/ses', (req, res) => {
    res.send(req.session.user)
  })
  return router
}
