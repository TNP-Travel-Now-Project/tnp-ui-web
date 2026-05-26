'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type BackgroundEffectsVariant = 'travel' | 'community' | 'nature'

export interface BackgroundEffectsProps {
  variant?: BackgroundEffectsVariant
  className?: string
}

const backgroundVariantStyles: Record<
  BackgroundEffectsVariant,
  {
    orb1: string
    orb2: string
    orb3: string
    orb4: string
  }
> = {
  travel: {
    orb1: 'bg-sky-400/40',
    orb2: 'bg-indigo-400/40',
    orb3: 'bg-cyan-400/40',
    orb4: 'bg-emerald-300/40',
  },

  community: {
    orb1: 'bg-orange-400/40',
    orb2: 'bg-pink-400/40',
    orb3: 'bg-rose-400/40',
    orb4: 'bg-rose-400/40',
  },

  nature: {
    orb1: 'bg-emerald-400/40',
    orb2: 'bg-green-400/40',
    orb3: 'bg-lime-400/40',
    orb4: 'bg-lime-400/40',
  },
}

const orbBaseClass = 'absolute rounded-full blur-3xl pointer-events-none'

const BackgroundEffects = ({ variant = 'travel', className }: BackgroundEffectsProps) => {
  const colors = backgroundVariantStyles[variant]

  return (
    <div className={cn('fixed inset-0 -z-10 overflow-hidden pointer-events-none', className)}>
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={cn(orbBaseClass, 'top-0 left-0 w-125 h-125', colors.orb1)}
      />

      <motion.div
        animate={{
          x: [0, -50, 20, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.6, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className={cn(orbBaseClass, 'top-1/3 right-0 w-112.5 h-112.5', colors.orb2)}
      />

      <motion.div
        animate={{
          x: [0, 20, -40, 0],
          y: [0, -20, 40, 0],
          scale: [1, 0.3, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className={cn(orbBaseClass, 'bottom-0 left-1/3 w-100 h-100', colors.orb3)}
      />

      <motion.div
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -50, 60, 0],
          scale: [1, 0.5, 0.9],
          rotate: [0, 20, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className={cn(orbBaseClass, 'top-1/6 left-1/3 w-137.5 h-112', colors.orb4)}
      />
    </div>
  )
}

export default BackgroundEffects

/// template

// <BackgroundEffects variant="travel" />

// <BackgroundEffects variant="community" />

// <BackgroundEffects variant="nature" />
