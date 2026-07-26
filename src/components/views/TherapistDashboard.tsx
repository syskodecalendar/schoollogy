import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockChildren, mockTherapyPlans } from '../../data/mockData';
import {
  Stethoscope,
  Brain,
  Mic,
  Activity,
  Smile,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  ClipboardList,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TherapistDashboard: React.FC = () => {
  const { language, currentRole, therapyPlansList, abcLogsList, addABCLog, setSelectedChildId, setActiveSection } = useApp();
  const isAr = language === 'ar';

  const [abcForm, setAbcForm] = useState({
    childId: mockChildren[0]?.id || 'child-1',
    antecedent: '',
    behavior: '',
    consequence: '',
    intensity: 'Medium' as 'Low' | 'Medium' | 'High'
  });
  const [logSaved, setLogSaved] = useState(false);

  const handleAbcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!abcForm.behavior.trim()) return;
    const child = mockChildren.find(c => c.id === abcForm.childId) || mockChildren[0];
    addABCLog({
      childId: child.id,
      childName: child.name,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      antecedent: abcForm.antecedent || 'Group transition activity',
      behavior: abcForm.behavior,
      consequence: abcForm.consequence || 'Verbal redirection & quiet corner break',
      intensity: abcForm.intensity,
      recordedBy: `${currentRole} Specialist`
    });
    setAbcForm({
      childId: mockChildren[0]?.id || 'child-1',
      antecedent: '',
      behavior: '',
      consequence: '',
      intensity: 'Medium'
    });
    setLogSaved(true);
    setTimeout(() => setLogSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-sky-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{currentRole} Clinical Workstation</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {isAr ? `جناح العيادة والتدخل السريري (${currentRole})` : `${currentRole} Clinical Therapy & Diagnostics`}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              {isAr
                ? 'إدارة الخطط العلاجية، تقييمات الذكاء الاصطناعي التفاعلية، تتبع سلوكيات ABC، والتشخيص السريري المباشر.'
                : 'Manage IEP therapy goals, run specialized AI acoustic & fine-motor screenings, and record clinical ABC behavior logs.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSection('ai_assessment_centre')}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition flex items-center gap-1.5"
            >
              <Brain className="w-4 h-4" />
              <span>{isAr ? 'بدء تقييم ذكاء اصطناعي جديد' : 'Launch AI Assessment'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Therapy Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'الخطط العلاجية النشطة' : 'Active Therapy Plans'}</span>
            <ClipboardList className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{therapyPlansList.length}</span>
            <span className="text-xs text-sky-600 font-bold">100% Approved</span>
          </div>
          <p className="text-[11px] text-slate-500">Individualized clinical IEPs</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'سجلات ABC السلوكية' : 'ABC Behavior Logs'}</span>
            <Brain className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{abcLogsList.length}</span>
            <span className="text-xs text-purple-600 font-bold">Logged</span>
          </div>
          <p className="text-[11px] text-slate-500">Antecedent-Behavior-Consequence</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'جلسات اليوم المكتملة' : 'Sessions Completed Today'}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">6 / 8</span>
            <span className="text-xs text-emerald-600 font-bold">75% Done</span>
          </div>
          <p className="text-[11px] text-slate-500">2 Remaining this afternoon</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'معدل تحقق الأهداف السريرية' : 'Goal Achievement Rate'}</span>
            <Activity className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">84.2%</span>
            <span className="text-xs text-emerald-600 font-bold">+3.1% MoM</span>
          </div>
          <p className="text-[11px] text-slate-500">Measurable outcome metrics</p>
        </div>
      </div>

      {/* Grid: ABC Log Entry & Active Therapy Plans Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick ABC Behavioral Log Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span>{isAr ? 'تسجيل نموذج سلوك ABC سريري' : 'Log ABC Clinical Behavior'}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {isAr ? 'تسجيل السوابق، السلوك والنتائج لتحليل الأنماط السلوكية.' : 'Antecedent, Behavior, and Consequence tracking.'}
              </p>
            </div>
          </div>

          {logSaved && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAr ? 'تم تسجيل نموذج ABC السلوكي بنجاح!' : 'ABC Behavior record logged successfully!'}</span>
            </div>
          )}

          <form onSubmit={handleAbcSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'الطفل' : 'Child'}
              </label>
              <select
                value={abcForm.childId}
                onChange={e => setAbcForm({ ...abcForm, childId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                {mockChildren.map(c => (
                  <option key={c.id} value={c.id}>
                    {isAr ? c.nameAr : c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'المثير المسبق (Antecedent)' : 'Antecedent (Trigger)'}
              </label>
              <input
                type="text"
                value={abcForm.antecedent}
                onChange={e => setAbcForm({ ...abcForm, antecedent: e.target.value })}
                placeholder={isAr ? 'مثال: انتقال بين الأنشطة، صوت عالي...' : 'e.g. Loud noise during group transition...'}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'السلوك الملاحظ (Behavior)' : 'Observed Behavior'}
              </label>
              <input
                type="text"
                value={abcForm.behavior}
                onChange={e => setAbcForm({ ...abcForm, behavior: e.target.value })}
                placeholder={isAr ? 'مثال: امتناع عن المشاركة، صراخ المؤقت...' : 'e.g. Vocal refusal, task avoidance...'}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'النتيجة والإجراء (Consequence)' : 'Consequence / Intervention'}
              </label>
              <input
                type="text"
                value={abcForm.consequence}
                onChange={e => setAbcForm({ ...abcForm, consequence: e.target.value })}
                placeholder={isAr ? 'مثال: توجيه بصري، استخدام بطاقة التواصل...' : 'e.g. Sensory card prompt, quiet break...'}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'حفظ السجل السلوكي' : 'Save ABC Record'}</span>
            </button>
          </form>
        </div>

        {/* Therapy Plans Summary */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {isAr ? 'الخطط العلاجية والجلسات المباشرة' : 'Active Clinical Therapy Plans'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr ? 'انقر لعرض خطة العلاج وتفاصيل الأهداف التنموية' : 'Click to inspect therapy plan goals and progress.'}
              </p>
            </div>
            <button
              onClick={() => setActiveSection('therapy_plans')}
              className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1"
            >
              <span>{isAr ? 'عرض الكل' : 'View All Plans'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {therapyPlansList.map(plan => (
              <div
                key={plan.id}
                onClick={() => {
                  setSelectedChildId(plan.childId);
                  setActiveSection('digital_twin');
                }}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-sky-500 cursor-pointer transition space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 transition">
                    {plan.childName} — {plan.discipline}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 rounded-full">
                    {plan.targetDurationWeeks} Weeks
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {isAr ? plan.primaryObjectiveAr : plan.primaryObjective}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500">Therapist: {plan.assignedTherapist}</span>
                  <span className="font-bold text-emerald-600">{plan.status ? plan.status.toUpperCase() : 'ACTIVE'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
