import { Loader2, Trash } from 'lucide-react'

import { useAuthStore } from '@/stores/auth'
import { useDeleteJob } from '@/hooks/useJobs'

export interface DeleteJobActionProps {
  jobId: string
  ownerId: string
}

export const DeleteJobAction = ({ jobId, ownerId }: DeleteJobActionProps) => {
  const { mutate: deleteJob, isPending } = useDeleteJob()

  const user = useAuthStore(state => state.user)
  const isOwner = user?.id === ownerId

  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    // prevent default link behavior
    e.preventDefault()

    deleteJob(jobId)
  }

  if (isPending) return <Loader2 className='absolute top-3 right-3 z-10 stroke-slate-600' />

  return isOwner ? <Trash className='absolute top-3 right-3 z-10 stroke-slate-600' onClick={handleDelete} /> : null
}
