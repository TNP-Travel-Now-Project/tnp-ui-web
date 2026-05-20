'use client'

import { AirVent } from 'lucide-react'
import { Button } from '@/shared/components/common/Button'
import { Input } from '@/shared/components/common/Input'
// import second from '@/shared/components/form/Form'
import { useLoginForm } from '@/features/auth/hooks/login/useLoginForm'
import type { LoginPageProps } from '@/features/auth/type'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/form/Form'

export default function LoginForm({ onSuccess }: LoginPageProps) {
  const { form, onSubmit, formError, isPending } = useLoginForm({ onSuccess })

  return (
    <Form {...form} handleSubmit={() => onSubmit}>
      <FormField
        control={form.control}
        name='email'
        render={({ ...field }) => {
          return (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter email' {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />

      <Button type='submit' loading={isPending} loadingText='Signing in...' icon={<AirVent />}>
        Sign in
      </Button>
    </Form>
  )
}
