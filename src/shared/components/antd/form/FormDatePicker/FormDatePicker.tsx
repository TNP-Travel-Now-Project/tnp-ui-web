import { DatePicker, Form } from 'antd'
import type React from 'react'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form'

export interface FormDatePickerProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: React.ReactNode
  required?: boolean
  rules?: any
  error?: FieldError | undefined
  hint?: React.ReactNode
  description?: React.ReactNode
  datePickerProps?: React.ComponentProps<typeof DatePicker>
}

export const FormDatePicker = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  required,
  rules,
  error,
  hint,
  description,
  datePickerProps,
}: FormDatePickerProps<TFieldValues>) => {
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
        render={({ field }) => (
          <DatePicker
            {...field}
            id={name}
            value={field.value ?? null}
            onChange={(date) => field.onChange(date)}
            style={{ width: '100%' }}
            {...datePickerProps}
          />
        )}
      />
    </Form.Item>
  )
}

export default FormDatePicker
