import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, Users, Target, Building2, ShoppingBag } from 'lucide-react';

export const BusinessIntelligence: React.FC = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'finance' | 'sales' | 'marketing'>('finance');

  const isAr = language === 'ar';

  const revenueData = [
    { month: 'Jan', arr: 280000, therapy: 95000 },
    { month: 'Feb', arr: 310000, therapy: 105000 },
    { month: 'Mar', arr: 340000, therapy: 118000 },
    { month: 'Apr', arr: 375000, therapy: 130000 },
    { month: 'May', arr: 420000, therapy: 145000 },
  ];

  const pieData = [
    { name: 'Tuition Subscriptions', value: 55, color: '#2563EB' },
    { name: 'Therapy Billing', value: 30, color: '#14B8A6' },
    { name: 'AI Assessment Add-ons', value: 15, color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'ذكاء الأعمال والتحليلات المالية والتسويقية' : 'Enterprise Business Intelligence'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'مراقبة الإيرادات المتكررة والاشتراكات وتحليلات مبيعات الشبكة التعليمية'
              : 'Financial performance, subscription MRR/ARR breakdown & sales pipeline metrics'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'finance', label: 'Financial Analytics (ARR/MRR)', icon: DollarSign },
          { id: 'sales', label: 'Sales & Expansion Pipeline', icon: Target },
          { id: 'marketing', label: 'Marketing & Parent Acquisition', icon: Users },
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isActive ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* FINANCE TAB */}
      {activeTab === 'finance' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] text-slate-500 block font-bold">Annual Recurring Revenue (ARR)</span>
              <span className="text-2xl font-black text-slate-900 dark:text-slate-100">$420,000</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">+18% YoY Growth</span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] text-slate-500 block font-bold">Monthly Recurring Revenue (MRR)</span>
              <span className="text-2xl font-black text-slate-900 dark:text-slate-100">$35,000</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">+4.2% MoM</span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] text-slate-500 block font-bold">Therapy Services Revenue</span>
              <span className="text-2xl font-black text-teal-600">$145,000</span>
              <span className="text-[10px] text-slate-400 block mt-1">1,240 Hours Billed</span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
              <span className="text-[11px] text-slate-500 block font-bold">Active Parent Subscriptions</span>
              <span className="text-2xl font-black text-blue-600">842</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">98.4% Retention Rate</span>
            </div>
          </div>

          {/* Revenue Breakdown Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">Revenue Trajectory Breakdown</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip />
                    <Bar dataKey="arr" fill="#2563EB" name="Tuition Subscriptions" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="therapy" fill="#14B8A6" name="Therapy Billed" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col items-center justify-center">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mb-2">Revenue Mix</h3>
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SALES & MARKETING Placeholder */}
      {activeTab !== 'finance' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-2">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 capitalize">{activeTab} Metrics</h3>
          <p className="text-xs text-slate-500">Pipeline conversion velocity and customer acquisition cost benchmarking.</p>
        </div>
      )}
    </div>
  );
};
