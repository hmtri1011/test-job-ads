'use client'

import { JobForm } from '@/components/jobs/JobForm'
import { withAuth } from '@/components/shared/withAuth'

const NewJobPage = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-3'>Create New Job</h1>

      <JobForm />
    </div>
  )
}

export default withAuth(NewJobPage)
