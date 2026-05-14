import { Space } from 'antd'
import type React from 'react'
import Button from '@/shared/components/ui/card/Button'

export interface FormActionsProps {
  loading?: boolean
  submitLabel?: React.ReactNode
  showCancel?: boolean
  cancelLabel?: React.ReactNode
  onCancel?: () => void
  children?: React.ReactNode
  align?: 'left' | 'center' | 'right'
}

export const FormActions: React.FC<FormActionsProps> = ({
  loading = false,
  submitLabel = 'Submit',
  showCancel = false,
  cancelLabel = 'Cancel',
  onCancel,
  children,
  align = 'right',
}) => {
  let justifyContent: React.CSSProperties['justifyContent']
  if (align === 'center') justifyContent = 'center'
  else if (align === 'left') justifyContent = 'flex-start'
  else justifyContent = 'flex-end'

  return (
    <div style={{ display: 'flex', justifyContent }}>
      <Space>
        {showCancel && (
          <Button buttonType='cancel' onClick={onCancel} htmlType='button'>
            {cancelLabel}
          </Button>
        )}
        <Button buttonType='fill' htmlType='submit' loading={loading}>
          {submitLabel}
        </Button>
        {children}
      </Space>
    </div>
  )
}

export default FormActions
