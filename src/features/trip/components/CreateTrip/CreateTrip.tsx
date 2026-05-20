import { 
  MapPin, ChevronLeft, CalendarCheck, 
  History, ArrowRight, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CreateTripProps {
  onBack: () => void;
  onPlanning: () => void;
}

export default function CreateTrip({ onBack, onPlanning }: CreateTripProps) {
  const recentPlaces = [
    {
      id: 'p1',
      name: 'Mơ Đi Hội Cafe',
      location: 'Quận 1, TP. Hồ Chí Minh',
      distance: '500m',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCQakA9lZJTVVxH2hFxhdtYllwdp_h2pVNwMxI-8akTYzB8ZoLuI2ax5Bv6n24tkZ4CE73fk-Vwk_rdwfTxkINYEOwmrKHvwJ8QxosVpje8pR3cQ6VjzmG8_OFG10aFUiMiayzK37zLvQSxy7ydawjdGbYvo8PbkedbHuKRRD2_fveTMBUllcjztvRS8V_tclb2e-5VoA6-nI7R0fEcSAntVlde1bKmNNiCqystE_5kVAabiLAiFshn1JsdqHZnzPMkbLtm3vxaCS3'
    },
    {
      id: 'p2',
      name: 'The Log Restaurant',
      location: 'Quận 3, TP. Hồ Chí Minh',
      distance: '1.2km',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQp4tOWqw98pvtvukVGyIh9MOAv7M5l3-XhhLpziTG5ZeL1DVA22dXFx1MZaBkHEBngg7dBqk1ZMZpXp5V76qCUbL0D-DxLu_r_HE1jX5sDVtstVmIJYbbFvPp5VwTNHRVuwbi34cWU3nfVy-Xbtm1IozK0ZbSZ5iKe9GXAbrBfHwuhrxtGWsyDrhFJ0tFvlkJ8zU-F6s1NrxCWMiqZOXHpwHSxR_MuXT78xYQsuX0B6GsrYotDCSBFC0JWejdbWQ38l4PNVogNXkv'
    },
    {
      id: 'p3',
      name: 'Oriental Tea Room',
      location: 'Quận 1, TP. Hồ Chí Minh',
      distance: '800m',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCQakA9lZJTVVxH2hFxhdtYllwdp_h2pVNwMxI-8akTYzB8ZoLuI2ax5Bv6n24tkZ4CE73fk-Vwk_rdwfTxkINYEOwmrKHvwJ8QxosVpje8pR3cQ6VjzmG8_OFG10aFUiMiayzK37zLvQSxy7ydawjdGbYvo8PbkedbHuKRRD2_fveTMBUllcjztvRS8V_tclb2e-5VoA6-nI7R0fEcSAntVlde1bKmNNiCqystE_5kVAabiLAiFshn1JsdqHZnzPMkbLtm3vxaCS3'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 pb-20"
    >
      {/* Header */}
      <section className="flex items-center gap-3 sm:gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-white border border-outline-variant rounded-full text-on-surface hover:bg-surface-container transition-all shadow-sm shrink-0"
        >
          <ChevronLeft size={20} className="sm:size-6" />
        </button>
        <div className="min-w-0">
          <h2 className="text-xl sm:text-3xl font-black text-on-surface tracking-tighter truncate leading-tight">Bắt đầu chuyến đi</h2>
          <p className="text-[10px] sm:text-sm font-medium text-outline/60 truncate uppercase tracking-widest sm:normal-case sm:tracking-normal">Lên kế hoạch hoàn hảo cho hành trình</p>
        </div>
      </section>

      {/* Hero Planner Section */}
      <section className="flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="relative group rounded-[20px] overflow-hidden cursor-pointer border border-[#d6d0cc]/40 shadow-2xl h-[280px] sm:h-[420px]"
          >
            <motion.img 
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_8ECy3MK0opNLbvk9SKZhpK8tmeQ9Jx4nZAiiaaReKyUuzz1_s8i1jDdllYtbdSc9OKRxHiZ6tW34Z2X8W_udnDnrMpUccUoaHxjsiDC42_T4DcqjmdI8bog82pz-v1o4TnLYsXdodG6nXQ_uTm3UDcBVKOp7Id7wxCvzxq6zgidIatH3WU7y0Ko4RzqKJIpRsOB4pqC9lyZ-KY-D56CFyALntAjlXVQq4CcM1TFxk-FmI6Ra8N0HJtXE4zK9OXd7EC9QuNQ4Izcb"
              alt="Planner Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
              <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                <Sparkles className="text-primary-container" size={20} />
              </div>
            </div>

            <div className="absolute bottom-10 sm:bottom-16 left-0 px-6 sm:px-16 w-full">
              <motion.h4 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-2xl sm:text-5xl font-black mb-3 sm:mb-6 tracking-tighter leading-tight max-w-3xl"
              >
                <span className="sm:hidden">Khám phá <br /> điểm đến mới</span>
                <span className="hidden sm:block">Khám phá & Lên lịch trình <br /> cho chuyến đi mới</span>
              </motion.h4>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.5 }}
                className="text-white text-[10px] sm:text-lg font-medium max-w-2xl leading-relaxed opacity-80"
              >
                Tự do sáng tạo lộ trình, quản lý chi phí và kết nối các điểm đến tuyệt vời nhất cùng bạn bè.
              </motion.p>
            </div>
          </motion.div>
          
          <div className="flex justify-center -mt-8 sm:-mt-12 relative z-10 px-4">
            <motion.button 
              onClick={onPlanning}
              whileHover={{ scale: 1.05, y: -6, boxShadow: "0 25px 50px -12px rgba(29,107,64,0.4)" }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ["0 15px 30px -12px rgba(29,107,64,0.3)", "0 15px 30px -12px rgba(29,107,64,0.5)", "0 15px 30px -12px rgba(29,107,64,0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full max-w-xs sm:max-w-none sm:w-auto px-8 py-3.5 sm:px-16 sm:py-5 bg-primary text-white rounded-[4px] font-black text-sm sm:text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 sm:gap-4"
            >
              <CalendarCheck size={20} className="sm:size-6 stroke-[2.5]" />
              Lên lịch ngay
            </motion.button>
          </div>
        </div>
      </section>

      {/* Recent Places (New User State) */}
      <section className="pt-6 sm:pt-14">
        <div className="flex items-center justify-between mb-6 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-primary/10 rounded-xl sm:rounded-2xl text-primary shadow-sm">
              <History size={18} className="sm:size-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-on-surface tracking-tight leading-none mb-1">Gợi ý từ lịch sử</h2>
              <p className="text-[10px] sm:text-xs font-bold text-outline uppercase tracking-widest opacity-60">Dành riêng cho bạn</p>
            </div>
          </div>
        </div>

        {/* Empty State for New User */}
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-surface-container/30 border-2 border-dashed border-outline-variant/30 p-10 sm:p-20 text-center flex flex-col items-center">
          <div className="mb-6 relative">
            <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full" />
            <Sparkles className="text-primary relative z-10" size={48} />
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-on-surface mb-3 tracking-tight">Chào mừng nhà lữ hành mới!</h3>
          <p className="text-xs sm:text-base font-medium text-outline max-w-md mx-auto mb-8 leading-relaxed">
            Bạn chưa có lịch sử tìm kiếm. Hãy bắt đầu bằng cách tìm kiếm những địa điểm thú vị để lưu vào danh sách gợi ý nhé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-on-surface text-white rounded-full font-bold text-xs sm:text-sm shadow-xl active:scale-95 transition-all">
              Khám phá ngay
            </button>
            <button className="px-8 py-3 bg-white border border-outline-variant text-on-surface rounded-full font-bold text-xs sm:text-sm hover:bg-surface-container transition-all">
              Xem hướng dẫn
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 opacity-10 rotate-12 hidden sm:block">
            <MapPin size={64} />
          </div>
          <div className="absolute bottom-10 right-10 opacity-10 -rotate-12 hidden sm:block">
            <ArrowRight size={64} />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
