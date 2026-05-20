export interface Participant {
  id: string
  name: string
  avatar: string
}

export interface Trip {
  id: string
  title: string
  startDate: string
  endDate: string
  location: string
  image: string
  status: 'active' | 'planning'
  budget: number
  participants: Participant[]
}

export interface SummaryStat {
  label: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: string
}

export interface Activity {
  id: string
  user: Participant
  type: 'expense' | 'schedule' | 'member'
  description: string
  target?: string
  timestamp: string
  amount?: string
  attachment?: string
}

export interface TripDetailData extends Trip {
  totalSpent: string
  budgetLimit: string
  personalBalance: string
  nextActivity: string
  activities: Activity[]
}
