import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Job } from '@/schemas/job'
import { DeleteJobAction } from './DeleteJobAction'

export interface JobItemProps extends Job {}

export const JobItem = ({ id, title, description, company, expiredAt, ownerId }: JobItemProps) => {
  return (
    <Link href={`/jobs/${id}/edit`}>
      <Card className='relative w-full cursor-pointer'>
        <DeleteJobAction jobId={id} ownerId={ownerId} />
        <CardHeader className='pb-3'>
          <CardTitle className='text-2xl text-primary'>{title}</CardTitle>
          <CardDescription>{company?.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
          <p className='text-sm text-neutral-600'>Expired at: {new Date(expiredAt).toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
