'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  TrendingUp,
  MapPin,
  Award,
  Briefcase,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  actionLink?: string;
  actionText?: string;
  time: string;
}

export function AIAssistantWidget() {
  const { role, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-welcome',
      sender: 'ai',
      text: `Hello! I am DISHA AI, your intelligent Maharashtra Skilling Intelligence Copilot. How can I assist your ${role} workflow today?`,
      time: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Contextual prompt suggestions based on current role
  const roleSuggestions = {
    government: [
      { text: 'Where is the largest skill deficit right now?', query: 'Show largest skill deficit across Maharashtra districts' },
      { text: 'Simulate 20% budget hike in Marathwada', query: 'Simulate 20% budget increase in Marathwada manufacturing' },
      { text: 'Audit curriculum mismatch for ITI Aundh', query: 'Show curriculum mismatch for ITI Aundh CNC course' },
    ],
    trainee: [
      { text: 'How do I boost my job match to 95%?', query: 'How can I boost my job match score to 95%?' },
      { text: 'Practice AI Mock Interview', query: 'Start CNC technician mock interview' },
      { text: 'Top apprenticeships in Pune', query: 'Find paid NAPS apprenticeships in Pune with DBT subsidy' },
    ],
    employer: [
      { text: 'Find top-rated CNC machinists in Chakan', query: 'Match available CNC machinists in Chakan' },
      { text: 'How does the 180-day retention subsidy work?', query: 'Explain the 180-day retention subsidy scheme' },
      { text: 'Submit ITI syllabus feedback', query: 'How to submit feedback on hired apprentice skills' },
    ],
    institution: [
      { text: 'Which syllabus modules should we modernize?', query: 'Recommend curriculum updates for 2026' },
      { text: 'Check attendance & dropout risks', query: 'Show batches with low biometric attendance' },
      { text: 'Apply for DVET equipment grant', query: 'How to apply for 15 Lakh lab modernization grant' },
    ],
  }[role] || [];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // AI Contextual Response generation
    setTimeout(() => {
      let replyText = '';
      let link = '';
      let linkText = '';

      const q = userText.toLowerCase();

      if (q.includes('deficit') || q.includes('shortage') || q.includes('gap')) {
        replyText = 'Based on live EPFO and job posting telemetry, Pune and Chhatrapati Sambhajinagar have a critical deficit of 5,300+ CNC Operators and 1,800 EV Battery Technicians. Solar Installation is also surging by +48% in Nashik.';
        link = '/government/skill-gaps';
        linkText = 'Explore Skill Gap Analytics';
      } else if (q.includes('simulate') || q.includes('budget')) {
        replyText = 'Simulating a 20% budget reallocation to CNC apprenticeships in tier-2 industrial clusters projects +5,200 additional formal placements and an estimated 3.1x public ROI over 18 months.';
        link = '/government/simulator';
        linkText = 'Open Policy Investment Simulator';
      } else if (q.includes('mismatch') || q.includes('curriculum')) {
        replyText = 'ITI Aundh CNC course currently has a 61% industry match. Missing topics: MasterCAM and 5-Axis Turning. We recommend phasing out manual drafting to reclaim 40 laboratory hours.';
        link = '/government/curriculum-mismatch';
        linkText = 'View Curriculum Mismatch Audit';
      } else if (q.includes('boost') || q.includes('match') || q.includes('score')) {
        replyText = 'Your Verified Skill Passport is currently at 92% readiness. Passing the MasterCAM Assessment and completing the G-Code simulation quiz on SkillQuest will increase your match score to 97% for 24 high-paying jobs in Pune!';
        link = '/trainee/assessment';
        linkText = 'Take Skill Assessment';
      } else if (q.includes('mock') || q.includes('interview')) {
        replyText = 'Ready! You can practice a timed 5-question AI Mock Interview for CNC Machine Operator. You will receive live speech analysis, technical accuracy scoring, and ideal model answers.';
        link = '/trainee/mock-interview';
        linkText = 'Launch AI Mock Interview';
      } else if (q.includes('apprenticeship') || q.includes('job') || q.includes('chakan')) {
        replyText = 'Found 8 active NAPS apprenticeships in Pune & Chakan, including ABC Manufacturing (₹20,000/mo) and Bharat Forge (₹18,000/mo with ₹1,500 DBT subsidy).';
        link = '/trainee/opportunities';
        linkText = 'View Opportunity Feed';
      } else {
        replyText = `Understood. Analyzing telemetry and active credentials for ${role}. All records are synchronized with the Maharashtra Department of Skills and Employment.`;
      }

      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: replyText,
          actionLink: link,
          actionText: linkText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 850);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#123B6D] hover:bg-[#0c2a50] text-white font-bold text-xs shadow-xl border border-amber-400/50 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Open DISHA Official AI Copilot"
          >
            <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
              <Sparkles size={12} className="stroke-[2.5]" />
            </span>
            <span className="tracking-wide">Official AI Copilot</span>
          </button>
        )}
      </div>

      {/* Slide-over Dialog */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[360px] sm:w-[420px] max-h-[580px] h-[85vh] bg-white dark:bg-slate-900 rounded-xl border-2 border-[#123B6D]/40 dark:border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-zoom-in">
          {/* Header */}
          <div className="p-3.5 bg-[#123B6D] text-white flex items-center justify-between shadow-sm shrink-0 border-b border-amber-400/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-amber-400/30 flex items-center justify-center">
                <Bot size={18} className="text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-white">DISHA Official AI Intelligence Copilot</h3>
                <p className="text-[10px] text-amber-200/90">Maharashtra Skill Decision Support System</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-white/20 text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50/60 dark:bg-slate-950/40 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot size={13} />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>

                  {msg.actionLink && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        href={msg.actionLink}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {msg.actionText} <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}

                  <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
                <Bot size={14} className="text-blue-600 animate-pulse" />
                <span className="italic text-[11px]">DISHA AI is synthesizing state intelligence...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {roleSuggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSend(sug.query)}
                className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-600 text-[10px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors"
              >
                {sug.text}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask anything about skills, jobs, schemes..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-colors shadow-xs"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
