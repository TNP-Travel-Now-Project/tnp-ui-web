import { AnimatePresence, motion } from 'framer-motion'
import {
  Calculator,
  Calendar,
  Camera,
  ChevronDown,
  Coffee,
  Hotel,
  Info,
  Landmark,
  MapPin,
  Navigation2,
  Plus,
  Search,
  Sparkles,
  Tent,
  Users,
  Utensils,
  Wallet,
  X,
} from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { useModalScrollLock } from '@/shared/hook/useModalScrollLock'
import { useToast } from '@/shared/hook/useToast'
import SplitCostModal from '../SplitCostModal/SplitCostModal'

interface TripItineraryBuildProps {
  onBack: () => void
}

function ConfirmModal({
  isOpen,
  onClose,
  onStartNow,
  onDoLater,
}: {
  isOpen: boolean
  onClose: () => void
  onStartNow: () => void
  onDoLater: () => void
}) {
  if (!isOpen) return null
  return (
    <div className='fixed inset-0 z-[300] flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className='relative bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl overflow-hidden border border-outline-variant/30 text-center'
      >
        <div className='w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6'>
          <Sparkles size={32} />
        </div>
        <h3 className='text-xl font-black text-on-surface mb-3 tracking-tighter'>
          Lịch trình đã sẵn sàng!
        </h3>
        <p className='text-sm text-outline font-medium leading-relaxed mb-8'>
          Bạn có muốn bắt đầu theo dõi lộ trình và chi phí cho chuyến đi này ngay bây giờ không?
        </p>
        <div className='space-y-3'>
          <button
            onClick={onStartNow}
            className='w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all'
          >
            Bắt đầu ngay
          </button>
          <button
            onClick={onDoLater}
            className='w-full py-4 bg-surface-container text-on-surface rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-outline-variant/20 transition-all font-sans'
          >
            Để sau
          </button>
        </div>
      </motion.div>
    </div>
  )
}

const ITINERARY_TYPES = [
  { id: 'cafe', label: 'Cà phê', icon: Coffee, color: 'bg-emerald-100 text-emerald-700' },
  { id: 'restaurant', label: 'Nhà hàng', icon: Utensils, color: 'bg-orange-100 text-orange-700' },
  { id: 'hotel', label: 'Khách sạn', icon: Hotel, color: 'bg-blue-100 text-blue-700' },
  {
    id: 'landmark',
    label: 'Điểm tham quan',
    icon: Landmark,
    color: 'bg-purple-100 text-purple-700',
  },
  { id: 'atm', label: 'ATM', icon: Calculator, color: 'bg-gray-100 text-gray-700' },
]

const MOCK_PLACES = [
  {
    id: 1,
    name: 'The Note Coffee',
    address: '64 Lương Văn Can, Hoàn Kiếm, Hà Nội',
    distance: '0.5 km',
    time: '08:00 - 10:00',
    icon: Coffee,
    color: 'bg-emerald-50',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipM-XyUfV_pW_vZwB9yH-Z5Z9q7y4Z5Z9q7y4Z5Z=s1360-w1360-h1020',
  },
  {
    id: 2,
    name: 'Bảo tàng Dân tộc học',
    address: 'Nguyễn Văn Huyên, Cầu Giấy, Hà Nội',
    distance: '3.2 km',
    time: '10:30 - 12:30',
    icon: Landmark,
    color: 'bg-purple-50',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipN9_8M5Zq5v-Z5Z9q7y4Z5Z9q7y4Z5Z9q7y4Z5Z=s1360-w1360-h1020',
  },
  {
    id: 3,
    name: 'Nhà hàng Bốn Mùa',
    address: '15 Lê Thạch, Hoàn Kiếm, Hà Nội',
    distance: '0.8 km',
    time: '13:00 - 14:30',
    icon: Utensils,
    color: 'bg-orange-50',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipM7_6M5Zq5v-Z5Z9q7y4Z5Z9q7y4Z5Z9q7y4Z5Z=s1360-w1360-h1020',
  },
]

export default function TripItineraryBuild({ onBack }: TripItineraryBuildProps) {
  const { showToast } = useToast()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [locationStatus, setLocationStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt')
  const [selectedPlace, setSelectedPlace] = useState<any>(null)
  const [estimatedCost, setEstimatedCost] = useState('')
  const [showTimeline, setShowTimeline] = useState(false)
  const [showSuggestionsOverview, setShowSuggestionsOverview] = useState(false)
  const [showSplitModal, setShowSplitModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [participants] = useState([
    { id: 1, name: 'Tôi', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { id: 2, name: 'An', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
    { id: 3, name: 'Tuan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
  ])

  // Apply scroll lock when any modal is open
  const isAnyModalOpen =
    showTimeline ||
    showSuggestionsOverview ||
    selectedPlace !== null ||
    showSplitModal ||
    showConfirmModal
  useModalScrollLock(isAnyModalOpen)

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '')
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '')
    if (rawVal.length > 9) return
    const formatted = formatCurrency(rawVal)
    setEstimatedCost(formatted)
  }

  const handleEstimatedCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    if (rawValue.length > 9) return
    const formatted = formatCurrency(rawValue)
    setEstimatedCost(formatted)
  }

  const requestLocation = () => {
    if (!navigator.geolocation) {
      alert('Trình duyệt không hỗ trợ định vị.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationStatus('granted')
      },
      () => {
        setLocationStatus('denied')
      },
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className='space-y-4 sm:space-y-8 pb-20'
    >
      {/* Header Section */}
      <div className='flex flex-row items-center justify-between gap-4'>
        <div className='min-w-0 flex-1'>
          <h1 className='text-lg sm:text-3xl font-black tracking-tighter text-on-surface leading-tight break-words'>
            Thông tin chi tiết chuyến đi
          </h1>
          <nav className='flex items-center gap-2 mt-0.5 sm:mt-1'>
            <button
              onClick={onBack}
              className='text-[9px] sm:text-xs text-outline font-medium hover:text-primary transition-colors'
            >
              Hành trình
            </button>
            <span className='text-outline/30 select-none text-[9px] sm:text-xs'>/</span>
            <span className='text-[9px] sm:text-xs text-primary font-bold'>Chi tiết</span>
          </nav>
        </div>
        <div className='flex items-center gap-2 sm:gap-3 shrink-0'>
          <button
            onClick={onBack}
            className='flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-outline-variant rounded-[4px] text-[10px] sm:text-sm font-bold text-outline hover:bg-surface-container transition-all'
          >
            Quay lại
          </button>
          <button
            onClick={() => {
              setShowConfirmModal(true)
            }}
            className='flex items-center gap-1.5 px-5 sm:px-6 py-2 sm:py-2.5 bg-primary text-white rounded-[4px] text-[10px] sm:text-sm font-bold shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95'
          >
            Hoàn tất
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8'>
        {/* Left Column: AI Form Info */}
        <div className='lg:col-span-8 space-y-6'>
          <div className='bg-white p-5 sm:p-8 rounded-[24px] border border-outline-variant/30 shadow-sm'>
            <div className='flex items-center gap-3 mb-6 sm:mb-8'>
              <div className='p-2 sm:p-2.5 bg-primary/10 rounded-xl text-primary'>
                <Sparkles size={18} />
              </div>
              <h2 className='text-base sm:text-xl font-bold text-on-surface'>Thông tin chi tiết</h2>
            </div>

            <div className='space-y-4 sm:space-y-6'>
              <div className='flex flex-row gap-3 sm:gap-5'>
                <div className='w-[30%] sm:w-1/2 space-y-2'>
                  <label className='text-[9px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                    Số người
                  </label>
                  <input
                    type='text'
                    placeholder='Ví dụ: 4'
                    className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
                  />
                </div>
                <div className='w-[70%] sm:w-1/2 space-y-2'>
                  <label className='text-[9px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                    Chi phí ước tính (VNĐ)
                  </label>
                  <div className='relative group'>
                    <input
                      type='text'
                      value={estimatedCost}
                      onChange={handleCostChange}
                      placeholder='Ví dụ: 10,000,000'
                      className='w-full pl-3 sm:pl-4 pr-12 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
                    />
                    <button
                      onClick={() => {
                        if (!estimatedCost || estimatedCost === '0') {
                          showToast('Vui lòng nhập chi phí dự kiến trước', 'info')
                          return
                        }
                        setShowSplitModal(true)
                      }}
                      className='absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all'
                    >
                      <Calculator size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-[9px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                  Địa điểm muốn tới
                </label>
                <div className='relative'>
                  <MapPin
                    size={16}
                    className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-outline/40'
                  />
                  <input
                    type='text'
                    placeholder='Nhập tên thành phố hoặc quốc gia...'
                    className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3 sm:gap-5'>
                <div className='space-y-2'>
                  <label className='text-[9px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                    Kiểu chuyến đi
                  </label>
                  <select className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer'>
                    <option>Nghỉ dưỡng</option>
                    <option>Khám phá</option>
                    <option>Phiêu lưu</option>
                  </select>
                </div>
                <div className='space-y-2'>
                  <label className='text-[9px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                    Nhịp độ
                  </label>
                  <select className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer'>
                    <option>Thong thả</option>
                    <option>Vừa phải</option>
                    <option>Nhanh</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3 sm:gap-5'>
                <div className='space-y-2'>
                  <label className='text-[10px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                    Đi cùng ai
                  </label>
                  <select className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer'>
                    <option>Gia định</option>
                    <option>Bạn bè</option>
                    <option>Người yêu</option>
                    <option>Một mình</option>
                  </select>
                </div>
                <div className='space-y-2'>
                  <label className='text-[10px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                    Phương tiện
                  </label>
                  <select className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer'>
                    <option>Máy bay</option>
                    <option>Xe khách</option>
                    <option>Tàu hỏa</option>
                    <option>Xe cá nhân</option>
                  </select>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-[9px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                  Yêu cầu thêm
                </label>
                <textarea
                  placeholder='Nhập các yêu cầu đặc biệt như ăn chay, dị ứng, hoặc ưu tiên di chuyển ngắn...'
                  className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all h-20 sm:h-24 resize-none'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Summary */}
        <div className='lg:col-span-4 space-y-6'>
          {/* Trip Preview Card */}
          <div className='bg-white rounded-[24px] border border-outline-variant/30 shadow-sm overflow-hidden group'>
            <div className='relative h-48 sm:h-56'>
              <img
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuCQp4tOWqw98pvtvukVGyIh9MOAv7M5l3-XhhLpziTG5ZeL1DVA22dXFx1MZaBkHEBngg7dBqk1ZMZpXp5V76qCUbL0D-DxLu_r_HE1jX5sDVtstVmIJYbbFvPp5VwTNHRVuwbi34cWU3nfVy-Xbtm1IozK0ZbSZ5iKe9GXAbrBfHwuhrxtGWsyDrhFJ0tFvlkJ8zU-F6s1NrxCWMiqZOXHpwHSxR_MuXT78xYQsuX0B6GsrYotDCSBFC0JWejdbWQ38l4PNVogNXkv'
                alt='Trip Cover'
                className='w-full h-full object-cover transition-transform duration-700'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
              <div className='absolute top-4 left-4 flex flex-col gap-2'>
                <span className='px-3 py-1 bg-primary text-[10px] font-black tracking-widest text-white rounded-full uppercase'>
                  Preview
                </span>
              </div>
              <div className='absolute bottom-4 left-4 right-4'>
                <h3 className='text-xl font-black text-white leading-tight'>
                  Mùa hè rực rỡ tại Đà Lạt
                </h3>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <p className='text-[10px] font-black uppercase tracking-widest text-outline'>
                    Ngày đi
                  </p>
                  <p className='text-sm font-bold text-on-surface'>15 Th06, 2024</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-[10px] font-black uppercase tracking-widest text-outline'>
                    Ngày về
                  </p>
                  <p className='text-sm font-bold text-on-surface'>20 Th06, 2024</p>
                </div>
              </div>

              <div className='space-y-2'>
                <p className='text-[10px] font-black uppercase tracking-widest text-outline'>
                  Thành viên
                </p>
                <div className='flex items-center -space-x-2'>
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className='w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm'
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                        alt='User'
                      />
                    </div>
                  ))}
                  <div className='w-8 h-8 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-white text-[9px] font-black shadow-sm'>
                    +3
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats/Links */}
          <motion.div
            onClick={() => setShowTimeline(true)}
            animate={{
              boxShadow: [
                '0 0 0px rgba(245, 158, 11, 0)',
                '0 0 50px rgba(245, 158, 11, 0.8)',
                '0 0 0px rgba(245, 158, 11, 0)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className='bg-white p-5 rounded-[20px] border border-outline-variant/30 shadow-sm flex items-center gap-4 group cursor-pointer hover:bg-surface-container/50 transition-all relative ring-2 ring-primary/10'
          >
            <div className='p-3 bg-secondary/10 rounded-xl text-secondary transition-transform'>
              <Landmark size={20} />
            </div>
            <div className='flex-1'>
              <p className='text-sm sm:text-base font-black text-on-surface'>
                Xem phân loại lộ trình
              </p>
              <p className='text-[11px] sm:text-xs text-outline font-medium'>
                Phân nhóm địa điểm theo loại hình
              </p>
            </div>
            <div className='w-8 h-8 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center shadow-lg shadow-primary/30'>
              5
            </div>
          </motion.div>
        </div>

        {/* Detailed Itinerary List Component */}
        <div className='lg:col-span-12'>
          <div className='bg-white rounded-[32px] border border-outline-variant/30 shadow-sm overflow-hidden'>
            <div className='p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-outline-variant/20'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 flex-1 min-w-0'>
                <h2 className='text-xl sm:text-2xl font-black tracking-tight text-on-surface whitespace-nowrap'>
                  Lộ trình chi tiết
                </h2>

                {/* Search Bar */}
                <div className='relative group w-full sm:flex-1 sm:max-w-sm h-[50px] sm:h-[46px]'>
                  <Search
                    size={18}
                    className='absolute left-4 top-1/2 -translate-y-1/2 text-outline/40 group-focus-within:text-primary transition-colors'
                  />
                  <input
                    type='text'
                    placeholder='Tìm theo tên hoặc loại...'
                    className='w-full h-full pl-11 pr-4 bg-surface-container border border-outline-variant/10 rounded-2xl text-[13px] sm:text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline/40 placeholder:font-medium'
                  />
                </div>
              </div>

              <div className='flex flex-row flex-nowrap overflow-x-auto no-scrollbar gap-2 -mx-2 px-2 pb-1 lg:p-0 lg:m-0 lg:overflow-visible items-center h-[42px]'>
                {ITINERARY_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveCategory(activeCategory === type.id ? null : type.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-[9px] sm:text-xs font-black whitespace-nowrap transition-all border shrink-0 ${
                      activeCategory === type.id
                        ? 'bg-primary text-white shadow-xl shadow-primary/30 rounded-[8px] border-primary'
                        : 'bg-white border-outline-variant/30 text-outline hover:bg-surface-container rounded-[8px]'
                    }`}
                    style={{ height: '36px' }}
                  >
                    <type.icon size={12} className='sm:size-4' />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className='p-0'>
              <AnimatePresence mode='wait'>
                {locationStatus === 'prompt' || locationStatus === 'denied' ? (
                  <div className='p-6 sm:p-10'>
                    <motion.div
                      key='permission'
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className='max-w-xl mx-auto text-center space-y-6 py-12 border-2 border-dashed border-outline-variant/30 rounded-3xl bg-surface-container/20 px-6'
                    >
                      <div className='w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary'>
                        <Navigation2
                          size={40}
                          className={locationStatus === 'denied' ? 'text-error' : 'text-primary'}
                        />
                      </div>
                      <div>
                        <h3 className='text-lg sm:text-xl font-black text-on-surface'>
                          {locationStatus === 'denied'
                            ? 'Quyền truy cập vị trí bị từ chối'
                            : 'Cho phép truy cập vị trí'}
                        </h3>
                        <p className='text-xs sm:text-sm text-outline font-medium mt-2 leading-relaxed'>
                          {locationStatus === 'denied'
                            ? 'Vui lòng cho phép quyền truy cập vị trí trong cài đặt trình duyệt để tìm các địa điểm lân cận và xây dựng lộ trình chính xác hơn.'
                            : 'Chúng tôi cần quyền truy cập vị trí của bạn để đề xuất các quán cà phê, nhà hàng và địa điểm thú vị gần bạn nhất.'}
                        </p>
                      </div>

                      {locationStatus === 'prompt' ? (
                        <button
                          onClick={requestLocation}
                          className='px-8 py-2.5 sm:py-3 bg-primary text-white rounded-[4px] font-bold text-xs sm:text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2 mx-auto active:scale-95'
                        >
                          Cho phép truy cập
                        </button>
                      ) : (
                        <div className='flex items-center gap-2 justify-center text-error font-bold text-xs bg-error/5 py-2 px-4 rounded-xl'>
                          <Info size={14} />
                          Vui lòng kiểm tra cài đặt trình duyệt
                        </div>
                      )}
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    key='itinerary-content'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='flex flex-col lg:flex-row min-h-[500px]'
                  >
                    {/* Map Area */}
                    <div className='lg:w-[60%] h-[350px] lg:h-auto relative bg-surface-container/50 border-r border-outline-variant/20 overflow-hidden'>
                      <img
                        src='https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop'
                        alt='Map'
                        className='w-full h-full object-cover opacity-60 grayscale-[40%] contrast-125'
                      />
                      <div className='absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent' />

                      {/* Interaction Overlay */}
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='relative'>
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className='absolute -inset-4 bg-primary rounded-full blur-xl'
                          />
                          <div className='w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg relative z-10' />
                        </div>
                      </div>

                      {/* Map Controls */}
                      <div className='absolute bottom-6 left-6 right-6 flex justify-between items-center'>
                        <div className='px-4 py-2 bg-white/90 backdrop-blur rounded-xl text-xs font-black text-on-surface shadow-md'>
                          Hoàn Kiếm, Hà Nội
                        </div>
                        <div className='flex gap-2'>
                          <button className='p-2.5 bg-white rounded-[4px] shadow-md text-outline hover:text-primary transition-all'>
                            <Calculator size={18} />
                          </button>
                          <button className='p-2.5 bg-primary text-white rounded-[4px] shadow-md transition-all active:scale-95'>
                            <Navigation2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Places List Area */}
                    <div className='lg:w-[40%] p-6 sm:p-8 lg:p-10 space-y-6 bg-surface-container/10'>
                      <div className='flex items-center justify-between'>
                        <h4 className='text-xs sm:text-sm font-black text-on-surface uppercase tracking-widest'>
                          Địa điểm gợi ý
                        </h4>
                        <span className='text-[10px] sm:text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full'>
                          Nearby
                        </span>
                      </div>

                      <div className='space-y-4 lg:space-y-5 max-h-[650px] overflow-y-auto no-scrollbar pr-1'>
                        {MOCK_PLACES.map((place) => (
                          <motion.div
                            key={place.id}
                            whileHover={{ x: 4 }}
                            onClick={() => setSelectedPlace(place)}
                            className='flex gap-4 p-4 rounded-3xl border border-outline-variant/20 bg-white shadow-sm transition-all group cursor-pointer'
                          >
                            <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-surface-container shadow-inner'>
                              <img
                                src={place.image}
                                alt={place.name}
                                className='w-full h-full object-cover transition-transform duration-700'
                              />
                            </div>
                            <div className='flex-1 min-w-0 flex flex-col justify-between py-1'>
                              <div>
                                <div className='flex items-center justify-between'>
                                  <h5 className='text-sm sm:text-lg font-black text-on-surface truncate pr-2 tracking-tight'>
                                    {place.name}
                                  </h5>
                                  <div
                                    className={`flex-shrink-0 p-1.5 rounded-lg ${place.color} text-current shadow-sm`}
                                  >
                                    <place.icon size={14} />
                                  </div>
                                </div>
                                <p className='text-[11px] sm:text-xs text-outline font-medium mt-1 truncate'>
                                  {place.address}
                                </p>
                              </div>

                              <div className='flex items-center justify-between mt-2'>
                                <span className='text-[10px] sm:text-[11px] font-black text-primary/80 bg-primary/5 px-2 py-0.5 rounded-md'>
                                  {place.distance} • {place.time}
                                </span>
                                <button className='p-2 text-primary hover:bg-primary/5 rounded-[4px] transition-all active:scale-90'>
                                  <Sparkles size={16} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        <div className='grid grid-cols-2 gap-3 mt-2 mb-4'>
                          <button
                            onClick={() =>
                              setSelectedPlace({
                                name: '',
                                address: '',
                                image:
                                  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1470&auto=format&fit=crop',
                                id: Date.now(),
                                isCustom: true,
                              })
                            }
                            className='py-4 rounded-xl border-2 border-dashed border-outline-variant/30 text-[10px] sm:text-xs font-black uppercase tracking-widest text-outline hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group'
                          >
                            <Plus
                              size={14}
                              className='group-hover:rotate-90 transition-transform'
                            />{' '}
                            Thêm địa điểm
                          </button>
                          <button
                            onClick={() => setShowSuggestionsOverview(true)}
                            className='py-4 rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 text-[10px] sm:text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 group'
                          >
                            <Sparkles
                              size={14}
                              className='group-hover:scale-110 transition-transform'
                            />{' '}
                            Xem thêm gợi ý
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Place Schedule Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <PlaceScheduleModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTimeline && (
          <TimelineModal
            onClose={() => setShowTimeline(false)}
            onSelectPlace={(place, isEdit) => {
              setSelectedPlace({ ...place, isExisting: isEdit })
            }}
          />
        )}
        {showSuggestionsOverview && (
          <SuggestionsOverviewModal
            onClose={() => setShowSuggestionsOverview(false)}
            onSelectPlace={(place) => {
              setSelectedPlace(place)
              showToast(`Đã chọn: ${place.name}`, 'success')
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSplitModal && (
          <SplitCostModal
            totalCost={parseInt(estimatedCost.replace(/\D/g, '') || '0')}
            participants={participants}
            onClose={() => setShowSplitModal(false)}
            onSave={(individualCosts) => {
              const total = Object.values(individualCosts).reduce(
                (sum: number, val: string) => sum + parseInt(val.replace(/\D/g, '') || '0'),
                0,
              )
              setEstimatedCost(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
              setShowSplitModal(false)
            }}
          />
        )}
        {showConfirmModal && (
          <ConfirmModal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onStartNow={() => {
              showToast('Đã kích hoạt chuyến đi của bạn!', 'success')
              onBack()
            }}
            onDoLater={() => {
              showToast('Lịch trình đã được lưu vào bản nháp.', 'info')
              onBack()
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function TimelineModal({
  onClose,
  onSelectPlace,
}: {
  onClose: () => void
  onSelectPlace: (place: any, isEdit?: boolean) => void
}) {
  const [selectedDate, setSelectedDate] = useState('15')

  // Hardcoded trip range for demo - in real app would come from props
  const startDate = new Date(2024, 5, 15) // June 15
  const endDate = new Date(2024, 5, 20) // June 20

  const tripDates = []
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    tripDates.push(new Date(d))
  }

  const timelineData = {
    morning: [
      {
        id: 'm1',
        time: '07:00',
        name: 'Ăn sáng tại Phở Hiếu',
        address: 'Trương Công Định',
        image:
          'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=400&auto=format&fit=crop',
        isExisting: true,
      },
      {
        id: 'm2',
        time: '08:30',
        name: 'Tham quan Hồ Tuyền Lâm',
        address: 'P4, Đà Lạt',
        image:
          'https://images.unsplash.com/photo-1596392916534-f46334969f64?q=80&w=400&auto=format&fit=crop',
        isExisting: true,
      },
      {
        id: 'm3',
        time: '09:45',
        name: 'Thiền viện Trúc Lâm',
        address: 'Phượng Hoàng',
        image:
          'https://images.unsplash.com/photo-1596400030589-9fc62af4f11b?q=80&w=400&auto=format&fit=crop',
        isExisting: true,
      },
    ],
    afternoon: [
      {
        id: 'a1',
        time: '12:30',
        name: 'Ăn trưa & Nghỉ ngơi',
        address: 'Quán nướng ngói',
        image:
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop',
        isExisting: true,
      },
      {
        id: 'a2',
        time: '15:00',
        name: 'Vườn hoa Cẩm Tú Cầu',
        address: 'Trại Mát',
        image:
          'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400&auto=format&fit=crop',
        isExisting: true,
      },
    ],
    evening: [
      {
        id: 'e1',
        time: '19:00',
        name: 'Phá đảo Chợ Đêm',
        address: 'Trung tâm Đà Lạt',
        image:
          'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=400&auto=format&fit=crop',
        isExisting: true,
      },
      {
        id: 'e2',
        time: '22:00',
        name: 'Về khách sạn & Nghỉ ngơi',
        address: 'Terracotta Resort',
        icon: Hotel,
        isExisting: true,
      },
    ],
  }

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-on-background/40 backdrop-blur-md'
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className='relative bg-white w-full max-w-6xl rounded-[24px] sm:rounded-[32px] shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col max-h-[95vh] sm:max-h-[85vh]'
      >
        {/* Header */}
        <div className='p-5 sm:p-8 flex flex-row items-center justify-between border-b border-outline-variant/10 bg-surface-container-low/30 gap-6'>
          <div className='flex items-center gap-3 sm:gap-4 flex-1'>
            <div className='p-2 sm:p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary-20 shrink-0'>
              <Navigation2 size={24} className='sm:size-[28px]' />
            </div>
            <div className='min-w-0'>
              <h2 className='text-base sm:text-2xl font-black text-on-surface tracking-tighter truncate md:whitespace-normal'>
                Phân loại lộ trình
              </h2>
              <div className='flex items-center gap-2 mt-1'>
                <MapPin size={12} className='text-primary' />
                <span className='text-[10px] sm:text-sm font-bold text-outline uppercase tracking-wider'>
                  Đà Lạt
                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-row items-center sm:items-end gap-3 sm:gap-4 shrink-0 group relative cursor-pointer'>
            <div className='text-right hidden sm:block'>
              <p className='text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-0.5'>
                Ngày hiển thị
              </p>
              <span className='text-[10px] sm:text-xs font-black text-on-surface uppercase tracking-widest block'>
                Tháng 06, 2024
              </span>
            </div>

            <div className='relative'>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20'
              >
                {tripDates.map((date) => (
                  <option key={date.getDate()} value={date.getDate().toString()}>
                    Ngày {date.getDate()} Th0{date.getMonth() + 1}, {date.getFullYear()}
                  </option>
                ))}
              </select>

              <div className='flex items-center gap-2 sm:gap-4 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-2xl border border-outline-variant/10 shadow-sm group-hover:border-primary group-hover:shadow-lg transition-all'>
                <span className='text-3xl sm:text-5xl font-black text-primary tracking-tighter leading-none'>
                  {selectedDate}
                </span>
                <div className='flex flex-col'>
                  <span className='text-[10px] sm:hidden font-black text-on-surface uppercase tracking-widest'>
                    Th06
                  </span>
                  <ChevronDown
                    size={18}
                    className='text-outline/30 group-hover:text-primary transition-colors mt-0.5'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body Column Grid */}
        <div className='flex-1 overflow-y-auto no-scrollbar p-5 sm:p-8 bg-background/30'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 h-full'>
            {/* Morning Section */}
            <div className='space-y-6'>
              <SectionHeader
                icon={<Coffee size={18} />}
                title='Buổi Sáng'
                timeRange='(0h - 10h)'
                color='bg-orange-100/50 text-orange-600'
              />
              <div className='relative pl-6 sm:pl-8 space-y-8 sm:space-y-10'>
                <div className='absolute left-[7px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-outline-variant/20' />
                {timelineData.morning.map((item) => (
                  <TimelineCard
                    key={item.id}
                    item={item}
                    onSelect={(p: any) => onSelectPlace(p, true)}
                  />
                ))}
              </div>
            </div>

            {/* Afternoon Section */}
            <div className='space-y-6'>
              <SectionHeader
                icon={<Utensils size={18} />}
                title='Trưa - Chiều'
                timeRange='(10h - 18h)'
                color='bg-primary/10 text-primary'
              />
              <div className='relative pl-6 sm:pl-8 space-y-8 sm:space-y-10'>
                <div className='absolute left-[7px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-outline-variant/20' />
                {timelineData.afternoon.map((item) => (
                  <TimelineCard
                    key={item.id}
                    item={item}
                    onSelect={(p: any) => onSelectPlace(p, true)}
                  />
                ))}
              </div>
            </div>

            {/* Evening Section */}
            <div className='space-y-6'>
              <SectionHeader
                icon={<Hotel size={18} />}
                title='Buổi Tối'
                timeRange='(18h - 0h)'
                color='bg-indigo-100 text-indigo-600'
              />
              <div className='relative pl-6 sm:pl-8 space-y-8 sm:space-y-10'>
                <div className='absolute left-[7px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-outline-variant/20' />
                {timelineData.evening.map((item) => (
                  <TimelineCard
                    key={item.id}
                    item={item}
                    onSelect={(p: any) => onSelectPlace(p, true)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='p-5 sm:p-8 bg-surface-container-low/30 border-t border-outline-variant/10 flex justify-end'>
          <button
            onClick={onClose}
            className='w-full sm:w-auto px-12 py-3.5 bg-primary text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-[4px] shadow-xl shadow-primary/20 hover:opacity-90 active:scale-[0.95] transition-all'
          >
            Đóng lịch trình
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function SuggestionsOverviewModal({
  onClose,
  onSelectPlace,
}: {
  onClose: () => void
  onSelectPlace: (place: any) => void
}) {
  const [selectedTime, setSelectedTime] = useState('morning')

  const suggestionTimeline = {
    morning: [
      {
        id: 101,
        name: 'Phở Hiền',
        status: 'Hoạt động mạnh: 06:00 - 10:00',
        type: 'Ẩm thực',
        address: '64 Lương Văn Can, Hoàn Kiếm, Hà Nội',
        image:
          'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 102,
        name: 'Hồ Tuyền Lâm',
        status: 'Cảnh đẹp nhất: 07:00 - 09:00',
        type: 'Tham quan',
        address: 'Phường 4, Đà Lạt',
        image:
          'https://images.unsplash.com/photo-1596392916534-f46334969f64?q=80&w=400&auto=format&fit=crop',
      },
    ],
    afternoon: [
      {
        id: 103,
        name: 'Quán nướng Chu',
        status: 'Hoạt động mạnh: 11:30 - 14:00',
        type: 'Ẩm thực',
        address: '03 Phạm Ngũ Lão, Đà Lạt',
        image:
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 104,
        name: 'Vườn hoa Cẩm Tú Cầu',
        status: 'Ánh sáng tốt: 15:00 - 17:00',
        type: 'Chụp ảnh',
        address: 'Trại Mát, Đà Lạt',
        image:
          'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400&auto=format&fit=crop',
      },
    ],
    evening: [
      {
        id: 105,
        name: 'Chợ đêm Đà Lạt',
        status: 'Nhộn nhịp nhất: 19:00 - 22:00',
        type: 'Mua sắm',
        address: 'Trung tâm Đà Lạt',
        image:
          'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 106,
        name: 'Lẩu gà lá é',
        status: 'Hoạt động mạnh: 18:30 - 21:00',
        type: 'Ẩm thực',
        address: 'Chu Văn An, Đà Lạt',
        image:
          'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=400&auto=format&fit=crop',
      },
    ],
  }

  return (
    <div className='fixed inset-0 z-[120] flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-on-background/60 backdrop-blur-md'
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className='relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col max-h-[85vh]'
      >
        <div className='p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-primary rounded-xl text-white'>
              <Info size={20} />
            </div>
            <div>
              <h2 className='text-xl font-black text-on-surface'>Thời gian hoạt động gợi ý</h2>
              <p className='text-[10px] uppercase tracking-widest text-outline font-bold mt-1'>
                Dựa trên nhịp sống địa phương
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-surface-container rounded-[4px] transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        <div className='flex border-b border-outline-variant/10 overflow-x-auto no-scrollbar'>
          {[
            { id: 'morning', label: 'Sáng', icon: Coffee },
            { id: 'afternoon', label: 'Trưa-Chiều', icon: Utensils },
            { id: 'evening', label: 'Tối', icon: Hotel },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTime(tab.id)}
              className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 text-[9px] sm:text-xs font-black uppercase tracking-widest border-b-2 whitespace-nowrap min-w-fit ${
                selectedTime === tab.id
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-outline hover:bg-surface-container'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className='flex-1 overflow-y-auto p-6 space-y-4'>
          {(suggestionTimeline as any)[selectedTime].map((item: any) => (
            <motion.div
              key={item.id}
              whileHover={{ x: 4 }}
              onClick={() => onSelectPlace(item)}
              className='p-4 rounded-2xl bg-surface-container/30 border border-outline-variant/10 flex items-center justify-between group hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md'
            >
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-xl bg-white overflow-hidden flex items-center justify-center text-primary border border-outline-variant/10 shadow-sm shrink-0'>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                  ) : (
                    <MapPin size={24} />
                  )}
                </div>
                <div className='min-w-0'>
                  <h4 className='font-black text-on-surface text-sm truncate group-hover:text-primary transition-colors'>
                    {item.name}
                  </h4>
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full'>
                      {item.type}
                    </span>
                    <span className='text-[10px] text-outline font-medium truncate'>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
              <Sparkles
                size={16}
                className='text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0'
              />
            </motion.div>
          ))}

          <div className='p-6 rounded-3xl bg-secondary/5 border border-secondary/10 flex items-center gap-4 mt-4'>
            <div className='p-3 bg-secondary/10 rounded-2xl text-secondary'>
              <Info size={24} />
            </div>
            <p className='text-xs font-medium text-on-surface/70 leading-relaxed italic'>
              "Thời gian gợi ý được tối ưu theo kinh nghiệm du lịch thực tế tại địa phương để bạn có
              trải nghiệm tốt nhất."
            </p>
          </div>
        </div>

        <div className='p-6 bg-surface-container-low/30 border-t border-outline-variant/10 flex justify-end'>
          <button
            onClick={onClose}
            className='px-10 py-3 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-[4px] shadow-xl shadow-primary/20 hover:opacity-90 transition-all'
          >
            Đã hiểu
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function SectionHeader({
  icon,
  title,
  timeRange,
  color,
}: {
  icon: any
  title: string
  timeRange: string
  color: string
}) {
  return (
    <div className='flex items-center gap-2 pb-4 border-b border-outline-variant/20'>
      <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center shadow-sm`}>
        {icon}
      </div>
      <h3 className='text-xs sm:text-sm font-black text-on-surface uppercase tracking-widest'>
        {title}{' '}
        <span className='text-[10px] text-outline font-medium ml-1 lowercase'>{timeRange}</span>
      </h3>
    </div>
  )
}

function TimelineCard({ item, onSelect }: any) {
  return (
    <div className='relative'>
      {/* Node Bullet */}
      <div className='absolute -left-[24px] top-[14px] w-4 h-4 rounded-full border-[3px] border-white bg-primary shadow-sm z-10' />

      <motion.div
        whileHover={{ x: 2 }}
        onClick={() => onSelect(item)}
        className='bg-white p-3 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-lg transition-all group cursor-pointer flex gap-3 items-center'
      >
        <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 shadow-inner bg-surface-container'>
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className='w-full h-full object-cover transition-transform duration-500'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-outline/40'>
              {item.icon ? <item.icon size={20} /> : <MapPin size={20} />}
            </div>
          )}
        </div>
        <div className='flex-1 min-w-0'>
          <span className='text-[9px] sm:text-[10px] font-black text-primary/80 block mb-0.5'>
            {item.time}
          </span>
          <h4 className='font-black text-xs sm:text-sm text-on-surface truncate group-hover:text-primary transition-colors'>
            {item.name}
          </h4>
          <p className='flex items-center gap-1 text-[9px] sm:text-[10px] text-outline font-medium mt-1 truncate'>
            <MapPin size={10} className='shrink-0' />
            {item.address}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function PlaceScheduleModal({ place, onClose }: { place: any; onClose: () => void }) {
  const [cost, setCost] = useState('')
  const [name, setName] = useState(place.name || '')
  const [address, setAddress] = useState(place.address || '')
  const [image, setImage] = useState(place.image || '')
  const [visitDate, setVisitDate] = useState('15/06/2024')
  const isEdit = place.isExisting
  const isCustom = place.isCustom

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '')
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '')
    if (rawVal.length > 9) return
    const formatted = formatCurrency(rawVal)
    setCost(formatted)
  }

  return (
    <div className='fixed inset-0 z-[150] flex items-center justify-center p-4'>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-on-background/60 backdrop-blur-md'
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className='relative bg-white w-full max-w-lg rounded-[24px] sm:rounded-[40px] shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col max-h-[90vh]'
      >
        {/* Header */}
        <div className='p-4 sm:p-6 border-b border-surface-container-highest flex justify-between items-center bg-surface-container-low/50'>
          <h2 className='text-sm sm:text-xl font-black text-on-surface flex items-center gap-2'>
            <span className='p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary'>
              <Sparkles size={16} />
            </span>
            {isEdit ? 'Sửa thông tin chi tiết' : 'Thông tin chi tiết'}
          </h2>
          <div className='flex items-center gap-2'>
            <button
              onClick={onClose}
              className='p-1.5 sm:p-2 hover:bg-surface-container rounded-[4px] transition-colors text-outline'
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className='p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto no-scrollbar'>
          {/* Place Info Card */}
          {isCustom ? (
            <div className='space-y-4'>
              <div className='relative h-40 sm:h-48 rounded-[24px] sm:rounded-[32px] overflow-hidden border border-outline-variant/10 bg-surface-container group'>
                <img src={image} alt='Preview' className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                  <button
                    onClick={() => {
                      const url = prompt('Nhập URL ảnh bìa:', image)
                      if (url) setImage(url)
                    }}
                    className='px-4 py-2 bg-white rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2'
                  >
                    <Camera size={14} /> Thay đổi ảnh
                  </button>
                </div>
              </div>
              <div className='space-y-4'>
                <div className='space-y-1.5'>
                  <label className='text-[9px] font-black uppercase tracking-widest text-outline'>
                    Tên địa điểm
                  </label>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Ví dụ: Landmark 81'
                    className='w-full px-4 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-[13px] font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
                  />
                </div>
                <div className='space-y-1.5'>
                  <label className='text-[9px] font-black uppercase tracking-widest text-outline'>
                    Địa chỉ
                  </label>
                  <div className='relative'>
                    <MapPin
                      size={16}
                      className='absolute left-4 top-1/2 -translate-y-1/2 text-outline/40'
                    />
                    <input
                      type='text'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder='Nhập địa chỉ...'
                      className='w-full pl-12 pr-4 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-[13px] font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-background border border-primary/10'>
              <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 shadow-md'>
                <img src={place.image} alt={place.name} className='w-full h-full object-cover' />
              </div>
              <div className='flex-1 min-w-0'>
                <h4 className='font-black text-base sm:text-xl text-on-surface truncate tracking-tight'>
                  {place.name}
                </h4>
                <div className='flex items-center gap-1 text-orange-400 mb-0.5 sm:mb-1'>
                  {[1, 2, 3, 4].map((i) => (
                    <Sparkles key={i} size={12} fill='currentColor' />
                  ))}
                  <span className='text-[11px] sm:text-[13px] text-outline font-bold ml-1 tracking-tighter uppercase'>
                    (4.5 • 128 đánh giá)
                  </span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
                  target='_blank'
                  rel='noreferrer'
                  className='text-[11px] sm:text-sm text-outline font-medium flex items-start gap-1 line-clamp-2 hover:text-primary transition-colors group/address cursor-pointer'
                >
                  <MapPin
                    size={10}
                    className='shrink-0 mt-0.5 group-hover/address:scale-125 transition-transform'
                  />
                  <span className='underline decoration-dotted underline-offset-2 decoration-outline/30 group-hover/address:decoration-primary/50'>
                    {place.address}
                  </span>
                </a>
              </div>
            </div>
          )}

          {/* Form */}
          <div className='space-y-4 sm:space-y-5'>
            <div className='space-y-1.5 sm:space-y-2'>
              <label className='text-[9px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                Chọn ngày ghé thăm
              </label>
              <div className='relative'>
                <Calendar
                  size={16}
                  className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-outline/40'
                />
                {isCustom ? (
                  <input
                    type='text'
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    placeholder='dd/MM/yyyy'
                    className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl sm:rounded-2xl text-[13px] font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
                  />
                ) : (
                  <select className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl sm:rounded-2xl text-[13px] font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none'>
                    <option value='2024-06-15'>Ngày 15 Th06, 2024</option>
                    <option value='2024-06-16'>Ngày 16 Th06, 2024</option>
                    <option value='2024-06-17'>Ngày 17 Th06, 2024</option>
                    <option value='2024-06-18'>Ngày 18 Th06, 2024</option>
                  </select>
                )}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3 sm:gap-4'>
              <div className='space-y-1.5 sm:space-y-2'>
                <label className='text-[9px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                  Bắt đầu
                </label>
                <input
                  type='time'
                  defaultValue={place.time?.split(' - ')[0] || '08:00'}
                  className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
                />
              </div>
              <div className='space-y-1.5 sm:space-y-2'>
                <label className='text-[9px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                  Kết thúc
                </label>
                <input
                  type='time'
                  defaultValue={place.time?.split(' - ')[1] || '10:00'}
                  className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
                />
              </div>
            </div>

            <div className='space-y-1.5 sm:space-y-2'>
              <label className='text-[9px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                Dự tính chi phí (VNĐ)
              </label>
              <div className='relative'>
                <Wallet
                  size={16}
                  className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-outline/40'
                />
                <input
                  type='text'
                  value={cost}
                  onChange={handleCostChange}
                  placeholder='Ví dụ: 150,000'
                  className='w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
                />
              </div>
            </div>

            <div className='space-y-1.5 sm:space-y-2'>
              <label className='text-[9px] sm:text-xs font-black uppercase tracking-widest text-on-surface/60'>
                Ghi chú
              </label>
              <textarea
                placeholder='Nhập ghi chú của bạn...'
                className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all h-20 sm:h-24 resize-none'
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='p-4 sm:p-6 bg-surface-container-low/50 flex gap-3 sm:gap-4 border-t border-surface-container-highest'>
          {isEdit ? (
            <button className='flex-1 py-3 sm:py-3.5 bg-error text-white font-black text-[9px] sm:text-[10px] uppercase tracking-widest rounded-[4px] shadow-lg shadow-error/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2'>
              Xóa
            </button>
          ) : (
            <button
              onClick={onClose}
              className='flex-1 py-3 sm:py-3.5 border-2 border-outline-variant/30 text-on-surface uppercase text-[9px] sm:text-[10px] font-black tracking-widest rounded-[4px] hover:bg-surface-variant/20 transition-colors'
            >
              Hủy bỏ
            </button>
          )}
          <button className='flex-[2] py-3 sm:py-3.5 bg-primary text-white font-black text-[9px] sm:text-[10px] uppercase tracking-widest rounded-[4px] shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2'>
            <Sparkles size={14} className='sm:size-4' /> {isEdit ? 'Sửa' : 'Thêm'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
