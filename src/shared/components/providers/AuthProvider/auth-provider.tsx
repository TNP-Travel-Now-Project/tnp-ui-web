'use client'

import { createContext, type ReactNode, useContext, useCallback } from 'react'

import { useAuthStore } from '@/shared/stores/auth-store'
import type { User } from '@/shared/stores/auth-store'
import { useAuth as useSilentRefresh } from '@/shared/hooks/useAuth'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  // Trigger silent refresh (performRefresh) khi mount
  useSilentRefresh()

  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)
  const loginAction = useAuthStore((s) => s.login)
  const logoutAction = useAuthStore((s) => s.logout)
  const setUser = useAuthStore((s) => s.setUser)

  const login = useCallback(
    (userData: User, token: string) => {
      loginAction(token, userData)
    },
    [loginAction],
  )

  const logout = useCallback(() => {
    logoutAction()
  }, [logoutAction])

  const updateUser = useCallback(
    (updates: Partial<User>) => {
      const currentUser = useAuthStore.getState().user
      if (currentUser) {
        setUser({ ...currentUser, ...updates })
      }
    },
    [setUser],
  )

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
export type { User } from '@/shared/stores/auth-store'

// Usage in component
// const { user, isAuthenticated, login, logout } = useAuth()
