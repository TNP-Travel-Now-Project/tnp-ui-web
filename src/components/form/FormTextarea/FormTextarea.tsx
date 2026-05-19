'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { Textarea } from '@/components/ui/form/textarea'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form/Form'

interface FormTextareaProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  label?: React.ReactNode
  placeholder?: string
  className?: string
  textareaClassName?: string
  rows?: number
}

export const FormTextarea = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  className,
  textareaClassName,
  rows,
}: FormTextareaProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={textareaClassName}
              rows={rows}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/* <FormTextarea
  name='bio'
  control={form.control}
  label='Giới thiệu'
  placeholder='Nhập thông tin...'
  rows={4}
/> */
