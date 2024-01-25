import express, { Request, Response } from 'express'
import { FirestoreDB } from '../repo/firestore'
import { firestoreConfig } from '../repo/config'
import { log } from 'handlebars/runtime'

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any } | any
  }
}

export const apiRouter = () => {
  const router = express.Router()
  const db = new FirestoreDB(firestoreConfig)

  router.post('/signin', async (req: Request, res: Response) => {
    const user = await db.findUser({
      email: req.body.email,
      password: req.body.password
    })

    if (!user.status) {
      switch (user.field) {
        case 'email':
          return res.json({
            error: true,
            field: 'email',
            message: user.message
          })
        case 'password':
          return res.json({
            error: true,
            field: 'password',
            message: user.message
          })
      }
    }

    req.session.user = user.data
    req.session.save((err) => {
      if (err) throw Error(err)
    })
    res.set('HX-Trigger', 'reload-header').json({ error: false })
  })

  router.get('/', (req: Request, res: Response) => {
    res.redirect('back')
  })

  router.post('/signup', async (req: Request, res: Response) => {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    const newUser = await db.addUser(user)

    if (newUser === null) {
      return res.json({
        error: true,
        field: 'email',
        message: 'User already exists'
      })
    }

    req.session.user = user
    req.session.save((err) => {
      if (err) throw Error(err)
    })
    res.set('HX-Trigger', 'reload-header')
    res.json({ error: false })
  })

  router.delete('/logout', (req: Request, res: Response) => {
    req.session.user = null
    req.session.save((err) => {
      if (err) throw Error(err)
    })

    const ref = req.get('referer')
    if (ref?.includes('/profile'))
      return res.set('HX-Redirect', '/').sendStatus(200)
    res.set('HX-Trigger', 'reload-header').sendStatus(200)
  })
  return router
}
