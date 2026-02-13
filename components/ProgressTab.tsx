import React, { useMemo, useState } from 'react';
import { Share2, Calendar, RotateCcw, Award, Zap, Download, Coins, Palette, Lock, Check } from 'lucide-react';
import { UserData, THEMES } from '../types';
import Logo from './Logo';

interface ProgressTabProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const ProgressTab: React.FC<ProgressTabProps> = ({ userData, updateUserData }) => {
  const [showShareCard, setShowShareCard] = useState(false);

  const stats = useMemo(() => {
    const diffInMs = userData.startDate ? new Date().getTime() - new Date(userData.startDate).getTime() : 0;
    const currentDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const emergencyWins = userData.history.filter(h => h.type === 'emergency_victory').length;
    const bestStreak = Math.max(userData.bestStreak, currentDays);

    return { currentDays, emergencyWins, bestStreak };
  }, [userData]);

  const handleBuyTheme = (themeId: string) => {
    if (userData.unlockedThemes.includes(themeId)) {
      updateUserData({ activeTheme: themeId });
      return;
    }

    if (userData.points >= 500) {
      updateUserData({
        points: userData.points - 500,
        unlockedThemes: [...userData.unlockedThemes, themeId],
        activeTheme: themeId
      });
      alert(`Tema ${themeId.toUpperCase()} desbloqueado!`);
    } else {
      alert("Pontos insuficientes! Continue sua jornada para ganhar mais.");
    }
  };

  const themeColorClass = userData.activeTheme === 'indigo' ? 'indigo-500' : 
                          userData.activeTheme === 'emerald' ? 'emerald-500' :
                          userData.activeTheme === 'rose' ? 'rose-500' : 'amber-500';

  return (
    <div className="space-y-8 animate-in slide-in-from-left duration-500 pb-10">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Honra e Progresso</h2>
          <p className="text-slate-400 text-sm">Sua evolução em números.</p>
        </div>
        <div className={`flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-${themeColorClass}/20 transition-all active:scale-95`}>
          <Coins size={18} className="text-amber-400" />
          <span className="text-lg font-bold text-white">{userData.points}</span>
        </div>
      </header>

      {/* Honor Level Card */}
      <div 
        key={userData.points} 
        className={`bg-gradient-to-br from-${themeColorClass}/20 to-slate-900 p-6 rounded-[32px] border border-${themeColorClass}/10 flex items-center gap-6 animate-honor-pop shadow-lg shadow-${themeColorClass}/5`}
      >
        <div className={`w-20 h-20 rounded-full bg-${themeColorClass}/10 flex items-center justify-center border border-${themeColorClass}/20 shadow-inner group overflow-hidden relative`}>
           <Award size={40} className={`text-${themeColorClass} relative z-10 transition-transform group-hover:rotate-12 duration-300`} />
           <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-${themeColorClass}/10 to-transparent shine-effect opacity-50`}></div>
        </div>
        <div className="flex-1">
           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Nível de Honra</p>
           <h3 className="text-xl font-bold text-white mb-1">
             {userData.points < 500 ? 'Iniciante' : userData.points < 1500 ? 'Guerreiro' : 'Mestre da Vontade'}
           </h3>
           <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden shadow-inner">
              <div 
                className={`h-full bg-${themeColorClass} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--tw-color-${themeColorClass}),0.5)]`} 
                style={{ width: `${Math.min(100, (userData.points / 1500) * 100)}%` }}
              ></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={<Zap className="text-amber-400" size={20} />} label="Recorde" value={`${stats.bestStreak} d`} />
        <StatCard icon={<RotateCcw className="text-rose-500" size={20} />} label="Recaídas" value={userData.relapses.toString()} />
        <StatCard icon={<Award className="text-indigo-400" size={20} />} label="Vitórias SOS" value={stats.emergencyWins.toString()} />
        <StatCard icon={<Calendar className="text-blue-400" size={20} />} label="Início" value={userData.startDate ? new Date(userData.startDate).toLocaleDateString('pt-BR') : 'N/A'} />
      </div>

      {/* Theme Shop */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
           <Palette size={20} className={`text-${themeColorClass}`} />
           <h3 className="font-bold text-white uppercase tracking-wider text-sm">Loja de Temas</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(THEMES).map(([id, theme]) => {
            const isUnlocked = userData.unlockedThemes.includes(id);
            const isActive = userData.activeTheme === id;
            return (
              <button
                key={id}
                onClick={() => handleBuyTheme(id)}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                  isActive ? `border-${theme.primary} bg-${theme.primary}/10` : 'border-slate-800 bg-slate-800/20 hover:border-slate-700'
                } active:scale-95`}
              >
                <div className={`w-10 h-10 rounded-full bg-${theme.primary} shadow-lg shadow-${theme.primary}/20 flex items-center justify-center`}>
                  {isUnlocked ? (isActive ? <Check size={20} className="text-white" /> : null) : <Lock size={16} className="text-white/50" />}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-white uppercase">{id}</p>
                  {!isUnlocked && (
                    <div className="flex items-center gap-1 justify-center mt-1">
                      <Coins size={10} className="text-amber-400" />
                      <span className="text-[10px] text-slate-500 font-bold">500</span>
                    </div>
                  )}
                  {isUnlocked && <span className="text-[10px] text-slate-500 font-bold">{isActive ? 'Ativo' : 'Selecionar'}</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button 
        onClick={() => setShowShareCard(true)}
        className={`w-full py-4 bg-${themeColorClass} text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-${themeColorClass}/20 transition-all active:scale-95`}
      >
        <Share2 size={20} /> COMPARTILHAR CONQUISTA
      </button>

      {showShareCard && (
        <div className="fixed inset-0 bg-slate-950/90 z-[300] flex flex-col items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={`w-full max-w-[320px] aspect-[4/5] bg-gradient-to-br from-${themeColorClass}/30 to-slate-950 rounded-[40px] p-8 border border-white/10 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl animate-in zoom-in duration-300`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${themeColorClass}/20 blur-3xl -mr-16 -mt-16`}></div>
            <div className="relative z-10 flex flex-col items-center w-full">
              <Logo className="w-24 h-24 mb-6" />
              
              <div className="flex flex-col items-center mb-8">
                <span className="text-7xl font-black text-white leading-none">{stats.currentDays}</span>
                <span className="text-slate-400 text-sm uppercase font-bold tracking-widest mt-2">Dias Limpos</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full mb-8">
                 <Coins size={14} className="text-amber-400" />
                 <span className="text-white font-bold text-sm">{userData.points} Honra</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-10">
            <button onClick={() => setShowShareCard(false)} className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors">FECHAR</button>
            <button onClick={() => alert("Imagem salva com sucesso!")} className={`px-6 py-3 bg-${themeColorClass} text-white rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all`}>
              <Download size={18} /> SALVAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="bg-slate-800/40 p-5 rounded-3xl border border-slate-700/30 hover:border-slate-600 transition-colors">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-xl font-bold text-white">{value}</p>
  </div>
);

export default ProgressTab;