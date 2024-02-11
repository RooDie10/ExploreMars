import express, { Request, Response } from 'express'
import { APIRepo } from '../repo/api_repo/api_repo'
import {
  validateBodyEmail,
  validateBodyName,
  validateBodyPassword,
  validationBodyMiddleware,
  newLevelTextValidation,
  newLevelPriceValidation
} from './middlewares/validation_middlewares'

export const apiRouter = () => {
  const router = express.Router()
  const repo = new APIRepo()

  router.post(
    '/signin',
    validateBodyEmail,
    validateBodyPassword,
    validationBodyMiddleware,
    async (req: Request, res: Response) => {
      const result = await repo.signIn(req)
      if (result.errors.length != 0) return res.json(result)

      res.cookie('user', result.data, {
        maxAge: 900000,
        signed: true,
        httpOnly: true
      })
      res.set('HX-Trigger', 'reload-user').json(result)
    }
  )

  router.post(
    '/signup',
    validateBodyEmail,
    validateBodyPassword,
    validateBodyName,
    validationBodyMiddleware,
    async (req: Request, res: Response) => {
      const result = await repo.signUp(req)
      if (result.errors.length != 0) return res.json(result)

      res.cookie('user', result.data, {
        maxAge: 900000,
        signed: true,
        httpOnly: true
      })

      res.set('HX-Trigger', 'reload-user').json(result)
    }
  )

  router.post('/buy', async (req: Request, res: Response) => {
    const result = await repo.buyLevel(req)
    if (result.errors.length != 0) return res.json(result)

    res.cookie('user', result.data, {
      maxAge: 900000,
      signed: true,
      httpOnly: true
    })

    res.set('HX-Trigger', 'reload-user').json(result)
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

  router.post(
    '/level',
    newLevelTextValidation('type'),
    newLevelTextValidation('description'),
    newLevelTextValidation('included'),
    newLevelPriceValidation,
    validationBodyMiddleware,
    async (req: Request, res: Response) => {
      await repo.addLevel(req)
      res.set('HX-Trigger', 'reload-levels').sendStatus(201)
    }
  )

  router.put(
    '/level/:id',
    newLevelTextValidation('type'),
    newLevelTextValidation('description'),
    newLevelTextValidation('included'),
    newLevelPriceValidation,
    validationBodyMiddleware,
    async (req: Request, res: Response) => {
      await repo.updateLevel(req)
      res.set('HX-Trigger', 'reload-level').sendStatus(201)
    }
  )

  router.delete('/user/:id', async (req: Request, res: Response) => {
    await repo.deleteUser(req)
    res.set('HX-Trigger', 'reload-users').sendStatus(204)
  })

  router.put(
    '/user/:id',
    validateBodyEmail,
    validateBodyName,
    validationBodyMiddleware,
    async (req: Request, res: Response) => {
      await repo.updateUser(req)
      res.set('HX-Trigger', 'reload-user').sendStatus(201)
    }
  )
  return router
}
