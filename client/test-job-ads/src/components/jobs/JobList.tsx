'use client'

import { useJobs } from '@/hooks/useJobs'
import { JobItem } from './JobItem'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

export interface JobListProps {
  page: number
  perPage: number
}

export const JobList = ({ page, perPage }: JobListProps) => {
  const nextPage = page + 1
  const previousPage = page === 1 ? 1 : page - 1

  const { data: jobs, isLoading } = useJobs({ page, perPage })

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-4 w-full'>
        {Array.from({ length: perPage }).map((_, index) => (
          <Skeleton key={index} className='w-full h-36' />
        ))}
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-4'>
      {jobs?.map(job => (
        <JobItem key={job.id} {...job} />
      ))}

      <Pagination className='mt-3'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/jobs?page=${previousPage}`}
              style={{ pointerEvents: page === 1 ? 'none' : 'auto' }}
            />
          </PaginationItem>
          <PaginationItem className='font-bold'>
            <PaginationLink href='#' className='font-bold'>
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/jobs?page=${nextPage}`}
              style={{ pointerEvents: jobs && jobs.length < perPage ? 'none' : 'auto' }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
