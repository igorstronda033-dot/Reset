
import React, { useState, useEffect } from 'react';
import { Quote, RefreshCcw, Heart, Share2 } from 'lucide-react';
import { getMotivationalQuote } from '../services/geminiService';

const MotivationTab: React.FC = () => {
  const [quote, setQuote] = useState("Sua força é maior que sua vontade momentânea.");
  const [loading, setLoading] = useState(false);

  const fetchNewQuote = async () => {
    setLoading(true);
    const newQuote = await getMotivationalQuote("reflexão profunda sobre liberdade e superação");
    setQuote(newQuote);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <header>
        <h2 className="text-2xl font-bold text-white mb-1">Motivação Diária</h2>
        <p className="text-slate-400 text-sm">Abasteça sua mente com pensamentos positivos.</p>
      </header>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-slate-900 border border-slate-800 rounded-[40px] p-10 flex flex-col items-center text-center">
          <Quote size={40} className="text-blue-500/30 mb-8" />
          <p className={`text-2xl font-medium text-white italic leading-relaxed mb-10 transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
            "{quote}"
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={fetchNewQuote}
              className={`p-4 rounded-2xl bg-slate-800 border border-slate-700 text-blue-500 hover:text-white transition-all active:rotate-180 ${loading ? 'animate-spin' : ''}`}
            >
              <RefreshCcw size={24} />
            </button>
            <button className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-pink-500 hover:text-white">
              <Heart size={24} />
            </button>
            <button className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Leituras Rápidas</h3>
        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">1</div>
           <p className="text-sm text-slate-300 font-medium">A fissura dura em média apenas 15 minutos. Aguente firme.</p>
        </div>
        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">2</div>
           <p className="text-sm text-slate-300 font-medium">Você não está perdendo nada ao largar um vício, você está ganhando tudo.</p>
        </div>
      </div>
    </div>
  );
};

export default MotivationTab;
