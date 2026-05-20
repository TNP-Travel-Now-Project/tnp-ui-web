'use client'

import { Slot } from '@radix-ui/react-slot'
import type * as React from 'react'
import { createContext, useContext, useId } from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'
import { Label } from '@/shared/components/ui/form/label'
import { cn } from '@/lib/utils'

// ─── Types & Contexts ────────────────────────────────────────────────────────

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

type FormItemContextValue = {
  id: string
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

// ─── useFormField Hook ───────────────────────────────────────────────────────

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name)

  if (!fieldContext.name) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

// ─── FormItem ────────────────────────────────────────────────────────────────

type FormItemProps = React.ComponentProps<'div'>

const FormItem = ({ className, ...props }: FormItemProps) => {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot='form-item' className={cn('grid gap-2', className)} {...props} />
    </FormItemContext.Provider>
  )
}

FormItem.displayName = 'FormItem'

// ─── FormLabel ───────────────────────────────────────────────────────────────

type FormLabelProps = React.ComponentProps<typeof Label>

const FormLabel = ({ className, ...props }: FormLabelProps) => {
  const { error, formItemId } = useFormField()

  return (
    <Label className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...props} />
  )
}

FormLabel.displayName = 'FormLabel'

// ─── FormControl ─────────────────────────────────────────────────────────────

type FormControlProps = React.ComponentProps<typeof Slot>

const FormControl = ({ ...props }: FormControlProps) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
}

FormControl.displayName = 'FormControl'

// ─── FormMessage ─────────────────────────────────────────────────────────────

type FormMessageProps = React.ComponentProps<'p'>

const FormMessage = ({ className, children, ...props }: FormMessageProps) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot='form-message'
      id={formMessageId}
      className={cn('text-sm text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  )
}

FormMessage.displayName = 'FormMessage'

// ─── FormDescription ─────────────────────────────────────────────────────────

type FormDescriptionProps = React.ComponentProps<'p'>

const FormDescription = ({ className, ...props }: FormDescriptionProps) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot='form-description'
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

FormDescription.displayName = 'FormDescription'

// ─── FormField (react-hook-form Controller wrapper) ──────────────────────────

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

// ─── Form (FormProvider wrapper) ─────────────────────────────────────────────

const Form = FormProvider

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
}

// Giải thích chi tiết vai trò trong ví dụ
// <Form {...form}>: Truyền toàn bộ form context (control, formState, ...) xuống tất cả các field bên trong.
// <FormField name="..." control=... render={...}>: Đây là nơi kết nối tên field với react-hook-form.
// <FormItem>: Bao ngoài để quản lý khoảng cách (space-y).
// <FormLabel>: Tự động thêm htmlFor và đổi màu đỏ khi có lỗi.
// <FormControl>: Bọc Input và tự động thêm id, aria-invalid, aria-describedby.
// <FormMessage />: Tự động hiển thị lỗi từ Zod.

// <FormField
//   control={form.control}
//   name='email'
//   render={({ field }) => (
//     <FormItem>
//       <FormLabel>Email</FormLabel>
//       <FormControl>
//         <Input type='email' placeholder='example@email.com' {...field} />
//       </FormControl>
//       <FormMessage />
//     </FormItem>
//   )}
// />
