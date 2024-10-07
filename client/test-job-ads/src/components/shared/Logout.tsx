'use client'

import { removeStorage } from '@/lib/utils'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { storageKey } from '@/config'

export interface LogoutProps {}

export const Logout = () => {
  const handleLogout = () => {
    removeStorage(storageKey.token)
    window.location.href = '/login'
  }

  return <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
}
