import { Form, Input } from 'antd'
import type React from 'react'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form'

export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: React.ReactNode
  required?: boolean
  rules?: any
  error?: FieldError | undefined
  hint?: React.ReactNode
  description?: React.ReactNode
  layout?: 'horizontal' | 'vertical' | 'inline'
  inputProps?: React.ComponentProps<typeof Input>
}

export const FormField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  required,
  rules,
  error,
  hint,
  description,
  inputProps,
}: FormFieldProps<TFieldValues>) => {
  return (
    <Form.Item
      label={label}
      required={required}
      help={error ? error.message : hint}
      validateStatus={error ? 'error' : undefined}
      extra={description}
      htmlFor={name}
    >
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <Input {...field} id={name} status={fieldState.error ? 'error' : ''} {...inputProps} />
        )}
      />
    </Form.Item>
  )
}

export default FormField
