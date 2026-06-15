'use client'

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role?: string
}

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
  /** Initial user (from server) */
  initialUser?: User | null
  /** Callback when login */
  onLogin?: (user: User, token: string) => void
  /** Callback when logout */
  onLogout?: () => void
  /** Storage key for token */
  tokenKey?: string
}

const AuthProvider = ({
  children,
  initialUser = null,
  onLogin,
  onLogout,
  tokenKey = 'tnp_token',
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(initialUser)
  const [isLoading, setIsLoading] = useState(!initialUser)

  useEffect(() => {
    // Check for existing token on mount
    if (!initialUser) {
      const token = localStorage.getItem(tokenKey)
      if (token) {
        // TODO: Validate token and fetch user info
        // For now, we'll just set loading to false
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }
  }, [initialUser, tokenKey])

  const login = (newUser: User, token: string) => {
    localStorage.setItem(tokenKey, token)
    setUser(newUser)
    onLogin?.(newUser, token)
  }

  const logout = () => {
    localStorage.removeItem(tokenKey)
    setUser(null)
    onLogout?.()
  }

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null))
  }

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

// Hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }

// code template
// <AuthProvider
//   initialUser={initialUser}
//   tokenKey="auth_token"
//   onLogin={(user, token) => console.log('Logged in:', user)}
//   onLogout={() => console.log('Logged out')}
// >
//   {children}
// </AuthProvider>

// Usage in component
// const { user, isAuthenticated, login, logout } = useAuth()
