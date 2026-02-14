
import React, { useState, useEffect } from 'react';
import { Home, BarChart3, Quote, Trophy, Star } from 'lucide-react';
import HomeTab from './components/HomeTab';
import ProgressTab from './components/ProgressTab';
import MotivationTab from './components/MotivationTab';
import ChallengesTab from './components/ChallengesTab';
import PremiumTab from './components/PremiumTab';
import Onboarding from './components/Onboarding';
import Logo from './components/Logo';
import { UserData, Tab } from './types';

const STORAGE_KEY = 'reset_vicio_zero_final';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [showSplash, setShowSplash] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Carregar dados ou inicializar
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setUserData(JSON.parse(saved));
    } else {
      const initial: UserData = {
        id: '', // ID agora inicia vazio conforme solicitado
        installDate: new Date().toISOString(),
        startDate: null,
        targetAddiction: '',
        reason: '',
        targetGoal: '',
        hasCompletedOnboarding: false,
        isPremium: false,
        points: 0,
        relapses: 0,
        bestStreak: 0,
        lastCheckIn: null,
        history: [],
        challengeProgress: [],
        unlockedThemes: ['blue'],
        activeTheme: 'blue'
      };
      setUserData(initial);
    }

    // Splash Screen de exatamente 1.5 segundos
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    }
  }, [userData]);

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData(prev => prev ? { ...prev, ...newData } : null);
  };

  const isTrialExpired = () => {
    if (!userData || userData.isPremium) return false;
    const installDate = new Date(userData.installDate).getTime();
    const now = new Date().getTime();
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    return (now - installDate) > sevenDaysInMs;
  };

  if (showSplash || !userData) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[1000] p-10 text-center">
        <Logo className="w-48 h-48 mb-6" />
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h1 className="text-white text-4xl font-black italic tracking-tighter mb-1">RESET</h1>
          <p className="text-blue-500 font-bold tracking-[0.4em] text-sm uppercase">Vício Zero</p>
        </div>
      </div>
    );
  }

  if (!userData.hasCompletedOnboarding) {
    return <Onboarding userData={userData} onComplete={updateUserData} />;
  }

  const needsPremium = isTrialExpired();

  const renderContent = () => {
    if (activeTab === Tab.PREMIUM) return <PremiumTab userData={userData} updateUserData={updateUserData} />;
    
    if (needsPremium && [Tab.PROGRESS, Tab.CHALLENGES].includes(activeTab)) {
       return (
         <div className="flex flex-col items-center justify-center h-full text-center px-8 py-10 animate-in fade-in duration-500">
           <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mb-6">
             <Star size={40} className="text-amber-500 fill-amber-500/20" />
           </div>
           <h2 className="text-2xl font-bold text-white mb-3">Teste Grátis Encerrado</h2>
           <p className="text-slate-400 mb-8 leading-relaxed">
             Seus 7 dias de acesso total acabaram. Assine o Premium para desbloquear estatísticas detalhadas e desafios exclusivos.
           </p>
           <button 
             onClick={() => setActiveTab(Tab.PREMIUM)}
             className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
           >
             ASSINAR PREMIUM AGORA
           </button>
         </div>
       );
    }

    switch (activeTab) {
      case Tab.HOME: return <HomeTab userData={userData} updateUserData={updateUserData} />;
      case Tab.PROGRESS: return <ProgressTab userData={userData} updateUserData={updateUserData} />;
      case Tab.MOTIVATION: return <MotivationTab />;
      case Tab.CHALLENGES: return <ChallengesTab userData={userData} updateUserData={updateUserData} />;
      default: return <HomeTab userData={userData} updateUserData={updateUserData} />;
    }
  };

  return (
    <div className="mobile-container bg-black min-h-screen text-white flex flex-col">
      <header className="px-6 pt-8 pb-4 flex justify-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <Logo className="w-14 h-14" />
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-28">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-2xl border-t border-slate-800 flex justify-around items-center pt-3 pb-6 px-2 z-[100] max-w-[480px] mx-auto rounded-t-[40px] shadow-2xl">
        <NavItem active={activeTab === Tab.HOME} onClick={() => setActiveTab(Tab.HOME)} icon={<Home size={24} />} label="Início" />
        <NavItem active={activeTab === Tab.PROGRESS} onClick={() => setActiveTab(Tab.PROGRESS)} icon={<BarChart3 size={24} />} label="Progresso" />
        <NavItem active={activeTab === Tab.MOTIVATION} onClick={() => setActiveTab(Tab.MOTIVATION)} icon={<Quote size={24} />} label="Motivação" />
        <NavItem active={activeTab === Tab.CHALLENGES} onClick={() => setActiveTab(Tab.CHALLENGES)} icon={<Trophy size={24} />} label="Desafios" />
        <NavItem active={activeTab === Tab.PREMIUM} onClick={() => setActiveTab(Tab.PREMIUM)} icon={<Star size={24} className={userData.isPremium ? "text-amber-400 fill-amber-400" : "text-amber-400"} />} label="VIP" />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-blue-500 scale-110' : 'text-slate-500 opacity-80'}`}>
    {icon}
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
