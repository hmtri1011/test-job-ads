import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { apiUrl, storageKey } from '@/config'
import { setStorage } from '@/lib/utils'

export const useLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(`${apiUrl}/v1/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())

      if (res.token) {
        return res.token
      }

      return null
    },
    onSuccess: (token: string) => {
      setStorage(storageKey.token, token)
      router.replace('/jobs')
    }
  })
}
