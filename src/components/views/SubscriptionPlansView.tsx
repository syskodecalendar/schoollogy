import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  CheckCircle2,
  Zap,
  Sparkles,
  Building2,
  ShieldCheck,
  TrendingUp,
  Download,
  AlertCircle,
  HelpCircle,
  Clock,
  Check,
  ArrowRight
} from 'lucide-react';

export const SubscriptionPlansView: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');
  const [activePlanId, setActivePlanId] = useState<string>('professional');
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Standard Nursery & ECE Plan',
      nameAr: 'خطة الروضة المبكرة الموحدة',
      target: 'Single branch early childhood centers & nurseries',
      targetAr: 'للروضات والحضانات المنفردة والتعليم المبكر',
      priceMonthly: 250,
      priceAnnual: 200,
      badge: 'Starter',
      badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
      features: [
        '1 Active Nursery / School Branch',
        'Up to 5 Classrooms & 100 Children',
        'Digital Child Twin Basic Profiles',
        'Attendance & Daily Activity Tracking',
        'Teacher AI Assistant & Lesson Planner',
        'Standard Parent Mobile App Access',
        'Basic Developmental Milestones Tracking',
        'Standard Email & In-App Support'
      ],
      featuresAr: [
        'فرع تعليمي واحد موحد',
        'حتى 5 فصول و100 طفل',
        'الملف الرقمي الأساسي للطفل',
        'تتبع الحضور والأنشطة اليومية',
        'مساعد المعلمة الذكي ومخطط الدروس',
        'تطبيق أولياء الأمور القياسي',
        'تتبع المؤشرات التنموية الأساسية',
        'الدعم عبر البريد الإلكتروني والنظام'
      ],
      recommended: false
    },
    {
      id: 'professional',
      name: 'Multidisciplinary Therapy & Special Ed Plan',
      nameAr: 'خطة المراكز العلاجية والتربية الخاصة الشاملة',
      target: 'Therapy centers, special education networks & multi-branch ECE',
      targetAr: 'لمراكز التأهيل والعلاج المتعدد والتوسع المتوسط',
      priceMonthly: 550,
      priceAnnual: 440,
      badge: 'Most Popular',
      badgeColor: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
      features: [
        'Up to 5 Network Branches included',
        'Up to 25 Classrooms & 500 Children',
        'AI Speech Articulation & Acoustic Voice Analysis',
        'Computer Vision Motor Dexterity & Posture Lab',
        'ABC Behaviour Analytics & Autism Screening AI',
        'Automated Individualised Education Plan (IEP) Builder',
        'Parent Home Rehabilitation Program Sync',
        'Multidisciplinary Team Case Conferences & Notes',
        '2,000 Monthly AI Assessment Credits'
      ],
      featuresAr: [
        'يشمل حتى 5 فروع في الشبكة',
        'حتى 25 فصل و500 طفل',
        'تحليل النطق والصوت بالذكاء الاصطناعي',
        'تحليل الحركة والاتزان برؤية الحاسوب',
        'محلل السلوك التطبيقي (ABC) واضطراب النمذجة',
        'منشئ خطط التربية الفردية (IEP) الآلي',
        'مزامنة البرامج المنزلية مع الوالدين',
        'اجتماعات وتدوينات الفريق المتقاطع',
        '2,000 رصيد شهري لتقييمات الذكاء الاصطناعي'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Ministry & Multi-Branch Network Plan',
      nameAr: 'خطة الشبكات الكبرى والمؤسسات الحكومية',
      target: 'Large enterprise chains, ministry groups & regional centers',
      targetAr: 'للشبكات الإقليمية الكبرى والمؤسسات والجهات التوجيهية',
      priceMonthly: 1200,
      priceAnnual: 960,
      badge: 'Enterprise White-Label',
      badgeColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
      features: [
        'Unlimited Branches, Classrooms & Children',
        'Full Enterprise White-Labeling (Custom Domain & App Branding)',
        'Custom Fine-Tuned Clinical & Curriculum AI Models',
        'Cross-Branch Executive BI & Predictive Risk Analytics',
        'Dedicated Clinical & Technical Account Manager',
        '99.99% Uptime SLA & Priority 24/7 Phone Support',
        'Custom Firebase & Cloud SQL Database Mirroring',
        'Unlimited AI Assessment Credits'
      ],
      featuresAr: [
        'عدد غير محدود من الفروع والفصول والأطفال',
        'تخصيص كامل للنظام والهوية (White-Label)',
        'تدريب نماذج الذكاء الاصطناعي على المناهج الخاصة',
        'لوحات ذكاء الأعمال التنبؤية عبر جميع الفروع',
        'مدير حساب إكلينيكي وتقني مخصص',
        'اتفاقية مستوى الخدمة 99.99% ودعم 24/7',
        'ربط خوادم ومزامنة قواعد البيانات المباشرة',
        'رصيد غير محدود لتقييمات الذكاء الاصطناعي'
      ],
      recommended: false
    }
  ];

  const billingHistory = [
    { id: 'INV-2026-007', date: '2026-07-01', amount: '440.00 BHD', plan: 'Multidisciplinary Therapy Plan (Annual)', status: 'Paid', receipt: 'PDF' },
    { id: 'INV-2025-007', date: '2025-07-01', amount: '440.00 BHD', plan: 'Multidisciplinary Therapy Plan (Annual)', status: 'Paid', receipt: 'PDF' },
    { id: 'INV-2024-007', date: '2024-07-01', amount: '200.00 BHD', plan: 'Standard Nursery Plan (Annual)', status: 'Paid', receipt: 'PDF' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300">
              <CreditCard className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {isAr ? 'خطط الاشتراكات والتراخيص' : 'Subscription & Licensing Tiers'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'إدارة خطة ترخيص المؤسسة، السعة الاستيعابية للفروع، ورصيد نماذج الذكاء الاصطناعي'
              : 'Manage SaaS subscription tier, multi-branch scaling, add-on modules and billing history'}
          </p>
        </div>

        {/* Current Plan Badge Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">
              {isAr ? 'الخطة الحالية المفعّلة' : 'Active Subscription'}
            </div>
            <div className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>{isAr ? 'الخطة العلاجية والتربية الخاصة (المتقدمة)' : 'Multidisciplinary Therapy Tier'}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500 text-white font-bold">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly / Annually Toggle */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="bg-slate-200/80 dark:bg-slate-800 p-1 rounded-2xl inline-flex items-center gap-1 border border-slate-300/60 dark:border-slate-700">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isAr ? 'فاتورة شهرياً' : 'Monthly Billing'}
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              billingCycle === 'annually'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{isAr ? 'فاتورة سنوياً' : 'Annual Billing'}</span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider">
              {isAr ? 'خصم 20%' : 'Save 20%'}
            </span>
          </button>
        </div>
        <p className="text-[11px] text-slate-500 font-medium">
          {isAr
            ? 'جميع الخطط تشمل تحديثات النظام المستمرة، الأمان العالي، والدعم الفني المباشر'
            : 'All plans include continuous AI model updates, HIPAA/GDPR data compliance and direct support'}
        </p>
      </div>

      {/* 3 Subscription Tiers Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map(plan => {
          const isCurrentPlan = activePlanId === plan.id;
          const displayPrice = billingCycle === 'annually' ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-slate-900 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between border ${
                plan.recommended
                  ? 'border-purple-500 dark:border-purple-500 shadow-xl ring-2 ring-purple-500/20'
                  : 'border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{isAr ? 'الخطة الأكثر اختياراً للمراكز' : 'Recommended for Clinical Networks'}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                  {isCurrentPlan && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
                      {isAr ? 'خيارك الحالي' : 'Current Plan'}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {isAr ? plan.nameAr : plan.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                  {isAr ? plan.targetAr : plan.target}
                </p>

                {/* Price Display */}
                <div className="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                      {displayPrice}
                    </span>
                    <span className="text-xs font-bold text-slate-500">BHD</span>
                    <span className="text-xs text-slate-400">/ {isAr ? 'شهر' : 'month'}</span>
                  </div>
                  {billingCycle === 'annually' && (
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                      {isAr ? `تُدفع سنوياً (${displayPrice * 12} BHD / سنة)` : `Billed annually (${displayPrice * 12} BHD/year)`}
                    </div>
                  )}
                </div>

                {/* Features Checklist */}
                <div className="space-y-2.5 mb-6 text-xs">
                  <div className="font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-wider">
                    {isAr ? 'المميزات والقدرات المشمولة:' : 'Included Capabilities:'}
                  </div>
                  {(isAr ? plan.featuresAr : plan.features).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-tight font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => {
                    setActivePlanId(plan.id);
                    setSelectedPlanModal(plan.name);
                  }}
                  className={`w-full py-3 rounded-2xl font-extrabold text-xs transition-all shadow-xs flex items-center justify-center gap-2 ${
                    isCurrentPlan
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-default border border-slate-200 dark:border-slate-700'
                      : plan.recommended
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20 shadow-lg'
                      : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
                  }`}
                >
                  <span>
                    {isCurrentPlan
                      ? isAr
                        ? 'مفعل حالياً'
                        : 'Active Plan'
                      : isAr
                      ? `الانتقال إلى ${plan.nameAr}`
                      : `Upgrade to ${plan.name.split(' ')[0]} Tier`}
                  </span>
                  {!isCurrentPlan && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Usage & Credits Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>{isAr ? 'استهلاك تقييمات الذكاء الاصطناعي' : 'AI Assessment Credits'}</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">1,420 / 2,000</div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: '71%' }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            {isAr ? 'يتجدد الرصيد في 1 أغسطس 2026' : 'Credits renew on 1st August 2026'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>{isAr ? 'الفروع المرخصة في الشبكة' : 'Licensed Network Branches'}</span>
            <Building2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">3 / 5 {isAr ? 'فروع' : 'Branches'}</div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '60%' }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            {isAr ? 'يمكنك إضافة فرعين إضافيين مجاناً' : 'You can add 2 more branches under this tier'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>{isAr ? 'الامتثال وأمان البيانات' : 'Compliance & Data Protection'}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">HIPAA & GDPR</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {isAr ? 'بيانات الأطفال والأخصائيين مشفرة بالكامل' : 'AES-256 encrypted child digital twin records'}
          </p>
          <p className="text-[10px] text-slate-400 mt-2">
            {isAr ? 'خوادم مخصصة في منطقة الشرق الأوسط' : 'Local cloud deployment in Middle East region'}
          </p>
        </div>
      </div>

      {/* Billing & Invoice History Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>{isAr ? 'سجل الفواتير والاشتراكات السابقة' : 'Billing & Invoice History'}</span>
          </h3>
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 cursor-pointer hover:underline">
            {isAr ? 'تحديث وسيلة الدفع' : 'Update Payment Method'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">{isAr ? 'رقم الفاتورة' : 'Invoice ID'}</th>
                <th className="py-3 px-4">{isAr ? 'التاريخ' : 'Date'}</th>
                <th className="py-3 px-4">{isAr ? 'الخطة والترخيص' : 'Plan / Description'}</th>
                <th className="py-3 px-4">{isAr ? 'المبلغ' : 'Amount'}</th>
                <th className="py-3 px-4">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="py-3 px-4 text-right">{isAr ? 'الإيصال' : 'Download'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {billingHistory.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">{inv.id}</td>
                  <td className="py-3.5 px-4 text-slate-500">{inv.date}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200">{inv.plan}</td>
                  <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">{inv.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Notification Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-scaleUp">
            <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {isAr ? 'تم تحديث خطة الاشتراك بنجاح' : 'Subscription Tier Updated'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isAr
                  ? `لقد قمت باختيار: ${selectedPlanModal}. تم تفعيل الصلاحيات والقدرات فوراً لجميع فروع مؤسستك.`
                  : `You have successfully switched to: ${selectedPlanModal}. All tier features and AI capacities are now live across your network.`}
              </p>
            </div>
            <button
              onClick={() => setSelectedPlanModal(null)}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
            >
              {isAr ? 'حسناً، إغلاق' : 'Awesome, Continue'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
