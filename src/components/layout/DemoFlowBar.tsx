import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { requiredDemoFlows } from '../../data/mockData';
import { PlayCircle, CheckCircle2, ChevronRight, Sparkles, X } from 'lucide-react';

export const DemoFlowBar: React.FC = () => {
  const { language, activeDemoFlow, triggerDemoFlow, clearDemoFlow } = useApp();
  const [isOpen, setIsOpen] = useState(true);
  const isAr = language === 'ar';

  if (!isOpen) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border-b border-blue-800/40 px-4 py-2 text-xs relative shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-400/30 uppercase tracking-wider text-[10px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            {isAr ? 'عرض العرض التقديمي المباشر' : 'Interactive MVP Demo Flows'}
          </span>
          <span className="hidden lg:inline text-slate-300 text-[11px]">
            {isAr ? 'انقر على أي مسار لاختبار التدفقات السبعة المكتملة:' : 'Click any scenario to jump into end-to-end interactive workflows:'}
          </span>
        </div>

        {/* Scrollable Flow Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full scrollbar-none">
          {requiredDemoFlows.map(flow => {
            const isActive = activeDemoFlow?.id === flow.id;
            return (
              <button
                key={flow.id}
                onClick={() => triggerDemoFlow(flow.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-400 shadow-sm shadow-blue-500/50 ring-2 ring-blue-400/30'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/10 hover:border-white/20'
                }`}
                title={isAr ? flow.descriptionAr : flow.description}
              >
                {isActive ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <PlayCircle className="w-3.5 h-3.5 text-blue-300" />
                )}
                <span>{isAr ? `مسار ${flow.id}` : `Flow ${flow.id}`}</span>
                <span className="hidden xl:inline text-slate-300 font-normal">
                  - {isAr ? flow.titleAr.split(':')[1] || flow.titleAr : flow.title.split(':')[1] || flow.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active flow description badge if selected */}
        {activeDemoFlow && (
          <div className="flex items-center gap-2 bg-blue-900/60 border border-blue-500/40 rounded-lg px-2.5 py-1 text-blue-200 animate-fadeIn">
            <span className="font-semibold text-white">
              {isAr ? `مفعل: مسار ${activeDemoFlow.id}` : `Active: Flow ${activeDemoFlow.id}`}
            </span>
            <span className="text-[11px] truncate max-w-[200px] sm:max-w-[300px]">
              {isAr ? activeDemoFlow.descriptionAr : activeDemoFlow.description}
            </span>
            <button
              onClick={clearDemoFlow}
              className="text-blue-300 hover:text-white p-0.5"
              title="Reset flow"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors ml-auto md:ml-0"
          aria-label="Close demo bar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
