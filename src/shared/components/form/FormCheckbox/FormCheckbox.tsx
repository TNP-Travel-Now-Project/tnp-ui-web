import { Checkbox, Form } from 'antd'
import type React from 'react'
import { type Control, Controller, type FieldError, type FieldValues } from 'react-hook-form'

export interface FormCheckboxProps {
  name: string
  control: Control<FieldValues>
  label?: React.ReactNode
  required?: boolean
  rules?: any
  error?: FieldError | undefined
  hint?: React.ReactNode
  description?: React.ReactNode
  checkboxProps?: React.ComponentProps<typeof Checkbox>
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  control,
  label,
  required,
  rules,
  error,
  hint,
  description,
  checkboxProps,
}) => {
  return (
    <Form.Item
      required={required}
      help={error ? error.message : hint}
      validateStatus={error ? 'error' : undefined}
      extra={description}
      htmlFor={name}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Checkbox {...field} id={name} checked={!!field.value} {...checkboxProps}>
            {label}
          </Checkbox>
        )}
      />
    </Form.Item>
  )
}

export default FormCheckbox
