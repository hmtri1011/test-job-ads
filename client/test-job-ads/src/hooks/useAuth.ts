import { useMutation } from '@tanstack/react-query'

import { apiUrl } from '@/config'

export const useLogin = () => {
  return useMutation({
    mutationFn: (email: string) => {
      return fetch(`${apiUrl}/v1/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  })
}
