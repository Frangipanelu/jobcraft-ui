import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  Briefcase,
  ArrowLeft,
  FileSearch,
  FileText,
  BookOpenCheck,
  RotateCcw,
  Sparkles,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { JDReportDetailView } from '../jd/JDReportDetailView';
import { ResumeEditorView } from '../resume/ResumeEditorView';

interface JobWorkspaceViewProps {
  onOpenNewInterview: () => void;
  onOpenMockInterview: (interviewId: string) => void;
}

export const JobWorkspaceView: React.FC<JobWorkspaceViewProps> = ({
  onOpenNewInterview,
  onOpenMockInterview
}) => {
  const {
    selectedJobId,
    jobs,
    interviews,
    jdAnalyses,
    navigateTo,
    jobWorkspaceSubTab
  } = useJobCraft();

  const [activeTab, setActiveTab] = useState<'jd' | 'resume' | 'interview'>(jobWorkspaceSubTab || 'jd');

  const currentJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
  const jobInterviews = interviews.filter((i) => i.jobId === currentJob?.id);
  const currentJD = jdAnalyses.find((a) => a.id === currentJob?.jdAnalysisId || a.jobId === currentJob?.id);

  if (!currentJob) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-slate-500">未找到岗位信息</p>
        <button
          onClick={() => navigateTo('jobs')}
          className="mt-2 px-4 py-1.5 bg-emerald-700 text-white rounded-lg text-xs"
        >
          返回岗位列表
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. Job Context Container Header (Section 8.1) */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 shadow-2xs">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Breadcrumb Back */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateTo('jobs')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-700 font-medium transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回我的岗位列表</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">投递时间: {currentJob.applyDate}</span>
              <span className="text-slate-300">·</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                  currentJob.status === 'interviewing'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {currentJob.status === 'interviewing'
                  ? '面试推进中'
                  : currentJob.status === 'delivered'
                  ? '已投递'
                  : '待处理'}
              </span>
            </div>
          </div>

          {/* Job Identity */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-[#1D201F] tracking-tight">
                  {currentJob.company} · {currentJob.role}
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
                  综合匹配度 {currentJob.matchScore}%
                </span>
              </div>
              <p className="text-xs text-[#6B726F] mt-1 flex items-center gap-2">
                <span>{currentJob.department}</span>
                <span>·</span>
                <span className="font-medium text-[#1D201F]">{currentJob.salaryRange}</span>
                <span>·</span>
                <span className="text-[#6B726F]">当前阶段：{currentJob.currentStage}</span>
              </p>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => onOpenMockInterview(jobInterviews[0]?.id || 'int-byte-2')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#E8F1EC] hover:bg-[#D3E2DB] text-[#2D4B41] border border-[#D3E2DB] text-xs font-semibold transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#3E6256]" />
                <span>进入模拟面试</span>
              </button>

              <button
                onClick={onOpenNewInterview}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold shadow-xs transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ 新建面试</span>
              </button>
            </div>
          </div>

          {/* 2. Top Sub-Tabs Navigation (Section 8.2: JD分析 | 定制简历 | 面试) */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#E6E6E1]">
            <button
              onClick={() => setActiveTab('jd')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'jd'
                  ? 'bg-[#1D201F] text-white shadow-xs'
                  : 'text-[#6B726F] hover:bg-[#F5F5F2]'
              }`}
            >
              <FileSearch className="w-4 h-4" />
              <span>JD 深度分析</span>
              {currentJD && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#3E6256] text-white">
                  {currentJD.matchScore}% 匹配
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('resume')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'resume'
                  ? 'bg-[#1D201F] text-white shadow-xs'
                  : 'text-[#6B726F] hover:bg-[#F5F5F2]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>定制简历</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#E8F1EC] text-[#2D4B41]">
                证据驱动
              </span>
            </button>

            <button
              onClick={() => setActiveTab('interview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'interview'
                  ? 'bg-[#1D201F] text-white shadow-xs'
                  : 'text-[#6B726F] hover:bg-[#F5F5F2]'
              }`}
            >
              <BookOpenCheck className="w-4 h-4" />
              <span>面试中心 ({jobInterviews.length} 轮)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub-Tab Dynamic Viewport */}
      <div className="flex-1">
        {activeTab === 'jd' && (
          <div className="animate-in fade-in duration-200">
            <JDReportDetailView
              analysisId={currentJob.jdAnalysisId || 'jd-byte-1'}
              onNavigateToResume={() => setActiveTab('resume')}
              onNavigateToInterview={() => setActiveTab('interview')}
            />
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="animate-in fade-in duration-200">
            <ResumeEditorView
              resumeId={currentJob.resumeId || 'res-byte-1'}
              jobId={currentJob.id}
            />
          </div>
        )}

        {activeTab === 'interview' && (
          <div className="max-w-7xl mx-auto p-8 space-y-6 animate-in fade-in duration-200">
            {/* Interview Center Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {currentJob.company} · 多轮面试推进
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  每轮面试拥有专属的考点预判、高频题库、公司研判以及赛后复盘沉淀
                </p>
              </div>
              <button
                onClick={onOpenNewInterview}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ 新建面试轮次</span>
              </button>
            </div>

            {/* Rounds List (Section 12) */}
            <div className="space-y-4">
              {jobInterviews.map((interview) => {
                const isUpcoming = interview.status === 'upcoming';
                const isCompleted = interview.status === 'completed';

                return (
                  <div
                    key={interview.id}
                    className={`bg-white rounded-xl border p-6 shadow-2xs transition ${
                      isUpcoming
                        ? 'border-emerald-300 ring-1 ring-emerald-100'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left: Info */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className="text-base font-bold text-slate-900">
                            {interview.roundName}
                          </span>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-md font-semibold ${
                              isUpcoming
                                ? 'bg-emerald-100 text-emerald-800'
                                : isCompleted
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {isUpcoming ? '即将进行' : isCompleted ? '已完成' : '准备中'}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            时间：{interview.time}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 flex items-center gap-3 flex-wrap">
                          <span>形式：{interview.format === 'video' ? '视频面试' : interview.format === 'phone' ? '电话面试' : '现场面试'}</span>
                          {interview.interviewer && (
                            <>
                              <span>·</span>
                              <span>面试官：{interview.interviewer}</span>
                            </>
                          )}
                          <span>·</span>
                          <span className="font-semibold text-emerald-800">
                            准备度 {interview.readinessPercent}%
                          </span>
                        </div>

                        {interview.supplementNotes && (
                          <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 mt-2">
                            <strong className="text-slate-700 font-semibold">HR/背景提醒：</strong> {interview.supplementNotes}
                          </p>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                        {isCompleted && interview.review && (
                          <button
                            onClick={() =>
                              navigateTo('interview_review_detail', {
                                jobId: currentJob.id,
                                interviewId: interview.id
                              })
                            }
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-emerald-700" />
                            <span>查看复盘报告 ({interview.review.overallScore}分)</span>
                          </button>
                        )}

                        <button
                          onClick={() =>
                            navigateTo('interview_prep_workspace', {
                              jobId: currentJob.id,
                              interviewId: interview.id
                            })
                          }
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition"
                        >
                          <BookOpenCheck className="w-3.5 h-3.5" />
                          <span>{isCompleted ? '查看准备方案' : '进入准备空间'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {jobInterviews.length === 0 && (
                <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-200">
                  <p className="text-sm text-slate-500">本岗位暂未安排面试轮次</p>
                  <button
                    onClick={onOpenNewInterview}
                    className="mt-3 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-lg"
                  >
                    + 新建第1面准备
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
