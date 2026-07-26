import React from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalDisclaimer } from '../layout/ClinicalDisclaimer';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { TrendingUp, AlertTriangle, ShieldCheck, Activity, Users, Building2 } from 'lucide-react';

export const PredictiveIntelligence: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  const riskTrendData = [
    { month: 'Jan', highRisk: 14, moderateRisk: 28, lowRisk: 180 },
    { month: 'Feb', highRisk: 12, moderateRisk: 25, lowRisk: 190 },
    { month: 'Mar', highRisk: 10, moderateRisk: 22, lowRisk: 205 },
    { month: 'Apr', highRisk: 8, moderateRisk: 20, lowRisk: 215 },
    { month: 'May', highRisk: 6, moderateRisk: 18, lowRisk: 224 },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'مركز الذكاء التنبؤي وتحليل المخاطر المبكرة' : 'Predictive Intelligence & Risk Analytics'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'توقع فجوات النمو المبكرة ومعدلات نجاح التدخل لتفادي التأخر قبل وقوعه'
              : 'Cross-branch risk detection, milestone deviation forecast & early intervention trigger rates'}
          </p>
        </div>
      </div>

      <ClinicalDisclaimer />

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>{isAr ? 'تطور اتجاه المخاطر عبر الفروع' : 'Risk Distribution Trajectory'}</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrendData}>
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="lowRisk" stackId="1" stroke="#22C55E" fill="#22C55E" fillOpacity={0.4} />
                <Area type="monotone" dataKey="moderateRisk" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.4} />
                <Area type="monotone" dataKey="highRisk" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>{isAr ? 'مؤشرات التنبيه المبكر المفعلة' : 'Triggered Early Alert Indicators'}</span>
            </h3>

            <div className="space-y-3 mt-4 text-xs">
              <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900">
                <span className="font-bold text-red-900 dark:text-red-200 block">Fine Motor Latency Cluster Detected:</span>
                <p className="text-red-800 dark:text-red-300 text-[11px] mt-0.5">3 children in Riyadh Class B showing 15% drop in pencil grip stability. Early OT screening queued.</p>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900">
                <span className="font-bold text-amber-900 dark:text-amber-200 block">Speech Transition Alert:</span>
                <p className="text-amber-800 dark:text-amber-300 text-[11px] mt-0.5">Phonetic repetition rate improved by 22% post 4-week speech plan in Jeddah branch.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
