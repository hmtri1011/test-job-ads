import express from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

import { ERRORS } from '../config'
import { validateToken } from '../middlewares/validateToken'

const prisma = new PrismaClient()
const authRoute = express.Router()

authRoute.post('/login', async (req, res) => {
  const { email } = req.body
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, companyId: user.companyId },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h'
      }
    )

    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: ERRORS.INTERNAL_SERVER_ERROR })
  }
})

authRoute.get('/me', validateToken, async (_, res) => {
  const user = res.locals.user

  res.status(200).json({ user })
})

export { authRoute }
