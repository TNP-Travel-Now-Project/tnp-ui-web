import { Form, Select } from 'antd'
import type React from 'react'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form'

export interface FormSelectProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: React.ReactNode
  required?: boolean
  rules?: any
  error?: FieldError | undefined
  options: { label: React.ReactNode; value: any }[]
  hint?: React.ReactNode
  description?: React.ReactNode
  selectProps?: React.ComponentProps<typeof Select>
}

export const FormSelect = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  required,
  rules,
  error,
  options,
  hint,
  description,
  selectProps,
}: FormSelectProps<TFieldValues>) => {
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
          <Select
            {...field}
            id={name}
            status={fieldState.error ? 'error' : ''}
            options={options}
            {...selectProps}
            onChange={(value, option) => {
              field.onChange(value)
              if (selectProps && selectProps.onChange) {
                selectProps.onChange(value, option)
              }
            }}
          />
        )}
      />
    </Form.Item>
  )
}

export default FormSelect
