import express, { Request, Response } from 'express'
import { FirestoreDB } from '../repo/firestore'
import { firestoreConfig } from '../repo/config'

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any } | any
  }
}

const modifySession = (req: Request, data: {} | null) => {
  req.session.regenerate((err) => {
    if (err) throw Error(err)
  })
  req.session.user = data
  req.session.save((err) => {
    if (err) throw Error(err)
  })
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

    modifySession(req, user.data)
    res.set('HX-Trigger', 'reload-user').json({ error: false })
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
    let userName
    if (newUser.userData) userName = newUser.userData.name
    const result = { id: newUser.id, name: userName, level: null }
    modifySession(req, result)

    res.set('HX-Trigger', 'reload-user').json({ error: false })
  })

  // wip
  router.post('/buy', async (req: Request, res: Response) => {
    if (req.session.user == null)
      return res.json({
        error: true,
        field: null,
        message: 'You need to sign in first'
      })

    const userId = req.session.user.id
    const selectedLevelId = req.body.selectedLevelId
    const result = await db.buyLevel(userId, selectedLevelId)

    res.json({ error: false })
  })
  //

  router.delete('/logout', (req: Request, res: Response) => {
    modifySession(req, null)

    const ref = req.get('referer')

    if (ref?.includes('/profile'))
      return res.set('HX-Redirect', '/').sendStatus(200)

    res.set('HX-Trigger', 'reload-user').sendStatus(200)
  })

  return router
}
