
export interface UserData {
  id: string;
  startDate: string | null;
  reason: string;
  isPremium: boolean;
  history: HistoryEntry[];
  challengeProgress: number[];
  relapses: number;
  bestStreak: number;
  points: number;
  unlockedThemes: string[];
  activeTheme: string;
}

export interface HistoryEntry {
  date: string;
  type: 'relapse' | 'emergency_victory' | 'challenge_complete';
}

export enum Tab {
  HOME = 'home',
  EMERGENCY = 'emergency',
  CHALLENGE = 'challenge',
  PROGRESS = 'progress',
  PREMIUM = 'premium'
}

export const THEMES = {
  indigo: { primary: 'indigo-500', bg: 'slate-900', border: 'slate-800', text: 'indigo-400' },
  emerald: { primary: 'emerald-500', bg: 'slate-900', border: 'slate-800', text: 'emerald-400' },
  rose: { primary: 'rose-500', bg: 'slate-900', border: 'slate-800', text: 'rose-400' },
  amber: { primary: 'amber-500', bg: 'slate-900', border: 'slate-800', text: 'amber-400' },
};
