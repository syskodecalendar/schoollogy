import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  ThemeMode,
  UserRole,
  User,
  Child,
  RecommendationItem,
  AIAssessmentRecord,
  TherapyPlan,
  ABCLogItem,
  WhiteLabelConfig,
  DemoFlowStep,
  AssessmentType
} from '../types';
import {
  mockUsers,
  mockChildren,
  mockRecommendations,
  mockAIAssessments,
  mockTherapyPlans,
  mockABCLogs,
  defaultWhiteLabelConfig,
  requiredDemoFlows
} from '../data/mockData';

import { isRoleAuthorized, getDefaultSectionForRole } from '../data/rolePermissions';

interface AppContextType {
  isLoggedIn: boolean;
  login: (role?: UserRole) => void;
  logout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: User;
  currentBranchId: string;
  setCurrentBranchId: (branchId: string) => void;
  academicYear: string;
  setAcademicYear: (year: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  selectedChildId: string;
  setSelectedChildId: (id: string) => void;
  selectedChild: Child;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  whiteLabelConfig: WhiteLabelConfig;
  updateWhiteLabelConfig: (config: Partial<WhiteLabelConfig>) => void;
  
  // Data state
  childrenList: Child[];
  usersList: User[];
  recommendationsList: RecommendationItem[];
  assessmentsList: AIAssessmentRecord[];
  therapyPlansList: TherapyPlan[];
  abcLogsList: ABCLogItem[];
  
  // Actions
  addChild: (newChild: Partial<Child>) => void;
  addStaff: (newStaff: Partial<User>) => void;
  approveRecommendation: (id: string, reviewerName: string) => void;
  rejectRecommendation: (id: string) => void;
  approveAssessment: (id: string, note: string) => void;
  addABCLog: (log: Omit<ABCLogItem, 'id'>) => void;
  addObservationToDigitalTwin: (childId: string, observation: string, domain: keyof Child['domains'], delta: number) => void;
  runNewAIAssessment: (childId: string, type: AssessmentType, mediaName: string) => Promise<AIAssessmentRecord>;
  
  // UI & Demo Flow Controls
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
  activeDemoFlow: DemoFlowStep | null;
  triggerDemoFlow: (flowId: number) => void;
  clearDemoFlow: () => void;
  notificationCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('schoology_is_logged_in') !== 'false';
  });
  const [language, setLanguageState] = useState<Language>('en');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('schoology_current_role') as UserRole;
    return saved || 'Executive Management';
  });
  const [currentBranchId, setCurrentBranchId] = useState<string>('branch-juffair');
  const [academicYear, setAcademicYear] = useState<string>('2026-2027');
  const [activeSection, setActiveSectionState] = useState<string>(() => {
    const savedRole = (localStorage.getItem('schoology_current_role') as UserRole) || 'Executive Management';
    return getDefaultSectionForRole(savedRole);
  });
  const [selectedChildId, setSelectedChildId] = useState<string>('child-sara');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [whiteLabelConfig, setWhiteLabelConfig] = useState<WhiteLabelConfig>(defaultWhiteLabelConfig);
  
  const [childrenList, setChildrenList] = useState<Child[]>(mockChildren);
  const [usersList, setUsersList] = useState<User[]>(mockUsers);
  const [recommendationsList, setRecommendationsList] = useState<RecommendationItem[]>(mockRecommendations);
  const [assessmentsList, setAssessmentsList] = useState<AIAssessmentRecord[]>(mockAIAssessments);
  const [therapyPlansList, setTherapyPlansList] = useState<TherapyPlan[]>(mockTherapyPlans);
  const [abcLogsList, setAbcLogsList] = useState<ABCLogItem[]>(mockABCLogs);

  const addChild = (newChildData: Partial<Child>) => {
    const id = `child-${Date.now()}`;
    const fullChild: Child = {
      id,
      name: newChildData.name || 'New Enrolled Child',
      nameAr: newChildData.nameAr || 'طفل جديد مسجل',
      age: newChildData.age || '4.2 yrs',
      dob: newChildData.dob || '2022-03-15',
      gender: newChildData.gender || 'Male',
      avatar: newChildData.avatar || 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=150&q=80',
      organizationId: 'org-1',
      branchId: currentBranchId,
      branchName: currentBranchId.includes('juffair') ? 'Juffair Educational Branch' : 'Riffa Rehabilitation Center',
      classroom: newChildData.classroom || 'KG1-B (Butterflies)',
      teacher: newChildData.teacher || 'Ms. Layla Al-Mahmood',
      therapists: newChildData.therapists || [
        { name: 'Dr. Tariq Mansoor', role: 'Speech Therapist' },
        { name: 'Ms. Fatima Al-Sayed', role: 'Occupational Therapist' }
      ],
      attendanceStatus: 'present',
      attendanceRate: 96,
      riskLevel: newChildData.riskLevel || 'Low',
      developmentScore: newChildData.developmentScore || 82,
      lastAssessmentDate: new Date().toISOString().split('T')[0],
      interventionStatus: (newChildData.interventionStatus as any) || 'Speech Therapy',
      parentName: newChildData.parentName || 'Ahmed Al-Aali',
      parentPhone: newChildData.parentPhone || '+973 3912 3456',
      parentEmail: newChildData.parentEmail || 'ahmed.aali@example.bh',
      consentStatus: {
        guardianConsent: true,
        mediaConsent: true,
        assessmentConsent: true,
        dataSharingConsent: true
      },
      domains: newChildData.domains || {
        cognitive: 80,
        speechLanguage: 78,
        fineMotor: 82,
        grossMotor: 85,
        socialEmotional: 80,
        adaptiveBehavior: 84,
        academicReadiness: 79,
        attentionEngagement: 81
      },
      developmentNarrative: {
        summary: 'Active child making steady developmental progress.',
        summaryAr: 'طفل نشيط يحرز تقدمًا تنمويًا مستمرًا.',
        strengths: ['Strong visual memory', 'High curiosity'],
        strengthsAr: ['ذاكرة بصرية قوية', 'فضول معرفي ممتاز'],
        emergingSkills: ['Joint attention', 'Verbal imitation'],
        emergingSkillsAr: ['الانتباه المشترك', 'التقليد اللفظي'],
        areasForAttention: ['Fine motor dexterity'],
        areasForAttentionAr: ['التحكم في المهارات الحركية الدقيقة'],
        nextActions: ['Daily 10-min home practice'],
        nextActionsAr: ['تمرين منزلي يومي لمدة 10 دقائق']
      },
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'enrolment',
          title: 'Enrolment Profile Created',
          titleAr: 'تم إنشاء ملف التسجيل الجديد',
          description: 'Child added to branch roster with initial digital twin setup.',
          descriptionAr: 'تم إضافة الطفل لقائمة الصف وتفعيل التوأم الرقمي.',
          author: currentUser.name,
          role: currentUser.role,
          badgeColor: 'bg-emerald-100 text-emerald-800'
        }
      ],
      predictions: {
        days30: { score: 84, confidence: 91, summary: 'Steady positive development', summaryAr: 'تقدم إيجابي مستمر' },
        days90: { score: 87, confidence: 88, summary: 'Expected milestone achievement', summaryAr: 'تحقيق متوقع للمؤشرات' },
        months6: { score: 90, confidence: 85, summary: 'Target speech readiness', summaryAr: 'جاهزية نطق مستهدفة' },
        months12: { score: 93, confidence: 82, summary: 'Primary transition readiness', summaryAr: 'جاهزية الانتقال للمرحلة الابتدائية' },
        influencingFactors: ['Daily home exercise consistency', 'Multi-therapist plan sync'],
        influencingFactorsAr: ['التزام التمرين المنزلي اليومي', 'تزامن خطة العلاج المتقاطعة']
      }
    };
    setChildrenList(prev => [fullChild, ...prev]);
    setSelectedChildId(id);
  };

  const addStaff = (newStaffData: Partial<User>) => {
    const id = `user-${Date.now()}`;
    const fullStaff: User = {
      id,
      name: newStaffData.name || 'New Specialist Staff',
      nameAr: newStaffData.nameAr || 'أخصائي جديد',
      role: newStaffData.role || 'Teacher',
      email: newStaffData.email || `staff.${Date.now()}@earlysteps.edu.bh`,
      avatar: newStaffData.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      organizationId: 'org-1',
      branchId: currentBranchId
    };
    setUsersList(prev => [fullStaff, ...prev]);
  };
  
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [activeDemoFlow, setActiveDemoFlow] = useState<DemoFlowStep | null>(null);

  const login = (role?: UserRole) => {
    setIsLoggedIn(true);
    localStorage.setItem('schoology_is_logged_in', 'true');
    if (role) {
      setCurrentRole(role);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('schoology_is_logged_in', 'false');
  };

  const setActiveSection = (section: string) => {
    setActiveSectionState(section);
  };

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    localStorage.setItem('schoology_current_role', role);
    const defaultSec = getDefaultSectionForRole(role);
    setActiveSectionState(defaultSec);
    if (role === 'Parent') {
      setSelectedChildId('child-sara');
      setCurrentBranchId('branch-juffair');
    }
  };

  // Sync RTL / LTR document direction
  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Sync dark class
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const currentUser = mockUsers.find(u => u.role === currentRole) || mockUsers[0];
  const selectedChild = childrenList.find(c => c.id === selectedChildId) || childrenList[0];

  const updateWhiteLabelConfig = (config: Partial<WhiteLabelConfig>) => {
    setWhiteLabelConfig(prev => ({ ...prev, ...config }));
  };

  const approveRecommendation = (id: string, reviewerName: string) => {
    setRecommendationsList(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              approvalStatus: 'Approved',
              acceptedBy: reviewerName,
              acceptedDate: new Date().toISOString().split('T')[0]
            }
          : item
      )
    );
  };

  const rejectRecommendation = (id: string) => {
    setRecommendationsList(prev =>
      prev.map(item => (item.id === id ? { ...item, approvalStatus: 'Rejected' } : item))
    );
  };

  const approveAssessment = (id: string, note: string) => {
    setAssessmentsList(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status: 'approved',
              professionalApprovalNote: note,
              reviewerName: currentUser.name,
              reviewerRole: currentUser.role
            }
          : item
      )
    );
  };

  const addABCLog = (log: Omit<ABCLogItem, 'id'>) => {
    const newLog: ABCLogItem = {
      ...log,
      id: `abc-${Date.now()}`
    };
    setAbcLogsList(prev => [newLog, ...prev]);
  };

  const addObservationToDigitalTwin = (childId: string, observationText: string, domain: keyof Child['domains'], delta: number) => {
    setChildrenList(prev =>
      prev.map(c => {
        if (c.id === childId) {
          const newDomains = { ...c.domains, [domain]: Math.min(100, Math.max(0, c.domains[domain] + delta)) };
          const newEvent = {
            id: `tl-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            type: 'observation' as const,
            title: `Teacher Observation (${domain})`,
            titleAr: `ملاحظة المعلمة (${domain})`,
            description: observationText,
            descriptionAr: `تم تسجيل ملاحظة جديدة حول أداء الطفل في هذا المجال.`,
            author: currentUser.name,
            role: currentUser.role,
            badgeColor: 'bg-blue-100 text-blue-800'
          };
          return {
            ...c,
            domains: newDomains,
            developmentScore: Math.round((Object.values(newDomains) as number[]).reduce((a, b) => a + b, 0) / 8),
            timeline: [newEvent, ...c.timeline]
          };
        }
        return c;
      })
    );
  };

  const runNewAIAssessment = async (childId: string, type: AssessmentType, mediaName: string): Promise<AIAssessmentRecord> => {
    const child = childrenList.find(c => c.id === childId) || childrenList[0];
    const newEval: AIAssessmentRecord = {
      id: `eval-${Date.now()}`,
      childId: child.id,
      childName: child.name,
      type,
      title: `AI Interactive ${type ? type.replace('_', ' ').toUpperCase() : 'GENERAL'} Screening`,
      titleAr: `تقييم الذكاء الاصطناعي التفاعلي (${type})`,
      date: new Date().toISOString().split('T')[0],
      conductedBy: `${currentUser.name} (${currentUser.role})`,
      status: 'pending_review',
      confidenceScore: Math.floor(Math.random() * 10) + 88,
      mediaType: 'video',
      mediaUrl: mediaName,
      observedIndicators: [
        'Automated gesture & tone acoustic frequency tracking initialized',
        'Consistency match against age cohort baseline model: 84%',
        'No fatigue signs observed during first 8 minutes',
        'Slight variation in joint-attention duration when visual distraction present'
      ],
      observedIndicatorsAr: [
        'تم تشغيل تتبع التردد الصوتي والإيماءات الآلي',
        'مطابقة الاتساق مع نموذج قاعدة خط الأساس للجيل: 84%',
        'لم يلاحظ علامات إجهاد خلال أول 8 دقائق',
        'تباين طفيف في مدة الانتباه المشترك عند وجود تشتت بصري'
      ],
      skillScores: [
        { name: 'Target Focus', score: 78 },
        { name: 'Response Velocity', score: 85 },
        { name: 'Pattern Accuracy', score: 82 },
        { name: 'Emotional Stability', score: 76 }
      ],
      strengths: ['High enthusiasm during visual digital stimulus', 'Fast response recovery after error'],
      areasForReview: ['Sustained multi-step task execution', 'Phonetic or physical stamina'],
      suggestedGoals: [
        `Enhance ${type.replace('_', ' ')} target completion duration by 20% over 4 weeks`,
        'Incorporate daily 5-minute playful reinforcement at home'
      ],
      suggestedInterventionFrequency: '2 clinical sessions weekly with multidisciplinary tracking'
    };

    setAssessmentsList(prev => [newEval, ...prev]);
    return newEval;
  };

  const triggerDemoFlow = (flowId: number) => {
    const flow = requiredDemoFlows.find(f => f.id === flowId);
    if (flow) {
      setActiveDemoFlow(flow);
      setCurrentRoleState(flow.role);
      setActiveSection(flow.targetSection);
      if (flow.childId) {
        setSelectedChildId(flow.childId);
      }
      if (flow.branchId) {
        setCurrentBranchId(flow.branchId);
      }
    }
  };

  const clearDemoFlow = () => {
    setActiveDemoFlow(null);
  };

  const notificationCount = recommendationsList.filter(r => r.approvalStatus === 'Pending Review').length + 2;

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
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
        activeSection,
        setActiveSection,
        selectedChildId,
        setSelectedChildId,
        selectedChild,
        searchQuery,
        setSearchQuery,
        whiteLabelConfig,
        updateWhiteLabelConfig,
        childrenList,
        usersList,
        recommendationsList,
        assessmentsList,
        therapyPlansList,
        abcLogsList,
        addChild,
        addStaff,
        approveRecommendation,
        rejectRecommendation,
        approveAssessment,
        addABCLog,
        addObservationToDigitalTwin,
        runNewAIAssessment,
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        activeDemoFlow,
        triggerDemoFlow,
        clearDemoFlow,
        notificationCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
