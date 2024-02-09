import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  console.log(errors);
  
}