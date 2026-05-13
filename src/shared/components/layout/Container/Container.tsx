import type React from 'react'
import styles from './Container.module.scss'

export interface ContainerProps {
  children: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'small' | 'medium' | 'large'
  fluid?: boolean
  centered?: boolean
  className?: string
  style?: React.CSSProperties
}

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = 'medium',
  fluid = false,
  centered = true,
  className,
  style,
}) => {
  const getMaxWidth = () => {
    if (fluid) return '100%'

    switch (maxWidth) {
      case 'xs':
        return '480px'
      case 'sm':
        return '768px'
      case 'md':
        return '992px'
      case 'lg':
        return '1200px'
      case 'xl':
        return '1400px'
      case 'full':
        return '100%'
      default:
        return '1200px'
    }
  }

  const getPadding = () => {
    switch (padding) {
      case 'none':
        return '0'
      case 'small':
        return '16px'
      case 'medium':
        return '24px'
      case 'large':
        return '32px'
      default:
        return '24px'
    }
  }

  const containerStyle: React.CSSProperties = {
    maxWidth: getMaxWidth(),
    margin: centered ? '0 auto' : '0',
    padding: `0 ${getPadding()}`,
    ...style,
  }

  return (
    <div className={`${styles.container} ${className || ''}`} style={containerStyle}>
      {children}
    </div>
  )
}

export default Container
