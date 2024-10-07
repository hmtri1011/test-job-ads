'use client'

import { useParams } from 'next/navigation'

import { withAuth } from '@/components/shared/withAuth'
import { JobDetail } from '@/components/jobs/JobDetail'

const JobPage = () => {
  const { id } = useParams()

  return (
    <div>
      <h1 className='text-2xl font-bold mb-3'>Job Detail</h1>
      <JobDetail id={id as string} />
    </div>
  )
}

export default withAuth(JobPage)
