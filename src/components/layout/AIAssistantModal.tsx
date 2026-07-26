import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, X, Bot, ArrowRight, Building2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface PresetQuery {
  label: string;
  labelAr: string;
  query: string;
}

export const AIAssistantModal: React.FC = () => {
  const {
    language,
    isAIAssistantOpen,
    setIsAIAssistantOpen,
    whiteLabelConfig,
    setActiveSection,
    setCurrentBranchId,
    setSelectedChildId
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { role: 'user' | 'ai'; text: string; textAr: string; kpis?: { label: string; val: string }[]; actionLink?: { label: string; section: string; branchId?: string; childId?: string } }[]
  >([
    {
      role: 'ai',
      text: 'Hello! I am your Schoology AI Copilot. I analyze multi-branch educational, clinical, and predictive data in real time. How can I assist you today?',
      textAr: 'أهلاً بك! أنا مساعد سكولوجي الذكي. أقوم بتحليل البيانات التعليمية والعلاجية والتنبؤية المباشرة. كيف يمكنني مساعدتك اليوم؟'
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const isAr = language === 'ar';

  if (!isAIAssistantOpen) return null;

  const presets: PresetQuery[] = [
    {
      label: 'Which branches need immediate management attention?',
      labelAr: 'أي الفروع تحتاج إلى تدخل إداري عاجل؟',
      query: 'Which branches need immediate management attention?'
    },
    {
      label: 'Summarize Tariq Al-Mansoor’s current development',
      labelAr: 'لخص الوضع التنموي الحالي لطارق المنصور',
      query: 'Summarize Tariq Al-Mansoor current development'
    },
    {
      label: 'What speech therapy activities are recommended for home practice?',
      labelAr: 'ما هي أنشطة نطق الكلام الموصى بها للممارسة المنزلية؟',
      query: 'What speech therapy activities are recommended for home practice?'
    },
    {
      label: 'Show staffing demand forecast for Q4',
      labelAr: 'عرض توقعات الاحتياج من الكوادر للربع الرابع',
      query: 'Show staffing demand forecast for Q4'
    }
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    // Add user message
    setChatHistory(prev => [...prev, { role: 'user', text: q, textAr: q }]);
    setInputQuery('');
    setIsGenerating(true);

    setTimeout(() => {
      let aiResponseText = '';
      let aiResponseTextAr = '';
      let kpis: { label: string; val: string }[] | undefined;
      let actionLink: { label: string; section: string; branchId?: string; childId?: string } | undefined;

      if (q.toLowerCase().includes('branch') || q.toLowerCase().includes('attention')) {
        aiResponseText =
          'Abu Dhabi West Intervention Centre requires immediate management review. It currently operates at 96% occupancy with 45% of enrolled children requiring active early intervention, resulting in a Speech Therapy deficit ratio of 1:30.';
        aiResponseTextAr =
          'يحتاج مركز أبوظبي الغربي للتدخل المبكر إلى مراجعة إدارية عاجلة. يعمل حالياً بنسبة إشغال 96% مع وجود 45% من الأطفال بحاجة لتدخل مبكر نشط، مما أدى إلى عجز في نسبة معالجي النطق (1:30).';
        kpis = [
          { label: 'Risk Children', val: '19' },
          { label: 'Intervention Load', val: '45%' },
          { label: 'SLP Ratio', val: '1:30' }
        ];
        actionLink = {
          label: 'Inspect Abu Dhabi Branch Data',
          section: 'overview',
          branchId: 'branch-4'
        };
      } else if (q.toLowerCase().includes('tariq') || q.toLowerCase().includes('development')) {
        aiResponseText =
          'Tariq Al-Mansoor exhibits a high Cognitive score (82) and Gross Motor agility (88). Articulation clarity (/s/ phoneme) is currently at 64%, showing 12% progress over 30 days. Fine motor grip is transitioning to dynamic tripod.';
        aiResponseTextAr =
          'يظهر طارق المنصور درجة معرفية عالية (82) ولياقة حركية كبرى (88). وضوح النطق (صوت /س/) حالياً عند 64% مع تحسن 12% خلال 30 يوماً. قبضة القلم تنتقل للثلاثية الديناميكية.';
        kpis = [
          { label: 'Cognitive Score', val: '82/100' },
          { label: 'Speech Clarity', val: '64/100' },
          { label: 'Risk Level', val: 'Moderate' }
        ];
        actionLink = {
          label: 'Open Tariq’s Digital Twin',
          section: 'digital_twin',
          childId: 'child-1'
        };
      } else {
        aiResponseText =
          'Based on approved clinical guidelines, multi-domain interventions are progressing steadily. AI predictive confidence is 92%. I recommend reviewing the central recommendation feed for pending approvals.';
        aiResponseTextAr =
          'بناءً على المبادئ التوجيهية السريرية المعتمدة، تتقدم التدخلات متعددة المجالات بثبات. ثقة الذكاء الاصطناعي التنبؤية 92%. أوصي بمراجعة موجز التوصيات المركزي للاعتماد.';
        kpis = [
          { label: 'Prediction Confidence', val: '92%' },
          { label: 'Pending Recs', val: '3' }
        ];
        actionLink = {
          label: 'View Recommendation Engine',
          section: 'recommendations'
        };
      }

      setChatHistory(prev => [
        ...prev,
        {
          role: 'ai',
          text: aiResponseText,
          textAr: aiResponseTextAr,
          kpis,
          actionLink
        }
      ]);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[600px] animate-fadeIn">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between border-b border-blue-800/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                <span>{whiteLabelConfig.assistantName || 'Schoology AI Copilot'}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-teal-500/30 text-teal-300 font-mono">
                  Gemini AI Powered
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                {isAr ? 'مساعد التوجيه والتحليل السريري والإداري الفوري' : 'Intelligent Clinical & Management Decision Assistant'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAIAssistantOpen(false)}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-bl-none shadow-xs'
                }`}
              >
                <p>{isAr ? msg.textAr : msg.text}</p>

                {/* Supporting KPIs if present */}
                {msg.kpis && (
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                    {msg.kpis.map((k, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl text-center border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{k.label}</span>
                        <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">{k.val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Link button */}
                {msg.actionLink && (
                  <button
                    onClick={() => {
                      if (msg.actionLink?.branchId) setCurrentBranchId(msg.actionLink.branchId);
                      if (msg.actionLink?.childId) setSelectedChildId(msg.actionLink.childId);
                      setActiveSection(msg.actionLink!.section);
                      setIsAIAssistantOpen(false);
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-xs hover:bg-blue-100 transition-colors border border-blue-200 dark:border-blue-800"
                  >
                    <span>{msg.actionLink.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                )}

                {msg.role === 'ai' && (
                  <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3 h-3 text-amber-500" />
                    <span>
                      {isAr
                        ? 'رأي استشاري داعم للقرار صادر عن الذكاء الاصطناعي.'
                        : 'AI decision-support insight. Requires professional review.'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex gap-3 items-center text-xs text-slate-500">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 animate-bounce">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>{isAr ? 'جاري تحليل بيانات المؤسسة والتوأم الرقمي...' : 'Analyzing multi-branch Digital Twin data...'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Preset Query Chips */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-x-auto flex gap-2 scrollbar-none">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.query)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/40 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors shrink-0"
            >
              {isAr ? p.labelAr : p.label}
            </button>
          ))}
        </div>

        {/* Query Input Footer */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={isAr ? 'اكتب سؤالك أو اطلب تحليلاً من الذكاء الاصطناعي...' : 'Ask Schoology AI anything about branches, children, or therapy...'}
            className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || isGenerating}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold transition-all shadow-md"
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
