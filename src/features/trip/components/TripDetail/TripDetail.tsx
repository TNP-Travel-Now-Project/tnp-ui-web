import { Button } from '@base-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Calculator,
  Calendar,
  ChevronRight,
  Clock,
  Coffee,
  Compass,
  Edit,
  FileText,
  HandCoins,
  Hotel,
  Info,
  Landmark,
  MapPin,
  MessageCircle,
  Plus,
  Receipt,
  Settings,
  Share2,
  Sun,
  Trash2,
  TrendingUp,
  UserPlus,
  Users,
  Utensils,
  Wallet,
  X,
} from 'lucide-react'
import React, { useState } from 'react'
import { AddPlaceModal } from '@/features/trip/components/AddPlaceModal'
import { Input } from '@/shared/components'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/navigation/dropdown-menu'
import { useModalScrollLock } from '@/shared/hook/useModalScrollLock'
import { useToast } from '@/shared/hook/useToast'
import type { TripDetailData } from '@/shared/types'
import SplitCostModal from '../SplitCostModal/SplitCostModal'
import TripExpenseModal from '../TripExpenseModal/TripExpenseModal'

interface TripDetailProps {
  trip: TripDetailData
  onBack: () => void
  onImminentActivity?: (isImminent: boolean) => void
}

export default function TripDetail({ trip, onBack, onImminentActivity }: TripDetailProps) {
  const { showToast } = useToast()
  const [showMembersModal, setShowMembersModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [participants, setParticipants] = useState(trip.participants)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [viewingProfile, setViewingProfile] = useState<any>(null)

  const vietnamNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }))

  // Create dynamic sample data based on current time for demo
  const getUpcomingData = () => {
    const now = new Date(vietnamNow)
    const in15m = new Date(now.getTime() + 15 * 60 * 1000)
    const in45m = new Date(now.getTime() + 45 * 60 * 1000)

    const format = (d: Date) =>
      `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`

    return [
      { id: 1, title: 'Ăn tối hải sản', time: format(in15m), location: 'Nhà hàng Bãi Sao' },
      { id: 2, title: 'Tham quan Bãi Sao', time: format(in45m), location: 'Phú Quốc' },
      { id: 3, title: 'Ngắm hoàng hôn', time: '17:45', location: 'Sunset Sanato' },
    ]
  }

  const [upcomingActivities, setUpcomingActivities] = useState(() => getUpcomingData())
  const [showItineraryModal, setShowItineraryModal] = useState(false)
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false)
  const [editingActivity, setEditingActivity] = useState<any>(null)

  // Apply scroll lock when any modal is open
  const isAnyModalOpen =
    showMembersModal ||
    showInviteModal ||
    showExpenseModal ||
    confirmDeleteId !== null ||
    selectedImage !== null ||
    viewingProfile !== null ||
    showItineraryModal ||
    showAddPlaceModal ||
    editingActivity !== null
  useModalScrollLock(isAnyModalOpen)

  const isWithin30Mins = (timeStr: string) => {
    if (!timeStr) return false
    const [hours, minutes] = timeStr.split(':').map(Number)
    const activityTime = new Date(vietnamNow)
    activityTime.setHours(hours, minutes, 0, 0)

    const diff = activityTime.getTime() - vietnamNow.getTime()
    return diff >= -5 * 60 * 1000 && diff <= 30 * 60 * 1000
  }

  const imminentActivity = upcomingActivities.find((act) => isWithin30Mins(act.time))

  React.useEffect(() => {
    const handleCloseAll = () => {
      setShowMembersModal(false)
      setShowInviteModal(false)
      setShowExpenseModal(false)
      setShowItineraryModal(false)
      setShowAddPlaceModal(false)
      setEditingActivity(null)
    }
    window.addEventListener('close-all-modals', handleCloseAll)
    return () => window.removeEventListener('close-all-modals', handleCloseAll)
  }, [])

  React.useEffect(() => {
    if (onImminentActivity) {
      onImminentActivity(!!imminentActivity)
    }
  }, [imminentActivity, onImminentActivity])

  const handleDeleteMember = (id: string) => {
    setConfirmDeleteId(id)
  }

  const confirmDelete = () => {
    if (confirmDeleteId !== null) {
      setParticipants(participants.filter((p) => p.id !== confirmDeleteId))
      setConfirmDeleteId(null)
      showToast('Đã xóa thành viên. Ngân sách chia sẻ đã được cập nhật lại.', 'success')
    }
  }

  const handleAvatarClick = (user: any) => {
    setViewingProfile({
      ...user,
      username: user.name.toLowerCase().replace(/\s/g, '_'),
      phone: '0908' + (Math.floor(Math.random() * 900000) + 100000),
      email: user.name.toLowerCase().replace(/\s/g, '.') + '@gmail.com',
      birthday: '12/06/1995',
    })
  }

  const handleImageClick = (url: string) => {
    setSelectedImage(url)
  }

  return (
    <div className='space-y-8 pb-20'>
      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-on-surface/90 backdrop-blur-md z-[200] flex items-center justify-center p-4'
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className='relative max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20'
            >
              <img
                src={selectedImage}
                alt='Preview'
                className='w-full h-auto max-h-[80vh] object-contain'
              />
              <Button
                className='absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors'
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Member Profile Modal (ReadOnly) */}
      <AnimatePresence>
        {viewingProfile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[110]'
              onClick={() => setViewingProfile(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-sm bg-white rounded-3xl shadow-2xl z-[111] overflow-hidden'
            >
              <div className='relative h-24 bg-primary/10'>
                <div className='absolute -bottom-10 left-1/2 -translate-x-1/2'>
                  <div className='w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-lg'>
                    <img
                      src={viewingProfile.avatar}
                      alt='Avatar'
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>
                <Button
                  onClick={() => setViewingProfile(null)}
                  className='absolute top-3 right-3 p-2 bg-white/50 hover:bg-white rounded-full transition-all'
                >
                  <X size={16} />
                </Button>
              </div>

              <div className='pt-12 p-6 text-center space-y-4'>
                <div>
                  <h3 className='text-lg font-black text-on-surface tracking-tight'>
                    {viewingProfile.name}
                  </h3>
                  <p className='text-[10px] font-black text-primary uppercase tracking-[0.2em]'>
                    Thành viên nhóm
                  </p>
                </div>

                <div className='grid grid-cols-1 gap-3 text-left bg-surface-container/30 p-4 rounded-2xl'>
                  <div className='flex flex-col'>
                    <span className='text-[9px] font-black text-outline uppercase tracking-wider'>
                      Username
                    </span>
                    <span className='text-xs font-bold text-on-surface'>
                      @{viewingProfile.username}
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-[9px] font-black text-outline uppercase tracking-wider'>
                      Số điện thoại
                    </span>
                    <span className='text-xs font-bold text-on-surface'>
                      {viewingProfile.phone}
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-[9px] font-black text-outline uppercase tracking-wider'>
                      Email
                    </span>
                    <span className='text-xs font-bold text-on-surface'>
                      {viewingProfile.email}
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-[9px] font-black text-outline uppercase tracking-wider'>
                      Ngày sinh
                    </span>
                    <span className='text-xs font-bold text-on-surface'>
                      {viewingProfile.birthday}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => setViewingProfile(null)}
                  className='w-full py-3 bg-on-surface text-white rounded-[4px] font-bold text-xs uppercase tracking-widest active:scale-95 transition-all'
                >
                  Đóng hồ sơ
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Itinerary Classification Modal (Phân loại lộ trình) */}
      <AnimatePresence>
        {showItineraryModal && (
          <ItineraryModal
            onClose={() => setShowItineraryModal(false)}
            onAddPlace={() => {
              setShowItineraryModal(false)
              setShowAddPlaceModal(true)
            }}
          />
        )}
      </AnimatePresence>

      {/* Add Place Modal */}
      <AnimatePresence>
        {showAddPlaceModal && <AddPlaceModal onClose={() => setShowAddPlaceModal(false)} />}
      </AnimatePresence>

      {/* Expense Modal */}
      <AnimatePresence>
        {showExpenseModal && (
          <TripExpenseModal
            onClose={() => setShowExpenseModal(false)}
            tripName={trip.title}
            tripDuration='5 ngày 4 đêm'
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingActivity && (
          <ActivityEditModal
            activity={editingActivity}
            onClose={() => setEditingActivity(null)}
            onSave={(updated) => {
              showToast(`Đã cập nhật: ${updated?.name || 'hoạt động'}`, 'success')
              setEditingActivity(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* Invite Member Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <InviteModal
            onClose={() => setShowInviteModal(false)}
            onInvite={(email) => {
              const newMember = {
                id: String(Date.now()),
                name: email.split('@')[0],
                avatar: `https://i.pravatar.cc/150?u=${email}`,
                role: 'Member',
              }
              setParticipants([...participants, newMember])
              showToast(`Đã gửi lời mời tới ${email}`, 'success')
              setShowInviteModal(false)
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {confirmDeleteId !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[110]'
              onClick={() => setConfirmDeleteId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-xs bg-white rounded-3xl shadow-2xl z-[111] overflow-hidden p-6 text-center'
            >
              <div className='w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4'>
                <Trash2 size={32} />
              </div>
              <h3 className='text-lg font-black text-on-surface mb-2 tracking-tight'>
                Xóa thành viên?
              </h3>
              <p className='text-xs text-outline font-medium leading-relaxed mb-6'>
                Việc xóa thành viên sẽ ảnh hưởng trực tiếp tới <strong>ngân sách dự kiến</strong> và
                việc chia sẻ chi phí ban đầu của chuyến đi. Bạn chắc chắn chứ?
              </p>
              <div className='flex gap-3'>
                <Button
                  onClick={() => setConfirmDeleteId(null)}
                  className='flex-1 py-3 bg-surface-container text-on-surface rounded-[4px] font-bold text-xs hover:bg-outline-variant/20 transition-all'
                >
                  Hủy bỏ
                </Button>
                <Button
                  onClick={confirmDelete}
                  className='flex-1 py-3 bg-error text-white rounded-[4px] font-bold text-xs shadow-lg shadow-error/20 active:scale-95 transition-all'
                >
                  Xác nhận xóa
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Member Management Modal */}
      <AnimatePresence>
        {showMembersModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMembersModal(false)}
              className='fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[100]'
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-md bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden'
            >
              <div className='p-6 border-b border-outline-variant/20 flex items-center justify-between'>
                <div>
                  <h3 className='text-xl font-black tracking-tight text-on-surface'>
                    Bạn đồng hành
                  </h3>
                  <p className='text-xs text-outline font-medium'>
                    Quản lý những người tham gia chuyến đi
                  </p>
                </div>
                <Button
                  onClick={() => setShowMembersModal(false)}
                  className='p-2 hover:bg-surface-container rounded-[4px] text-outline transition-all'
                >
                  <X size={20} />
                </Button>
              </div>

              <div className='p-6 max-h-[60vh] overflow-y-auto no-scrollbar space-y-4'>
                {participants.length === 0 ? (
                  <div className='text-center py-10 opacity-40'>
                    <Users className='mx-auto mb-2' size={32} />
                    <p className='text-xs font-bold uppercase tracking-widest'>Trống</p>
                  </div>
                ) : (
                  participants.map((comp, idx) => (
                    <motion.div
                      key={comp.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className='flex items-center justify-between p-3 rounded-2xl bg-surface-container/50 border border-outline-variant/10 group'
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className='w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden shadow-sm cursor-pointer hover:border-primary transition-all'
                          onClick={() => handleAvatarClick(comp)}
                        >
                          <img
                            src={comp.avatar}
                            alt='Avatar'
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div>
                          <p className='text-xs font-black text-on-surface'>{comp.name}</p>
                          <p className='text-[10px] font-medium text-outline'>
                            Thành viên chuyến đi
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDeleteMember(comp.id)}
                        className='p-2 text-outline/40 hover:text-error hover:bg-error/10 rounded-[4px] transition-all'
                      >
                        <X size={16} />
                      </Button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className='p-6 bg-surface-container/30 border-t border-outline-variant/10'>
                <Button
                  onClick={() => setShowMembersModal(false)}
                  className='w-full py-3 bg-on-surface text-white rounded-[4px] font-bold text-xs shadow-lg active:scale-95 transition-all'
                >
                  Xác nhận danh sách
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Title Section */}
      <section className='flex flex-row items-start justify-between gap-4 md:gap-6'>
        <div className='min-w-0 flex-1'>
          <Button
            onClick={onBack}
            className='text-[10px] sm:text-xs text-primary font-bold mb-4 flex items-center gap-1 hover:underline'
          >
            <ChevronRight className='rotate-180' size={14} />
            Quay lại danh sách
          </Button>
          <h2 className='text-lg sm:text-3xl font-bold text-on-surface mb-2 leading-tight break-words'>
            {trip.title}
          </h2>
          <div className='flex flex-wrap items-center gap-3 sm:gap-4 text-on-surface-variant text-[10px] sm:text-sm font-medium'>
            <div className='flex items-center gap-1'>
              <Calendar size={14} className='sm:size-[18px] text-outline' />
              {trip.startDate} - {trip.endDate}
            </div>
            <div className='flex items-center gap-1'>
              <MapPin size={14} className='sm:size-[18px] text-outline' />
              {trip.location}
            </div>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-2 shrink-0 self-end md:self-auto'>
          <Button
            onClick={() => setShowInviteModal(true)}
            className='flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 border-2 border-outline-variant rounded-[4px] font-bold text-[9px] sm:text-sm text-primary hover:bg-primary/5 transition-all'
          >
            <UserPlus size={14} className='sm:size-[18px]' />
            Mời
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-white rounded-[4px] font-bold text-[9px] sm:text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all outline-none'>
              <Settings size={14} className='sm:size-[18px]' />
              Quản lý
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuItem
                className='cursor-pointer font-bold gap-2 focus:bg-primary/5'
                onClick={() => showToast('Đang chuyển tới trang Chỉnh sửa chuyến đi...', 'info')}
              >
                <Edit size={16} />
                Chỉnh sửa chuyến đi
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer font-bold gap-2'>
                <Share2 size={16} />
                Chia sẻ lộ trình
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer font-bold gap-2'>
                <FileText size={16} />
                Xuất báo cáo PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='cursor-pointer font-bold gap-2 text-error focus:text-error'
                onClick={() =>
                  showToast('Yêu cầu xóa chuyến đi đã được gửi tới quản trị viên', 'warning')
                }
              >
                <Trash2 size={16} />
                Xóa chuyến đi
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Metrics Bento Grid */}
      <section className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6'>
        <MetricCard
          label='Tổng chi tiêu'
          value={trip.totalSpent}
          change='+12% vs dự kiến'
          icon={<HandCoins size={20} />}
          color='bg-primary'
        />
        <MetricCard
          label='Chi tiêu trong ngày'
          value='450.000đ'
          change='Hôm nay'
          icon={<Receipt size={20} />}
          color='bg-orange-500'
        />
        <MetricCard
          label='Số dư cá nhân'
          value={trip.personalBalance}
          change='Đã thanh toán'
          icon={<Wallet size={20} />}
          color='bg-tertiary'
        />
        <div
          onClick={() => setShowMembersModal(true)}
          className='bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-[#d6d0cc]/40 shadow-sm flex flex-col justify-between cursor-pointer hover:border-primary/30 transition-all overflow-hidden'
        >
          <div className='flex justify-between items-start mb-1 sm:mb-2 text-primary'>
            <div className='p-1.5 sm:p-2.5 bg-surface-container rounded-lg sm:rounded-md'>
              <Users size={16} className='sm:size-5 stroke-[2.5]' />
            </div>
            <span className='hidden sm:inline text-[8px] sm:text-[10px] font-black text-outline/60 uppercase tracking-widest'>
              {participants.length} Người
            </span>
          </div>
          <div>
            <p className='text-[8px] sm:text-[10px] text-outline font-black uppercase tracking-wider mb-1 sm:mb-2 truncate'>
              Thành viên
            </p>
            <div className='flex items-center gap-0.5 sm:gap-2'>
              {participants.slice(0, 2).map((p) => (
                <img
                  key={p.id}
                  src={p.avatar}
                  alt={p.name}
                  className='w-6 h-6 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover shadow-sm transition-transform hover:scale-110 shrink-0'
                />
              ))}
              {participants.length > 2 && (
                <div className='w-6 h-6 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-surface-container flex items-center justify-center text-[8px] sm:text-xs font-black text-primary animate-in fade-in zoom-in shrink-0'>
                  +{participants.length - 2}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Column */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Quick Actions */}
          <div className='bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#d6d0cc]/40 shadow-sm'>
            <h3 className='text-[10px] sm:text-xs font-black text-on-surface mb-4 uppercase tracking-widest opacity-60'>
              Thao tác nhanh
            </h3>
            <div className='grid grid-cols-3 gap-2 sm:gap-4 px-1'>
              <QuickActionButton
                icon={<MapPin size={20} className='sm:size-6' />}
                label='Thêm h/động'
                onClick={() => setShowAddPlaceModal(true)}
              />
              <QuickActionButton
                icon={<Receipt size={20} className='sm:size-6' />}
                label='Xem chi tiêu'
                onClick={() => setShowExpenseModal(true)}
              />
              <QuickActionButton
                icon={<MessageCircle size={20} className='sm:size-6' />}
                label='Mở Chat'
                onClick={() => showToast('Đang kết nối phòng chat nhóm...', 'success')}
              />
            </div>
          </div>

          {/* Activity Feed */}
          <div className='bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-[#d6d0cc]/40 shadow-sm'>
            <div className='flex justify-between items-center mb-6 sm:mb-8'>
              <h3 className='text-[10px] sm:text-xs font-black text-on-surface uppercase tracking-widest opacity-60'>
                Hoạt động gần đây
              </h3>
              <Button className='text-[10px] sm:text-xs font-bold text-primary hover:underline underline-offset-4'>
                Xem tất cả
              </Button>
            </div>
            <div className='space-y-6'>
              {trip.activities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                  onUserClick={handleAvatarClick}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className='space-y-8'>
          {/* Upcoming Activities Card */}
          <div className='bg-white p-6 rounded-xl sm:rounded-2xl border border-outline-variant shadow-sm space-y-6'>
            <div className='flex justify-between items-center'>
              <h3 className='text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wider'>
                Hoạt động sắp tới
              </h3>
              <span className='text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full'>
                Hôm nay
              </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4'>
              {upcomingActivities.map((act, idx) => {
                const isImminent = isWithin30Mins(act.time)
                return (
                  <motion.div
                    key={act.id}
                    onClick={() => setEditingActivity(act)}
                    animate={
                      isImminent
                        ? {
                            boxShadow: [
                              '0 0 0px rgba(245, 158, 11, 0)',
                              '0 0 20px rgba(245, 158, 11, 0.4)',
                              '0 0 0px rgba(245, 158, 11, 0)',
                            ],
                            borderColor: ['#d6d0cc', '#f59e0b', '#d6d0cc'],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                      isImminent
                        ? 'bg-secondary/5 border-secondary shadow-lg'
                        : 'border-outline-variant/50 hover:border-primary/30'
                    }`}
                  >
                    <div className='flex justify-between items-start mb-1'>
                      <h4 className='text-sm font-black text-on-surface group-hover:text-primary transition-colors'>
                        {act.title} - {act.time}
                      </h4>
                      {isImminent && (
                        <span className='flex h-2 w-2 relative'>
                          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75'></span>
                          <span className='relative inline-flex rounded-full h-2 w-2 bg-secondary'></span>
                        </span>
                      )}
                    </div>
                    <div className='flex items-center gap-1.5 text-outline text-[10px] font-medium'>
                      <MapPin size={10} />
                      {act.location}
                    </div>
                  </motion.div>
                )
              })}
              <motion.div
                onClick={() => setShowItineraryModal(true)}
                className={`p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-primary/10 transition-all group ${upcomingActivities.length % 2 === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className='p-2 bg-primary text-white rounded-lg'>
                  <Landmark size={18} />
                </div>
                <div className='flex-1'>
                  <p className='text-xs font-black text-on-surface'>Xem phân loại lộ trình</p>
                  <p className='text-[10px] text-outline font-medium'>
                    Dựa trên nhịp sống địa phương
                  </p>
                </div>
                <Button className='p-1.5 bg-white text-primary rounded-full shadow-sm'>
                  <ChevronRight size={14} />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Budget Progress */}
          <div className='bg-white p-6 rounded-xl sm:rounded-2xl border border-outline-variant shadow-sm'>
            <h3 className='text-xs sm:text-sm font-bold text-on-surface mb-6 uppercase tracking-wider'>
              Ngân sách dự kiến
            </h3>
            <div className='space-y-4'>
              <div className='flex justify-between items-center text-xs sm:text-sm'>
                <span className='text-on-surface-variant font-medium'>Đã chi</span>
                <span className='font-bold'>
                  {trip.totalSpent} / {trip.budgetLimit}
                </span>
              </div>
              <div className='h-2 bg-surface-container rounded-full overflow-hidden'>
                <div className='h-full bg-primary' style={{ width: '62%' }} />
              </div>
              <div className='grid grid-cols-2 gap-4 mt-6'>
                <div className='p-3 bg-surface-container-low rounded-lg truncate'>
                  <p className='text-[8px] sm:text-[10px] text-outline font-bold uppercase mb-1'>
                    Cá nhân
                  </p>
                  <p className='text-xs sm:text-sm font-bold'>2.450.000đ</p>
                </div>
                <div className='p-3 bg-surface-container-low rounded-lg truncate'>
                  <p className='text-[8px] sm:text-[10px] text-outline font-bold uppercase mb-1'>
                    Chờ duyệt
                  </p>
                  <p className='text-xs sm:text-sm font-bold text-tertiary'>850.000đ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Widget */}
          <div className='bg-primary text-white p-6 rounded-xl sm:rounded-2xl shadow-lg relative overflow-hidden'>
            <div className='flex justify-between items-start relative z-10'>
              <div>
                <p className='text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1'>
                  Thời tiết Phú Quốc
                </p>
                <h3 className='text-2xl sm:text-3xl font-bold'>31°C</h3>
              </div>
              <Sun size={40} className='sm:size-12 opacity-80' />
            </div>
            <p className='text-[10px] sm:text-sm mt-4 opacity-90 leading-relaxed font-medium relative z-10'>
              Nắng đẹp, phù hợp cho các hoạt động ngoài trời tại Bãi Sao chiều nay.
            </p>
            <div className='absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl' />
          </div>
        </div>
      </div>
    </div>
  )
}

function ItineraryModal({ onClose, onAddPlace }: { onClose: () => void; onAddPlace: () => void }) {
  const [selectedDate, setSelectedDate] = useState('15')
  const [internalEditingActivity, setInternalEditingActivity] = useState<any>(null)
  const { showToast } = useToast()

  const vietnamNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }))

  const isWithin30Mins = (timeStr: string) => {
    if (!timeStr) return false
    const [hours, minutes] = timeStr.split(':').map(Number)
    const activityTime = new Date(vietnamNow)
    activityTime.setHours(hours, minutes, 0, 0)
    const diff = activityTime.getTime() - vietnamNow.getTime()
    return diff >= -5 * 60 * 1000 && diff <= 30 * 60 * 1000
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
      },
      { id: 'm2', time: '08:30', name: 'Tham quan Hồ Tuyền Lâm', address: 'P4, Đà Lạt' },
    ],
    afternoon: [
      {
        id: 'a1',
        time: '12:30',
        name: 'Ăn hải sản',
        address: 'Bãi Sao, Phú Quốc',
        image:
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop',
      },
      { id: 'a2', time: '15:30', name: 'Tham quan Bãi Sao', address: 'Phú Quốc' },
    ],
    evening: [
      {
        id: 'e1',
        time: '17:45',
        name: 'Ngắm hoàng hôn',
        address: 'Sunset Sanato',
        image:
          'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=400&auto=format&fit=crop',
      },
      { id: 'e2', time: '20:00', name: 'Dạo chợ đêm', address: 'Dương Đông' },
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
        className='relative bg-white w-full max-w-5xl h-fit max-h-[85vh] rounded-[32px] shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col'
      >
        <div className='p-5 sm:p-6 flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-low/30'>
          <div className='flex items-center gap-4'>
            <div className='p-2 sm:p-3 bg-primary text-white rounded-xl sm:rounded-2xl shadow-lg'>
              <Compass size={20} />
            </div>
            <div>
              <h2 className='text-lg sm:text-xl font-black text-on-surface tracking-tighter'>
                Phân loại lộ trình
              </h2>
              <p className='text-[9px] font-bold text-outline uppercase tracking-[0.2em] mt-0.5'>
                Đà Lạt - Phú Quốc • 2026
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            className='p-2 hover:bg-surface-container rounded-full transition-all'
          >
            <X size={20} />
          </Button>
        </div>

        <div className='overflow-y-auto p-4 sm:p-6 pb-2'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
            <ItinerarySection
              title='Buổi sáng'
              icon={<Coffee size={18} />}
              items={timelineData.morning}
              color='text-orange-600'
              bgColor='bg-orange-100'
              isWithin30Mins={isWithin30Mins}
              onItemClick={(item: any) => setInternalEditingActivity(item)}
            />
            <ItinerarySection
              title='Trưa - Chiều'
              icon={<Utensils size={18} />}
              items={timelineData.afternoon}
              color='text-primary'
              bgColor='bg-primary/10'
              isWithin30Mins={isWithin30Mins}
              onItemClick={(item: any) => setInternalEditingActivity(item)}
            />
            <ItinerarySection
              title='Buổi tối'
              icon={<Hotel size={18} />}
              items={timelineData.evening}
              color='text-indigo-600'
              bgColor='bg-indigo-100'
              isWithin30Mins={isWithin30Mins}
              onItemClick={(item: any) => setInternalEditingActivity(item)}
            />
          </div>
        </div>

        <AnimatePresence>
          {internalEditingActivity && (
            <ActivityEditModal
              activity={internalEditingActivity}
              onClose={() => setInternalEditingActivity(null)}
              onSave={(updated) => {
                showToast(`Đã cập nhật: ${updated.name}`, 'success')
                setInternalEditingActivity(null)
              }}
            />
          )}
        </AnimatePresence>

        <div className='p-4 sm:p-6 bg-surface-container-low/30 border-t border-outline-variant/10 text-right'></div>
      </motion.div>
    </div>
  )
}

function ItinerarySection({
  title,
  icon,
  items,
  color,
  bgColor,
  isWithin30Mins,
  onItemClick,
}: any) {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3 pb-3 border-b border-outline-variant/20'>
        <div className={`p-2 ${bgColor} ${color} rounded-xl`}>{icon}</div>
        <h3 className='text-sm font-black uppercase tracking-widest text-on-surface'>{title}</h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6'>
        {items.map((item: any, idx: number) => {
          const isImminent = isWithin30Mins(item.time)
          const isLastItem = idx === items.length - 1
          const isOddCount = items.length % 2 !== 0

          return (
            <div
              key={item.id}
              className={`flex gap-4 group ${isOddCount && isLastItem ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className='flex flex-col items-center gap-1'>
                <div
                  className={`w-2 h-2 rounded-full ${isImminent ? 'bg-secondary animate-pulse scale-125' : 'bg-primary'}`}
                />
                <div className='flex-1 w-px bg-outline-variant/40' />
              </div>
              <div className='flex-1 space-y-2'>
                <div className='flex items-center gap-2 flex-wrap min-w-0'>
                  <span
                    className={`text-[10px] font-black shrink-0 ${isImminent ? 'text-secondary' : 'text-primary'}`}
                  >
                    {item.time}
                  </span>
                  <span className='text-[10px] font-bold text-outline opacity-40'>-</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`}
                    target='_blank'
                    rel='noreferrer'
                    className='text-[10px] font-bold text-primary hover:underline truncate'
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.address}
                  </a>
                </div>
                <motion.div
                  onClick={() => onItemClick(item)}
                  animate={
                    isImminent
                      ? {
                          borderColor: ['#d6d0cc', '#f59e0b', '#d6d0cc'],
                          boxShadow: [
                            '0 0 0px rgba(245, 158, 11, 0)',
                            '0 0 10px rgba(245, 158, 11, 0.2)',
                            '0 0 0px rgba(245, 158, 11, 0)',
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`bg-surface-container/30 p-4 rounded-2xl border cursor-pointer transition-all ${
                    isImminent
                      ? 'border-secondary bg-secondary/5'
                      : 'border-outline-variant/10 group-hover:border-primary/30'
                  }`}
                >
                  <h4 className='text-sm font-bold text-on-surface mb-1 flex items-center justify-between'>
                    {item.name}
                    {isImminent && (
                      <div className='w-1.5 h-1.5 rounded-full bg-secondary animate-ping' />
                    )}
                  </h4>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className='mt-2 w-full h-24 object-cover rounded-xl shadow-sm'
                    />
                  )}
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ActivityEditModal({
  activity,
  onClose,
  onSave,
}: {
  activity: any
  onClose: () => void
  onSave: (data: any) => void
}) {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData] = useState({ ...activity })
  const [showManageParticipants, setShowManageParticipants] = useState(false)
  const [showAddEmailField, setShowAddEmailField] = useState(false)
  const [showSplitModal, setShowSplitModal] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>(null)
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Tuan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { id: 2, name: 'An', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
    { id: 3, name: 'Binh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  ])

  const [payer, setPayer] = useState('')
  const [amount, setAmount] = useState('')
  const [isCompleteExpanded, setIsCompleteExpanded] = useState(false)

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '')
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '')
    if (rawVal.length > 9) return
    setAmount(formatCurrency(rawVal))
  }

  // Check if 30 mins have passed from the activity time
  const isTimePassed = () => {
    if (!formData.time) return false
    const [hours, minutes] = formData.time.split(':').map(Number)
    const now = new Date()
    // For demo/consistency with system time
    const actDate = new Date()
    actDate.setHours(hours, minutes, 0, 0)

    const diffInMinutes = (now.getTime() - actDate.getTime()) / (1000 * 60)
    return diffInMinutes >= 30
  }

  const canComplete = isTimePassed()

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

  const handleConfirmDeleteUser = () => {
    if (userToDelete) {
      setParticipants(participants.filter((x) => x.id !== userToDelete.id))
      setUserToDelete(null)
    }
  }

  const handleDeleteActivity = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 800)
  }

  const openManageWithAdd = () => {
    setShowAddEmailField(true)
    setShowManageParticipants(true)
  }

  return (
    <div className='fixed inset-0 z-[210] flex items-center justify-center p-4'>
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
        className={`relative bg-white w-full ${canComplete ? 'max-w-sm md:max-w-3xl' : 'max-w-sm'} rounded-[32px] shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col max-h-[90vh]`}
      >
        {isLoading && (
          <div className='absolute inset-0 z-50 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center'>
            <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
            <p className='mt-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]'>
              Đang xử lý...
            </p>
          </div>
        )}

        <div className='flex justify-between items-center p-6 border-b border-outline-variant/10 shrink-0'>
          <h3 className='text-xl font-black text-on-surface tracking-tight'>Chi tiết hoạt động</h3>
          <Button
            onClick={onClose}
            className='p-2 hover:bg-surface-container rounded-full transition-colors'
          >
            <X size={20} />
          </Button>
        </div>

        <div className='flex-1 relative overflow-y-auto no-scrollbar'>
          <AnimatePresence mode='wait' initial={false}>
            {!showDeleteConfirm ? (
              <motion.div
                key='form-view'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className='p-6 sm:p-8'
              >
                <div className={`grid grid-cols-1 ${canComplete ? 'md:grid-cols-2' : ''} gap-8`}>
                  <div className='space-y-4'>
                    <div className='space-y-1.5'>
                      <label className='text-[10px] font-black text-outline uppercase tracking-[0.1em]'>
                        Tên hoạt động
                      </label>
                      <Input
                        type='text'
                        readOnly={!canComplete}
                        defaultValue={formData.name}
                        className={`w-full p-4 bg-surface-container/30 border border-outline-variant/10 rounded-2xl font-bold text-sm focus:outline-none ${!canComplete ? 'cursor-default' : 'focus:ring-2 focus:ring-primary/20'}`}
                      />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-1.5'>
                        <label className='text-[10px] font-black text-outline uppercase tracking-[0.1em]'>
                          Thời gian
                        </label>
                        <Input
                          type='text'
                          readOnly={!canComplete}
                          defaultValue={formData.time}
                          className={`w-full p-4 bg-surface-container/30 border border-outline-variant/10 rounded-2xl font-bold text-sm focus:outline-none ${!canComplete ? 'cursor-default' : 'focus:ring-2 focus:ring-primary/20'}`}
                        />
                      </div>
                      <div className='space-y-1.5'>
                        <label className='text-[10px] font-black text-outline uppercase tracking-[0.1em]'>
                          Ngày
                        </label>
                        <div className='w-full p-4 bg-surface-container/30 border border-outline-variant/10 rounded-2xl font-bold text-sm text-outline/50'>
                          15/05/2026
                        </div>
                      </div>
                    </div>

                    <div className='space-y-1.5'>
                      <label className='text-[10px] font-black text-outline uppercase tracking-[0.1em]'>
                        Vị trí
                      </label>
                      <div className='relative group'>
                        <Input
                          type='text'
                          readOnly={!canComplete}
                          defaultValue={formData.address || activity.location || 'Chưa cập nhật'}
                          className={`w-full pl-4 pr-12 py-4 bg-surface-container/30 border border-outline-variant/10 rounded-2xl font-bold text-sm focus:outline-none ${!canComplete ? 'cursor-default' : 'focus:ring-2 focus:ring-primary/20'}`}
                        />
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.address || formData.name)}`}
                          target='_blank'
                          rel='noreferrer'
                          className='absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl transition-all shadow-sm'
                        >
                          <MapPin size={18} />
                        </a>
                      </div>
                    </div>

                    <div className='pt-4 space-y-3'>
                      <div className='flex items-center justify-between'>
                        <label className='text-[10px] font-black text-outline uppercase tracking-[0.1em]'>
                          Người tham gia ({participants.length})
                        </label>
                        <Button
                          onClick={() => {
                            setShowAddEmailField(false)
                            setShowManageParticipants(true)
                          }}
                          className='text-[10px] font-bold text-primary hover:underline hover:underline-offset-4'
                        >
                          Tất cả
                        </Button>
                      </div>
                      <div className='flex items-center gap-2'>
                        {participants.slice(0, 4).map((p) => (
                          <div key={p.id} className='relative shrink-0'>
                            <img
                              src={p.avatar}
                              alt={p.name}
                              className='w-10 h-10 rounded-full border-2 border-white shadow-sm ring-1 ring-outline-variant/10'
                            />
                          </div>
                        ))}
                        {participants.length > 4 && (
                          <div className='w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-[10px] font-black text-outline border-2 border-white shadow-sm shrink-0'>
                            +{participants.length - 4}
                          </div>
                        )}
                        <Button
                          onClick={openManageWithAdd}
                          className='w-10 h-10 rounded-full border-2 border-dashed border-outline-variant/30 hover:border-primary hover:bg-primary/5 flex items-center justify-center text-outline hover:text-primary transition-all group shrink-0'
                        >
                          <Plus size={20} className='group-hover:rotate-90 transition-transform' />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`space-y-4 flex flex-col ${canComplete ? 'md:justify-center md:min-h-[300px] justify-start' : 'justify-start'}`}
                  >
                    {canComplete && (
                      <div className='space-y-4'>
                        <Button
                          onClick={() => setIsCompleteExpanded(!isCompleteExpanded)}
                          className={`w-full p-4 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-row items-center gap-4 ${isCompleteExpanded ? 'bg-primary/5 border-primary/20' : 'bg-surface-container border-outline-variant/10 hover:border-primary/30 hover:bg-primary/5'}`}
                        >
                          <div
                            className={`p-3 sm:p-4 rounded-2xl shrink-0 ${isCompleteExpanded ? 'bg-primary text-white' : 'bg-white text-primary shadow-sm'}`}
                          >
                            <TrendingUp size={24} />
                          </div>
                          <div className='text-left'>
                            <p className='text-sm font-black text-on-surface uppercase tracking-widest'>
                              Hoàn tất hoạt động
                            </p>
                            <p className='text-[10px] text-outline font-medium mt-1'>
                              {isCompleteExpanded ? 'Thu nhỏ thông tin' : 'Click để nhập chi phí'}
                            </p>
                          </div>
                        </Button>

                        <AnimatePresence>
                          {isCompleteExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className='space-y-4 overflow-hidden pt-2'
                            >
                              <div className='space-y-1.5'>
                                <label className='text-[10px] font-black text-primary uppercase tracking-[0.1em]'>
                                  Người thanh toán
                                </label>
                                <div className='relative group'>
                                  <select
                                    value={payer}
                                    onChange={(e) => setPayer(e.target.value)}
                                    className='w-full p-4 bg-white border border-primary/20 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer'
                                  >
                                    <option value=''>Chọn người chi</option>
                                    {participants.map((p) => (
                                      <option key={p.id} value={p.name}>
                                        {p.name}
                                      </option>
                                    ))}
                                  </select>
                                  <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary'>
                                    <ChevronRight size={16} className='rotate-90' />
                                  </div>
                                </div>
                              </div>
                              <div className='space-y-1.5'>
                                <label className='text-[10px] font-black text-primary uppercase tracking-[0.1em]'>
                                  Số tiền (VND)
                                </label>
                                <div className='relative'>
                                  <Input
                                    type='text'
                                    value={amount}
                                    onChange={handleAmountChange}
                                    placeholder='Nhập số tiền...'
                                    className='w-full pl-4 pr-12 py-4 bg-white border border-primary/20 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
                                  />
                                  <div className='absolute right-12 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary opacity-50 uppercase tracking-widest'>
                                    VNĐ
                                  </div>
                                  <Button
                                    onClick={() => {
                                      if (!amount || amount === '0') return
                                      setShowSplitModal(true)
                                    }}
                                    className='absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl transition-all shadow-sm'
                                  >
                                    <Calculator size={14} />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>

                <div className='flex gap-4 p-1 sm:p-8 border-t border-outline-variant/10 shrink-0 bg-white'>
                  <Button
                    onClick={() => setShowDeleteConfirm(true)}
                    className='flex-1 py-4 bg-rose-50 text-rose-500 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-rose-100 transition-all font-sans'
                  >
                    Xóa
                  </Button>
                  {canComplete && (
                    <Button
                      onClick={() => {
                        if (!payer || !amount) {
                          showToast('Vui lòng nhập đầy đủ thông tin thanh toán!', 'error')
                          setIsCompleteExpanded(true)
                          return
                        }
                        setIsLoading(true)
                        setTimeout(() => {
                          setIsLoading(false)
                          showToast('Đã chốt sổ và lưu chi phí hoạt động!', 'success')
                          onClose()
                        }, 1000)
                      }}
                      className='flex-1 py-4 bg-primary text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all font-sans'
                    >
                      Hoàn thành
                    </Button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key='confirm-view'
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className='p-8 h-full flex flex-col items-center justify-center text-center space-y-6 min-h-[460px]'
              >
                <div className='relative'>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring' }}
                    className='w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center'
                  >
                    <Trash2 size={36} />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className='absolute inset-0 bg-rose-500 rounded-full'
                  />
                </div>
                <div className='space-y-2'>
                  <h4 className='text-2xl font-black text-on-surface tracking-tight'>
                    Xác nhận xóa?
                  </h4>
                  <p className='text-sm text-outline font-medium px-4'>
                    Thao tác này sẽ xóa <b>{formData.name}</b> khỏi lộ trình và không thể hoàn tác.
                  </p>
                </div>
                <div className='flex flex-col gap-3 w-full pt-4'>
                  <Button
                    onClick={handleDeleteActivity}
                    className='w-full py-4 bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all'
                  >
                    Vẫn muốn xóa
                  </Button>
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    className='w-full py-4 bg-surface-container text-on-surface rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-outline-variant/20 transition-all'
                  >
                    Hủy, quay lại
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showSplitModal && (
            <SplitCostModal
              totalCost={parseInt(amount.replace(/\D/g, '') || '0')}
              participants={participants}
              onClose={() => setShowSplitModal(false)}
              onSave={(individualCosts) => {
                const total = Object.values(individualCosts).reduce(
                  (sum: number, val: string) => sum + parseInt(val.replace(/\D/g, '') || '0'),
                  0,
                )
                setAmount(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
                setShowSplitModal(false)
              }}
            />
          )}
          {showManageParticipants && (
            <div className='fixed inset-0 z-[250] flex items-center justify-center p-4'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowManageParticipants(false)}
                className='absolute inset-0 bg-on-background/40 backdrop-blur-[2px]'
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
                      <label className='text-[9px] font-black text-outline uppercase tracking-widest flex items-center gap-2'>
                        <UserPlus size={12} /> Nhập Email thành viên
                      </label>
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

function InviteModal({
  onClose,
  onInvite,
}: {
  onClose: () => void
  onInvite: (email: string) => void
}) {
  const [email, setEmail] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSending(true)
    setTimeout(() => {
      onInvite(email)
      setIsSending(false)
    }, 1200)
  }

  return (
    <div className='fixed inset-0 z-[200] flex items-center justify-center p-4'>
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
        className='relative bg-white w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden p-8'
      >
        <div className='mb-6'>
          <div className='w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4'>
            <UserPlus size={28} />
          </div>
          <h3 className='text-xl font-black text-on-surface tracking-tight mb-2'>
            Mời bạn đồng hành
          </h3>
          <p className='text-xs text-outline font-medium leading-relaxed'>
            Kết nối thêm thành viên để cùng nhau xây dựng lộ trình và quản lý ngân sách.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-1.5'>
            <label className='text-[10px] font-black text-outline uppercase tracking-widest pl-1'>
              Địa chỉ Email
            </label>
            <Input
              type='email'
              placeholder='example@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
              required
            />
          </div>

          <div className='flex gap-3'>
            <Button
              type='button'
              onClick={onClose}
              className='flex-1 py-4 bg-surface-container text-on-surface rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-outline-variant/20 transition-all'
            >
              Hủy
            </Button>
            <Button
              type='submit'
              disabled={isSending || !email}
              className='flex-2 py-4 bg-primary text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center'
            >
              {isSending ? (
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
              ) : (
                'Gửi lời mời'
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  change,
  icon,
  color,
}: {
  label: string
  value: string
  change: string
  icon: any
  color: string
}) {
  return (
    <div className='bg-white p-4 rounded-xl sm:rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between hover:shadow-md transition-all'>
      <div className='flex justify-between items-start mb-4'>
        <div className={`p-1.5 sm:p-2 rounded-[4px] text-white ${color} shadow-sm`}>{icon}</div>
        <span className={`text-[8px] sm:text-[10px] font-bold ${color.replace('bg-', 'text-')}`}>
          {change}
        </span>
      </div>
      <div>
        <p className='text-[8px] sm:text-[10px] text-outline font-bold uppercase tracking-wider mb-1'>
          {label}
        </p>
        <h3 className='text-sm sm:text-lg font-bold text-on-surface truncate'>{value}</h3>
      </div>
    </div>
  )
}

function QuickActionButton({
  icon,
  label,
  onClick,
}: {
  icon: any
  label: string
  onClick?: () => void
}) {
  return (
    <Button
      onClick={onClick}
      className='flex flex-col items-center justify-center gap-1 sm:gap-3 p-2 sm:p-4 border-2 border-outline-variant rounded-[4px] hover:border-primary hover:bg-primary/5 hover:text-primary transition-all group'
    >
      <div className='text-primary group-hover:scale-110 transition-transform scale-75 sm:scale-100'>
        {icon}
      </div>
      <span className='text-[7px] sm:text-[10px] font-bold uppercase tracking-wider text-center line-clamp-1 sm:line-clamp-2'>
        {label}
      </span>
    </Button>
  )
}

function ActivityItem({
  activity,
  onUserClick,
  onImageClick,
}: {
  activity: any
  onUserClick?: (user: any) => void
  onImageClick?: (url: string) => void
  key?: string
}) {
  const iconMap: any = {
    expense: Receipt,
    schedule: Edit,
    member: UserPlus,
  }
  const colorMap: any = {
    expense: 'bg-primary',
    schedule: 'bg-tertiary',
    member: 'bg-secondary',
  }
  const Icon = iconMap[activity.type] || Info

  const handleContentClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.innerText.includes('Hoa-don.jpg')) {
      onImageClick?.(
        'https://images.unsplash.com/photo-1554224155-6b0936a2e418?q=80&w=1000&auto=format&fit=crop',
      )
    }
  }

  return (
    <div className='flex gap-3 sm:gap-4'>
      <div
        className='relative shrink-0 cursor-pointer group/avatar'
        onClick={() => onUserClick?.(activity.user)}
      >
        <img
          src={activity.user.avatar}
          alt={activity.user.name}
          className='w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-outline-variant group-hover/avatar:border-primary transition-all'
        />
      </div>
      <div className='grow space-y-2 overflow-hidden'>
        <div className='flex justify-between items-start gap-3'>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 text-xs sm:text-sm text-on-surface leading-tight'>
              <span onClick={handleContentClick} className='truncate'>
                <span className='font-bold'>{activity.user.name}</span> {activity.description}
                {activity.target && <span className='font-bold'> "{activity.target}"</span>}
              </span>
              <div
                className={`shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px] ${colorMap[activity.type]} rounded-full flex items-center justify-center text-white shadow-sm shadow-black/5`}
              >
                <Icon size={10} className='sm:size-[11px]' />
              </div>
            </div>
          </div>
          <span className='text-[8px] sm:text-[10px] text-outline font-bold whitespace-nowrap mt-0.5'>
            {activity.timestamp}
          </span>
        </div>

        {activity.type === 'expense' && (
          <div className='p-2 sm:p-3 bg-surface-container-low rounded-lg sm:rounded-xl border border-outline-variant flex items-center justify-between'>
            <div className='flex items-center gap-2 overflow-hidden'>
              <Info size={12} className='sm:size-14 text-outline shrink-0' />
              <Button
                onClick={() =>
                  onImageClick?.(
                    'https://images.unsplash.com/photo-1554224155-6b0936a2e418?q=80&w=1000&auto=format&fit=crop',
                  )
                }
                className='text-[10px] sm:text-xs text-primary font-bold hover:underline truncate'
              >
                {activity.attachment || 'Minh chứng chi phí'}
              </Button>
            </div>
            <span className='text-xs sm:text-sm font-bold shrink-0 ml-2'>{activity.amount}</span>
          </div>
        )}

        {activity.type === 'schedule' && activity.attachment && (
          <p className='text-[10px] sm:text-xs text-on-surface-variant italic leading-relaxed border-l-3 border-primary/20 pl-3 py-1'>
            "{activity.attachment}"
          </p>
        )}
      </div>
    </div>
  )
}
