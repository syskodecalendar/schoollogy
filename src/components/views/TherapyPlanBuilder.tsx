import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalDisclaimer } from '../layout/ClinicalDisclaimer';
import { TherapyPlan } from '../../types';
import {
  ClipboardList, Sparkles, CheckCircle2, UserCheck, Stethoscope, Share2, Plus, Edit3, ShieldCheck, HeartHandshake
} from 'lucide-react';

export const TherapyPlanBuilder: React.FC = () => {
  const { language, therapyPlansList, selectedChild, currentUser } = useApp();
  const [activePlan, setActivePlan] = useState<TherapyPlan>(therapyPlansList[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const isAr = language === 'ar';

  const handleGenerateAIPlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(isAr ? 'تم توليد الخطة العلاجية بالذكاء الاصطناعي بنجاح!' : 'Individualised AI Therapy Plan generated successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'منشئ خطط العلاج الفردية' : 'Therapy Plan Builder'}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold border border-blue-200">
              Interdisciplinary Scaffolding
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'توليد خطط العلاج بالذكاء الاصطناعي مع تحديد خط الأساس ومخرجات الهدف وبرنامج المنزل'
              : 'Build individualised speech, OT & ABA therapy plans with goal mastery tracking & parent programs'}
          </p>
        </div>

        <button
          onClick={handleGenerateAIPlan}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>{isGenerating ? (isAr ? 'جاري توليد الخطة...' : 'Generating Plan...') : (isAr ? 'توليد خطة علاج بالذكاء الاصطناعي' : 'Generate Plan with AI')}</span>
        </button>
      </div>

      <ClinicalDisclaimer />

      {/* Plan Header Summary Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200">
                {activePlan.therapyType}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {activePlan.approvalStatus}
              </span>
            </div>

            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
              {activePlan.planTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Child: <span className="font-bold text-slate-800 dark:text-slate-200">{activePlan.childName}</span> • Assigned: {activePlan.assignedTherapist} ({activePlan.sessionFrequency})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3.5 py-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs rounded-xl border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
              <Share2 className="w-4 h-4" />
              <span>{isAr ? 'مشاركة نسخة ولي الأمر' : 'Share Parent Version'}</span>
            </button>
          </div>
        </div>

        {/* Goals Progress Tracking List */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>{isAr ? 'أهداف العلاج الفردية ومستوى التقدم:' : 'Individual Therapy Goals & Mastery Progress:'}</span>
          </h4>

          <div className="space-y-3">
            {activePlan.goals.map(goal => (
              <div key={goal.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between font-bold text-xs text-slate-800 dark:text-slate-100">
                  <span>{goal.title}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-black">{goal.progressPercent}%</span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${goal.progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span><strong className="text-slate-700 dark:text-slate-300">Baseline:</strong> {goal.baseline}</span>
                  <span><strong className="text-slate-700 dark:text-slate-300">Target:</strong> {goal.targetOutcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Home Program Box */}
        <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 text-xs space-y-2">
          <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? 'برنامج التدريب المنزلي لولي الأمر:' : 'Parent Home Practice Program:'}</span>
          </h4>
          <ul className="list-disc list-inside space-y-1 text-emerald-950 dark:text-emerald-100">
            {activePlan.parentHomeProgram.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
