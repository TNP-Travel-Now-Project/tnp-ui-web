// components/Feedback/Loading.tsx
import { Spin } from 'antd'
import type React from 'react'

interface LoadingProps {
  size?: 'small' | 'default' | 'large'
  tip?: string
  fullScreen?: boolean
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  tip = 'Đang tải...',
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(255,255,255,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        <Spin size={size} tip={tip} />
      </div>
    )
  }

  // Fix warning: Spin đơn lẻ → wrap để tip hiện
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <Spin size={size} />
      {tip && <div style={{ marginTop: 8 }}>{tip}</div>}
    </div>
  )
}
