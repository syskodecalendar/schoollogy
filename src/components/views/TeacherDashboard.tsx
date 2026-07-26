import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockChildren } from '../../data/mockData';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  HeartHandshake,
  MessageSquare,
  Award,
  AlertCircle
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { language, childrenList, setSelectedChildId, setActiveSection, addObservationToDigitalTwin } = useApp();
  const isAr = language === 'ar';

  const [obsText, setObsText] = useState('');
  const [selectedChildForObs, setSelectedChildForObs] = useState(childrenList[0]?.id || 'child-1');
  const [selectedDomain, setSelectedDomain] = useState<'cognitive' | 'language' | 'motorFine' | 'socialEmotional'>('cognitive');
  const [obsSuccess, setObsSuccess] = useState(false);

  const classroomChildren = childrenList.slice(0, 8);

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!obsText.trim()) return;
    addObservationToDigitalTwin(selectedChildForObs, obsText, selectedDomain, 2);
    setObsText('');
    setObsSuccess(true);
    setTimeout(() => setObsSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white shadow-xl border border-emerald-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{isAr ? 'فصل الياسمين والزهور المبكرة' : 'Early Bloomers Classroom'}</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {isAr ? 'لوحة عمل معلمات الفصل' : 'Classroom Teacher Copilot Dashboard'}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              {isAr
                ? 'متابعة الأطفال، تسجيل الملاحظات التربوية المباشرة، توليد خطط المنهج بالذكاء الاصطناعي وتحديث التوأم الرقمي.'
                : 'Track classroom roster, generate AI lesson plans, record real-time observations directly into child digital twins.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSection('curriculum_generator')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isAr ? 'مولد المناهج والأنشطة الذكي' : 'Generate AI Lesson Plan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Classroom Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'عدد أطفال الفصل' : 'Classroom Roster'}</span>
            <GraduationCap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{classroomChildren.length}</span>
            <span className="text-xs text-emerald-600 font-bold">Full Present</span>
          </div>
          <p className="text-[11px] text-slate-500">Age 3 - 5 early group</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'الملاحظات المسجلة اليوم' : 'Observations Recorded Today'}</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">14</span>
            <span className="text-xs text-purple-600 font-bold">Auto Synced</span>
          </div>
          <p className="text-[11px] text-slate-500">Updates Digital Twin timeline</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'خطط الأنشطة الفردية' : 'Personalized AI IEP Plans'}</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">8</span>
            <span className="text-xs text-blue-600 font-bold">Active</span>
          </div>
          <p className="text-[11px] text-slate-500">Multidisciplinary targets</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{isAr ? 'رسائل أولياء الأمور' : 'Parent Communications'}</span>
            <MessageSquare className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">3</span>
            <span className="text-xs text-teal-600 font-bold">Unread</span>
          </div>
          <p className="text-[11px] text-slate-500">Daily routine updates</p>
        </div>
      </div>

      {/* Main Grid: Add Quick Observation & Classroom Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Observation Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'تسجيل ملاحظة سريعة للتوأم الرقمي' : 'Record Digital Twin Observation'}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {isAr ? 'يتم إضافة الملاحظة فوراً لسجل الطفل وتحديث التقييم التنموي.' : 'Observation immediately updates child timeline and domain score.'}
              </p>
            </div>
          </div>

          {obsSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAr ? 'تم حفظ الملاحظة وتحديث التوأم الرقمي بنجاح!' : 'Observation saved & Digital Twin updated!'}</span>
            </div>
          )}

          <form onSubmit={handleAddObservation} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'اختر الطفل' : 'Select Child'}
              </label>
              <select
                value={selectedChildForObs}
                onChange={e => setSelectedChildForObs(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                {childrenList.map(c => (
                  <option key={c.id} value={c.id}>
                    {isAr ? c.nameAr : c.name} (Class {c.classroom})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'مجال التطور' : 'Developmental Domain'}
              </label>
              <select
                value={selectedDomain}
                onChange={e => setSelectedDomain(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="cognitive">{isAr ? 'المجال الإدراكي (Cognitive)' : 'Cognitive Domain'}</option>
                <option value="language">{isAr ? 'المجال اللغوي والتواصل (Language)' : 'Language & Speech Domain'}</option>
                <option value="motorFine">{isAr ? 'المهارات الحركية الدقيقة (Fine Motor)' : 'Fine Motor Domain'}</option>
                <option value="socialEmotional">{isAr ? 'التفاعل الاجتماعي والعاطفي (Social/Emotional)' : 'Social/Emotional Domain'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isAr ? 'تفاصيل الملاحظة الميدانية' : 'Observation Details'}
              </label>
              <textarea
                value={obsText}
                onChange={e => setObsText(e.target.value)}
                rows={3}
                placeholder={isAr ? 'مثال: أظهر الطفل استجابة ممتازة أثناء رسم الأشكال الهندسية مع أقرانه...' : 'e.g. Demonstrated great turn-taking during group puzzle activity...'}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'حفظ الملاحظة في التوأم الرقمي' : 'Save Observation to Digital Twin'}</span>
            </button>
          </form>
        </div>

        {/* Classroom Roster Grid */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {isAr ? 'قائمة أطفال الفصل والتنمية المباشرة' : 'Classroom Roster & Development Progress'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr ? 'اضغط على أي طفل لاستعراض سجله التفاعلي' : 'Click any child to access their interactive profile.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {classroomChildren.map(child => (
              <div
                key={child.id}
                onClick={() => {
                  setSelectedChildId(child.id);
                  setActiveSection('digital_twin');
                }}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500 cursor-pointer transition space-y-2 group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={child.avatar}
                    alt={child.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/30"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                      {isAr ? child.nameAr : child.name}
                    </h3>
                    <p className="text-[10px] text-slate-500">Age {child.age} • Status: Present</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{isAr ? 'درجة التطور:' : 'Dev Score:'}</span>
                  <span className="font-bold text-emerald-600">{child.developmentScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
