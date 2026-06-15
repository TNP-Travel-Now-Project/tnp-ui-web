import PageSection from '@/shared/components/layout/page-section'
import { ThemeSetter } from '@/shared/components/providers/ThemeProvider/theme-setter'
import type { SummaryStat, Trip } from '@/shared/types'
import { InsightsSummary } from '../InsightsSummary'
import { UpcomingTrips } from '../UpcomingTrips'
import { WelcomeHero } from '../WelcomeHero'

interface DashboardViewProps {
  trips: Trip[]
  stats: SummaryStat[]
  onStartCreate: () => void
  onTripSelect: (id: string) => void
  onViewAllTrips: () => void
}

export function DashboardView({
  trips,
  stats,
  onStartCreate,
  onTripSelect,
  onViewAllTrips,
}: DashboardViewProps) {
  return (
    <>
      <ThemeSetter theme='light' />
      <WelcomeHero />

      <PageSection className='py-0 md:py-0'>
        <UpcomingTrips
          trips={trips}
          onStartCreate={onStartCreate}
          onTripSelect={onTripSelect}
          onViewAllTrips={onViewAllTrips}
        />
      </PageSection>

      <PageSection className='py-0 md:py-0'>
        <InsightsSummary stats={stats} />
      </PageSection>
    </>
  )
}
