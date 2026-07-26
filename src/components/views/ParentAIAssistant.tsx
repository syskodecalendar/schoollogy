import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalDisclaimer } from '../layout/ClinicalDisclaimer';
import { MessageSquare, Send, Sparkles, Heart, Smile, Home, Camera, ShieldCheck, UserCheck } from 'lucide-react';

export const ParentAIAssistant: React.FC = () => {
  const { language, selectedChild } = useApp();
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string; textAr?: string }[]>([
    {
      role: 'ai',
      text: `Hello! I am your Parent AI Assistant for ${selectedChild.name}. How can I support you today?`,
      textAr: `مرحباً! أنا مساعد ولي الأمر الذكي للطفل ${selectedChild.nameAr}. كيف يمكنني مساعدتك اليوم؟`
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const isAr = language === 'ar';

  const quickPrompts = [
    { label: "How was my child's speech today?", labelAr: "كيف كان نطق طفلي اليوم؟" },
    { label: "What activity can we do at home tonight?", labelAr: "ما هو النشاط المنزلي الموصى به اليوم؟" },
    { label: "Is my child on track for fine motor skills?", labelAr: "هل طفلي في المستوى الطبيعي للحركة الدقيقة؟" },
    { label: "Why did the therapist recommend speech therapy?", labelAr: "لماذا أوصى الأخصائي بجلسات تخاطب؟" },
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          text: `Based on ${selectedChild.name}’s Digital Twin today: ${selectedChild.name} participated enthusiastically in sensory drawing and achieved an expressive score of 82/100. Teacher Amina noted excellent tripod grip stability during morning craft!`,
          textAr: `بناءً على التوأم الرقمي للطفل ${selectedChild.nameAr} اليوم: شارك بشغف في نشاط الرسم الحسي وحقق درجة 82/100. لاحظت المعلمة أمنية ثباتاً ممتازاً في قبضة القلم!`
        }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'تطبيق ومساعد ولي الأمر الذكي' : 'Parent Mobile AI Portal & Assistant'}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-800 font-bold">
              Parent View
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'ملخص يومي ملهم وتواصل مباشر مع الذكاء الاصطناعي للإجابة على استفسارات النمو والتطور'
              : 'Inspiring daily updates, home activities & instant AI assistant for parent questions'}
          </p>
        </div>
      </div>

      <ClinicalDisclaimer />

      {/* Parent Mobile Card Simulation Container */}
      <div className="bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg space-y-6">
        {/* Child Daily Greeting Header */}
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <img src={selectedChild.avatar} alt={selectedChild.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30" />
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
              {isAr ? `يوم سعيد! ملخص ${selectedChild.nameAr}` : `Good day! ${selectedChild.name}’s Daily Highlights`}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {selectedChild.classroom} • {selectedChild.branchName}
            </p>
          </div>
        </div>

        {/* Home Activity Recommendation Box */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl p-4 text-xs space-y-2">
          <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
            <Home className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? 'نشاط منزلي مقترح لهذا المساء:' : 'Tonight’s 10-Minute Recommended Home Activity:'}</span>
          </h4>
          <p className="text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
            {isAr
              ? 'ممارسة ضغط الرمال الكينيتية أو تجربة مسك الألعاب بالملاقط لمدة 10 دقائق لتعزيز عضلات اليدين الدقيقة.'
              : 'Practice tactile kinetic sand squeezes or tweezers gem sorting for 10 minutes to strengthen fine motor grip stability.'}
          </p>
        </div>

        {/* AI Chat Conversation Area */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4 max-h-80 overflow-y-auto">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white font-medium rounded-br-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700'
                }`}
              >
                {isAr && m.textAr ? m.textAr : m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="text-xs text-slate-400 font-bold animate-pulse flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Parent AI is typing response...
            </div>
          )}
        </div>

        {/* Quick Prompts Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(isAr ? p.labelAr : p.label)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 font-semibold text-xs whitespace-nowrap border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
            >
              {isAr ? p.labelAr : p.label}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={isAr ? 'اسأل المساعد الذكي أي سؤال عن طفلك...' : 'Ask Parent AI any question about your child...'}
            className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSend()}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
