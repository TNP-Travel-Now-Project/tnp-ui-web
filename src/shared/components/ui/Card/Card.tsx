import { Card as AntCard, type CardProps as AntCardProps } from 'antd'
import type { CardSize } from 'antd/es/card/Card'
import type React from 'react'
import styles from './Card.module.scss'

export interface CardProps extends AntCardProps {
  size?: CardSize
}

const Card: React.FC<CardProps> = ({ size = 'default', className, children, ...props }) => {
  const cardClass = `${styles.card} ${styles[size || 'default']} ${className || ''}`

  return (
    <AntCard className={cardClass} size={size} {...props}>
      {children}
    </AntCard>
  )
}

export default Card
