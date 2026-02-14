
import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck, RotateCcw, Zap, Coins } from 'lucide-react';
import { UserData } from '../types';
import { getMotivationalQuote } from '../services/geminiService';

interface HomeTabProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ userData, updateUserData }) => {
  const [quote, setQuote] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    getMotivationalQuote().then(setQuote);
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const timeDiff = useMemo(() => {
    if (!userData.startDate) return { days: 0, hours: 0, mins: 0 };
    const diff = now.getTime() - new Date(userData.startDate).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    return { days, hours, mins };
  }, [userData.startDate, now]);

  const canCheckIn = () => {
    if (!userData.lastCheckIn) return true;
    const last = new Date(userData.lastCheckIn).toDateString();
    const today = new Date().toDateString();
    return last !== today;
  };

  const handleCheckIn = () => {
    if (!canCheckIn()) {
      alert("Você já registrou seu progresso hoje! Continue firme.");
      return;
    }
    updateUserData({
      points: userData.points + 25,
      lastCheckIn: new Date().toISOString(),
      history: [...userData.history, { date: new Date().toISOString(), type: 'checkin' }]
    });
    alert("Parabéns! Mais um dia limpo. +25 Pontos de Honra ganhos!");
  };

  const handleRelapse = () => {
    if (confirm("Você confirma que teve uma recaída? Não desanime, cada recomeço é um aprendizado.")) {
      const currentStreak = timeDiff.days;
      updateUserData({
        startDate: new Date().toISOString(),
        relapses: userData.relapses + 1,
        bestStreak: Math.max(userData.bestStreak, currentStreak),
        history: [...userData.history, { date: new Date().toISOString(), type: 'relapse' }]
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Target Info */}
      <div className="flex justify-between items-center bg-slate-900/40 p-4 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Parando</p>
            <p className="text-sm font-bold text-white">{userData.targetAddiction}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-full">
           <Coins size={14} className="text-amber-400" />
           <span className="text-xs font-bold text-white">{userData.points}</span>
        </div>
      </div>

      {/* Main Counter Display */}
      <div className="relative flex flex-col items-center justify-center py-10">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-72 h-72 border-[20px] border-blue-600 rounded-full"></div>
        </div>
        
        <div className="text-center relative z-10">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.4em] mb-4">Tempo Limpo</p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-8xl font-black text-white leading-none">{timeDiff.days}</span>
            <span className="text-2xl font-bold text-blue-500 italic">DIAS</span>
          </div>
          <div className="mt-4 flex gap-6 justify-center">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">{timeDiff.hours}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Horas</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">{timeDiff.mins}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Minutos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Motivation Box */}
      <div className="bg-gradient-to-br from-blue-900/20 to-black p-6 rounded-[32px] border border-blue-500/10 italic text-slate-300 shadow-xl">
        <p className="text-sm leading-relaxed">"{quote || "A resistência de hoje é a liberdade de amanhã."}"</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button 
          onClick={handleCheckIn}
          className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 transition-all active:scale-95"
        >
          <ShieldCheck size={28} /> ESTOU LIMPO HOJE
        </button>
        
        <button 
          onClick={handleRelapse}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded-[24px] border border-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-all active:opacity-70"
        >
          <RotateCcw size={18} /> Registrar recaída
        </button>
      </div>

      {/* Progress Footer */}
      <div className="pt-4">
         <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Meta: {userData.targetGoal}</span>
            <span className="text-xs font-bold text-blue-400">{Math.min(100, Math.round((timeDiff.days / (userData.targetGoal === 'Para sempre' ? 365 : parseInt(userData.targetGoal))) * 100))}%</span>
         </div>
         <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, (timeDiff.days / (userData.targetGoal === 'Para sempre' ? 365 : parseInt(userData.targetGoal))) * 100)}%` }}
            ></div>
         </div>
      </div>
    </div>
  );
};

export default HomeTab;
