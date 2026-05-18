'use client'

import { useLoginForm } from '@/features/auth/hooks/login/useLoginForm'
import type { LoginPageProps } from '@/features/auth/type'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/form/Form/form'
import second from '@/shared/components/form/Form'
import { Input } from '@/shared/components/common/Input'
import { Button } from '@/shared/components/common/Button'
import { AirVent } from 'lucide-react'

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
