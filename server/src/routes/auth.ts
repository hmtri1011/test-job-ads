import express from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const authRoute = express.Router()

authRoute.post('/login', async (req, res) => {
  const { email } = req.body
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
})

export { authRoute }
