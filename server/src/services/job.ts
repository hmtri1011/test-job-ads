import { PrismaClient } from '@prisma/client'

import { JobRequest } from '../type'
import { CreateJobRequest } from '../schemas/job'

const prisma = new PrismaClient()

export const getJobs = async ({ companyId, currentPage, pageSize }: JobRequest) => {
  const jobs = await prisma.job.findMany({
    where: {
      companyId
    },
    include: {
      company: true
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize
  })

  return jobs
}

export const createJob = async (job: CreateJobRequest) => {
  const newJob = await prisma.job.create({
    data: {
      title: job.title,
      description: job.description,
      expiredAt: job.expiredAt,
      status: job.status,
      companyId: job.companyId,
      ownerId: job.ownerId
    }
  })

  return newJob
}
