import { CheckCircle, Star, TrendingUp, Users } from 'lucide-react'
import type { SummaryStat } from '@/shared/types'

const iconMap: Record<string, any> = {
  trending: TrendingUp,
  check: CheckCircle,
  users: Users,
  star: Star,
}

export default function SummaryCard({ stat }: { stat: SummaryStat; key?: string }) {
  const Icon = iconMap[stat.icon] || Star

  return (
    <div className='bg-card p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border/40 shadow-[0_4px_15px_-4px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-1'>
      <div className='flex items-center justify-between mb-2 sm:mb-4'>
        <p className='text-[9px] sm:text-[10px] text-muted-foreground/60 mb-0.5 sm:mb-1 uppercase tracking-[0.1em] font-black'>
          {stat.label}
        </p>
        <div className='p-1.5 sm:p-2 bg-muted rounded-md sm:rounded-lg'>
          <Icon size={14} className='sm:size-4 text-primary' />
        </div>
      </div>
      <p
        className={`text-xl sm:text-3xl font-black tracking-tighter ${stat.icon === 'star' ? 'text-warning' : stat.icon === 'trending' ? 'text-primary' : 'text-foreground'}`}
      >
        {stat.value}
      </p>
      {stat.change && (
        <div
          className={`mt-2 sm:mt-3 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold ${
            stat.changeType === 'positive'
              ? 'text-primary'
              : stat.changeType === 'negative'
                ? 'text-destructive'
                : 'text-muted-foreground'
          }`}
        >
          <Icon size={10} className='sm:size-3' />
          <span className='opacity-80'>{stat.change}</span>
        </div>
      )}
    </div>
  )
}
