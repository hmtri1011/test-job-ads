'use client'

import { useJobById } from '@/hooks/useJobs'
import { Skeleton } from '@/components/ui/skeleton'
import { JobForm } from './JobForm'

export const JobDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useJobById(id)

  if (isLoading) {
    return <Skeleton className='w-full h-32' />
  }

  if (!data) {
    return <div>Job not found</div>
  }

  return <JobForm id={id} defaultData={data} />
}
