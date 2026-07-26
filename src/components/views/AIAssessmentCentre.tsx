import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalDisclaimer } from '../layout/ClinicalDisclaimer';
import { AssessmentType, AIAssessmentRecord } from '../../types';
import {
  Brain, Mic, Video, Image as ImageIcon, FileText, CheckCircle2, ShieldCheck, Play, Upload,
  Sparkles, Check, Edit3, XCircle, ArrowRight, UserCheck, Stethoscope, RefreshCw, Share2
} from 'lucide-react';

export const AIAssessmentCentre: React.FC = () => {
  const {
    language,
    childrenList,
    selectedChild,
    setSelectedChildId,
    assessmentsList,
    approveAssessment,
    runNewAIAssessment,
    setActiveSection,
    currentUser
  } = useApp();

  const [wizardStep, setWizardStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<AssessmentType>('speech');
  const [uploadedMediaName, setUploadedMediaName] = useState<string>('');
  const [consentConfirmed, setConsentConfirmed] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeEvalResult, setActiveEvalResult] = useState<AIAssessmentRecord | null>(assessmentsList[0] || null);

  const isAr = language === 'ar';

  const assessmentCards: { type: AssessmentType; title: string; titleAr: string; icon: any; desc: string; descAr: string }[] = [
    { type: 'speech', title: 'Speech Assessment', titleAr: 'تقييم النطق الأصواتي', icon: Mic, desc: 'Acoustic frequency analysis for phonetic articulation & intelligibility', descAr: 'تحليل الترددات الصوتية لوضوح الكلام ونطق الأصوات' },
    { type: 'language', title: 'Language Assessment', titleAr: 'تقييم اللغة والتعبير', icon: FileText, desc: 'Vocabulary length & syntax comprehension screening', descAr: 'فحص طول المفردات وفهم التراكيب اللغوية' },
    { type: 'behaviour', title: 'Behaviour Assessment', titleAr: 'تقييم السلوك والانضباط', icon: CheckCircle2, desc: 'ABC trigger tracking & attention frequency duration', descAr: 'تتبع محفزات السلوك ومدى ثبات الانتباه' },
    { type: 'developmental_screening', title: 'Developmental Screening', titleAr: 'الفحص التنموي الشامل', icon: Brain, desc: 'Multi-domain milestone screening against age norm baseline', descAr: 'مسح مرحلي شامل لمجالات النمو مقارنة بالعمر' },
    { type: 'fine_motor', title: 'Fine Motor Assessment', titleAr: 'تقييم الحركة الدقيقة', icon: ImageIcon, desc: 'Computer vision pencil grip pressure & shape closure', descAr: 'تحليل قبضة القلم وضغط رسم الأشكال بالرؤية الحاسوبية' },
    { type: 'gross_motor', title: 'Gross Motor Assessment', titleAr: 'تقييم الحركة الكبرى', icon: Video, desc: 'Skeletal tracking for posture, balance & agility navigation', descAr: 'تتبع الهيكل العظمي للتوازن واللياقة الميكانيكية' },
    { type: 'social_emotional', title: 'Social-Emotional Assessment', titleAr: 'تقييم النمو الاجتماعي العاطفي', icon: Sparkles, desc: 'Peer turn-taking & emotional self-regulation tracking', descAr: 'متابعة تبادل الأدوار والتنظيم الذاتي العاطفي' },
    { type: 'school_readiness', title: 'School-Readiness Assessment', titleAr: 'تقييم الجاهزية للمدرسة', icon: UserCheck, desc: 'Grade-1 entry literacy & numeracy standardized screening', descAr: 'فحص معايير الجاهزية للقراءة والحساب للصف الأول' },
    { type: 'drawing_analysis', title: 'Drawing Analysis', titleAr: 'تحليل الرسومات والأشكال', icon: ImageIcon, desc: 'Spatial visual-motor integration & line symmetry', descAr: 'التكامل البصري الحركي والتناظر في الرسم' },
    { type: 'video_movement', title: 'Video Movement Analysis', titleAr: 'تحليل الحركة بالفيديو', icon: Video, desc: 'Temporal stride rhythm & sensory balance coordination', descAr: 'تحليل إيقاع المشي والتناسق الحسي الحركي' },
  ];

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setWizardStep(5);
    setTimeout(async () => {
      const result = await runNewAIAssessment(
        selectedChild.id,
        selectedType,
        uploadedMediaName || 'recorded_sample_observation.mp4'
      );
      setActiveEvalResult(result);
      setIsAnalyzing(false);
      setWizardStep(6);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'مركز تقييم الذكاء الاصطناعي التفاعلي' : 'AI Assessment Centre'}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-bold border border-purple-200">
              10 Assessment Models
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'إجراء التقييمات التفاعلية المباشرة وتأكيد موافقة ولي الأمر مع الاعتماد السريري'
              : 'Interactive 9-step assessment wizard with clinical decision-support & approval workflow'}
          </p>
        </div>
      </div>

      <ClinicalDisclaimer />

      {/* 9-Step Assessment Workflow Stepper Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between overflow-x-auto gap-2 text-xs font-bold scrollbar-none pb-1">
          {[
            { step: 1, label: '1. Select Child' },
            { step: 2, label: '2. Select Type' },
            { step: 3, label: '3. Upload Media' },
            { step: 4, label: '4. Consent Check' },
            { step: 5, label: '5. AI Analysis' },
            { step: 6, label: '6. AI Findings' },
            { step: 7, label: '7. Review' },
            { step: 8, label: '8. Approval' },
            { step: 9, label: '9. Sync Twin' },
          ].map(s => {
            const isActive = wizardStep === s.step;
            const isCompleted = wizardStep > s.step;
            return (
              <div
                key={s.step}
                onClick={() => setWizardStep(s.step)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200/80'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px]">{s.step}</span>}
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: SELECT CHILD & ASSESSMENT TYPE */}
      {wizardStep <= 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step 1 & 3: Child Selection & Media Upload */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
              <span>{isAr ? 'اختيار الطفل ورفع وسائط التقييم' : 'Select Child & Input Media'}</span>
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {isAr ? 'الطفل الخاضع للتقييم:' : 'Target Child:'}
              </label>
              <select
                value={selectedChild.id}
                onChange={e => setSelectedChildId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 font-bold"
              >
                {childrenList.map(c => (
                  <option key={c.id} value={c.id}>
                    {isAr ? c.nameAr : c.name} ({c.classroom} - {c.branchName})
                  </option>
                ))}
              </select>
            </div>

            {/* Media Upload Simulation */}
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center space-y-2 bg-slate-50/50 dark:bg-slate-800/40">
              <Upload className="w-8 h-8 text-blue-500 mx-auto animate-bounce" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {isAr ? 'قم برفع وتسجيل فيديو أو تسجيل صوتي للطفل' : 'Upload or record video/audio sample'}
              </p>
              <p className="text-[10px] text-slate-400">
                Supports MP4, MP3, JPG up to 100MB
              </p>
              <input
                type="text"
                placeholder={isAr ? 'اسم ملف الملاحظة...' : 'Observation_sample_video.mp4'}
                value={uploadedMediaName}
                onChange={e => setUploadedMediaName(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs text-slate-800 dark:text-slate-100 text-center"
              />
            </div>

            {/* Consent Confirmation Checkbox */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
              <input
                type="checkbox"
                checked={consentConfirmed}
                onChange={e => setConsentConfirmed(e.target.checked)}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>
                {isAr
                  ? 'أؤكد الحصول على موافقة ولي الأمر الرسمية المكتوبة لإجراء تقييم الذكاء الاصطناعي.'
                  : 'I confirm active guardian consent for AI clinical screening assessment.'}
              </span>
            </div>

            <button
              onClick={handleStartAnalysis}
              disabled={!consentConfirmed}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isAr ? 'بدء تحليل الذكاء الاصطناعي الفوري' : 'Run Simulated AI Assessment'}</span>
            </button>
          </div>

          {/* Step 2: 10 Assessment Type Cards Grid */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
              <span>{isAr ? 'اختر نموذج التقييم المطلوب (10 نماذج)' : 'Select Assessment Module'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
              {assessmentCards.map(card => {
                const Icon = card.icon;
                const isSelected = selectedType === card.type;
                return (
                  <div
                    key={card.type}
                    onClick={() => {
                      setSelectedType(card.type);
                      setWizardStep(3);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 ring-2 ring-blue-400/30 shadow-xs'
                        : 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">
                        {isAr ? card.titleAr : card.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                        {isAr ? card.descAr : card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: RUNNING ANALYSIS SPINNER */}
      {wizardStep === 5 && isAnalyzing && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-lg space-y-4 my-8">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto animate-spin">
            <RefreshCw className="w-8 h-8" />
          </div>
          <h3 className="font-black text-lg text-slate-900 dark:text-slate-100">
            {isAr ? 'جاري تحليل وسائط التقييم بالذكاء الاصطناعي...' : 'Processing Multi-Modal Assessment Audio & Video...'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Applying deep neural acoustic & posture tracking against {selectedChild.name}’s baseline cohort...
          </p>
        </div>
      )}

      {/* STEP 6-9: RESULT DISPLAY SCREEN */}
      {wizardStep >= 6 && activeEvalResult && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md space-y-6 animate-fadeIn">
          {/* Result Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                  {activeEvalResult.type ? activeEvalResult.type.toUpperCase() : 'ASSESSMENT'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  Confidence: {activeEvalResult.confidenceScore}%
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${activeEvalResult.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  Status: {activeEvalResult.status}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                {isAr ? activeEvalResult.titleAr : activeEvalResult.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Child: <span className="font-bold text-slate-800 dark:text-slate-200">{activeEvalResult.childName}</span> • Evaluator: {activeEvalResult.conductedBy}
              </p>
            </div>

            {/* Approval Controls Bar */}
            <div className="flex items-center gap-2 flex-wrap">
              {activeEvalResult.status !== 'approved' ? (
                <>
                  <button
                    onClick={() => approveAssessment(activeEvalResult.id, 'Clinical assessment verified and approved.')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isAr ? 'اعتماد النتيجة والاهداف' : 'Approve & Sync Twin'}</span>
                  </button>

                  <button
                    onClick={() => setActiveSection('therapy_plans')}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>{isAr ? 'إنشاء خطة علاجية' : 'Create Therapy Plan'}</span>
                  </button>
                </>
              ) : (
                <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Approved by {activeEvalResult.reviewerName || currentUser.name}</span>
                </span>
              )}
            </div>
          </div>

          {/* Skill Scores Grid */}
          <div>
            <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 mb-3">
              {isAr ? 'مؤشرات الأداء المقاسة:' : 'Measured Skill Scores:'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {activeEvalResult.skillScores.map((s, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-center">
                  <span className="text-[11px] text-slate-500 block truncate">{s.name}</span>
                  <span className="text-lg font-black text-blue-600 dark:text-blue-400">{s.score}/100</span>
                </div>
              ))}
            </div>
          </div>

          {/* Observed Indicators List */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 space-y-2">
            <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{isAr ? 'الملاحظات الدقيقة المسجلة بالذكاء الاصطناعي:' : 'Observed AI Clinical Indicators:'}</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
              {(isAr ? activeEvalResult.observedIndicatorsAr : activeEvalResult.observedIndicators).map((ind, i) => (
                <li key={i}>{ind}</li>
              ))}
            </ul>
          </div>

          {/* Suggested Goals & Recommended Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50/80 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-900 text-xs">
              <span className="font-bold text-blue-900 dark:text-blue-200 block mb-1">
                {isAr ? 'الأهداف المقترحة:' : 'Suggested Clinical Goals:'}
              </span>
              <ul className="list-disc list-inside space-y-1 text-blue-950 dark:text-blue-100">
                {activeEvalResult.suggestedGoals.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-teal-50/80 dark:bg-teal-950/50 rounded-xl border border-teal-200 dark:border-teal-900 text-xs">
              <span className="font-bold text-teal-900 dark:text-teal-200 block mb-1">
                {isAr ? 'تكرار التدخل الموصى به:' : 'Recommended Intervention Frequency:'}
              </span>
              <p className="text-teal-950 dark:text-teal-100 font-semibold">{activeEvalResult.suggestedInterventionFrequency}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
