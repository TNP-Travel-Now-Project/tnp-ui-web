import { Form, Radio } from 'antd'
import type React from 'react'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form'

export interface FormRadioProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: React.ReactNode
  required?: boolean
  rules?: any
  error?: FieldError | undefined
  options: { label: React.ReactNode; value: any }[]
  hint?: React.ReactNode
  description?: React.ReactNode
  layout?: 'horizontal' | 'vertical'
  radioGroupProps?: React.ComponentProps<typeof Radio.Group>
}

export const FormRadio = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  required,
  rules,
  error,
  options,
  hint,
  description,
  radioGroupProps,
  layout = 'vertical',
}: FormRadioProps<TFieldValues>) => {
  return (
    <Form.Item
      layout={layout}
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
          <Radio.Group
            {...field}
            id={name}
            options={options}
            {...radioGroupProps}
            onChange={(e) => {
              field.onChange(e.target.value)
              if (radioGroupProps && radioGroupProps.onChange) {
                radioGroupProps.onChange(e)
              }
            }}
          />
        )}
      />
    </Form.Item>
  )
}

export default FormRadio
