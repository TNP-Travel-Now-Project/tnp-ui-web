import { Bell, Info, MessageSquare, Star } from 'lucide-react'

export const navItems = [
  {
    label: 'Trang chủ',
    href: '/',
  },
  {
    label: 'Chúng tôi',
    href: '/about',
  },
  {
    label: 'Liên hệ',
    href: '/contact',
  },
]

export const    notifications = {
  all: [
    {
      id: 1,
      title: 'Ưu đãi đặt phòng',
      desc: 'Giảm 20% cho thành viên Vàng tại các khách sạn Phú Quốc.',
      time: '2 giờ trước',
      icon: Star,
      color: 'text-yellow-600 bg-yellow-100',
    },
    {
      id: 2,
      title: 'Cập nhật hệ thống',
      desc: 'Bản cập nhật v2.4 đã sẵn sàng với tính năng chia hóa đơn tự động.',
      time: '5 giờ trước',
      icon: Info,
      color: 'text-blue-600 bg-blue-100',
    },
  ],
  trip: [
    {
      id: 3,
      title: 'Ăn tối hải sản',
      desc: 'Hoạt động "Ăn tối hải sản" sẽ bắt đầu trong 15 phút nữa.',
      time: 'Ngay bây giờ',
      icon: Bell,
      color: 'text-secondary bg-secondary/10',
    },
    {
      id: 4,
      title: 'Chi phí mới',
      desc: 'Linh Nguyễn đã thêm chi phí mới: "Vé cáp treo Hòn Thơm".',
      time: '10 phút trước',
      icon: MessageSquare,
      color: 'text-primary bg-primary/10',
    },
  ],
}

export const currentPageMap: Record<string, string> = {
  '/dashboard': 'dashboard',
}

export const tripDetailTabs = ['Tổng quan', 'Lịch trình', 'Chi phí', 'Trò chuyện', 'Thành viên']
