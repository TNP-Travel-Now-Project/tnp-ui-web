import { Divider, Typography } from 'antd'
import type React from 'react'
import styles from './Section.module.scss'

const { Title, Paragraph } = Typography

export interface SectionProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  level?: 1 | 2 | 3 | 4 | 5
  showDivider?: boolean
  align?: 'left' | 'center' | 'right'
  spacing?: 'none' | 'small' | 'medium' | 'large'
  background?: 'transparent' | 'light' | 'white' | 'dark'
  className?: string
  style?: React.CSSProperties
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  level = 2,
  showDivider = false,
  align = 'left',
  spacing = 'medium',
  background = 'transparent',
  className,
  style,
}) => {
  const getSpacing = () => {
    switch (spacing) {
      case 'none':
        return '0'
      case 'small':
        return '32px'
      case 'medium':
        return '64px'
      case 'large':
        return '96px'
      default:
        return '64px'
    }
  }

  const getBackground = () => {
    switch (background) {
      case 'light':
        return '#fafafa'
      case 'white':
        return '#ffffff'
      case 'dark':
        return '#001529'
      default:
        return 'transparent'
    }
  }

  const getTextAlign = () => {
    switch (align) {
      case 'center':
        return 'center'
      case 'right':
        return 'right'
      default:
        return 'left'
    }
  }

  const sectionStyle: React.CSSProperties = {
    padding: `${getSpacing()} 0`,
    background: getBackground(),
    textAlign: getTextAlign() as any,
    ...style,
  }

  return (
    <section
      className={`${styles.section} ${styles[`section${background.charAt(0).toUpperCase() + background.slice(1)}`]} ${className || ''}`}
      style={sectionStyle}
    >
      {(title || subtitle) && (
        <div className={styles.sectionHeader}>
          {title && (
            <Title level={level} className={styles.sectionTitle}>
              {title}
            </Title>
          )}
          {subtitle && <Paragraph className={styles.sectionSubtitle}>{subtitle}</Paragraph>}
          {showDivider && <Divider className={styles.sectionDivider} />}
        </div>
      )}

      <div className={styles.sectionContent}>{children}</div>
    </section>
  )
}

export default Section
