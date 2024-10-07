import { useQuery } from '@tanstack/react-query'

import { apiUrl, storageKey } from '@/config'
import { getStorage, removeStorage } from '@/lib/utils'
import { Job } from '@/schemas/job'

export interface PaginationProps {
  page: number
  perPage: number
}

export const jobsQueryKey = ({ page, perPage }: PaginationProps) => ['@jobs', page, perPage]
export const PER_PAGE = 10

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

        return resData?.jobs ? resData.jobs : []
      } catch (error) {
        return []
      }
    }
  })
}
