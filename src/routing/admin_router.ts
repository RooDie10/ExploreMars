import express, { Request, Response } from 'express'
import { AdminRepo } from '../repo/admin_repo/admin_repo'

export const adminRouter = () => {
  const repo = new AdminRepo()
  const router = express.Router()

  router.get('/', async (req: Request, res: Response) => {
    const prop = await repo.makeUsersPage(req)
    res.render('admin', prop)
  })

  router.get('/users', async (req: Request, res: Response) => {
    const prop = await repo.makeUsersPage(req)
    res.render('admin', prop)
  })

  router.get('/users/:id', async (req: Request, res: Response) => {
    const prop = await repo.makeSingleUserPage(req)
    if (!prop) return res.redirect('/admin/users')
    res.render('admin', prop)
  })

  router.get('/orders', async (req: Request, res: Response) => {
    const prop = await repo.makeOrdersPage(req)
    res.render('admin', prop)
  })

  router.get('/levels', async (req: Request, res: Response) => {
    const prop = await repo.makeLevelsPage(req)
    res.render('admin', prop)
  })

  router.get('/levels/:id', async (req: Request, res: Response) => {
    const prop = await repo.makeSingleLevelPage(req)
    if (!prop) return res.redirect('/admin/levels')
    res.render('admin', prop)
  })

  return router
}
