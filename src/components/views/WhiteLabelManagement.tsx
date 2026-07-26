import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Palette, Globe, Layers, ShieldCheck, Check } from 'lucide-react';

export const WhiteLabelManagement: React.FC = () => {
  const { language, activeOrganization, updateBranding } = useApp();
  const [orgName, setOrgName] = useState(activeOrganization.name);
  const [primaryColor, setPrimaryColor] = useState(activeOrganization.branding.primaryColor);
  const [subdomain, setSubdomain] = useState(activeOrganization.branding.subdomain);
  const [isSaved, setIsSaved] = useState(false);

  const isAr = language === 'ar';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding(primaryColor, activeOrganization.branding.secondaryColor);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>{isAr ? 'إدارة الهوية والاسم التجاري الخاص (White-Label)' : 'Multi-Tenant & White-Label Management'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isAr
            ? 'تخصيص ألوان العلامة التجارية، النطاق الفرعي، والشعار لشبكة الروضات والمراكز العلاجية'
            : 'Customise enterprise branding colors, custom subdomain, logo & branch permissions'}
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Organization Enterprise Name:</label>
            <input
              type="text"
              value={orgName}
              onChange={e => setOrgName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Custom SaaS Subdomain:</label>
            <div className="flex items-center">
              <input
                type="text"
                value={subdomain}
                onChange={e => setSubdomain(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-l-xl p-2.5 font-bold"
              />
              <span className="bg-slate-200 dark:bg-slate-700 px-3 py-2.5 rounded-r-xl font-bold text-slate-600 dark:text-slate-300">.schoollogy.ai</span>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Primary Theme Color:</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={primaryColor}
                onChange={e => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer"
              />
              <span className="font-bold text-slate-800 dark:text-slate-200">{primaryColor}</span>
            </div>
          </div>
        </div>

        <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2">
          {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Palette className="w-4 h-4" />}
          <span>{isSaved ? 'Branding Saved & Applied!' : 'Save & Deploy White-Label Branding'}</span>
        </button>
      </form>
    </div>
  );
};
