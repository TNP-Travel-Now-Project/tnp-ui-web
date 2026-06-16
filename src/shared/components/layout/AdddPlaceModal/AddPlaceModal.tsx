import { AnimatePresence, motion } from 'framer-motion'
import {
  Calculator,
  Calendar,
  Camera,
  Coffee,
  Hotel,
  Info,
  icons,
  Landmark,
  MapPin,
  Navigation2,
  Plus,
  Search,
  Sparkles,
  UserPlus,
  Utensils,
  Wallet,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Button, Label } from '@/shared/components'
import { Toaster } from '@/shared/components/feedback/Toast'
import { useToast } from '@/shared/hooks/useToast'

const ITINERARY_TYPES = [
  { id: 'cafe', Label: 'Cà phê', icon: Coffee, color: 'bg-emerald-100 text-emerald-700' },
  { id: 'restaurant', Label: 'Nhà hàng', icon: Utensils, color: 'bg-orange-100 text-orange-700' },
  { id: 'hotel', Label: 'Khách sạn', icon: Hotel, color: 'bg-blue-100 text-blue-700' },
  {
    id: 'landmark',
    Label: 'Điểm tham quan',
    icon: Landmark,
    color: 'bg-purple-100 text-purple-700',
  },
  { id: 'atm', Label: 'ATM', icon: Calculator, color: 'bg-gray-100 text-gray-700' },
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

export default function AddPlaceModal({ onClose }: { onClose: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [locationStatus, setLocationStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt')
  const [selectedPlace, setSelectedPlace] = useState<any>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { showToast } = useToast()

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
    <div className='fixed inset-0 z-100 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-on-surface/40 backdrop-blur-sm'
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className='relative w-full max-w-6xl h-[75vh] bg-surface rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-outline-variant/30'
      >
        <div className='bg-white overflow-hidden flex flex-col h-full'>
          {/* Header */}
          <div className='shrink-0 p-4 sm:p-6 lg:px-8 py-4 sm:py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-outline-variant/20 relative'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-4 flex-1 min-w-0 pr-8 lg:pr-0'>
              <h2 className='text-xl font-black tracking-tight text-on-surface whitespace-nowrap'>
                Lộ trình chi tiết
              </h2>

              {/* Search Bar */}
              <div className='relative group w-full sm:flex-1 sm:max-w-sm h-10p'>
                <Search
                  size={16}
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-outline/40 group-focus-within:text-primary transition-colors'
                />
                <input
                  type='text'
                  placeholder='Tìm theo tên hoặc loại...'
                  className='w-full h-full pl-10 pr-4 bg-surface-container border border-outline-variant/10 rounded-2xl text-[13px] font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline/40 placeholder:font-medium'
                />
              </div>
            </div>

            <div className='flex flex-row overflow-x-auto gap-2 pr-8 lg:pr-10 items-center'>
              {ITINERARY_TYPES.map((type) => (
                <Button
                  key={type.id}
                  onClick={() => setActiveCategory(activeCategory === type.id ? null : type.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black whitespace-nowrap transition-all border shrink-0 ${
                    activeCategory === type.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/30 rounded-xl border-primary'
                      : 'bg-white border-outline-variant/30 text-outline hover:bg-surface-container rounded-xl'
                  }`}
                >
                  <type.icon size={12} />
                  {type.Label}
                </Button>
              ))}
            </div>

            <Button
              onClick={onClose}
              className='absolute top-4 sm:top-6 right-4 sm:right-6 p-2 bg-surface-container hover:bg-outline-variant/20 rounded-full transition-all flex-shrink-0 z-10 text-on-surface'
            >
              <X size={20} />
            </Button>
          </div>

          <div className='flex-1 overflow-hidden relative'>
            <AnimatePresence mode='wait'>
              {locationStatus === 'prompt' || locationStatus === 'denied' ? (
                <div className='absolute inset-0 flex items-center justify-center p-6 bg-surface-container-low/50'>
                  <motion.div
                    key='permission'
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className='max-w-xl w-full mx-auto text-center space-y-6 py-12 border-2 border-dashed border-outline-variant/30 rounded-3xl bg-white px-6 shadow-sm'
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
                      <p className='text-sm text-outline font-medium mt-2 leading-relaxed max-w-md mx-auto'>
                        {locationStatus === 'denied'
                          ? 'Vui lòng cho phép quyền truy cập vị trí trong cài đặt trình duyệt để tìm các địa điểm lân cận và xây dựng lộ trình chính xác hơn.'
                          : 'Chúng tôi cần quyền truy cập vị trí của bạn để đề xuất các quán cà phê, nhà hàng và địa điểm thú vị lân cận.'}
                      </p>
                    </div>

                    {locationStatus === 'prompt' ? (
                      <Button
                        onClick={requestLocation}
                        className='px-8 py-3 bg-[#c29668] text-white rounded-xl font-bold text-sm shadow-xl shadow-[#c29668]/20 hover:bg-[#a8825a] transition-all flex items-center gap-2 mx-auto active:scale-95'
                      >
                        Cho phép truy cập
                      </Button>
                    ) : (
                      <div className='flex items-center gap-2 justify-center text-error font-bold text-xs bg-error/5 py-2 px-4 rounded-xl inline-flex w-auto mx-auto'>
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
                  className='flex flex-col lg:flex-row flex-1 min-h-0 h-full'
                >
                  {/* Map Area */}
                  <div className='lg:w-[60%] h-50 sm:h-75 lg:h-full relative bg-surface-container/50 border-b lg:border-b-0 lg:border-r border-outline-variant/20 overflow-hidden shrink-0'>
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
                        <Button className='p-2.5 bg-white rounded-xl shadow-md text-outline hover:text-primary transition-all'>
                          <Calculator size={18} />
                        </Button>
                        <Button className='p-2.5 bg-primary text-white rounded-xl shadow-md transition-all active:scale-95'>
                          <Navigation2 size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Places List Area */}
                  <div className='lg:w-[40%] p-6 lg:p-8 flex flex-col bg-surface-container/10 flex-1 min-h-0 overflow-hidden'>
                    <div className='flex items-center justify-between mb-6 shrink-0'>
                      <h4 className='text-sm font-black text-on-surface uppercase tracking-widest'>
                        Địa điểm gợi ý
                      </h4>
                      <span className='text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full'>
                        Nearby
                      </span>
                    </div>

                    <div className='flex-1 overflow-y-auto overflow-x-hidden space-y-4 pr-1 touch-pan-y'>
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
                                <h5 className='text-sm sm:text-[15px] font-black text-on-surface truncate pr-2 tracking-tight'>
                                  {place.name}
                                </h5>
                                <div
                                  className={`flex-shrink-0 p-1.5 rounded-lg ${place.color} text-current shadow-sm`}
                                >
                                  <place.icon size={14} />
                                </div>
                              </div>
                              <p className='text-[11px] text-outline font-medium mt-1 truncate'>
                                {place.address}
                              </p>
                            </div>

                            <div className='flex items-center justify-between mt-2'>
                              <span className='text-[10px] font-black text-primary/80 bg-primary/5 px-2 py-1 rounded-md'>
                                {place.distance} • {place.time}
                              </span>
                              <Button className='p-1 px-2 text-primary hover:bg-primary/5 rounded-md transition-all active:scale-90 flex items-center gap-1 bg-primary/5 ml-2'>
                                <Plus size={14} />{' '}
                                <span className='text-[10px] font-bold'>Thêm</span>
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      <div className='grid grid-cols-2 gap-3 mt-2 mb-4'>
                        <Button
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
                          <Plus size={14} className='group-hover:rotate-90 transition-transform' />{' '}
                          Thêm địa điểm
                        </Button>
                        <Button
                          onClick={() => setShowSuggestions(true)}
                          className='py-4 rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 text-[10px] sm:text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 group'
                        >
                          <Sparkles
                            size={14}
                            className='group-hover:scale-110 transition-transform'
                          />{' '}
                          Xem thêm gợi ý
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Suggestion Modal Helper */}
      <AnimatePresence>
        {showSuggestions && (
          <SuggestionsOverviewModal
            onClose={() => setShowSuggestions(false)}
            onSelectPlace={(place) => {
              setSelectedPlace(place)
              setShowSuggestions(false)
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPlace && (
          <PlaceScheduleModal
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
            onAdd={() => {
              showToast('success', 'Đã thêm địa điểm vào phân loại lộ trình')
              setSelectedPlace(null)
              onClose()
            }}
          />
        )}
      </AnimatePresence>
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
    <div className='fixed inset-0 z-[200] flex items-center justify-center p-4'>
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
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className='text-xl font-black text-on-surface'>Hoạt động gợi ý</h2>
              <p className='text-[10px] uppercase tracking-widest text-outline font-bold mt-1'>
                Gợi ý theo khung thời gian
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            className='p-2 hover:bg-surface-container rounded-full transition-colors'
          >
            <X size={20} />
          </Button>
        </div>

        <div className='flex border-b border-outline-variant/10 overflow-x-auto no-scrollbar'>
          {[
            { id: 'morning', Label: 'Sáng', icon: Coffee },
            { id: 'afternoon', Label: 'Trưa-Chiều', icon: Utensils },
            { id: 'evening', Label: 'Tối', icon: Hotel },
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setSelectedTime(tab.id)}
              className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 text-[9px] sm:text-xs font-black uppercase tracking-widest border-b-2 whitespace-nowrap min-w-fit transition-all ${
                selectedTime === tab.id
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-outline hover:bg-surface-container'
              }`}
            >
              <tab.icon size={14} />
              {tab.Label}
            </Button>
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
              <Plus
                size={16}
                className='text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0'
              />
            </motion.div>
          ))}
        </div>

        <div className='p-6 bg-surface-container-low/30 border-t border-outline-variant/10 flex justify-end'>
          <Button
            onClick={onClose}
            className='px-10 py-3 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-full shadow-xl shadow-primary/20 hover:opacity-90 transition-all underline-none border-none'
          >
            Đã hiểu
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

function SplitCostModal({
  totalCost,
  participants,
  onClose,
  onSave,
}: {
  totalCost: number
  participants: any[]
  onClose: () => void
  onSave: (costs: any) => void
}) {
  const [individualCosts, setIndividualCosts] = useState<{ [key: number]: string }>(() => {
    const splitAmount = Math.floor(totalCost / participants.length)
    return participants.reduce(
      (acc, p) => ({
        ...acc,
        [p.id]: splitAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      }),
      {},
    )
  })

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '')
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleIndividualChange = (id: number, value: string) => {
    setIndividualCosts((prev) => ({ ...prev, [id]: formatCurrency(value) }))
  }

  const currentTotal = (Object.values(individualCosts) as string[]).reduce(
    (sum: number, val: string) => sum + parseInt(val.replace(/\D/g, '') || '0'),
    0,
  )
  const diff = totalCost - currentTotal

  return (
    <div className='fixed inset-0 z-[200] flex items-center justify-center p-4'>
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
        className='relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col'
      >
        <div className='p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-primary rounded-xl text-white'>
              <Calculator size={20} />
            </div>
            <div>
              <h2 className='text-xl font-black text-on-surface'>Chia chi phí</h2>
              <p className='text-[10px] uppercase tracking-widest text-outline font-bold mt-1'>
                Tổng cộng: {totalCost.toLocaleString()} VNĐ
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            className='p-2 hover:bg-surface-container rounded-full transition-colors'
          >
            <X size={20} />
          </Button>
        </div>

        <div className='p-6 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar'>
          {participants.map((p) => (
            <div
              key={p.id}
              className='flex items-center gap-4 p-4 rounded-2xl bg-surface-container/20 border border-outline-variant/10'
            >
              <img
                src={p.avatar}
                alt={p.name}
                className='w-10 h-10 rounded-full border-2 border-white shadow-sm'
              />
              <div className='flex-1'>
                <p className='text-xs font-black text-on-surface'>{p.name}</p>
              </div>
              <div className='relative w-32'>
                <input
                  type='text'
                  value={individualCosts[p.id]}
                  onChange={(e) => handleIndividualChange(p.id, e.target.value)}
                  className='w-full pl-3 pr-8 py-2 bg-white border border-outline-variant/30 rounded-xl text-xs font-bold outline-none text-right focus:border-primary transition-all'
                />
                <span className='absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-outline'>
                  đ
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className='p-6 bg-surface-container-low/30 border-t border-outline-variant/10'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-[10px] font-black uppercase tracking-widest text-outline'>
              Chênh lệch:
            </span>
            <span
              className={`text-xs font-bold ${diff === 0 ? 'text-emerald-500' : 'text-rose-500'}`}
            >
              {diff === 0 ? '✓ Đã khớp' : `${diff > 0 ? '+' : ''}${diff.toLocaleString()} VNĐ`}
            </span>
          </div>
          <Button
            onClick={() => onSave(individualCosts)}
            className='w-full py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:opacity-90 transition-all'
          >
            Lưu thay đổi
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

function PlaceScheduleModal({
  place,
  onClose,
  onAdd,
}: {
  place: any
  onClose: () => void
  onAdd: () => void
}) {
  const [cost, setCost] = useState('')
  const [showSplitModal, setShowSplitModal] = useState(false)
  const [name, setName] = useState(place.name || '')
  const [address, setAddress] = useState(place.address || '')
  const [image, setImage] = useState(place.image || '')
  const [visitDate, setVisitDate] = useState('15/06/2024')
  const [payer, setPayer] = useState('')
  const [type, setType] = useState('nhóm') // nhóm or riêng
  const isEdit = place.isExisting
  const isCustom = place.isCustom

  const participants = [
    { id: 1, name: 'Tuan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { id: 2, name: 'An', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  ]

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-on-background/60 backdrop-blur-md'
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className='relative bg-white w-full max-sm:max-w-sm md:max-w-4xl rounded-[32px] sm:rounded-[40px] shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col max-h-[90vh]'
      >
        <div className='p-6 border-b border-surface-container-highest flex justify-between items-center bg-surface-container-low/50 shrink-0'>
          <h2 className='text-xl font-black text-on-surface flex items-center gap-2'>
            <span className='p-2 bg-primary/10 rounded-lg text-primary'>
              <Sparkles size={20} />
            </span>
            {isEdit ? 'Sửa thông tin chi tiết' : 'Thông tin chi tiết'}
          </h2>
          <Button
            onClick={onClose}
            className='p-2 hover:bg-surface-container rounded-full transition-colors text-outline'
          >
            <X size={20} />
          </Button>
        </div>

        <div className='flex-1 overflow-y-auto no-scrollbar p-6 sm:p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-6'>
              {isCustom ? (
                <div className='space-y-4'>
                  <div className='relative h-48 rounded-[32px] overflow-hidden border border-outline-variant/10 bg-surface-container group'>
                    <img src={image} alt='Preview' className='w-full h-full object-cover' />
                    <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                      <Button
                        onClick={() => {
                          const url = prompt('Nhập URL ảnh bìa:', image)
                          if (url) setImage(url)
                        }}
                        className='px-4 py-2 bg-white rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2'
                      >
                        <Camera size={14} /> Thay đổi ảnh
                      </Button>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div className='space-y-1.5'>
                      <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                        Tên địa điểm
                      </Label>
                      <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Ví dụ: Landmark 81'
                        className='w-full px-4 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-[13px] font-bold outline-none'
                      />
                    </div>
                    <div className='space-y-1.5'>
                      <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                        Địa chỉ
                      </Label>
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
                          className='w-full pl-12 pr-4 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-[13px] font-bold outline-none'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='space-y-6'>
                  <div className='p-4 rounded-[32px] bg-background border border-primary/10 space-y-4'>
                    <div className='h-40 rounded-2xl overflow-hidden shadow-md'>
                      <img
                        src={place.image}
                        alt={place.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div>
                      <h4 className='font-black text-xl text-on-surface tracking-tight'>
                        {place.name}
                      </h4>
                      <div className='flex items-center gap-1 text-orange-400 my-2'>
                        {[1, 2, 3, 4].map((i) => (
                          <Sparkles key={i} size={12} fill='currentColor' />
                        ))}
                        <span className='text-[11px] text-outline font-bold ml-1 tracking-tighter uppercase'>
                          (4.5 • 128 đánh giá)
                        </span>
                      </div>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
                        target='_blank'
                        rel='noreferrer'
                        className='text-sm text-outline font-medium flex items-start gap-2 hover:text-primary transition-colors group/address cursor-pointer'
                      >
                        <MapPin size={14} className='shrink-0 mt-0.5' />
                        <span className='underline decoration-dotted underline-offset-4 decoration-outline/30'>
                          {place.address}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                    Ngày ghé thăm
                  </Label>
                  <div className='relative'>
                    <Calendar
                      size={16}
                      className='absolute left-4 top-1/2 -translate-y-1/2 text-outline/40'
                    />
                    <input
                      type='text'
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      placeholder='dd/MM/yyyy'
                      className='w-full pl-12 pr-4 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-[13px] font-bold outline-none'
                    />
                  </div>
                </div>
                <div className='space-y-1.5'>
                  <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                    Chi phí dự tính
                  </Label>
                  <div className='relative group'>
                    <Wallet
                      size={16}
                      className='absolute left-4 top-1/2 -translate-y-1/2 text-outline/40'
                    />
                    <input
                      type='text'
                      value={cost}
                      onChange={handleCostChange}
                      placeholder='0'
                      className='w-full pl-12 pr-12 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all'
                    />
                    <Button
                      onClick={() => {
                        if (!cost || cost === '0') return
                        setShowSplitModal(true)
                      }}
                      className='absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all shadow-sm'
                      title='Chia chi phí'
                    >
                      <Calculator size={14} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                    Bắt đầu
                  </Label>
                  <input
                    type='time'
                    defaultValue={place.time?.split(' - ')[0] || '08:00'}
                    className='w-full px-4 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-sm font-bold outline-none'
                  />
                </div>
                <div className='space-y-1.5'>
                  <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                    Kết thúc
                  </Label>
                  <input
                    type='time'
                    defaultValue={place.time?.split(' - ')[1] || '10:00'}
                    className='w-full px-4 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-sm font-bold outline-none'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                  Phân loại
                </Label>
                <div className='flex gap-2 p-1 bg-surface-container rounded-xl'>
                  <Button
                    onClick={() => setType('riêng')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${type === 'riêng' ? 'bg-white shadow-sm text-primary' : 'text-outline'}`}
                  >
                    Riêng
                  </Button>
                  <Button
                    onClick={() => setType('nhóm')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${type === 'nhóm' ? 'bg-white shadow-sm text-primary' : 'text-outline'}`}
                  >
                    Nhóm
                  </Button>
                </div>
              </div>

              <div className='space-y-1.5'>
                <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                  Người thanh toán
                </Label>
                <select
                  value={payer}
                  onChange={(e) => setPayer(e.target.value)}
                  className='w-full px-4 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-sm font-bold outline-none appearance-none'
                >
                  <option value=''>Chọn người chi</option>
                  {participants.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='pt-4 border-t border-outline-variant/10'>
                <Label className='text-[10px] font-black uppercase tracking-widest text-outline block mb-3'>
                  Thành viên tham gia
                </Label>
                <div className='flex flex-wrap gap-2'>
                  {participants.map((p) => (
                    <img
                      key={p.id}
                      src={p.avatar}
                      className='w-10 h-10 rounded-full border-2 border-white shadow-sm'
                      alt={p.name}
                    />
                  ))}
                  <Button className='w-10 h-10 rounded-full border-2 border-dashed border-outline-variant/30 flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-all'>
                    <Plus size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='p-6 sm:p-8 bg-surface-container-low/50 flex gap-4 border-t border-surface-container-highest shrink-0'>
          <Button
            onClick={onClose}
            className='flex-1 py-4 border-2 border-outline-variant/30 text-on-surface uppercase text-xs font-black tracking-widest rounded-2xl hover:bg-surface-variant/20 transition-all active:scale-95'
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={onAdd}
            className='flex-[2] py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2'
          >
            <Sparkles size={16} /> {isEdit ? 'Cập nhật' : 'Thêm vào lộ trình'}
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showSplitModal && (
          <SplitCostModal
            totalCost={parseInt(cost.replace(/\D/g, '') || '0')}
            participants={participants}
            onClose={() => setShowSplitModal(false)}
            onSave={(individualCosts) => {
              const total = Object.values(individualCosts).reduce(
                (sum: number, val: any) => sum + parseInt(val.replace(/\D/g, '') || '0'),
                0,
              )
              setCost(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
              setShowSplitModal(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
