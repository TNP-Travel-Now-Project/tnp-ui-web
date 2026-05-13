import { type Button, Modal } from 'antd'
import type React from 'react'

export interface ConfirmModalProps {
  open: boolean
  onOk: () => void
  onCancel: () => void
  title?: React.ReactNode
  content?: React.ReactNode
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  okButtonProps?: React.ComponentProps<typeof Button>
  cancelButtonProps?: React.ComponentProps<typeof Button>
  confirmLoading?: boolean
  centered?: boolean
  icon?: React.ReactNode
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onOk,
  onCancel,
  title = 'Xác nhận',
  content,
  okText = 'OK',
  cancelText = 'Huỷ',
  okButtonProps,
  cancelButtonProps,
  confirmLoading = false,
  centered = true,
  icon,
}) => (
  <Modal
    open={open}
    onOk={onOk}
    onCancel={onCancel}
    title={title}
    okText={okText}
    cancelText={cancelText}
    okButtonProps={okButtonProps}
    cancelButtonProps={cancelButtonProps}
    confirmLoading={confirmLoading}
    centered={centered}
  >
    <div style={{ textAlign: 'center', padding: '12px 0' }}>
      {icon && <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>}
      <div>{content}</div>
    </div>
  </Modal>
)

export default ConfirmModal
