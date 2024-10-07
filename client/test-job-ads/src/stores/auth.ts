import { create } from 'zustand'

import { User } from '@/schemas/user'

interface AuthStore {
  user: User | null
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  setUser: (user: User) => set({ user })
}))
