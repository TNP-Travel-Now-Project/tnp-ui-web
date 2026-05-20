import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calculator } from 'lucide-react';

interface Participant {
  id: number;
  name: string;
  avatar: string;
}

interface SplitCostModalProps {
  totalCost: number;
  participants: Participant[];
  onClose: () => void;
  onSave: (costs: { [key: number]: string }) => void;
  readOnly?: boolean;
  initialCosts?: { [key: number]: string };
}

export default function SplitCostModal({ totalCost, participants, onClose, onSave, readOnly = false, initialCosts }: SplitCostModalProps) {
  const [individualCosts, setIndividualCosts] = useState<{ [key: number]: string }>(() => {
    if (initialCosts) return initialCosts;
    const splitAmount = Math.floor(totalCost / participants.length);
    return participants.reduce((acc, p) => ({ 
      ...acc, 
      [p.id]: splitAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
    }), {});
  });

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleIndividualChange = (id: number, value: string) => {
    if (readOnly) return;
    setIndividualCosts(prev => ({ ...prev, [id]: formatCurrency(value) }));
  };

  const currentTotal = (Object.values(individualCosts) as string[]).reduce((sum: number, val: string) => sum + parseInt(val.replace(/\D/g, '') || '0'), 0);
  const diff = totalCost - currentTotal;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col"
      >
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl text-white shadow-sm">
              <Calculator size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-on-surface">Chia chi phí</h2>
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold mt-1">Tổng cộng: {totalCost.toLocaleString()} VNĐ</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
          {participants.map(p => (
            <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container/20 border border-outline-variant/10 group">
              <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              <div className="flex-1">
                <p className="text-xs font-black text-on-surface">{p.name}</p>
                {readOnly && (
                   <p className="text-[10px] text-outline font-bold">Thanh toán theo phần</p>
                )}
              </div>
              <div className="relative w-32">
                <input 
                  type="text"
                  readOnly={readOnly}
                  value={individualCosts[p.id]}
                  onChange={(e) => handleIndividualChange(p.id, e.target.value)}
                  className={`w-full pl-3 pr-8 py-2 bg-white border border-outline-variant/30 rounded-xl text-xs font-bold outline-none text-right transition-all ${readOnly ? 'cursor-default opacity-80' : 'focus:border-primary focus:ring-2 focus:ring-primary/10'}`}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-outline">đ</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-surface-container-low/30 border-t border-outline-variant/10">
          {!readOnly ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-outline">Chênh lệch:</span>
                <span className={`text-xs font-bold ${diff === 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {diff === 0 ? '✓ Đã khớp' : `${diff > 0 ? '+' : ''}${diff.toLocaleString()} VNĐ`}
                </span>
              </div>
              <button 
                onClick={() => onSave(individualCosts)}
                className="w-full py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
              >
                Lưu thay đổi
              </button>
            </>
          ) : (
            <button 
              onClick={onClose}
              className="w-full py-4 bg-surface-container text-on-surface font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-outline-variant/20 transition-all"
            >
              Đóng
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
