/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getStorage } from '@/lib/utils'

import { storageKey } from '@/config'

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
      const token = getStorage(storageKey.token)

      if (!token) {
        router.push('/login')
      }

      setIsMounted(true)
    }, [router])

    if (!isMounted) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
