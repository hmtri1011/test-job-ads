import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

import { ERRORS } from '../config'

export const validateRequestData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`
        }))
        res.status(400).json({ error: ERRORS.BAD_REQUEST, details: errorMessages })
      } else {
        res.status(500).json({ error: ERRORS.INTERNAL_SERVER_ERROR })
      }
    }
  }
}
