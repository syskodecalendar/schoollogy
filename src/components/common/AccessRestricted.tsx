import React from 'react';
import { useApp } from '../../context/AppContext';
import { getDefaultSectionForRole } from '../../data/rolePermissions';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';

interface AccessRestrictedProps {
  requestedSection?: string;
}

export const AccessRestricted: React.FC<AccessRestrictedProps> = ({ requestedSection }) => {
  const { currentRole, setActiveSection, language } = useApp();
  const isAr = language === 'ar';

  const defaultSection = getDefaultSectionForRole(currentRole);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto border border-red-200 dark:border-red-900/50">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Lock className="w-3 h-3 text-amber-500" />
            <span>
              {isAr ? `الدور الحالي: ${currentRole}` : `Logged-in Role: ${currentRole}`}
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {isAr ? 'الوصول محظور لهذا القسم' : 'Access Restricted'}
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {isAr
              ? `عفواً، حسابك بصفتك (${currentRole}) لا يمتلك الصلاحيات الكافية لعرض القسم المطلوب (${requestedSection || 'المحدد'}). تم تطبيق قواعد الأمان الصارمة لحماية بيانات المنظومة.`
              : `Your account (${currentRole}) does not have permission to access the requested module (${requestedSection || 'selected'}). Role-based access governance is active.`}
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setActiveSection(defaultSection)}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition"
          >
            <Home className="w-4 h-4" />
            <span>
              {isAr ? 'العودة للوحة التحكم المصرح بها' : 'Return to My Authorized Dashboard'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
