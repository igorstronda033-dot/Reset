
export interface UserData {
  id: string;
  installDate: string; // Para controlar os 7 dias grátis
  startDate: string | null;
  targetAddiction: string;
  reason: string;
  targetGoal: string; // Ex: "90 dias"
  hasCompletedOnboarding: boolean;
  isPremium: boolean;
  points: number;
  relapses: number;
  bestStreak: number;
  lastCheckIn: string | null; // Data do último "Estou limpo hoje"
  history: HistoryEntry[];
  challengeProgress: number[];
  unlockedThemes: string[];
  activeTheme: string;
}

export interface HistoryEntry {
  date: string;
  type: 'relapse' | 'checkin' | 'challenge_complete' | 'emergency_victory';
}

export enum Tab {
  HOME = 'home',
  PROGRESS = 'progress',
  MOTIVATION = 'motivation',
  CHALLENGES = 'challenges',
  PREMIUM = 'premium'
}

// Added THEMES constant for theme shop and active theme management
export const THEMES: Record<string, { primary: string }> = {
  blue: { primary: 'blue-600' },
  indigo: { primary: 'indigo-500' },
  emerald: { primary: 'emerald-500' },
  rose: { primary: 'rose-500' },
  amber: { primary: 'amber-500' }
};
