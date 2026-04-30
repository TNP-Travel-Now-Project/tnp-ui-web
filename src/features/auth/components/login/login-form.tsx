'use client'

import { useLoginForm } from '@/src/features/auth/hooks/login/useLoginForm'
import type { LoginPageProps } from '@/src/features/auth/type'
import { Button, Form, FormField, FormMessage } from '@/src/shared/components'

export default function LoginForm({ onSuccess }: LoginPageProps) {
  const { form, onSubmit, formError, isLoading } = useLoginForm({ onSuccess })

  return (
    <Form form={form} onSubmit={onSubmit} className='space-y-5'>
      {formError && <FormMessage>{formError}</FormMessage>}

      <FormField name='email' label='Email' type='email' placeholder='you@example.com' required />

      <FormField name='password' label='Password' type='password' placeholder='••••••••' required />

      <Button type='submit' fullWidth isLoading={isLoading} loadingText='Signing in...'>
        Sign in
      </Button>
    </Form>
  )
}
