import { PrismaClient } from '@prisma/client'

import { JobRequest } from '../type'
import { CreateJobRequest, UpdateJobRequest } from '../schemas/job'

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
    take: pageSize,
    orderBy: {
      createdAt: 'desc'
    }
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

export const getJobById = async (id: string) => {
  const job = await prisma.job.findUnique({
    where: {
      id
    }
  })

  return job
}

export const updateJob = async ({ id, data }: { id: string; data: UpdateJobRequest }) => {
  const updatedJob = await prisma.job.update({
    where: {
      id
    },
    data: {
      ...data
    }
  })

  return updatedJob
}

export const deleteJob = async (id: string) => {
  const deletedJob = await prisma.job.delete({
    where: {
      id
    }
  })

  return deletedJob
}
