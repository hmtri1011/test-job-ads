'use client'

import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { JobFormRequestData, JobFormSchema } from '@/schemas/job'
import { useCreateJob, useUpdateJob } from '@/hooks/useJobs'

export interface JobFormProps {
  id?: string
  defaultData?: JobFormRequestData
}

export const JobForm = ({ id, defaultData }: JobFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(JobFormSchema),
    defaultValues: defaultData ? defaultData : undefined
  })

  const isEdit = !!id
  const { mutateAsync: createJob, isPending: pendingCreate, error: errorCreate } = useCreateJob()
  const { mutateAsync: updateJob, isPending: pendingUpdate, error: errorUpdate } = useUpdateJob()

  const isPending = isEdit ? pendingUpdate : pendingCreate
  const error = isEdit ? errorUpdate : errorCreate

  const expiredAt = watch('expiredAt')

  const handleSelectExpiryDate = (date: Date | undefined) => {
    setValue('expiredAt', date?.toISOString() ?? '')
  }

  const onSubmit = async (values: JobFormRequestData) => {
    if (isEdit) {
      await updateJob({ id, ...values })
      return
    }

    await createJob(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='jobTitle'>Job Title</Label>
          <Input id='jobTitle' {...register('title')} required />
          {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='jobDescription'>Job Description</Label>
          <Textarea id='jobDescription' {...register('description')} required />
          {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='expiryDate'>Expiry Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={`w-full justify-start text-left font-normal ${!expiredAt && 'text-muted-foreground'}`}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {expiredAt ? format(expiredAt, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            {errors.expiredAt && <p className='text-red-500 text-sm'>{errors.expiredAt.message}</p>}
            <PopoverContent className='w-auto p-0'>
              <Calendar mode='single' selected={new Date(expiredAt)} onSelect={handleSelectExpiryDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter>
        <Button type='submit' className='w-full' disabled={isPending}>
          {isEdit ? 'Update Job Ad' : 'Create Job Ad'}
        </Button>
      </CardFooter>
      {error && <p className='text-red-500 text-center -mt-3'>{JSON.stringify(error)}</p>}
    </form>
  )
}
