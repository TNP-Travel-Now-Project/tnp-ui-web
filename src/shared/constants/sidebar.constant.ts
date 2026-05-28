import {
  Compass,
  Crosshair,
  Fan,
  HelpCircle,
  Home,
  Info,
  LayoutDashboard,
  Luggage,
  MessageSquare,
  Phone,
  Star,
  Wallet,
} from 'lucide-react'

export const loggedInNavItems = [
  { id: 'trips', label: 'Chuyến đi của tôi', icon: Luggage, active: true },
  { id: 'explore', label: 'Khám phá', icon: Compass },
  { id: 'messages', label: 'Tin nhắn', icon: MessageSquare },
  { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
  { id: 'expenses', label: 'Chi tiêu', icon: Wallet },
]

export const guestLandingNavItems = [
  { id: 'popular-places', label: 'Cảm hứng', icon: Fan },
  { id: 'how-it-works', label: 'Cách dùng', icon: Crosshair },
  { id: 'testimonials', label: 'Đánh giá', icon: Star },
  { id: 'faq', label: 'Câu hỏi thường gặp', icon: HelpCircle },
]

export const guestGeneralNavItems = [
  { id: 'landing', label: 'Trang chủ', icon: Home },
  { id: 'about', label: 'Giới thiệu', icon: Info },
  { id: 'contact', label: 'Liên hệ', icon: Phone },
]

export const currentPageMap: Record<string, string> = {
    '/': 'landing',
    '/about': 'about',
    '/contact': 'contact',
  }