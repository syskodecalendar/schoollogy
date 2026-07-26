import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockBranches, mockChildren, mockRecommendations } from '../../data/mockData';
import { ClinicalDisclaimer } from '../layout/ClinicalDisclaimer';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  Building2, Users, AlertTriangle, DollarSign, Activity, TrendingUp, Sparkles, ShieldCheck, ArrowUpRight, ArrowDownRight, MapPin, Search, ChevronRight, CheckCircle
} from 'lucide-react';

export const ExecutiveDashboard: React.FC = () => {
  const { language, setActiveSection, setCurrentBranchId, setSelectedChildId, setIsAIAssistantOpen } = useApp();
  const [askQuery, setAskQuery] = useState('');
  const [askResponse, setAskResponse] = useState<string | null>(null);

  const isAr = language === 'ar';

  const totalBranches = mockBranches.length;
  const totalEnrolled = mockBranches.reduce((a, b) => a + b.totalChildren, 0);
  const totalRiskCount = mockBranches.reduce((a, b) => a + b.riskCount, 0);
  const avgAttendance = (mockBranches.reduce((a, b) => a + b.attendanceRate, 0) / totalBranches).toFixed(1);
  const totalRevenueYTD = (mockBranches.reduce((a, b) => a + b.revenueYTD, 0) / 1000000).toFixed(2);

  const branchDataChart = mockBranches.map(b => ({
    name: isAr ? b.nameAr : b.name.replace(' Campus', '').replace(' Academy', '').replace(' Center', ''),
    children: b.totalChildren,
    risk: b.riskCount,
    revenue: Math.round(b.revenueYTD / 1000)
  }));

  const revenueTrendData = [
    { month: 'Jan', revenue: 320, target: 300 },
    { month: 'Feb', revenue: 350, target: 320 },
    { month: 'Mar', revenue: 410, target: 350 },
    { month: 'Apr', revenue: 390, target: 380 },
    { month: 'May', revenue: 480, target: 400 },
    { month: 'Jun', revenue: 520, target: 420 },
    { month: 'Jul', revenue: 580, target: 450 }
  ];

  const riskDistributionData = [
    { name: isAr ? 'منخفض المخاطر' : 'Low Risk', value: 380, color: '#22C55E' },
    { name: isAr ? 'متوسط المخاطر' : 'Moderate Risk', value: 150, color: '#F59E0B' },
    { name: isAr ? 'مرتفع المخاطر (تدخل)' : 'High Risk (Intervention)', value: 70, color: '#EF4444' }
  ];

  const handleExecutiveSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuery.trim()) return;

    if (askQuery.toLowerCase().includes('branch') || askQuery.toLowerCase().includes('attention')) {
      setAskResponse(
        isAr
          ? 'فرع أبوظبي الغربي (Branch 4) يتطلب تدخلاً عاجلاً: نسبة الحالات المرتفعة 45% ونسبة المعالجين الوظيفيين 1:30. نوصي بإعادة توزيع معالجين من فرع جدة.'
          : 'Abu Dhabi West (Branch 4) requires immediate management attention: 45% high-risk intervention rate with OT caseload deficit (1:30 ratio). Recommending temporary staff reallocation from Jeddah branch.'
      );
    } else {
      setAskResponse(
        isAr
          ? 'تظهر البيانات الإجمالية معدل حضور 92.8% مع قبول 94% من توصيات الذكاء الاصطناعي السريرية عبر جميع الفروع.'
          : 'Overall network KPIs indicate 92.8% attendance rate with a 94% acceptance rate for AI clinical recommendations across all 8 branches.'
      );
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'لوحة القيادة التنفيذية للشبكة' : 'Executive Network Dashboard'}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
              {isAr ? '3 مؤسسات | 8 فروع' : '3 Orgs | 8 Branches'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'مراقبة أداء الشبكة التعليمية والعلاجية، المخاطر التنموية، والتنبؤات المباشرة'
              : 'Real-time multi-branch educational, clinical, financial & predictive intelligence'}
          </p>
        </div>

        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 text-white font-bold text-xs shadow-md hover:shadow-lg hover:scale-[1.02] transition-all ai-glow self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>{isAr ? 'اسأل الذكاء الاصطناعي التنفيذي' : 'Ask Schoology AI Executive'}</span>
        </button>
      </div>

      <ClinicalDisclaimer />

      {/* KPI Cards Grid - High Density Theme */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{isAr ? 'إجمالي الأطفال' : 'Total Enrollment'}</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-[#102A43] dark:text-white">{totalEnrolled}</span>
              <span className="text-xs text-green-500 font-bold mb-0.5">+12%</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[78%]"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{isAr ? 'متوسط الدرجة التنموية' : 'Dev Score Avg'}</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-[#102A43] dark:text-white">84.2%</span>
              <span className="text-xs text-blue-500 font-bold mb-0.5">Stable</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full w-[84%]"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-amber-400 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{isAr ? 'تدخل عاجل مطلوب' : 'Intervention Needed'}</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-[#102A43] dark:text-white">42</span>
              <span className="text-xs text-amber-500 font-bold mb-0.5">+4 New</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">High-risk cases requiring review</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{isAr ? 'قبول الذكاء الاصطناعي' : 'AI Acceptance Rate'}</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-[#102A43] dark:text-white">96%</span>
              <span className="text-xs text-green-500 font-bold mb-0.5">+2%</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-violet-500 h-full w-[96%]"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{isAr ? 'الفروع النشطة' : 'Active Branches'}</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-[#102A43] dark:text-white">{totalBranches}</span>
              <span className="text-xs text-slate-400 font-bold mb-0.5">4 Countries</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[100%]"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{isAr ? 'الإيرادات المعتمدة' : 'Revenue Target'}</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-[#102A43] dark:text-white">${totalRevenueYTD}M</span>
              <span className="text-xs text-green-500 font-bold mb-0.5">80%</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-[80%]"></div>
          </div>
        </div>
      </div>

      {/* Interactive "Ask Schoology AI Executive" Query Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-5 text-white shadow-lg border border-blue-800/40">
        <div className="flex items-center gap-2 mb-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>{isAr ? 'مساعد الذكاء الاصطناعي التنفيذي' : 'Ask Schoology AI Executive'}</span>
        </div>

        <form onSubmit={handleExecutiveSearch} className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isAr ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              value={askQuery}
              onChange={e => setAskQuery(e.target.value)}
              placeholder={isAr ? 'مثال: "أي الفروع تحتاج إلى تدخل إداري عاجل؟"' : 'Try: "Which branches need immediate management attention?"'}
              className={`w-full bg-white/10 border border-white/20 rounded-xl py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isAr ? 'pr-9 pl-4' : 'pl-9 pr-4'
              }`}
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-md shrink-0"
          >
            {isAr ? 'تحليل بالذكاء الاصطناعي' : 'Run AI Analysis'}
          </button>
        </form>

        {askResponse && (
          <div className="mt-3 p-3.5 bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl text-xs leading-relaxed animate-fadeIn flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-slate-100">{askResponse}</p>
              <button
                onClick={() => {
                  setCurrentBranchId('branch-4');
                  setActiveSection('overview');
                }}
                className="mt-2 text-teal-300 hover:underline font-bold text-[11px] inline-flex items-center gap-1"
              >
                <span>{isAr ? 'الانتقال لفرع أبوظبي الغربي' : 'Inspect Abu Dhabi West Branch'}</span>
                <ChevronRight className="w-3 h-3 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Enrolment & Risk Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                {isAr ? 'مقارنة أداء الفروع (الأطفال والحالات الحرجة)' : 'Branch Enrolment & High-Risk Case Load'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'توزيع عدد الأطفال الإجمالي مقابل الحالات المسجلة للتدخل' : 'Total children count vs risk intervention cases across branches'}
              </p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchDataChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                />
                <Bar dataKey="children" fill="#2563EB" name={isAr ? 'إجمالي الأطفال' : 'Enrolled Children'} radius={[6, 6, 0, 0]} />
                <Bar dataKey="risk" fill="#EF4444" name={isAr ? 'حالات مرتفعة المخاطر' : 'High Risk Cases'} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Developmental Risk Distribution Pie Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 mb-1">
            {isAr ? 'توزيع المخاطر التنموية' : 'Developmental Risk Distribution'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            {isAr ? 'تصنيف الأطفال حسب مستوى الحاجة للتدخل' : 'Categorized by developmental milestone risk level'}
          </p>

          <div className="h-52 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                />
                <Legend formatter={(val) => <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{val}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Trend & High Risk Branches List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                {isAr ? 'اتجاهات الإيرادات النصف سنوية (بالآلاف)' : 'YTD Revenue vs Target ($K)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'مقارنة الأداء المالي المباشر بالهدف المعتمد' : 'Monthly revenue growth versus executive budget projections'}
              </p>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" fillOpacity={0.2} fill="#2563EB" name={isAr ? 'الإيرادات' : 'Actual Revenue'} />
                <Area type="monotone" dataKey="target" stroke="#14B8A6" strokeDasharray="3 3" fillOpacity={0} name={isAr ? 'الهدف' : 'Target'} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* High Risk Branches Drilldown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>{isAr ? 'فروع تتطلب متابعة عاجلة' : 'Branches Requiring Review'}</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-100 text-red-800 font-bold">
                2 Critical
              </span>
            </div>

            <div className="space-y-3">
              {mockBranches
                .filter(b => b.status !== 'optimal')
                .map(branch => (
                  <div
                    key={branch.id}
                    onClick={() => {
                      setCurrentBranchId(branch.id);
                      setActiveSection('children');
                    }}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between font-bold text-xs text-slate-800 dark:text-slate-100">
                      <span>{isAr ? branch.nameAr : branch.name}</span>
                      <span className="text-red-600 dark:text-red-400 font-extrabold">
                        {branch.riskCount} {isAr ? 'حالة' : 'Risk Cases'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {branch.city}, {branch.country}
                      </span>
                      <span>{branch.interventionRate}% Intervention Rate</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <button
            onClick={() => setActiveSection('predictive_intelligence')}
            className="w-full mt-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{isAr ? 'عرض التنبؤات الشاملة بالذكاء الاصطناعي' : 'View Full Predictive Intelligence'}</span>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
