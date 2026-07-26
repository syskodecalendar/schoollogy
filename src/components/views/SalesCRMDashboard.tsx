import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockLeads } from '../../data/mockData';
import {
  Target,
  Users,
  Building2,
  Phone,
  Calendar,
  CheckCircle2,
  Plus,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

export const SalesCRMDashboard: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-900 via-amber-950 to-slate-900 text-white shadow-xl border border-orange-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30">
              <Target className="w-3.5 h-3.5" />
              <span>Admissions CRM & Tour Pipeline</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {isAr ? 'إدارة المبيعات وجولات التسجيل' : 'Admissions & Sales CRM Pipeline'}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              {isAr
                ? 'متابعة استفسارات أولياء الأمور، حجز الجولات التعريفية بالفروع ومعدلات تحويل طلبات التسجيل.'
                : 'Track incoming parent inquiries, nursery campus tours, lead conversion stages, and tuition forecasts.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-600/30 transition flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إضافة ولي أمر جديد' : 'Add New Lead'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'إجمالي العملاء المحتملين' : 'Total Pipeline Leads'}</span>
            <Users className="w-4 h-4 text-orange-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">48</span>
            <span className="text-xs text-emerald-600 font-bold">+12 This Week</span>
          </div>
          <p className="text-[11px] text-slate-500">Inquiries across 3 centers</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'جولات الفروع المجدولة' : 'Campus Tours Scheduled'}</span>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">16</span>
            <span className="text-xs text-indigo-600 font-bold">Today: 4</span>
          </div>
          <p className="text-[11px] text-slate-500">Parent walkthroughs</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'معدل تحويل التسجيل' : 'Conversion Rate'}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">64.5%</span>
            <span className="text-xs text-emerald-600 font-bold">+5.2%</span>
          </div>
          <p className="text-[11px] text-slate-500">Tour to Enrolled conversion</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'متوسط سرعة الاستجابة' : 'Avg Response Time'}</span>
            <Phone className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">18 mins</span>
            <span className="text-xs text-blue-600 font-bold">Fast</span>
          </div>
          <p className="text-[11px] text-slate-500">SLA compliance met</p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'جدول متابعة طلبات الانضمام والتسجيل' : 'Active Admissions Leads'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr ? 'تتبع مرحلة كل ولي أمر من الاستفسار حتى التسجيل النهائي' : 'Parent pipeline stages, tour notes, and branch preferences.'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 font-bold">{isAr ? 'اسم ولي الأمر' : 'Parent Name'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'اسم الطفل والسن' : 'Child Name & Age'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الفرع المفضل' : 'Preferred Branch'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'المرحلة' : 'Stage'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'تاريخ التواصل' : 'Contact Date'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'المصدر' : 'Source'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{lead.parentName}</td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">{lead.childName} ({lead.childAge} yrs)</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{lead.preferredBranch || lead.interestedBranch}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      {lead.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{lead.contactDate || lead.followUpDate}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{lead.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
