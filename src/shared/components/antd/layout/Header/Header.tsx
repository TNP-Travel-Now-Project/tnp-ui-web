/* eslint-disable @next/next/no-img-element */
'use client'

import { Badge, Dropdown, Layout, Space, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import styles from '@/features/admin/page.module.scss'
import { Arrow, Bell, Language } from '@/shared/components/icons'

const { Header } = Layout

export interface HeaderProps {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
  siderWidth: number
  isMobile: boolean
}

export default function DashboardHeader({ siderWidth, isMobile }: HeaderProps) {
  const THRESHOLD = 30
  const lastScrollY = useRef(0)
  const [hideHeader, setHideHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Scroll xuống
      if (currentScrollY > lastScrollY.current && currentScrollY > THRESHOLD) {
        setHideHeader(true)
      }

      // Scroll lên
      if (currentScrollY < lastScrollY.current) {
        setHideHeader(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [language, setLanguage] = useState('Vietnamese')
  const items = [
    {
      key: 'VN',
      label: 'Vietnamese',
    },
    {
      key: 'US',
      label: 'United States',
    },
  ]

  return (
    <Header
      className={`${styles.header} ${hideHeader ? styles.headerHidden : ''}`}
      style={{
        width: '100%',
        // transition: "none",
        paddingLeft: isMobile ? 0 : siderWidth,
        boxSizing: 'border-box',
        transition: 'padding-left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.3s ease',
      }}
    >
      <div className={styles.headerRow}>
        <div className={styles.logoWrapper}>
          {/** biome-ignore lint/performance/noImgElement: <explanation> */}
          <img
            src='/logo/logo-mh-academy-green.png'
            alt='MH Academy'
            className={styles.imageMHAcademy}
          />
        </div>
      </div>

      <div className={styles.right}>
        <Space size={20}>
          <Badge
            count={1}
            size='small'
            offset={[-2, 2]}
            style={{
              fontSize: 11,
              minWidth: 16,
              height: 16,
              lineHeight: '16px',
            }}
            className={styles.bellIcon}
          >
            <span className={styles.bellWrapper}>
              <Bell />
            </span>
          </Badge>

          <span className={styles.divider}>|</span>
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ['VN'],
              onClick: ({ key }) => {
                if (key === 'VN') setLanguage('Vietnamese')
                if (key === 'US') setLanguage('United States')
              },
            }}
          >
            <Typography className={styles.langSwitcher}>
              <Space size={6} align='center'>
                <Language className={styles.langIcon} />
                <span className={styles.langText}>{language}</span>
                <Arrow className={styles.langArrow} />
              </Space>
            </Typography>
          </Dropdown>
        </Space>
      </div>
    </Header>
  )
}
