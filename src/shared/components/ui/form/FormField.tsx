import type { ReactNode } from 'react'
import { type FieldPath, type FieldValues, useController } from 'react-hook-form'
import { cn } from '@/src/shared/lib/utils/cn'
import { Input } from '../input'
import { Label } from '../label'
import { useFormContext } from './Form'

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
  type?: string
  children?: ReactNode
  className?: string
  inputClassName?: string
  containerClassName?: string
}

/**
 * FormField Component - Wrapper for controlled inputs
 * Automatically handles validation errors and field state
 * @example
 * <FormField
 *   name="email"
 *   label="Email Address"
 *   type="email"
 *   placeholder="you@example.com"
 *   required
 * />
 */
export function FormField<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  placeholder,
  required = false,
  type = 'text',
  inputClassName,
  containerClassName,
}: FormFieldProps<TFieldValues>) {
  const form = useFormContext()

  const { field, fieldState } = useController({
    name,
    control: form.control,
  })

  const error = fieldState.error?.message
  const fieldId = String(name)

  return (
    <div className={cn('flex flex-col gap-2', containerClassName)}>
      {label && (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}

      <Input
        {...field}
        id={fieldId}
        type={type}
        placeholder={placeholder}
        errorMessage={error}
        state={error ? 'error' : 'default'}
        className={inputClassName}
      />

      {description && <p className='text-xs text-gray-500'>{description}</p>}
    </div>
  )
}

FormField.displayName = 'FormField'
