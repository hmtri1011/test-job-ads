import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { ERRORS } from '../config'
import { DecodedToken } from '../type'

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json(ERRORS.UNAUTHORIZED)
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken
    if (decoded) {
      // invalid token
      if (!decoded.companyId || !decoded.role || !decoded.id) {
        res.status(401).json(ERRORS.UNAUTHORIZED)
        return
      }

      res.locals.user = decoded
      next()
    }
  } catch (error) {
    // expired token
    res.status(401).json(ERRORS.UNAUTHORIZED)
    return
  }
}
