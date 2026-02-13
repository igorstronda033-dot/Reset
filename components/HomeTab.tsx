
import React, { useMemo, useState, useEffect } from 'react';
import { TrendingUp, Clock, Wallet, Quote, Edit2, ShieldAlert, Coins } from 'lucide-react';
import { UserData } from '../types';
import { getMotivationalQuote } from '../services/geminiService';
import Logo from './Logo';

interface HomeTabProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onEmergency: () => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ userData, updateUserData, onEmergency }) => {
  const [quote, setQuote] = useState("Sua jornada para a liberdade começou.");
  const [isEditingReason, setIsEditingReason] = useState(false);
  const [reasonInput, setReasonInput] = useState(userData.reason);

  useEffect(() => {
    getMotivationalQuote().then(setQuote);
  }, []);

  const diffInMs = useMemo(() => {
    if (!userData.startDate) return 0;
    return new Date().getTime() - new Date(userData.startDate).getTime();
  }, [userData.startDate]);

  const stats = useMemo(() => {
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
    const economy = days * 20; 
    const timeSaved = days * 2; 

    return { days, hours, minutes, economy, timeSaved };
  }, [diffInMs]);

  const handleUpdateReason = () => {
    updateUserData({ reason: reasonInput });
    setIsEditingReason(false);
  };

  const themeColorClass = userData.activeTheme === 'indigo' ? 'indigo-500' : 
                          userData.activeTheme === 'emerald' ? 'emerald-500' :
                          userData.activeTheme === 'rose' ? 'rose-500' : 'amber-500';

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
           <Logo className="w-16 h-16 drop-shadow-xl" />
           <div className="hidden sm:block">
             <h1 className="text-xl font-bold text-white leading-tight">RESET</h1>
             <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">Vício Zero</p>
           </div>
        </div>
        <div className={`flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-${themeColorClass}/20`}>
          <Coins size={16} className="text-amber-400" />
          <span className="text-sm font-bold text-white">{userData.points}</span>
        </div>
      </header>

      {/* Main Counter */}
      <div className={`relative aspect-square flex flex-col items-center justify-center border-[8px] border-slate-800 rounded-full mx-auto max-w-[280px] shadow-2xl shadow-${themeColorClass}/10`}>
        <div className={`absolute inset-4 border-[1px] border-${themeColorClass}/30 rounded-full border-dashed animate-spin-slow`}></div>
        <span className="text-7xl font-bold text-white leading-none">{stats.days}</span>
        <span className="text-slate-500 font-medium uppercase tracking-[0.2em] mt-2">Dias Limpos</span>
        <div className={`mt-4 flex gap-4 text-xs font-mono text-${themeColorClass}`}>
          <span>{stats.hours}H</span>
          <span>{stats.minutes}M</span>
        </div>
      </div>

      <button 
        onClick={onEmergency}
        className="w-full py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl flex items-center justify-center gap-3 font-bold text-lg transition-all active:scale-95 shadow-xl shadow-rose-500/30"
      >
        <ShieldAlert size={24} />
        MODO EMERGÊNCIA
      </button>

      <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 relative group">
        <div className="flex justify-between items-center mb-3">
          <div className={`flex items-center gap-2 text-${themeColorClass}`}>
            <TrendingUp size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Meu Porquê</span>
          </div>
          <button onClick={() => setIsEditingReason(!isEditingReason)} className="text-slate-500 hover:text-white transition-colors">
            <Edit2 size={16} />
          </button>
        </div>
        
        {isEditingReason ? (
          <div className="flex gap-2">
            <input 
              type="text" 
              value={reasonInput} 
              onChange={(e) => setReasonInput(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm flex-1 outline-none focus:border-indigo-500"
            />
            <button onClick={handleUpdateReason} className={`bg-${themeColorClass} px-3 py-2 rounded-lg text-xs font-bold`}>OK</button>
          </div>
        ) : (
          <p className="text-lg text-slate-200 font-medium italic leading-relaxed">
            "{userData.reason}"
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/30 p-5 rounded-2xl border border-slate-800 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-3">
            <Wallet size={20} />
          </div>
          <span className="text-xl font-bold text-white">R$ {stats.economy}</span>
          <span className="text-[10px] text-slate-500 uppercase mt-1">Economizados</span>
        </div>
        <div className="bg-slate-800/30 p-5 rounded-2xl border border-slate-800 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3">
            <Clock size={20} />
          </div>
          <span className="text-xl font-bold text-white">{stats.timeSaved}h</span>
          <span className="text-[10px] text-slate-500 uppercase mt-1">Tempo Recuperado</span>
        </div>
      </div>

      <div className={`bg-${themeColorClass}/5 p-6 rounded-3xl border border-${themeColorClass}/10`}>
        <Quote className={`text-${themeColorClass}/20 mb-2`} size={32} />
        <p className="text-slate-300 text-sm italic">
          {quote}
        </p>
      </div>
    </div>
  );
};

export default HomeTab;
