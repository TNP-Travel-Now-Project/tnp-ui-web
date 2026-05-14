// components/Feedback/EmptyState.tsx
import { Empty } from 'antd'
import type React from 'react'

interface EmptyStateProps {
  description?: string
  image?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  description = 'Không có dữ liệu',
  image = Empty.PRESENTED_IMAGE_SIMPLE,
}) => {
  return <Empty image={image} description={description} />
}
