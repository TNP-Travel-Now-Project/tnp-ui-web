import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd'
import type React from 'react'
import { cn } from '@/shared/lib/utils/cn'
import styles from './Button.module.scss'

export type ButtonType = 'fill' | 'outline' | 'secondary' | 'cancel'
export type IconPosition = 'left' | 'right'
export type ButtonSize = 'small' | 'medium' | 'large'

export type ButtonProps = Omit<AntButtonProps, 'icon' | 'iconPosition' | 'size'> & {
  buttonType?: ButtonType
  icon?: React.ReactNode
  iconPosition?: IconPosition
  size?: ButtonSize
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  buttonType = 'fill',
  icon,
  iconPosition = 'left',
  size = 'medium',
  ...props
}) => {
  const variantClass = styles[buttonType]

  const sizeClass = styles[size]

  const antdType = buttonType === 'fill' ? 'primary' : 'default'

  const buttonClass = cn(styles.button, variantClass, sizeClass, className)

  return (
    <AntButton
      type={antdType}
      className={buttonClass}
      icon={iconPosition === 'left' ? icon : undefined}
      {...props}
    >
      {iconPosition === 'right' && icon ? (
        <span className={styles.content}>
          {children}
          {icon}
        </span>
      ) : (
        children
      )}
    </AntButton>
  )
}

export default Button
