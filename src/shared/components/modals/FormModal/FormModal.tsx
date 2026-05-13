import { Modal } from 'antd'
import type React from 'react'

export interface FormModalProps {
  open: boolean
  title?: React.ReactNode
  onCancel: () => void
  confirmLoading?: boolean
  footer?: React.ReactNode
  children: React.ReactNode
  width?: number | string
}

export const FormModal: React.FC<FormModalProps> = ({
  open,
  title,
  onCancel,
  confirmLoading = false,
  footer,
  children,
  width = 520,
}) => (
  <Modal
    open={open}
    title={title}
    onCancel={onCancel}
    confirmLoading={confirmLoading}
    footer={footer}
    width={width}
    destroyOnClose
  >
    {children}
  </Modal>
)

export default FormModal
