/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getStorage, setStorage } from '@/lib/utils'

import { apiUrl, storageKey } from '@/config'
import { useAuthStore } from '@/stores/auth'

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)
    const setUser = useAuthStore(state => state.setUser)

    useEffect(() => {
      const token = getStorage(storageKey.token)

      if (!token) {
        router.push('/login')
      }

      const getMe = async () => {
        const res = await fetch(`${apiUrl}/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${getStorage(storageKey.token)}`
          }
        }).then(res => res.json())

        if (res.user) {
          setUser(res.user)
          setStorage(storageKey.user, JSON.stringify(res.user))
        }
      }

      getMe()
      setIsMounted(true)
    }, [router, setUser])

    if (!isMounted) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
