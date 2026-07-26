import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalDisclaimer } from '../layout/ClinicalDisclaimer';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip
} from 'recharts';
import {
  Cpu, Sparkles, Calendar, ShieldCheck, Heart, Award, FileText, Activity, Users,
  CheckCircle2, Clock, AlertTriangle, TrendingUp, ChevronRight, UserCheck, Stethoscope,
  Lock, RefreshCw, Layers, BookOpen, Smile, FileSpreadsheet, PlusCircle
} from 'lucide-react';

export const ChildDigitalTwin: React.FC = () => {
  const { language, selectedChild, addObservationToDigitalTwin } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'skills' | 'assessments' | 'therapy' | 'learning' | 'health' | 'insights' | 'family' | 'documents'>('overview');
  const [predictionHorizon, setPredictionHorizon] = useState<'30days' | '90days' | '6months' | '12months'>('90days');

  const [newObsText, setNewObsText] = useState('');
  const [newObsDomain, setNewObsDomain] = useState<keyof typeof selectedChild.domains>('speechLanguage');
  const [isAddingObs, setIsAddingObs] = useState(false);

  const isAr = language === 'ar';

  const radarData = [
    { domain: isAr ? 'المعرفي' : 'Cognitive', score: selectedChild.domains.cognitive, fullMark: 100 },
    { domain: isAr ? 'النطق والتخاطب' : 'Speech & Lang', score: selectedChild.domains.speechLanguage, fullMark: 100 },
    { domain: isAr ? 'الحركة الدقيقة' : 'Fine Motor', score: selectedChild.domains.fineMotor, fullMark: 100 },
    { domain: isAr ? 'الحركة الكبرى' : 'Gross Motor', score: selectedChild.domains.grossMotor, fullMark: 100 },
    { domain: isAr ? 'الاجتماعي العاطفي' : 'Social-Emot', score: selectedChild.domains.socialEmotional, fullMark: 100 },
    { domain: isAr ? 'السلوك التكيفي' : 'Adaptive', score: selectedChild.domains.adaptiveBehavior, fullMark: 100 },
    { domain: isAr ? 'الجاهزية الأكاديمية' : 'Academic', score: selectedChild.domains.academicReadiness, fullMark: 100 },
    { domain: isAr ? 'الانتباه والمشاركة' : 'Attention', score: selectedChild.domains.attentionEngagement, fullMark: 100 },
  ];

  const historicalTrend = [
    { month: 'Jan', score: selectedChild.developmentScore - 12 },
    { month: 'Mar', score: selectedChild.developmentScore - 8 },
    { month: 'May', score: selectedChild.developmentScore - 4 },
    { month: 'Jul', score: selectedChild.developmentScore },
  ];

  const handleObsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObsText.trim()) return;
    addObservationToDigitalTwin(selectedChild.id, newObsText, newObsDomain, 3);
    setNewObsText('');
    setIsAddingObs(false);
  };

  const getPredictionData = () => {
    switch (predictionHorizon) {
      case '30days':
        return selectedChild.predictions.days30;
      case '90days':
        return selectedChild.predictions.days90;
      case '6months':
        return selectedChild.predictions.months6;
      case '12months':
        return selectedChild.predictions.months12;
    }
  };

  const activePrediction = getPredictionData();

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Disclaimer Notice Banner */}
      <ClinicalDisclaimer />

      {/* Flagship Digital Twin Profile Header */}
      <div className="bg-gradient-to-r from-[#102A43] via-slate-900 to-indigo-950 text-white border border-blue-900/60 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Child Photo & Primary Identifiers */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={selectedChild.avatar}
                alt={selectedChild.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-blue-500/40 shadow-lg"
              />
              <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <Cpu className="w-3 h-3" /> Digital Twin
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black tracking-wide">
                  {isAr ? selectedChild.nameAr : selectedChild.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  {selectedChild.riskLevel} {isAr ? 'خطر' : 'Risk Level'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {selectedChild.interventionStatus}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {selectedChild.age} ({selectedChild.gender}) • {selectedChild.classroom} • {selectedChild.branchName}
              </p>

              <div className="flex items-center gap-4 mt-2 text-xs text-slate-300 flex-wrap">
                <span className="flex items-center gap-1 text-slate-200">
                  <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                  {selectedChild.teacher}
                </span>
                {selectedChild.therapists.map((t, i) => (
                  <span key={i} className="flex items-center gap-1 text-teal-300">
                    <Stethoscope className="w-3.5 h-3.5" />
                    {t.role}: {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Aggregate Index Score Ring & Consent Indicators */}
          <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between lg:justify-end border-t lg:border-t-0 lg:border-l border-slate-700/60 pt-4 lg:pt-0 lg:pl-6 rtl:lg:pl-0 rtl:lg:pr-6">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider mb-1">
                {isAr ? 'المؤشر التنموي المجمع' : 'Overall Progress Index'}
              </span>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 font-black text-2xl text-white shadow-md ring-2 ring-blue-400/30">
                {selectedChild.developmentScore}
              </div>
              <span className="text-[10px] text-teal-300 block mt-1 font-bold">
                {isAr ? 'آخر تحديث: 2026-07-26' : 'Last Synced: Today'}
              </span>
            </div>

            <div className="space-y-1 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAr ? 'موافقة ولي الأمر: موثقة' : 'Guardian Consent: Verified'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>{isAr ? 'حماية البيانات الحساسة: مفعلة' : 'Sensitive Data Masked'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 10 Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'overview', label: 'Overview', labelAr: 'نظرة عامة', icon: Layers },
          { id: 'timeline', label: 'Development Timeline', labelAr: 'الجدول الزمني التنموي', icon: Calendar },
          { id: 'skills', label: 'Skills Mastery', labelAr: 'إتقان المهارات', icon: Award },
          { id: 'assessments', label: 'AI Assessments', labelAr: 'تقييمات الذكاء الاصطناعي', icon: Cpu },
          { id: 'therapy', label: 'Therapy Plan', labelAr: 'خطة العلاج', icon: Activity },
          { id: 'learning', label: 'Learning Pathway', labelAr: 'مسار التعلم', icon: BookOpen },
          { id: 'health', label: 'Health & Sensory', labelAr: 'الصحة والحس', icon: Heart },
          { id: 'insights', label: 'AI Insights & Predictions', labelAr: 'التحليلات والتنبؤات', icon: TrendingUp },
          { id: 'family', label: 'Family Engagement', labelAr: 'تفاعل الأسرة', icon: Users },
          { id: 'documents', label: 'Documents & Consent', labelAr: 'المستندات والموافقات', icon: FileText },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{isAr ? tab.labelAr : tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB A: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main 8-Domain Radar Chart + Current Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 8 Developmental Domains Radar Chart */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span>{isAr ? 'مخطط المجالات التنموية الثمانية' : '8-Domain Developmental Radar'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'مقارنة حية لمهارات الطفل بالمعايير النموذجية لسن الفئة' : 'Real-time multi-domain score mapping against age cohort norm baseline'}
                  </p>
                </div>
              </div>

              <div className="h-72 w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#94A3B8" strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="domain" tick={{ fill: '#64748B', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <Radar
                      name={selectedChild.name}
                      dataKey="score"
                      stroke="#2563EB"
                      fill="#2563EB"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Current Development Narrative & Quick Teacher Add Observation */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{isAr ? 'الملخص التنموي المولد بالذكاء الاصطناعي' : 'Current Development Summary'}</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-teal-100 text-teal-800 font-bold">
                    Respectful Clinical Tone
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 mb-4">
                  {isAr ? selectedChild.developmentNarrative.summaryAr : selectedChild.developmentNarrative.summary}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/80 dark:border-emerald-900/60">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                      {isAr ? 'نقاط القوة البارزة:' : 'Primary Strengths:'}
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-emerald-900 dark:text-emerald-200 text-[11px]">
                      {(isAr ? selectedChild.developmentNarrative.strengthsAr : selectedChild.developmentNarrative.strengths).map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-900/60">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                      {isAr ? 'مجالات تحتاج لمتابعة:' : 'Areas for Attention:'}
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-amber-900 dark:text-amber-200 text-[11px]">
                      {(isAr ? selectedChild.developmentNarrative.areasForAttentionAr : selectedChild.developmentNarrative.areasForAttention).map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Add Observation Button for Teachers (Flow 2 requirement!) */}
              <div>
                {!isAddingObs ? (
                  <button
                    onClick={() => setIsAddingObs(true)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{isAr ? 'إضافة ملاحظة معلمة لتحديث التوأم الرقمي (المسار 2)' : 'Add Observation & Update Digital Twin (Flow 2)'}</span>
                  </button>
                ) : (
                  <form onSubmit={handleObsSubmit} className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-200">
                      <span>{isAr ? 'ملاحظة المعلمة الجديدة' : 'New Teacher Observation'}</span>
                      <button type="button" onClick={() => setIsAddingObs(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                    </div>

                    <select
                      value={newObsDomain}
                      onChange={e => setNewObsDomain(e.target.value as any)}
                      className="w-full bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 rounded-lg p-1.5 text-xs text-slate-800 dark:text-slate-100 font-medium"
                    >
                      <option value="speechLanguage">{isAr ? 'النطق والتخاطب' : 'Speech & Language'}</option>
                      <option value="fineMotor">{isAr ? 'الحركة الدقيقة' : 'Fine Motor'}</option>
                      <option value="cognitive">{isAr ? 'المعرفي' : 'Cognitive'}</option>
                      <option value="socialEmotional">{isAr ? 'الاجتماعي العاطفي' : 'Social-Emotional'}</option>
                    </select>

                    <textarea
                      value={newObsText}
                      onChange={e => setNewObsText(e.target.value)}
                      placeholder={isAr ? 'مثال: "لاحظت اليوم تحسن في ممارسة قبضة القلم مع تفاعل إيجابي..."' : 'e.g. Observed improved tripod grip stability during drawing exercise...'}
                      className="w-full bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 rounded-lg p-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
                      rows={2}
                    />

                    <button type="submit" className="w-full py-2 bg-blue-600 text-white font-bold text-xs rounded-lg shadow-xs">
                      {isAr ? 'حفظ وتحديث التوأم الرقمي فلياً' : 'Save & Auto-Update Digital Twin'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Progress Prediction Horizon Slider */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  <span>{isAr ? 'التنبؤ التقدمي للتطور (غير مؤكد حتمياً)' : 'Progress Prediction Horizon'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? 'توقعات التطور مع مراعاة درجة الثقة والعوامل المؤثرة' : 'AI developmental trajectory forecasts with confidence scores & contributing drivers'}
                </p>
              </div>

              {/* Time Horizon Selector Buttons */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {[
                  { id: '30days', label: '30 Days' },
                  { id: '90days', label: '90 Days' },
                  { id: '6months', label: '6 Months' },
                  { id: '12months', label: '12 Months' },
                ].map(h => (
                  <button
                    key={h.id}
                    onClick={() => setPredictionHorizon(h.id as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      predictionHorizon === h.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Horizon Card */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-800/80 dark:to-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                    {isAr ? `توقع الأداء خلال (${predictionHorizon})` : `Predicted Score Index: ${activePrediction.score}/100`}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-bold">
                    {activePrediction.confidence}% {isAr ? 'نسبة الثقة' : 'Confidence Level'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {isAr ? activePrediction.summaryAr : activePrediction.summary}
                </p>
              </div>

              <div className="w-full md:w-auto bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs shrink-0">
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  {isAr ? 'العوامل المؤثرة المحددة:' : 'Influencing Drivers:'}
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400 text-[11px]">
                  {(isAr ? selectedChild.predictions.influencingFactorsAr : selectedChild.predictions.influencingFactors).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB B: DEVELOPMENT TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>{isAr ? 'الجدول الزمني التنموي الزمني' : 'Chronological Development Timeline'}</span>
            </h3>
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 space-y-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
            {selectedChild.timeline.map((item) => (
              <div key={item.id} className="relative group">
                <div className="absolute -left-[31px] rtl:-right-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900" />
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                      {isAr ? item.titleAr : item.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-slate-200 text-slate-800'}`}>
                      {item.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isAr ? item.descriptionAr : item.description}
                  </p>
                  <div className="mt-2 text-[11px] text-slate-400 font-medium">
                    {isAr ? 'المحرر:' : 'Logged by:'} <span className="text-slate-700 dark:text-slate-300 font-bold">{item.author}</span> ({item.role})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB C - J (Skills, Assessments, Therapy, Learning, Health, Insights, Family, Documents placeholders with rich widgets) */}
      {activeTab !== 'overview' && activeTab !== 'timeline' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 capitalize">
              {activeTab.replace('_', ' ')} Details
            </h3>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {selectedChild.name} • Live Twin Data
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'البيانات المكتملة مسجلة ومزامنة مباشرة مع قاعدة التوأم الرقمي لمؤسسة التعلم.'
              : 'Detailed clinical records and milestone evidence fully integrated into Digital Twin model.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                {isAr ? 'حالة التقييم:' : 'Evaluation Status:'}
              </span>
              <span className="text-emerald-600 font-bold">Approved & Verified</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                {isAr ? 'دقة الذكاء الاصطناعي:' : 'AI Calibration Confidence:'}
              </span>
              <span className="text-blue-600 font-bold">94% Matching Cohort</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                {isAr ? 'موافقة ولي الأمر:' : 'Parent Agreement:'}
              </span>
              <span className="text-teal-600 font-bold">Signed Digital Form</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
