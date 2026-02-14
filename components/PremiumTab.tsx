
import React from 'react';
import { Star, Check, ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import { UserData } from '../types';

interface PremiumTabProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const PremiumTab: React.FC<PremiumTabProps> = ({ userData, updateUserData }) => {
  const plans = [
    { id: '1m', name: '1 mês', price: 'R$ 19,90', period: '/mês' },
    { id: '6m', name: '6 meses', price: 'R$ 89,90', period: '/semestre', popular: true },
    { id: '1y', name: '1 ano', price: 'R$ 149,90', period: '/ano' },
  ];

  const handleSubscribe = (planName: string) => {
    // Gerar ID apenas agora, se ainda não existir
    let currentId = userData.id;
    if (!currentId) {
      currentId = Math.random().toString(36).substr(2, 9).toUpperCase();
      // Atualiza localmente para persistir
      updateUserData({ id: currentId });
    }

    // Texto exato com ID e Plano escolhido
    const text = `Olá! Quero assinar o RESET – Vício Zero. Meu plano escolhido é: ${planName}. Meu ID único: ${currentId}`;
    
    // Número solicitado: +55 11 91647-7226
    const url = `https://wa.me/5511916477226?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const getTrialRemaining = () => {
    const installDate = new Date(userData.installDate).getTime();
    const now = new Date().getTime();
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const remaining = Math.max(0, Math.ceil((installDate + sevenDaysInMs - now) / (1000 * 60 * 60 * 24)));
    return remaining;
  };

  if (userData.isPremium) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 space-y-8 animate-in zoom-in duration-500">
        <div className="w-28 h-28 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.3)] animate-pulse">
           <Star fill="black" size={56} className="text-black" />
        </div>
        <div>
          <h2 className="text-4xl font-black text-white mb-2 italic">VOCÊ É VIP</h2>
          <p className="text-slate-400 max-w-xs mx-auto">Acesso total liberado para sempre. Obrigado por lutar pela sua liberdade!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <header className="text-center pt-4">
        <div className="inline-flex items-center justify-center p-4 bg-amber-500/10 rounded-3xl text-amber-500 mb-6 border border-amber-500/20">
          <Star fill="currentColor" size={32} />
        </div>
        <h2 className="text-3xl font-black text-white mb-2 italic tracking-tight uppercase">Área VIP</h2>
        <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">Assine para desbloquear todas as ferramentas e apoiar o projeto.</p>
        
        <div className="mt-6 bg-slate-900 border border-slate-800 rounded-full py-2.5 px-6 inline-block">
           <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">
             {getTrialRemaining() > 0 ? `${getTrialRemaining()} dias de teste grátis restantes` : "Período de teste encerrado"}
           </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3">
        <Benefit icon={<ShieldCheck className="text-blue-500" />} text="Estatísticas de progresso detalhadas" />
        <Benefit icon={<Zap className="text-amber-500" />} text="Desafios e conquistas exclusivas" />
        <Benefit icon={<MessageCircle className="text-green-500" />} text="Suporte VIP via WhatsApp" />
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest text-center">Escolha o plano para assinar</h3>
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => handleSubscribe(plan.name)}
            className={`w-full p-6 rounded-[32px] border text-left flex justify-between items-center transition-all ${
              plan.popular ? 'bg-blue-600 border-blue-400 shadow-xl shadow-blue-600/30 ring-2 ring-blue-400/20' : 'bg-slate-900 border-slate-800'
            } active:scale-95`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-black text-xl italic ${plan.popular ? 'text-white' : 'text-slate-200'}`}>{plan.name}</span>
                {plan.popular && <span className="bg-white text-blue-600 text-[10px] px-2.5 py-1 rounded-full font-black uppercase">MELHOR VALOR</span>}
              </div>
              <p className={`text-xs font-medium ${plan.popular ? 'text-blue-100' : 'text-slate-500'}`}>Desbloqueio imediato {plan.period}</p>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-black ${plan.popular ? 'text-white' : 'text-blue-500'}`}>{plan.price}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="pt-4 text-center">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-6 px-10">
          Ao clicar em um plano, seu ID será gerado e você falará conosco no WhatsApp Business.
        </p>
      </div>
    </div>
  );
};

const Benefit: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50 flex items-center gap-4">
    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <p className="text-sm font-bold text-slate-300">{text}</p>
    <Check className="ml-auto text-blue-500 opacity-50" size={16} />
  </div>
);

export default PremiumTab;
