import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRegister } from '@/features/auth/hooks/register/useRegister'
import type { RegisterFormData } from '@/features/auth/schemas/register.schema'
import { RegisterSchema, toRegisterRequest } from '@/features/auth/schemas/register.schema'
import type { RegisterPageProps } from '@/features/auth/type'

export default function RegisterForm({ onSuccess }: RegisterPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  })

  const mutation = useRegister({ onSuccess })

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(toRegisterRequest(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
    </form>
  )
}
