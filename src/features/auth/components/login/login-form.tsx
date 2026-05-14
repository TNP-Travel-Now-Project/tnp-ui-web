'use client'

import { useLoginForm } from '@/features/auth/hooks/login/useLoginForm'
import type { LoginPageProps } from '@/features/auth/type'
import { Form, FormField, FormMessage } from '@/shared/components/form'
import { Button } from '@/shared/components/ui'

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
