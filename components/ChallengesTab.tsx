
import React from 'react';
import { Trophy, CheckCircle2, Circle, Coins, Star } from 'lucide-react';
import { UserData } from '../types';

const WEEK_CHALLENGES = [
  "Beber 2L de água por dia",
  "Fazer 15min de exercício físico",
  "Escrever em um diário de gratidão",
  "Meditar por 5 minutos",
  "Ficar 1h longe do celular antes de dormir",
  "Ler 5 páginas de um livro",
  "Dormir 8 horas seguidas"
];

interface ChallengesTabProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const ChallengesTab: React.FC<ChallengesTabProps> = ({ userData, updateUserData }) => {
  const isCompleted = (index: number) => userData.history.some(h => h.type === 'challenge_complete' && h.date.startsWith(new Date().toISOString().split('T')[0]) && h.date.includes(`challenge-${index}`));

  const toggleChallenge = (index: number) => {
    if (isCompleted(index)) return;
    
    updateUserData({
      points: userData.points + 10,
      history: [...userData.history, { date: new Date().toISOString() + `-challenge-${index}`, type: 'challenge_complete' }]
    });
    alert("Desafio concluído! +10 Pontos ganhos.");
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Desafios Semanais</h2>
          <p className="text-slate-400 text-sm">Mantenha sua mente ocupada com hábitos saudáveis.</p>
        </div>
        <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
           <Trophy size={24} />
        </div>
      </header>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-[32px] text-white flex items-center justify-between shadow-xl shadow-blue-600/20">
         <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Recompensa</p>
            <p className="text-xl font-black">HABITO NOVO</p>
         </div>
         <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full">
            <Coins size={18} className="text-amber-400" />
            <span className="font-bold">+10 pts por item</span>
         </div>
      </div>

      <div className="space-y-3">
        {WEEK_CHALLENGES.map((challenge, idx) => {
          const done = isCompleted(idx);
          return (
            <button
              key={idx}
              onClick={() => toggleChallenge(idx)}
              className={`w-full p-5 rounded-2xl border text-left flex items-center gap-4 transition-all ${
                done ? 'bg-blue-600/10 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div className={done ? 'text-blue-500' : 'text-slate-700'}>
                {done ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>
              <span className={`font-bold flex-1 ${done ? 'line-through opacity-50' : ''}`}>{challenge}</span>
              {done && <Star size={16} fill="#3b82f6" className="text-blue-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengesTab;
