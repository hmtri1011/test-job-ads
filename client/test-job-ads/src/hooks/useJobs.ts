import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

import { apiUrl, storageKey } from '@/config'
import { getStorage, removeStorage } from '@/lib/utils'
import { Job, JobFormRequestData, JobStatus } from '@/schemas/job'

export interface PaginationProps {
  page: number
  perPage: number
}

export const PER_PAGE = 10

export const jobsQueryKey = ({ page, perPage }: PaginationProps) => ['@jobs', page, perPage]
export const useJobs = ({ page, perPage }: PaginationProps) => {
  return useQuery<Job[]>({
    queryKey: jobsQueryKey({ page, perPage }),
    queryFn: async () => {
      const token = getStorage(storageKey.token)

      try {
        const res = await fetch(`${apiUrl}/v1/jobs?page[number]=${page}&page[size]=${perPage}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        // if has time instead this we can use axios interceptor to handle for every request
        if (!res.ok) {
          if (res.status === 401) {
            removeStorage(storageKey.token)
            window.location.href = '/login'
          }
        }

        const resData = await res.json()
        if (resData.error) {
          throw resData.error
        }

        return resData?.jobs ? resData.jobs : []
      } catch (error) {
        return []
      }
    }
  })
}

export const useCreateJob = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: JobFormRequestData) => {
      const token = getStorage(storageKey.token)

      try {
        const res = await fetch(`${apiUrl}/v1/jobs`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...data,
            status: JobStatus.OPEN
          })
        })

        if (!res.ok) {
          if (res.status === 401) {
            removeStorage(storageKey.token)
            window.location.href = '/login'
          }
        }

        const resData = await res.json()
        if (resData.error) {
          throw resData.error
        }

        return resData.job as Job
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      // invalidate the jobs query to refetch the data
      queryClient.invalidateQueries({ queryKey: jobsQueryKey({ page: 1, perPage: PER_PAGE }) })
      router.replace(`/jobs`)
    }
  })
}

export const jobByIdQueryKey = (id: string) => ['@job', id]
export const useJobById = (id: string) => {
  return useQuery({
    queryKey: jobByIdQueryKey(id),
    queryFn: async () => {
      const token = getStorage(storageKey.token)

      try {
        const res = await fetch(`${apiUrl}/v1/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!res.ok) {
          if (res.status === 401) {
            removeStorage(storageKey.token)
            window.location.href = '/login'
          }
        }

        const resData = await res.json()

        if (resData.error) {
          throw resData.error
        }

        return resData.job as Job
      } catch (error) {
        return null
      }
    }
  })
}

export const useUpdateJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: JobFormRequestData & { id: string }) => {
      const token = getStorage(storageKey.token)

      try {
        const res = await fetch(`${apiUrl}/v1/jobs/${data.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        if (!res.ok) {
          if (res.status === 401) {
            removeStorage(storageKey.token)
            window.location.href = '/login'
          }
        }

        const resData = await res.json()
        if (resData.error) {
          throw resData.error
        }

        return resData.job as Job
      } catch (error) {
        throw error
      }
    },
    onSuccess: (_, data) => {
      // optimistic update job detail
      queryClient.setQueryData(jobByIdQueryKey(data.id), (oldData: Job | undefined) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          ...data
        }
      })

      // invalidate the jobs query to refetch the data
      queryClient.invalidateQueries({ queryKey: ['@jobs'] })
    }
  })
}

export const useDeleteJob = () => {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || 1

  const currentPage = page && !isNaN(Number(page)) ? Number(page) : 1

  return useMutation({
    mutationFn: async (id: string) => {
      const token = getStorage(storageKey.token)

      try {
        const res = await fetch(`${apiUrl}/v1/jobs/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!res.ok) {
          if (res.status === 401) {
            removeStorage(storageKey.token)
            window.location.href = '/login'
          }
        }
      } catch (error) {
        throw error
      }
    },
    onSuccess: (_, id) => {
      // invalidate the jobs query to refetch the data
      queryClient.setQueryData(jobsQueryKey({ page: currentPage, perPage: PER_PAGE }), (oldData: Job[] | undefined) => {
        return oldData?.filter(job => job.id !== id)
      })
    }
  })
}
