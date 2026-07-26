import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalDisclaimer } from '../layout/ClinicalDisclaimer';
import { Sparkles, BookOpen, Download, Share2, Check, Clock, Users, ShieldAlert, Layers } from 'lucide-react';

export const AICurriculumGenerator: React.FC = () => {
  const { language, selectedChild } = useApp();
  const [ageGroup, setAgeGroup] = useState('3-4 years');
  const [domain, setDomain] = useState('Fine Motor & Sensory Integration');
  const [duration, setDuration] = useState('20 mins');
  const [groupType, setGroupType] = useState('Small Group (3-5 children)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const isAr = language === 'ar';

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPlan({
        title: 'Tactile Kinetic Sand Shape Builder & Fine Motor Squeeze',
        titleAr: 'تحدي بناء الأشكال والتكامل الحسي للرمال الكينيتية',
        summary: 'Engaging multi-sensory hand-grip squeeze activity promoting bilateral hand coordination and tripod grip control.',
        materials: ['Kinetic sand', 'Textured geometric molds', 'Plastic tweezers', 'Visual card guides'],
        teacherSteps: [
          'Introduce geometric mold cards to children in a circle.',
          'Demonstrate squeezing sand into molds using firm two-handed pressure.',
          'Guide children to use tweezers to extract embedded plastic gems.'
        ],
        adaptationsForSpecialNeeds: 'Provide weighted wrist bands for children with low muscle tone. Allow verbal choice cards.',
        extensionsForAdvanced: 'Ask children to build 3D stacked pyramids and count total sides.',
        safetyNotes: 'Non-toxic material; ensure close supervision to prevent oral ingestion.',
        assessmentPrompts: 'Observe tripod grip stability when using tweezers. Record score in Digital Twin.'
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'مولد المناهج والأنشطة بالذكاء الاصطناعي' : 'AI Curriculum & Activity Generator'}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-800 font-bold">
              Inclusion Compliant
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'إنشاء خطط دروس أنشطة حسية حركية مخصصة للطفل مع تكييفات الاحتياجات الخاصة'
              : 'Generate tailored inclusive lesson plans with special needs adaptations & step-by-step teacher guides'}
          </p>
        </div>
      </div>

      <ClinicalDisclaimer />

      {/* Inputs & Generated Plan Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator Form Parameters */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{isAr ? 'محددات الخطة والنشاط' : 'Activity Generator Setup'}</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Age Group:</label>
              <select value={ageGroup} onChange={e => setAgeGroup(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-medium">
                <option>2-3 years</option>
                <option>3-4 years</option>
                <option>4-5 years</option>
                <option>5-6 years</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Developmental Domain:</label>
              <select value={domain} onChange={e => setDomain(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-medium">
                <option>Fine Motor & Sensory Integration</option>
                <option>Speech & Expressive Language</option>
                <option>Social-Emotional Turn-Taking</option>
                <option>Cognitive Problem Solving</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Activity Duration:</label>
              <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-medium">
                <option>10 mins</option>
                <option>20 mins</option>
                <option>30 mins</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isGenerating ? 'Generating Activity...' : 'Generate Inclusive Activity Plan'}</span>
            </button>
          </div>
        </div>

        {/* Output Plan Display */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          {!generatedPlan ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-xs font-bold">Set parameters and click generate to create an AI activity plan</p>
            </div>
          ) : (
            <div className="space-y-4 text-xs animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-black text-base text-slate-900 dark:text-slate-100">
                  {isAr ? generatedPlan.titleAr : generatedPlan.title}
                </h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Ready to Teach
                </span>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                {generatedPlan.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50/80 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900">
                  <span className="font-bold text-blue-900 dark:text-blue-200 block mb-1">Teacher Instructions:</span>
                  <ol className="list-decimal list-inside space-y-1 text-blue-950 dark:text-blue-100">
                    {generatedPlan.teacherSteps.map((step: string, i: number) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900">
                  <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">Special Needs Adaptations:</span>
                  <p className="text-amber-950 dark:text-amber-100">{generatedPlan.adaptationsForSpecialNeeds}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
