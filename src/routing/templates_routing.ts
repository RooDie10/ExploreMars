import express, { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import Handlebars from 'handlebars'
import { FirestoreDB } from '../repo/firestore'
import { firestoreConfig } from '../repo/config'
import { isUserAuth } from './middlewares/middlewares'

const getTemplate = async (
  path: string
): Promise<HandlebarsTemplateDelegate> => {
  const template = await fs.promises.readFile(
    `src/templates/${path}.hbs`,
    'utf-8'
  )
  return Handlebars.compile(template)
}

const checkUser = (req: Request) => {
  if (req.session.user != null) return true
  return false
}

export const templatesRouter = () => {
  const router = express.Router()
  const db = new FirestoreDB(firestoreConfig)

  router.get('/header', async (req: Request, res: Response) => {
    const result = await getTemplate('header')
    let prop = {}
    if (checkUser(req)) prop = { isUserAuth: true, name: req.session.user.name }
    else prop = { isUserAuth: false }
    res.send(result(prop))
  })

  router.get('/levels', async (req: Request, res: Response) => {
    let levels
    let prop
    if (req.query.id != null) {
      levels = await db.getLevels(req.query.id.toString())
      prop = { isArray: false, data: levels }
      console.log(prop);
      
    } else {
      levels = await db.getLevels()
      prop = { isArray: true, data: levels }
    }

    const result = await getTemplate('levels')
    res.send(result(prop))
  })

  router.get('/profile', async (req: Request, res: Response) => {
    if (!checkUser(req)) return res.redirect('/')
    const user = await db.getUserById(req.session.user.id)
    const result = await getTemplate('profile')
    res.send(result(user))
  })

  router.get('/buy', async (req: Request, res: Response) => {
    let prop = { isUserAuth: checkUser(req) }
    const result = await getTemplate('buy')
    res.send(result(prop))
  })

  router.get('/dialogs', async (req: Request, res: Response) => {
    const result = await getTemplate('dialogs')
    res.send(result({}))
  })

  router.get('/buy_dialog', async (req: Request, res: Response) => {
    const levels = await db.getLevels()
    const result = await getTemplate('buy_dialog')
    res.send(result(levels))
  })

  return router
}
