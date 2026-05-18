'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { Checkbox } from '@/shared/components/ui/form/checkbox'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/form/Form'

interface FormCheckboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  control: Control<TFieldValues>
  name: TName
  label?: React.ReactNode
  className?: string
}

export const FormCheckbox = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  className,
}: FormCheckboxProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className='flex items-center gap-2'>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            {label && (
              <FormLabel className='mb-0!'>{label}</FormLabel>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/* <FormCheckbox
  name='agree'
  control={form.control}
  label='Tôi đồng ý với điều khoản'
/> */
