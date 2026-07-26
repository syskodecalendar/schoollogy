import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicalDisclaimer } from '../layout/ClinicalDisclaimer';
import { Video, Mic, Image as ImageIcon, Cpu, Sparkles, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

export const ComputerVisionLab: React.FC = () => {
  const { language } = useApp();
  const [activeLab, setActiveLab] = useState<'vision' | 'voice'>('vision');
  const [isProcessing, setIsProcessing] = useState(false);
  const [labResult, setLabResult] = useState<any>(null);

  const isAr = language === 'ar';

  const handleRunLab = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setLabResult(
        activeLab === 'vision'
          ? {
              score: 88,
              metrics: 'Pencil Grip Stability: 92% • Pressure Uniformity: Normal • Line Closure: Completed',
              summary: 'Computer Vision analysis detected mature tripod grip with balanced bi-lateral shoulder alignment.'
            }
          : {
              score: 82,
              metrics: 'Phonetic Articulation Intelligibility: 84% • Fluency Index: Normal • Pause Frequency: Low',
              summary: 'Acoustic waveform analysis confirmed clear multi-syllabic vowel articulation.'
            }
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{isAr ? 'مختبر الرؤية الحاسوبية والتحليل الصوتي' : 'Computer Vision & Voice AI Lab'}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800 font-bold">
              Multi-Modal Biometrics
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'تحليل وضعية الحركة وقبضة القلم بالرؤية الحاسوبية ومعالجة الترددات الصوتية'
              : 'Real-time skeleton posture tracking, drawing pressure analysis & speech acoustic frequency mapping'}
          </p>
        </div>
      </div>

      <ClinicalDisclaimer />

      {/* Mode Selector */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => { setActiveLab('vision'); setLabResult(null); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeLab === 'vision' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>{isAr ? 'مختبر الرؤية الحاسوبية والحركة' : 'Computer Vision & Drawing Lab'}</span>
        </button>

        <button
          onClick={() => { setActiveLab('voice'); setLabResult(null); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeLab === 'voice' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>{isAr ? 'مختبر الصوتيات والتخاطب' : 'Voice AI & Phonetics Lab'}</span>
        </button>
      </div>

      {/* Interactive Simulation Sandbox */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="aspect-video bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-800">
          <div className="text-center text-slate-400 space-y-2 p-4">
            {activeLab === 'vision' ? (
              <>
                <Video className="w-12 h-12 mx-auto text-blue-500 animate-pulse" />
                <p className="text-xs font-bold text-slate-200">Vision Mesh Tracking Active (Pencil Grip & Stride Analysis)</p>
              </>
            ) : (
              <>
                <Mic className="w-12 h-12 mx-auto text-purple-500 animate-pulse" />
                <p className="text-xs font-bold text-slate-200">Acoustic Audio Spectrogram Spectrograph Active</p>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleRunLab}
          disabled={isProcessing}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isProcessing ? 'Processing AI Neural Mesh...' : 'Run Lab Analysis'}</span>
        </button>

        {labResult && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm block">Lab Index Score: {labResult.score}/100</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{labResult.metrics}</p>
            <p className="text-slate-600 dark:text-slate-400">{labResult.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};
