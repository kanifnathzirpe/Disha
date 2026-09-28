'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { skillQuestProfile, todayQuests, dailyMissions, leaderboard, skillQuestQuiz } from '@/data/mockSkillQuest';
import {
  Gamepad2, Flame, Star, Trophy, Target, Clock, CheckCircle2,
  Lock, Zap, BookOpen, Play, Award, TrendingUp, Users, Crown
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function SkillQuestPage() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'quests' | 'missions' | 'leaderboard' | 'badges'>('quests');
  const [quests, setQuests] = useState(todayQuests);
  const [missions, setMissions] = useState(dailyMissions);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizDone, setQuizDone] = useState(false);

  const profile = skillQuestProfile;
  const xpProgress = Math.round((profile.currentXP / profile.nextLevelXP) * 100);

  const completeQuest = (id: string) => {
    setQuests(prev => prev.map(q => q.id === id ? { ...q, completed: true } : q));
    showToast('Quest completed! +XP earned 🎉', 'success');
  };

  const tabs = [
    { key: 'quests' as const, label: "Today's Quests", icon: <Zap size={14} /> },
    { key: 'missions' as const, label: 'Missions', icon: <Target size={14} /> },
    { key: 'leaderboard' as const, label: 'Leaderboard', icon: <Trophy size={14} /> },
    { key: 'badges' as const, label: 'Badges', icon: <Award size={14} /> },
  ];

  return (
    <DashboardLayout
      role="trainee"
      title="SkillQuest"
      subtitle="Daily micro-learning, quizzes & career missions — build streaks, earn XP!"
    >
      {/* Profile Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Card padding="md" className="bg-gradient-to-br from-indigo-600 to-purple-700 border-none text-white sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg font-bold">L{profile.level}</span>
            </div>
            <div>
              <p className="text-xs opacity-80">Level {profile.level}</p>
              <p className="text-lg font-bold">{profile.totalXP.toLocaleString()} XP</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-[10px] opacity-80 mb-1">
              <span>{profile.currentXP} / {profile.nextLevelXP} XP</span>
              <span>Level {profile.level + 1}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${xpProgress}%` }} />
            </div>
          </div>
        </Card>

        <Card padding="md" className="bg-gradient-to-br from-orange-500 to-red-600 border-none text-white">
          <Flame size={18} className="mb-1 opacity-80" />
          <p className="text-2xl font-bold">{profile.streak} 🔥</p>
          <p className="text-[10px] opacity-80">Day Streak (Best: {profile.longestStreak})</p>
        </Card>

        <Card padding="md" className="bg-white border-slate-200">
          <Trophy size={16} className="text-amber-500 mb-1" />
          <p className="text-2xl font-bold text-slate-900">#{profile.rank}</p>
          <p className="text-[10px] text-slate-500">Rank ({profile.totalLearners.toLocaleString()} learners)</p>
        </Card>

        <Card padding="md" className="bg-white border-slate-200">
          <Award size={16} className="text-purple-500 mb-1" />
          <p className="text-2xl font-bold text-slate-900">{profile.badges.filter(b => b.earned).length}</p>
          <p className="text-[10px] text-slate-500">Badges ({profile.badges.length} total)</p>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card padding="md" className="bg-white border-slate-200 mb-6">
        <CardTitle>Weekly Activity</CardTitle>
        <div className="h-40 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profile.weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
              <Bar dataKey="xp" name="XP Earned" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-lg mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === tab.key ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Today's Quests */}
      {activeTab === 'quests' && (
        <div className="space-y-3">
          {!showQuiz ? (
            quests.map(quest => (
              <Card key={quest.id} padding="md" className={`border transition-all ${
                quest.completed ? 'bg-emerald-50/50 border-emerald-200' :
                quest.locked ? 'bg-slate-50 border-slate-200 opacity-60' :
                'bg-white border-slate-200 hover:shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      quest.completed ? 'bg-emerald-100' :
                      quest.locked ? 'bg-slate-200' :
                      quest.type === 'quiz' ? 'bg-blue-100' :
                      quest.type === 'video' ? 'bg-purple-100' :
                      quest.type === 'challenge' ? 'bg-amber-100' :
                      quest.type === 'reading' ? 'bg-teal-100' : 'bg-indigo-100'
                    }`}>
                      {quest.completed ? <CheckCircle2 size={16} className="text-emerald-600" /> :
                       quest.locked ? <Lock size={16} className="text-slate-400" /> :
                       quest.type === 'quiz' ? <Gamepad2 size={16} className="text-blue-600" /> :
                       quest.type === 'video' ? <Play size={16} className="text-purple-600" /> :
                       <BookOpen size={16} className="text-teal-600" />
                      }
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${quest.completed ? 'text-emerald-700 line-through' : 'text-slate-800'}`}>
                        {quest.title}
                      </p>
                      <p className="text-[10px] text-slate-500">{quest.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
                        <span>{quest.skill}</span>
                        <span><Clock size={10} className="inline mr-0.5" />{quest.duration} min</span>
                        <Badge variant={quest.difficulty === 'easy' ? 'success' : quest.difficulty === 'medium' ? 'warning' : 'error'} size="sm">
                          {quest.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-indigo-600">+{quest.xp} XP</p>
                    {!quest.completed && !quest.locked && (
                      <Button
                        size="sm"
                        variant={quest.type === 'quiz' ? 'primary' : 'outline'}
                        onClick={() => {
                          if (quest.type === 'quiz') { setShowQuiz(true); setQuizIndex(0); setQuizAnswers({}); setQuizDone(false); }
                          else completeQuest(quest.id);
                        }}
                        className="mt-1 text-[10px] h-7"
                      >
                        {quest.type === 'quiz' ? 'Start Quiz' : 'Start'}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            /* Quick Quiz */
            <Card padding="lg" className="bg-white border-slate-200 max-w-xl mx-auto">
              {!quizDone ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="info" size="sm">Question {quizIndex + 1}/{skillQuestQuiz.length}</Badge>
                    <span className="text-xs text-indigo-600 font-semibold">+{skillQuestQuiz[quizIndex].xp} XP</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 mb-4">{skillQuestQuiz[quizIndex].question}</p>
                  <div className="space-y-2">
                    {skillQuestQuiz[quizIndex].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setQuizAnswers(prev => ({ ...prev, [skillQuestQuiz[quizIndex].id]: i }))}
                        className={`w-full p-3 rounded-lg border-2 text-left text-xs transition-all ${
                          quizAnswers[skillQuestQuiz[quizIndex].id] === i
                            ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="primary"
                    className="w-full mt-4"
                    disabled={quizAnswers[skillQuestQuiz[quizIndex].id] === undefined}
                    onClick={() => {
                      if (quizIndex < skillQuestQuiz.length - 1) setQuizIndex(i => i + 1);
                      else {
                        setQuizDone(true);
                        completeQuest('tq1');
                      }
                    }}
                  >
                    {quizIndex < skillQuestQuiz.length - 1 ? 'Next' : 'Finish Quiz'}
                  </Button>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={28} className="text-emerald-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-900">Quiz Complete! 🎉</p>
                  <p className="text-sm text-slate-600">
                    {Object.entries(quizAnswers).filter(([id, ans]) => skillQuestQuiz.find(q => q.id === id)?.correct === ans).length}/{skillQuestQuiz.length} correct
                  </p>
                  <Button variant="outline" onClick={() => setShowQuiz(false)} className="mt-4">
                    Back to Quests
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>
      )}

      {/* Missions */}
      {activeTab === 'missions' && (
        <div className="space-y-3">
          {missions.map(mission => (
            <Card key={mission.id} padding="md" className={`border ${mission.completed ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={mission.type === 'daily' ? 'info' : mission.type === 'weekly' ? 'warning' : 'error'} size="sm">
                    {mission.type}
                  </Badge>
                  <p className="text-xs font-semibold text-slate-800">{mission.title}</p>
                </div>
                <span className="text-xs font-bold text-indigo-600">+{mission.xp} XP</span>
              </div>
              <p className="text-[10px] text-slate-500 mb-2">{mission.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <ProgressBar
                    value={mission.type === 'career' ? mission.progress : (mission.progress / mission.target) * 100}
                    size="sm"
                    color={mission.completed ? 'success' : 'brand'}
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {mission.type === 'career' ? `${mission.progress}%` : `${mission.progress}/${mission.target}`}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <Card padding="md" className="bg-white border-slate-200">
          <CardTitle>District Leaderboard — Pune</CardTitle>
          <div className="space-y-1.5 mt-3">
            {leaderboard.map(entry => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-2.5 rounded-lg transition-colors ${
                  entry.isCurrentUser ? 'bg-blue-50 border border-blue-200' :
                  entry.rank <= 3 ? 'bg-amber-50/50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    entry.rank === 1 ? 'bg-amber-400 text-white' :
                    entry.rank === 2 ? 'bg-slate-400 text-white' :
                    entry.rank === 3 ? 'bg-orange-400 text-white' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {entry.rank <= 3 ? <Crown size={12} /> : entry.rank}
                  </span>
                  <div>
                    <p className={`text-xs font-semibold ${entry.isCurrentUser ? 'text-blue-700' : 'text-slate-800'}`}>
                      {entry.name} {entry.isCurrentUser && '(You)'}
                    </p>
                    <p className="text-[10px] text-slate-400">{entry.district} • Level {entry.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-indigo-600">{entry.xp.toLocaleString()} XP</p>
                  <p className="text-[10px] text-slate-400">{entry.streak}🔥</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Badges */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {profile.badges.map(badge => (
            <Card key={badge.id} padding="md" className={`text-center border ${
              badge.earned ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-50'
            }`}>
              <span className="text-3xl">{badge.icon}</span>
              <p className="text-xs font-bold text-slate-800 mt-2">{badge.name}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{badge.description}</p>
              {badge.earned ? (
                <Badge variant="success" size="sm" className="mt-2">Earned</Badge>
              ) : (
                <Badge variant="neutral" size="sm" className="mt-2"><Lock size={9} className="mr-0.5" />Locked</Badge>
              )}
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
