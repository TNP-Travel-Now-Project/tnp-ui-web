import {
  EnvironmentOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
} from '@ant-design/icons'
import { Col, Divider, Layout, Row, Space, Typography } from 'antd'
import Link from 'next/link'
import type React from 'react'
import styles from './Footer.module.scss'

const { Footer: AntFooter } = Layout
const { Title, Text, Paragraph } = Typography

export interface FooterProps {
  companyName?: string
  companyDescription?: string
  links?: Array<{
    title: string
    items: Array<{
      label: string
      href: string
    }>
  }>
  contactInfo?: {
    email?: string
    phone?: string
    address?: string
  }
  socialLinks?: Array<{
    platform: string
    href: string
    icon: React.ReactNode
  }>
  copyrightText?: string
  showBackToTop?: boolean
}

const Footer: React.FC<FooterProps> = ({
  companyName = 'UI Web',
  companyDescription = 'A modern web application built with Next.js, SCSS modules, and Ant Design components.',
  links = [],
  contactInfo = {},
  socialLinks = [],
  copyrightText = '© 2024 UI Web. All rights reserved.',
  showBackToTop = true,
}) => {
  const defaultLinks = [
    {
      title: 'Product',
      items: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Documentation', href: '/docs' },
        { label: 'API', href: '/api' },
      ],
    },
    {
      title: 'Company',
      items: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', href: '/help' },
        { label: 'Community', href: '/community' },
        { label: 'Status', href: '/status' },
        { label: 'Security', href: '/security' },
      ],
    },
  ]

  const defaultSocialLinks = [
    {
      platform: 'GitHub',
      href: 'https://github.com',
      icon: <GithubOutlined />,
    },
    {
      platform: 'Twitter',
      href: 'https://twitter.com',
      icon: <TwitterOutlined />,
    },
    {
      platform: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: <LinkedinOutlined />,
    },
  ]

  const finalLinks = links.length > 0 ? links : defaultLinks
  const finalSocialLinks = socialLinks.length > 0 ? socialLinks : defaultSocialLinks

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AntFooter className={styles.footer}>
      <div className={styles.footerContent}>
        <Row gutter={[48, 32]}>
          <Col xs={24} md={8}>
            <div className={styles.companySection}>
              <Title level={3} className={styles.companyName}>
                {companyName}
              </Title>
              <Paragraph className={styles.companyDescription}>{companyDescription}</Paragraph>

              {Object.keys(contactInfo).length > 0 && (
                <div className={styles.contactInfo}>
                  {contactInfo.email && (
                    <div className={styles.contactItem}>
                      <MailOutlined />
                      <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                    </div>
                  )}
                  {contactInfo.phone && (
                    <div className={styles.contactItem}>
                      <PhoneOutlined />
                      <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                    </div>
                  )}
                  {contactInfo.address && (
                    <div className={styles.contactItem}>
                      <EnvironmentOutlined />
                      <span>{contactInfo.address}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Col>

          {finalLinks.map((section, index) => (
            <Col xs={24} md={4} key={index}>
              <div className={styles.linksSection}>
                <Title level={5} className={styles.linksTitle}>
                  {section.title}
                </Title>
                <ul className={styles.linksList}>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link href={item.href} className={styles.link}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}
        </Row>

        <Divider className={styles.divider} />

        <div className={styles.footerBottom}>
          <Row justify='space-between' align='middle'>
            <Col xs={24} sm={12}>
              <Text className={styles.copyright}>{copyrightText}</Text>
            </Col>

            <Col xs={24} sm={12}>
              <div className={styles.bottomRight}>
                {finalSocialLinks.length > 0 && (
                  <Space size='middle' className={styles.socialLinks}>
                    {finalSocialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.socialLink}
                        title={social.platform}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </Space>
                )}

                {showBackToTop && (
                  <button onClick={scrollToTop} className={styles.backToTop} title='Back to top'>
                    ↑
                  </button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </AntFooter>
  )
}

export default Footer
