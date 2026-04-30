import type { FieldPath, FieldValues } from 'react-hook-form'

export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
  error?: string
}

export interface FormMessageProps {
  children?: React.ReactNode
  className?: string
}
