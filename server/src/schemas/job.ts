import { z } from 'zod'

export const createJobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  description: z.string().min(10, 'Job description must be at least 10 characters'),
  expiredAt: z
    .string()
    .datetime()
    .refine(value => {
      const date = new Date(value)

      return !isNaN(date.getTime())
    }, 'Invalid date')
    .refine(value => {
      const date = new Date(value)

      return date.getTime() > new Date().getTime()
    }, 'Expiry date must be in the future'),
  status: z.enum(['OPEN', 'EXPIRED', 'CLOSED']).default('OPEN')
})

export const updateJobSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(10).optional(),
  expiredAt: z
    .string()
    .datetime()
    .refine(value => {
      const date = new Date(value)

      return !isNaN(date.getTime())
    }, 'Invalid date')
    .refine(value => {
      const date = new Date(value)

      return date.getTime() > new Date().getTime()
    }, 'Expiry date must be in the future')
    .optional(),
  status: z.enum(['OPEN', 'EXPIRED', 'CLOSED']).default('OPEN').optional()
})

export type CreateJobRequest = z.infer<typeof createJobSchema> & {
  companyId: string
  ownerId: string
}

export type UpdateJobRequest = z.infer<typeof updateJobSchema>
