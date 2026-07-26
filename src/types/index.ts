// Global Types for Schoollogy AI Platform

export type Language = 'en' | 'ar';
export type ThemeMode = 'light' | 'dark';

export type UserRole =
  | 'Super Admin'
  | 'Executive Management'
  | 'Regional Manager'
  | 'Branch Manager'
  | 'Teacher'
  | 'Speech Therapist'
  | 'Occupational Therapist'
  | 'ABA Therapist'
  | 'Psychologist'
  | 'Early Intervention Specialist'
  | 'Finance Officer'
  | 'Sales Manager'
  | 'Marketing Manager'
  | 'Parent';

export interface User {
  id: string;
  name: string;
  nameAr: string;
  role: UserRole;
  email: string;
  avatar: string;
  organizationId: string;
  branchId: string;
}

export interface Organization {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  branchesCount: number;
  totalEnrolled: number;
}

export interface Branch {
  id: string;
  organizationId: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr?: string;
  country: string;
  capacity?: number;
  enrolledCount?: number;
  totalChildren: number;
  riskCount: number;
  occupancyRate: number;
  revenueYTD: number;
  attendanceRate: number;
  interventionRate: number;
  manager: string;
  status: 'optimal' | 'attention_required' | 'critical';
}

export interface DevelopmentalDomains {
  cognitive: number; // 0-100
  speechLanguage: number;
  fineMotor: number;
  grossMotor: number;
  socialEmotional: number;
  adaptiveBehavior: number;
  academicReadiness: number;
  attentionEngagement: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: 'enrolment' | 'assessment' | 'observation' | 'therapy' | 'milestone' | 'goal' | 'parent_feedback' | 'alert' | 'plan_change';
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  author: string;
  role: string;
  status?: string;
  badgeColor?: string;
}

export interface PredictionHorizon {
  days30: { score: number; confidence: number; summary: string; summaryAr: string };
  days90: { score: number; confidence: number; summary: string; summaryAr: string };
  months6: { score: number; confidence: number; summary: string; summaryAr: string };
  months12: { score: number; confidence: number; summary: string; summaryAr: string };
  influencingFactors: string[];
  influencingFactorsAr: string[];
}

export interface Child {
  id: string;
  name: string;
  nameAr: string;
  age: string;
  dob: string;
  gender: 'Male' | 'Female';
  avatar: string;
  organizationId: string;
  branchId: string;
  branchName: string;
  classroom: string;
  teacher: string;
  therapists: { name: string; role: string }[];
  attendanceStatus: 'present' | 'absent' | 'late' | 'excused';
  attendanceRate: number;
  developmentScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  interventionStatus: 'None' | 'Active Early Intervention' | 'Speech Therapy' | 'Occupational Therapy' | 'Multidisciplinary';
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  lastAssessmentDate: string;
  consentStatus: {
    guardianConsent: boolean;
    mediaConsent: boolean;
    assessmentConsent: boolean;
    dataSharingConsent: boolean;
  };
  domains: DevelopmentalDomains;
  developmentNarrative: {
    summary: string;
    summaryAr: string;
    strengths: string[];
    strengthsAr: string[];
    emergingSkills: string[];
    emergingSkillsAr: string[];
    areasForAttention: string[];
    areasForAttentionAr: string[];
    nextActions: string[];
    nextActionsAr: string[];
  };
  timeline: TimelineEvent[];
  predictions: PredictionHorizon;
}

export type AssessmentType =
  | 'speech'
  | 'language'
  | 'behaviour'
  | 'developmental_screening'
  | 'fine_motor'
  | 'gross_motor'
  | 'social_emotional'
  | 'school_readiness'
  | 'drawing_analysis'
  | 'video_movement';

export interface AIAssessmentRecord {
  id: string;
  childId: string;
  childName: string;
  type: AssessmentType;
  title: string;
  titleAr: string;
  date: string;
  conductedBy: string;
  status: 'pending_review' | 'approved' | 'rejected' | 'reassessment_requested';
  confidenceScore: number; // 0-100
  mediaType?: 'video' | 'audio' | 'image' | 'observation';
  mediaUrl?: string;
  observedIndicators: string[];
  observedIndicatorsAr: string[];
  skillScores: { name: string; score: number }[];
  strengths: string[];
  areasForReview: string[];
  suggestedGoals: string[];
  suggestedInterventionFrequency: string;
  professionalApprovalNote?: string;
  reviewerName?: string;
  reviewerRole?: string;
}

export interface RecommendationItem {
  id: string;
  childId: string;
  childName: string;
  title: string;
  titleAr: string;
  category: 'Therapy Plan' | 'Learning Activity' | 'Child Goal' | 'Parent Home Activity' | 'Teacher Action' | 'Classroom Adjustment' | 'Management';
  reason: string;
  reasonAr: string;
  supportingData: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  expectedBenefit: string;
  assignedTo: string;
  dueDate: string;
  aiConfidence: number;
  approvalStatus: 'Pending Review' | 'Approved' | 'Rejected' | 'In Progress' | 'Completed';
  acceptedBy?: string;
  acceptedDate?: string;
}

export interface TherapyGoal {
  id: string;
  title: string;
  baseline: string;
  targetOutcome: string;
  progressPercent: number;
  status: 'not_started' | 'in_progress' | 'mastered' | 'review_needed';
}

export interface TherapyPlan {
  id: string;
  childId: string;
  childName: string;
  planTitle: string;
  therapyType: string;
  assignedTherapist: string;
  sessionFrequency: string;
  startDate: string;
  reviewDate: string;
  goals: TherapyGoal[];
  parentHomeProgram: string[];
  measurementMethod: string;
  successCriteria: string;
  approvalStatus: 'Draft' | 'Pending Clinical Review' | 'Approved' | 'Active';
}

export interface ABCLogItem {
  id: string;
  childId: string;
  childName: string;
  timestamp: string;
  antecedent: string;
  behaviour: string;
  consequence: string;
  intensity: 'Mild' | 'Moderate' | 'Severe';
  durationMinutes: number;
  triggerCategory: string;
}

export interface SkillMatrixItem {
  id: string;
  domain: string;
  skillName: string;
  skillNameAr: string;
  status: 'Not Introduced' | 'Introduced' | 'Emerging' | 'Developing' | 'Mastered' | 'Needs Reinforcement';
  evidenceCount: number;
  lastObserved: string;
}

export interface CurriculumGenerationParams {
  ageGroup: string;
  curriculumFramework: string;
  learningObjective: string;
  developmentDomain: string;
  classSize: number;
  durationMinutes: number;
  availableMaterials: string;
  language: Language;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Adaptive';
  inclusionRequirements: string;
}

export interface GeneratedLessonPlan {
  id: string;
  title: string;
  titleAr: string;
  learningObjectives: string[];
  requiredMaterials: string[];
  warmUp: string;
  mainActivity: string;
  differentiatedActivities: string[];
  therapyAdaptations: string[];
  parentFollowUp: string;
  assessmentCriteria: string[];
  safetyNotes: string;
}

export interface PredictiveRiskItem {
  id: string;
  category: 'Early Developmental Risk' | 'Therapy Outcome' | 'Attendance Risk' | 'Withdrawal/Dropout' | 'Parent Disengagement' | 'Fee Payment' | 'Staffing Demand' | 'Classroom Capacity';
  entityName: string; // Child name or Branch name
  riskScore: number; // 0-100
  confidenceRange: string;
  contributingFactors: string[];
  recommendedAction: string;
  responsibleUser: string;
  reviewDeadline: string;
  whyAmISeeingThis: string;
  whyAmISeeingThisAr: string;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface MarketplaceItem {
  id: string;
  title: string;
  titleAr: string;
  provider: string;
  category: 'Therapy Resources' | 'Educational Content' | 'Assessment Tools' | 'Curriculum Templates' | 'Professional Services' | 'Training Courses' | 'Parent Resources' | 'Integrations';
  rating: number;
  reviewsCount: number;
  price: string;
  description: string;
  supportedAgeGroup: string;
  imageUrl: string;
  isPurchased?: boolean;
}

export interface WhiteLabelConfig {
  platformName: string;
  platformNameAr: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  assistantName: string;
  assistantTone: 'Professional & Clinical' | 'Empathetic & Supportive' | 'Encouraging & Direct' | 'Child-Friendly';
  parentPortalBannerText: string;
  parentPortalBannerTextAr: string;
  customDomain: string;
}

export interface DemoFlowStep {
  id: number;
  title: string;
  titleAr: string;
  role: UserRole;
  targetSection: string;
  childId?: string;
  branchId?: string;
  description: string;
  descriptionAr: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  parentName: string;
  childName: string;
  branchId: string;
  branchName: string;
  amountBHD: number;
  dueDate: string;
  paidAmountBHD: number;
  outstandingAmountBHD: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partially Paid';
  paymentMethod?: string;
}

export interface Payment {
  id: string;
  receiptNo: string;
  invoiceNumber: string;
  parentName: string;
  amountBHD: number;
  date: string;
  method: 'BenefitPay' | 'Credit Card' | 'Bank Transfer' | 'Cash';
  status: 'Completed' | 'Processing' | 'Failed';
}

export interface Lead {
  id: string;
  parentName: string;
  childName: string;
  childAge: string;
  interestedBranch?: string;
  preferredBranch?: string;
  source: string;
  stage: 'New Inquiry' | 'Tour Scheduled' | 'Tour Completed' | 'Application Submitted' | 'Enrolled' | 'Closed Lost';
  assignedStaff?: string;
  expectedValueBHD?: number;
  followUpDate?: string;
  contactDate?: string;
  probability?: number;
}

export interface Campaign {
  id: string;
  name: string;
  channel?: string;
  platform?: string;
  budgetBHD?: number;
  spendBHD?: number;
  spentBHD?: number;
  leadsGenerated: number;
  cplBHD?: number;
  costPerLeadBHD?: number;
  applications?: number;
  admissions?: number;
  conversionRatePercent?: number;
  status: 'Active' | 'Completed' | 'Draft' | 'Paused';
}

export interface NotificationItem {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  time: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  forRoles: UserRole[];
  read: boolean;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user?: string;
  userName?: string;
  role?: string;
  userRole?: string;
  action: string;
  module?: string;
  targetModule?: string;
  ipAddress: string;
  status: 'Success' | 'Flagged' | 'Failed';
}

