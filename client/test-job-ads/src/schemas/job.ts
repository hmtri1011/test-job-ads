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
