import {
  Compass,
  HelpCircle,
  Home,
  Info,
  LayoutDashboard,
  Luggage,
  MessageSquare,
  Phone,
  Sparkles,
  Star,
  Wallet,
  X,
} from 'lucide-react'

export const loggedInNavItems = [
  { id: 'trips', label: 'Chuyến đi của tôi', icon: Luggage, active: true },
  { id: 'explore', label: 'Khám phá', icon: Compass },
  { id: 'messages', label: 'Tin nhắn', icon: MessageSquare },
  { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
  { id: 'expenses', label: 'Chi tiêu', icon: Wallet },
]

export const guestLandingNavItems = [
  { id: 'popular-places', label: 'Cảm hứng', icon: Sparkles },
  { id: 'how-it-works', label: 'Cách dùng', icon: Compass },
  { id: 'testimonials', label: 'Đánh giá', icon: Star },
  { id: 'faq', label: 'Câu hỏi thường gặp', icon: HelpCircle },
]

export const guestGeneralNavItems = [
  { id: 'landing', label: 'Trang chủ', icon: Home },
  { id: 'about', label: 'Giới thiệu', icon: Info },
  { id: 'contact', label: 'Liên hệ', icon: Phone },
]
