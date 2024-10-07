import request from 'supertest'
import express from 'express'
import jwt from 'jsonwebtoken'

import { jobRoute } from '../routes/job'
import * as jobService from '../services/job'
import { ERRORS, PAGE_SIZE } from '../config'

jest.mock('../services/job')
jest.mock('@prisma/client')

const app = express()
app.use(express.json())
app.use('/jobs', jobRoute)

const mockToken = jwt.sign({ id: 'user1', role: 'ADMIN', companyId: 'company1' }, process.env.JWT_SECRET as string)

describe('Job Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /jobs', () => {
    it('should return paginated jobs', async () => {
      const mockJobs = [{ id: 'job1', title: 'Test Job' }]
      ;(jobService.getJobs as jest.Mock).mockResolvedValue(mockJobs)

      const response = await request(app).get('/jobs').set('Authorization', `Bearer ${mockToken}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ jobs: mockJobs })
      expect(jobService.getJobs).toHaveBeenCalledWith({
        companyId: 'company1',
        currentPage: 1,
        pageSize: PAGE_SIZE
      })
    })
  })

  describe('POST /jobs', () => {
    it('should create a new job', async () => {
      const mockJob = {
        title: 'New Job',
        description: 'Job description',
        expiredAt: new Date(Date.now() + 86400000).toISOString()
      }
      ;(jobService.createJob as jest.Mock).mockResolvedValue(mockJob)

      const response = await request(app)
        .post('/jobs')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          title: 'New Job',
          description: 'Job description',
          expiredAt: new Date(Date.now() + 86400000).toISOString()
        })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ job: mockJob })
      expect(jobService.createJob).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Job',
          description: 'Job description',
          companyId: 'company1',
          ownerId: 'user1'
        })
      )
    })

    it('should return 403 if user is not an admin', async () => {
      const nonAdminToken = jwt.sign(
        { id: 'user2', role: 'USER', companyId: 'company1' },
        process.env.JWT_SECRET as string
      )

      const response = await request(app)
        .post('/jobs')
        .set('Authorization', `Bearer ${nonAdminToken}`)
        .send({
          title: 'New Job',
          description: 'Job description',
          expiredAt: new Date(Date.now() + 86400000).toISOString()
        })

      expect(response.status).toBe(403)
      expect(response.body).toEqual({ error: ERRORS.PERMISSION_DENIED })
    })
  })

  describe('GET /jobs/:id', () => {
    it('should return a job by id', async () => {
      const mockJob = { id: 'job1', title: 'Test Job', companyId: 'company1' }
      ;(jobService.getJobById as jest.Mock).mockResolvedValue(mockJob)

      const response = await request(app).get('/jobs/job1').set('Authorization', `Bearer ${mockToken}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ job: mockJob })
      expect(jobService.getJobById).toHaveBeenCalledWith('job1')
    })

    it('should return 403 if job belongs to another company', async () => {
      const mockJob = { id: 'job1', title: 'Test Job', companyId: 'company2' }
      ;(jobService.getJobById as jest.Mock).mockResolvedValue(mockJob)

      const response = await request(app).get('/jobs/job1').set('Authorization', `Bearer ${mockToken}`)

      expect(response.status).toBe(403)
      expect(response.body).toEqual({ error: ERRORS.PERMISSION_DENIED })
    })
  })

  describe('PUT /jobs/:id', () => {
    it('should update a job', async () => {
      const mockJob = {
        id: 'job1',
        title: 'Test Job',
        companyId: 'company1',
        ownerId: 'user1'
      }
      const updatedJob = { ...mockJob, title: 'Updated Job' }
      ;(jobService.getJobById as jest.Mock).mockResolvedValue(mockJob)
      ;(jobService.updateJob as jest.Mock).mockResolvedValue(updatedJob)

      const response = await request(app)
        .put('/jobs/job1')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({ title: 'Updated Job' })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ job: updatedJob })
      expect(jobService.updateJob).toHaveBeenCalledWith({
        id: 'job1',
        data: { title: 'Updated Job' }
      })
    })

    it('should return 403 if user is not the owner', async () => {
      const mockJob = {
        id: 'job1',
        title: 'Test Job',
        companyId: 'company1',
        ownerId: 'user2'
      }
      ;(jobService.getJobById as jest.Mock).mockResolvedValue(mockJob)

      const response = await request(app)
        .put('/jobs/job1')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({ title: 'Updated Job' })

      expect(response.status).toBe(403)
      expect(response.body).toEqual({ error: ERRORS.PERMISSION_DENIED })
    })
  })

  describe('DELETE /jobs/:id', () => {
    it('should delete a job', async () => {
      const mockJob = {
        id: 'job1',
        title: 'Test Job',
        companyId: 'company1',
        ownerId: 'user1'
      }
      ;(jobService.getJobById as jest.Mock).mockResolvedValue(mockJob)
      ;(jobService.deleteJob as jest.Mock).mockResolvedValue(mockJob)

      const response = await request(app).delete('/jobs/job1').set('Authorization', `Bearer ${mockToken}`)

      expect(response.status).toBe(204)
      expect(jobService.deleteJob).toHaveBeenCalledWith('job1')
    })

    it('should return 403 if user is not the owner', async () => {
      const mockJob = {
        id: 'job1',
        title: 'Test Job',
        companyId: 'company1',
        ownerId: 'user2'
      }
      ;(jobService.getJobById as jest.Mock).mockResolvedValue(mockJob)

      const response = await request(app).delete('/jobs/job1').set('Authorization', `Bearer ${mockToken}`)

      expect(response.status).toBe(403)
      expect(response.body).toEqual({ error: ERRORS.PERMISSION_DENIED })
    })
  })
})
