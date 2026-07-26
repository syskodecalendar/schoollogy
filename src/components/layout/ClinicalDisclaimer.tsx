import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Info } from 'lucide-react';

interface ClinicalDisclaimerProps {
  compact?: boolean;
}

export const ClinicalDisclaimer: React.FC<ClinicalDisclaimerProps> = ({ compact = false }) => {
  const { language } = useApp();
  const isAr = language === 'ar';

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 rounded-lg text-xs text-amber-800 dark:text-amber-300 font-medium">
        <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <span>
          {isAr
            ? 'رأي استشاري داعم للقرار صادر عن الذكاء الاصطناعي. يتطلب المراجعة والاعتماد النهائي من ممارس مؤهل.'
            : 'AI-generated decision-support insight. Final review and approval by a qualified professional is required.'}
        </span>
      </div>
    );
  }

  return (
    <div className="p-3.5 bg-amber-50/90 dark:bg-amber-950/50 border-l-4 border-amber-500 rounded-r-xl border border-amber-200/80 dark:border-amber-900/40 my-3 shadow-xs flex items-start gap-3">
      <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
        <span className="font-bold block mb-0.5 text-amber-950 dark:text-amber-100">
          {isAr ? 'إشعار الحوكمة الطبية والتطويرية:' : 'Clinical Governance & Decision-Support Notice:'}
        </span>
        {isAr
          ? 'جميع التوصيات والتقييمات هي رأي استشاري داعم للقرار صادر عن الذكاء الاصطناعي. يتطلب المراجعة والاعتماد النهائي من ممارس مؤهل قبل الاعتماد التشخيصي أو العلاجي.'
          : 'AI-generated decision-support insight. Final review and approval by a qualified professional is required.'}
      </div>
    </div>
  );
};
