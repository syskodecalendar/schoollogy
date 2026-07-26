import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockCampaigns } from '../../data/mockData';
import {
  Megaphone,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  BarChart3,
  Globe
} from 'lucide-react';

export const MarketingDashboard: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  const totalSpent = mockCampaigns.reduce((acc, c) => acc + (c.spendBHD || c.spentBHD || 0), 0);
  const totalLeads = mockCampaigns.reduce((acc, c) => acc + c.leadsGenerated, 0);
  const avgCpl = (totalSpent / (totalLeads || 1)).toFixed(2);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-900 via-pink-950 to-slate-900 text-white shadow-xl border border-rose-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Megaphone className="w-3.5 h-3.5" />
              <span>Multi-Platform Growth & Acquisition</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {isAr ? 'لوحة تحليلات الحملات التسويقية' : 'Marketing Manager Acquisition Hub'}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              {isAr
                ? 'متابعة الحملات الإعلانية الممولة، تكلفة العميل المحتمل (CPL)، والعائد على الاستثمار الإعلاني (ROAS).'
                : 'Monitor digital ad campaign performance, cost-per-lead (CPL) metrics, and channel conversion velocity.'}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'إجمالي الإنفاق الإعلاني' : 'Total Ad Spend (BHD)'}</span>
            <DollarSign className="w-4 h-4 text-rose-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{totalSpent.toLocaleString()} BHD</span>
            <span className="text-xs text-rose-600 font-bold">Q1 2026</span>
          </div>
          <p className="text-[11px] text-slate-500">Instagram, Google & TikTok</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'إجمالي العملاء المستقطبين' : 'Leads Generated'}</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{totalLeads}</span>
            <span className="text-xs text-emerald-600 font-bold">+18.4%</span>
          </div>
          <p className="text-[11px] text-slate-500">Parent inquiry forms submitted</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'متوسط تكلفة العميل (CPL)' : 'Average CPL (BHD)'}</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{avgCpl} BHD</span>
            <span className="text-xs text-emerald-600 font-bold">Optimized</span>
          </div>
          <p className="text-[11px] text-slate-500">Below target threshold</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'القناة الأكثر كفاءة' : 'Top Performing Channel'}</span>
            <Globe className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">Instagram</span>
            <span className="text-xs text-purple-600 font-bold">54% Share</span>
          </div>
          <p className="text-[11px] text-slate-500">High engagement video reels</p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'تفاصيل أداء الحملات التسويقية الحالية' : 'Active Digital Marketing Campaigns'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr ? 'مقارنة القنوات والإنفاق وتكلفة كل عميل محتمل' : 'Channel performance, budget allocation, and lead yield.'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 font-bold">{isAr ? 'اسم الحملة' : 'Campaign Name'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'المنصة' : 'Platform'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الإنفاق (BHD)' : 'Spend (BHD)'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'عدد العملاء' : 'Leads'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'تكلفة العميل (CPL)' : 'CPL (BHD)'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockCampaigns.map(camp => (
                <tr key={camp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{camp.name}</td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">{camp.platform || camp.channel}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{camp.spendBHD || camp.spentBHD} BHD</td>
                  <td className="py-3.5 px-4 font-bold text-indigo-600">{camp.leadsGenerated}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">{camp.cplBHD || camp.costPerLeadBHD} BHD</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      {camp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
