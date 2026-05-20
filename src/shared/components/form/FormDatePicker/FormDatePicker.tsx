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

interface FormDatePickerProps<
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

export const FormDatePicker = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder = 'dd/mm/yyyy',
  className,
  inputClassName,
}: FormDatePickerProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type='date' placeholder={placeholder} className={inputClassName} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/* <FormDatePicker
  name='dob'
  control={form.control}
  label='Ngày sinh'
  placeholder='dd/mm/yyyy'
/> */
