import express, { Request, Response } from 'express'
import fs from 'fs'
import Handlebars from 'handlebars'

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

  router.get('/header', async (req: Request, res: Response) => {
    const result = await getTemplate('header')
    res.send(result({}))
  })

  return router
}
