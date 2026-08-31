import React, { useState } from 'react';
import { JobCraftProvider, useJobCraft } from './context/JobCraftContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { ToastContainer } from './components/common/Toast';

// Views
import { WorkbenchView } from './components/workbench/WorkbenchView';
import { ExperiencesView } from './components/experiences/ExperiencesView';
import { JobsListView } from './components/jobs/JobsListView';
import { JobWorkspaceView } from './components/jobs/JobWorkspaceView';
import { JDAnalysisCenterView } from './components/jd/JDAnalysisCenterView';
import { JDReportDetailView } from './components/jd/JDReportDetailView';
import { ResumeEditorView } from './components/resume/ResumeEditorView';
import { InterviewPrepCenterView } from './components/interview/InterviewPrepCenterView';
import { InterviewPrepWorkspaceView } from './components/interview/InterviewPrepWorkspaceView';
import { InterviewReviewCenterView } from './components/review/InterviewReviewCenterView';
import { InterviewReviewDetailView } from './components/review/InterviewReviewDetailView';
import { UserProfileView } from './components/user/UserProfileView';

// Modals
import { NewJobModal } from './components/jobs/NewJobModal';
import { NewInterviewModal } from './components/interview/NewInterviewModal';
import { MockInterviewModal } from './components/interview/MockInterviewModal';
import { NewReviewModal } from './components/review/NewReviewModal';

const MainLayout: React.FC = () => {
  const {
    currentTab,
    selectedJobId,
    selectedInterviewId,
    selectedJDId,
    selectedExperienceId
  } = useJobCraft();

  // Modals state
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [isNewInterviewModalOpen, setIsNewInterviewModalOpen] = useState(false);
  const [isNewReviewModalOpen, setIsNewReviewModalOpen] = useState(false);
  const [mockInterviewId, setMockInterviewId] = useState<string | null>(null);

  const handleOpenMockInterview = (interviewId: string) => {
    setMockInterviewId(interviewId);
  };

  const handleCloseMockInterview = () => {
    setMockInterviewId(null);
  };

  const renderActiveView = () => {
    switch (currentTab) {
      case 'workbench':
        return (
          <WorkbenchView
            onOpenNewJob={() => setIsNewJobModalOpen(true)}
            onOpenNewInterview={() => setIsNewInterviewModalOpen(true)}
          />
        );

      case 'experiences':
        return <ExperiencesView initialSelectedExpId={selectedExperienceId || undefined} />;

      case 'jobs':
        return <JobsListView onOpenNewJob={() => setIsNewJobModalOpen(true)} />;

      case 'job_workspace':
        return (
          <JobWorkspaceView
            onOpenNewInterview={() => setIsNewInterviewModalOpen(true)}
            onOpenMockInterview={handleOpenMockInterview}
          />
        );

      case 'jd_analysis':
      case 'jd_analysis_center':
        return <JDAnalysisCenterView />;

      case 'jd_report':
        return <JDReportDetailView analysisId={selectedJDId} />;

      case 'resume_editor':
        return <ResumeEditorView jobId={selectedJobId} />;

      case 'interview_prep_center':
        return (
          <InterviewPrepCenterView
            onOpenNewInterview={() => setIsNewInterviewModalOpen(true)}
            onOpenMockInterview={handleOpenMockInterview}
          />
        );

      case 'interview_prep_workspace':
        return (
          <InterviewPrepWorkspaceView
            interviewId={selectedInterviewId}
            onOpenMockInterview={handleOpenMockInterview}
            onOpenNewReview={() => setIsNewReviewModalOpen(true)}
          />
        );

      case 'interview_review_center':
        return (
          <InterviewReviewCenterView
            onOpenNewReview={() => setIsNewReviewModalOpen(true)}
          />
        );

      case 'interview_review_detail':
        return (
          <InterviewReviewDetailView
            interviewId={selectedInterviewId}
          />
        );

      case 'user_profile':
        return <UserProfileView />;

      default:
        return (
          <WorkbenchView
            onOpenNewJob={() => setIsNewJobModalOpen(true)}
            onOpenNewInterview={() => setIsNewInterviewModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 antialiased overflow-hidden selection:bg-emerald-200 selection:text-emerald-900">
      {/* 1. Left Vertical Fixed Navigation (Section 5) */}
      <Sidebar
        onOpenNewJob={() => setIsNewJobModalOpen(true)}
        onOpenNewInterview={() => setIsNewInterviewModalOpen(true)}
      />

      {/* 2. Right Main Working Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <TopHeader
          onOpenNewJob={() => setIsNewJobModalOpen(true)}
          onOpenNewInterview={() => setIsNewInterviewModalOpen(true)}
        />

        {/* Dynamic Scrollable Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals */}
      <NewJobModal
        isOpen={isNewJobModalOpen}
        onClose={() => setIsNewJobModalOpen(false)}
      />

      <NewInterviewModal
        isOpen={isNewInterviewModalOpen}
        onClose={() => setIsNewInterviewModalOpen(false)}
      />

      <NewReviewModal
        isOpen={isNewReviewModalOpen}
        onClose={() => setIsNewReviewModalOpen(false)}
        defaultInterviewId={selectedInterviewId}
      />

      <MockInterviewModal
        isOpen={!!mockInterviewId}
        onClose={handleCloseMockInterview}
        interviewId={mockInterviewId || undefined}
      />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <JobCraftProvider>
      <MainLayout />
    </JobCraftProvider>
  );
}
