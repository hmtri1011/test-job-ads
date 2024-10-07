import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Job } from '@/schemas/job'

export interface JobItemProps extends Job {}

export const JobItem = ({ id, title, description, company, expiredAt }: JobItemProps) => {
  return (
    <Link href={`/jobs/${id}`}>
      <Card className='w-full cursor-pointer'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-2xl text-primary'>{title}</CardTitle>
          <CardDescription>{company?.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
          <p>{new Date(expiredAt).toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
