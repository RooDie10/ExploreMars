import express, { Request, Response } from 'express'
import { APIRepo } from '../repo/api_repo/api_repo'

export const apiRouter = () => {
  const router = express.Router()
  const repo = new APIRepo()

  router.post('/signin', async (req: Request, res: Response) => {
    const result = await repo.signIn(req)
    if (result.error) return res.json(result)

    res.cookie('user', result.data, {
      maxAge: 900000,
      signed: true,
      httpOnly: true
    })
    res.set('HX-Trigger', 'reload-user').json(result)
  })

  router.post('/signup', async (req: Request, res: Response) => {
    const result = await repo.signUp(req)
    if (result.error) return res.json(result)

    res.cookie('user', result.data, {
      maxAge: 900000,
      signed: true,
      httpOnly: true
    })

    res.set('HX-Trigger', 'reload-user').json(result)
  })

  router.post('/buy', async (req: Request, res: Response) => {
    const result = await repo.buyLevel(req)
    if (result.error) return res.json(result)

    res.cookie('user', result.data, {
      maxAge: 900000,
      signed: true,
      httpOnly: true
    })

    res.set("HX-Trigger", "reload-user").json(result)
  })

  router.delete('/logout', (req: Request, res: Response) => {
    const result = repo.logOut(req)

    res.clearCookie('user')

    if (result) return res.set('HX-Redirect', '/').sendStatus(204)
    res.set('HX-Trigger', 'reload-user').sendStatus(204)
  })

  router.delete('/level/:id', async (req: Request, res: Response) => {
    const result = await repo.deleteLevel(req)
    if (result) return res.set('HX-Trigger', 'reload-levels').sendStatus(204)
    return res.send(
      '<p class="font-bold text-red-600">You can\'t delete level that contains orders</p>'
    )
  })

  router.post('/level', async (req: Request, res: Response) => {
    await repo.addLevel(req)
    res.set('HX-Trigger', 'reload-levels').sendStatus(201)
  })

  router.put('/level/:id', async (req: Request, res: Response) => {
    await repo.updateLevel(req)
    res.set('HX-Trigger', 'reload-level').sendStatus(201)
  })

  router.delete('/user/:id', async (req: Request, res: Response) => {
    await repo.deleteUser(req)
    res.set('HX-Trigger', 'reload-users').sendStatus(204)
  })

  router.put('/user/:id', async (req: Request, res: Response) => {
    await repo.updateUser(req)
    res.set('HX-Trigger', 'reload-user').sendStatus(201)
  })
  return router
}
