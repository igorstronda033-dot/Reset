
import React, { useState } from 'react';
import { Check, Star, MessageSquare, ShieldCheck, Zap, Lock, Unlock } from 'lucide-react';
import { UserData } from '../types';

interface PremiumTabProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const PremiumTab: React.FC<PremiumTabProps> = ({ userData, updateUserData }) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const plans = [
    { id: '1month', title: '1 Mês', price: 'R$ 19,90', period: '/mês' },
    { id: '6months', title: '6 Meses', price: 'R$ 89,90', period: ' (Economize 25%)', popular: true },
    { id: '1year', title: '1 Ano', price: 'R$ 149,90', period: ' (Melhor Valor)' },
  ];

  const handleSubscribe = (plan: string) => {
    const message = `Olá! Gostaria de assinar o Plano Premium (${plan}) no app RESET. Meu ID de usuário é: ${userData.id}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5500000000000?text=${encoded}`, '_blank');
  };

  const handleValidateCode = () => {
    // Fake validation logic
    if (promoCode.toUpperCase() === 'RESET100' || promoCode.toUpperCase() === 'ZEROVICIO') {
      updateUserData({ isPremium: true });
      alert("Parabéns! Acesso Premium liberado com sucesso.");
      setPromoCode('');
    } else {
      setPromoError("Código inválido ou expirado.");
      setTimeout(() => setPromoError(''), 3000);
    }
  };

  if (userData.isPremium) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/20">
          <ShieldCheck size={48} className="text-slate-950" />
        </div>
        <h2 className="text-3xl font-bold text-white">Você é Premium!</h2>
        <p className="text-slate-400 max-w-[280px]">
          Todos os recursos foram desbloqueados. Obrigado por apoiar o RESET – Vício Zero.
        </p>
        <div className="bg-slate-800 p-4 rounded-2xl w-full border border-slate-700">
          <p className="text-amber-400 text-xs font-bold uppercase mb-1">Status da Assinatura</p>
          <p className="text-white font-medium">Ativa Vitalícia (Via Código)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="text-center">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 mb-4">
          <Star fill="currentColor" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Seja PREMIUM</h2>
        <p className="text-slate-400 text-sm">Desbloqueie o poder total da sua liberdade.</p>
      </header>

      {/* Benefits */}
      <div className="space-y-3">
        <Benefit icon={<ShieldCheck size={18} />} text="Acesso ilimitado ao modo S.O.S" />
        <Benefit icon={<Zap size={18} />} text="Conselhos personalizados por IA" />
        <Benefit icon={<MessageSquare size={18} />} text="Suporte prioritário via WhatsApp" />
        <Benefit icon={<Lock size={18} />} text="Proteção por Biometria/Senha" />
      </div>

      {/* Plans */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <button 
            key={plan.id}
            onClick={() => handleSubscribe(plan.title)}
            className={`w-full p-5 rounded-3xl border text-left flex justify-between items-center transition-all ${
              plan.popular ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-500/20' : 'bg-slate-800 border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${plan.popular ? 'text-white' : 'text-slate-200'}`}>{plan.title}</span>
                {plan.popular && <span className="text-[10px] bg-white text-indigo-600 px-2 py-0.5 rounded-full font-black uppercase">Popular</span>}
              </div>
              <p className={`text-xs ${plan.popular ? 'text-indigo-200' : 'text-slate-500'}`}>{plan.period}</p>
            </div>
            <div className="text-right">
              <span className={`text-lg font-bold ${plan.popular ? 'text-white' : 'text-indigo-400'}`}>{plan.price}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Coupon Area */}
      <div className="pt-4 space-y-3">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center">Tem um código?</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ex: RESET100"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 text-white outline-none focus:border-indigo-500 transition-colors"
          />
          <button 
            onClick={handleValidateCode}
            className="bg-indigo-500 hover:bg-indigo-400 px-6 rounded-2xl font-bold flex items-center gap-2"
          >
            <Unlock size={18} /> ATIVAR
          </button>
        </div>
        {promoError && <p className="text-rose-500 text-xs text-center animate-pulse">{promoError}</p>}
      </div>
      
      <p className="text-[10px] text-slate-500 text-center pb-8">
        Ao assinar, você concorda com nossos Termos de Uso e Política de Privacidade.
      </p>
    </div>
  );
};

const Benefit: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-slate-300 bg-slate-800/20 p-3 rounded-xl border border-slate-800/50">
    <div className="text-indigo-400">{icon}</div>
    <span className="text-sm font-medium">{text}</span>
    <Check className="ml-auto text-emerald-500" size={16} />
  </div>
);

export default PremiumTab;
