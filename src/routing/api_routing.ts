import express, { Request, Response } from 'express'
import { FirestoreDB } from '../repo/firestore'
import { firestoreConfig } from '../repo/config'

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any } | any
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
    if (!user) return
    req.session.user = user
    req.session.save((err) => {
      if (err) throw Error(err)
    })
    res.set('HX-Trigger', 'reloadHeader').sendStatus(202)
  })

  router.get('/ses', (req, res) => {
    res.send(req.session.user)
  })

  router.delete('/logout', (req, res) => {
    req.session.user = null
    req.session.save(function (err) {
      if (err) throw Error(err)
    })
    res.set('HX-Trigger', 'reloadHeader').sendStatus(201)
  })
  return router
}
