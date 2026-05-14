import { Typography } from 'antd'
import type React from 'react'
import styles from './Hero.module.scss'

const { Title, Text } = Typography

export interface HeroProps {
  title?: string
  subtitle?: string
  showLogo?: boolean
  logoText?: string
}

const Hero: React.FC<HeroProps> = ({
  title = 'Create account',
  subtitle = 'Join thousands of users building amazing things',
}) => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <Title level={1} className={styles.heroTitle}>
            {title}
          </Title>
          <Text className={styles.heroSubtitle}>{subtitle}</Text>
        </div>
      </div>

      <div className={styles.illustration}>
        <div className={styles.character}>
          <div className={styles.head}>
            <div className={styles.hair}></div>
            <div className={styles.face}>
              <div className={styles.eyes}>
                <div className={styles.eye}></div>
                <div className={styles.eye}></div>
              </div>
              <div className={styles.glasses}></div>
              <div className={styles.beard}></div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.sweater}></div>
            <div className={styles.shirt}></div>
          </div>
          <div className={styles.arms}>
            <div className={styles.arm}></div>
            <div className={styles.arm}></div>
          </div>
          <div className={styles.legs}>
            <div className={styles.leg}></div>
            <div className={styles.leg}></div>
          </div>
        </div>

        <div className={styles.desk}>
          <div className={styles.laptop}></div>
          <div className={styles.pencil}></div>
          <div className={styles.phone}></div>
          <div className={styles.usb}></div>
          <div className={styles.mug}></div>
        </div>

        <div className={styles.environment}>
          <div className={styles.cabinet}>
            <div className={styles.cactus}></div>
          </div>
          <div className={styles.chair}></div>
          <div className={styles.plant}></div>
          <div className={styles.clock}></div>
        </div>
      </div>
    </div>
  )
}

export default Hero
