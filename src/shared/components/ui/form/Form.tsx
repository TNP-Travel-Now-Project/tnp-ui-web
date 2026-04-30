import { createContext, type ReactNode, useContext } from 'react'
import { type FieldValues, FormProvider, type UseFormReturn } from 'react-hook-form'
import { cn } from '@/src/shared/lib/utils/cn'

/**
 * Form Context for managing field-level errors
 */
const FormContext = createContext<UseFormReturn<any> | null>(null)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within <Form>')
  }
  return context
}

/**
 * Form Integration Wrapper
 * Provides React Hook Form context to child components
 * Ensures consistent form state management across the app
 *
 * Features:
 * - React Hook Form Provider wrapper
 * - Centralized form submission handling
 * - Shared form context for FormField components
 *
 * @example
 * <Form form={form} onSubmit={handleSubmit}>
 *   <FormField name="email" label="Email" />
 *   <Button type="submit">Submit</Button>
 * </Form>
 */
interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void | Promise<void>
  children: ReactNode
  className?: string
}

export function Form<T extends FieldValues>({ form, onSubmit, children, className }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <FormContext.Provider value={form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
          {children}
        </form>
      </FormContext.Provider>
    </FormProvider>
  )
}

Form.displayName = 'Form'
