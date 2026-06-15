import { Bell, Settings as SettingsIcon, Shield, User, Wallet } from 'lucide-react'
import type { TabType, WalletItem } from './profile-modal.types'

export const TABS: { id: TabType; label: string; icon: typeof User }[] = [
  { id: 'personal', label: 'Thông tin cá nhân', icon: User },
  { id: 'security', label: 'Bảo mật tài khoản', icon: Shield },
  { id: 'finance', label: 'Ví & Tài chính', icon: Wallet },
  { id: 'notifications', label: 'Thông báo', icon: Bell },
  { id: 'settings', label: 'Cài đặt hệ thống', icon: SettingsIcon },
]

export const TAB_HEADINGS: Record<TabType, { title: string; description: string }> = {
  personal: {
    title: 'Thông tin cá nhân',
    description: 'Cập nhật ảnh đại diện và thông tin cơ bản của bạn.',
  },
  security: {
    title: 'Bảo mật tài khoản',
    description: 'Quản lý thông tin tài khoản của bạn',
  },
  finance: {
    title: 'Ví & Tài chính',
    description: 'Quản lý thông tin tài khoản của bạn',
  },
  notifications: {
    title: 'Thông báo',
    description: 'Quản lý thông tin tài khoản của bạn',
  },
  settings: {
    title: 'Cài đặt hệ thống',
    description: 'Quản lý thông tin tài khoản của bạn',
  },
}

export const GENDER_OPTIONS: readonly ('Nam' | 'Nữ' | 'Khác')[] = ['Nam', 'Nữ', 'Khác'] as const

export const WALLETS: WalletItem[] = [
  { name: 'Tiền mặt', balance: 11250000, type: 'Cash', color: 'bg-primary' },
  { name: 'Techcombank', balance: 60000000, type: 'Bank', color: 'bg-blue-600' },
  { name: 'Ví Momo', balance: 3000000, type: 'E-Wallet', color: 'bg-pink-600' },
]

export const GENDER_ICONS: Record<string, string> = {
  Nam: '♂',
  Nữ: '♀',
  Khác: '⚤',
}

export const GENDER_BG: Record<string, string> = {
  Nam: 'bg-blue-500',
  Nữ: 'bg-pink-500',
  Khác: 'bg-gray-500',
}

export const GENDER_HOVER_BG: Record<string, string> = {
  Nam: 'bg-blue-50 text-blue-500 hover:bg-blue-100',
  Nữ: 'bg-pink-50 text-pink-500 hover:bg-pink-100',
  Khác: 'bg-gray-50 text-gray-500 hover:bg-gray-100',
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}
