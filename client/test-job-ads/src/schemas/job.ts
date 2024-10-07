import { z } from 'zod'

export const JobFormSchema = z.object({
  title: z.string().min(5, 'Job title must be at least 5 characters'),
  description: z.string().min(10, 'Job description must be at least 10 characters'),
  expiredAt: z.string().datetime()
})

export type JobFormRequestData = z.infer<typeof JobFormSchema>

export interface Company {
  id: string
  name: string
}

export enum JobStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED'
}

export interface Job {
  id: string
  title: string
  description: string
  expiredAt: string
  status: JobStatus
  ownerId: string
  company: Company
}
