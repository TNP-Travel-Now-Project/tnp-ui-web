'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/form/radio-group'
import { Label } from '@/shared/components/ui/form/label'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/form/Form'

interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

interface FormRadioProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  control: Control<TFieldValues>
  name: TName
  label?: React.ReactNode
  options: RadioOption[]
  className?: string
}

export const FormRadio = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  options,
  className,
}: FormRadioProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup value={field.value} onValueChange={field.onChange}>
              {options.map((option) => (
                <Label key={option.value} className='flex items-center gap-2 font-normal'>
                  <RadioGroupItem value={option.value} disabled={option.disabled} />
                  {option.label}
                </Label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/* <FormRadio
  name='gender'
  control={form.control}
  label='Giới tính'
  options={[
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' },
    { value: 'other', label: 'Khác' },
  ]}
/> */
