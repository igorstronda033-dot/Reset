
import React, { useState } from 'react';
import { CheckCircle2, Circle, Trophy, Star, Coins } from 'lucide-react';
import { UserData } from '../types';

interface ChallengeTabProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const CHALLENGE_DAYS = [
  "Beba 2 litros de água e medite por 5 min.",
  "Escreva 3 motivos pelos quais você quer parar.",
  "Faça uma caminhada de 20 minutos ao ar livre.",
  "Fique longe de redes sociais por 2 horas.",
  "Leia 5 páginas de um livro edificante.",
  "Ligue para alguém que você gosta e converse.",
  "Organize um espaço da sua casa ou trabalho."
];

const ChallengeTab: React.FC<ChallengeTabProps> = ({ userData, updateUserData }) => {
  const [showReward, setShowReward] = useState(false);

  const toggleDay = (index: number) => {
    let newProgress = [...userData.challengeProgress];
    if (newProgress.includes(index)) {
      newProgress = newProgress.filter(i => i !== index);
    } else {
      newProgress.push(index);
    }
    
    updateUserData({ challengeProgress: newProgress });

    if (newProgress.length === 7) {
      updateUserData({ 
        points: userData.points + 100,
        history: [...userData.history, { date: new Date().toISOString(), type: 'challenge_complete' as any }]
      });
      setShowReward(true);
    }
  };

  const isCompleted = userData.challengeProgress.length === 7;
  const themeColorClass = userData.activeTheme === 'indigo' ? 'indigo-500' : 
                          userData.activeTheme === 'emerald' ? 'emerald-500' :
                          userData.activeTheme === 'rose' ? 'rose-500' : 'amber-500';

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <header className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Desafio de 7 Dias</h2>
        <p className="text-slate-400 text-sm">Pequenos passos geram grandes mudanças.</p>
        <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
           <Coins size={14} className="text-amber-400" />
           <span className="text-xs font-bold text-amber-500">+100 PONTOS AO COMPLETAR</span>
        </div>
      </header>

      <div className="bg-slate-800 h-2 rounded-full overflow-hidden mb-8">
        <div 
          className={`h-full bg-${themeColorClass} transition-all duration-1000`}
          style={{ width: `${(userData.challengeProgress.length / 7) * 100}%` }}
        ></div>
      </div>

      <div className="space-y-4">
        {CHALLENGE_DAYS.map((task, index) => {
          const done = userData.challengeProgress.includes(index);
          return (
            <button
              key={index}
              onClick={() => toggleDay(index)}
              className={`w-full p-4 rounded-2xl border flex items-center gap-4 text-left transition-all ${
                done 
                  ? `bg-${themeColorClass}/20 border-${themeColorClass} text-white` 
                  : 'bg-slate-800/30 border-slate-700/50 text-slate-400 opacity-60'
              }`}
            >
              <div className={done ? `text-${themeColorClass}` : 'text-slate-600'}>
                {done ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold uppercase tracking-widest text-${themeColorClass} mb-1`}>Dia {index + 1}</p>
                <p className={`font-medium ${done ? 'line-through text-slate-500' : ''}`}>
                  {task}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {showReward && (
        <div className="fixed inset-0 bg-slate-950/95 z-[200] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
          <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-amber-400/50">
            <Trophy size={48} className="text-slate-900" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-2">VOCÊ VENCEU!</h3>
          <p className="text-slate-400 text-lg mb-4">
            7 dias de domínio próprio.
          </p>
          <div className="flex items-center gap-2 bg-amber-500 px-6 py-2 rounded-full mb-8">
             <Coins size={20} className="text-slate-900" />
             <span className="font-black text-slate-900">+100 PONTOS</span>
          </div>
          <button 
            onClick={() => setShowReward(false)}
            className={`px-8 py-3 bg-${themeColorClass} text-white font-bold rounded-xl shadow-xl`}
          >
            CONTINUAR JORNADA
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeTab;
