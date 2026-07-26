import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockBranches, mockUsers } from '../../data/mockData';
import { UserRole } from '../../types';
import {
  Search,
  Building2,
  Calendar,
  Globe,
  Sparkles,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  UserCheck,
  Shield,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    themeMode,
    toggleThemeMode,
    currentRole,
    setCurrentRole,
    currentUser,
    currentBranchId,
    setCurrentBranchId,
    academicYear,
    setAcademicYear,
    searchQuery,
    setSearchQuery,
    whiteLabelConfig,
    setIsAIAssistantOpen,
    notificationCount,
    recommendationsList,
    setActiveSection,
    logout
  } = useApp();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const isAr = language === 'ar';

  const rolesList: UserRole[] = [
    'Super Admin',
    'Executive Management',
    'Regional Manager',
    'Branch Manager',
    'Teacher',
    'Speech Therapist',
    'Occupational Therapist',
    'ABA Therapist',
    'Psychologist',
    'Early Intervention Specialist',
    'Finance Officer',
    'Sales Manager',
    'Marketing Manager',
    'Parent'
  ];

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-30 transition-colors shadow-xs">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isAr ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'البحث عن طفل، فرع، تقييم، توصية...' : 'Global search children, branch, assessment...'}
              className={`w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                isAr ? 'pr-9 pl-8' : 'pl-9 pr-8'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 ${isAr ? 'left-2.5' : 'right-2.5'}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action Controls Group */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Branch Selector */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200">
            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <select
              value={currentBranchId}
              onChange={(e) => setCurrentBranchId(e.target.value)}
              className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
            >
              {mockBranches.map(b => (
                <option key={b.id} value={b.id} className="dark:bg-slate-900">
                  {isAr ? b.nameAr : b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200">
            <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="2026-2027" className="dark:bg-slate-900">2026 - 2027</option>
              <option value="2025-2026" className="dark:bg-slate-900">2025 - 2026</option>
            </select>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
            title="Switch Language (English / Arabic)"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{language === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* AI Assistant Launcher Button */}
          <button
            onClick={() => setIsAIAssistantOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 text-white font-semibold text-xs shadow-sm hover:shadow-md hover:scale-[1.02] transition-all ai-glow"
            title="Ask Schoology AI"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline font-bold">
              {isAr ? whiteLabelConfig.assistantName || 'مساعد الذكاء الاصطناعي' : whiteLabelConfig.assistantName || 'Ask Schoology AI'}
            </span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleThemeMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
            title={themeMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {themeMode === 'light' ? <Moon className="w-4 h-4 text-slate-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors relative border border-slate-200 dark:border-slate-700"
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {notificationCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className={`absolute top-full mt-2 ${isAr ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 text-xs`}>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-800 dark:text-slate-100">
                  <span>{isAr ? 'الإشعارات والتنبيهات' : 'Notifications & Alerts'}</span>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full text-[10px]">
                    {notificationCount} {isAr ? 'جديد' : 'New'}
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {recommendationsList.slice(0, 3).map(rec => (
                    <div
                      key={rec.id}
                      onClick={() => { setActiveSection('recommendations'); setIsNotifOpen(false); }}
                      className="p-2 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/50 dark:hover:bg-blue-900/30 rounded-xl cursor-pointer border border-slate-100 dark:border-slate-700/50 transition-colors"
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                        <span>{rec.childName}</span>
                        <span className="text-amber-600 font-bold">{rec.priority}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {isAr ? rec.titleAr : rec.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover ring-2 ring-blue-500/30"
              />
              <div className="hidden sm:block text-left text-xs">
                <p className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  {isAr ? currentUser.nameAr : currentUser.name}
                </p>
                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                  {currentRole}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Role Switcher Drawer */}
            {isRoleMenuOpen && (
              <div className={`absolute top-full mt-2 ${isAr ? 'left-0' : 'right-0'} w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 text-xs`}>
                <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-800 dark:text-slate-100">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>{isAr ? 'تبديل دور العرض المباشر (12 أدوار)' : 'Switch Demo Role (12 Roles)'}</span>
                </div>
                <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                  {rolesList.map(role => {
                    const isSelected = currentRole === role;
                    return (
                      <button
                        key={role}
                        onClick={() => {
                          setCurrentRole(role);
                          setIsRoleMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-all flex items-center justify-between text-[11px] ${
                          isSelected
                            ? 'bg-blue-600 text-white font-bold shadow-xs'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{role}</span>
                        {isSelected && <Shield className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setIsRoleMenuOpen(false);
                      logout();
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold text-[11px] transition flex items-center justify-center gap-1.5"
                  >
                    <span>{isAr ? 'تسجيل الخروج والعودة لصفحة الدخول' : 'Sign Out / Change Persona'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
