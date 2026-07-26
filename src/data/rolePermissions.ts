import { UserRole } from '../types';
import {
  LayoutDashboard,
  Building2,
  GitBranch,
  Users,
  Palette,
  CreditCard,
  Sliders,
  Cpu,
  ShoppingBag,
  Share2,
  Shield,
  FileText,
  Activity,
  Settings,
  TrendingUp,
  BarChart3,
  Search,
  Brain,
  DollarSign,
  Target,
  Megaphone,
  UserCheck,
  Heart,
  AlertTriangle,
  FileSpreadsheet,
  GraduationCap,
  Calendar,
  Sparkles,
  User,
  Lightbulb,
  MessageSquare,
  BookOpen,
  Mic,
  Camera,
  Layers,
  Smile,
  ShieldAlert,
  Home,
  CheckCircle2,
  Clock,
  Compass,
  Briefcase,
  Package,
  Headphones,
  Mail,
  Bell,
  Eye,
  FileCheck,
  Volume2,
  Move
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  labelAr: string;
  icon: any;
  category: string;
  categoryAr: string;
  badge?: string;
  badgeColor?: string;
}

export const ROLE_MENU_MAP: Record<UserRole, MenuItem[]> = {
  'Super Admin': [
    { id: 'platform_overview', label: 'Platform Overview', labelAr: 'نظرة عامة على المنصة', icon: LayoutDashboard, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'organisations', label: 'Organisations', labelAr: 'المؤسسات والشبكات', icon: Building2, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'branches', label: 'Branches', labelAr: 'الفروع والفروع الفرعية', icon: GitBranch, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'users_roles', label: 'Users and Roles', labelAr: 'المستخدمون والأدوار', icon: Users, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'whitelabel', label: 'White-Label Management', labelAr: 'إدارة العلامة التجارية الخاصة', icon: Palette, category: 'System', categoryAr: 'النظام' },
    { id: 'subscriptions', label: 'Subscription Plans', labelAr: 'خطط الاشتراكات', icon: CreditCard, category: 'System', categoryAr: 'النظام' },
    { id: 'ai_config', label: 'AI Configuration', labelAr: 'إعدادات الذكاء الاصطناعي', icon: Sliders, category: 'Intelligence', categoryAr: 'الذكاء' },
    { id: 'ai_performance', label: 'AI Performance', labelAr: 'أداء الذكاء الاصطناعي', icon: Cpu, category: 'Intelligence', categoryAr: 'الذكاء' },
    { id: 'marketplace', label: 'Marketplace Management', labelAr: 'إدارة سوق الموارد', icon: ShoppingBag, category: 'Ecosystem', categoryAr: 'النظام البيئي' },
    { id: 'integrations', label: 'Integration Centre', labelAr: 'مركز التكامل والربط', icon: Share2, category: 'Ecosystem', categoryAr: 'النظام البيئي' },
    { id: 'security', label: 'Security Centre', labelAr: 'مركز الأمان والامتثال', icon: Shield, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'audit_logs', label: 'Audit Logs', labelAr: 'سجلات التدقيق والأمان', icon: FileText, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'system_health', label: 'System Health', labelAr: 'صحة وأداء النظام', icon: Activity, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'reports', label: 'Reports', labelAr: 'التقارير الشاملة', icon: BarChart3, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'settings', label: 'Settings', labelAr: 'الإعدادات العامة', icon: Settings, category: 'System', categoryAr: 'النظام' }
  ],

  'Executive Management': [
    { id: 'executive_dashboard', label: 'Executive Dashboard', labelAr: 'لوحة التحكم التنفيذية', icon: LayoutDashboard, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'org_performance', label: 'Organisation Performance', labelAr: 'أداء المؤسسة', icon: TrendingUp, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'regional_performance', label: 'Regional Performance', labelAr: 'الأداء الإقليمي', icon: GitBranch, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'branch_comparison', label: 'Branch Comparison', labelAr: 'مقارنة الفروع', icon: BarChart3, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'child_dev_analytics', label: 'Child Development Analytics', labelAr: 'تحليلات نمو الطفل', icon: Brain, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'predictive_intelligence', label: 'Predictive Intelligence', labelAr: 'الذكاء التنبؤي', icon: Sparkles, category: 'Clinical', categoryAr: 'السريري', badge: 'AI', badgeColor: 'bg-purple-100 text-purple-700' },
    { id: 'finance_overview', label: 'Finance Overview', labelAr: 'نظرة مالية عامة', icon: DollarSign, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'sales_performance', label: 'Sales Performance', labelAr: 'أداء المبيعات والتسجيل', icon: Target, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'marketing_performance', label: 'Marketing Performance', labelAr: 'أداء التسويق', icon: Megaphone, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'staff_analytics', label: 'Staff Analytics', labelAr: 'تحليلات الكادر التربوي', icon: UserCheck, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'parent_engagement', label: 'Parent Engagement', labelAr: 'مشاركة أولياء الأمور', icon: Heart, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'ai_performance', label: 'AI Performance', labelAr: 'مؤشرات أداء AI', icon: Cpu, category: 'Intelligence', categoryAr: 'الذكاء' },
    { id: 'reports', label: 'Executive Reports', labelAr: 'التقارير التنفيذية', icon: FileSpreadsheet, category: 'Analytics', categoryAr: 'التحليلات' }
  ],

  'Regional Manager': [
    { id: 'regional_dashboard', label: 'Regional Dashboard', labelAr: 'لوحة التحكم الإقليمية', icon: LayoutDashboard, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'branches', label: 'Branches', labelAr: 'الفروع في المنطقة', icon: GitBranch, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'branch_comparison', label: 'Branch Comparison', labelAr: 'مقارنة أداء الفروع', icon: BarChart3, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'children_overview', label: 'Children Overview', labelAr: 'نظرة عامة على الأطفال', icon: Users, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'staff_analytics', label: 'Staff Performance', labelAr: 'أداء الكادر والموظفين', icon: UserCheck, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'attendance_analytics', label: 'Attendance Analytics', labelAr: 'تحليلات الحضور والغياب', icon: Clock, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'child_dev_analytics', label: 'Development Analytics', labelAr: 'تحليلات التطور التنموي', icon: Brain, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'risk_alerts', label: 'Risk and Alerts', labelAr: 'التنبيهات والمخاطر', icon: AlertTriangle, category: 'Clinical', categoryAr: 'السريري', badge: 'Alerts', badgeColor: 'bg-red-100 text-red-700' },
    { id: 'finance_overview', label: 'Regional Finance', labelAr: 'المالية الإقليمية', icon: DollarSign, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'admissions_pipeline', label: 'Regional Admissions', labelAr: 'قبول وتراخيص المنطقة', icon: Target, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'predictive_intelligence', label: 'Predictive Intelligence', labelAr: 'الذكاء الاصطناعي التنبؤي', icon: Sparkles, category: 'Intelligence', categoryAr: 'الذكاء' },
    { id: 'reports', label: 'Reports', labelAr: 'التقارير الإقليمية', icon: FileSpreadsheet, category: 'Analytics', categoryAr: 'التحليلات' }
  ],

  'Branch Manager': [
    { id: 'branch_dashboard', label: 'Branch Dashboard', labelAr: 'لوحة تحكم الفرع', icon: LayoutDashboard, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'children', label: 'Children', labelAr: 'دليل الأطفال', icon: Users, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'admissions', label: 'Admissions', labelAr: 'الطلبات والتسجيل', icon: Target, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'classrooms', label: 'Classrooms', labelAr: 'الفصول الدراسية', icon: GraduationCap, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'teachers', label: 'Teachers', labelAr: 'المعلمات والكادر', icon: UserCheck, category: 'Staff', categoryAr: 'الكادر' },
    { id: 'therapists', label: 'Therapists', labelAr: 'الأخصائيون المعالجون', icon: Heart, category: 'Staff', categoryAr: 'الكادر' },
    { id: 'attendance', label: 'Attendance', labelAr: 'سجل الحضور اليومي', icon: Clock, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'daily_activities', label: 'Daily Activities', labelAr: 'الأنشطة اليومية', icon: Calendar, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'parent_messages', label: 'Parent Communication', labelAr: 'تواصل أولياء الأمور', icon: MessageSquare, category: 'Engagement', categoryAr: 'التواصل' },
    { id: 'assessments', label: 'Assessments', labelAr: 'التقييمات الشاملة', icon: Activity, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'therapy_plans', label: 'Therapy Plans', labelAr: 'خطط العلاج والتدخل', icon: Brain, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'branch_finance', label: 'Branch Finance', labelAr: 'مالية وحسابات الفرع', icon: DollarSign, category: 'Finance', categoryAr: 'المالية' },
    { id: 'staff_scheduling', label: 'Staff Scheduling', labelAr: 'جدولة نوبات الكادر', icon: Calendar, category: 'Staff', categoryAr: 'الكادر' },
    { id: 'inventory', label: 'Inventory', labelAr: 'المخزون والمستلزمات', icon: Package, category: 'Operations', categoryAr: 'العمليات' },
    { id: 'branch_analytics', label: 'Branch Analytics', labelAr: 'تحليلات أداء الفرع', icon: BarChart3, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'alerts_approvals', label: 'Alerts and Approvals', labelAr: 'التنبيهات والموافقات', icon: ShieldAlert, category: 'Management', categoryAr: 'الإدارة' },
    { id: 'reports', label: 'Reports', labelAr: 'تقارير الفرع', icon: FileSpreadsheet, category: 'Analytics', categoryAr: 'التحليلات' }
  ],

  'Teacher': [
    { id: 'teacher_dashboard', label: 'Teacher Dashboard', labelAr: 'لوحة المعلمة', icon: LayoutDashboard, category: 'Classroom', categoryAr: 'الفصل' },
    { id: 'my_classroom', label: 'My Classroom', labelAr: 'فصلي الدراسي', icon: GraduationCap, category: 'Classroom', categoryAr: 'الفصل' },
    { id: 'my_children', label: 'My Children', labelAr: 'أطفالي بالصف', icon: Users, category: 'Classroom', categoryAr: 'الفصل' },
    { id: 'attendance', label: 'Attendance', labelAr: 'تحضير الحضور', icon: Clock, category: 'Classroom', categoryAr: 'الفصل' },
    { id: 'daily_activities', label: 'Daily Activities', labelAr: 'أنشطة اليوم', icon: Calendar, category: 'Classroom', categoryAr: 'الفصل' },
    { id: 'observations', label: 'Observations', labelAr: 'الملاحظات السلوكية والتنموية', icon: Eye, category: 'Learning', categoryAr: 'التعلم' },
    { id: 'learning_analytics', label: 'Learning Analytics', labelAr: 'تحليلات نواتج التعلم', icon: TrendingUp, category: 'Learning', categoryAr: 'التعلم' },
    { id: 'lesson_plans', label: 'Lesson Plans', labelAr: 'خطط الدروس', icon: BookOpen, category: 'Curriculum', categoryAr: 'المنهج' },
    { id: 'ai_curriculum', label: 'AI Curriculum Generator', labelAr: 'مولد المناهج بالذكاء الاصطناعي', icon: Sparkles, category: 'Curriculum', categoryAr: 'المنهج', badge: 'AI', badgeColor: 'bg-blue-100 text-blue-700' },
    { id: 'child_digital_twin', label: 'Child Digital Twin', labelAr: 'التوأم الرقمي للطفل', icon: User, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'recommendations', label: 'Recommendations', labelAr: 'توصيات الذكاء الاصطناعي', icon: Lightbulb, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'parent_messages', label: 'Parent Messages', labelAr: 'رسائل أولياء الأمور', icon: MessageSquare, category: 'Communication', categoryAr: 'التواصل' },
    { id: 'calendar', label: 'Calendar', labelAr: 'الجدول والفعاليات', icon: Calendar, category: 'Classroom', categoryAr: 'الفصل' },
    { id: 'reports', label: 'Reports', labelAr: 'تقارير الطلاب', icon: FileSpreadsheet, category: 'Learning', categoryAr: 'التعلم' }
  ],

  'Speech Therapist': [
    { id: 'speech_therapy_dashboard', label: 'Therapy Dashboard', labelAr: 'لوحة العلاج النطقي', icon: LayoutDashboard, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'assigned_children', label: 'Assigned Children', labelAr: 'الأطفال الموكلون إليّ', icon: Users, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'child_digital_twin', label: 'Child Digital Twin', labelAr: 'التوأم الرقمي للطفل', icon: User, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'speech_assessments', label: 'Speech Assessments', labelAr: 'تقييمات النطق والتخاطب', icon: Mic, category: 'Assessments', categoryAr: 'التقييمات' },
    { id: 'voice_analysis', label: 'Voice Analysis', labelAr: 'تحليل الصوت بالكمبيوتر', icon: Volume2, category: 'Assessments', categoryAr: 'التقييمات', badge: 'AI', badgeColor: 'bg-purple-100 text-purple-700' },
    { id: 'therapy_plans', label: 'Therapy Plans', labelAr: 'الخطط العلاجية', icon: Brain, category: 'Therapy', categoryAr: 'العلاج' },
    { id: 'therapy_sessions', label: 'Therapy Sessions', labelAr: 'الجلسات العلاجية', icon: Clock, category: 'Therapy', categoryAr: 'العلاج' },
    { id: 'goals_progress', label: 'Goals and Progress', labelAr: 'الأهداف ومدى التقدم', icon: Target, category: 'Therapy', categoryAr: 'العلاج' },
    { id: 'ai_speech_therapist', label: 'AI Speech Therapist', labelAr: 'مساعد أخصائي النطق الذكي', icon: Sparkles, category: 'Intelligence', categoryAr: 'الذكاء' },
    { id: 'recommendations', label: 'Recommendations', labelAr: 'التوصيات الإكلينيكية', icon: Lightbulb, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'parent_home_programme', label: 'Parent Home Programme', labelAr: 'البرنامج المنزلي للوالدين', icon: Home, category: 'Home', categoryAr: 'المنزل' },
    { id: 'calendar', label: 'Calendar', labelAr: 'جدول الجلسات', icon: Calendar, category: 'Schedule', categoryAr: 'الجدول' },
    { id: 'clinical_reports', label: 'Clinical Reports', labelAr: 'التقارير السريرية', icon: FileText, category: 'Reports', categoryAr: 'التقارير' }
  ],

  'Occupational Therapist': [
    { id: 'ot_therapy_dashboard', label: 'Therapy Dashboard', labelAr: 'لوحة العلاج الوظيفي', icon: LayoutDashboard, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'assigned_children', label: 'Assigned Children', labelAr: 'الأطفال الموكلون إليّ', icon: Users, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'child_digital_twin', label: 'Child Digital Twin', labelAr: 'التوأم الرقمي للطفل', icon: User, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'ot_assessments', label: 'Occupational Assessments', labelAr: 'تقييمات المهارات الحركية', icon: Activity, category: 'Assessments', categoryAr: 'التقييمات' },
    { id: 'movement_analysis', label: 'Movement Analysis', labelAr: 'تحليل الحركة والاتزان', icon: Move, category: 'Assessments', categoryAr: 'التقييمات', badge: 'Vision', badgeColor: 'bg-teal-100 text-teal-700' },
    { id: 'drawing_analysis', label: 'Drawing Analysis', labelAr: 'تحليل الرسم والقبضة الدقيقة', icon: Palette, category: 'Assessments', categoryAr: 'التقييمات' },
    { id: 'therapy_plans', label: 'Therapy Plans', labelAr: 'الخطط العلاجية الوظيفية', icon: Brain, category: 'Therapy', categoryAr: 'العلاج' },
    { id: 'therapy_sessions', label: 'Therapy Sessions', labelAr: 'جلسات التدريب والتأهيل', icon: Clock, category: 'Therapy', categoryAr: 'العلاج' },
    { id: 'goals_progress', label: 'Goals and Progress', labelAr: 'تتبع الأهداف الحركية', icon: Target, category: 'Therapy', categoryAr: 'العلاج' },
    { id: 'ai_ot_therapist', label: 'AI Occupational Therapist', labelAr: 'مساعد العلاج الوظيفي الذكي', icon: Sparkles, category: 'Intelligence', categoryAr: 'الذكاء' },
    { id: 'recommendations', label: 'Recommendations', labelAr: 'التوصيات', icon: Lightbulb, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'parent_home_programme', label: 'Parent Home Programme', labelAr: 'تمارين المنزل للوالدين', icon: Home, category: 'Home', categoryAr: 'المنزل' },
    { id: 'calendar', label: 'Calendar', labelAr: 'جدول الجلسات', icon: Calendar, category: 'Schedule', categoryAr: 'الجدول' },
    { id: 'clinical_reports', label: 'Clinical Reports', labelAr: 'تقارير العلاج الوظيفي', icon: FileText, category: 'Reports', categoryAr: 'التقارير' }
  ],

  'ABA Therapist': [
    { id: 'aba_therapy_dashboard', label: 'Therapy Dashboard', labelAr: 'لوحة تحليل السلوك التطبيقي', icon: LayoutDashboard, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'assigned_children', label: 'Assigned Children', labelAr: 'الأطفال الموكلون إليّ', icon: Users, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'child_digital_twin', label: 'Child Digital Twin', labelAr: 'التوأم الرقمي للطفل', icon: User, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'behaviour_assessments', label: 'Behaviour Assessments', labelAr: 'تقييم السلوك والوظيفة', icon: Activity, category: 'Assessments', categoryAr: 'التقييمات' },
    { id: 'abc_behaviour_logs', label: 'ABC Behaviour Logs', labelAr: 'سجل ABC للسلوكيات', icon: FileCheck, category: 'Behaviour', categoryAr: 'السلوك' },
    { id: 'behaviour_analytics', label: 'Behaviour Analytics', labelAr: 'تحليلات أنماط السلوك', icon: TrendingUp, category: 'Behaviour', categoryAr: 'السلوك' },
    { id: 'intervention_plans', label: 'Intervention Plans', labelAr: 'خطط تعديل السلوك', icon: Brain, category: 'Intervention', categoryAr: 'التدخل' },
    { id: 'therapy_sessions', label: 'Therapy Sessions', labelAr: 'جلسات ABA', icon: Clock, category: 'Intervention', categoryAr: 'التدخل' },
    { id: 'goals_progress', label: 'Goals and Progress', labelAr: 'قياس خفض السلوك المستهدف', icon: Target, category: 'Intervention', categoryAr: 'التدخل' },
    { id: 'ai_behavioural_analyst', label: 'AI Behavioural Analyst', labelAr: 'المحلل السلوكي الذكي', icon: Sparkles, category: 'Intelligence', categoryAr: 'الذكاء' },
    { id: 'recommendations', label: 'Recommendations', labelAr: 'توصيات التعزيز والتوجيه', icon: Lightbulb, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'parent_home_programme', label: 'Parent Home Programme', labelAr: 'برنامج التعزيز المنزلي', icon: Home, category: 'Home', categoryAr: 'المنزل' },
    { id: 'clinical_reports', label: 'Clinical Reports', labelAr: 'تقارير ABA السريرية', icon: FileText, category: 'Reports', categoryAr: 'التقارير' }
  ],

  'Psychologist': [
    { id: 'psychology_dashboard', label: 'Psychology Dashboard', labelAr: 'لوحة الأخصائي النفسي', icon: LayoutDashboard, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'assigned_children', label: 'Assigned Children', labelAr: 'الحالات النفسية والتنموية', icon: Users, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'child_digital_twin', label: 'Child Digital Twin', labelAr: 'التوأم الرقمي للطفل', icon: User, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'emotional_assessments', label: 'Emotional Assessments', labelAr: 'التقييمات النفسية والعاطفية', icon: Smile, category: 'Assessments', categoryAr: 'التقييمات' },
    { id: 'social_emotional_tracking', label: 'Social-Emotional Tracking', labelAr: 'تتبع التطور الاجتماعي والعاطفي', icon: Heart, category: 'Psychology', categoryAr: 'النفسي' },
    { id: 'mood_wellbeing', label: 'Mood and Wellbeing', labelAr: 'سجل المزاج والرفاهية النفسية', icon: Activity, category: 'Psychology', categoryAr: 'النفسي' },
    { id: 'intervention_plans', label: 'Intervention Plans', labelAr: 'خطط التدخل النفسي', icon: Brain, category: 'Therapy', categoryAr: 'العلاج' },
    { id: 'session_notes', label: 'Session Notes', labelAr: 'ملاحظات وتدوينات الجلسات', icon: FileText, category: 'Therapy', categoryAr: 'العلاج' },
    { id: 'ai_psychologist', label: 'AI Psychologist', labelAr: 'مساعد علم النفس الذكي', icon: Sparkles, category: 'Intelligence', categoryAr: 'الذكاء' },
    { id: 'risk_alerts', label: 'Risk Alerts', labelAr: 'تنبيهات المخاطر النفسية', icon: AlertTriangle, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'parent_guidance', label: 'Parent Guidance', labelAr: 'الإرشاد والتوجيه الأسري', icon: Home, category: 'Guidance', categoryAr: 'الإرشاد' },
    { id: 'clinical_reports', label: 'Clinical Reports', labelAr: 'التقارير النفسية', icon: FileSpreadsheet, category: 'Reports', categoryAr: 'التقارير' }
  ],

  'Early Intervention Specialist': [
    { id: 'early_intervention_dashboard', label: 'Intervention Dashboard', labelAr: 'لوحة التدخل المبكر', icon: LayoutDashboard, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'assigned_children', label: 'Assigned Children', labelAr: 'أطفال التدخل المبكر', icon: Users, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'developmental_screening', label: 'Developmental Screening', labelAr: 'المسح التنموي المبكر', icon: Search, category: 'Screening', categoryAr: 'المسح' },
    { id: 'child_digital_twin', label: 'Child Digital Twin', labelAr: 'التوأم الرقمي للطفل', icon: User, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'early_risk_detection', label: 'Early Risk Detection', labelAr: 'الكشف المبكر عن المخاطر', icon: AlertTriangle, category: 'Screening', categoryAr: 'المسح', badge: 'Risk', badgeColor: 'bg-amber-100 text-amber-700' },
    { id: 'multidisciplinary_reviews', label: 'Multidisciplinary Reviews', labelAr: 'المراجعات متعددة التخصصات', icon: Layers, category: 'Review', categoryAr: 'المراجعة' },
    { id: 'intervention_plans', label: 'Intervention Plans', labelAr: 'خطط التدخل الشاملة', icon: Brain, category: 'Intervention', categoryAr: 'التدخل' },
    { id: 'goals_milestones', label: 'Goals and Milestones', labelAr: 'الأهداف والمحطات التنموية', icon: CheckCircle2, category: 'Intervention', categoryAr: 'التدخل' },
    { id: 'ai_early_intervention_assistant', label: 'AI Early Intervention Assistant', labelAr: 'مساعد التدخل المبكر الذكي', icon: Sparkles, category: 'Intelligence', categoryAr: 'الذكاء' },
    { id: 'parent_guidance', label: 'Parent Guidance', labelAr: 'التوجيه والإرشاد الأسري', icon: Home, category: 'Family', categoryAr: 'الأسرة' },
    { id: 'recommendations', label: 'Recommendations', labelAr: 'توصيات الفريق', icon: Lightbulb, category: 'Clinical', categoryAr: 'السريري' },
    { id: 'reports', label: 'Reports', labelAr: 'تقارير التدخل المبكر', icon: FileText, category: 'Reports', categoryAr: 'التقارير' }
  ],

  'Finance Officer': [
    { id: 'finance_dashboard', label: 'Finance Dashboard', labelAr: 'اللوحة المالية الشاملة', icon: LayoutDashboard, category: 'Finance', categoryAr: 'المالية' },
    { id: 'invoices', label: 'Invoices', labelAr: 'الفواتير والمطالبات', icon: FileText, category: 'Finance', categoryAr: 'المالية' },
    { id: 'payments', label: 'Payments', labelAr: 'المقبوضات والدفعات', icon: CreditCard, category: 'Finance', categoryAr: 'المالية' },
    { id: 'outstanding_fees', label: 'Outstanding Fees', labelAr: 'الرسوم المتأخرة والمديونيات', icon: AlertTriangle, category: 'Finance', categoryAr: 'المالية', badge: 'Fees', badgeColor: 'bg-red-100 text-red-700' },
    { id: 'discounts', label: 'Discounts', labelAr: 'الخصومات والمنح الدراسي', icon: CreditCard, category: 'Billing', categoryAr: 'الفواتير' },
    { id: 'refunds', label: 'Refunds', labelAr: 'المرتجعات والتسويات', icon: Activity, category: 'Billing', categoryAr: 'الفواتير' },
    { id: 'revenue_by_branch', label: 'Revenue by Branch', labelAr: 'الإيرادات حسب الفرع', icon: GitBranch, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'revenue_by_child', label: 'Revenue by Child', labelAr: 'الإيرادات حسب الطفل', icon: Users, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'collection_analytics', label: 'Collection Analytics', labelAr: 'تحليلات نسبة التحصيل', icon: TrendingUp, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'payment_forecast', label: 'Payment Forecast', labelAr: 'توقعات التدفقات المالية', icon: Sparkles, category: 'Intelligence', categoryAr: 'الذكاء' },
    { id: 'finance_reports', label: 'Finance Reports', labelAr: 'التقارير المالية والضريبية', icon: FileSpreadsheet, category: 'Reports', categoryAr: 'التقارير' }
  ],

  'Sales Manager': [
    { id: 'sales_dashboard', label: 'Sales Dashboard', labelAr: 'لوحة مبيعات التسجيل', icon: LayoutDashboard, category: 'Sales', categoryAr: 'المبيعات' },
    { id: 'leads', label: 'Leads', labelAr: 'العملاء المحتملون', icon: Users, category: 'Pipeline', categoryAr: 'المسار' },
    { id: 'enquiries', label: 'Enquiries', labelAr: 'الاستفسارات الواردة', icon: MessageSquare, category: 'Pipeline', categoryAr: 'المسار' },
    { id: 'nursery_tours', label: 'Nursery Tours', labelAr: 'جولات المعاينة الميدانية', icon: Eye, category: 'Pipeline', categoryAr: 'المسار' },
    { id: 'applications', label: 'Applications', labelAr: 'طلبات الانضمام المقدمة', icon: FileCheck, category: 'Pipeline', categoryAr: 'المسار' },
    { id: 'admissions_pipeline', label: 'Admissions Pipeline', labelAr: 'خط سير عمليات القبول', icon: Target, category: 'Pipeline', categoryAr: 'المسار' },
    { id: 'follow_ups', label: 'Follow-Ups', labelAr: 'جدول المتابعة والاتصالات', icon: Clock, category: 'Sales', categoryAr: 'المبيعات' },
    { id: 'lead_sources', label: 'Lead Sources', labelAr: 'قنوات وجذبيات العملاء', icon: Compass, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'conversion_analytics', label: 'Conversion Analytics', labelAr: 'معدلات تحويل التسجيل', icon: TrendingUp, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'branch_capacity', label: 'Branch Capacity', labelAr: 'الطاقة الاستيعابية للفروع', icon: GitBranch, category: 'Capacity', categoryAr: 'السعة' },
    { id: 'sales_forecast', label: 'Sales Forecast', labelAr: 'التنبؤ باشتراكات القبول', icon: Sparkles, category: 'Intelligence', categoryAr: 'الذكاء' },
    { id: 'sales_reports', label: 'Sales Reports', labelAr: 'تقارير أداء المبيعات', icon: FileSpreadsheet, category: 'Reports', categoryAr: 'التقارير' }
  ],

  'Marketing Manager': [
    { id: 'marketing_dashboard', label: 'Marketing Dashboard', labelAr: 'لوحة التحكم التسويقية', icon: LayoutDashboard, category: 'Marketing', categoryAr: 'التسويق' },
    { id: 'campaigns', label: 'Campaigns', labelAr: 'الحملات الإعلانية', icon: Megaphone, category: 'Campaigns', categoryAr: 'الحملات' },
    { id: 'lead_sources', label: 'Lead Sources', labelAr: 'قنوات ومصادر الاستقطاب', icon: Compass, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'website_enquiries', label: 'Website Enquiries', labelAr: 'استفسارات الموقع الإلكتروني', icon: MessageSquare, category: 'Digital', categoryAr: 'الرقمي' },
    { id: 'social_media_performance', label: 'Social Media Performance', labelAr: 'أداء المنصات الاجتماعية', icon: Share2, category: 'Digital', categoryAr: 'الرقمي' },
    { id: 'parent_engagement', label: 'Parent Engagement', labelAr: 'تفاعل وتأثير الأهالي', icon: Heart, category: 'Engagement', categoryAr: 'التفاعل' },
    { id: 'newsletter_campaigns', label: 'Newsletter Campaigns', labelAr: 'النشرات والرسائل البريدية', icon: Mail, category: 'Campaigns', categoryAr: 'الحملات' },
    { id: 'branch_demand', label: 'Branch Demand', labelAr: 'طلب وتفضيلات الفروع', icon: GitBranch, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'marketing_analytics', label: 'Marketing Analytics', labelAr: 'تحليلات المردود التسويقي', icon: BarChart3, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'cost_per_lead', label: 'Cost per Lead', labelAr: 'تكلفة جلب العميل (CPL)', icon: DollarSign, category: 'Analytics', categoryAr: 'التحليلات' },
    { id: 'marketing_reports', label: 'Marketing Reports', labelAr: 'تقارير الأداء التسويقي', icon: FileSpreadsheet, category: 'Reports', categoryAr: 'التقارير' }
  ],

  'Parent': [
    { id: 'parent_home', label: 'Home', labelAr: 'الرئيسية', icon: Home, category: 'Overview', categoryAr: 'نظرة عامة' },
    { id: 'parent_my_child', label: 'My Child', labelAr: 'طفلي (سارة أحمد)', icon: User, category: 'Child', categoryAr: 'الطفل' },
    { id: 'parent_daily_updates', label: 'Daily Updates', labelAr: 'اليوميات والوجبات والنوم', icon: Clock, category: 'Child', categoryAr: 'الطفل' },
    { id: 'parent_dev_progress', label: 'Development Progress', labelAr: 'مؤشرات النمو والتطور', icon: Brain, category: 'Progress', categoryAr: 'التقدم' },
    { id: 'parent_learning_activities', label: 'Learning Activities', labelAr: 'أنشطة التعلم بالصف', icon: BookOpen, category: 'Progress', categoryAr: 'التقدم' },
    { id: 'parent_therapy_progress', label: 'Therapy Progress', labelAr: 'تقدم العلاج والتأهيل', icon: Heart, category: 'Progress', categoryAr: 'التقدم' },
    { id: 'parent_home_activities', label: 'Home Activities', labelAr: 'البرنامج والأنشطة المنزلية', icon: CheckCircle2, category: 'Home', categoryAr: 'المنزل' },
    { id: 'parent_ai_assistant', label: 'Parent AI Assistant', labelAr: 'المساعد الذكي للوالدين', icon: Sparkles, category: 'Support', categoryAr: 'الدعم' },
    { id: 'parent_messages', label: 'Messages', labelAr: 'التواصل مع المعلمة والمعالج', icon: MessageSquare, category: 'Support', categoryAr: 'الدعم' },
    { id: 'parent_attendance', label: 'Attendance', labelAr: 'سجل حضور طفلي', icon: Calendar, category: 'Child', categoryAr: 'الطفل' },
    { id: 'parent_payments', label: 'Payments', labelAr: 'الفواتير والرسوم الدراسية', icon: DollarSign, category: 'Billing', categoryAr: 'الفواتير' },
    { id: 'parent_events', label: 'Events', labelAr: 'الفعاليات والرحلات', icon: Calendar, category: 'Overview', categoryAr: 'نظرة عامة' },
    { id: 'parent_documents', label: 'Documents', labelAr: 'التقارير والمستندات الرسمية', icon: FileText, category: 'Support', categoryAr: 'الدعم' },
    { id: 'parent_notifications', label: 'Notifications', labelAr: 'التنبيهات والإشعارات', icon: Bell, category: 'Support', categoryAr: 'الدعم' }
  ]
};

export function isRoleAuthorized(role: UserRole, sectionId: string): boolean {
  // Allow all roles access to children details, digital twin, and subscriptions
  const universalSections = [
    'children_directory',
    'digital_twin',
    'child_digital_twin',
    'children_overview',
    'children',
    'my_children',
    'subscriptions',
    'add_child',
    'add_staff'
  ];

  if (universalSections.includes(sectionId)) {
    return true;
  }

  const allowedItems = ROLE_MENU_MAP[role] || [];
  return allowedItems.some(item => item.id === sectionId);
}

export function getDefaultSectionForRole(role: UserRole): string {
  const allowedItems = ROLE_MENU_MAP[role];
  if (allowedItems && allowedItems.length > 0) {
    return allowedItems[0].id;
  }
  return 'executive_dashboard';
}
