/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { getStorage } from '@/lib/utils'

import { storageKey } from '@/config'

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const token = getStorage(storageKey.token)

    useEffect(() => {
      if (!token) {
        redirect('/login')
      }
    }, [token])

    if (!token) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
