import express from 'express'

import { validateToken } from '../middlewares/validateToken'
import { validateRequestData } from '../middlewares/validateRequestData'
import { ERRORS, PAGE_SIZE } from '../config'
import { createJob, getJobs } from '../services/job'
import { DecodedToken, JobQueryParams } from '../type'
import { createJobSchema } from '../schemas/job'

const jobRoute = express.Router()

// get paginated jobs
jobRoute.get('/', validateToken, async (req, res) => {
  const queryParams = req.query
  const page = queryParams.page as unknown as JobQueryParams
  const currentPage = page?.number ? parseInt(page.number) : 1
  const pageSize = page?.size ? parseInt(page.size) : PAGE_SIZE
  const companyId = (res.locals.user as DecodedToken).companyId

  const jobs = await getJobs({ companyId, currentPage, pageSize })
  res.status(200).json({ jobs })
})

jobRoute.post('/', validateToken, validateRequestData(createJobSchema), async (req, res) => {
  try {
    const job = await createJob(req.body)

    res.status(201).json({ job })
  } catch (error) {
    res.status(500).json({ error: ERRORS.INTERNAL_SERVER_ERROR })
  }
})

export { jobRoute }
