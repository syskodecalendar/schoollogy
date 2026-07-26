import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalDisclaimer } from '../layout/ClinicalDisclaimer';
import { RecommendationItem } from '../../types';
import {
  Lightbulb, Check, X, Edit3, UserPlus, Calendar, Share2, Sparkles, ShieldCheck, Clock, ArrowRight, UserCheck
} from 'lucide-react';

export const RecommendationEngine: React.FC = () => {
  const {
    language,
    recommendationsList,
    approveRecommendation,
    rejectRecommendation,
    currentUser,
    setActiveSection,
    setSelectedChildId
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const isAr = language === 'ar';

  const filteredRecs = recommendationsList.filter(r => {
    const matchesCategory = categoryFilter === 'all' || r.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || r.priority.toLowerCase() === priorityFilter.toLowerCase();
    return matchesCategory && matchesPriority;
  });

  const getPriorityBadge = (p: RecommendationItem['priority']) => {
    switch (p) {
      case 'Critical':
        return 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 border-red-200';
      case 'High':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'محرك التوصيات المركزي بالذكاء الاصطناعي' : 'Central Recommendation Engine'}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold border border-amber-200">
              {filteredRecs.length} Active Items
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'موجز التوصيات المبررة بالبيانات المباشرة مع سجل الاعتماد والمراجعة الإكليكية'
              : 'Evidence-backed AI recommendations with human governance audit history & action workflows'}
          </p>
        </div>
      </div>

      <ClinicalDisclaimer />

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{isAr ? 'الفئة:' : 'Category:'}</label>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs font-medium text-slate-800 dark:text-slate-200"
          >
            <option value="all">{isAr ? 'جميع الفئات' : 'All Categories'}</option>
            <option value="therapy">{isAr ? 'خطط العلاج' : 'Therapy Plans'}</option>
            <option value="classroom">{isAr ? 'تسهيلات الفصل' : 'Classroom Adjustments'}</option>
            <option value="management">{isAr ? 'الإدارة' : 'Management'}</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{isAr ? 'الأولوية:' : 'Priority:'}</label>
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs font-medium text-slate-800 dark:text-slate-200"
          >
            <option value="all">{isAr ? 'جميع الأولويات' : 'All Priorities'}</option>
            <option value="critical">{isAr ? 'حرجة' : 'Critical'}</option>
            <option value="high">{isAr ? 'مرتفعة' : 'High'}</option>
            <option value="medium">{isAr ? 'متوسطة' : 'Medium'}</option>
          </select>
        </div>
      </div>

      {/* Recommendation Feed List */}
      <div className="space-y-4">
        {filteredRecs.map(rec => (
          <div
            key={rec.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow space-y-4"
          >
            {/* Top Row Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${getPriorityBadge(rec.priority)}`}>
                  {rec.priority} {isAr ? 'أولوية' : 'Priority'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  {rec.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {isAr ? 'الطفل:' : 'Child:'} <span className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer hover:underline" onClick={() => { setSelectedChildId(rec.childId); setActiveSection('digital_twin'); }}>{rec.childName}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold">
                  {rec.aiConfidence}% AI Confidence
                </span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${rec.approvalStatus === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {rec.approvalStatus}
                </span>
              </div>
            </div>

            {/* Recommendation Content */}
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 mb-1">
                {isAr ? rec.titleAr : rec.title}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60 mb-3">
                <span className="font-bold block text-slate-900 dark:text-slate-100 mb-0.5">{isAr ? 'السبب الداعم:' : 'AI Reasoning:'}</span>
                {isAr ? rec.reasonAr : rec.reason}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">{isAr ? 'البيانات الداعمة:' : 'Supporting Data:'}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{rec.supportingData}</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">{isAr ? 'الفائدة المتوقعة:' : 'Expected Benefit:'}</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{rec.expectedBenefit}</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">{isAr ? 'المسؤول المخصص:' : 'Assigned To:'}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{rec.assignedTo} (Due {rec.dueDate})</span>
                </div>
              </div>

              {/* Audit Trail if accepted */}
              {rec.acceptedBy && (
                <div className="p-2 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 text-[11px] text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {isAr
                      ? `تم الاعتماد والتحويل بواسطة ${rec.acceptedBy} في تاريخ ${rec.acceptedDate}`
                      : `Human Governance Audit: Approved & assigned by ${rec.acceptedBy} on ${rec.acceptedDate}`}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {rec.approvalStatus !== 'Approved' && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 flex-wrap text-xs font-bold">
                <button
                  onClick={() => approveRecommendation(rec.id, currentUser.name)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  <span>{isAr ? 'اعتماد التوصية' : 'Approve Recommendation'}</span>
                </button>

                <button
                  onClick={() => rejectRecommendation(rec.id)}
                  className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  <span>{isAr ? 'رفض' : 'Reject'}</span>
                </button>

                <button
                  onClick={() => setActiveSection('therapy_plans')}
                  className="px-3.5 py-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-xl transition-colors flex items-center gap-1 border border-blue-200 dark:border-blue-800"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{isAr ? 'إضافة لخطة العلاج' : 'Add to Therapy Plan'}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
