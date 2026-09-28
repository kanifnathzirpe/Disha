// Feature 6: SkillQuest — Career Learning + Streak Data

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'practical' | 'video' | 'reading' | 'challenge';
  skill: string;
  xp: number;
  duration: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  locked: boolean;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  type: 'daily' | 'weekly' | 'career';
  progress: number;
  target: number;
}

export interface SkillQuestProfile {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  totalXP: number;
  streak: number;
  longestStreak: number;
  rank: number;
  totalLearners: number;
  badges: Badge[];
  weeklyActivity: { day: string; xp: number; quests: number }[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  category: 'streak' | 'skill' | 'achievement' | 'milestone';
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  district: string;
  level: number;
  xp: number;
  streak: number;
  isCurrentUser: boolean;
}

export const skillQuestProfile: SkillQuestProfile = {
  level: 12,
  currentXP: 2450,
  nextLevelXP: 3000,
  totalXP: 14450,
  streak: 7,
  longestStreak: 14,
  rank: 23,
  totalLearners: 1248,
  badges: [
    { id: 'b1', name: 'First Steps', description: 'Complete your first quest', icon: '🎯', earned: true, earnedDate: '2026-08-01', category: 'milestone' },
    { id: 'b2', name: '7-Day Streak', description: 'Maintain a 7-day learning streak', icon: '🔥', earned: true, earnedDate: '2026-09-28', category: 'streak' },
    { id: 'b3', name: 'CNC Apprentice', description: 'Complete all beginner CNC quests', icon: '⚙️', earned: true, earnedDate: '2026-08-20', category: 'skill' },
    { id: 'b4', name: 'Quiz Master', description: 'Score 100% on 5 quizzes', icon: '🏆', earned: true, earnedDate: '2026-09-10', category: 'achievement' },
    { id: 'b5', name: '14-Day Streak', description: 'Maintain a 14-day learning streak', icon: '💎', earned: false, category: 'streak' },
    { id: 'b6', name: 'CNC Expert', description: 'Complete all advanced CNC quests', icon: '🔧', earned: false, category: 'skill' },
    { id: 'b7', name: 'Speed Learner', description: 'Complete 10 quests in a single day', icon: '⚡', earned: false, category: 'achievement' },
    { id: 'b8', name: 'Top 10', description: 'Reach top 10 on district leaderboard', icon: '🥇', earned: false, category: 'milestone' },
  ],
  weeklyActivity: [
    { day: 'Mon', xp: 350, quests: 4 },
    { day: 'Tue', xp: 280, quests: 3 },
    { day: 'Wed', xp: 420, quests: 5 },
    { day: 'Thu', xp: 180, quests: 2 },
    { day: 'Fri', xp: 350, quests: 4 },
    { day: 'Sat', xp: 520, quests: 6 },
    { day: 'Sun', xp: 350, quests: 4 },
  ],
};

export const todayQuests: Quest[] = [
  { id: 'tq1', title: 'G-Code Command Quiz', description: 'Test your knowledge of essential G-Code commands for CNC turning', type: 'quiz', skill: 'CNC Programming', xp: 50, duration: 5, difficulty: 'easy', completed: true, locked: false },
  { id: 'tq2', title: 'Tool Offset Compensation', description: 'Learn how to set and adjust tool offset values for precision machining', type: 'video', skill: 'CNC Programming', xp: 30, duration: 8, difficulty: 'easy', completed: true, locked: false },
  { id: 'tq3', title: 'Surface Finish Challenge', description: 'Calculate optimal parameters for achieving Ra 1.6μm surface finish', type: 'challenge', skill: 'Quality Control', xp: 80, duration: 10, difficulty: 'medium', completed: false, locked: false },
  { id: 'tq4', title: 'Blueprint Reading Practice', description: 'Interpret a manufacturing drawing with GD&T symbols', type: 'practical', skill: 'Technical Drawing', xp: 60, duration: 12, difficulty: 'medium', completed: false, locked: false },
  { id: 'tq5', title: '4-Axis Milling Introduction', description: 'Read about 4-axis simultaneous milling concepts and applications', type: 'reading', skill: 'Advanced CNC', xp: 40, duration: 15, difficulty: 'hard', completed: false, locked: true },
];

export const dailyMissions: DailyMission[] = [
  { id: 'dm1', title: 'Complete 3 Quests', description: 'Finish any 3 learning quests today', xp: 100, completed: false, type: 'daily', progress: 2, target: 3 },
  { id: 'dm2', title: 'Score 80%+ on a Quiz', description: 'Achieve at least 80% on any quiz attempt', xp: 75, completed: true, type: 'daily', progress: 1, target: 1 },
  { id: 'dm3', title: 'Learn for 30 Minutes', description: 'Spend at least 30 minutes on learning activities', xp: 50, completed: false, type: 'daily', progress: 21, target: 30 },
  { id: 'dm4', title: 'Weekly: Master 2 Skills', description: 'Complete all quests in 2 skill areas this week', xp: 200, completed: false, type: 'weekly', progress: 1, target: 2 },
  { id: 'dm5', title: 'Career: CNC Programmer Path', description: 'Complete 75% of the CNC Programmer career path', xp: 500, completed: false, type: 'career', progress: 62, target: 75 },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Arun Deshmukh', district: 'Pune', level: 18, xp: 22400, streak: 21, isCurrentUser: false },
  { rank: 2, name: 'Sneha Patil', district: 'Pune', level: 17, xp: 21200, streak: 18, isCurrentUser: false },
  { rank: 3, name: 'Vikram More', district: 'Nashik', level: 16, xp: 19800, streak: 15, isCurrentUser: false },
  { rank: 4, name: 'Priya Kulkarni', district: 'Mumbai', level: 16, xp: 19200, streak: 12, isCurrentUser: false },
  { rank: 5, name: 'Rajesh Gaikwad', district: 'Pune', level: 15, xp: 18600, streak: 9, isCurrentUser: false },
  { rank: 6, name: 'Kavita Shinde', district: 'Nagpur', level: 15, xp: 18100, streak: 11, isCurrentUser: false },
  { rank: 7, name: 'Manish Jadhav', district: 'Pune', level: 14, xp: 17200, streak: 8, isCurrentUser: false },
  { rank: 8, name: 'Pooja Wagh', district: 'Nashik', level: 14, xp: 16800, streak: 6, isCurrentUser: false },
  { rank: 9, name: 'Amit Thorat', district: 'Kolhapur', level: 13, xp: 15900, streak: 10, isCurrentUser: false },
  { rank: 10, name: 'Deepa Sawant', district: 'Mumbai', level: 13, xp: 15400, streak: 5, isCurrentUser: false },
  { rank: 23, name: 'Rahul Sharma', district: 'Pune', level: 12, xp: 14450, streak: 7, isCurrentUser: true },
];

export const skillQuestQuiz = [
  { id: 'sq1', question: 'What G-code is used for a dwell (pause) in CNC programming?', options: ['G02', 'G04', 'G28', 'G40'], correct: 1, xp: 25 },
  { id: 'sq2', question: 'In the 5S methodology, what does "Seiketsu" refer to?', options: ['Sort', 'Set in Order', 'Standardize', 'Sustain'], correct: 2, xp: 25 },
  { id: 'sq3', question: 'What is the primary purpose of coolant during CNC machining?', options: ['Lubricate and cool', 'Only to remove chips', 'To harden the material', 'For rust prevention only'], correct: 0, xp: 25 },
];
