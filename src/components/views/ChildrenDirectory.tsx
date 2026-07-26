import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockBranches } from '../../data/mockData';
import { Child, UserRole } from '../../types';
import {
  Search,
  Filter,
  Users,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  UserCheck,
  Building2,
  Sparkles,
  Cpu,
  Plus,
  UserPlus,
  X,
  Wand2
} from 'lucide-react';

export const ChildrenDirectory: React.FC = () => {
  const {
    language,
    childrenList,
    usersList,
    addChild,
    addStaff,
    setSelectedChildId,
    setActiveSection,
    currentBranchId
  } = useApp();

  const [search, setSearch] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [filterIntervention, setFilterIntervention] = useState<string>('all');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal States
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  // New Child Form State
  const [childForm, setChildForm] = useState({
    name: '',
    nameAr: '',
    age: '4.5 yrs',
    classroom: 'KG1-A (Butterflies)',
    parentName: '',
    parentPhone: '+973 3988 7766',
    riskLevel: 'Low' as Child['riskLevel'],
    interventionStatus: 'Speech & Language Support'
  });

  // New Staff Form State
  const [staffForm, setStaffForm] = useState({
    name: '',
    nameAr: '',
    role: 'Teacher' as UserRole,
    email: ''
  });

  const isAr = language === 'ar';

  const filteredChildren = childrenList.filter(c => {
    const nameMatch = c.name ? c.name.toLowerCase().includes(search.toLowerCase()) : false;
    const nameArMatch = c.nameAr ? c.nameAr.includes(search) : false;
    const parentMatch = c.parentName ? c.parentName.toLowerCase().includes(search.toLowerCase()) : false;
    const matchesSearch = nameMatch || nameArMatch || parentMatch;

    const matchesRisk = filterRisk === 'all' || (c.riskLevel ? c.riskLevel.toLowerCase() === filterRisk.toLowerCase() : false);
    const matchesBranch = filterBranch === 'all' || c.branchId === filterBranch;
    const matchesIntervention =
      filterIntervention === 'all' ||
      (filterIntervention === 'active' && c.interventionStatus && c.interventionStatus !== 'None') ||
      (filterIntervention === 'none' && (!c.interventionStatus || c.interventionStatus === 'None'));

    return matchesSearch && matchesRisk && matchesBranch && matchesIntervention;
  });

  const getRiskBadge = (risk: Child['riskLevel']) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 border-red-200 dark:border-red-900';
      case 'Moderate':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-900';
      case 'Low':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200';
    }
  };

  const handlePopulateDummyChild = () => {
    const randomNames = [
      { en: 'Zainab Al-Kuwari', ar: 'زينب الكواري', parent: 'Mohammed Al-Kuwari' },
      { en: 'Yousef Mansoor', ar: 'يوسف منصور', parent: 'Mansoor Ali' },
      { en: 'Haya Al-Mansoori', ar: 'هيا المنصوري', parent: 'Rashid Al-Mansoori' },
      { en: 'Khalid Al-Dossary', ar: 'خالد الدوسري', parent: 'Fahad Al-Dossary' }
    ];
    const picked = randomNames[Math.floor(Math.random() * randomNames.length)];
    setChildForm({
      name: picked.en,
      nameAr: picked.ar,
      age: `${(Math.random() * 2 + 3).toFixed(1)} yrs`,
      classroom: 'KG1-B (Stars)',
      parentName: picked.parent,
      parentPhone: `+973 ${Math.floor(10000000 + Math.random() * 90000000)}`,
      riskLevel: 'Moderate',
      interventionStatus: 'Occupational Therapy'
    });
  };

  const handlePopulateDummyStaff = () => {
    const randomStaff = [
      { en: 'Ms. Amna Al-Sada', ar: 'أ. آمنة السادة', role: 'Teacher' as UserRole, email: 'amna.sada@earlysteps.edu.bh' },
      { en: 'Dr. Hussain Al-Aali', ar: 'د. حسين العالي', role: 'Speech Therapist' as UserRole, email: 'hussain.aali@earlysteps.edu.bh' },
      { en: 'Ms. Reem Farhan', ar: 'أ. ريم فرحان', role: 'Occupational Therapist' as UserRole, email: 'reem.farhan@earlysteps.edu.bh' },
      { en: 'Mr. Ali Al-Jowder', ar: 'أ. علي الجودر', role: 'ABA Therapist' as UserRole, email: 'ali.jowder@earlysteps.edu.bh' }
    ];
    const picked = randomStaff[Math.floor(Math.random() * randomStaff.length)];
    setStaffForm({
      name: picked.en,
      nameAr: picked.ar,
      role: picked.role,
      email: picked.email
    });
  };

  const handleAddChildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addChild({
      name: childForm.name || 'New Enrolled Child',
      nameAr: childForm.nameAr || 'طفل جديد مسجل',
      age: childForm.age,
      classroom: childForm.classroom,
      parentName: childForm.parentName || 'Parent Name',
      parentPhone: childForm.parentPhone,
      riskLevel: childForm.riskLevel,
      interventionStatus: childForm.interventionStatus
    });
    setIsAddChildOpen(false);
  };

  const handleAddStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStaff({
      name: staffForm.name || 'New Staff Specialist',
      nameAr: staffForm.nameAr || 'أخصائي جديد',
      role: staffForm.role,
      email: staffForm.email || 'staff@earlysteps.edu.bh'
    });
    setIsAddStaffOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'دليل الأطفال والملفات الرقمية' : 'Children & Digital Twins Directory'}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
              {filteredChildren.length} {isAr ? 'طفل مسجل' : 'Enrolled Children'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'تصفح وإضافة الأطفال والأخصائيين، واستعراض التوأم الرقمي والتقييمات الذكية'
              : 'View, add child details, add staff members, and access complete child digital twin profiles'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => setIsAddChildOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'إضافة طفل جديد' : '+ Add Child Details'}</span>
          </button>

          <button
            onClick={() => setIsAddStaffOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isAr ? 'إضافة كادر تعليمي / أخصائي' : '+ Add Staff Member'}</span>
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
            className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors border border-slate-200 dark:border-slate-700"
          >
            {viewMode === 'grid' ? (isAr ? 'عرض الجدول' : 'Table View') : (isAr ? 'عرض الشبكة' : 'Grid View')}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={isAr ? 'بحث باسم الطفل، اسم الوالد...' : 'Search child name, parent...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Risk Level Filter */}
          <div>
            <select
              value={filterRisk}
              onChange={e => setFilterRisk(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              <option value="all">{isAr ? 'جميع مستويات الخطورة' : 'All Risk Levels'}</option>
              <option value="high">{isAr ? 'خطورة عالية (High Risk)' : 'High Risk'}</option>
              <option value="moderate">{isAr ? 'خطورة متوسطة (Moderate)' : 'Moderate Risk'}</option>
              <option value="low">{isAr ? 'خطورة منخفضة (Low Risk)' : 'Low Risk'}</option>
            </select>
          </div>

          {/* Intervention Filter */}
          <div>
            <select
              value={filterIntervention}
              onChange={e => setFilterIntervention(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              <option value="all">{isAr ? 'جميع حالات التدخل' : 'All Interventions'}</option>
              <option value="active">{isAr ? 'يتلقى برنامج علاجي' : 'Active Intervention'}</option>
              <option value="none">{isAr ? 'بدون برنامج علاجي' : 'No Intervention'}</option>
            </select>
          </div>

          {/* Branch Filter */}
          <div>
            <select
              value={filterBranch}
              onChange={e => setFilterBranch(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              <option value="all">{isAr ? 'جميع الفروع' : 'All Branches'}</option>
              {mockBranches.map(b => (
                <option key={b.id} value={b.id}>
                  {isAr ? b.nameAr : b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Children Content Grid or Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredChildren.map(child => (
            <div
              key={child.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={child.avatar}
                      alt={child.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-100 dark:ring-slate-800"
                    />
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                        {isAr ? child.nameAr : child.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                        {child.age} • {child.classroom}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getRiskBadge(child.riskLevel)}`}>
                    {child.riskLevel}
                  </span>
                </div>

                <div className="my-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{isAr ? 'مؤشر النمو' : 'Dev Score'}</span>
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">
                      {child.developmentScore} / 100
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{isAr ? 'الفرع' : 'Branch'}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 truncate block">
                      {child.branchName}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isAr ? 'ولي الأمر:' : 'Parent:'} <strong className="text-slate-900 dark:text-white">{child.parentName}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                    <span>{isAr ? 'التدخل:' : 'Intervention:'} <strong className="text-slate-800 dark:text-slate-200">{child.interventionStatus}</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">
                  {isAr ? 'آخر تقييم:' : 'Last Eval:'} {child.lastAssessmentDate}
                </span>

                <button
                  onClick={() => {
                    setSelectedChildId(child.id);
                    setActiveSection('digital_twin');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-xs"
                >
                  <span>{isAr ? 'عرض التوأم الرقمي' : 'View Digital Twin'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3.5">{isAr ? 'الطفل' : 'Child'}</th>
                  <th className="p-3.5">{isAr ? 'العمر / الفصل' : 'Age & Class'}</th>
                  <th className="p-3.5">{isAr ? 'الفرع' : 'Branch'}</th>
                  <th className="p-3.5">{isAr ? 'المستوى التنموي' : 'Score'}</th>
                  <th className="p-3.5">{isAr ? 'مستوى الخطر' : 'Risk'}</th>
                  <th className="p-3.5">{isAr ? 'نوع التدخل' : 'Intervention'}</th>
                  <th className="p-3.5">{isAr ? 'آخر تقييم' : 'Last Eval'}</th>
                  <th className="p-3.5 text-right rtl:text-left">{isAr ? 'إجراء' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {filteredChildren.map(c => (
                  <tr
                    key={c.id}
                    onClick={() => {
                      setSelectedChildId(c.id);
                      setActiveSection('digital_twin');
                    }}
                    className="hover:bg-blue-50/50 dark:hover:bg-blue-900/30 cursor-pointer transition-colors"
                  >
                    <td className="p-3.5 font-bold flex items-center gap-2.5">
                      <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-xl object-cover" />
                      <div>
                        <p className="text-slate-900 dark:text-slate-100">{isAr ? c.nameAr : c.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{c.parentName}</p>
                      </div>
                    </td>
                    <td className="p-3.5 font-medium">{c.age} <br /><span className="text-[10px] text-slate-400">{c.classroom}</span></td>
                    <td className="p-3.5 font-medium">{c.branchName}</td>
                    <td className="p-3.5 font-extrabold text-blue-600">{c.developmentScore}/100</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRiskBadge(c.riskLevel)}`}>
                        {c.riskLevel}
                      </span>
                    </td>
                    <td className="p-3.5 font-medium">{c.interventionStatus}</td>
                    <td className="p-3.5 text-slate-500">{c.lastAssessmentDate}</td>
                    <td className="p-3.5 text-right rtl:text-left">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-[11px]">
                        {isAr ? 'فتح التوأم' : 'Open Twin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add Child Details */}
      {isAddChildOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>{isAr ? 'إضافة تفاصيل طفل جديد' : 'Add New Child Details'}</span>
              </h3>
              <button
                onClick={() => setIsAddChildOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddChildSubmit} className="space-y-4 text-xs">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handlePopulateDummyChild}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800 flex items-center gap-1 hover:bg-purple-100 transition"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تعبئة بيانات تجريبية تلقائياً' : 'Auto-Fill Dummy Data'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'اسم الطفل (بالإنجليزية)' : 'Child Full Name (EN)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={childForm.name}
                    onChange={e => setChildForm({ ...childForm, name: e.target.value })}
                    placeholder="e.g. Tariq Mansoor"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'اسم الطفل (بالعربية)' : 'Child Name (AR)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={childForm.nameAr}
                    onChange={e => setChildForm({ ...childForm, nameAr: e.target.value })}
                    placeholder="مثال: طارق منصور"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'العمر' : 'Age'}
                  </label>
                  <input
                    type="text"
                    value={childForm.age}
                    onChange={e => setChildForm({ ...childForm, age: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'الصف / الفصل' : 'Classroom'}
                  </label>
                  <input
                    type="text"
                    value={childForm.classroom}
                    onChange={e => setChildForm({ ...childForm, classroom: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'اسم ولي الأمر' : 'Parent Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={childForm.parentName}
                    onChange={e => setChildForm({ ...childForm, parentName: e.target.value })}
                    placeholder="e.g. Mohammed Mansoor"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'هاتف التواصل' : 'Parent Phone'}
                  </label>
                  <input
                    type="text"
                    value={childForm.parentPhone}
                    onChange={e => setChildForm({ ...childForm, parentPhone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'مستوى المخاطر التنموية' : 'Developmental Risk'}
                  </label>
                  <select
                    value={childForm.riskLevel}
                    onChange={e => setChildForm({ ...childForm, riskLevel: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  >
                    <option value="Low">Low Risk</option>
                    <option value="Moderate">Moderate Risk</option>
                    <option value="High">High Risk</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'برنامج التدخل' : 'Intervention Program'}
                  </label>
                  <input
                    type="text"
                    value={childForm.interventionStatus}
                    onChange={e => setChildForm({ ...childForm, interventionStatus: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddChildOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-xs"
                >
                  {isAr ? 'حفظ الطفل الجديد' : 'Save Child Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Staff Member */}
      {isAddStaffOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-600" />
                <span>{isAr ? 'إضافة أخصائي / معمار جديد' : 'Add New Staff Member'}</span>
              </h3>
              <button
                onClick={() => setIsAddStaffOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaffSubmit} className="space-y-4 text-xs">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handlePopulateDummyStaff}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800 flex items-center gap-1 hover:bg-purple-100 transition"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تعبئة بيانات موظف تجريبية' : 'Auto-Fill Staff Data'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'اسم الموظف (EN)' : 'Staff Full Name (EN)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={staffForm.name}
                    onChange={e => setStaffForm({ ...staffForm, name: e.target.value })}
                    placeholder="e.g. Ms. Sarah Smith"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'اسم الموظف (AR)' : 'Staff Name (AR)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={staffForm.nameAr}
                    onChange={e => setStaffForm({ ...staffForm, nameAr: e.target.value })}
                    placeholder="مثال: أ. سارة أحمد"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'الدور الوظيفي' : 'Role / Position'}
                  </label>
                  <select
                    value={staffForm.role}
                    onChange={e => setStaffForm({ ...staffForm, role: e.target.value as UserRole })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  >
                    <option value="Teacher">Teacher (معلمة)</option>
                    <option value="Speech Therapist">Speech Therapist (أخصائي نطق وتخاطب)</option>
                    <option value="Occupational Therapist">Occupational Therapist (أخصائي علاج وظيفي)</option>
                    <option value="ABA Therapist">ABA Therapist (أخصائي تحليل سلوك)</option>
                    <option value="Psychologist">Psychologist (أخصائي نفسي)</option>
                    <option value="Early Intervention Specialist">Early Intervention Specialist (أخصائي تدخل مبكر)</option>
                    <option value="Branch Manager">Branch Manager (مدير فرع)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={staffForm.email}
                    onChange={e => setStaffForm({ ...staffForm, email: e.target.value })}
                    placeholder="staff@earlysteps.edu.bh"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStaffOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold shadow-xs"
                >
                  {isAr ? 'إضافة الموظف' : 'Save Staff Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
