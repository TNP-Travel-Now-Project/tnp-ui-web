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
}

export interface WalletItem {
  name: string
  balance: number
  type: string
  color: string
}
