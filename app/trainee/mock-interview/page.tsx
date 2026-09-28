'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { interviewRoles, interviewTips, type InterviewRole, type InterviewQuestion } from '@/data/mockInterview';
import {
  Radio, Play, Clock, Target, CheckCircle2, AlertTriangle,
  ArrowRight, ChevronRight, Star, Award, BookOpen,
  Mic, MicOff, Send, RotateCcw, Sparkles
} from 'lucide-react';

type InterviewStage = 'select-role' | 'preparing' | 'in-progress' | 'reviewing' | 'completed';

interface QuestionResult {
  questionId: string;
  answer: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export default function MockInterviewPage() {
  const { showToast } = useApp();
  const [stage, setStage] = useState<InterviewStage>('select-role');
  const [selectedRole, setSelectedRole] = useState<InterviewRole | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = selectedRole?.questions[currentQuestionIndex];

  useEffect(() => {
    if (stage === 'in-progress' && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }
    if (stage === 'in-progress' && timeLeft === 0 && currentQuestion) {
      handleSubmitAnswer();
    }
  }, [timeLeft, stage]);

  const startInterview = (role: InterviewRole) => {
    setSelectedRole(role);
    setStage('preparing');
  };

  const beginInterview = () => {
    setStage('in-progress');
    setCurrentQuestionIndex(0);
    setResults([]);
    if (selectedRole?.questions[0]) {
      setTimeLeft(selectedRole.questions[0].timeLimit);
    }
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !selectedRole) return;

    // Simulate AI scoring
    const answerLength = answer.trim().length;
    const expectedPoints = currentQuestion.expectedPoints;
    let matchedPoints = 0;
    expectedPoints.forEach(point => {
      const keywords = point.toLowerCase().split(' ').filter(w => w.length > 3);
      const answerLower = answer.toLowerCase();
      if (keywords.some(kw => answerLower.includes(kw))) matchedPoints++;
    });

    const coverageRatio = Math.min(1, matchedPoints / Math.max(1, expectedPoints.length));
    const lengthBonus = Math.min(0.2, answerLength / 500 * 0.2);
    const scoreRatio = Math.min(1, coverageRatio + lengthBonus);
    const score = Math.round(scoreRatio * currentQuestion.maxScore);

    const feedbacks = [
      score >= currentQuestion.maxScore * 0.8 ? 'Excellent answer covering most key points.' :
      score >= currentQuestion.maxScore * 0.5 ? 'Good answer, but some important aspects were missed.' :
      'Answer needs more depth. Review the key concepts and try to cover more aspects.',
    ];

    const result: QuestionResult = {
      questionId: currentQuestion.id,
      answer,
      score,
      maxScore: currentQuestion.maxScore,
      feedback: feedbacks[0],
    };

    const newResults = [...results, result];
    setResults(newResults);
    setAnswer('');

    if (currentQuestionIndex < selectedRole.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(selectedRole.questions[nextIndex].timeLimit);
    } else {
      setStage('completed');
      showToast('Mock interview completed! Review your results.', 'success');
    }
  };

  const totalScore = results.reduce((a, r) => a + r.score, 0);
  const maxTotalScore = results.reduce((a, r) => a + r.maxScore, 0);
  const percentage = maxTotalScore > 0 ? Math.round((totalScore / maxTotalScore) * 100) : 0;

  const resetInterview = () => {
    setStage('select-role');
    setSelectedRole(null);
    setCurrentQuestionIndex(0);
    setResults([]);
    setAnswer('');
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <DashboardLayout
      role="trainee"
      title="AI Mock Interview"
      subtitle="Simulate a real job interview — get AI-powered feedback on your responses"
    >
      {/* Stage: Select Role */}
      {stage === 'select-role' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <Card padding="md" className="bg-gradient-to-br from-blue-600 to-indigo-700 border-none text-white">
              <Radio size={20} className="mb-2 opacity-80" />
              <p className="text-lg font-bold">Practice Makes Perfect</p>
              <p className="text-xs opacity-80 mt-1">Select a target role to start a simulated interview. You&apos;ll answer questions just like in a real interview, and receive detailed feedback.</p>
            </Card>
            <Card padding="md" className="bg-white border-slate-200">
              <p className="text-xs font-semibold text-slate-600 mb-2">💡 Interview Tips</p>
              <div className="space-y-1.5">
                {interviewTips.slice(0, 4).map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={11} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[10px] text-slate-600">{tip}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <h3 className="text-sm font-semibold text-slate-700 mb-3">Select Target Role</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {interviewRoles.map((role) => (
              <Card key={role.id} padding="md" className="bg-white border-slate-200 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => startInterview(role)}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{role.title}</p>
                    <Badge variant="neutral" size="sm" className="mt-1">{role.sector}</Badge>
                  </div>
                  <Badge variant={role.difficulty === 'beginner' ? 'success' : role.difficulty === 'intermediate' ? 'warning' : 'error'} size="sm">
                    {role.difficulty}
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">{role.description}</p>
                <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1"><Target size={11} /> {role.questions.length} questions</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> ~{role.totalTime} min</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {role.requiredSkills.slice(0, 4).map((s, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-full">{s}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-blue-600 font-medium">
                  Start Interview <ArrowRight size={13} />
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Stage: Preparing */}
      {stage === 'preparing' && selectedRole && (
        <Card padding="lg" className="bg-white border-slate-200 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Radio size={28} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Interview: {selectedRole.title}</h2>
            <p className="text-xs text-slate-500 mt-1">{selectedRole.sector} • {selectedRole.questions.length} questions • ~{selectedRole.totalTime} min</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 mb-4">
            <p className="text-xs font-semibold text-slate-700 mb-2">Required Skills for this Role:</p>
            <div className="flex flex-wrap gap-2">
              {selectedRole.requiredSkills.map((s, i) => (
                <Badge key={i} variant="info" size="sm">{s}</Badge>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
            <p className="text-xs font-semibold text-amber-700 mb-1">📋 Interview Guidelines</p>
            <ul className="text-[10px] text-amber-700 space-y-1">
              <li>• Each question has a time limit — answer before time runs out</li>
              <li>• Type your response naturally, as if speaking to an interviewer</li>
              <li>• Cover key technical points and practical examples</li>
              <li>• Your answer will be evaluated against expected competencies</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={resetInterview} className="flex-1">← Back</Button>
            <Button variant="primary" onClick={beginInterview} className="flex-1">
              <Play size={14} className="mr-1" /> Begin Interview
            </Button>
          </div>
        </Card>
      )}

      {/* Stage: In Progress */}
      {stage === 'in-progress' && selectedRole && currentQuestion && (
        <div className="max-w-3xl mx-auto">
          {/* Progress bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Question {currentQuestionIndex + 1} of {selectedRole.questions.length}</span>
              <Badge variant={currentQuestion.difficulty === 'easy' ? 'success' : currentQuestion.difficulty === 'medium' ? 'warning' : 'error'} size="sm">
                {currentQuestion.difficulty}
              </Badge>
              <Badge variant="neutral" size="sm">{currentQuestion.category}</Badge>
            </div>
            <div className={`flex items-center gap-1 text-xs font-mono font-bold ${timeLeft < 30 ? 'text-red-600' : 'text-slate-600'}`}>
              <Clock size={13} /> {formatTime(timeLeft)}
            </div>
          </div>

          <ProgressBar value={((currentQuestionIndex) / selectedRole.questions.length) * 100} size="sm" color="brand" />

          <Card padding="lg" className="bg-white border-slate-200 mt-4">
            {/* Question */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
              <p className="text-xs font-semibold text-blue-600 mb-1">INTERVIEWER</p>
              <p className="text-sm text-slate-800 font-medium leading-relaxed">{currentQuestion.question}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-slate-500">Max Score: {currentQuestion.maxScore} points</span>
              </div>
            </div>

            {/* Answer area */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-600">YOUR ANSWER</p>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full transition-colors ${
                    isRecording ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {isRecording ? <MicOff size={11} /> : <Mic size={11} />}
                  {isRecording ? 'Stop' : 'Voice'}
                </button>
              </div>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here... Be specific and cover key points."
                className="disha-input min-h-[160px] resize-y text-sm"
                autoFocus
              />
              <p className="text-[10px] text-slate-400 mt-1">{answer.length} characters</p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentQuestionIndex < selectedRole.questions.length - 1) {
                    setAnswer('');
                    handleSubmitAnswer();
                  }
                }}
                className="text-xs"
              >
                Skip Question
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitAnswer}
                disabled={answer.trim().length < 10}
                className="flex-1"
              >
                <Send size={14} className="mr-1" />
                {currentQuestionIndex < selectedRole.questions.length - 1 ? 'Submit & Next' : 'Submit & Finish'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Stage: Completed */}
      {stage === 'completed' && selectedRole && (
        <div className="max-w-3xl mx-auto">
          {/* Score Summary */}
          <Card padding="lg" className={`border-2 mb-6 ${
            percentage >= 80 ? 'bg-emerald-50 border-emerald-300' :
            percentage >= 60 ? 'bg-amber-50 border-amber-300' :
            'bg-red-50 border-red-300'
          }`}>
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 ${
                percentage >= 80 ? 'bg-emerald-100' : percentage >= 60 ? 'bg-amber-100' : 'bg-red-100'
              }`}>
                <span className={`text-2xl font-bold ${
                  percentage >= 80 ? 'text-emerald-700' : percentage >= 60 ? 'text-amber-700' : 'text-red-700'
                }`}>{percentage}%</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">Interview Complete — {selectedRole.title}</h2>
              <p className="text-sm text-slate-600 mt-1">
                Score: <strong>{totalScore}</strong> / {maxTotalScore} points
              </p>
              <Badge
                variant={percentage >= 80 ? 'success' : percentage >= 60 ? 'warning' : 'error'}
                size="sm"
                className="mt-2"
              >
                {percentage >= 80 ? '✅ Interview Ready' : percentage >= 60 ? '⚠️ Needs Practice' : '❌ More Preparation Needed'}
              </Badge>
            </div>
          </Card>

          {/* Per-Question Results */}
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Question-by-Question Review</h3>
          <div className="space-y-4 mb-6">
            {results.map((r, i) => {
              const q = selectedRole.questions.find(q => q.id === r.questionId)!;
              const pct = Math.round((r.score / r.maxScore) * 100);
              return (
                <Card key={r.questionId} padding="md" className="bg-white border-slate-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        pct >= 80 ? 'bg-emerald-100 text-emerald-700' :
                        pct >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {i + 1}
                      </span>
                      <Badge variant="neutral" size="sm">{q.category}</Badge>
                    </div>
                    <span className={`text-sm font-bold ${
                      pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {r.score}/{r.maxScore}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium mb-2">{q.question}</p>

                  <div className="bg-slate-50 rounded-lg p-2.5 mb-2">
                    <p className="text-[10px] font-semibold text-slate-500 mb-1">YOUR ANSWER</p>
                    <p className="text-xs text-slate-600">{r.answer || '(No answer provided)'}</p>
                  </div>

                  <div className={`rounded-lg p-2.5 ${
                    pct >= 80 ? 'bg-emerald-50' : pct >= 50 ? 'bg-amber-50' : 'bg-red-50'
                  }`}>
                    <p className="text-[10px] font-semibold text-slate-600 mb-1">📝 FEEDBACK</p>
                    <p className="text-xs text-slate-600">{r.feedback}</p>
                  </div>

                  <div className="mt-2">
                    <p className="text-[10px] font-semibold text-slate-500 mb-1">KEY POINTS EXPECTED:</p>
                    <div className="flex flex-wrap gap-1">
                      {q.expectedPoints.slice(0, 4).map((p, j) => (
                        <span key={j} className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-full">{p}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Sample Answers */}
          <Card padding="md" className="bg-blue-50 border-blue-200 mb-6">
            <p className="text-xs font-semibold text-blue-700 mb-2">📚 Sample Answers for Reference</p>
            <div className="space-y-3">
              {selectedRole.questions.slice(0, 2).map((q) => (
                <div key={q.id} className="bg-white rounded-lg p-3">
                  <p className="text-xs font-medium text-slate-700 mb-1">{q.question}</p>
                  <p className="text-[10px] text-slate-600 italic">{q.sampleAnswer}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" onClick={resetInterview} className="flex-1">
              <RotateCcw size={14} className="mr-1" /> Try Another Role
            </Button>
            <Button variant="primary" onClick={() => { resetInterview(); startInterview(selectedRole); }} className="flex-1">
              <RotateCcw size={14} className="mr-1" /> Retry This Interview
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
