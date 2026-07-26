import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockSkillMatrix } from '../../data/mockData';
import { SkillMatrixItem } from '../../types';
import { GraduationCap, BookOpen, CheckCircle2, ChevronRight, Award, Layers } from 'lucide-react';

export const LearningAnalytics: React.FC = () => {
  const { language, selectedChild } = useApp();
  const [selectedSkill, setSelectedSkill] = useState<SkillMatrixItem>(mockSkillMatrix[0]);

  const isAr = language === 'ar';

  const getStatusBadge = (status: SkillMatrixItem['status']) => {
    switch (status) {
      case 'Mastered':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-200';
      case 'Developing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 border-blue-200';
      case 'Emerging':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'مصفوفة تحليلات التعلم وإتقان المهارات' : 'Learning Analytics & Skill Mastery Matrix'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'تتبع إتقان المهارات والملاحظات المباشرة لفصل الروضة'
              : 'Track classroom skill progression matrix from Not Introduced to Mastered'}
          </p>
        </div>
      </div>

      {/* Skill Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span>{isAr ? 'مصفوفة إتقان المهارات المباشرة' : 'Skill Mastery Matrix'}</span>
          </h3>

          <div className="space-y-2">
            {mockSkillMatrix.map(skill => (
              <div
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  selectedSkill.id === skill.id
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 ring-2 ring-blue-400/30'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100'
                }`}
              >
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                    {isAr ? skill.skillNameAr : skill.skillName}
                  </h4>
                  <p className="text-[10px] text-slate-500">{skill.domain} • Last Observed: {skill.lastObserved}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-500">{skill.evidenceCount} Evidences</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(skill.status)}`}>
                    {skill.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Skill Drilldown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-[10px] text-blue-600 font-bold uppercase">{selectedSkill.domain}</span>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
              {isAr ? selectedSkill.skillNameAr : selectedSkill.skillName}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Observation History:</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Recorded 14 observational evidences by Amina Al-Zahra during group craft & story reading.
              </p>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-blue-900 dark:text-blue-200 block mb-1">Recommended Next Activity:</span>
              <p className="text-blue-950 dark:text-blue-100 text-[11px]">
                Gamified 10-minute peer sorting challenge with visual cue cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
