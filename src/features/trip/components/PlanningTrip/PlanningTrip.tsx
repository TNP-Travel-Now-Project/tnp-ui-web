import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Plus, Calendar, Users, Wallet, Camera, 
  Search, ChevronLeft, ChevronRight, Sparkles, X, MapPin, Map,
  UserPlus, Mail
} from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useToast } from '@/shared/hook/useToast';
import { DatePickerWithTime } from '@/shared/components/composite/DatePickerWithTime';
import { useModalScrollLock } from '@/shared/hook/useModalScrollLock';

interface PlanningTripProps {
  onBack: () => void;
  onNext: () => void;
}

export default function PlanningTrip({ onBack, onNext }: PlanningTripProps) {
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date('2026-05-03'));
  const [endDate, setEndDate] = useState<Date | null>(new Date('2026-05-06'));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [budget, setBudget] = useState('0');
  const [location, setLocation] = useState({ province: '' });
  const [companions, setCompanions] = useState<{ email: string, avatar: string }[]>([]);
  const [isAddingCompanion, setIsAddingCompanion] = useState(false);
  const [companionEmail, setCompanionEmail] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCompanionsList, setShowCompanionsList] = useState(false);

  // Apply scroll lock when modal is open
  useModalScrollLock(showCompanionsList);

  // Calculate duration in days
  const duration = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  }, [startDate, endDate]);

  const formatDateDisplay = (date: Date | null, showYear = false) => {
    if (!date) return 'CHƯA CHỌN';
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'CHƯA CHỌN';
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return showYear ? `${day}/${month}/${year}` : `${day}/${month}`;
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    if (rawVal.length > 9) return;
    
    // Remove leading zeros
    const val = rawVal === '' || rawVal === '0' ? '0' : rawVal.replace(/^0+/, '');
    setBudget(val);
  };
  const formatBudget = (val: string) => {
    if (!val || val === '0') return '0';
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAddCompanion = () => {
    if (companionEmail && companions.length < 10) {
      if (companions.some(c => c.email === companionEmail)) {
        showToast("Email này đã được thêm", "warning");
        return;
      }
      setCompanions([
        ...companions, 
        { 
          email: companionEmail, 
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${companionEmail}` 
        }
      ]);
      setCompanionEmail('');
      setIsAddingCompanion(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
    }
  };

  const removeCompanion = (email: string) => {
    setCompanions(companions.filter(c => c.email !== email));
  };

  const handleNextClick = () => {
    if (!title.trim()) {
      showToast("Vui lòng nhập tên lịch trình", "warning");
      return;
    }
    onNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-5 sm:space-y-7 pb-20"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Manage Companions Modal */}
      <AnimatePresence>
        {showCompanionsList && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCompanionsList(false)}
              className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-md bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
            >
              <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black tracking-tight text-on-surface">Bạn đồng hành</h3>
                  <p className="text-xs text-outline font-medium">Quản lý những người tham gia chuyến đi</p>
                </div>
                <button 
                  onClick={() => setShowCompanionsList(false)}
                  className="p-2 hover:bg-surface-container rounded-[4px] text-outline transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto no-scrollbar space-y-4">
                {companions.length === 0 ? (
                  <div className="text-center py-10 opacity-40">
                    <Users className="mx-auto mb-2" size={32} />
                    <p className="text-xs font-bold uppercase tracking-widest">Trống</p>
                  </div>
                ) : (
                  companions.map((comp, idx) => (
                    <motion.div 
                      key={comp.email}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-2xl bg-surface-container/50 border border-outline-variant/10 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden shadow-sm">
                          <img src={comp.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-on-surface">{comp.email.split('@')[0]}</p>
                          <p className="text-[10px] font-medium text-outline">{comp.email}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeCompanion(comp.email)}
                        className="p-2 text-outline/40 hover:text-error hover:bg-error/10 rounded-[4px] transition-all"
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-6 bg-surface-container/30 border-t border-outline-variant/10">
                <button 
                  onClick={() => setShowCompanionsList(false)}
                  className="w-full py-3 bg-on-surface text-white rounded-[4px] font-bold text-xs shadow-lg active:scale-95 transition-all"
                >
                  Xác nhận danh sách
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-[#1C1C1E]">
        <div className="flex-1">
          <h1 className="text-xl sm:text-3xl font-black tracking-tighter">Tạo lịch trình</h1>
          <p className="text-[10px] sm:text-sm font-medium opacity-50 mt-0.5 sm:mt-1">Xây dựng kế hoạch cho chuyến đi của bạn</p>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <div className="sm:hidden px-3 py-1.5 bg-primary/5 rounded-lg border border-primary/20 text-primary font-black text-[10px] flex items-center gap-1.5">
            <Sparkles size={12} />
            Lên kế hoạch
          </div>

          <div className="flex gap-2">
            <button 
              onClick={onBack}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-[4px] border-2 border-outline-variant font-bold text-[10px] sm:text-sm text-outline hover:bg-surface-container transition-all"
            >
              Hủy
            </button>
            <button 
              onClick={handleNextClick}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-[4px] bg-primary text-white font-bold text-[10px] sm:text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all"
            >
              Tiếp theo
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7">
        {/* Main Trip Info */}
        <div className="lg:col-span-8 space-y-5 sm:space-y-7">
          <div className="bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-outline-variant/30 shadow-sm relative">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-1">Thông tin chuyến đi</h2>
              <p className="text-[10px] sm:text-xs text-outline font-medium">Chỉnh sửa thông tin cơ bản của chuyến đi</p>
            </div>

            {/* Cover Image Upload Area */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative group rounded-xl overflow-hidden mb-6 sm:mb-8 aspect-[3/1] bg-surface-container cursor-pointer transition-all hover:ring-2 hover:ring-primary/20 shadow-inner"
            >
              <div className="w-full h-full flex flex-col items-center justify-center">
                {coverImage ? (
                  <img src={coverImage} className="w-full h-full object-cover object-center select-none" alt="Cover" />
                ) : (
                  <>
                    <Camera size={32} className="text-outline-variant mb-2 opacity-40" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Chọn ảnh bìa</span>
                  </>
                )}
              </div>
              {!coverImage && (
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold text-on-surface flex items-center gap-2 shadow-lg">
                    <Camera size={14} className="sm:size-4" />
                    Thêm ảnh bìa
                  </div>
                </div>
              )}
            </div>

            {/* Editable Fields */}
            <div className="space-y-4 sm:space-y-6">
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tên chuyến đi của bạn..."
                className="w-full text-xl sm:text-4xl font-black text-on-surface placeholder:text-outline-variant border-none p-0 focus:ring-0"
              />
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Viết mô tả ngắn gọn về chuyến đi này"
                className="w-full text-xs sm:text-base text-on-surface-variant font-medium placeholder:text-outline-variant border-none p-0 focus:ring-0 min-h-[40px] resize-none"
              />

              {/* Date Brief */}
              <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
                <div className="relative flex-1">
                  <button 
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="w-full bg-surface-container rounded-[4px] p-3 sm:p-4 flex items-center justify-between group hover:bg-surface-container-high transition-all"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary">
                        <Calendar size={14} className="sm:size-[18px]" />
                      </div>
                      <div className="text-left">
                        <p className="text-[8px] sm:text-[10px] text-outline font-bold uppercase mb-0.5">Thời gian</p>
                        <p className="text-[10px] sm:text-sm font-bold text-on-surface">
                          <span className="hidden sm:inline">
                            {formatDateDisplay(startDate, true)} - {formatDateDisplay(endDate, true)}
                          </span>
                          <span className="sm:hidden">
                            {formatDateDisplay(startDate, false)} - {formatDateDisplay(endDate, false)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={14} className={`text-outline transition-transform ${showDatePicker ? 'rotate-90' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showDatePicker && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute bottom-full right-[-80px] sm:right-auto sm:left-0 mb-4 w-[280px] sm:w-[400px] bg-white border border-outline-variant/30 rounded-xl shadow-2xl p-4 sm:p-7 z-50 overflow-hidden"
                      >
                        <div className="space-y-4 sm:space-y-5">
                          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
                            <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.1em] text-outline">Chọn lịch trình</h4>
                            <button onClick={() => setShowDatePicker(false)} className="p-1.5 hover:bg-surface-container rounded-[4px] text-outline">
                              <ChevronRight className="rotate-90" size={14} />
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="space-y-2">
                              <p className="text-[8px] sm:text-[9px] font-bold text-outline/60 uppercase tracking-wider">Bắt đầu</p>
                              <DatePickerWithTime
                                date={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholder="Ngày đi"
                              />
                            </div>
                            <div className="space-y-2">
                              <p className="text-[8px] sm:text-[9px] font-bold text-outline/60 uppercase tracking-wider">Kết thúc</p>
                              <DatePickerWithTime
                                date={endDate}
                                onChange={(date) => setEndDate(date)}
                                placeholder="Ngày về"
                              />
                            </div>
                          </div>
                          <button 
                            onClick={() => setShowDatePicker(false)}
                            className="w-full py-2.5 sm:py-3 bg-primary text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] rounded-[4px] shadow-lg shadow-primary/20 active:scale-95 transition-all"
                          >
                            Xác nhận
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="shrink-0 h-[48px] sm:h-auto px-4 sm:px-6 py-3 sm:py-4 bg-primary/5 border border-primary/20 rounded-lg sm:rounded-xl text-primary font-black text-[10px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2">
                  <span className="text-sm sm:text-base">🌙</span> {duration} ngày
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          {/* Location Picker Widget */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-outline-variant/30 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[9px] sm:text-xs font-black text-outline/60 uppercase tracking-widest">Điểm đến</p>
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary">
                <Map size={12} className="sm:size-4" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline/40" />
                <input 
                  type="text"
                  placeholder="Tỉnh/Thành phố"
                  maxLength={30}
                  value={location.province}
                  onChange={(e) => setLocation({...location, province: e.target.value})}
                  className="w-full pl-9 pr-4 py-2 bg-surface-container rounded-lg border-none text-xs font-bold focus:ring-2 focus:ring-primary/20 placeholder:font-normal placeholder:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Budget Widget */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-outline-variant/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-5 sm:opacity-10 pointer-events-none">
              <Wallet size={64} className="sm:size-20" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <p className="text-[9px] sm:text-xs font-black text-outline/60 uppercase tracking-widest">Ngân sách dự kiến</p>
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary">
                  <Wallet size={12} className="sm:size-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1 bg-surface-container rounded-xl px-4 py-2.5 border-2 border-outline-variant/50 focus-within:border-primary/60 transition-all w-fit min-w-[120px] max-w-full shadow-inner">
                <input 
                  type="text"
                  value={formatBudget(budget)}
                  onChange={handleBudgetChange}
                  style={{ width: `${Math.max(1, budget.length + 1)}ch` }}
                  className="bg-transparent border-none p-0 text-xl sm:text-2xl font-black text-primary focus:ring-0 tracking-tighter"
                />
                <span className="text-xs font-black text-primary opacity-60">đ</span>
              </div>
              <p className="text-[8px] sm:text-[10px] text-outline/60 font-medium mt-3 sm:mt-4 italic">Hãy dự trù ngân sách cho chuyến đi này</p>
            </div>
          </div>

          {/* Companions Widget */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col min-h-[220px] sm:min-h-[280px]">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-[9px] sm:text-sm font-black text-on-surface uppercase tracking-widest opacity-60">Bạn đồng hành</h3>
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black rounded uppercase tracking-widest">
                {companions.length}/10
              </span>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center">
              <LayoutGroup>
                <div className={`flex items-center w-full relative h-[44px] sm:h-[48px] mb-4 ${isAddingCompanion ? 'justify-start' : 'justify-center'}`}>
                  <motion.button 
                    layout
                    onClick={() => setIsAddingCompanion(!isAddingCompanion)}
                    transition={{ 
                      type: "spring", 
                      stiffness: 220, 
                      damping: 24,
                      mass: 1.2
                    }}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center text-outline/40 hover:border-primary hover:text-primary transition-all group z-20 bg-white"
                  >
                    {isAddingCompanion ? <X size={18} /> : <Plus size={20} />}
                  </motion.button>

                  <AnimatePresence>
                    {isAddingCompanion && (
                      <motion.div 
                        key="companion-input"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex-1 flex items-center gap-2 ml-2 z-10"
                      >
                        <div className="relative flex-1">
                          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline/40" />
                          <input 
                            autoFocus
                            type="email"
                            placeholder="Email bạn bè..."
                            value={companionEmail}
                            onChange={(e) => setCompanionEmail(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddCompanion()}
                            className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-surface-container rounded-xl border border-outline-variant/20 text-[11px] sm:text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                        </div>
                        <button 
                          onClick={handleAddCompanion}
                          className="p-2 sm:p-2.5 bg-primary text-white rounded-[4px] hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                        >
                          <UserPlus size={16} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </LayoutGroup>
              
              {/* Fixed height container for companions to prevent layout shift */}
              <div className="h-12 w-full flex flex-col items-center justify-center">
                {!isAddingCompanion && companions.length === 0 && (
                  <p className="text-[10px] text-outline/80 leading-relaxed italic px-2 text-center font-medium">
                    "Mời bạn bè cùng tham gia"
                  </p>
                )}

                {/* Added User Icons Group */}
                {companions.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {companions.map((comp, idx) => (
                      <motion.div 
                        layout
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        key={comp.email}
                        className="w-8 h-8 rounded-full border-2 border-primary/20 overflow-hidden shadow-sm hover:-translate-y-px transition-transform cursor-pointer relative"
                      >
                        <img src={comp.avatar} alt="Companion" title={comp.email} className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => setShowCompanionsList(true)}
              className="w-full py-2 sm:py-2.5 mt-6 bg-on-surface text-white rounded-[4px] font-bold text-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Users size={14} />
              Quản lý đồng hành
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
