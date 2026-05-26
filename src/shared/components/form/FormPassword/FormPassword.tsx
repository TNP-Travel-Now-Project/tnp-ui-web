'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { Input } from '@/shared/components/common/Input'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/form/Form'

interface FormPasswordProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  label?: React.ReactNode
  placeholder?: string
  className?: string
  inputClassName?: string
}

export const FormPassword = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  className,
  inputClassName,
}: FormPasswordProps<TFieldValues, TName>) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              className={inputClassName}
              rightIcon={
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className='text-muted-foreground hover:text-foreground'
                >
                  {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                </button>
              }
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/* <FormPassword
  name='password'
  control={form.control}
  label='Mật khẩu'
  placeholder='Nhập mật khẩu'
/> */
