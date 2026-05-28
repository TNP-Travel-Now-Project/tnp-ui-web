import { SummaryCard } from '@/shared/components/composite'
import type { SummaryStat } from '@/shared/types'

interface InsightsSummaryProps {
  stats: SummaryStat[]
}

export default function InsightsSummary({ stats }: InsightsSummaryProps) {
  return (
    <div>
      <h3 className='text-lg font-bold text-foreground mb-4 sm:mb-6'>
        Tổng quan chi tiêu & Hoạt động
      </h3>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6'>
        {stats.map((stat) => (
          <SummaryCard key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  )
}
