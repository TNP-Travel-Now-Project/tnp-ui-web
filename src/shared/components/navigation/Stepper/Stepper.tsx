'use client'

import { CheckOutlined, LoadingOutlined } from '@ant-design/icons'
import { Space, Steps } from 'antd'
import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components'
import styles from './Stepper.module.scss'

const { Step } = Steps

export interface StepperStep {
  key: string
  title: string
  description?: string
  icon?: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
  status?: 'wait' | 'process' | 'finish' | 'error'
}

export interface StepperProps {
  steps: StepperStep[]
  current?: number
  onStepChange?: (current: number) => void
  onFinish?: () => void
  onNext?: (current: number) => void
  onPrev?: (current: number) => void
  showNavigation?: boolean
  showStepNumbers?: boolean
  size?: 'default' | 'small'
  direction?: 'horizontal' | 'vertical'
  className?: string
  style?: React.CSSProperties
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  current: externalCurrent,
  onStepChange,
  onFinish,
  onNext,
  onPrev,
  showNavigation = true,
  showStepNumbers = true,
  size = 'default',
  direction = 'horizontal',
  className,
  style,
}) => {
  const [internalCurrent, setInternalCurrent] = useState(0)
  const current = externalCurrent !== undefined ? externalCurrent : internalCurrent

  const handleStepChange = (step: number) => {
    if (steps[step]?.disabled) return

    if (externalCurrent === undefined) {
      setInternalCurrent(step)
    }
    onStepChange?.(step)
  }

  const handleNext = () => {
    if (current < steps.length - 1) {
      const nextStep = current + 1
      if (externalCurrent === undefined) {
        setInternalCurrent(nextStep)
      }
      onNext?.(nextStep)
      onStepChange?.(nextStep)
    }
  }

  const handlePrev = () => {
    if (current > 0) {
      const prevStep = current - 1
      if (externalCurrent === undefined) {
        setInternalCurrent(prevStep)
      }
      onPrev?.(prevStep)
      onStepChange?.(prevStep)
    }
  }

  const handleFinish = () => {
    onFinish?.()
  }

  const getStepStatus = (index: number): 'wait' | 'process' | 'finish' | 'error' => {
    if (steps[index].status) return steps[index].status

    if (index < current) return 'finish'
    if (index === current) return 'process'
    return 'wait'
  }

  const getStepIcon = (step: StepperStep, index: number) => {
    if (step.icon) return step.icon

    const status = getStepStatus(index)
    if (status === 'finish') return <CheckOutlined />
    if (status === 'process') return <LoadingOutlined />

    return showStepNumbers ? index + 1 : undefined
  }

  const isStepDisabled = (index: number) => {
    return steps[index].disabled || index > current
  }

  const canGoNext = current < steps.length - 1 && !steps[current + 1]?.disabled
  const canGoPrev = current > 0
  const isLastStep = current === steps.length - 1

  return (
    <div className={`${styles.stepperContainer} ${className || ''}`} style={style}>
      <Steps
        current={current}
        size={size}
        direction={direction}
        onChange={handleStepChange}
        className={styles.stepper}
      >
        {steps.map((step, index) => (
          <Step
            key={step.key}
            title={step.title}
            description={step.description}
            icon={getStepIcon(step, index)}
            status={getStepStatus(index)}
            disabled={isStepDisabled(index)}
            className={styles.step}
          />
        ))}
      </Steps>

      <div className={styles.stepperContent}>
        <div className={styles.stepContent}>{steps[current]?.content}</div>

        {showNavigation && (
          <div className={styles.stepperNavigation}>
            <Space size='middle'>
              {canGoPrev && <Button onClick={handlePrev}>Previous</Button>}

              {!isLastStep && canGoNext && (
                <Button type='primary' onClick={handleNext}>
                  Next
                </Button>
              )}

              {isLastStep && (
                <Button type='primary' onClick={handleFinish}>
                  Finish
                </Button>
              )}
            </Space>
          </div>
        )}
      </div>
    </div>
  )
}

export default Stepper
