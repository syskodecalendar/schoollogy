import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalDisclaimer } from '../layout/ClinicalDisclaimer';
import {
  Stethoscope, Mic, Activity, Brain, Heart, AlertTriangle, Plus, Send, CheckCircle2,
  Sparkles, FileText, TrendingUp, BarChart2, ShieldCheck, ChevronRight
} from 'lucide-react';

export const ClinicalAISuite: React.FC = () => {
  const { language, selectedChild, abcLogsList, addABCLog } = useApp();
  const [activeAssistant, setActiveAssistant] = useState<'speech' | 'ot' | 'behaviour' | 'psychology' | 'early_intervention'>('speech');

  // ABC Log form state
  const [antText, setAntText] = useState('');
  const [behText, setBehText] = useState('');
  const [conText, setConText] = useState('');

  const isAr = language === 'ar';

  const assistants = [
    { id: 'speech', label: 'AI Speech Therapist', labelAr: 'معالج النطق الذكي', icon: Mic, color: 'from-blue-600 to-indigo-600' },
    { id: 'ot', label: 'AI Occupational Therapist', labelAr: 'أخصائي العلاج الوظيفي الذكي', icon: Activity, color: 'from-teal-600 to-emerald-600' },
    { id: 'behaviour', label: 'AI Behavioural Analyst (ABC)', labelAr: 'محلل السلوك الذكي (ABC)', icon: Brain, color: 'from-purple-600 to-indigo-600' },
    { id: 'psychology', label: 'AI Psychologist', labelAr: 'الأخصائي النفسي الذكي', icon: Heart, color: 'from-rose-600 to-amber-600' },
    { id: 'early_intervention', label: 'AI Early Intervention Assistant', labelAr: 'مساعد التدخل المبكر الذكي', icon: AlertTriangle, color: 'from-amber-600 to-rose-600' },
  ];

  const handleABCSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!antText || !behText || !conText) return;
    addABCLog({
      childId: selectedChild.id,
      childName: selectedChild.name,
      timestamp: new Date().toLocaleString(),
      antecedent: antText,
      behaviour: behText,
      consequence: conText,
      intensity: 'Moderate',
      durationMinutes: 4,
      triggerCategory: 'Sensory / Task Demand'
    });
    setAntText('');
    setBehText('');
    setConText('');
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'الجناح السريري الذكي المساعد' : 'Clinical AI Suite'}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold border border-blue-200">
              5 Specialized AI Assistants
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'مساعدات إكليكية مخصصة لمعالجي النطق، العلاج الوظيفي، تحليل السلوك ABC، والنفسي'
              : 'Specialized clinical co-pilots for Speech, OT, Behavioural Analytics, Psychology & Early Intervention'}
          </p>
        </div>
      </div>

      <ClinicalDisclaimer />

      {/* 5 Assistant Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {assistants.map(a => {
          const Icon = a.icon;
          const isActive = activeAssistant === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setActiveAssistant(a.id as any)}
              className={`p-3.5 rounded-2xl border text-left rtl:text-right transition-all flex flex-col justify-between h-28 relative overflow-hidden ${
                isActive
                  ? 'bg-slate-900 text-white border-blue-500 shadow-md ring-2 ring-blue-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-blue-300'
              }`}
            >
              <div className={`p-2 rounded-xl w-fit ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-xs block truncate">{isAr ? a.labelAr : a.label}</span>
                <span className="text-[10px] text-slate-400 font-medium">{isAr ? 'جاهز للتحليل' : 'Active Workspace'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* WORKSPACE 1: SPEECH THERAPIST */}
      {activeAssistant === 'speech' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  {isAr ? 'مساعد معالج النطق والتخاطب' : 'AI Speech & Language Therapy Assistant'}
                </h3>
                <p className="text-xs text-slate-500">
                  Target Child: <span className="font-bold text-slate-800 dark:text-slate-200">{selectedChild.name}</span>
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
              Phonetic Model v3.2
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                {isAr ? 'ملاحظات النطق والصوتيات:' : 'Pronunciation Observations:'}
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                Fricative consonant cluster reduction in multi-syllable phrases. Intelligibility score: 64/100.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                {isAr ? 'تتبع المفردات الشائعة:' : 'Vocabulary Tracking:'}
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                Expressive lexicon: 180 words (Arabic/English). Receptive comprehension at 92nd percentile.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                {isAr ? 'مولد ملاحظات الجلسة الآلي:' : 'Automated Session Note Generator:'}
              </span>
              <button className="mt-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-[11px]">
                {isAr ? 'توليد مسودة الملاحظة' : 'Generate SOAP Note'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WORKSPACE 3: BEHAVIOURAL ANALYST (ABC LOG) */}
      {activeAssistant === 'behaviour' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-600 text-white">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  {isAr ? 'محلل السلوك التطبيقي (سجل ABC المباشر)' : 'AI Behavioural Analyst — ABC Behaviour Logging'}
                </h3>
                <p className="text-xs text-slate-500">
                  Antecedent → Behaviour → Consequence Trigger Detector
                </p>
              </div>
            </div>
          </div>

          {/* New ABC Log Form */}
          <form onSubmit={handleABCSubmit} className="p-4 bg-purple-50/50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-900 space-y-3 text-xs">
            <span className="font-bold text-purple-900 dark:text-purple-200 block text-xs">
              {isAr ? 'تسجيل حادثة سلوكية جديدة (ABC Log):' : 'Record New ABC Behaviour Instance:'}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Antecedent (المثير/السبق):</label>
                <input
                  type="text"
                  placeholder="e.g. Bell rung for cafeteria..."
                  value={antText}
                  onChange={e => setAntText(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Behaviour (السلوك الملاحظ):</label>
                <input
                  type="text"
                  placeholder="e.g. Covered ears and dropped..."
                  value={behText}
                  onChange={e => setBehText(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Consequence (النتيجة/الإجراء):</label>
                <input
                  type="text"
                  placeholder="e.g. Escorted to quiet corner..."
                  value={conText}
                  onChange={e => setConText(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs">
              {isAr ? 'حفظ السجل وتحليل النمط' : 'Save ABC Entry & Trigger Pattern'}
            </button>
          </form>

          {/* ABC Log Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">{isAr ? 'الوقت' : 'Timestamp'}</th>
                  <th className="p-3">{isAr ? 'السبق (A)' : 'Antecedent (A)'}</th>
                  <th className="p-3">{isAr ? 'السلوك (B)' : 'Behaviour (B)'}</th>
                  <th className="p-3">{isAr ? 'النتيجة (C)' : 'Consequence (C)'}</th>
                  <th className="p-3">{isAr ? 'الشدة' : 'Intensity'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {abcLogsList.map(log => (
                  <tr key={log.id}>
                    <td className="p-3 font-medium text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-3 font-medium">{log.antecedent}</td>
                    <td className="p-3 font-bold text-purple-600">{log.behaviour}</td>
                    <td className="p-3">{log.consequence}</td>
                    <td className="p-3 font-bold text-amber-600">{log.intensity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* WORKSPACES OT, PSYCHOLOGY & EARLY INTERVENTION */}
      {activeAssistant !== 'speech' && activeAssistant !== 'behaviour' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4 animate-fadeIn">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 capitalize">
            {activeAssistant.replace('_', ' ')} Intelligence Workspace
          </h3>
          <p className="text-xs text-slate-500">
            Real-time clinical observation scoring and interdisciplinary strategy recommendations.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
            {isAr
              ? 'التحليلات والتوصيات السريرية متاحة للاعتماد والمراجعة المباشرة.'
              : 'All generated clinical insights require qualified human review before final approval.'}
          </div>
        </div>
      )}
    </div>
  );
};
