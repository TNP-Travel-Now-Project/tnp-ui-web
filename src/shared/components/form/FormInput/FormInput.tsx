'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { Input } from '@/shared/components/common/Input'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/form/Form'

// ====================== FormInput ======================

interface FormInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  control: Control<TFieldValues>
  name: TName

  label?: React.ReactNode
  placeholder?: string
  type?: string
  className?: string
  inputClassName?: string
}

export const FormInput = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  className,
  inputClassName,
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Input type={type} placeholder={placeholder} className={inputClassName} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/* <FormInput
  name='email'
  control={form.control}
  label='Email'
  placeholder='Enter your email'
  type='email'
  required
/> */
