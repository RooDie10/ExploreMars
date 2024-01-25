import express, { Request, Response } from 'express'
import fs from 'fs'
import Handlebars from 'handlebars'
import { FirestoreDB } from '../repo/firestore'
import { firestoreConfig } from '../repo/config'

const getTemplate = async (
  path: string
): Promise<HandlebarsTemplateDelegate> => {
  const template = await fs.promises.readFile(
    `src/templates/${path}.hbs`,
    'utf-8'
  )
  return Handlebars.compile(template)
}

export const templatesRouter = () => {
  const router = express.Router()
  const db = new FirestoreDB(firestoreConfig)

  router.get('/header', async (req: Request, res: Response) => {
    const result = await getTemplate('header')
    let prop = {}
    if (req.session.user != null) {
      prop = {
        isUserAuth: true,
        name: req.session.user.name
      }
    } else {
      prop = { isUserAuth: false }
    }

    res.send(result(prop))
  })

  router.get('/levels', async (req, res) => {
    const levels = await db.getLevels()
    const result = await getTemplate('levels')
    res.send(result(levels))
  })

  return router
}
