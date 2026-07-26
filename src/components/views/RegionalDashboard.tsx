import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockBranches, mockChildren } from '../../data/mockData';
import {
  GitBranch,
  Building2,
  TrendingUp,
  Users,
  Award,
  AlertTriangle,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const RegionalDashboard: React.FC = () => {
  const { language, currentBranchId, setCurrentBranchId, setActiveSection, setSelectedChildId } = useApp();
  const isAr = language === 'ar';
  const [regionFilter, setRegionFilter] = useState('all');

  const totalCapacity = mockBranches.reduce((acc, b) => acc + b.capacity, 0);
  const totalEnrolled = mockBranches.reduce((acc, b) => acc + b.enrolledCount, 0);
  const avgOccupancy = Math.round((totalEnrolled / totalCapacity) * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-blue-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <GitBranch className="w-3.5 h-3.5" />
              <span>{isAr ? 'منطقة الخليج العربي الإقليمية' : 'GCC Regional Operations Network'}</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {isAr ? 'لوحة قيادة المدير الإقليمي' : 'Regional Manager Operational Dashboard'}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              {isAr
                ? 'مراقبة أداء الفروع، القدرة الاستيعابية، معايير الجودة والتدخل السريري المبكر عبر شبكة المراكز.'
                : 'Comparative branch KPIs, occupancy forecasting, quality compliance and early intervention volume across all active centers.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSection('analytics_bi')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4" />
              <span>{isAr ? 'تقارير المقارنة المعيارية' : 'Compare Regional Benchmarks'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* High Density Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'إجمالي الفروع الإقليمية' : 'Active Regional Branches'}</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{mockBranches.length}</span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> 100% Active
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Bahrain, Saudi & UAE early centers</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'معدل الإشغال الإقليمي' : 'Regional Occupancy Rate'}</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{avgOccupancy}%</span>
            <span className="text-xs text-emerald-600 font-bold">+4.2% YoY</span>
          </div>
          <p className="text-[11px] text-slate-500">{totalEnrolled} / {totalCapacity} seats filled</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'متوسط مؤشر جودة التعليم' : 'Avg Education Quality Index'}</span>
            <Award className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">96.8%</span>
            <span className="text-xs text-emerald-600 font-bold">Audited</span>
          </div>
          <p className="text-[11px] text-slate-500">Classroom & therapy compliance</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'حالات التدخل المبكر الموصى بها' : 'Early Intervention Flagged'}</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">18</span>
            <span className="text-xs text-amber-600 font-bold">Needs Review</span>
          </div>
          <p className="text-[11px] text-slate-500">Pending clinical team assignment</p>
        </div>
      </div>

      {/* Regional Branch Comparison Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'جدول مقارنة أداء الفروع' : 'Branch Performance Comparison Table'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr ? 'انقر على أي فرع لتحديده والتنقل إلى تفاصيله المباشرة' : 'Click any branch to select it globally and inspect local operations.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={regionFilter}
              onChange={e => setRegionFilter(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">{isAr ? 'جميع المناطق' : 'All Regions'}</option>
              <option value="bahrain">Bahrain</option>
              <option value="saudi">Saudi Arabia</option>
              <option value="uae">UAE</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 font-bold">{isAr ? 'اسم الفرع / المركز' : 'Branch Name'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'المدينة / المنطقة' : 'Location'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الطلاب المسجلون' : 'Enrollment'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'معدل الإشغال' : 'Occupancy'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'مؤشر التطور النموذجي' : 'Dev Score'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'نسبة رضى أولياء الأمور' : 'Parent Satisfaction'}</th>
                <th className="py-3 px-4 font-bold">{isAr ? 'الإجراء' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockBranches.map(branch => {
                const occupancyPercent = Math.round((branch.enrolledCount / branch.capacity) * 100);
                const isSelected = currentBranchId === branch.id;
                return (
                  <tr
                    key={branch.id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition ${
                      isSelected ? 'bg-blue-50/60 dark:bg-blue-950/30' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{isAr ? branch.nameAr : branch.name}</span>
                      {isSelected && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-600 text-white rounded">
                          Selected
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {isAr ? branch.cityAr : branch.city}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {branch.enrolledCount} / {branch.capacity}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full"
                            style={{ width: `${occupancyPercent}%` }}
                          />
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{occupancyPercent}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-teal-600 dark:text-teal-400">
                      88.4%
                    </td>
                    <td className="py-3.5 px-4 font-bold text-amber-600 dark:text-amber-400">
                      98.2%
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => {
                          setCurrentBranchId(branch.id);
                          setActiveSection('children_directory');
                        }}
                        className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition flex items-center gap-1"
                      >
                        <span>{isAr ? 'عرض الأطفال' : 'View Children'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
