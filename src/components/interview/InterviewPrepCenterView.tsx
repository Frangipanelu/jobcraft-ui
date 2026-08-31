import React from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  BookOpenCheck,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface InterviewPrepCenterViewProps {
  onOpenNewInterview: () => void;
  onOpenMockInterview: (interviewId: string) => void;
}

export const InterviewPrepCenterView: React.FC<InterviewPrepCenterViewProps> = ({
  onOpenNewInterview,
  onOpenMockInterview
}) => {
  const { interviews, navigateTo } = useJobCraft();

  const upcomingInterviews = interviews.filter((i) => i.status === 'upcoming' || i.status === 'preparing');
  const completedInterviews = interviews.filter((i) => i.status === 'completed');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E6E1] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1D201F] tracking-tight">面试准备任务中心</h1>
          <p className="text-sm text-[#6B726F] mt-0.5">
            为下一场真实面试做好充分准备。AI 会结合目标公司、具体岗位与面试官类型制定专属答辩方案。
          </p>
        </div>
        <button
          onClick={onOpenNewInterview}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold shadow-xs transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ 新建面试准备</span>
        </button>
      </div>

      {/* Upcoming & Preparing Group */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#3E6256]" />
            <h2 className="text-base font-bold text-[#1D201F]">即将面试与准备中</h2>
          </div>
          <span className="text-xs text-[#8A908C] font-medium">{upcomingInterviews.length} 场待推进</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upcomingInterviews.map((interview) => {
            const prep = interview.preparation;
            const highFreqCount = prep.highFreqQuestions.length;
            const preparedCount = prep.highFreqQuestions.filter((q) => q.isPrepared).length;

            return (
              <div
                key={interview.id}
                className="bg-white rounded-2xl border border-[#E6E6E1] p-6 shadow-2xs hover:border-[#3E6256]/50 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#1D201F] text-base">{interview.company}</span>
                        <span className="text-[#D5D5CE]">·</span>
                        <span className="font-semibold text-[#2C302E] text-base">{interview.role}</span>
                      </div>
                      <div className="text-xs font-semibold text-[#3E6256] mt-0.5">
                        {interview.roundName}
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
                      准备度 {interview.readinessPercent}%
                    </span>
                  </div>

                  <div className="text-xs text-[#6B726F] flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#8A908C]" />
                    <span className="font-medium text-[#1D201F]">时间：{interview.time}</span>
                    {interview.interviewer && (
                      <>
                        <span>·</span>
                        <span>面试官：{interview.interviewer}</span>
                      </>
                    )}
                  </div>

                  {/* Preparation Checklist items */}
                  <div className="p-3 bg-[#F5F5F2] rounded-xl border border-[#E6E6E1] space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2 text-[#2C302E] font-medium">
                      <div className="flex items-center gap-1.5 text-[#2D4B41]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6256]" />
                        <span>公司与业务研究 ✓</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#2D4B41]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6256]" />
                        <span>考点与策略预判 ✓</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#2D4B41]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6256]" />
                        <span>重点经历调取 ({prep.recommendedExperiences.length}篇)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#1D201F] font-semibold">
                        <span className="text-[#3E6256] font-bold">高频问题：</span>
                        <span>{preparedCount} / {highFreqCount} 已准备</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#F5F5F2]">
                  <button
                    onClick={() => onOpenMockInterview(interview.id)}
                    className="px-3 py-2 rounded-lg bg-[#E8F1EC] hover:bg-[#D3E2DB] text-[#2D4B41] text-xs font-semibold border border-[#D3E2DB] transition flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#3E6256]" />
                    <span>模拟面试</span>
                  </button>

                  <button
                    onClick={() =>
                      navigateTo('interview_prep_workspace', {
                        jobId: interview.jobId,
                        interviewId: interview.id
                      })
                    }
                    className="flex-1 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-bold transition text-center shadow-2xs flex items-center justify-center gap-1"
                  >
                    <span>继续准备方案</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Interviews */}
      {completedInterviews.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-[#E6E6E1]">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1D201F]">历史已完成面试</h2>
            <span className="text-xs text-[#8A908C]">{completedInterviews.length} 场已归档</span>
          </div>

          <div className="space-y-3">
            {completedInterviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-white p-5 rounded-xl border border-[#E6E6E1] flex items-center justify-between gap-4 shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1D201F] text-sm">{interview.company}</span>
                    <span className="text-[#D5D5CE]">·</span>
                    <span className="font-semibold text-[#2C302E] text-sm">{interview.roundName}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#F5F5F2] text-[#6B726F] border border-[#E6E6E1]">已完成</span>
                  </div>
                  <div className="text-xs text-[#8A908C] mt-1">面试时间: {interview.time}</div>
                </div>

                <div className="flex items-center gap-2">
                  {interview.review && (
                    <button
                      onClick={() =>
                        navigateTo('interview_review_detail', {
                          jobId: interview.jobId,
                          interviewId: interview.id
                        })
                      }
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F5F5F2] hover:bg-[#E8F1EC] text-[#1D201F] hover:text-[#2D4B41] border border-[#E6E6E1] transition"
                    >
                      查看智能复盘 ({interview.review.overallScore}分)
                    </button>
                  )}
                  <button
                    onClick={() =>
                      navigateTo('interview_prep_workspace', {
                        jobId: interview.jobId,
                        interviewId: interview.id
                      })
                    }
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white hover:bg-[#F5F5F2] text-[#1D201F] border border-[#E6E6E1] transition"
                  >
                    查看准备归档
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
