'use client'

import { create } from 'zustand'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role?: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isRefreshing: boolean

  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
  login: (token: string, user: User) => void
  logout: () => void
  setLoading: (isLoading: boolean) => void
  setRefreshing: (isRefreshing: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isRefreshing: false,

  setToken: (token) => set({ token, isAuthenticated: token !== null }),

  setUser: (user) => set({ user }),

  login: (token, user) => set({ token, user, isAuthenticated: true, isLoading: false }),

  logout: () =>
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isRefreshing: false,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  setRefreshing: (isRefreshing) => set({ isRefreshing }),
}))
