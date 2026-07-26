import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockInvoices } from '../../data/mockData';
import {
  Heart,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  DollarSign,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Activity
} from 'lucide-react';

export const ParentPortalDashboard: React.FC = () => {
  const { language, selectedChild, setActiveSection, therapyPlansList, recommendationsList } = useApp();
  const isAr = language === 'ar';

  // Strict check: Linked child is Sara Ahmed
  const saraInvoices = mockInvoices.filter(i => i.childName.includes('Sara'));
  const saraTherapy = therapyPlansList.filter(p => p.childName.includes('Sara'));
  const saraRecs = recommendationsList.filter(r => r.childName.includes('Sara'));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Linked Child Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-fuchsia-900 via-purple-950 to-slate-900 text-white shadow-xl border border-fuchsia-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={selectedChild.avatar}
              alt={selectedChild.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-fuchsia-500/40 shadow-lg"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-semibold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                <Heart className="w-3.5 h-3.5 fill-fuchsia-400 text-fuchsia-400" />
                <span>{isAr ? 'حساب طفلتك المرتبطة: سارة أحمد' : 'Linked Child: Sara Ahmed'}</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight">
                {isAr ? `مرحباً بكم في بورتال متابعة ${selectedChild.nameAr}` : `Welcome to ${selectedChild.name}'s Growth Hub`}
              </h1>
              <p className="text-xs text-slate-300">
                {isAr
                  ? 'تحديثات فورية من معلمة الفصل والأخصائي العلاجي، اليوميات المدرسية ومساعد أولياء الأمور بالذكاء الاصطناعي.'
                  : 'Live daily reports, speech therapy milestones, classroom photo updates and instant parent AI copilot.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSection('parent_ai')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-fuchsia-600/30 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{isAr ? 'اسأل المساعد الذكي عن سارة' : 'Ask Parent AI Copilot'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Development Milestones Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'مؤشر النمو الشامل' : 'Development Score'}</span>
            <Activity className="w-4 h-4 text-fuchsia-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{selectedChild.developmentScore}%</span>
            <span className="text-xs text-emerald-600 font-bold">+2.4% MoM</span>
          </div>
          <p className="text-[11px] text-slate-500">On-track for age 4 milestones</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'حالة الحضور اليوم' : 'Today Attendance'}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">Present</span>
            <span className="text-xs text-emerald-600 font-bold">Checked in 07:45</span>
          </div>
          <p className="text-[11px] text-slate-500">Juffair Early Learning Center</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'جلسات العلاج النشطة' : 'Therapy Sessions'}</span>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{saraTherapy.length} Active</span>
            <span className="text-xs text-purple-600 font-bold">Speech & OT</span>
          </div>
          <p className="text-[11px] text-slate-500">Next session tomorrow 10:00 AM</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'حالة القسط الحالي' : 'Tuition Status'}</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">Paid</span>
            <span className="text-xs text-emerald-600 font-bold">BenefitPay Verified</span>
          </div>
          <p className="text-[11px] text-slate-500">Term 1 Receipt #INV-2026-003</p>
        </div>
      </div>

      {/* Main Grid: Live Timeline & Parent Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sara's Today Timeline */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-fuchsia-600" />
                <span>{isAr ? 'اليوميات والنشاط المباشر لسارة' : "Sara's Live Daily Timeline"}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {isAr ? 'تحديثات مدونة مباشرة من معلمات الفصل والأخصائيين' : 'Real-time updates posted by classroom teachers and therapists.'}
              </p>
            </div>
            <button
              onClick={() => setActiveSection('digital_twin')}
              className="text-xs font-bold text-fuchsia-600 hover:underline flex items-center gap-1"
            >
              <span>{isAr ? 'فتح التوأم الرقمي الكامل' : 'Open Full Digital Twin'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {selectedChild.timeline.map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {isAr ? item.titleAr : item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isAr ? item.descriptionAr : item.description}
                </p>
                <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400">
                  <span>Author: {item.author} ({item.role})</span>
                  <span className={`px-1.5 py-0.5 rounded font-semibold ${item.badgeColor}`}>
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Home Recommendations for Sara */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>{isAr ? 'توصيات وتعزيزات منزلية لسارة' : 'Recommended Home Activities for Sara'}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {isAr ? 'أنشطة علاجية وتربوية منزلية مخصصة' : 'Personalized reinforcement routines approved by therapists.'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {saraRecs.map(rec => (
              <div key={rec.id} className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>{isAr ? rec.titleAr : rec.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 font-semibold">
                    {rec.targetDomain}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {isAr ? rec.rationaleAr : rec.rationale}
                </p>
                <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                  Approved by: {rec.acceptedBy} ({rec.acceptedDate})
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
