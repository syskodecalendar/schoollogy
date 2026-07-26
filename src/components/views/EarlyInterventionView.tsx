import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockChildren, mockRecommendations } from '../../data/mockData';
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  Brain,
  Shield,
  ArrowRight,
  Heart,
  Users
} from 'lucide-react';

export const EarlyInterventionView: React.FC = () => {
  const { language, childrenList, setSelectedChildId, setActiveSection } = useApp();
  const isAr = language === 'ar';

  const flaggedChildren = childrenList.filter(c => c.developmentScore < 85);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-900 via-purple-950 to-slate-900 text-white shadow-xl border border-violet-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
              <Search className="w-3.5 h-3.5" />
              <span>Early Detection & Multidisciplinary Review</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {isAr ? 'مركز التدخل المبكر والرصد التنموي' : 'Early Intervention & Developmental Screening'}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              {isAr
                ? 'الكشف المبكر عن التحديات النمائية والسلوكية، إحالة الحالات لفريق التخصصات المتعددة ومتابعة خطط الدعم المبكر.'
                : 'Identify early developmental delays before age 4, route multidisciplinary reviews, and establish early support protocols.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSection('recommendations')}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition flex items-center gap-1.5"
            >
              <Brain className="w-4 h-4" />
              <span>{isAr ? 'محرك التوصيات الذكي' : 'AI Recommendation Engine'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flagged Cases for Early Intervention */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>{isAr ? 'الحالات الموصى بمراجعتها للتدخل المبكر' : 'Flagged Early Intervention Candidates'}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {isAr ? 'أطفال يتطلب أداؤهم مراجعة سريرية سريعة' : 'Children showing domain deltas requiring multidisciplinary assessment.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flaggedChildren.map(child => (
            <div
              key={child.id}
              onClick={() => {
                setSelectedChildId(child.id);
                setActiveSection('digital_twin');
              }}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-amber-200 dark:border-amber-900/50 hover:border-violet-500 cursor-pointer transition space-y-3 group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-violet-500/30"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 transition">
                    {isAr ? child.nameAr : child.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Age {child.age} yrs • Class {child.classroom}
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
                <span className="font-bold">AI Early Alert:</span> Motor & Speech co-ordination delta observed during interactive screening.
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500">Overall Dev Index: {child.developmentScore}%</span>
                <span className="font-bold text-violet-600 flex items-center gap-1">
                  <span>Open Digital Twin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
