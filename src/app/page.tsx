import { useState, useRef, useEffect } from 'react'
import { Plus, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Sidebar,
  Header,
  TripCard,
  SummaryCard,
  ProfileModal,
  TripDetail,
  CreateTrip,
  PlanningTrip,
  TripExpenseModal,
  TripItineraryBuild,
  GuestLanding,
  AboutUs,
  Contact,
  AuthModal,
} from '@/shared/components/layout'
import { Trip, SummaryStat, TripDetailData } from '@/shared/types'
import { ToastProvider, useToast } from '@/shared/hook/useToast'
import { Button } from '@/shared/components/common'

const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    title: 'Hè rực rỡ tại Phú Quốc',
    startDate: '15/07',
    endDate: '20/07/2024',
    location: 'Kiên Giang, Việt Nam',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQp4tOWqw98pvtvukVGyIh9MOAv7M5l3-XhhLpziTG5ZeL1DVA22dXFx1MZaBkHEBngg7dBqk1ZMZpXp5V76qCUbL0D-DxLu_r_HE1jX5sDVtstVmIJYbbFvPp5VwTNHRVuwbi34cWU3nfVy-Xbtm1IozK0ZbSZ5iKe9GXAbrBfHwuhrxtGWsyDrhFJ0tFvlkJ8zU-F6s1NrxCWMiqZOXHpwHSxR_MuXT78xYQsuX0B6GsrYotDCSBFC0JWejdbWQ38l4PNVogNXkv',
    status: 'active',
    budget: 1200,
    participants: [
      {
        id: '1',
        name: 'User 1',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC3XKs8jlY3Y1K6LerlVcV5sidXdyVZOq-v49w-GmtZB5cAHAYCqw6Ju0ZyTS1avzmIjwv8HOBff3oFXqVvOk1fzkoiHOV5lWlAslEKL-oq9F9yWOkU4_TDt_dt0bCn1MQ2UakAy_Si2rx_1vqQn2uQyEO8MuPGkqP_ESwsHiliWuIMO4TCdWjMRfgswxZom_FWY3Aji5DzlFrM4Xvr2nJtD2Q9d8Ei6yZpKTvBdr0VlnkBgGBhEp-vx2sMAYu65YN66gegihYqAUNl',
      },
      {
        id: '2',
        name: 'User 2',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB9fezLG-Ge6etGvPfqn1n02eKQaBA25YqZ17dE9ai0QY_dmbJjnyMmICmCXuNnYuZcMiZA_t81GcxcBL6DmV526WrwKgnZc850QWdtVs7gQOp8jPfe-uwJGMexuQr2U9QmFFqMB7ecResnU24uew4ejxL4UFL0olzdRqG7QTXKeIFvGDk7L2V-zMu2hXim4krSURo9A_7xNLwoMsGpsQlr1y-c7wv6sSZTc2awN6HZju--0XgxVAcPX_Mm-btleJGBgXhs4Kh8Bip6',
      },
      {
        id: '3',
        name: 'User 3',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDjJ8sMnFVbzSjsDyTGHViDmOHhzDjnYVwlpf8yffUhfF3aefQGylIChIHG74zCnGy2YWNi8LpOdM3TVZ_HJ49u-MtEVoFqZ8jiNBvz-784FdAKaPyFGvRZUl45g_Ltw8BS90eYQluFJ1dBPfJldgAonVkUo4EjVG9olBJfWXZ2ZFbRAAv-rX1ynMrKaiZP2Jeg83LRo5a6rGIsFzCbx0rWuAXeZ5dM_BcxPRdxxRD-GsTS4YiVBjAsSXTAg3zAY48L7GtfVCYrT3ly',
      },
      {
        id: '4',
        name: 'User 4',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDjJ8sMnFVbzSjsDyTGHViDmOHhzDjnYVwlpf8yffUhfF3aefQGylIChIHG74zCnGy2YWNi8LpOdM3TVZ_HJ49u-MtEVoFqZ8jiNBvz-784FdAKaPyFGvRZUl45g_Ltw8BS90eYQluFJ1dBPfJldgAonVkUo4EjVG9olBJfWXZ2ZFbRAAv-rX1ynMrKaiZP2Jeg83LRo5a6rGIsFzCbx0rWuAXeZ5dM_BcxPRdxxRD-GsTS4YiVBjAsSXTAg3zAY48L7GtfVCYrT3ly',
      },
      {
        id: '5',
        name: 'User 5',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDjJ8sMnFVbzSjsDyTGHViDmOHhzDjnYVwlpf8yffUhfF3aefQGylIChIHG74zCnGy2YWNi8LpOdM3TVZ_HJ49u-MtEVoFqZ8jiNBvz-784FdAKaPyFGvRZUl45g_Ltw8BS90eYQluFJ1dBPfJldgAonVkUo4EjVG9olBJfWXZ2ZFbRAAv-rX1ynMrKaiZP2Jeg83LRo5a6rGIsFzCbx0rWuAXeZ5dM_BcxPRdxxRD-GsTS4YiVBjAsSXTAg3zAY48L7GtfVCYrT3ly',
      },
    ],
  },
  {
    id: '2',
    title: 'Mùa thu Kyoto mộng mơ',
    startDate: '10/11',
    endDate: '18/11/2024',
    location: 'Kyoto, Nhật Bản',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCh2GICk7spKyiNfcMTu7GdvhGbQ-dLIfvyVRyA47-sGBPkXHIdsnV_vRL31d2DhQI0UBWaoiqc5ShP10bMWvQeLHFw8XMo1g1UAevpX3dU1TAM06pEZmLV4Z5cHEunxu23Au_KFwLtWZmzAo5RitzJrG_55due6Cs9ByHfBw7JvyQgxIlVHfbO6xWtfps3cop1HO9R_uH5nOlLaef8fwPVQq7lRnbhmZ0srue0eL53G7wDd8rwLWf486KMNNK3AuLmWnqdzjIRU1Nr',
    status: 'planning',
    budget: 3500,
    participants: [
      {
        id: '6',
        name: 'User 6',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAV-4JCjbm0sEzMYF3iU5VpSq1coGAxpjAbSUlk-lhjsmRrYAzDL5m7lv_JLk70HdJgNScT7CLMQlMhbQGmrk1QUjXofjXKM3UXogAT5NTUEJ-bW9GHVk4fwszjq145HpuhesjASiQrzNw1wm8Kf0RDMG7lVTeIDRo1mazj9dDpyC60DJhu4HegRH4q8M3s6nwqKchS-n-Nm_bdU02wPTNlPhNkco3RRwUFHOEyeNkOm0jLh1dHgl69vIpS4bLF8S659OcJVD88Syc7',
      },
      {
        id: '7',
        name: 'User 7',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB3QMl36KWVjUtcRSLJ8MY71PRMEc1H32fq3-vEHp8U-aOpVfv0k_cTK4oAnh0St1IwurM5R5getW7cvqA-3bKwbZ6gkSilegVpbHk1B8KdADm_Ro1glSYDZ5T2XaJ5rCCHs60SXvKDeie1XGD7FkxLgPVAGzUOtGznUVRrkNwnB1kS4ldhldgrzr8VHgY2sr99iwB1eVFdpXlhd_RDBQQx6gMni2hpU_LRHaQz-umAufeuq0SKkSJXB1ix0Yv9es7qJP0e6pPrW37p',
      },
      {
        id: '8',
        name: 'User 8',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB3QMl36KWVjUtcRSLJ8MY71PRMEc1H32fq3-vEHp8U-aOpVfv0k_cTK4oAnh0St1IwurM5R5getW7cvqA-3bKwbZ6gkSilegVpbHk1B8KdADm_Ro1glSYDZ5T2XaJ5rCCHs60SXvKDeie1XGD7FkxLgPVAGzUOtGznUVRrkNwnB1kS4ldhldgrzr8VHgY2sr99iwB1eVFdpXlhd_RDBQQx6gMni2hpU_LRHaQz-umAufeuq0SKkSJXB1ix0Yv9es7qJP0e6pPrW37p',
      },
    ],
  },
]

const MOCK_DETAIL: TripDetailData = {
  id: '1',
  title: 'Hè rực rỡ tại Phú Quốc',
  startDate: '15/07',
  endDate: '20/07/2024',
  location: 'Kiên Giang, Việt Nam',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCQp4tOWqw98pvtvukVGyIh9MOAv7M5l3-XhhLpziTG5ZeL1DVA22dXFx1MZaBkHEBngg7dBqk1ZMZpXp5V76qCUbL0D-DxLu_r_HE1jX5sDVtstVmIJYbbFvPp5VwTNHRVuwbi34cWU3nfVy-Xbtm1IozK0ZbSZ5iKe9GXAbrBfHwuhrxtGWsyDrhFJ0tFvlkJ8zU-F6s1NrxCWMiqZOXHpwHSxR_MuXT78xYQsuX0B6GsrYotDCSBFC0JWejdbWQ38l4PNVogNXkv',
  status: 'active',
  budget: 12000000,
  totalSpent: '15.400.000đ',
  budgetLimit: '25.000.000đ',
  personalBalance: '-1.250.000đ',
  nextActivity: 'Ăn tối hải sản',
  participants: [
    {
      id: '1',
      name: 'Linh Nguyễn',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC3XKs8jlY3Y1K6LerlVcV5sidXdyVZOq-v49w-GmtZB5cAHAYCqw6Ju0ZyTS1avzmIjwv8HOBff3oFXqVvOk1fzkoiHOV5lWlAslEKL-oq9F9yWOkU4_TDt_dt0bCn1MQ2UakAy_Si2rx_1vqQn2uQyEO8MuPGkqP_ESwsHiliWuIMO4TCdWjMRfgswxZom_FWY3Aji5DzlFrM4Xvr2nJtD2Q9d8Ei6yZpKTvBdr0VlnkBgGBhEp-vx2sMAYu65YN66gegihYqAUNl',
    },
    {
      id: '2',
      name: 'Hoàng Nam',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB9fezLG-Ge6etGvPfqn1n02eKQaBA25YqZ17dE9ai0QY_dmbJjnyMmICmCXuNnYuZcMiZA_t81GcxcBL6DmV526WrwKgnZc850QWdtVs7gQOp8jPfe-uwJGMexuQr2U9QmFFqMB7ecResnU24uew4ejxL4UFL0olzdRqG7QTXKeIFvGDk7L2V-zMu2hXim4krSURo9A_7xNLwoMsGpsQlr1y-c7wv6sSZTc2awN6HZju--0XgxVAcPX_Mm-btleJGBgXhs4Kh8Bip6',
    },
    {
      id: '3',
      name: 'Minh Đức',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDjJ8sMnFVbzSjsDyTGHViDmOHhzDjnYVwlpf8yffUhfF3aefQGylIChIHG74zCnGy2YWNi8LpOdM3TVZ_HJ49u-MtEVoFqZ8jiNBvz-784FdAKaPyFGvRZUl45g_Ltw8BS90eYQluFJ1dBPfJldgAonVkUo4EjVG9olBJfWXZ2ZFbRAAv-rX1ynMrKaiZP2Jeg83LRo5a6rGIsFzCbx0rWuAXeZ5dM_BcxPRdxxRD-GsTS4YiVBjAsSXTAg3zAY48L7GtfVCYrT3ly',
    },
  ],
  activities: [
    {
      id: 'a1',
      user: {
        id: '1',
        name: 'Linh Nguyễn',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC3XKs8jlY3Y1K6LerlVcV5sidXdyVZOq-v49w-GmtZB5cAHAYCqw6Ju0ZyTS1avzmIjwv8HOBff3oFXqVvOk1fzkoiHOV5lWlAslEKL-oq9F9yWOkU4_TDt_dt0bCn1MQ2UakAy_Si2rx_1vqQn2uQyEO8MuPGkqP_ESwsHiliWuIMO4TCdWjMRfgswxZom_FWY3Aji5DzlFrM4Xvr2nJtD2Q9d8Ei6yZpKTvBdr0VlnkBgGBhEp-vx2sMAYu65YN66gegihYqAUNl',
      },
      type: 'expense',
      description: 'đã thêm chi phí',
      target: 'Vé cáp treo Hòn Thơm',
      timestamp: '10 phút trước',
      amount: '3.200.000đ',
      attachment: 'Hoa-don-cap-treo.jpg',
    },
    {
      id: 'a2',
      user: {
        id: '2',
        name: 'Hoàng Nam',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB9fezLG-Ge6etGvPfqn1n02eKQaBA25YqZ17dE9ai0QY_dmbJjnyMmICmCXuNnYuZcMiZA_t81GcxcBL6DmV526WrwKgnZc850QWdtVs7gQOp8jPfe-uwJGMexuQr2U9QmFFqMB7ecResnU24uew4ejxL4UFL0olzdRqG7QTXKeIFvGDk7L2V-zMu2hXim4krSURo9A_7xNLwoMsGpsQlr1y-c7wv6sSZTc2awN6HZju--0XgxVAcPX_Mm-btleJGBgXhs4Kh8Bip6',
      },
      type: 'schedule',
      description: 'đã cập nhật lịch trình',
      target: 'Ngày 3',
      timestamp: '2 giờ trước',
      attachment: 'Thay đổi nhà hàng ăn tối sang On The Rocks để ngắm hoàng hôn đẹp hơn.',
    },
    {
      id: 'a3',
      user: {
        id: '3',
        name: 'Minh Đức',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDjJ8sMnFVbzSjsDyTGHViDmOHhzDjnYVwlpf8yffUhfF3aefQGylIChIHG74zCnGy2YWNi8LpOdM3TVZ_HJ49u-MtEVoFqZ8jiNBvz-784FdAKaPyFGvRZUl45g_Ltw8BS90eYQluFJ1dBPfJldgAonVkUo4EjVG9olBJfWXZ2ZFbRAAv-rX1ynMrKaiZP2Jeg83LRo5a6rGIsFzCbx0rWuAXeZ5dM_BcxPRdxxRD-GsTS4YiVBjAsSXTAg3zAY48L7GtfVCYrT3ly',
      },
      type: 'member',
      description: 'đã mời Thu Hà tham gia nhóm',
      timestamp: '5 giờ trước',
    },
  ],
}

const SUMMARY_STATS: SummaryStat[] = [
  {
    label: 'Tổng ngân sách năm',
    value: '$5,400',
    change: '12% so với 2023',
    changeType: 'negative',
    icon: 'trending',
  },
  {
    label: 'Chuyến đi hoàn thành',
    value: '12',
    change: 'Mục tiêu đạt 80%',
    changeType: 'positive',
    icon: 'check',
  },
  {
    label: 'Bạn đồng hành',
    value: '24',
    change: 'Tăng 4 tháng này',
    changeType: 'neutral',
    icon: 'users',
  },
  {
    label: 'Điểm tích lũy',
    value: '1,250',
    change: 'Thành viên Vàng',
    changeType: 'positive',
    icon: 'star',
  },
]

const dashboardTabs = ['Lịch trình', 'Chi phí', 'Trò chuyện', 'Thành viên']
const tripDetailTabs = ['Tổng quan', 'Lịch trình', 'Chi phí', 'Trò chuyện', 'Thành viên']

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login')
  const [activeTab, setActiveTab] = useState('Lịch trình')
  const { showToast } = useToast()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [profileModalTab, setProfileModalTab] = useState<
    'personal' | 'security' | 'finance' | 'notifications' | 'settings'
  >('personal')
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null)
  const [isViewingAllTrips, setIsViewingAllTrips] = useState(false)
  const [isCreatingTrip, setIsCreatingTrip] = useState(false)
  const [isPlanningTrip, setIsPlanningTrip] = useState(false)
  const [isBuildingItinerary, setIsBuildingItinerary] = useState(false)
  const [currentPage, setCurrentPage] = useState<'landing' | 'about' | 'contact'>('landing')
  const [hasNotification, setHasNotification] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  const tabs = selectedTripId ? tripDetailTabs : dashboardTabs

  const [hasQR, setHasQR] = useState(false) // Simulate QR registration status

  useEffect(() => {
    // If logged in but no QR, enforce registration after a delay or on specific trigger
    // For simulation, we'll trigger it if they are in a trip detail view and try to access expenses
    if (isLoggedIn && !hasQR && selectedTripId && activeTab === 'Chi phí') {
      const timer = setTimeout(() => {
        // Dispatch event to close all other modals in the system
        window.dispatchEvent(new CustomEvent('close-all-modals'))

        setIsAuthModalOpen(false)
        setIsCreatingTrip(false)
        setIsPlanningTrip(false)
        setIsBuildingItinerary(false)

        setIsProfileModalOpen(true)
        setProfileModalTab('finance')
        showToast('Vui lòng cập nhật mã QR để tiếp tục', 'warning')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isLoggedIn, hasQR, selectedTripId, activeTab, showToast])

  const handleTabClick = (tab: string, index: number) => {
    setActiveTab(tab)
    if (tabsRef.current && tabsRef.current.children[index]) {
      const targetTab = tabsRef.current.children[index] as HTMLElement
      targetTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }

  const handleTripSelect = (id: string) => {
    setSelectedTripId(id)
    setIsViewingAllTrips(false)
    setIsCreatingTrip(false)
    setIsPlanningTrip(false)
    setIsBuildingItinerary(false)
    setActiveTab('Tổng quan')
  }

  const handleStartCreate = () => {
    setIsCreatingTrip(true)
    setSelectedTripId(null)
    setIsPlanningTrip(false)
    setIsBuildingItinerary(false)
    showToast('Đang chuẩn bị lên lịch trình mới...', 'info')
  }

  const handleBack = () => {
    setSelectedTripId(null)
    setIsViewingAllTrips(false)
    setIsCreatingTrip(false)
    setIsPlanningTrip(false)
    setIsBuildingItinerary(false)
    setHasNotification(false)
    setActiveTab('Lịch trình')
  }

  const handlePlanning = () => {
    setIsCreatingTrip(false)
    setIsPlanningTrip(true)
    setIsBuildingItinerary(false)
  }

  const handleNextToItinerary = () => {
    setIsPlanningTrip(false)
    setIsBuildingItinerary(true)
  }

  const handleBackToPlanning = () => {
    setIsBuildingItinerary(false)
    setIsPlanningTrip(true)
  }

  const handleLogin = (tab: 'login' | 'register' = 'login') => {
    setAuthInitialTab(tab)
    setIsAuthModalOpen(true)
  }

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    showToast('Chào mừng bạn quay trở lại!', 'success')
  }

  useEffect(() => {
    if (isLoggedIn) {
      document.body.style.overflow = ''
      document.body.style.pointerEvents = 'auto'

      const timer = setTimeout(() => {
        document.body.style.overflow = ''
        document.body.style.pointerEvents = 'auto'
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoggedIn])

  useEffect(() => {
    const handleOpenLogin = () => handleLogin('login')
    const handleNavAbout = () => navigateToAbout()
    const handleNavContact = () => navigateToContact()
    const handleNavLanding = () => navigateToLanding()
    const handleOpenSettings = () => handleProfileNav('settings')

    window.addEventListener('open-login', handleOpenLogin)
    window.addEventListener('nav-about', handleNavAbout)
    window.addEventListener('nav-contact', handleNavContact)
    window.addEventListener('nav-landing', handleNavLanding)
    window.addEventListener('open-settings', handleOpenSettings)

    return () => {
      window.removeEventListener('open-login', handleOpenLogin)
      window.removeEventListener('nav-about', handleNavAbout)
      window.removeEventListener('nav-contact', handleNavContact)
      window.removeEventListener('nav-landing', handleNavLanding)
      window.removeEventListener('open-settings', handleOpenSettings)
    }
  }, [])

  const navigateToAbout = () => {
    setCurrentPage('about')
    setIsSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToLanding = () => {
    setCurrentPage('landing')
    setIsSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToContact = () => {
    setCurrentPage('contact')
    setIsSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleProfileNav = (tab: any = 'personal') => {
    setProfileModalTab(tab)
    setIsProfileModalOpen(true)
  }

  if (!isLoggedIn) {
    return (
      <>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isLoggedIn={false}
          currentPage={currentPage as any}
          onNavigateLanding={navigateToLanding}
          onNavigateAbout={navigateToAbout}
          onNavigateContact={navigateToContact}
        />
        {currentPage === 'landing' ? (
          <GuestLanding
            onLogin={() => handleLogin('login')}
            onRegister={() => handleLogin('register')}
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            onNavigateAbout={navigateToAbout}
          />
        ) : currentPage === 'about' ? (
          <AboutUs
            onBack={navigateToLanding}
            onLogin={() => handleLogin('login')}
            onRegister={() => handleLogin('register')}
            isLoggedIn={false}
            onContactClick={navigateToContact}
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        ) : (
          <Contact
            onBack={navigateToLanding}
            onLogin={() => handleLogin('login')}
            onRegister={() => handleLogin('register')}
            isLoggedIn={false}
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        )}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          initialTab={authInitialTab}
        />
      </>
    )
  }

  return (
    <div className='flex min-h-screen bg-background'>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onProfileClick={() => handleProfileNav('personal')}
        onSettingsClick={() => handleProfileNav('settings')}
      />

      <div
        className={`flex-1 flex flex-col w-full transition-all duration-300 ${isLoggedIn ? (isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20') : isSidebarOpen ? 'lg:ml-72' : 'lg:ml-0'}`}
      >
        <Header
          isLoggedIn={isLoggedIn}
          showNotification={hasNotification}
          onMenuClick={() => setIsSidebarOpen(true)}
          onProfileClick={() => handleProfileNav('personal')}
          onLoginClick={() => handleLogin('login')}
          onRegisterClick={() => handleLogin('register')}
          showNav={false}
        >
          {selectedTripId && (
            <div ref={tabsRef} className='flex gap-8 px-4 h-full items-center'>
              {tabs.map((tab, index) => (
                <Button
                  key={tab}
                  onClick={() => handleTabClick(tab, index)}
                  className={`relative p-1 h-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center ${
                    activeTab === tab ? 'text-primary' : 'text-outline/70 hover:text-on-surface'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId='activeTabIndicatorHeader'
                      className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_-2px_4px_rgba(201,153,107,0.3)]'
                    />
                  )}
                </Button>
              ))}
            </div>
          )}
        </Header>

        {/* Navigation Tabs Bar - Only show when a trip is selected - Hidden on desktop as it's in header */}
        {selectedTripId && (
          <div className='lg:hidden bg-white border-b border-[#d6d0cc]/30 sticky top-16 z-30 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]'>
            <div
              ref={tabsRef}
              className='flex gap-8 px-4 md:px-8 overflow-x-auto scrollbar-hide no-scrollbar max-w-7xl mx-auto w-full'
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {tabs.map((tab, index) => (
                <Button
                  key={tab}
                  onClick={() => handleTabClick(tab, index)}
                  className={`relative px-1 py-4 text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab
                      ? 'text-primary scale-105'
                      : 'text-outline/70 hover:text-on-surface'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId='activeTabIndicator'
                      className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_-2px_4px_rgba(201,153,107,0.3)]'
                    />
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}

        <main className='p-4 md:p-10 pb-24 lg:pb-16 max-w-7xl mx-auto w-full'>
          {selectedTripId ? (
            <TripDetail
              trip={MOCK_DETAIL}
              onBack={handleBack}
              onImminentActivity={setHasNotification}
            />
          ) : isViewingAllTrips ? (
            <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
              <div className='flex items-center justify-between mb-8'>
                <div>
                  <h2 className='text-2xl font-black text-on-surface tracking-tight'>
                    Tất cả chuyến đi
                  </h2>
                  <p className='text-sm text-outline font-medium'>
                    Danh sách các chuyến đi của bạn
                  </p>
                </div>
                <Button
                  onClick={() => setIsViewingAllTrips(false)}
                  className='px-4 py-2 bg-surface-container hover:bg-outline-variant/20 text-on-surface text-xs font-bold rounded-lg transition-all'
                >
                  Quay lại
                </Button>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6'>
                {MOCK_TRIPS.map((trip) => (
                  <div
                    key={trip.id}
                    onClick={() => handleTripSelect(trip.id)}
                    className='cursor-pointer'
                  >
                    <TripCard trip={trip} />
                  </div>
                ))}
              </div>
            </div>
          ) : isBuildingItinerary ? (
            <TripItineraryBuild onBack={handleBackToPlanning} />
          ) : isPlanningTrip ? (
            <PlanningTrip onBack={handleBack} onNext={handleNextToItinerary} />
          ) : isCreatingTrip ? (
            <CreateTrip onBack={handleBack} onPlanning={handlePlanning} />
          ) : (
            <>
              {/* Welcome Hero */}
              <section className='mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6'>
                <div className='max-w-2xl'>
                  <h1 className='text-4xl font-bold text-on-surface mb-2 tracking-tight'>
                    Chào {new Date().getHours() < 12 ? 'sáng' : 'mừng'}, Tuấn!
                  </h1>
                  <p className='text-lg text-on-surface-variant font-medium opacity-80'>
                    Sẵn sàng cho chuyến phiêu lưu tiếp theo?
                  </p>
                </div>
              </section>

              {/* Upcoming Trips */}
              <section className='mb-12'>
                <div className='flex items-center justify-between mb-4 sm:mb-6'>
                  <h2 className='text-lg sm:text-xl font-bold text-on-surface flex items-center gap-2'>
                    Chuyến đi sắp tới
                    <span className='bg-secondary-container text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full'>
                      3
                    </span>
                  </h2>
                  <Button
                    onClick={() => setIsViewingAllTrips(true)}
                    className='text-primary font-semibold text-xs sm:text-sm flex items-center gap-1 hover:underline'
                  >
                    Xem tất cả
                    <ArrowRight size={14} />
                  </Button>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6'>
                  {MOCK_TRIPS.map((trip) => (
                    <div
                      key={trip.id}
                      onClick={() => handleTripSelect(trip.id)}
                      className='cursor-pointer'
                    >
                      <TripCard trip={trip} />
                    </div>
                  ))}

                  {/* Add New Project Placeholder */}
                  <motion.div
                    onClick={handleStartCreate}
                    className={`rounded-md sm:rounded-2xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-2 sm:p-6 lg:p-12 group cursor-pointer hover:border-primary hover:bg-primary/5 transition-all col-span-2 md:col-span-2 lg:col-span-1 h-32 sm:h-auto`}
                  >
                    <div className='w-8 h-8 sm:w-16 sm:h-16 rounded-lg bg-surface-container flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform'>
                      <Plus className='text-primary-container' size={24} />
                    </div>
                    <p className='text-xs sm:text-base font-bold text-on-surface-variant group-hover:text-primary'>
                      Lên lịch mới
                    </p>
                    <p className='hidden sm:block text-xs text-outline text-center mt-2 max-w-[160px]'>
                      Hãy bắt đầu một hành trình mới cùng bạn bè!
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Insights Summary */}
              <section>
                <h3 className='text-lg font-bold text-on-surface mb-4 sm:mb-6'>
                  Tổng quan chi tiêu & Hoạt động
                </h3>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6'>
                  {SUMMARY_STATS.map((stat) => (
                    <SummaryCard key={stat.label} stat={stat} />
                  ))}
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      {/* Mobile FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleStartCreate}
        className='md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-[4px] shadow-2xl flex items-center justify-center z-50'
      >
        <Plus size={24} />
      </motion.button>
      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialTab={profileModalTab}
      />
    </div>
  )
}
