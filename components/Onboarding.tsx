
import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Target, ShieldCheck, Clock } from 'lucide-react';
import Logo from './Logo';
import { UserData } from '../types';

interface OnboardingProps {
  userData: UserData;
  onComplete: (data: Partial<UserData>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    targetAddiction: '',
    reason: '',
    targetGoal: '',
    startDate: new Date().toISOString()
  });

  const addictions = ['Álcool', 'Cigarro', 'Maconha', 'Pornografia', 'Drogas', 'Apostas', 'Redes Sociais', 'Comida', 'Outro'];
  const goals = ['7 dias', '30 dias', '90 dias', '1 ano', 'Para sempre'];

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in duration-500">
            <Logo className="w-48 h-48" />
            <div>
              <h1 className="text-3xl font-black italic text-white mb-2">BEM-VINDO AO RESET</h1>
              <p className="text-slate-400">Sua jornada para o Vício Zero começa agora.</p>
            </div>
            <button 
              onClick={next}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30"
            >
              COMEÇAR JORNADA
            </button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex items-center gap-4 mb-2">
              <ShieldCheck className="text-blue-500" size={32} />
              <h2 className="text-2xl font-bold text-white">Qual vício você quer parar?</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {addictions.map(item => (
                <button
                  key={item}
                  onClick={() => { setFormData({ ...formData, targetAddiction: item }); next(); }}
                  className="w-full p-4 bg-slate-900 border border-slate-800 rounded-2xl text-left font-bold text-slate-300 hover:border-blue-500 hover:text-white transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-2">
              <Target className="text-blue-500" size={32} />
              <h2 className="text-2xl font-bold text-white">Qual o seu motivo?</h2>
            </div>
            <p className="text-slate-400 text-sm">Por quem ou pelo que você está lutando?</p>
            <textarea
              placeholder="Ex: Minha saúde, minha família e meu futuro..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full h-48 bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white outline-none focus:border-blue-500 resize-none text-lg"
            />
            <div className="mt-auto flex gap-4 pt-4">
              <button onClick={prev} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400">
                <ArrowLeft size={24} />
              </button>
              <button 
                disabled={!formData.reason.trim()}
                onClick={next}
                className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold disabled:opacity-50"
              >
                PRÓXIMO
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-2">
              <Clock className="text-blue-500" size={32} />
              <h2 className="text-2xl font-bold text-white">Qual seu objetivo?</h2>
            </div>
            <div className="space-y-3 flex-1">
              {goals.map(goal => (
                <button
                  key={goal}
                  onClick={() => { setFormData({ ...formData, targetGoal: goal }); }}
                  className={`w-full p-5 rounded-2xl border text-left font-bold transition-all ${
                    formData.targetGoal === goal ? 'bg-blue-600/10 border-blue-500 text-white shadow-lg shadow-blue-500/10' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            <div className="mt-auto flex gap-4 pt-4">
              <button onClick={prev} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400">
                <ArrowLeft size={24} />
              </button>
              <button 
                disabled={!formData.targetGoal}
                onClick={() => onComplete({ ...formData, hasCompletedOnboarding: true, startDate: new Date().toISOString() })}
                className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30"
              >
                COMEÇAR AGORA
              </button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col p-8 z-[500] overflow-y-auto">
       <div className="flex-1 flex flex-col max-w-[400px] mx-auto w-full">
         {renderStep()}
       </div>
    </div>
  );
};

export default Onboarding;
