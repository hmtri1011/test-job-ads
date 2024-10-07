'use client'

import { useSearchParams } from 'next/navigation'

import { JobList } from '@/components/jobs/JobList'
import { withAuth } from '@/components/shared/withAuth'
import { PER_PAGE } from '@/hooks/useJobs'

const JobsPage = () => {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || 1

  const currentPage = page && !isNaN(Number(page)) ? Number(page) : 1

  return (
    <div>
      <h1 className='text-2xl font-bold mb-3'>Available Jobs</h1>
      <JobList page={currentPage} perPage={PER_PAGE} />
    </div>
  )
}

export default withAuth(JobsPage)
