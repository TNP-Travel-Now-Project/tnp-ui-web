import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  Camera,
  CreditCard,
  Globe,
  Info,
  Languages,
  Lock,
  Mail,
  MessageSquare,
  Moon,
  Plus,
  Settings as SettingsIcon,
  Shield,
  Smartphone,
  User,
  Wallet,
  X,
} from 'lucide-react'
import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { DatePickerWithTime } from '@/shared/components/composite/DatePickerWithTime'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/overlay'
import { useModalScrollLock } from '@/shared/hook/useModalScrollLock'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: TabType
}

type TabType = 'personal' | 'security' | 'finance' | 'notifications' | 'settings'

export default function ProfileModal({
  isOpen,
  onClose,
  initialTab = 'personal',
}: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)

  // Update active tab when initialTab changes (e.g. when opening from different sidebar items)
  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  // Apply scroll lock when modal is open
  useModalScrollLock(isOpen)

  const [gender, setGender] = useState<'Nam' | 'Nữ' | 'Khác'>('Nam')

  const tabs = [
    { id: 'personal', label: 'Thông tin cá nhân', icon: User },
    { id: 'security', label: 'Bảo mật tài khoản', icon: Shield },
    { id: 'finance', label: 'Ví & Tài chính', icon: Wallet },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: SettingsIcon },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]'
          />

          {/* Modal */}
          <div className='fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4'>
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className='relative bg-background w-full sm:max-w-4xl rounded-t-[32px] sm:rounded-[32px] shadow-2xl flex flex-col overflow-hidden h-[92vh] sm:h-auto max-h-[95vh] sm:max-h-[90vh]'
            >
              {/* Modal Header */}
              <div className='px-6 py-2 sm:py-3 sm:px-8 border-b border-outline-variant/30 flex items-center justify-between bg-white z-10'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
                    <User size={18} />
                  </div>
                  <div>
                    <h2 className='text-base sm:text-xl font-black text-on-surface tracking-tight'>
                      Cài đặt tài khoản
                    </h2>
                    <p className='text-[10px] text-outline font-medium hidden sm:block'>
                      Quản lý thông tin và bảo mật cá nhân
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className='p-2 hover:bg-surface-container rounded-full transition-colors text-outline hover:text-on-surface'
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className='flex-1 flex overflow-hidden'>
                {/* Slim Sidebar Navigation */}
                <div className='w-14 sm:w-16 md:w-20 bg-surface-container flex flex-col items-center py-8 border-r border-outline-variant/30 flex-shrink-0'>
                  <div className='flex-1 flex flex-col gap-4'>
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as TabType)}
                          className={`relative group p-3 sm:p-4 rounded-full transition-all duration-300 ${
                            activeTab === tab.id
                              ? 'bg-primary text-white shadow-lg shadow-primary/20'
                              : 'text-outline/60 hover:text-primary hover:bg-primary/5'
                          }`}
                        >
                          <Icon className='size-5 sm:size-6' />
                          {activeTab === tab.id && (
                            <motion.div
                              layoutId='active-nav-dot'
                              className='absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(201,153,107,1)]'
                            />
                          )}

                          {/* Tooltip Label */}
                          <div className='absolute left-full ml-4 px-3 py-1.5 bg-on-surface text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl hidden md:block'>
                            {tab.label}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Content Area */}
                <div className='flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pt-16 sm:pt-20 no-scrollbar bg-white'>
                  <div className='max-w-3xl mx-auto'>
                    {/* Tab Header - Compact and Balanced */}
                    <div className='mb-8 flex items-start justify-between gap-6 relative'>
                      <div className='pt-2'>
                        <h3 className='text-2xl sm:text-3xl font-black text-on-surface tracking-tighter'>
                          {tabs.find((t) => t.id === activeTab)?.label}
                        </h3>
                        <p className='text-[10px] sm:text-xs text-outline font-medium mt-1'>
                          {activeTab === 'personal'
                            ? 'Cập nhật ảnh đại diện và thông tin cơ bản của bạn.'
                            : 'Quản lý thông tin tài khoản của bạn'}
                        </p>
                      </div>

                      <div className='flex items-center gap-4 shrink-0'>
                        {activeTab === 'finance' && (
                          <button className='flex items-center gap-2 text-primary font-black text-xs bg-primary/10 px-4 py-2 rounded-full hover:bg-primary/20 transition-all shadow-sm'>
                            <Plus size={14} /> Thêm ví mới
                          </button>
                        )}

                        {activeTab === 'personal' && (
                          <GenderAvatar gender={gender} onGenderChange={setGender} />
                        )}
                      </div>
                    </div>

                    <div className='space-y-6'>
                      {activeTab === 'personal' && (
                        <PersonalInfoView gender={gender} setGender={setGender} />
                      )}
                      {activeTab === 'security' && <SecurityView />}
                      {activeTab === 'finance' && <FinanceView />}
                      {activeTab === 'notifications' && <NotificationsView />}
                      {activeTab === 'settings' && <SettingsView />}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

function GenderAvatar({
  gender,
  onGenderChange,
}: {
  gender: 'Nam' | 'Nữ' | 'Khác'
  onGenderChange: (g: 'Nam' | 'Nữ' | 'Khác') => void
}) {
  const [avatar, setAvatar] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD2TLzey_rvR3RLYd4skh0wp5_tpZnVFMr2v_QT9m_Zq5K50hDUKa36YQYikfcaJDSZ3Xsyi_FPFY3JlEGRZdanoVBlvbf-e6K_ta28M-cT5xK1ZbRMAF_NP7K0OEKyagXrs8lx3J5NwN31tgmEFYDTMnRut620qsRhK2CGci86ZL8DjHPgFKz3nKNloBFTB7VS0U436bLxxc6mA33uNiv6ZavY-O8D_kNHWgjdPULdHBICM5Lr51NHawrn8A9kOAPQvH_P_lVF7Ld4',
  )

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const newAvatar = event.target.result as string
          setAvatar(newAvatar)
          // Sync with the avatar in the header
          const img = document.getElementById('profile-avatar-img') as HTMLImageElement
          if (img) img.src = newAvatar
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const getGenderIcon = (g: string) => {
    switch (g) {
      case 'Nam':
        return '♂'
      case 'Nữ':
        return '♀'
      default:
        return '⚤'
    }
  }

  const otherOptions = (['Nam', 'Nữ', 'Khác'] as const).filter((g) => g !== gender)

  return (
    <div className='relative'>
      {/* Avatar Container */}
      <div className='relative group cursor-pointer'>
        <div
          onClick={() => (document.getElementById('avatar-input') as HTMLInputElement)?.click()}
          className='w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-primary/10 relative z-0'
        >
          <img
            src={avatar}
            alt='Profile'
            className='w-full h-full object-cover'
            id='profile-avatar-img'
          />
          <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
            <Camera size={20} className='text-white' />
          </div>
        </div>

        <div className='absolute -top-0.5 -right-0.5 z-30'>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[12px] sm:text-[13px] font-black transition-all outline-none ring-0 ${
                  gender === 'Nam'
                    ? 'bg-blue-500 text-white'
                    : gender === 'Nữ'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-500 text-white'
                }`}
              >
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className='flex items-center justify-center pointer-events-none'
                >
                  {getGenderIcon(gender)}
                </motion.span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              side='right'
              align='center'
              sideOffset={10}
              className='p-0 border-none shadow-none bg-transparent w-auto'
            >
              <motion.div
                initial={{ opacity: 0, x: -15, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className='flex flex-row items-center gap-1.5 p-1.5 bg-white rounded-full shadow-2xl border border-outline-variant/10 relative'
                style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.15))' }}
              >
                {otherOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => onGenderChange(opt)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xl font-black transition-all hover:scale-110 active:scale-95 ${
                      opt === 'Nam'
                        ? 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                        : opt === 'Nữ'
                          ? 'bg-pink-50 text-pink-500 hover:bg-pink-100'
                          : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {getGenderIcon(opt)}
                  </button>
                ))}

                {/* Smoke tail puffs */}
                <div className='absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-l border-b border-outline-variant/10' />
                <div className='absolute top-[40%] -left-3.5 w-2.5 h-2.5 bg-white rounded-full opacity-70' />
                <div className='absolute top-[60%] -left-5 w-1.5 h-1.5 bg-white rounded-full opacity-40' />
              </motion.div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <input
        type='file'
        id='avatar-input'
        onChange={handleAvatarChange}
        accept='image/jpeg, image/png'
        className='hidden'
      />
    </div>
  )
}

function PersonalInfoView({
  gender,
  setGender,
}: {
  gender: 'Nam' | 'Nữ' | 'Khác'
  setGender: (g: 'Nam' | 'Nữ' | 'Khác') => void
}) {
  const [birthday, setBirthday] = useState<Date | null>(new Date('1995-10-24'))

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className='space-y-4'
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
        <div className='space-y-1.5'>
          <label className='text-[10px] sm:text-xs font-bold text-on-surface opacity-60'>
            Tên đầy đủ
          </label>
          <input
            type='text'
            defaultValue='Tuấn Nguyễn'
            className='w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
          />
        </div>
        <div className='space-y-1.5'>
          <label className='text-[10px] sm:text-xs font-bold text-on-surface opacity-60'>
            Username
          </label>
          <input
            type='text'
            defaultValue='tuan.explorer'
            className='w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
        <div className='space-y-1.5'>
          <label className='text-[10px] sm:text-xs font-bold text-on-surface opacity-60'>
            Số điện thoại
          </label>
          <input
            type='tel'
            defaultValue='0987 654 321'
            className='w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
          />
        </div>
        <div className='space-y-1.5'>
          <label className='text-[10px] sm:text-xs font-bold text-on-surface opacity-60'>
            Ngày sinh
          </label>
          <div className='h-[38px] sm:h-[42px]'>
            <DatePickerWithTime date={birthday} onChange={setBirthday} />
          </div>
        </div>
      </div>

      <div className='space-y-1.5'>
        <label className='text-[10px] sm:text-xs font-bold text-on-surface opacity-60'>Bio</label>
        <textarea
          className='w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none h-20 sm:h-24 resize-none transition-all leading-relaxed'
          placeholder='Hãy giới thiệu một chút về bạn...'
        ></textarea>
      </div>

      <div className='flex justify-end pt-2'>
        <button className='w-full sm:w-auto px-10 py-2 sm:py-2.5 bg-primary text-white rounded-lg font-black text-xs shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95'>
          Lưu thay đổi
        </button>
      </div>
    </motion.div>
  )
}

function SecurityView() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className='space-y-4'>
        <div className='p-3.5 sm:p-4 bg-surface-container rounded-2xl flex items-center justify-between border border-outline-variant/10'>
          <div className='flex items-center gap-3 sm:gap-4 overflow-hidden'>
            <div className='p-2 sm:p-2.5 bg-white rounded-xl text-primary shadow-sm flex-shrink-0'>
              <Lock size={18} />
            </div>
            <div className='min-w-0'>
              <p className='text-[11px] sm:text-sm font-black'>Đổi mật khẩu</p>
              <p className='text-[10px] sm:text-xs text-outline mt-0.5 truncate'>
                Đổi định kỳ để bảo mật.
              </p>
            </div>
          </div>
          <button className='text-primary font-bold text-[10px] sm:text-sm hover:underline flex-shrink-0 ml-2'>
            Thay đổi
          </button>
        </div>

        <div className='p-3.5 sm:p-4 bg-surface-container rounded-2xl flex items-center justify-between border border-outline-variant/10'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <div className='p-2 sm:p-2.5 bg-white rounded-xl text-primary shadow-sm'>
              <Smartphone size={18} />
            </div>
            <div>
              <p className='text-[11px] sm:text-sm font-black'>Xác thực 2 lớp (2FA)</p>
              <p className='text-[10px] sm:text-xs text-outline mt-0.5'>Đang bật (SĐT: ****920)</p>
            </div>
          </div>
          <button className='text-error font-bold text-[10px] sm:text-sm hover:underline flex-shrink-0'>
            Tắt
          </button>
        </div>

        <div className='space-y-3 pt-4'>
          <h4 className='text-[10px] sm:text-xs font-black uppercase tracking-widest text-outline'>
            Thiết bị đã đăng nhập
          </h4>
          <div className='space-y-2.5'>
            {[1, 2].map((i) => (
              <div
                key={i}
                className='flex items-center justify-between p-3 border border-outline-variant/30 rounded-xl bg-surface/30'
              >
                <div className='flex items-center gap-2.5'>
                  <Smartphone size={14} className='text-outline/60' />
                  <div>
                    <p className='text-[10px] sm:text-xs font-black'>
                      iPhone 15 Pro • TP. Hồ Chí Minh
                    </p>
                    <p className='text-[9px] sm:text-[10px] text-outline'>
                      Đang hoạt động • 12 phút trước
                    </p>
                  </div>
                </div>
                <button className='text-[9px] sm:text-[10px] font-bold text-error flex-shrink-0 bg-error/5 px-2 py-1 rounded-[4px]'>
                  Đăng xuất
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FinanceView() {
  const [qrImage, setQrImage] = useState<string | null>(null)
  const qrInputRef = useRef<HTMLInputElement>(null)

  const handleQrChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setQrImage(url)
    }
  }

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const wallets = [
    { name: 'Tiền mặt', balance: 11250000, type: 'Cash', color: 'bg-primary' },
    { name: 'Techcombank', balance: 60000000, type: 'Bank', color: 'bg-blue-600' },
    { name: 'Ví Momo', balance: 3000000, type: 'E-Wallet', color: 'bg-pink-600' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className='space-y-6'
    >
      {/* QR Section */}
      <div className='p-4 sm:p-6 bg-primary/5 rounded-3xl border-2 border-dashed border-primary/20 flex flex-col items-center gap-4'>
        <div className='text-center'>
          <p className='text-[10px] sm:text-xs font-black text-primary uppercase tracking-widest mb-1'>
            Mã QR Thanh toán
          </p>
          <p className='text-[9px] sm:text-[10px] text-outline font-medium'>
            Dùng để nhận tiền từ các thành viên trong nhóm
          </p>
        </div>

        <div
          onClick={() => qrInputRef.current?.click()}
          className='w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-2xl border border-outline-variant/30 shadow-inner flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-all overflow-hidden relative group'
        >
          {qrImage ? (
            <img src={qrImage} alt='QR Code' className='w-full h-full object-cover' />
          ) : (
            <div className='flex flex-col items-center gap-2 opacity-40'>
              <Camera size={32} />
              <span className='text-[10px] font-bold uppercase tracking-widest'>Chọn ảnh QR</span>
            </div>
          )}
          <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
            <p className='text-white text-[10px] font-bold uppercase tracking-widest'>Thay đổi</p>
          </div>
        </div>

        <input
          type='file'
          ref={qrInputRef}
          onChange={handleQrChange}
          accept='image/*'
          className='hidden'
        />

        <div className='flex flex-col sm:flex-row gap-2 w-full'>
          <button
            onClick={() => qrInputRef.current?.click()}
            className='flex-1 px-6 py-3 bg-primary text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all ring-4 ring-primary/10'
          >
            Chọn QR nhận tiền
          </button>
          <button
            onClick={() => qrInputRef.current?.click()}
            className='flex-1 px-6 py-3 border-2 border-primary text-primary text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full hover:bg-primary/5 active:scale-95 transition-all'
          >
            Cập nhật QR
          </button>
        </div>
      </div>

      <div className='space-y-3'>
        <h4 className='text-[10px] sm:text-xs font-black uppercase tracking-widest text-outline pl-1'>
          Danh sách tài khoản
        </h4>
        {wallets.map((wallet) => (
          <div
            key={wallet.name}
            className='p-4 sm:p-5 border border-outline-variant/30 rounded-2xl flex items-center justify-between hover:bg-surface-container hover:border-primary/30 transition-all cursor-pointer group bg-surface-container/20'
          >
            <div className='flex items-center gap-4 sm:gap-5'>
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${wallet.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform`}
              >
                <CreditCard size={20} />
              </div>
              <div>
                <p className='text-xs sm:text-base font-black'>{wallet.name}</p>
                <p className='text-[10px] sm:text-xs text-outline font-medium'>{wallet.type}</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-base sm:text-xl font-black text-on-surface tracking-tighter'>
                {formatVND(wallet.balance)}
              </p>
              <div className='flex items-center justify-end gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0'>
                <span className='text-[9px] font-black uppercase tracking-tighter'>Chi tiết</span>
                <Plus size={10} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function NotificationsView() {
  const [settings, setSettings] = useState([
    {
      id: 'email',
      title: 'Thông báo Email',
      desc: 'Nhận tóm tắt chi phí qua email',
      icon: Mail,
      enabled: true,
    },
    {
      id: 'push',
      title: 'Thông báo Push',
      desc: 'Cập nhật chuyến đi trên điện thoại',
      icon: Bell,
      enabled: true,
    },
    {
      id: 'chat',
      title: 'Tin nhắn nhóm',
      desc: 'Hiển thị tin nhắn riêng tư',
      icon: MessageSquare,
      enabled: false,
    },
  ])

  const toggleSetting = (id: string) => {
    setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className='space-y-4'>
        {settings.map((item) => (
          <div
            key={item.title}
            className='flex items-center justify-between p-3 border border-outline-variant/10 rounded-2xl bg-surface-container/30'
          >
            <div className='flex items-center gap-3 sm:gap-4'>
              <div className='p-2 sm:p-2.5 bg-surface-container rounded-xl text-primary shadow-inner'>
                <item.icon size={18} />
              </div>
              <div>
                <p className='text-[11px] sm:text-sm font-black'>{item.title}</p>
                <p className='text-[9px] sm:text-xs text-outline font-medium mt-0.5'>{item.desc}</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting(item.id)}
              className={`w-9 h-5 sm:w-10 sm:h-5.5 rounded-full relative transition-all duration-300 ${item.enabled ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-outline-variant/40'}`}
            >
              <div
                className={`absolute top-1 w-3 sm:w-3.5 h-3 sm:h-3.5 bg-white rounded-full transition-all shadow-sm ${item.enabled ? 'right-1' : 'left-1'}`}
              />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function SettingsView() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className='space-y-6'
    >
      <div className='space-y-4'>
        <h4 className='text-xs font-black uppercase tracking-widest text-outline'>
          Giao diện & Trải nghiệm
        </h4>

        <div className='p-4 bg-surface-container rounded-2xl border border-outline-variant/10 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='p-2 bg-white rounded-xl text-primary shadow-sm'>
              <Moon size={18} />
            </div>
            <div>
              <p className='text-sm font-black'>Chế độ tối (Dark Mode)</p>
              <p className='text-xs text-outline mt-0.5'>Tiết kiệm pin và dịu mắt hơn.</p>
            </div>
          </div>
          <button className='w-10 h-5.5 rounded-full bg-outline-variant/40 relative'>
            <div className='absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full shadow-sm' />
          </button>
        </div>

        <div className='p-4 bg-surface-container rounded-2xl border border-outline-variant/10 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='p-2 bg-white rounded-xl text-primary shadow-sm'>
              <Languages size={18} />
            </div>
            <div>
              <p className='text-sm font-black'>Ngôn ngữ</p>
              <p className='text-xs text-outline mt-0.5'>Tiếng Việt (Mặc định)</p>
            </div>
          </div>
          <button className='text-primary font-bold text-sm hover:underline'>Thay đổi</button>
        </div>
      </div>

      <div className='space-y-4 pt-4'>
        <h4 className='text-xs font-black uppercase tracking-widest text-outline'>
          Dữ liệu & Quyền riêng tư
        </h4>

        <div className='p-4 bg-surface-container rounded-2xl border border-outline-variant/10 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='p-2 bg-white rounded-xl text-primary shadow-sm'>
              <Globe size={18} />
            </div>
            <div>
              <p className='text-sm font-black'>Vùng & Quốc gia</p>
              <p className='text-xs text-outline mt-0.5'>Việt Nam (UTC+7)</p>
            </div>
          </div>
          <button className='text-primary font-bold text-sm hover:underline'>Thay đổi</button>
        </div>
      </div>
    </motion.div>
  )
}
