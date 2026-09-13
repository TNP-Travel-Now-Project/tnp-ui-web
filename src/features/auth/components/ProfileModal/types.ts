import type { LucideIcon } from 'lucide-react'

export type TabType = 'personal' | 'security' | 'finance' | 'notifications' | 'settings'

export type Gender = 'Nam' | 'Nữ' | 'Khác'

export interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: TabType
}

export interface GenderAvatarProps {
  gender: Gender
  onGenderChange: (gender: Gender) => void
  defaultAvatar?: string
}

export interface WalletItem {
  name: string
  balance: number
  type: string
  color: string
}

export interface WalletCardProps {
  wallet: WalletItem
}

export interface ProfileModalSidebarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export interface NotificationSetting {
  id: string
  title: string
  desc: string
  icon: LucideIcon
  enabled: boolean
}
