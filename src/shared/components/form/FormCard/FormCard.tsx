import { GithubOutlined, GoogleOutlined, WindowsOutlined } from '@ant-design/icons'
import { Divider, Input, Space, Typography } from 'antd'
import Link from 'next/link'
import React from 'react'
import Button from '../../ui/Button'
import styles from './FormCard.module.scss'

const { Title, Text } = Typography

export interface FormCardProps {
  title?: string
  showLogo?: boolean
  logoText?: string
  primaryButtonText?: string
  showSocialLogin?: boolean
  showTerms?: boolean
  showLoginLink?: boolean
  loginLinkText?: string
  onSubmit?: (values: { email: string; password: string }) => void
}

const FormCard: React.FC<FormCardProps> = ({
  title = 'Create account',
  showLogo = true,
  logoText = 'messimo',
  primaryButtonText = 'Create account',
  showSocialLogin = true,
  showTerms = true,
  showLoginLink = true,
  loginLinkText = 'Have an account? Log in',
  onSubmit,
}) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({ email, password })
    }
  }

  return (
    <div className={styles.formCard}>
      <div className={styles.formHeader}>
        {showLogo && (
          <div className={styles.logo}>
            <div className={styles.logoIcon}>🚩</div>
            <Text className={styles.logoText}>{logoText}</Text>
          </div>
        )}

        <Title level={1} className={styles.formTitle}>
          {title}
        </Title>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <Input
            type='email'
            placeholder='Email address'
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            size='large'
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            size='large'
            className={styles.input}
            required
          />
        </div>

        <Button type='primary' htmlType='submit' size='large' className={styles.primaryButton}>
          {primaryButtonText}
        </Button>
      </form>

      {showSocialLogin && (
        <>
          <Divider className={styles.divider}>
            <Text type='secondary'>or sign up with</Text>
          </Divider>

          <Space size='middle' className={styles.socialButtons}>
            <Button
              type='default'
              size='large'
              icon={<GoogleOutlined />}
              className={styles.socialButton}
            />
            <Button
              type='default'
              size='large'
              icon={<WindowsOutlined />}
              className={styles.socialButton}
            />
            <Button
              type='default'
              size='large'
              icon={<GithubOutlined />}
              className={styles.socialButton}
            />
          </Space>
        </>
      )}

      {showTerms && (
        <div className={styles.terms}>
          <Text type='secondary'>
            By creating an account you agree to {logoText}&apos;s{' '}
            <Link href='/terms' className={styles.link}>
              Terms of Services
            </Link>{' '}
            and{' '}
            <Link href='/privacy' className={styles.link}>
              Privacy Policy
            </Link>
            .
          </Text>
        </div>
      )}

      {showLoginLink && (
        <div className={styles.loginLink}>
          <Text type='secondary'>
            {loginLinkText.split('Log in')[0]}
            <Link href='/login' className={styles.link}>
              Log in
            </Link>
          </Text>
        </div>
      )}
    </div>
  )
}

export default FormCard
