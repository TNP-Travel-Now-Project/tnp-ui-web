'use client'

import { useState } from 'react'
import { useLogin } from '@/src/features/auth/hooks/useLogin'
import type { LoginPageProps } from '@/src/features/auth/type'

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useLogin({ onSuccess })

  return (
    <div>
      <h1>Login</h1>
      <input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
      <input placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)} />

      <button
        type='button'
        onClick={() =>
          mutation.mutate({
            email,
            password,
            rememberMe: true,
          })
        }
      >
        Login
      </button>
    </div>
  )
}
