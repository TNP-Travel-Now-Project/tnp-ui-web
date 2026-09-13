import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  Calculator,
  Calendar,
  CheckCircle2,
  Coffee,
  Hotel,
  MapPin,
  Navigation2,
  Plus,
  PlusCircle,
  ShoppingBag,
  Train,
  Trash2,
  TrendingUp,
  UserPlus,
  Utensils,
  Wallet,
  X,
} from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { Button, Input, Label } from '@/shared/components'
import { toast } from 'sonner'
import SplitCostModal from '../SplitCostModal/SplitCostModal'

export default function TripExpenseModal({
  onClose,
  tripName,
  tripDuration,
}: {
  onClose: () => void
  tripName?: string
  tripDuration?: string
}) {
  const [activeTab, setActiveTab] = useState<'individual' | 'group'>('individual')
  const [selectedExpenseModal, setSelectedExpenseModal] = useState<{
    isOpen: boolean
    expense?: any
    defaultCategory?: string
  }>({ isOpen: false })
  const [selectedSettlement, setSelectedSettlement] = useState<any>(null)
  const [showMemberLogs, setShowMemberLogs] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showSettlementsModal, setShowSettlementsModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [showComplaintModal, setShowComplaintModal] = useState<{
    isOpen: boolean
    context: 'payer' | 'receiver'
  }>({ isOpen: false, context: 'payer' })
  const [isComplaining, setIsComplaining] = useState(false)

  const [settlements, setSettlements] = useState<
    Array<{
      id: number
      fromId: number
      fromName: string
      toId: number
      toName: string
      amount: number
      status: string
      fromAvatar: string
      toAvatar: string
      hasComplaint?: boolean
      complaintFrom?: string
      complaintReason?: string
    }>
  >([
    {
      id: 1,
      fromId: 2,
      fromName: 'An',
      toId: 1,
      toName: 'Tuấn',
      amount: 3000000,
      status: 'pending',
      fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      toAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    },
    {
      id: 2,
      fromId: 3,
      fromName: 'Bình',
      toId: 1,
      toName: 'Tuấn',
      amount: 500000,
      status: 'pending',
      fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      toAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    },
  ])
  const [activities, setActivities] = useState<any[]>([])

  const formatCurrency = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return (
    <div className='fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className='relative bg-background w-full max-w-6xl rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col h-[92vh] sm:h-[90vh]'
      >
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 sm:p-6 border-b border-outline-variant/10 shrink-0 bg-surface gap-4'>
          <div className='w-full sm:w-auto'>
            <nav className='flex gap-2 text-[10px] sm:text-xs font-medium text-outline mb-1'>
              <span>Chuyến đi</span>
              <span>/</span>
              <span className='font-bold text-on-surface'>Chi phí hành trình</span>
            </nav>
            <div className='flex items-center justify-between sm:block'>
              <div>
                <h2 className='text-lg sm:text-[28px] font-black text-on-surface leading-tight'>
                  Nhật ký Chi tiêu
                </h2>
                <p className='text-[10px] sm:text-sm text-outline mt-0.5'>
                  {tripName || 'Đà Lạt - Nha Trang'} • {tripDuration || '5 ngày'}
                </p>
              </div>
              <Button
                onClick={onClose}
                className='sm:hidden p-2 hover:bg-surface-container rounded-full transition-colors text-outline'
              >
                <X size={20} />
              </Button>
            </div>
          </div>
          <div className='flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4'>
            <div className='flex p-1 bg-surface-container rounded-2xl flex-1 sm:flex-initial'>
              <Button
                onClick={() => setActiveTab('individual')}
                className={`flex-1 sm:px-6 py-2 rounded-[16px] border-on-surface/5 text-xs sm:text-sm font-bold transition-all ${activeTab === 'individual' ? 'bg-white shadow-sm text-primary border' : 'text-outline hover:text-on-surface'}`}
              >
                Cá nhân
              </Button>
              <Button
                onClick={() => setActiveTab('group')}
                className={`flex-1 sm:px-6 py-2 rounded-[16px] text-xs sm:text-sm font-bold transition-all ${activeTab === 'group' ? 'bg-white shadow-sm text-primary' : 'text-outline hover:text-on-surface'}`}
              >
                Nhóm
              </Button>
            </div>
            <Button
              onClick={onClose}
              className='hidden sm:block p-2 hover:bg-surface-container rounded-full transition-colors text-outline'
            >
              <X size={24} />
            </Button>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto no-scrollbar p-4 sm:p-6 bg-surface'>
          {activeTab === 'individual' ? (
            <div className='animate-in fade-in slide-in-from-bottom-2 duration-300'>
              {/* Dashboard Summary Grid */}
              <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-10'>
                {/* Spending Allocation Card */}
                <div className='lg:col-span-3 bg-white border border-outline-variant/50 p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center gap-6 sm:gap-8'>
                  <div className='relative w-32 h-32 sm:w-[223px] sm:h-[223px] shrink-0'>
                    <svg className='w-full h-full transform -rotate-90' viewBox='0 0 36 36'>
                      <circle
                        cx='18'
                        cy='18'
                        fill='transparent'
                        r='15.915'
                        stroke='#f1f5ee'
                        strokeWidth='4'
                      ></circle>
                      <circle
                        cx='18'
                        cy='18'
                        fill='transparent'
                        r='15.915'
                        stroke='#1d6b40'
                        strokeDasharray='45 55'
                        strokeDashoffset='0'
                        strokeWidth='4'
                      ></circle>
                      <circle
                        cx='18'
                        cy='18'
                        fill='transparent'
                        r='15.915'
                        stroke='#496550'
                        strokeDasharray='25 75'
                        strokeDashoffset='-45'
                        strokeWidth='4'
                      ></circle>
                      <circle
                        cx='18'
                        cy='18'
                        fill='transparent'
                        r='15.915'
                        stroke='#785462'
                        strokeDasharray='15 85'
                        strokeDashoffset='-70'
                        strokeWidth='4'
                      ></circle>
                      <circle
                        cx='18'
                        cy='18'
                        fill='transparent'
                        r='15.915'
                        stroke='#e0e3dd'
                        strokeDasharray='15 85'
                        strokeDashoffset='-85'
                        strokeWidth='4'
                      ></circle>
                    </svg>
                    <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                      <p className='text-[8px] sm:text-[10px] text-outline uppercase font-black tracking-widest'>
                        Tổng chi
                      </p>
                      <p className='text-xl sm:text-2xl font-black text-primary leading-none mt-1'>
                        3.2M
                      </p>
                    </div>
                  </div>
                  <div className='flex-1 w-full'>
                    <h4 className='text-xs sm:text-sm font-bold text-on-surface mb-3 sm:mb-4 uppercase tracking-widest'>
                      Phân bổ hạng mục
                    </h4>
                    <div className='space-y-2 sm:space-y-3'>
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                          <span className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#1d6b40]'></span>
                          <span className='text-xs sm:text-sm font-medium text-on-surface'>
                            Di chuyển
                          </span>
                        </div>
                        <span className='text-xs sm:text-sm font-black text-on-surface'>
                          1.44M (45%)
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                          <span className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#496550]'></span>
                          <span className='text-xs sm:text-sm font-medium text-on-surface'>
                            Ăn uống
                          </span>
                        </div>
                        <span className='text-xs sm:text-sm font-black text-on-surface'>
                          800K (25%)
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                          <span className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#785462]'></span>
                          <span className='text-xs sm:text-sm font-medium text-on-surface'>
                            Lưu trú
                          </span>
                        </div>
                        <span className='text-xs sm:text-sm font-black text-on-surface'>
                          480K (15%)
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                          <span className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#e0e3dd]'></span>
                          <span className='text-xs sm:text-sm font-medium text-on-surface'>
                            Khác
                          </span>
                        </div>
                        <span className='text-xs sm:text-sm font-black text-on-surface'>
                          480K (15%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remaining Budget Card */}
                <div className='lg:col-span-2 bg-[#1d6b40] text-white p-5 sm:p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between'>
                  <div className='relative z-10'>
                    <p className='text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-80 mb-2'>
                      NGÂN SÁCH CÒN LẠI
                    </p>
                    <h2 className='text-2xl sm:text-3xl font-black'>1.800.000đ</h2>
                    <div className='flex items-center gap-2 mt-2 sm:mt-3'>
                      <TrendingUp size={14} className='sm:size-4' />
                      <p className='text-[10px] sm:text-xs font-bold'>Tiết kiệm 12%</p>
                    </div>
                  </div>
                  <div className='relative z-10 mt-6 sm:mt-8'>
                    <div className='h-1.5 sm:h-2 w-full bg-white/20 rounded-full overflow-hidden mb-2'>
                      <div className='h-full bg-white w-[64%]'></div>
                    </div>
                    <div className='flex justify-between text-[9px] sm:text-[10px] font-black uppercase tracking-widest'>
                      <span>Đã dùng 64%</span>
                      <span>Mục tiêu: 5M</span>
                    </div>
                  </div>
                  {/* Decorative background */}
                  <div className='absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none'>
                    <div className='absolute right-[-20%] top-[-10%] w-full h-[120%] bg-white/20 blur-2xl rounded-full'></div>
                    <div className='absolute right-[10%] bottom-[-20%] w-2/3 h-2/3 bg-black/20 blur-xl rounded-full'></div>
                  </div>
                </div>
              </div>

              {/* Quick Add Action Bar */}
              <section className='mb-8 sm:mb-12'>
                <div className='flex items-center justify-between mb-4'>
                  <h4 className='text-[10px] sm:text-xs font-black text-on-surface uppercase tracking-widest opacity-60'>
                    Thêm nhanh
                  </h4>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4'>
                  {[
                    { icon: Utensils, Label: 'Ăn uống', style: 'border-[1px] rounded-xl' },
                    { icon: Navigation2, Label: 'Di chuyển', style: 'rounded-xl' },
                    { icon: Hotel, Label: 'Lưu trú', style: 'rounded-xl' },
                    { icon: Wallet, Label: 'Khác', style: 'border-[2px] rounded-xl' },
                  ].map((item) => (
                    <Button
                      key={item.Label}
                      onClick={() =>
                        setSelectedExpenseModal({ isOpen: true, defaultCategory: item.Label })
                      }
                      className={`group flex flex-col items-center justify-center p-4 sm:p-6 bg-white border border-outline-variant/50 hover:border-primary transition-all hover:shadow-md active:scale-95 text-center ${item.style}`}
                    >
                      <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-primary-container group-hover:text-white transition-colors'>
                        <item.icon
                          size={18}
                          className='text-primary group-hover:text-white sm:size-5'
                        />
                      </div>
                      <span className='text-[11px] sm:text-xs font-bold text-on-surface'>
                        {item.Label}
                      </span>
                    </Button>
                  ))}
                </div>
              </section>

              <div className='grid grid-cols-1 lg:grid-cols-10 gap-6 sm:gap-8 pb-10'>
                {/* Timeline Section */}
                <section className='lg:col-span-6 space-y-6 sm:space-y-8'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-[10px] sm:text-xs font-black text-on-surface uppercase tracking-widest opacity-60'>
                      Dòng thời gian chi tiêu
                    </h4>
                    <div className='hidden sm:flex items-center gap-4 text-xs font-bold text-outline'>
                      <span className='flex items-center gap-1.5'>
                        <span className='w-2.5 h-2.5 rounded-full bg-[#1d6b40]'></span> Ăn uống
                      </span>
                      <span className='flex items-center gap-1.5'>
                        <span className='w-2.5 h-2.5 rounded-full bg-[#496550]'></span> Di chuyển
                      </span>
                    </div>
                  </div>

                  {/* Day 1 */}
                  <div className='relative pl-6 sm:pl-8 border-l-2 border-outline-variant/30 pb-8'>
                    <div className='absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm'></div>
                    <div className='flex flex-row items-center justify-between mb-4 gap-2'>
                      <div className='flex items-baseline gap-2 sm:gap-3'>
                        <h3 className='text-lg sm:text-xl font-black text-on-surface'>15 Thg 10</h3>
                        <span className='text-outline text-[10px] font-bold uppercase tracking-widest opacity-60'>
                          Ngày 1
                        </span>
                      </div>
                      <span className='font-black text-on-surface bg-surface-container px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-sm'>
                        ~ 1.2M
                      </span>
                    </div>
                    <div className='space-y-3'>
                      <div
                        onClick={() =>
                          setSelectedExpenseModal({
                            isOpen: true,
                            expense: {
                              name: 'Vé tàu hỏa SE3',
                              cost: '850,000',
                              time: '10:30',
                              date: '15/10/2024',
                              type: 'nhóm',
                              category: 'Di chuyển',
                            },
                          })
                        }
                        className='flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-outline-variant/30 hover:border-primary/20 transition-all cursor-pointer group'
                      >
                        <div className='flex items-center gap-4'>
                          <div className='w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary'>
                            <Train size={20} />
                          </div>
                          <div>
                            <p className='font-bold text-sm text-on-surface'>Vé tàu hỏa SE3</p>
                            <p className='text-xs text-outline font-medium'>10:30 • Di chuyển</p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='font-black text-sm text-on-surface'>850.000đ</p>
                          <span className='text-[9px] uppercase font-black text-white bg-secondary px-2 py-0.5 rounded-full mt-1 inline-block'>
                            Chung
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() =>
                          setSelectedExpenseModal({
                            isOpen: true,
                            expense: {
                              name: 'Phúc Long Coffee',
                              cost: '120,000',
                              time: '14:15',
                              date: '15/10/2024',
                              type: 'riêng',
                              category: 'Ăn uống',
                            },
                          })
                        }
                        className='flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-outline-variant/30 hover:border-primary/20 transition-all cursor-pointer'
                      >
                        <div className='flex items-center gap-4'>
                          <div className='w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary'>
                            <Coffee size={20} />
                          </div>
                          <div>
                            <p className='font-bold text-sm text-on-surface'>Phúc Long Coffee</p>
                            <p className='text-xs text-outline font-medium'>14:15 • Ăn uống</p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='font-black text-sm text-on-surface'>120.000đ</p>
                          <span className='text-[9px] uppercase font-black text-white bg-primary px-2 py-0.5 rounded-full mt-1 inline-block'>
                            Cá nhân
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Day 2 */}
                  <div className='relative pl-6 sm:pl-8 border-l-2 border-outline-variant/30 pb-0'>
                    <div className='absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-outline-variant border-4 border-white shadow-sm'></div>
                    <div className='flex flex-row items-center justify-between mb-4 gap-2'>
                      <div className='flex items-baseline gap-2 sm:gap-3'>
                        <h3 className='text-lg sm:text-xl font-black text-on-surface'>16 Thg 10</h3>
                        <span className='text-outline text-[10px] font-bold uppercase tracking-widest opacity-60'>
                          Ngày 2
                        </span>
                      </div>
                      <span className='font-black text-on-surface bg-surface-container px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-sm'>
                        ~ 2.2M
                      </span>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div
                        onClick={() =>
                          setSelectedExpenseModal({
                            isOpen: true,
                            expense: {
                              name: 'Khách sạn Horizon',
                              cost: '1,800,000',
                              time: '14:00',
                              date: '16/10/2024',
                              type: 'nhóm',
                              category: 'Lưu trú',
                            },
                          })
                        }
                        className='flex justify-between p-4 bg-white rounded-xl shadow-sm border border-outline-variant/30 hover:border-primary/20 transition-all cursor-pointer group'
                      >
                        <div className='flex items-center gap-4'>
                          <div className='w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary'>
                            <Hotel size={20} />
                          </div>
                          <div>
                            <p className='font-bold text-sm text-on-surface'>
                              Khách sạn Horizon (2 đêm)
                            </p>
                            <p className='text-xs text-outline font-medium'>14:00 • Lưu trú</p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='font-black text-sm text-primary'>1.8M</p>
                        </div>
                      </div>

                      <div className='flex flex-col gap-3 justify-start'>
                        <div
                          onClick={() =>
                            setSelectedExpenseModal({
                              isOpen: true,
                              expense: {
                                name: 'Lẩu Gà Lá É',
                                cost: '400,000',
                                time: '19:00',
                                date: '16/10/2024',
                                type: 'nhóm',
                                category: 'Ăn uống',
                              },
                            })
                          }
                          className='flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-outline-variant/30 hover:border-primary/20 transition-all cursor-pointer'
                        >
                          <div className='flex items-center gap-4'>
                            <div className='w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary'>
                              <Utensils size={20} />
                            </div>
                            <div>
                              <p className='font-bold text-sm text-on-surface'>Lẩu Gà Lá É</p>
                              <p className='text-xs text-outline font-medium'>Ăn tối • Nhóm</p>
                            </div>
                          </div>
                          <p className='font-black text-sm text-on-surface'>400.000đ</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Money received from members log */}
                <section className='lg:col-span-4 space-y-4'>
                  <div className='flex items-center justify-between px-1'>
                    <h4 className='text-[10px] sm:text-xs font-black text-on-surface uppercase tracking-widest opacity-60'>
                      Số tiền từ thành viên
                    </h4>
                    <Button
                      onClick={() => setShowMemberLogs(true)}
                      className='text-[10px] font-black text-primary uppercase tracking-widest hover:underline'
                    >
                      Xem thêm
                    </Button>
                  </div>
                  <div className='p-5 bg-surface-container-low/50 border border-outline-variant/10 rounded-2xl space-y-3'>
                    {[
                      {
                        id: 'inc_1',
                        fromName: 'An',
                        fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
                        amount: 3000000,
                        reason: 'Thanh toán chốt sổ',
                        time: '08:30 • 16/10/2024',
                        status: 'completed',
                      },
                      {
                        id: 'inc_2',
                        fromName: 'Bình',
                        fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                        amount: 500000,
                        reason: 'Thanh toán chốt sổ',
                        time: '10:15 • 16/10/2024',
                        status: 'completed',
                      },
                      {
                        id: 'inc_3',
                        fromName: 'Chi',
                        fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chi',
                        amount: 1200000,
                        reason: 'Thanh toán chốt sổ',
                        time: '11:45 • 16/10/2024',
                        status: 'completed',
                      },
                    ]
                      .slice(0, 3)
                      .map((item) => {
                        const s = settlements.find((sel) => sel.fromName === item.fromName)
                        const hasComplaint = s?.hasComplaint
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              setSelectedSettlement({
                                id: item.id,
                                fromName: item.fromName,
                                fromAvatar: item.fromAvatar,
                                toName: 'Tuấn',
                                toAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
                                amount: item.amount,
                                status: 'completed',
                                date: item.time,
                                reason: item.reason,
                                isPersonalLog: true,
                                hasComplaint: hasComplaint,
                                complaintFrom: s?.complaintFrom,
                                complaintReason: s?.complaintReason,
                              })
                            }}
                            className='flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-outline-variant/10 hover:border-primary/20 transition-all cursor-pointer group'
                          >
                            <div className='flex gap-4 items-center'>
                              <div className='relative'>
                                <img
                                  src={item.fromAvatar}
                                  className={`w-10 h-10 rounded-full border transition-all ${hasComplaint ? 'border-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]' : 'border-outline-variant/20'}`}
                                />
                                <div className='absolute -bottom-1 -right-1 bg-white rounded-full'>
                                  {hasComplaint ? (
                                    <AlertCircle size={14} className='text-rose-500' />
                                  ) : (
                                    <CheckCircle2 size={14} className='text-[#1d6b40]' />
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className='font-bold text-[13px] text-on-surface'>
                                  {item.fromName} đã trả
                                </p>
                                <p className='text-[10px] text-outline font-medium mt-0.5'>
                                  {item.time.split(' • ')[0]}
                                </p>
                              </div>
                            </div>
                            <div className='text-right shrink-0'>
                              <p
                                className={`font-black text-xs ${hasComplaint ? 'text-rose-500' : 'text-[#1d6b40]'}`}
                              >
                                +{formatCurrency(item.amount)}đ
                              </p>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className='animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-10 pb-10'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Member Stats */}
                <div className='bg-white border border-outline-variant/50 p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col'>
                  <div className='flex items-center justify-between mb-5 sm:mb-6'>
                    <h4 className='text-[10px] sm:text-xs font-black text-on-surface uppercase tracking-widest opacity-60'>
                      Thống kê thành viên
                    </h4>
                    <Button
                      onClick={() => setShowStatsModal(true)}
                      className='text-[10px] font-black text-primary uppercase tracking-widest hover:underline'
                    >
                      Xem thêm
                    </Button>
                  </div>
                  <div className='space-y-3 sm:space-y-4'>
                    {[
                      {
                        id: 1,
                        name: 'Tuấn',
                        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
                        paid: 8500000,
                        share: 5000000,
                        balance: 3500000,
                      },
                      {
                        id: 2,
                        name: 'An',
                        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
                        paid: 2000000,
                        share: 5000000,
                        balance: -3000000,
                      },
                      {
                        id: 3,
                        name: 'Bình',
                        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                        paid: 4500000,
                        share: 5000000,
                        balance: -500000,
                      },
                    ]
                      .slice(0, 2)
                      .map((member) => {
                        const needsToPay = settlements.some(
                          (s) => s.fromId === member.id && s.status !== 'completed',
                        )
                        const isCompleted = member.balance < 0 && !needsToPay

                        return (
                          <div
                            key={member.id}
                            className='flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-surface-container-low/50 border border-outline-variant/10'
                          >
                            <div className='flex items-center gap-2 sm:gap-3'>
                              <div
                                className='relative cursor-pointer'
                                onClick={() =>
                                  toast.info(`Thông tin chung của ${member.name}`)
                                }
                              >
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border transition-all ${isCompleted ? 'border-[#1d6b40]' : 'border-outline-variant/20 hover:border-primary'}`}
                                />
                                {isCompleted && (
                                  <div className='absolute -bottom-1 -right-1 bg-white rounded-full'>
                                    <CheckCircle2 size={14} className='text-[#1d6b40]' />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className='font-bold text-xs sm:text-sm text-on-surface line-clamp-1'>
                                  {member.name}
                                </p>
                                <p className='text-[10px] sm:text-[11px] font-medium text-outline mt-0.5'>
                                  Đã chi: {formatCurrency(member.paid)}đ
                                </p>
                              </div>
                            </div>
                            <div className='text-right shrink-0 ml-2'>
                              <p
                                className={`font-black text-xs sm:text-sm ${member.balance > 0 ? 'text-primary' : member.balance < 0 ? 'text-rose-500' : 'text-outline'}`}
                              >
                                {member.balance > 0 ? '+' : ''}
                                {formatCurrency(member.balance)}đ
                              </p>
                              <p className='text-[8px] sm:text-[9px] uppercase font-bold text-outline mt-0.5'>
                                {member.balance > 0
                                  ? 'Nhận lại'
                                  : member.balance < 0
                                    ? 'Cần trả'
                                    : 'Đã cân bằng'}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>

                {/* Debt Settlement Suggestions */}
                <div className='bg-[#1d6b40] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col'>
                  <div className='relative z-10 flex-1'>
                    <div className='flex items-center justify-between mb-6'>
                      <p className='text-[10px] font-black uppercase tracking-widest opacity-80'>
                        Gợi ý chốt sổ (Thanh toán)
                      </p>
                      <Button
                        onClick={() => setShowSettlementsModal(true)}
                        className='text-[10px] font-black text-white/80 uppercase tracking-widest hover:text-white transition-colors'
                      >
                        Xem thêm
                      </Button>
                    </div>
                    <div className='space-y-4'>
                      {settlements
                        .filter((s) => s.status !== 'completed')
                        .slice(0, 2)
                        .map((settlement) => (
                          <div
                            key={settlement.id}
                            onClick={() => setSelectedSettlement(settlement)}
                            className='flex items-center justify-between bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-all'
                          >
                            <div className='flex items-center gap-3'>
                              <div className='relative flex items-center'>
                                <div className='relative z-10'>
                                  <img
                                    src={settlement.fromAvatar}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${settlement.hasComplaint ? 'border-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : settlement.status === 'verifying' ? 'border-[#86EFac]' : 'border-[#1d6b40]'}`}
                                  />
                                  {settlement.status === 'verifying' && (
                                    <div className='absolute -bottom-1 -right-1 bg-white rounded-full z-20'>
                                      <CheckCircle2 size={12} className='text-[#1d6b40]' />
                                    </div>
                                  )}
                                </div>
                                <div className='w-6 h-0.5 bg-white/40 -mx-1' />
                                <img
                                  src={settlement.toAvatar}
                                  className='w-8 h-8 rounded-full border-2 border-[#1d6b40] relative z-0'
                                />
                              </div>
                            </div>
                            <div className='text-right'>
                              <span className='text-[9px] uppercase font-bold text-white/80 block mb-0.5'>
                                {settlement.fromName} trả {settlement.toName}
                              </span>
                              <span className='font-black text-sm'>
                                {formatCurrency(settlement.amount)}đ
                              </span>
                            </div>
                          </div>
                        ))}
                      {settlements.filter((s) => s.status !== 'completed').length === 0 && (
                        <div className='text-center py-4 opacity-80 text-sm font-medium'>
                          Đã thanh toán xong!
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none'>
                    <div className='absolute right-[-20%] top-[-10%] w-full h-[120%] bg-white/20 blur-2xl rounded-full'></div>
                    <div className='absolute right-[10%] bottom-[-20%] w-2/3 h-2/3 bg-black/20 blur-xl rounded-full'></div>
                  </div>
                </div>
              </div>

              {/* Quick Add Action Bar */}
              <section className='mb-4'>
                <div className='flex items-center justify-between mb-4'>
                  <h4 className='text-xs font-black text-on-surface uppercase tracking-widest opacity-60'>
                    Thêm chi tiêu nhóm
                  </h4>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {[
                    { icon: Utensils, Label: 'Ăn uống chung' },
                    { icon: Navigation2, Label: 'Di chuyển chung' },
                    { icon: Hotel, Label: 'Lưu trú' },
                    { icon: Wallet, Label: 'Khác' },
                  ].map((item) => (
                    <Button
                      key={item.Label}
                      onClick={() =>
                        setSelectedExpenseModal({ isOpen: true, defaultCategory: item.Label })
                      }
                      className='group flex flex-col items-center justify-center p-6 bg-white border border-outline-variant/50 rounded-2xl hover:border-primary transition-all hover:shadow-md active:scale-95 text-center'
                    >
                      <div className='w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary-container group-hover:text-white transition-colors'>
                        <item.icon size={20} className='text-primary group-hover:text-white' />
                      </div>
                      <span className='text-xs font-bold text-on-surface'>{item.Label}</span>
                    </Button>
                  ))}
                </div>
              </section>

              {/* Group Timeline Section */}
              <section className='space-y-6'>
                <h4 className='text-xs font-black text-on-surface uppercase tracking-widest opacity-60'>
                  Hoạt động gần đây
                </h4>
                <div className='space-y-3'>
                  <AnimatePresence>
                    {activities.map((act) => (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        key={act.id}
                        className='flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-[#1d6b40]/20 transition-all group'
                      >
                        <div className='flex gap-4'>
                          <div className='w-10 h-10 rounded-full bg-[#1d6b40]/10 flex items-center justify-center text-[#1d6b40] shrink-0 mt-1'>
                            <CheckCircle2 size={20} />
                          </div>
                          <div>
                            <p className='font-bold text-sm text-on-surface'>{act.title}</p>
                            <p className='text-xs text-outline font-medium mt-0.5'>
                              {act.date} • Hệ thống
                            </p>
                            <div className='flex items-center gap-1 mt-2'>
                              <span className='text-[10px] text-primary font-bold uppercase tracking-widest'>
                                Đã chốt sổ
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='text-right shrink-0'>
                          <p className='font-black text-sm text-[#1d6b40]'>
                            {formatCurrency(act.amount)}đ
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div
                    onClick={() =>
                      setSelectedExpenseModal({
                        isOpen: true,
                        expense: {
                          name: 'Khách sạn Horizon',
                          cost: '1,800,000',
                          time: '14:00',
                          date: '16/10/2024',
                          type: 'nhóm',
                          category: 'Lưu trú',
                        },
                      })
                    }
                    className='flex justify-between p-4 bg-white rounded-xl shadow-sm border border-outline-variant/30 hover:border-primary/20 transition-all cursor-pointer group'
                  >
                    <div className='flex gap-4'>
                      <div className='w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0 mt-1'>
                        <Hotel size={20} />
                      </div>
                      <div>
                        <p className='font-bold text-sm text-on-surface'>
                          Khách sạn Horizon (2 đêm)
                        </p>
                        <p className='text-xs text-outline font-medium mt-0.5'>
                          14:00 • 16/10/2024
                        </p>
                        <div className='flex items-center gap-1 mt-2'>
                          <img
                            src='https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
                            className='w-4 h-4 rounded-full'
                          />
                          <span className='text-[10px] text-outline font-medium'>
                            Tuấn đã thanh toán
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='text-right shrink-0'>
                      <p className='font-black text-sm text-on-surface'>1.800.000đ</p>
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedExpenseModal({
                        isOpen: true,
                        expense: {
                          name: 'Vé tàu hỏa SE3',
                          cost: '850,000',
                          time: '10:30',
                          date: '15/10/2024',
                          type: 'nhóm',
                          category: 'Di chuyển',
                        },
                      })
                    }
                    className='flex justify-between p-4 bg-white rounded-xl shadow-sm border border-outline-variant/30 hover:border-primary/20 transition-all cursor-pointer group'
                  >
                    <div className='flex gap-4'>
                      <div className='w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0 mt-1'>
                        <Train size={20} />
                      </div>
                      <div>
                        <p className='font-bold text-sm text-on-surface'>
                          Vé tàu hỏa SE3 (Khứ hồi)
                        </p>
                        <p className='text-xs text-outline font-medium mt-0.5'>
                          10:30 • 15/10/2024
                        </p>
                        <div className='flex items-center gap-1 mt-2'>
                          <img
                            src='https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
                            className='w-4 h-4 rounded-full'
                          />
                          <span className='text-[10px] text-outline font-medium'>
                            Tuấn đã thanh toán
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='text-right shrink-0'>
                      <p className='font-black text-sm text-on-surface'>850.000đ</p>
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedExpenseModal({
                        isOpen: true,
                        expense: {
                          name: 'Lẩu Gà Lá É',
                          cost: '400,000',
                          time: '19:00',
                          date: '16/10/2024',
                          type: 'nhóm',
                          category: 'Ăn uống',
                        },
                      })
                    }
                    className='flex justify-between p-4 bg-white rounded-xl shadow-sm border border-outline-variant/30 hover:border-primary/20 transition-all cursor-pointer group'
                  >
                    <div className='flex gap-4'>
                      <div className='w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0 mt-1'>
                        <Utensils size={20} />
                      </div>
                      <div>
                        <p className='font-bold text-sm text-on-surface'>Lẩu Gà Lá É</p>
                        <p className='text-xs text-outline font-medium mt-0.5'>
                          19:00 • 16/10/2024
                        </p>
                        <div className='flex items-center gap-1 mt-2'>
                          <img
                            src='https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'
                            className='w-4 h-4 rounded-full'
                          />
                          <span className='text-[10px] text-outline font-medium'>
                            An đã thanh toán
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='text-right shrink-0'>
                      <p className='font-black text-sm text-on-surface'>400.000đ</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add / Detail Modal Overlay */}
      <AnimatePresence>
        {selectedExpenseModal.isOpen && (
          <ExpenseEditModal
            expense={selectedExpenseModal.expense}
            defaultCategory={selectedExpenseModal.defaultCategory}
            context={activeTab}
            onClose={() => setSelectedExpenseModal({ isOpen: false })}
            onSave={() => {
              toast.success('Đã lưu chi phí!')
              setSelectedExpenseModal({ isOpen: false })
            }}
          />
        )}
        {selectedSettlement && (
          <SettlementConfirmModal
            settlement={selectedSettlement}
            onClose={() => setSelectedSettlement(null)}
            setShowQRModal={setShowQRModal}
            setShowComplaintModal={setShowComplaintModal}
            onConfirm={(image) => {
              setSettlements((prev) =>
                prev.map((s) =>
                  s.id === selectedSettlement.id
                    ? { ...s, status: 'verifying', billImage: image }
                    : s,
                ),
              )
              setSelectedSettlement((prev: any) => ({
                ...prev,
                status: 'verifying',
                billImage: image,
              }))
              toast.success('Đã gửi yêu cầu xác nhận')
            }}
            onVerify={() => {
              setSettlements((prev) =>
                prev.map((s) =>
                  s.id === selectedSettlement.id ? { ...s, status: 'completed' } : s,
                ),
              )
              setActivities((prev) => [
                {
                  id: Date.now(),
                  title: `${selectedSettlement.fromName} đã thanh toán cho ${selectedSettlement.toName}`,
                  amount: selectedSettlement.amount,
                  date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
                ...prev,
              ])
              setSelectedSettlement(null)
              toast.success(`Đã xác nhận thanh toán từ ${selectedSettlement.fromName}`)
            }}
          />
        )}
        {showMemberLogs && (
          <MemberLogsModal
            onClose={() => setShowMemberLogs(false)}
            formatCurrency={formatCurrency}
            onSelectItem={(item) => {
              setSelectedSettlement({
                ...item,
                toName: 'Tuấn',
                toAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
                isPersonalLog: true,
                date: item.time,
              })
            }}
          />
        )}
        {showStatsModal && (
          <MemberStatsListModal
            onClose={() => setShowStatsModal(false)}
            formatCurrency={formatCurrency}
            settlements={settlements}
          />
        )}
        {showSettlementsModal && (
          <SettlementsListModal
            onClose={() => setShowSettlementsModal(false)}
            formatCurrency={formatCurrency}
            settlements={settlements}
            onSelect={(s) => {
              setSelectedSettlement(s)
              setShowSettlementsModal(false)
            }}
          />
        )}
        {showQRModal && <QRModal onClose={() => setShowQRModal(false)} />}
        {showComplaintModal.isOpen && (
          <ComplaintModal
            context={showComplaintModal.context}
            onClose={() => setShowComplaintModal({ isOpen: false, context: 'payer' })}
            onConfirm={(reason) => {
              setIsComplaining(true)
              setTimeout(() => {
                setIsComplaining(false)
                const context = showComplaintModal.context
                setShowComplaintModal({ isOpen: false, context: 'payer' })

                if (selectedSettlement) {
                  setSettlements((prev) =>
                    prev.map((s) =>
                      s.id === selectedSettlement.id
                        ? {
                            ...s,
                            hasComplaint: true,
                            complaintFrom: context,
                            complaintReason: reason,
                          }
                        : s,
                    ),
                  )
                  setSelectedSettlement((prev: any) => ({
                    ...prev,
                    hasComplaint: true,
                    complaintFrom: context,
                    complaintReason: reason,
                  }))
                }

                toast.success('Đã gửi khiếu nại thành công!')
              }, 1500)
            }}
            isLoading={isComplaining}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function ExpenseEditModal({
  expense,
  defaultCategory,
  context,
  onClose,
  onSave,
}: {
  expense?: any
  defaultCategory?: string
  context?: 'individual' | 'group'
  onClose: () => void
  onSave: () => void
}) {
  const [cost, setCost] = useState(expense?.cost || '')
  const [name, setName] = useState(expense?.name || '')
  const [date, setDate] = useState(expense?.date || new Date().toLocaleDateString('vi-VN'))
  const [time, setTime] = useState(
    expense?.time || new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  )
  const [address, setAddress] = useState(expense?.address || '')
  const [category, setCategory] = useState(expense?.category || defaultCategory || 'Ăn uống')
  const [type, setType] = useState<'nhóm' | 'riêng'>(
    expense?.type || (context === 'individual' ? 'riêng' : 'nhóm'),
  )
  const [billImage, setBillImage] = useState<string | null>(expense?.billImage || null)

  const [showManageParticipants, setShowManageParticipants] = useState(false)
  const [showAddEmailField, setShowAddEmailField] = useState(false)
  const [showSplitModal, setShowSplitModal] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [userToDelete, setUserToDelete] = useState<any>(null)
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Tuan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { id: 2, name: 'An', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  ])

  const handleAddParticipant = () => {
    if (newEmail && newEmail.includes('@')) {
      const newUser = {
        id: Date.now(),
        name: newEmail.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newEmail}`,
      }
      setParticipants([...participants, newUser])
      setNewEmail('')
      setShowAddEmailField(false)
    }
  }

  const openManageWithAdd = () => {
    setShowAddEmailField(true)
    setShowManageParticipants(true)
  }

  const handleConfirmDeleteUser = () => {
    if (userToDelete) {
      setParticipants(participants.filter((x) => x.id !== userToDelete.id))
      setUserToDelete(null)
    }
  }

  const isViewOnly = !!expense

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '')
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '')
    if (rawVal.length > 9) return
    setCost(formatCurrency(rawVal))
  }

  return (
    <div className='fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-0 sm:p-4'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className='relative bg-white w-full max-w-3xl rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col h-[90vh] sm:h-auto max-h-[95vh] sm:max-h-[90vh]'
      >
        <div className='p-5 sm:p-6 border-b border-surface-container-highest flex justify-between items-center bg-surface-container-low/50 shrink-0'>
          <h2 className='text-lg sm:text-xl font-black text-on-surface'>
            {isViewOnly ? 'Chi tiết chi phí' : 'Thêm chi phí nội bộ'}
          </h2>
          <Button
            onClick={onClose}
            className='p-2 hover:bg-surface-container rounded-full transition-colors text-outline'
          >
            <X size={20} />
          </Button>
        </div>

        <div className='flex-1 overflow-y-auto no-scrollbar p-5 sm:p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
            <div className='space-y-4 sm:space-y-5'>
              <div className='space-y-1.5'>
                <Label className='text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-outline'>
                  Tên chi phí
                </Label>
                <Input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={isViewOnly}
                  placeholder='VD: Bữa tối BBQ'
                  className={`w-full px-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl sm:rounded-2xl text-[13px] font-bold outline-none transition-all ${isViewOnly ? 'cursor-default' : 'focus:ring-2 focus:ring-primary/20'}`}
                />
              </div>

              <div className='grid grid-cols-2 gap-3 sm:gap-4'>
                <div className='space-y-1.5'>
                  <Label className='text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-outline'>
                    Chi phí (VND)
                  </Label>
                  <div className='relative group'>
                    <Input
                      type='text'
                      value={cost}
                      onChange={handleCostChange}
                      readOnly={isViewOnly}
                      placeholder='0'
                      className={`w-full pl-4 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl sm:rounded-2xl text-[13px] font-bold outline-none transition-all ${isViewOnly ? 'cursor-default text-primary' : 'focus:ring-2 focus:ring-primary/20'}`}
                    />
                    <Button
                      onClick={() => {
                        if (!cost || cost === '0') return
                        setShowSplitModal(true)
                      }}
                      className='absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 sm:p-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all shadow-sm'
                      title={isViewOnly ? 'Xem chi tiết chia tiền' : 'Chia chi phí'}
                    >
                      <Calculator size={12} className='sm:size-[14px]' />
                    </Button>
                  </div>
                </div>
                <div className='space-y-1.5'>
                  <Label className='text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-outline'>
                    Danh mục
                  </Label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={isViewOnly}
                    className={`w-full px-4 py-2.5 sm:py-3 bg-surface-container border border-outline-variant/10 rounded-xl sm:rounded-2xl text-[13px] font-bold outline-none transition-all appearance-none ${isViewOnly ? 'cursor-default opacity-80' : 'focus:ring-2 focus:ring-primary/20'}`}
                  >
                    <option value='Ăn uống'>Ăn uống</option>
                    <option value='Di chuyển'>Di chuyển</option>
                    <option value='Lưu trú'>Lưu trú</option>
                    <option value='Khác'>Khác</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                    Ngày
                  </Label>
                  <div className='relative'>
                    <Calendar
                      size={16}
                      className='absolute left-3 top-1/2 -translate-y-1/2 text-outline/40'
                    />
                    <Input
                      type='text'
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      readOnly={isViewOnly}
                      placeholder='dd/MM/yyyy'
                      className={`w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-[13px] font-bold outline-none transition-all ${isViewOnly ? 'cursor-default' : 'focus:ring-2 focus:ring-primary/20'}`}
                    />
                  </div>
                </div>
                <div className='space-y-1.5'>
                  <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                    Giờ
                  </Label>
                  <Input
                    type='text'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    readOnly={isViewOnly}
                    placeholder='00:00'
                    className={`w-full px-4 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-[13px] font-bold outline-none transition-all text-center ${isViewOnly ? 'cursor-default' : 'focus:ring-2 focus:ring-primary/20'}`}
                  />
                </div>
              </div>
            </div>

            <div className='space-y-5'>
              <div className='space-y-1.5'>
                <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                  Vị trí
                </Label>
                <div className='relative group'>
                  <Input
                    type='text'
                    readOnly={isViewOnly}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='Khách sạn, nhà hàng...'
                    className={`w-full pl-4 pr-12 py-3 bg-surface-container border border-outline-variant/10 rounded-2xl text-[13px] font-bold outline-none transition-all ${isViewOnly ? 'cursor-default' : 'focus:ring-2 focus:ring-primary/20'}`}
                  />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || name)}`}
                    target='_blank'
                    rel='noreferrer'
                    className='absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl transition-all shadow-sm z-10'
                  >
                    <MapPin size={16} />
                  </a>
                </div>
              </div>

              <div className='space-y-2'>
                <Label className='text-[10px] font-black uppercase tracking-widest text-outline'>
                  Phân loại chi tiêu
                </Label>
                <div className='flex gap-2 p-1 bg-surface-container rounded-xl'>
                  <Button
                    type='button'
                    disabled={context === 'group' || isViewOnly}
                    onClick={() => setType('riêng')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${type === 'riêng' ? 'bg-white shadow-sm text-primary' : 'text-outline hover:text-on-surface'} ${context === 'group' || isViewOnly ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    Riêng
                  </Button>
                  <Button
                    type='button'
                    disabled={isViewOnly}
                    onClick={() => setType('nhóm')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${type === 'nhóm' ? 'bg-white shadow-sm text-primary' : 'text-outline hover:text-on-surface'} ${isViewOnly ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    Nhóm
                  </Button>
                </div>
              </div>

              <div className='space-y-3'>
                <Label className='text-[10px] font-black text-outline uppercase tracking-[0.1em]'>
                  Hình ảnh hóa đơn
                </Label>
                {!billImage ? (
                  <Label
                    className={`block w-full py-4 border-2 border-dashed border-outline-variant/30 rounded-2xl text-center bg-surface-container-low/50 hover:bg-surface-container transition-colors ${!isViewOnly ? 'cursor-pointer hover:border-primary/50' : 'opacity-50 cursor-default'}`}
                  >
                    <span className='text-[11px] font-bold text-outline'>Thêm hình ảnh</span>
                    {!isViewOnly && (
                      <Input
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setBillImage(URL.createObjectURL(e.target.files[0]))
                          }
                        }}
                      />
                    )}
                  </Label>
                ) : (
                  <div className='relative inline-block w-full'>
                    <img
                      src={billImage}
                      alt='Hóa đơn'
                      className='w-full h-32 object-cover rounded-2xl border border-outline-variant/20 shadow-sm'
                    />
                    {!isViewOnly && (
                      <Button
                        onClick={() => setBillImage(null)}
                        className='absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform'
                      >
                        <X size={14} />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <div className='pt-4 border-t border-outline-variant/10 space-y-3'>
                <div className='flex items-center justify-between'>
                  <Label className='text-[10px] font-black text-outline uppercase tracking-[0.1em]'>
                    Người tham gia ({participants.length})
                  </Label>
                  {!isViewOnly && (
                    <Button
                      onClick={() => {
                        setShowAddEmailField(false)
                        setShowManageParticipants(true)
                      }}
                      className='text-[10px] font-bold text-primary hover:underline hover:underline-offset-4'
                    >
                      Tất cả
                    </Button>
                  )}
                </div>
                <div className='flex flex-wrap items-center gap-2 pt-2 pb-1 text-outline'>
                  {participants.map((p) => (
                    <div key={p.id} className='relative shrink-0 group'>
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className='w-10 h-10 rounded-full border-2 border-white shadow-sm ring-1 ring-outline-variant/10'
                      />
                      {!isViewOnly && (
                        <Button
                          onClick={() => setParticipants(participants.filter((x) => x.id !== p.id))}
                          className='absolute -top-1 -right-1 z-10 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                        >
                          <X size={10} />
                        </Button>
                      )}
                    </div>
                  ))}
                  {!isViewOnly && (
                    <Button
                      onClick={openManageWithAdd}
                      className='w-10 h-10 rounded-full border-2 border-dashed border-outline-variant/30 hover:border-primary hover:bg-primary/5 flex items-center justify-center text-outline hover:text-primary transition-all group shrink-0'
                    >
                      <Plus size={20} className='group-hover:rotate-90 transition-transform' />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isViewOnly && (
          <div className='p-5 sm:p-8 border-t border-outline-variant/10 shrink-0 bg-white'>
            <Button
              onClick={onSave}
              className='w-full py-3.5 sm:py-4 bg-primary text-white rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all'
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
            >
              Thêm vào nhóm
            </Button>
          </div>
        )}

        <AnimatePresence>
          {showSplitModal && (
            <SplitCostModal
              totalCost={parseInt(cost.replace(/\D/g, '') || '0')}
              participants={participants}
              readOnly={isViewOnly}
              onClose={() => setShowSplitModal(false)}
              onSave={(individualCosts) => {
                const total = Object.values(individualCosts).reduce(
                  (sum: number, val: string) => sum + parseInt(val.replace(/\D/g, '') || '0'),
                  0,
                )
                setCost(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
                setShowSplitModal(false)
              }}
            />
          )}
          {showManageParticipants && (
            <div className='fixed inset-0 z-[260] flex items-center justify-center p-4'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowManageParticipants(false)}
                className='absolute inset-0 bg-black/40 backdrop-blur-[2px]'
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className='relative bg-white w-full max-w-[320px] h-[520px] rounded-[32px] shadow-2xl overflow-hidden flex flex-col'
              >
                <div className='flex justify-between items-center p-6 pb-4 shrink-0'>
                  <h4 className='text-xs font-black uppercase tracking-widest text-on-surface'>
                    Người tham gia
                  </h4>
                  <Button
                    onClick={() => setShowManageParticipants(false)}
                    className='p-1.5 hover:bg-surface-container rounded-full transition-colors text-outline'
                  >
                    <X size={16} />
                  </Button>
                </div>

                <div className='flex-1 overflow-y-auto px-6 pr-4 no-scrollbar py-2'>
                  <div className='space-y-3'>
                    {participants.map((p) => (
                      <div
                        key={p.id}
                        className='flex items-center justify-between p-3 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10 group hover:border-primary/20 transition-colors'
                      >
                        <div className='flex items-center gap-3'>
                          <img
                            src={p.avatar}
                            alt={p.name}
                            className='w-10 h-10 rounded-full border-2 border-white shadow-sm'
                          />
                          <span className='text-xs font-bold text-on-surface line-clamp-1'>
                            {p.name}
                          </span>
                        </div>
                        <Button
                          onClick={() => setUserToDelete(p)}
                          className='p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all'
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='p-6 pt-4 border-t border-outline-variant/10 bg-white shrink-0'>
                  {!showAddEmailField ? (
                    <Button
                      onClick={() => setShowAddEmailField(true)}
                      className='w-full py-4 rounded-2xl border-2 border-dashed border-outline-variant/30 text-[11px] font-black uppercase tracking-widest text-outline hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2'
                    >
                      <Plus size={16} /> Thêm thành viên
                    </Button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='space-y-3 pb-2'
                    >
                      <Label className='text-[9px] font-black text-outline uppercase tracking-widest flex items-center gap-2'>
                        <UserPlus size={12} /> Nhập Email
                      </Label>
                      <div className='flex gap-2 p-[2px]'>
                        <Input
                          autoFocus
                          type='email'
                          placeholder='ten@gmail.com'
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          className='flex-1 p-3 bg-surface-container/50 border border-outline-variant/20 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                          onKeyDown={(e) => e.key === 'Enter' && handleAddParticipant()}
                        />
                        <Button
                          onClick={handleAddParticipant}
                          disabled={!newEmail || !newEmail.includes('@')}
                          className='px-4 bg-primary text-white rounded-xl text-xs font-black uppercase shadow-lg shadow-primary/20 disabled:opacity-50'
                        >
                          OK
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>

                <AnimatePresence>
                  {userToDelete && (
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 100 }}
                      className='absolute inset-x-0 bottom-0 bg-white p-6 border-t border-outline-variant/10 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-10'
                    >
                      <div className='text-center space-y-4'>
                        <div className='flex flex-col items-center gap-2'>
                          <img
                            src={userToDelete.avatar}
                            className='w-12 h-12 rounded-full border-2 border-rose-100 p-0.5'
                            alt=''
                          />
                          <p className='text-[11px] font-bold text-on-surface leading-tight'>
                            Xác nhận loại bỏ
                            <br />
                            <span className='text-rose-500'>{userToDelete.name}</span>?
                          </p>
                        </div>
                        <div className='flex gap-2'>
                          <Button
                            onClick={() => setUserToDelete(null)}
                            className='flex-1 py-3 bg-surface-container text-on-surface rounded-xl font-bold text-[10px] uppercase tracking-widest'
                          >
                            Hủy
                          </Button>
                          <Button
                            onClick={handleConfirmDeleteUser}
                            className='flex-1 py-3 bg-rose-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-rose-500/20'
                          >
                            Xác nhận
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function SettlementConfirmModal({
  settlement,
  onClose,
  onConfirm,
  onVerify,
  setShowQRModal,
  setShowComplaintModal,
}: {
  settlement: any
  onClose: () => void
  onConfirm: (image: string) => void
  onVerify: () => void
  setShowQRModal: (v: boolean) => void
  setShowComplaintModal: (v: any) => void
}) {
  const [image, setImage] = useState<string | null>(settlement.billImage || null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedAmount, setEditedAmount] = useState(settlement.amount.toString())
  const [editedReason, setEditedReason] = useState(settlement.reason || 'Thanh toán chốt sổ')
  const [showReasonCloud, setShowReasonCloud] = useState(false)

  const formatCurrency = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  const handleResponse = () => {
    if (settlement.hasComplaint || isEditing) {
      toast.success('Đã gửi phản hồi thành công!')
      setIsEditing(false)
    } else {
      onVerify()
    }
  }

  return (
    <div className='fixed inset-0 z-[280] flex items-end sm:items-center justify-center p-0 sm:p-4 text-on-surface'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
      />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className='relative bg-white w-full max-w-md rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col overflow-visible h-[80vh] sm:h-fit sm:max-h-[85vh]'
      >
        <AnimatePresence>
          {showReasonCloud && (
            <div className='fixed inset-0 z-[500] flex items-center justify-center p-4'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowReasonCloud(false)}
                className='absolute inset-0 bg-black/40 backdrop-blur-[2px]'
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className='relative w-full max-w-[320px] bg-rose-500 text-white p-6 rounded-[32px] shadow-2xl border-4 border-white z-50 overflow-visible'
              >
                <div className='absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white'></div>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center'>
                    <AlertCircle size={18} />
                  </div>
                  <span className='text-[11px] font-black uppercase tracking-[0.2em]'>
                    Nội dung khiếu nại
                  </span>
                </div>
                <p className='text-[13px] font-bold leading-relaxed mb-4 italic opacity-95'>
                  "
                  {settlement.complaintReason ||
                    'Thông tin thanh toán không chính xác, vui lòng kiểm tra lại hóa đơn và số tiền chuyển khoản.'}
                  "
                </p>
                <Button
                  onClick={() => setShowReasonCloud(false)}
                  className='w-full py-3 bg-white text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 transition-colors'
                >
                  Đã hiểu
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className='p-5 border-b border-outline-variant/10 flex justify-between items-center bg-white shrink-0 rounded-t-[32px] sm:rounded-t-3xl z-20'>
          <h3 className='font-black text-lg'>Chốt sổ thanh toán</h3>
          <Button
            onClick={onClose}
            className='p-2 hover:bg-surface-container rounded-full transition-colors text-outline'
          >
            <X size={20} />
          </Button>
        </div>

        <div className='p-6 space-y-6 overflow-y-auto no-scrollbar relative z-10'>
          {settlement.hasComplaint && (
            <div className='p-3 bg-rose-50 border border-rose-100 rounded-xl text-left'>
              <div className='flex items-center gap-2 text-rose-600 mb-1'>
                <AlertCircle size={14} />
                <span className='text-[10px] font-black uppercase tracking-widest'>
                  Có khiếu nại từ{' '}
                  {settlement.complaintFrom === 'payer' ? settlement.fromName : settlement.toName}
                </span>
              </div>
              <p className='text-[11px] font-medium text-rose-800 leading-relaxed'>
                Vui lòng kiểm tra lại thông tin và phản hồi lại cho đối phương bằng cách nhấn "Phản
                hồi".{' '}
                {settlement.complaintFrom === 'payer' && (
                  <span
                    className='font-bold underline cursor-pointer'
                    onClick={() => setShowReasonCloud(true)}
                  >
                    Xem lý do
                  </span>
                )}
              </p>
            </div>
          )}
          <div className='flex items-center justify-center gap-4'>
            <div
              className='text-center w-20 relative cursor-pointer group'
              onClick={(e) => {
                e.stopPropagation()
                if (settlement.hasComplaint && settlement.complaintFrom === 'payer') {
                  setShowReasonCloud(true)
                }
              }}
            >
              <div className='relative inline-block'>
                <img
                  src={settlement.fromAvatar}
                  className={`w-16 h-16 rounded-full border-4 mx-auto transition-all duration-300 ${settlement.hasComplaint ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.5)] scale-110' : 'border-surface group-hover:scale-105'}`}
                />
                {settlement.hasComplaint && settlement.complaintFrom === 'payer' && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className='absolute -top-1 -right-1 w-6 h-6 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center text-white'
                  >
                    <AlertCircle size={12} />
                  </motion.div>
                )}
              </div>
              {settlement.billImage && (
                <div className='absolute -bottom-1 -right-1 w-8 h-8 rounded-lg overflow-hidden border-2 border-white shadow-md'>
                  <img
                    src={settlement.billImage}
                    className='w-full h-full object-cover'
                    alt='Bill'
                  />
                </div>
              )}
              <p className='font-bold mt-2 text-sm text-on-surface line-clamp-1'>
                {settlement.fromName}
              </p>
            </div>
            <div className='flex flex-col items-center flex-1'>
              {isEditing ? (
                <Input
                  type='number'
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                  className='w-full text-center font-black text-xl text-primary bg-primary/5 rounded-lg border-none outline-none p-1 focus:ring-2 focus:ring-primary/20'
                />
              ) : (
                <p className='font-black text-xl text-primary'>
                  {formatCurrency(parseInt(editedAmount))}đ
                </p>
              )}
              <div className='w-16 h-1 bg-primary/20 rounded-full mt-1.5 relative'>
                <div className='absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-primary/40 border-b-4 border-b-transparent'></div>
              </div>
              <span className='text-[10px] font-black uppercase text-outline mt-1 tracking-widest'>
                Chuyển cho
              </span>
            </div>
            <div
              className='text-center w-20 relative cursor-pointer group'
              onClick={() => setShowQRModal(true)}
            >
              <img
                src={settlement.toAvatar}
                className='w-16 h-16 rounded-full border-4 border-surface mx-auto group-hover:scale-105 transition-transform'
              />
              <div className='absolute top-0 right-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg sm:opacity-0 group-hover:opacity-100 transition-opacity'>
                <ShoppingBag size={12} />
              </div>
              <p className='font-bold mt-2 text-sm text-on-surface line-clamp-1'>
                {settlement.toName}
              </p>
            </div>
          </div>

          <div className='space-y-3 pt-2'>
            <h4 className='text-[10px] font-black text-outline uppercase tracking-[0.1em]'>
              Thông tin chi tiết
            </h4>
            <div className='grid grid-cols-2 gap-3'>
              <div className='bg-surface-container-low p-3 rounded-xl border border-outline-variant/10'>
                <p className='text-[10px] text-outline font-bold uppercase tracking-widest mb-1'>
                  {settlement.isPersonalLog ? 'Nội dung' : 'Tên chi phí'}
                </p>
                {isEditing ? (
                  <Input
                    value={editedReason}
                    onChange={(e) => setEditedReason(e.target.value)}
                    className='w-full bg-transparent text-sm font-bold text-on-surface outline-none border-b border-primary/20'
                  />
                ) : (
                  <p className='text-sm font-bold text-on-surface truncate'>{editedReason}</p>
                )}
              </div>
              <div className='bg-surface-container-low p-3 rounded-xl border border-outline-variant/10'>
                <p className='text-[10px] text-outline font-bold uppercase tracking-widest mb-1'>
                  Vị trí
                </p>
                <p className='text-sm font-bold text-primary flex items-center gap-1.5'>
                  <MapPin size={14} /> Đà Lạt
                </p>
              </div>

              {settlement.isPersonalLog ? (
                <div className='bg-surface-container-low p-3 rounded-xl border border-outline-variant/10'>
                  <p className='text-[10px] text-outline font-bold uppercase tracking-widest mb-1'>
                    Thời gian
                  </p>
                  <p className='text-sm font-bold text-on-surface'>{settlement.date}</p>
                </div>
              ) : (
                <div className='bg-surface-container-low p-3 rounded-xl border border-outline-variant/10'>
                  <p className='text-[10px] text-outline font-bold uppercase tracking-widest mb-1'>
                    Danh mục
                  </p>
                  <p className='text-sm font-bold text-on-surface flex items-center gap-1.5'>
                    <Wallet size={14} className='text-primary' /> Khác
                  </p>
                </div>
              )}

              <div className='bg-surface-container-low p-3 rounded-xl border border-outline-variant/10'>
                <p className='text-[10px] text-outline font-bold uppercase tracking-widest mb-1'>
                  Trạng thái
                </p>
                <p
                  className={`text-xs font-bold uppercase tracking-widest ${settlement.status === 'completed' ? 'text-[#1d6b40]' : settlement.status === 'verifying' ? 'text-secondary' : 'text-rose-500'}`}
                >
                  {settlement.status === 'completed'
                    ? 'Đã hoàn thành'
                    : settlement.status === 'verifying'
                      ? 'Đang chờ'
                      : 'Cần trả'}
                </p>
              </div>
            </div>
          </div>

          {!settlement.isPersonalLog &&
            (settlement.status !== 'verifying' ? (
              <div className='space-y-4 pt-4 border-t border-outline-variant/10'>
                <Label className='text-[10px] font-black uppercase tracking-[0.1em] text-outline'>
                  Hình ảnh hóa đơn chuyển khoản
                </Label>
                {!image ? (
                  <Label className='block w-full py-8 border-2 border-dashed border-outline-variant/30 rounded-2xl text-center bg-surface-container-low/50 hover:bg-surface-container cursor-pointer transition-all hover:border-primary/50 group'>
                    <div className='w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform'>
                      <Plus size={20} className='text-primary' />
                    </div>
                    <span className='text-xs font-bold text-outline'>Thêm hình ảnh</span>
                    <Input
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={(e) => {
                        if (e.target.files?.[0]) setImage(URL.createObjectURL(e.target.files[0]))
                      }}
                    />
                  </Label>
                ) : (
                  <div className='relative'>
                    <img
                      src={image}
                      className='w-full h-48 object-cover rounded-2xl border border-outline-variant/20 shadow-sm'
                    />
                    <Button
                      onClick={() => setImage(null)}
                      className='absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-full shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all'
                    >
                      <X size={16} />
                    </Button>
                  </div>
                )}
                <div className='flex gap-3 mt-4'>
                  <Button
                    onClick={() => setShowComplaintModal({ isOpen: true, context: 'payer' })}
                    className='flex-1 py-4 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-rose-100 active:scale-95'
                  >
                    <span className='sm:inline hidden'>Khiếu nại số dư</span>
                    <span className='sm:hidden inline'>Khiếu nại</span>
                  </Button>
                  <Button
                    onClick={() => onConfirm(image || '')}
                    disabled={!image}
                    className='flex-[2] py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest disabled:opacity-50 transition-all hover:opacity-90 shadow-lg shadow-primary/20 active:scale-95'
                  >
                    Gửi xác nhận
                  </Button>
                </div>
              </div>
            ) : (
              <div className='space-y-5 text-center pt-2'>
                <div
                  className={`p-4 rounded-2xl border flex flex-col items-center ${settlement.hasComplaint && settlement.complaintFrom === 'receiver' ? 'bg-rose-50 border-rose-200' : 'bg-secondary/10 border-secondary/20'}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${settlement.hasComplaint && settlement.complaintFrom === 'receiver' ? 'bg-rose-500 text-white' : 'bg-secondary text-white'}`}
                  >
                    {settlement.hasComplaint && settlement.complaintFrom === 'receiver' ? (
                      <AlertCircle size={20} />
                    ) : (
                      <CheckCircle2 size={20} />
                    )}
                  </div>
                  <p className='text-sm font-bold text-on-surface mb-1'>
                    {settlement.hasComplaint && settlement.complaintFrom === 'receiver'
                      ? `Có khiếu nại từ ${settlement.toName}`
                      : `Đang chờ xác nhận từ ${settlement.toName}`}
                  </p>
                  <p className='text-xs text-outline font-medium'>
                    {settlement.hasComplaint && settlement.complaintFrom === 'receiver'
                      ? `${settlement.toName} đã gửi khiếu nại về giao dịch này. Vui lòng kiểm tra lại và phản hồi.`
                      : `${settlement.fromName} đã gửi biên lai thanh toán. Tin nhắn đã được gửi tới hộp thoại của ${settlement.toName}.`}
                  </p>
                </div>

                {settlement.hasComplaint && settlement.complaintFrom === 'receiver' && (
                  <Button
                    onClick={() => {
                      toast.success(`Đã gửi phản hồi cho ${settlement.toName}`)
                      // In a real app we'd update some state here
                    }}
                    className='w-full py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 shadow-lg shadow-primary/20 active:scale-95 transition-all'
                  >
                    Gửi phản hồi cho {settlement.toName}
                  </Button>
                )}

                {image && (
                  <div className='border border-outline-variant/20 p-2 rounded-2xl bg-surface-container-low/50'>
                    <img src={image} className='w-full h-40 object-cover rounded-xl' />
                  </div>
                )}

                {/* Simulate Receiver's view */}
                <div className='pt-6 mt-4 relative'>
                  <div className='absolute top-0 left-0 right-0 border-t-2 border-dashed border-rose-500/20'></div>
                  <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-50 px-3 py-0.5 rounded-full text-[9px] font-black uppercase text-rose-500 tracking-widest border border-rose-200 shadow-sm'>
                    Góc nhìn người nhận
                  </div>

                  <div className='flex gap-3 mt-2'>
                    {!(settlement.hasComplaint && settlement.complaintFrom === 'payer') ? (
                      <Button
                        onClick={() => {
                          if (!isEditing) {
                            setIsEditing(true)
                          } else {
                            setShowComplaintModal({ isOpen: true, context: 'receiver' })
                          }
                        }}
                        className='flex-1 py-3.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-rose-100 active:scale-95'
                      >
                        {isEditing ? 'Hủy sửa' : 'Khiếu nại'}
                      </Button>
                    ) : null}
                    <Button
                      onClick={handleResponse}
                      className={`py-3.5 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 shadow-lg transition-all active:scale-95 ${settlement.hasComplaint && settlement.complaintFrom === 'payer' ? 'flex-1 bg-primary shadow-primary/20' : 'flex-[2] bg-[#1d6b40] shadow-[#1d6b40]/20'}`}
                    >
                      {settlement.hasComplaint && settlement.complaintFrom === 'payer'
                        ? 'Phản hồi khiếu nại'
                        : isEditing
                          ? 'Gửi phản hồi'
                          : 'Xác nhận đã nhận (Simulate)'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  )
}

function QRModal({ onClose }: { onClose: () => void }) {
  return (
    <div className='fixed inset-0 z-[300] flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-black/80 backdrop-blur-md'
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className='relative bg-white p-8 rounded-[32px] shadow-2xl max-w-sm w-full text-center'
      >
        <h3 className='font-black text-xl mb-6 text-on-surface'>Mã QR Thanh toán</h3>
        <div className='bg-surface-container-low p-4 rounded-3xl border-2 border-dashed border-primary/20 mb-6'>
          <img
            src='https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=example'
            alt='QR Code'
            className='w-full aspect-square rounded-2xl'
          />
        </div>
        <p className='text-sm font-bold text-outline mb-8'>
          Quét mã để chuyển khoản cho người nhận
        </p>
        <Button
          onClick={onClose}
          className='w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20'
        >
          Đóng
        </Button>
      </motion.div>
    </div>
  )
}

function ComplaintModal({
  context,
  onClose,
  onConfirm,
  isLoading,
}: {
  context: 'payer' | 'receiver'
  onClose: () => void
  onConfirm: (reason: string) => void
  isLoading: boolean
}) {
  const [reason, setReason] = useState('')
  return (
    <div className='fixed inset-0 z-[300] flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className='relative bg-white p-6 sm:p-8 rounded-[32px] shadow-2xl max-w-md w-full'
      >
        <h3 className='font-black text-xl mb-4 text-on-surface'>
          Khiếu nại {context === 'payer' ? 'số dư' : 'thanh toán'}
        </h3>
        <p className='text-sm font-medium text-outline mb-6 leading-relaxed'>
          {context === 'payer'
            ? 'Bạn đang khiếu nại về số tiền cần trả. Hệ thống sẽ gửi thông báo tới người nhận để kiểm tra lại các khoản chi.'
            : 'Bạn đang khiếu nại vì chưa nhận được tiền hoặc số tiền nhận được không khớp. Thông báo sẽ được gửi tới người trả.'}
        </p>
        <div className='space-y-3'>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder='Lý do khiếu nại (không bắt buộc)...'
            className='w-full p-4 bg-surface-container rounded-2xl border border-outline-variant/10 text-sm font-bold h-32 focus:outline-none focus:ring-2 focus:ring-rose-500/20'
          ></textarea>
        </div>
        <div className='flex gap-3 mt-8'>
          <Button
            onClick={onClose}
            className='flex-1 py-4 bg-surface-container text-on-surface rounded-2xl font-black text-[10px] uppercase tracking-widest'
          >
            Hủy
          </Button>
          <Button
            onClick={() => onConfirm(reason)}
            disabled={isLoading}
            className='flex-[2] py-4 bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2'
          >
            {isLoading ? (
              <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
            ) : (
              'Gửi khiếu nại'
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

function MemberStatsListModal({
  onClose,
  formatCurrency,
  settlements,
}: {
  onClose: () => void
  formatCurrency: (n: number) => string
  settlements: any[]
}) {
  const members = [
    {
      id: 1,
      name: 'Tuấn',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      paid: 8500000,
      share: 5000000,
      balance: 3500000,
    },
    {
      id: 2,
      name: 'An',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      paid: 2000000,
      share: 5000000,
      balance: -3000000,
    },
    {
      id: 3,
      name: 'Bình',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      paid: 4500000,
      share: 5000000,
      balance: -500000,
    },
    {
      id: 4,
      name: 'Chi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chi',
      paid: 0,
      share: 5000000,
      balance: -5000000,
    },
  ]

  return (
    <div className='fixed inset-0 z-[280] flex items-end sm:items-center justify-center p-0 sm:p-4 text-on-surface'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
      />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className='relative bg-[#f8f9fa] w-full max-w-md rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden h-[80vh]'
      >
        <div className='p-5 border-b border-outline-variant/10 flex justify-between items-center bg-white shrink-0'>
          <h3 className='font-black text-lg'>Thống kê chi tiết</h3>
          <Button
            onClick={onClose}
            className='p-2 hover:bg-surface-container rounded-full transition-colors text-outline'
          >
            <X size={20} />
          </Button>
        </div>
        <div className='p-4 space-y-3 overflow-y-auto no-scrollbar'>
          {members.map((member) => {
            const needsToPay = settlements.some(
              (s) => s.fromId === member.id && s.status !== 'completed',
            )
            const isCompleted = member.balance < 0 && !needsToPay
            return (
              <div
                key={member.id}
                className='flex items-center justify-between p-4 bg-white rounded-2xl border border-outline-variant/10 shadow-sm'
              >
                <div className='flex items-center gap-3'>
                  <img
                    src={member.avatar}
                    className={`w-12 h-12 rounded-full border-2 ${isCompleted ? 'border-[#1d6b40]' : 'border-white'}`}
                  />
                  <div>
                    <p className='font-bold text-[14px]'>{member.name}</p>
                    <p className='text-[11px] text-outline font-medium'>
                      Đã chi: {formatCurrency(member.paid)}đ
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p
                    className={`font-black text-[15px] ${member.balance > 0 ? 'text-primary' : member.balance < 0 ? 'text-rose-500' : 'text-outline'}`}
                  >
                    {member.balance > 0 ? '+' : ''}
                    {formatCurrency(member.balance)}đ
                  </p>
                  <p className='text-[9px] uppercase font-black text-outline tracking-wider mt-1 opacity-60'>
                    {member.balance > 0 ? 'Nhận lại' : member.balance < 0 ? 'Cần trả' : 'Cân bằng'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

function SettlementsListModal({
  onClose,
  formatCurrency,
  settlements,
  onSelect,
}: {
  onClose: () => void
  formatCurrency: (n: number) => string
  settlements: any[]
  onSelect: (s: any) => void
}) {
  return (
    <div className='fixed inset-0 z-[280] flex items-end sm:items-center justify-center p-0 sm:p-4 text-on-surface'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
      />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className='relative bg-[#f8f9fa] w-full max-w-md rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden h-[80vh]'
      >
        <div className='p-5 border-b border-outline-variant/10 flex justify-between items-center bg-white shrink-0'>
          <h3 className='font-black text-lg'>Danh sách chốt sổ</h3>
          <Button
            onClick={onClose}
            className='p-2 hover:bg-surface-container rounded-full transition-colors text-outline'
          >
            <X size={20} />
          </Button>
        </div>
        <div className='p-4 space-y-3 overflow-y-auto no-scrollbar'>
          {settlements.map((s) => (
            <div
              key={s.id}
              onClick={() => onSelect(s)}
              className='flex items-center justify-between p-4 bg-white rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-all cursor-pointer shadow-sm group'
            >
              <div className='flex items-center gap-4'>
                <div className='flex items-center'>
                  <div className='relative'>
                    <img
                      src={s.fromAvatar}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${s.hasComplaint ? 'border-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]' : 'border-white'}`}
                    />
                    {s.hasComplaint && (
                      <div className='absolute -bottom-1 -right-1 bg-white rounded-full'>
                        <AlertCircle size={14} className='text-rose-500' />
                      </div>
                    )}
                  </div>
                  <div className='w-4 h-[2px] bg-outline-variant/30' />
                  <img
                    src={s.toAvatar}
                    className='w-10 h-10 rounded-full border-2 border-white ring-1 ring-outline-variant/10'
                  />
                </div>
                <div>
                  <p className='font-bold text-[13px]'>
                    {s.fromName} → {s.toName}
                  </p>
                  <p
                    className={`text-[10px] font-medium ${s.hasComplaint ? 'text-rose-500' : 'text-outline'}`}
                  >
                    {s.hasComplaint
                      ? 'Có khiếu nại'
                      : s.status === 'completed'
                        ? 'Hoàn thành'
                        : s.status === 'verifying'
                          ? 'Đang xác thực'
                          : 'Chưa trả'}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-black text-[15px] text-primary'>{formatCurrency(s.amount)}đ</p>
                <PlusCircle
                  size={14}
                  className='ml-auto mt-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity'
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function MemberLogsModal({
  onClose,
  formatCurrency,
  onSelectItem,
}: {
  onClose: () => void
  formatCurrency: (n: number) => string
  onSelectItem: (item: any) => void
}) {
  const logs = [
    {
      id: 'inc_1',
      fromName: 'An',
      fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      amount: 3000000,
      reason: 'Thanh toán chốt sổ',
      time: '08:30 • 16/10/2024',
      status: 'completed',
    },
    {
      id: 'inc_2',
      fromName: 'Bình',
      fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      amount: 500000,
      reason: 'Thanh toán chốt sổ',
      time: '10:15 • 16/10/2024',
      status: 'completed',
    },
    {
      id: 'inc_3',
      fromName: 'Chi',
      fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chi',
      amount: 1200000,
      reason: 'Thanh toán chốt sổ',
      time: '11:45 • 16/10/2024',
      status: 'completed',
    },
    {
      id: 'inc_4',
      fromName: 'Dũng',
      fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dung',
      amount: 800000,
      reason: 'Thanh toán chốt sổ',
      time: '14:20 • 16/10/2024',
      status: 'completed',
    },
    {
      id: 'inc_5',
      fromName: 'Em',
      fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Em',
      amount: 200000,
      reason: 'Thanh toán chốt sổ',
      time: '16:05 • 16/10/2024',
      status: 'completed',
    },
  ]

  return (
    <div className='fixed inset-0 z-[270] flex items-end sm:items-center justify-center p-0 sm:p-4 text-on-surface'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
      />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className='relative bg-[#f8f9fa] w-full max-w-md rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden h-[80vh]'
      >
        <div className='p-5 border-b border-outline-variant/10 flex justify-between items-center bg-white shrink-0'>
          <h3 className='font-black text-lg'>Lịch sử nhận tiền</h3>
          <Button
            onClick={onClose}
            className='p-2 hover:bg-surface-container rounded-full transition-colors text-outline'
          >
            <X size={20} />
          </Button>
        </div>
        <div className='p-4 space-y-3 overflow-y-auto no-scrollbar'>
          {logs.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectItem(item)
                onClose()
              }}
              className='flex items-center justify-between p-4 bg-white rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-all cursor-pointer group shadow-sm'
            >
              <div className='flex gap-4 items-center'>
                <div className='relative'>
                  <img
                    src={item.fromAvatar}
                    className='w-12 h-12 rounded-full border-2 border-white shadow-sm'
                  />
                  <div className='absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-outline-variant/10'>
                    <CheckCircle2 size={14} className='text-[#1d6b40]' />
                  </div>
                </div>
                <div>
                  <p className='font-bold text-[14px]'>{item.fromName} đã trả</p>
                  <p className='text-[11px] text-outline font-medium mt-0.5'>{item.time}</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-black text-[15px] text-[#1d6b40]'>
                  +{formatCurrency(item.amount)}đ
                </p>
                <p className='text-[9px] font-black uppercase text-outline tracking-wider mt-1 opacity-60'>
                  Xác nhận
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
