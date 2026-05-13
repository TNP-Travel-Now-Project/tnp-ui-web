import { Form, Input } from 'antd'
import type React from 'react'
import { type Control, Controller, type FieldError, type FieldValues } from 'react-hook-form'

export interface FormTextAreaProps {
  name: string
  control: Control<FieldValues>
  label?: React.ReactNode
  required?: boolean
  rules?: any
  error?: FieldError | undefined
  hint?: React.ReactNode
  description?: React.ReactNode
  inputProps?: React.ComponentProps<typeof Input.TextArea>
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  name,
  control,
  label,
  required,
  rules,
  error,
  hint,
  description,
  inputProps,
}) => {
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
          <Input.TextArea
            {...field}
            id={name}
            status={fieldState.error ? 'error' : ''}
            {...inputProps}
          />
        )}
      />
    </Form.Item>
  )
}

export default FormTextArea
