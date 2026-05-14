'use client'

import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
  title?: string
  description?: string
}

export function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = 'Bạn có chắc chắn?',
  description = 'Hành động này không thể hoàn tác.',
}: AlertModalProps) {
  return (
    <Modal
      open={isOpen}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ExclamationCircleOutlined style={{ color: '#faad14' }} />
          {title}
        </div>
      }
      onCancel={onClose}
      onOk={onConfirm}
      okText='Xác nhận'
      cancelText='Hủy'
      confirmLoading={loading}
      okButtonProps={{ danger: true }}
    >
      <p>{description}</p>
    </Modal>
  )
}
