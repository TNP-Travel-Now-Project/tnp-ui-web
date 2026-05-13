'use client'

import type React from 'react'
import { type FC, useEffect, useState } from 'react'

export interface CKEditorProps {
  value?: string
  onChange?: (data: string) => void
  className?: string
  placeholder?: string
  disabled?: boolean
  config?: Record<string, any>
  loading?: React.ReactNode
}

const CkEditor: FC<CKEditorProps> = ({
  value = '',
  onChange,
  config = {},
  disabled = false,
  className,
  placeholder,
  loading = 'Đang tải trình soạn thảo...',
}) => {
  const [EditorModule, setEditorModule] = useState<{
    CKEditor?: any
    ClassicEditor?: any
  } | null>(null)

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const [ck, build] = await Promise.all([
          import('@ckeditor/ckeditor5-react'),
          import('@ckeditor/ckeditor5-build-classic'),
        ])

        if (!mounted) return

        const CKEditor = (ck as any).CKEditor ?? (ck as any).default ?? (ck as any)
        const ClassicEditor = (build as any).default ?? build

        setEditorModule({ CKEditor, ClassicEditor })
      } catch (err) {
        console.error('Failed to load CKEditor modules:', err)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  if (!EditorModule?.CKEditor || !EditorModule?.ClassicEditor) {
    return <div className={className}>{loading}</div>
  }

  const mergedConfig = { placeholder, ...config }

  return (
    <EditorModule.CKEditor
      editor={EditorModule.ClassicEditor}
      data={value ?? ''}
      onChange={(event: any, editor: any) => {
        const data = editor?.getData?.() ?? ''
        onChange?.(data)
      }}
      config={{
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'link',
            'uploadImage',
            'codeBlock',
          ],
          shouldNotGroupWhenFull: false,
        },
      }}
      disabled={disabled}
    />
  )
}

export default CkEditor
