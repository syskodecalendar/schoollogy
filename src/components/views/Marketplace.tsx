import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Sparkles, Check, ArrowRight } from 'lucide-react';

export const Marketplace: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  const modules = [
    { title: 'Computer Vision Posture AI', price: '$299/mo', desc: 'Real-time skeleton posture & motor dexterity tracking module.' },
    { title: 'Bilingual Speech Synthesizer', price: '$199/mo', desc: 'Advanced acoustic Arabic/English speech articulation analysis.' },
    { title: 'ABC Behaviour Analytics Engine', price: '$149/mo', desc: 'Antecedent trigger pattern recognition & autism screening support.' },
    { title: 'Parent Mobile App White-Label', price: '$399/mo', desc: 'Custom iOS/Android parent app with white-label branding.' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>{isAr ? 'متجر وحدات وتطبيقات الذكاء الاصطناعي' : 'AI Modules & Add-Ons Marketplace'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isAr
            ? 'تفعيل وتخصيص نماذج الذكاء الاصطناعي المتخصصة لشبكتك التعليمية'
            : 'Extend platform capabilities with specialized clinical & computer vision add-ons'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((m, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Verified Module</span>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mt-2">{m.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{m.desc}</p>
            </div>

            <div>
              <span className="text-lg font-black text-slate-900 dark:text-slate-100 block mb-2">{m.price}</span>
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors">
                {isAr ? 'تفعيل النموذج' : 'Enable Add-on'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
