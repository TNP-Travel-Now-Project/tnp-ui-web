// src/shared/components/form/FormField.tsx
'use client'

import { Form, Input } from 'antd'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { cn } from '@/shared/lib/utils/cn'

export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: React.ReactNode
  required?: boolean
  placeholder?: string
  error?: FieldError
  hint?: React.ReactNode
  description?: React.ReactNode
  className?: string
  inputProps?: React.ComponentProps<typeof Input>
}

export const FormField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  required,
  placeholder,
  error,
  hint,
  description,
  className,
  inputProps,
}: FormFieldProps<TFieldValues>) => {
  return (
    <Form.Item
      label={label}
      required={required}
      help={error?.message || hint}
      validateStatus={error ? 'error' : undefined}
      extra={description}
      className={className}
    >
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            placeholder={placeholder}
            status={fieldState.error ? 'error' : undefined}
            {...inputProps}
          />
        )}
      />
    </Form.Item>
  )
}

export default FormField
