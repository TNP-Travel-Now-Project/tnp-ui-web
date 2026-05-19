'use client'

import { useRef } from 'react'
import { Upload, X } from 'lucide-react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form/Form'

interface FormUploadProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  control: Control<TFieldValues>
  name: TName
  label?: React.ReactNode
  className?: string
  accept?: string
  multiple?: boolean
}

export const FormUpload = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  className,
  accept = 'image/*,.pdf',
  multiple = false,
}: FormUploadProps<TFieldValues, TName>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ref, ...field } }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div
              role='button'
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  inputRef.current?.click()
                }
              }}
              className={cn(
                'flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-muted-foreground/25 p-6 transition-colors hover:bg-muted/50',
              )}
            >
              <Upload className='h-6 w-6 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Click hoặc kéo thả file vào đây</span>
              <input
                ref={inputRef}
                type='file'
                accept={accept}
                multiple={multiple}
                className='hidden'
                onChange={(e) => {
                  const files = multiple ? e.target.files : e.target.files?.[0]
                  onChange(files)
                }}
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/* <FormUpload
  name='avatar'
  control={form.control}
  label='Ảnh đại diện'
  accept='image/*'
/> */
