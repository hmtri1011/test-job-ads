import express from 'express'

import { jobRoute } from './job'
import { authRoute } from './auth'

const v1 = express.Router()

v1.use('/jobs', jobRoute)
v1.use('/auth', authRoute)

export { v1 }
