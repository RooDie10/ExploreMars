import express, { Request, Response } from 'express'
import { FirestoreDB, UsersFirestoreDB } from '../repo/db/firestore'
import { firestoreConfig } from '../repo/db/config'

export const apiRouter = () => {
  const router = express.Router()
  const userDb = new UsersFirestoreDB(firestoreConfig)
  const db = new FirestoreDB(firestoreConfig)

  router.post('/signin', async (req: Request, res: Response) => {
    const user = await userDb.findUser({
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

    res.cookie('user', user.data, {
      maxAge: 900000,
      signed: true,
      httpOnly: true
    })
    res.set('HX-Trigger', 'reload-user').json({ error: false })
  })

  router.post('/signup', async (req: Request, res: Response) => {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    const newUser = await userDb.addUser(user)

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
    res.cookie('user', result, {
      maxAge: 900000,
      signed: true,
      httpOnly: true
    })

    res.set('HX-Trigger', 'reload-user').json({ error: false })
  })

  // wip
  router.post('/buy', async (req: Request, res: Response) => {
    if (req.signedCookies.user === undefined)
      return res.json({
        error: true,
        field: null,
        message: 'You need to sign in first'
      })

    const userId = req.signedCookies.user.id
    const selectedLevelId = req.body.selectedLevelId
    const result = await userDb.buyLevel(userId, selectedLevelId)
    const user = req.signedCookies.user
    user.level = selectedLevelId
    res.cookie('user', user, {
      maxAge: 900000,
      signed: true,
      httpOnly: true
    })

    res.json({ error: false })
  })
  //

  router.delete('/logout', (req: Request, res: Response) => {
    res.clearCookie('user')

    const ref = req.get('referer')

    if (ref?.includes('/profile'))
      return res.set('HX-Redirect', '/').sendStatus(200)

    res.set('HX-Trigger', 'reload-user').sendStatus(200)
  })

  router.delete('/level/:id', async (req: Request, res: Response) => {
    const result = await db.deleteLevel(req.params.id)
    if (result) return res.set('HX-Trigger', 'reload-levels').sendStatus(200)
    return res.send(
      '<p class="font-bold text-red-600">You can\'t delete level that contains orders</p>'
    )
  })

  router.post('/level', async (req: Request, res: Response) => {
    const included = req.body.included.split('; ')
    const levelData = {
      type: req.body.type,
      description: req.body.description,
      included: included,
      price: req.body.price
    }
    const result = await db.addLevel(levelData)
    res.set('HX-Trigger', 'reload-levels').json({ error: false })
  })

  router.post('/level/:id', async (req: Request, res: Response) => {
    const included = req.body.included.split('; ')
    const levelData = {
      type: req.body.type,
      description: req.body.description,
      included: included,
      price: req.body.price
    }
    const result = await db.editLevel(levelData, req.params.id)
    res.set('HX-Trigger', 'reload-level').sendStatus(201)
  })

  router.delete('/user/:id', async (req: Request, res: Response) => {
    const result = await userDb.deleteUser(req.params.id)
    res.set('HX-Trigger', 'reload-users').sendStatus(200)
  })

  router.put('/user/:id', async (req: Request, res: Response) => {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      level: req.body.level
    }
    const result = await userDb.editUser(userData, req.params.id)
    res.set('HX-Trigger', 'reload-user').sendStatus(201)
  })
  return router
}
