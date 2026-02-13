
import React, { useState, useEffect } from 'react';
import { Home, ShieldAlert, Trophy, BarChart3, Star } from 'lucide-react';
import HomeTab from './components/HomeTab';
import EmergencyTab from './components/EmergencyTab';
import ChallengeTab from './components/ChallengeTab';
import ProgressTab from './components/ProgressTab';
import PremiumTab from './components/PremiumTab';
import { UserData, Tab } from './types';

const STORAGE_KEY = 'reset_vicio_zero_data';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [userData, setUserData] = useState<UserData>({
    id: '',
    startDate: null,
    reason: 'Minha Saúde e Futuro',
    isPremium: false,
    history: [],
    challengeProgress: [],
    relapses: 0,
    bestStreak: 0,
    points: 0,
    unlockedThemes: ['indigo'],
    activeTheme: 'indigo'
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setUserData(JSON.parse(saved));
    } else {
      const initial: UserData = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        startDate: new Date().toISOString(),
        reason: 'Minha Saúde e Liberdade',
        isPremium: false,
        history: [],
        challengeProgress: [],
        relapses: 0,
        bestStreak: 0,
        points: 100, // Pontos iniciais de boas-vindas
        unlockedThemes: ['indigo'],
        activeTheme: 'indigo'
      };
      setUserData(initial);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    }
  }, []);

  useEffect(() => {
    if (userData.id) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    }
  }, [userData]);

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const themeColor = userData.activeTheme === 'indigo' ? 'indigo' : 
                   userData.activeTheme === 'emerald' ? 'emerald' :
                   userData.activeTheme === 'rose' ? 'rose' : 'amber';

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME: return <HomeTab userData={userData} updateUserData={updateUserData} onEmergency={() => setActiveTab(Tab.EMERGENCY)} />;
      case Tab.EMERGENCY: return <EmergencyTab userData={userData} updateUserData={updateUserData} onComplete={() => setActiveTab(Tab.HOME)} />;
      case Tab.CHALLENGE: return <ChallengeTab userData={userData} updateUserData={updateUserData} />;
      case Tab.PROGRESS: return <ProgressTab userData={userData} updateUserData={updateUserData} />;
      case Tab.PREMIUM: return <PremiumTab userData={userData} updateUserData={updateUserData} />;
      default: return <HomeTab userData={userData} updateUserData={updateUserData} onEmergency={() => setActiveTab(Tab.EMERGENCY)} />;
    }
  };

  return (
    <div className={`mobile-container flex flex-col min-h-screen theme-${themeColor}`}>
      <main className="flex-1 overflow-y-auto px-6 py-8">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-t border-slate-800 px-6 py-3 flex justify-between items-center z-50 max-w-[480px] mx-auto">
        <NavButton active={activeTab === Tab.HOME} themeColor={themeColor} onClick={() => setActiveTab(Tab.HOME)} icon={<Home size={24} />} label="Home" />
        <NavButton active={activeTab === Tab.CHALLENGE} themeColor={themeColor} onClick={() => setActiveTab(Tab.CHALLENGE)} icon={<Trophy size={24} />} label="7 Dias" />
        <NavButton active={activeTab === Tab.EMERGENCY} themeColor={themeColor} onClick={() => setActiveTab(Tab.EMERGENCY)} icon={<ShieldAlert size={24} className="text-rose-500" />} label="SOS" />
        <NavButton active={activeTab === Tab.PROGRESS} themeColor={themeColor} onClick={() => setActiveTab(Tab.PROGRESS)} icon={<BarChart3 size={24} />} label="Progresso" />
        <NavButton active={activeTab === Tab.PREMIUM} themeColor={themeColor} onClick={() => setActiveTab(Tab.PREMIUM)} icon={<Star size={24} className={userData.isPremium ? "text-amber-400" : ""} />} label="VIP" />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; themeColor: string; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, themeColor, onClick, icon, label }) => {
  const activeClasses = {
    indigo: 'text-indigo-400',
    emerald: 'text-emerald-400',
    rose: 'text-rose-400',
    amber: 'text-amber-400',
  };
  
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all ${active ? `${activeClasses[themeColor as keyof typeof activeClasses]} scale-110` : 'text-slate-500'}`}
    >
      {icon}
      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    </button>
  );
};

export default App;
