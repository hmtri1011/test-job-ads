import express from 'express'

import { validateToken } from '../middlewares/validateToken'
import { validateRequestData } from '../middlewares/validateRequestData'
import { ERRORS, PAGE_SIZE } from '../config'
import { createJob, deleteJob, getJobById, getJobs, updateJob } from '../services/job'
import { DecodedToken, JobQueryParams } from '../type'
import { createJobSchema, updateJobSchema } from '../schemas/job'

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

// create a new job
jobRoute.post('/', validateToken, validateRequestData(createJobSchema), async (req, res) => {
  try {
    // check role
    const user = res.locals.user as DecodedToken
    if (user.role !== 'ADMIN') {
      res.status(403).json({ error: ERRORS.PERMISSION_DENIED })
      return
    }

    const job = await createJob({
      ...req.body,
      companyId: user.companyId,
      ownerId: user.id
    })

    res.status(201).json({ job })
  } catch (error) {
    res.status(500).json({ error: ERRORS.INTERNAL_SERVER_ERROR })
  }
})

// get a job by id
jobRoute.get('/:id', validateToken, async (req, res) => {
  const job = await getJobById(req.params.id)
  const companyId = (res.locals.user as DecodedToken).companyId

  // prevent user from accessing job of other company
  if (job?.companyId !== companyId) {
    res.status(403).json({ error: ERRORS.PERMISSION_DENIED })
    return
  }

  res.status(200).json({ job })
})

// update a job
jobRoute.put('/:id', validateToken, validateRequestData(updateJobSchema), async (req, res) => {
  try {
    const job = await getJobById(req.params.id)
    const companyId = (res.locals.user as DecodedToken).companyId
    const onwerId = (res.locals.user as DecodedToken).id
    const userRole = (res.locals.user as DecodedToken).role

    /* we can refactor this to have a canUpdateJob flag, but separate it for now for readability */

    // prevent user from accessing job of other company
    if (job?.companyId !== companyId) {
      res.status(403).json({ error: ERRORS.PERMISSION_DENIED })
      return
    }

    // prevent user from updating job that is not belong to them
    if (job?.ownerId !== onwerId) {
      res.status(403).json({ error: ERRORS.PERMISSION_DENIED })
      return
    }

    // prevent user from updating job that is not admin
    // incase the owner was an ADMIN at first, then company changed the role of the owner to USER
    if (userRole !== 'ADMIN') {
      res.status(403).json({ error: ERRORS.PERMISSION_DENIED })
      return
    }

    const newJob = await updateJob({ id: req.params.id, data: req.body })

    res.status(200).json({ job: newJob })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: ERRORS.INTERNAL_SERVER_ERROR })
  }
})

// delete a job
jobRoute.delete('/:id', validateToken, async (req, res) => {
  const job = await getJobById(req.params.id)
  const companyId = (res.locals.user as DecodedToken).companyId
  const onwerId = (res.locals.user as DecodedToken).id
  const userRole = (res.locals.user as DecodedToken).role

  // prevent user from accessing job of other company
  if (job?.companyId !== companyId) {
    res.status(403).json({ error: ERRORS.PERMISSION_DENIED })
    return
  }

  // prevent user from deleting job that is not belong to them
  if (job?.ownerId !== onwerId) {
    res.status(403).json({ error: ERRORS.PERMISSION_DENIED })
    return
  }

  // prevent user from deleting job that is not admin
  // incase the owner was an ADMIN at first, then company changed the role of the owner to USER
  if (userRole !== 'ADMIN') {
    res.status(403).json({ error: ERRORS.PERMISSION_DENIED })
    return
  }

  await deleteJob(req.params.id)

  res.status(204).send()
})

/* can enhance to have a cronjob to update the job status to expired if the expired date is before today */

export { jobRoute }
