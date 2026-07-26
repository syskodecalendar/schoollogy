import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockBranches, mockChildren, mockUsers } from '../../data/mockData';
import {
  Building2,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  GraduationCap,
  Calendar,
  ArrowUpRight,
  Sparkles,
  ClipboardCheck,
  Heart
} from 'lucide-react';

export const BranchDashboard: React.FC = () => {
  const { language, currentBranchId, setActiveSection, setSelectedChildId, childrenList } = useApp();
  const isAr = language === 'ar';

  const branch = mockBranches.find(b => b.id === currentBranchId) || mockBranches[0];
  const branchChildren = childrenList.filter(c => c.branchId === currentBranchId);
  const branchStaff = mockUsers.filter(u => u.branchId === currentBranchId);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-teal-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isAr ? branch.nameAr : branch.name}</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {isAr ? 'لوحة قيادة مدير الفرع والمركز' : 'Branch Manager Operations Center'}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              {isAr
                ? 'إدارة الحضور اليومي، فصول الأطفال، كادر التدريب والتربية، الامتثال والتواصل المباشر مع أولياء الأمور.'
                : 'Daily campus operations, teacher check-ins, classroom attendance, therapy schedules & safety compliance.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSection('children_directory')}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-600/30 transition flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              <span>{isAr ? 'دليل الأطفال بالفرع' : 'Branch Children Directory'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'الطلاب المسجلون بالفرع' : 'Branch Enrolled Children'}</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{branchChildren.length}</span>
            <span className="text-xs text-teal-600 font-bold">Cap: {branch.capacity}</span>
          </div>
          <p className="text-[11px] text-slate-500">Active early learners</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'نسبة الحضور اليومي' : 'Today Attendance Rate'}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">96.4%</span>
            <span className="text-xs text-emerald-600 font-bold">58 Checked In</span>
          </div>
          <p className="text-[11px] text-slate-500">2 Absent with excuse</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'الكادر التعليمي والطبي' : 'Active Staff Members'}</span>
            <GraduationCap className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{branchStaff.length}</span>
            <span className="text-xs text-blue-600 font-bold">100% Present</span>
          </div>
          <p className="text-[11px] text-slate-500">Teachers, therapists & admin</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'جلسات العلاج المجدولة' : 'Therapy Sessions Today'}</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">12</span>
            <span className="text-xs text-indigo-600 font-bold">8 Completed</span>
          </div>
          <p className="text-[11px] text-slate-500">Speech, OT, ABA & Psych</p>
        </div>
      </div>

      {/* Children List in Branch */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'قائمة أطفال الفرع الحالي' : 'Children Registered in Branch'}
            </h2>
            <p className="text-xs text-slate-500">
              {isAr ? 'انقر على اسم الطفل لفتح التوأم الرقمي الكامل (10 أقسام)' : 'Click any child to open their 10-tab Digital Twin profile.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {branchChildren.map(child => (
            <div
              key={child.id}
              onClick={() => {
                setSelectedChildId(child.id);
                setActiveSection('digital_twin');
              }}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-teal-500 dark:hover:border-teal-500 cursor-pointer transition space-y-3 group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/30"
                />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
                    {isAr ? child.nameAr : child.name}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Age {child.age} yrs • Class {child.classroom}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-500">{isAr ? 'مؤشر النمو:' : 'Dev Score:'}</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">{child.developmentScore}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
