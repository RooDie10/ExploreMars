import { NextFunction, Request, Response } from 'express'
import { body, matchedData, param, validationResult } from 'express-validator'

export const validateBodyEmail = body('email')
  .trim()
  .escape()
  .isEmail()
  .withMessage('Not walid Email')
  .isLength({ max: 254 })
  .withMessage('Exceeded max length')

export const validateBodyPassword = body('password')
  .trim()
  .escape()
  .isLength({ max: 254 })
  .withMessage('Exceeded max length')

export const validateBodyName = body('name')
  .trim()
  .escape()
  .isLength({ max: 254 })
  .withMessage('Exceeded max length')

export const validationBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    let result: { field: string; message: string }[] = []
    errors.array().forEach((error) => {
      if (error.type === 'field')
        result.push({ field: error.path, message: error.msg })
    })
    return res.json({ errors: result })
  }
  req.body = matchedData(req)
  next()
}

export const newLevelTextValidation = (field: string) =>
  body(field)
    .trim()
    .escape()
    .isLength({ max: 254 })
    .withMessage(`Exceeded max lenght on ${field} field`)

export const newLevelPriceValidation = body('price')
  .isInt()
  .isLength({ max: 254 })
  .withMessage('Exceeded max lenght at field price')
