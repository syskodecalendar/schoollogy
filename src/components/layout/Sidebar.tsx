import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ROLE_MENU_MAP } from '../../data/rolePermissions';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  UserCheck,
  Building2,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { language, activeSection, setActiveSection, currentRole, whiteLabelConfig } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isAr = language === 'ar';

  const menuItems = ROLE_MENU_MAP[currentRole] || [];

  // Group items by category
  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  return (
    <aside
      className={`bg-[#102A43] text-slate-100 flex flex-col h-screen sticky top-0 transition-all duration-300 z-40 border-r border-slate-800 shadow-xl shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-800">
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-white text-base shadow-md shrink-0 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="truncate">
              <h1 className="font-extrabold text-sm text-white tracking-wide truncate">
                {isAr ? whiteLabelConfig.platformNameAr || 'سكولوجي الذكي' : whiteLabelConfig.platformName || 'Schoollogy AI'}
              </h1>
              <p className="text-[10px] text-teal-400 font-medium truncate">
                {currentRole}
              </p>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white text-lg mx-auto shadow-md bg-blue-600">
            <Sparkles className="w-5 h-5" />
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          ) : (
            isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation List Grouped by Category */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-3 custom-scrollbar">
        {categories.map(cat => {
          const catItems = menuItems.filter(i => i.category === cat);
          const firstItem = catItems[0];
          const catNameAr = firstItem?.categoryAr || cat;
          return (
            <div key={cat} className="space-y-0.5">
              {!isCollapsed && (
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-3 pt-2 pb-1">
                  {isAr ? catNameAr : cat}
                </div>
              )}
              {catItems.map(item => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all relative group ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                    title={isCollapsed ? (isAr ? item.labelAr : item.label) : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="truncate flex-1 text-left rtl:text-right text-xs">
                        {isAr ? item.labelAr : item.label}
                      </span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          item.badgeColor || 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {isCollapsed && item.badge && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-400" />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Info */}
      {!isCollapsed && (
        <div className="p-3 m-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center justify-between font-medium text-slate-300 mb-1">
            <span className="text-blue-400 font-semibold truncate">{currentRole}</span>
            <span className="text-teal-400 font-mono font-bold text-[10px]">Active</span>
          </div>
          <p className="text-[10px] leading-tight text-slate-500">
            {isAr ? 'قواعد الأمان مفعلة لمستوى الدور' : 'Role Governance & Data Rules Active'}
          </p>
        </div>
      )}
    </aside>
  );
};
