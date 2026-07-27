import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DemoFlowBar } from './components/layout/DemoFlowBar';
import { AIAssistantModal } from './components/layout/AIAssistantModal';
import { LoginPage } from './components/auth/LoginPage';
import { AccessRestricted } from './components/common/AccessRestricted';
import { isRoleAuthorized } from './data/rolePermissions';

// Role Views
import { ExecutiveDashboard } from './components/views/ExecutiveDashboard';
import { RegionalDashboard } from './components/views/RegionalDashboard';
import { BranchDashboard } from './components/views/BranchDashboard';
import { TeacherDashboard } from './components/views/TeacherDashboard';
import { TherapistDashboard } from './components/views/TherapistDashboard';
import { EarlyInterventionView } from './components/views/EarlyInterventionView';
import { FinanceDashboard } from './components/views/FinanceDashboard';
import { SalesCRMDashboard } from './components/views/SalesCRMDashboard';
import { MarketingDashboard } from './components/views/MarketingDashboard';
import { ParentPortalDashboard } from './components/views/ParentPortalDashboard';
import { AuditLogsView } from './components/views/AuditLogsView';

// Domain Views
import { ChildrenDirectory } from './components/views/ChildrenDirectory';
import { ChildDigitalTwin } from './components/views/ChildDigitalTwin';
import { AIAssessmentCentre } from './components/views/AIAssessmentCentre';
import { ClinicalAISuite } from './components/views/ClinicalAISuite';
import { RecommendationEngine } from './components/views/RecommendationEngine';
import { TherapyPlanBuilder } from './components/views/TherapyPlanBuilder';
import { LearningAnalytics } from './components/views/LearningAnalytics';
import { AICurriculumGenerator } from './components/views/AICurriculumGenerator';
import { ParentAIAssistant } from './components/views/ParentAIAssistant';
import { PredictiveIntelligence } from './components/views/PredictiveIntelligence';
import { ComputerVisionLab } from './components/views/ComputerVisionLab';
import { BusinessIntelligence } from './components/views/BusinessIntelligence';
import { Marketplace } from './components/views/Marketplace';
import { WhiteLabelManagement } from './components/views/WhiteLabelManagement';
import { CommunicationCenter } from './components/views/CommunicationCenter';
import { SubscriptionPlansView } from './components/views/SubscriptionPlansView';

const MainContent: React.FC = () => {
  const { isLoggedIn, currentRole, activeSection } = useApp();

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  // Check role authorization for requested section
  const isAuthorized = isRoleAuthorized(currentRole, activeSection);

  const renderSection = () => {
    if (!isAuthorized) {
      return <AccessRestricted requestedSection={activeSection} />;
    }

    switch (activeSection) {
      // Subscriptions & Licensing
      case 'subscriptions':
        return <SubscriptionPlansView />;

      // Executive & Platform Management
      case 'platform_overview':
      case 'executive_dashboard':
      case 'org_performance':
      case 'reports':
      case 'executive_reports':
        return <ExecutiveDashboard />;

      // Multi-Branch & Regional Operations
      case 'organisations':
      case 'branches':
      case 'regional_performance':
      case 'regional_dashboard':
      case 'branch_comparison':
        return <RegionalDashboard />;

      // Branch Manager Operations
      case 'branch_dashboard':
      case 'classrooms':
      case 'teachers':
      case 'therapists':
      case 'staff_analytics':
      case 'staff_scheduling':
      case 'inventory':
        return <BranchDashboard />;

      // Teacher Workspace
      case 'teacher_dashboard':
      case 'my_classroom':
      case 'attendance':
      case 'attendance_analytics':
      case 'daily_activities':
      case 'calendar':
        return <TeacherDashboard />;

      // Therapy & Clinical Workspaces
      case 'therapist_workspace':
      case 'speech_therapy_dashboard':
      case 'ot_therapy_dashboard':
      case 'aba_therapy_dashboard':
      case 'psychology_dashboard':
      case 'early_intervention_dashboard':
      case 'early_intervention':
      case 'social_emotional_tracking':
      case 'mood_wellbeing':
        return <TherapistDashboard />;

      case 'early_risk_detection':
      case 'risk_alerts':
      case 'predictive_intelligence':
        return <PredictiveIntelligence />;

      // Finance & Billing
      case 'finance_portal':
      case 'finance_dashboard':
      case 'branch_finance':
      case 'invoices':
      case 'payments':
      case 'outstanding_fees':
      case 'discounts':
      case 'refunds':
      case 'revenue_by_branch':
      case 'revenue_by_child':
      case 'collection_analytics':
      case 'payment_forecast':
      case 'finance_reports':
        return <FinanceDashboard />;

      // Sales & Admissions CRM
      case 'sales_crm':
      case 'sales_dashboard':
      case 'leads':
      case 'enquiries':
      case 'nursery_tours':
      case 'applications':
      case 'admissions':
      case 'admissions_pipeline':
      case 'follow_ups':
      case 'conversion_analytics':
      case 'branch_capacity':
      case 'sales_forecast':
      case 'sales_reports':
        return <SalesCRMDashboard />;

      // Marketing Hub
      case 'marketing_hub':
      case 'marketing_dashboard':
      case 'campaigns':
      case 'lead_sources':
      case 'website_enquiries':
      case 'social_media_performance':
      case 'newsletter_campaigns':
      case 'branch_demand':
      case 'marketing_analytics':
      case 'cost_per_lead':
      case 'marketing_reports':
        return <MarketingDashboard />;

      // Parent Portal
      case 'parent_portal':
      case 'parent_home':
      case 'parent_my_child':
      case 'parent_daily_updates':
      case 'parent_dev_progress':
      case 'parent_learning_activities':
      case 'parent_therapy_progress':
      case 'parent_home_activities':
      case 'parent_attendance':
      case 'parent_payments':
      case 'parent_events':
      case 'parent_documents':
      case 'parent_notifications':
        return <ParentPortalDashboard />;

      // Security & Audit Logs
      case 'audit_logs':
      case 'users_roles':
      case 'security':
      case 'system_health':
      case 'alerts_approvals':
        return <AuditLogsView />;

      // Domain & AI Views
      case 'children_directory':
      case 'children_overview':
      case 'children':
      case 'my_children':
      case 'assigned_children':
        return <ChildrenDirectory />;

      case 'digital_twin':
      case 'child_digital_twin':
        return <ChildDigitalTwin />;

      case 'ai_assessment_centre':
      case 'speech_assessments':
      case 'ot_assessments':
      case 'behaviour_assessments':
      case 'emotional_assessments':
      case 'developmental_screening':
      case 'voice_analysis':
        return <AIAssessmentCentre />;

      case 'clinical_ai_suite':
      case 'observations':
      case 'abc_behaviour_logs':
      case 'behaviour_analytics':
      case 'ai_speech_therapist':
      case 'ai_ot_therapist':
      case 'ai_behavioural_analyst':
      case 'ai_psychologist':
      case 'ai_early_intervention_assistant':
      case 'clinical_reports':
      case 'session_notes':
      case 'multidisciplinary_reviews':
        return <ClinicalAISuite />;

      case 'recommendations':
        return <RecommendationEngine />;

      case 'therapy_plans':
      case 'intervention_plans':
      case 'therapy_sessions':
      case 'goals_progress':
      case 'goals_milestones':
        return <TherapyPlanBuilder />;

      case 'learning_analytics':
      case 'child_dev_analytics':
        return <LearningAnalytics />;

      case 'curriculum_generator':
      case 'lesson_plans':
      case 'ai_curriculum':
        return <AICurriculumGenerator />;

      case 'parent_ai':
      case 'parent_ai_assistant':
      case 'parent_home_programme':
      case 'parent_guidance':
        return <ParentAIAssistant />;

      case 'computer_vision_lab':
      case 'movement_analysis':
      case 'drawing_analysis':
        return <ComputerVisionLab />;

      case 'business_intelligence':
      case 'ai_config':
      case 'ai_performance':
        return <BusinessIntelligence />;

      case 'marketplace':
      case 'marketplace_management':
        return <Marketplace />;

      case 'white_label':
      case 'whitelabel':
      case 'integrations':
      case 'settings':
        return <WhiteLabelManagement />;

      case 'communication':
      case 'parent_engagement':
      case 'parent_messages':
        return <CommunicationCenter />;

      default:
        return <ExecutiveDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Interactive Top Demo Flow Launcher Bar */}
      <DemoFlowBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Application Column */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-[calc(100vh-2.5rem)]">
          {/* Header */}
          <Header />

          {/* Dynamic Active Section Workspace */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderSection()}
          </main>

          {/* High Density Theme Footer */}
          <footer className="bg-white dark:bg-[#102A43] border-t border-slate-200 dark:border-slate-800 py-2.5 px-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-1 mt-auto">
            <p>AI-generated decision-support insight. Final review and approval by a qualified professional is required.</p>
            <p>&copy; 2026 Schoology AI Enterprise White-Label Platform</p>
          </footer>
        </div>
      </div>

      {/* Global AI Copilot Floating Drawer */}
      <AIAssistantModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
