
import React, { useState, useEffect, useRef } from 'react';
import { X, Droplets, MapPin, Wind, Heart, ChevronRight, Coins } from 'lucide-react';
import { UserData } from '../types';
import { getEmergencyTips, getMotivationalQuote } from '../services/geminiService';

interface EmergencyTabProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onComplete: () => void;
}

const EmergencyTab: React.FC<EmergencyTabProps> = ({ userData, updateUserData, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [tips, setTips] = useState<string[]>([]);
  const [quote, setQuote] = useState("");
  const timerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext lazily
  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSound = (type: 'tick' | 'victory' | 'relapse' | 'action') => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (type) {
        case 'tick':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        case 'victory':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
          osc.start(now);
          osc.stop(now + 0.5);
          break;
        case 'relapse':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.linearRampToValueAtTime(110, now + 0.3);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
          osc.start(now);
          osc.stop(now + 0.4);
          break;
        case 'action':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, now);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;
      }
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  };

  useEffect(() => {
    getEmergencyTips().then(setTips);
    getMotivationalQuote("urgência extrema").then(setQuote);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        // Play tick sound every second if time is low or just at intervals
        if (prev % 10 === 0 || prev <= 10) {
           playSound('tick');
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVictory = () => {
    playSound('victory');
    const newEntry = { date: new Date().toISOString(), type: 'emergency_victory' as const };
    updateUserData({
      history: [...userData.history, newEntry],
      points: userData.points + 20 
    });
    alert("Parabéns! Você resistiu e ganhou +20 Pontos de Honra!");
    onComplete();
  };

  const handleRelapse = () => {
    if (confirm("Você tem certeza? Todo recomeço é uma oportunidade, mas tente resistir mais um pouco.")) {
      playSound('relapse');
      updateUserData({
        startDate: new Date().toISOString(),
        relapses: userData.relapses + 1,
        history: [...userData.history, { date: new Date().toISOString(), type: 'relapse' }]
      });
      onComplete();
    }
  };

  const handleActionClick = () => {
    playSound('action');
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col p-8 overflow-y-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-rose-500 uppercase tracking-tighter italic animate-pulse">MODO S.O.S</h2>
        <button onClick={() => { playSound('action'); onComplete(); }} className="p-2 bg-slate-800 rounded-full active:scale-90 transition-transform">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="relative">
          <div className="w-64 h-64 rounded-full border-4 border-rose-500/20 flex flex-col items-center justify-center animate-pulse-slow shadow-[0_0_50px_rgba(244,63,94,0.1)]">
            <span className="text-6xl font-bold font-mono text-white">{formatTime(timeLeft)}</span>
            <span className="text-slate-500 text-xs font-medium uppercase tracking-[0.3em] mt-2">Respira</span>
          </div>
          <div className="absolute -inset-4 border border-rose-500/10 rounded-full animate-ping-slow"></div>
        </div>

        <div className="w-full space-y-4 text-center">
           <div className="inline-flex items-center gap-2 bg-rose-500/10 px-4 py-2 rounded-full border border-rose-500/20">
              <Coins size={14} className="text-amber-400" />
              <span className="text-xs font-bold text-rose-400">+20 PONTOS AO VENCER</span>
           </div>
          <div className="grid grid-cols-1 gap-3 text-left">
            {tips.length > 0 ? tips.map((tip, idx) => (
              <QuickAction key={idx} text={tip} icon={<ChevronRight size={18} />} onClick={handleActionClick} />
            )) : (
              <>
                <QuickAction text="Beba 1 copo de água gelada" icon={<Droplets size={18} />} onClick={handleActionClick} />
                <QuickAction text="Mude de ambiente agora" icon={<MapPin size={18} />} onClick={handleActionClick} />
                <QuickAction text="Respire fundo 10 vezes" icon={<Wind size={18} />} onClick={handleActionClick} />
              </>
            )}
          </div>
        </div>

        <div className="text-center italic text-slate-300 px-4">
          <p>"{quote || "A vontade é passageira, sua força é eterna."}"</p>
        </div>

        <div className="w-full space-y-4 pt-8">
          <button 
            onClick={handleVictory}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 animate-pulse-subtle"
          >
            <Heart size={20} /> RESISTI À VONTADE!
          </button>
          <button 
            onClick={handleRelapse}
            className="w-full py-3 bg-transparent border border-slate-700 text-slate-500 rounded-2xl font-medium text-sm active:opacity-70 transition-opacity"
          >
            Infelizmente caí
          </button>
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ text: string; icon: React.ReactNode; onClick: () => void }> = ({ text, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4 text-slate-200 text-left hover:border-slate-700 active:scale-[0.98] transition-all"
  >
    <div className="text-rose-500">{icon}</div>
    <span className="font-medium flex-1">{text}</span>
  </button>
);

export default EmergencyTab;
