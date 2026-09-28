'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardTitle, Badge, Button, ProgressBar } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { assessmentTests, pastResults, type AssessmentTest, type AssessmentSection, type AssessmentQuestion } from '@/data/mockAssessment';
import {
  Brain, Clock, Target, CheckCircle2, ArrowRight, BookOpen,
  Calculator, Award, AlertTriangle, RotateCcw, ChevronRight, Play
} from 'lucide-react';

type TestStage = 'browse' | 'intro' | 'in-progress' | 'results';

export default function AssessmentPage() {
  const { showToast } = useApp();
  const [stage, setStage] = useState<TestStage>('browse');
  const [selectedTest, setSelectedTest] = useState<AssessmentTest | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const currentSection = selectedTest?.sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestions = selectedTest?.sections.reduce((a, s) => a + s.questions.length, 0) ?? 0;
  const answeredCount = Object.keys(answers).length;

  const startTest = (test: AssessmentTest) => {
    setSelectedTest(test);
    setStage('intro');
  };

  const beginTest = () => {
    setStage('in-progress');
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const selectAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const nextQuestion = () => {
    if (!selectedTest || !currentSection) return;
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else if (currentSectionIndex < selectedTest.sections.length - 1) {
      setCurrentSectionIndex(i => i + 1);
      setCurrentQuestionIndex(0);
    } else {
      setStage('results');
      showToast('Assessment completed! Review your results.', 'success');
    }
  };

  const calculateResults = () => {
    if (!selectedTest) return { total: 0, max: 0, sections: [] as { title: string; correct: number; total: number }[] };
    let total = 0;
    let max = 0;
    const sections = selectedTest.sections.map(section => {
      let correct = 0;
      section.questions.forEach(q => {
        max++;
        if (answers[q.id] === q.correctIndex) { correct++; total++; }
      });
      return { title: section.title, correct, total: section.questions.length };
    });
    return { total, max, sections };
  };

  const result = calculateResults();
  const percentage = result.max > 0 ? Math.round((result.total / result.max) * 100) : 0;

  return (
    <DashboardLayout
      role="trainee"
      title="Aptitude & Technical Assessment"
      subtitle="Measure your actual employability with skill-specific assessments"
    >
      {stage === 'browse' && (
        <>
          {/* Past Results */}
          {pastResults.length > 0 && (
            <Card padding="md" className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-emerald-700">🏅 Latest Assessment Result</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">{pastResults[0].testTitle}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500">{pastResults[0].date}</span>
                    <Badge variant={pastResults[0].passed ? 'success' : 'error'} size="sm">
                      {pastResults[0].passed ? 'PASSED' : 'FAILED'} — {pastResults[0].percentage}%
                    </Badge>
                    {pastResults[0].badge && (
                      <Badge variant="info" size="sm">🏆 {pastResults[0].badge}</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">{pastResults[0].percentage}%</p>
                  <p className="text-[10px] text-slate-500">{pastResults[0].totalScore}/{pastResults[0].maxScore}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {pastResults[0].sectionScores.map((s, i) => (
                  <div key={i} className="bg-white rounded-md p-2">
                    <p className="text-[10px] text-slate-500">{s.sectionTitle}</p>
                    <p className="text-xs font-bold text-slate-800">{s.percentage}%</p>
                    <ProgressBar value={s.percentage} size="sm" color={s.percentage >= 70 ? 'success' : 'warning'} />
                  </div>
                ))}
              </div>
            </Card>
          )}

          <h3 className="text-sm font-semibold text-slate-700 mb-3">Available Assessments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessmentTests.map(test => (
              <Card key={test.id} padding="md" className="bg-white border-slate-200 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => startTest(test)}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      test.type === 'aptitude' ? 'bg-blue-100' : 'bg-amber-100'
                    }`}>
                      {test.type === 'aptitude' ? <Brain size={16} className="text-blue-600" /> : <Target size={16} className="text-amber-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{test.title}</p>
                      <Badge variant={test.type === 'aptitude' ? 'info' : 'warning'} size="sm">{test.type}</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mb-3">{test.description}</p>
                {test.targetRole && (
                  <p className="text-[10px] text-blue-600 mb-2">🎯 Target: {test.targetRole}</p>
                )}
                <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-3">
                  <span><Clock size={11} className="inline mr-1" />{test.totalTime} min</span>
                  <span><Target size={11} className="inline mr-1" />{test.sections.reduce((a, s) => a + s.questions.length, 0)} questions</span>
                  <span>Pass: {test.passingScore}%</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {test.sections.map(s => (
                    <span key={s.id} className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-full">{s.title}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-blue-600 font-medium group-hover:gap-2 transition-all">
                  Start Assessment <ArrowRight size={13} />
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {stage === 'intro' && selectedTest && (
        <Card padding="lg" className="bg-white border-slate-200 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain size={28} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">{selectedTest.title}</h2>
            <p className="text-xs text-slate-500 mt-1">{selectedTest.description}</p>
          </div>

          <div className="space-y-3 mb-6">
            {selectedTest.sections.map((section, i) => (
              <div key={section.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-700">{section.title}</p>
                  <p className="text-[10px] text-slate-500">{section.questions.length} questions • {section.timeLimit} min</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
            <p className="text-xs font-semibold text-amber-700">⏱ Total Time: {selectedTest.totalTime} minutes • Passing Score: {selectedTest.passingScore}%</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStage('browse')} className="flex-1">← Back</Button>
            <Button variant="primary" onClick={beginTest} className="flex-1">
              <Play size={14} className="mr-1" /> Begin Assessment
            </Button>
          </div>
        </Card>
      )}

      {stage === 'in-progress' && selectedTest && currentSection && currentQuestion && (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="info" size="sm">{currentSection.title}</Badge>
              <span className="text-xs text-slate-500">Q{currentQuestionIndex + 1}/{currentSection.questions.length}</span>
            </div>
            <span className="text-xs text-slate-500">{answeredCount}/{totalQuestions} answered</span>
          </div>

          <ProgressBar value={(answeredCount / totalQuestions) * 100} size="sm" color="brand" />

          <Card padding="lg" className="bg-white border-slate-200 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={currentQuestion.difficulty === 'easy' ? 'success' : currentQuestion.difficulty === 'medium' ? 'warning' : 'error'} size="sm">
                {currentQuestion.difficulty}
              </Badge>
            </div>

            <p className="text-sm text-slate-800 font-medium mb-5">{currentQuestion.text}</p>

            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, i) => {
                const isSelected = answers[currentQuestion.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(currentQuestion.id, i)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-xs text-slate-700">{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={nextQuestion}
                disabled={answers[currentQuestion.id] === undefined}
                className="flex-1"
              >
                {currentSectionIndex === selectedTest.sections.length - 1 && currentQuestionIndex === currentSection.questions.length - 1
                  ? 'Finish Assessment'
                  : 'Next Question'
                } <ChevronRight size={14} className="ml-1" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {stage === 'results' && selectedTest && (
        <div className="max-w-2xl mx-auto">
          <Card padding="lg" className={`border-2 mb-6 ${
            percentage >= selectedTest.passingScore ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'
          }`}>
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 ${
                percentage >= selectedTest.passingScore ? 'bg-emerald-100' : 'bg-red-100'
              }`}>
                <span className={`text-2xl font-bold ${
                  percentage >= selectedTest.passingScore ? 'text-emerald-700' : 'text-red-700'
                }`}>{percentage}%</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">{selectedTest.title}</h2>
              <p className="text-sm text-slate-600 mt-1">
                {result.total} / {result.max} correct
              </p>
              <Badge
                variant={percentage >= selectedTest.passingScore ? 'success' : 'error'}
                size="sm" className="mt-2"
              >
                {percentage >= selectedTest.passingScore ? '✅ PASSED' : '❌ BELOW PASSING SCORE'}
              </Badge>
            </div>
          </Card>

          <h3 className="text-sm font-semibold text-slate-700 mb-3">Section Breakdown</h3>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {result.sections.map((s, i) => {
              const sPct = Math.round((s.correct / s.total) * 100);
              return (
                <Card key={i} padding="md" className="bg-white border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-700">{s.title}</p>
                    <span className={`text-sm font-bold ${sPct >= 70 ? 'text-emerald-600' : sPct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                      {s.correct}/{s.total} ({sPct}%)
                    </span>
                  </div>
                  <ProgressBar value={sPct} size="sm" color={sPct >= 70 ? 'success' : sPct >= 50 ? 'warning' : 'error'} />
                </Card>
              );
            })}
          </div>

          {/* Answer Review */}
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Answer Review</h3>
          <div className="space-y-3 mb-6">
            {selectedTest.sections.map(section =>
              section.questions.map(q => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctIndex;
                return (
                  <Card key={q.id} padding="sm" className={`border ${isCorrect ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'}`}>
                    <div className="flex items-start gap-2">
                      <span className={`mt-0.5 ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                        {isCorrect ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs text-slate-700">{q.text}</p>
                        <p className="text-[10px] mt-1">
                          <span className={isCorrect ? 'text-emerald-600' : 'text-red-600'}>
                            Your answer: {q.options[userAnswer] || 'No answer'}
                          </span>
                          {!isCorrect && (
                            <span className="text-emerald-600 ml-2">✓ Correct: {q.options[q.correctIndex]}</span>
                          )}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1 italic">{q.explanation}</p>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => { setStage('browse'); setSelectedTest(null); }} className="flex-1">
              ← Browse Tests
            </Button>
            <Button variant="primary" onClick={beginTest} className="flex-1">
              <RotateCcw size={14} className="mr-1" /> Retry Assessment
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
