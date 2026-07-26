import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Shield,
  Briefcase,
  Building2,
  GitBranch,
  GraduationCap,
  Mic,
  Activity,
  Brain,
  Smile,
  Search,
  DollarSign,
  Target,
  Megaphone,
  Heart,
  Sparkles,
  ArrowRight,
  Globe,
  Sun,
  Moon,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface RoleOption {
  role: UserRole;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  icon: any;
  badge: string;
  badgeColor: string;
}

const DEMO_ROLES: RoleOption[] = [
  {
    role: 'Super Admin',
    title: 'Super Admin',
    titleAr: 'مدير النظام الفائق',
    category: 'System',
    categoryAr: 'النظام',
    description: 'Full white-label, multi-tenant & system configuration access.',
    descriptionAr: 'وصول كامل لإدارة العلامة التجارية والاشتراكات وإعدادات النظام.',
    icon: Shield,
    badge: 'Level 0',
    badgeColor: 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900/50'
  },
  {
    role: 'Executive Management',
    title: 'Executive Management',
    titleAr: 'الإدارة التنفيذية',
    category: 'Executive',
    categoryAr: 'التنفيذي',
    description: 'Enterprise network KPIs, predictive analytics & multi-branch oversight.',
    descriptionAr: 'مؤشرات الأداء الشبكية والتحليلات التنبؤية ومراقبة الفروع.',
    icon: Briefcase,
    badge: 'Level 1',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:border-indigo-900/50'
  },
  {
    role: 'Regional Manager',
    title: 'Regional Manager',
    titleAr: 'المدير الإقليمي',
    category: 'Management',
    categoryAr: 'الإدارة',
    description: 'Regional branch benchmarking, admissions & staffing optimization.',
    descriptionAr: 'مقارنة أداء فروع المنطقة وتحسين التسجيل والكوادر.',
    icon: GitBranch,
    badge: 'Level 2',
    badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900/50'
  },
  {
    role: 'Branch Manager',
    title: 'Branch Manager',
    titleAr: 'مدير الفرع',
    category: 'Operations',
    categoryAr: 'العمليات',
    description: 'Campus daily operations, classroom schedules & local compliance.',
    descriptionAr: 'العمليات اليومية للفرع وجداول الفصول والامتثال.',
    icon: Building2,
    badge: 'Branch',
    badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-200 dark:border-teal-900/50'
  },
  {
    role: 'Teacher',
    title: 'Teacher',
    titleAr: 'معلمة الفصل',
    category: 'Classroom',
    categoryAr: 'الفصل',
    description: 'Classroom attendance, AI curriculum generator & digital twin updates.',
    descriptionAr: 'تحضير الفصل ومولد المناهج بالذكاء الاصطناعي وتوثيق التوأم الرقمي.',
    icon: GraduationCap,
    badge: 'Classroom',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900/50'
  },
  {
    role: 'Speech Therapist',
    title: 'Speech Therapist',
    titleAr: 'أخصائي نطق وتخاطب',
    category: 'Clinical',
    categoryAr: 'السريري',
    description: 'Acoustic voice analysis, articulation screening & clinical therapy plans.',
    descriptionAr: 'تحليل الصوت الرقمي وتقييم النطق والخطط العلاجية.',
    icon: Mic,
    badge: 'Clinical',
    badgeColor: 'bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-900/50'
  },
  {
    role: 'Occupational Therapist',
    title: 'Occupational Therapist',
    titleAr: 'أخصائي علاج وظيفي',
    category: 'Clinical',
    categoryAr: 'السريري',
    description: 'Fine motor drawing analysis, sensory integration & movement tracking.',
    descriptionAr: 'تحليل الرسم والمهارات الحركية والتكامل الحسي.',
    icon: Activity,
    badge: 'Clinical',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900/50'
  },
  {
    role: 'ABA Therapist',
    title: 'ABA Therapist',
    titleAr: 'أخصائي تحليل سلوك (ABA)',
    category: 'Clinical',
    categoryAr: 'السريري',
    description: 'ABC behaviour tracking, intervention plans & frequency analytics.',
    descriptionAr: 'تتبع السلوكيات وخطط التدخل وتحليلات التكرار.',
    icon: Brain,
    badge: 'Clinical',
    badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-900/50'
  },
  {
    role: 'Psychologist',
    title: 'Psychologist',
    titleAr: 'أخصائي نفسي',
    category: 'Clinical',
    categoryAr: 'السريري',
    description: 'Social-emotional assessments, mood tracking & wellbeing risk alerts.',
    descriptionAr: 'التقييمات النفسية والعاطفية وتتبع المزاج وتنبيهات المخاطر.',
    icon: Smile,
    badge: 'Clinical',
    badgeColor: 'bg-pink-500/10 text-pink-600 border-pink-200 dark:border-pink-900/50'
  },
  {
    role: 'Early Intervention Specialist',
    title: 'Early Intervention Specialist',
    titleAr: 'أخصائي التدخل المبكر',
    category: 'Clinical',
    categoryAr: 'السريري',
    description: 'Early risk detection, multidisciplinary reviews & developmental milestones.',
    descriptionAr: 'الكشف المبكر عن المخاطر والمراجعات متعددة التخصصات.',
    icon: Search,
    badge: 'Intervention',
    badgeColor: 'bg-violet-500/10 text-violet-600 border-violet-200 dark:border-violet-900/50'
  },
  {
    role: 'Finance Officer',
    title: 'Finance Officer',
    titleAr: 'المسؤول المالي',
    category: 'Finance',
    categoryAr: 'المالية',
    description: 'Tuition invoicing, BenefitPay/Credit payments & revenue collection.',
    descriptionAr: 'فواتير التحصيل ودفعات بنفت بيل والتقرير المالي.',
    icon: DollarSign,
    badge: 'Finance',
    badgeColor: 'bg-green-500/10 text-green-600 border-green-200 dark:border-green-900/50'
  },
  {
    role: 'Sales Manager',
    title: 'Sales Manager',
    titleAr: 'مدير مبيعات التسجيل',
    category: 'Growth',
    categoryAr: 'النمو',
    description: 'Nursery tours, lead conversion pipelines & admissions forecasting.',
    descriptionAr: 'الجولات الميدانية ومسار العملاء وتوقعات التسجيل.',
    icon: Target,
    badge: 'Sales',
    badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-900/50'
  },
  {
    role: 'Marketing Manager',
    title: 'Marketing Manager',
    titleAr: 'مدير التسويق',
    category: 'Growth',
    categoryAr: 'النمو',
    description: 'Ad campaigns, cost-per-lead tracking & social media performance.',
    descriptionAr: 'الحملات الإعلانية وتكلفة الاستقطاب وأداء المنصات.',
    icon: Megaphone,
    badge: 'Marketing',
    badgeColor: 'bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-900/50'
  },
  {
    role: 'Parent',
    title: 'Parent Portal',
    titleAr: 'بوابة ولي الأمر',
    category: 'Portal',
    categoryAr: 'البوابة',
    description: 'Linked to Sara Ahmed (Juffair Centre) - Live updates, therapy & AI copilot.',
    descriptionAr: 'مرتبط بسارة أحمد - متابعة فورية، تقدم العلاج والمساعد الذكي.',
    icon: Heart,
    badge: 'Family',
    badgeColor: 'bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-200 dark:border-fuchsia-900/50'
  }
];

export const LoginPage: React.FC = () => {
  const { login, language, setLanguage, themeMode, toggleThemeMode, whiteLabelConfig } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('Executive Management');
  const [email, setEmail] = useState('demo.executive@schoollogy.ai');
  const [password, setPassword] = useState('••••••••••••');

  const isAr = language === 'ar';

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const demoRole = DEMO_ROLES.find(r => r.role === role);
    if (demoRole) {
      setEmail(`${role.toLowerCase().replace(/\s+/g, '.')}@schoollogy.ai`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 md:p-8 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Header Controls */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
              {whiteLabelConfig.platformName}
              <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                Enterprise AI
              </span>
            </span>
            <p className="text-xs text-slate-400 hidden sm:block">
              {isAr ? whiteLabelConfig.platformNameAr : whiteLabelConfig.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>
          <button
            onClick={toggleThemeMode}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Toggle theme"
          >
            {themeMode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Role Selector Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{isAr ? 'عرض محاكي الأدوار الـ 14' : 'Interactive 14-Role Demo Experience'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {isAr ? 'اختر الدور الوظيفي لمعاينة المنصة' : 'Select a Demo Persona to Explore the Platform'}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              {isAr
                ? 'تتيح لك منصة سكولوجي الذكية التنقل السلس بين 14 دوراً قيادياً وتربوياً وعلاجياً وأسرياً. يتم تخصيص القوائم واللوحات والبيانات فور اختيارك للدور.'
                : 'Schoology AI provides tailored UI navigation, role-governed workflows, and filtered clinical data for 14 operational personas. Click any role below to launch.'}
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {DEMO_ROLES.map(item => {
              const IconComp = item.icon;
              const isSelected = selectedRole === item.role;
              return (
                <div
                  key={item.role}
                  onClick={() => handleRoleSelect(item.role)}
                  className={`group relative p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-b from-blue-950/80 to-slate-900 border-blue-500/80 shadow-lg shadow-blue-500/10'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-white'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                          {isAr ? item.titleAr : item.title}
                        </h3>
                        <span className="text-[10px] text-slate-400 block">{isAr ? item.categoryAr : item.category}</span>
                      </div>
                    </div>

                    <span className={`px-1.5 py-0.5 text-[9px] font-semibold rounded border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-normal mb-3">
                    {isAr ? item.descriptionAr : item.description}
                  </p>

                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      login(item.role);
                    }}
                    className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition ${
                      isSelected
                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 group-hover:text-white'
                    }`}
                  >
                    <span>{isAr ? `دخول بصفة ${item.titleAr}` : `Launch as ${item.title}`}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Credentials Panel */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 sticky top-8">
          <div className="space-y-1.5 border-b border-slate-800/80 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                {isAr ? 'بيانات الاعتماد التوضيحية' : 'Demo Authentication'}
              </span>
              <Lock className="w-4 h-4 text-slate-500" />
            </div>
            <h2 className="text-lg font-bold text-white">
              {isAr ? 'تسجيل الدخول الفوري' : 'Sign In with Selected Persona'}
            </h2>
            <p className="text-xs text-slate-400">
              {isAr ? 'تم تجهيز البريد للبيئة التوضيحية' : 'Pre-configured single-click demo login.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {isAr ? 'الدور المحدد' : 'Active Demo Persona'}
              </label>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-white">{selectedRole}</span>
                </div>
                <span className="text-[10px] text-blue-300 px-2 py-0.5 rounded bg-blue-500/20 font-medium">Ready</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {isAr ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {isAr ? 'كلمة المرور' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>{isAr ? 'تسجيل الدخول للوحة التحكم' : `Enter Workspace as ${selectedRole}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Clinical Disclaimer Box */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-[11px] leading-relaxed space-y-1">
            <div className="font-semibold text-amber-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'إخلاء مسؤولية سريري' : 'Clinical Decision Support'}</span>
            </div>
            <p>
              {isAr
                ? 'رؤى الذكاء الاصطناعي هي أدوات مساعدة للتفكير الإكلينيكي والتربوي. تخضع المخرجات دائماً للمراجعة والاعتماد النهائي من أخصائي مؤهل.'
                : 'AI-generated insights provide decision-support support. Final review and approval by a qualified professional is required.'}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 Schoology AI. Enterprise White-Label MVP Version 3.4</p>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Firestore & Security Rules Ready</span>
          <span>•</span>
          <span>Clinical Decision Guardrails Active</span>
        </div>
      </footer>
    </div>
  );
};
