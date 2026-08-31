import React from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Search,
  ExternalLink,
  Plus
} from 'lucide-react';

interface TopHeaderProps {
  onOpenNewJob: () => void;
  onOpenNewInterview: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenNewJob,
  onOpenNewInterview
}) => {
  const { currentTab, navigateTo, selectedJobId, selectedInterviewId, jobs, interviews } = useJobCraft();

  const currentJob = jobs.find((j) => j.id === selectedJobId);
  const currentInterview = interviews.find((i) => i.id === selectedInterviewId);

  return (
    <header className="h-16 bg-white border-b border-[#E6E6E1] px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-2xs">
      {/* Breadcrumb path */}
      <div className="flex items-center gap-2 text-xs text-[#6B726F] font-medium overflow-hidden">
        <button
          onClick={() => navigateTo('workbench')}
          className="hover:text-[#3E6256] transition font-medium flex items-center gap-1 text-[#1D201F]"
        >
          工作台
        </button>

        {currentTab === 'jobs' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <span className="text-[#1D201F] font-semibold">我的岗位</span>
          </>
        )}

        {currentTab === 'job_workspace' && currentJob && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <button
              onClick={() => navigateTo('jobs')}
              className="hover:text-[#3E6256] transition text-[#6B726F]"
            >
              我的岗位
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <span className="text-[#1D201F] font-semibold truncate">
              {currentJob.company} · {currentJob.role}
            </span>
          </>
        )}

        {(currentTab === 'jd_analysis' || currentTab === 'jd_analysis_center') && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <span className="text-[#1D201F] font-semibold">JD 分析中心</span>
          </>
        )}

        {currentTab === 'jd_report' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <button
              onClick={() => navigateTo('jd_analysis')}
              className="hover:text-[#3E6256] transition text-[#6B726F]"
            >
              JD 分析中心
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <span className="text-[#1D201F] font-semibold">
              {currentJob ? `${currentJob.company} · JD 深度分析报告` : 'JD 深度分析报告'}
            </span>
          </>
        )}

        {currentTab === 'resume_editor' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            {currentJob && (
              <>
                <button
                  onClick={() => navigateTo('job_workspace', { jobId: currentJob.id })}
                  className="hover:text-[#3E6256] transition text-[#6B726F]"
                >
                  {currentJob.company}
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
              </>
            )}
            <span className="text-[#1D201F] font-semibold">定制简历工作区</span>
          </>
        )}

        {currentTab === 'interview_prep_center' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <span className="text-[#1D201F] font-semibold">面试准备任务中心</span>
          </>
        )}

        {currentTab === 'interview_prep_workspace' && currentInterview && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <button
              onClick={() => navigateTo('interview_prep_center')}
              className="hover:text-[#3E6256] transition text-[#6B726F]"
            >
              面试准备
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <span className="text-[#1D201F] font-semibold truncate">
              {currentInterview.company} · {currentInterview.roundName}
            </span>
          </>
        )}

        {currentTab === 'interview_review_center' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <span className="text-[#1D201F] font-semibold">面试复盘中心</span>
          </>
        )}

        {currentTab === 'interview_review_detail' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <button
              onClick={() => navigateTo('interview_review_center')}
              className="hover:text-[#3E6256] transition text-[#6B726F]"
            >
              面试复盘
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <span className="text-[#1D201F] font-semibold">
              字节跳动 · 第1面业务面 · 智能复盘报告
            </span>
          </>
        )}

        {currentTab === 'experiences' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#A6ACA8] shrink-0" />
            <span className="text-[#1D201F] font-semibold">我的经历资产库</span>
          </>
        )}
      </div>

      {/* Right controls: User Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* User Account Display */}
        <div className="flex items-center gap-3 pl-2 py-1 pr-3 rounded-full bg-[#F5F5F2] border border-[#E6E6E1] hover:border-[#D5D5CE] transition cursor-pointer select-none">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="菁菁"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-[#3E6256]/40 shrink-0"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#3E6256] ring-1.5 ring-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-[#1D201F] leading-tight">菁菁 (Jinelle)</span>
            <span className="text-[10px] text-[#6B726F] leading-tight">AI 产品专家</span>
          </div>
        </div>
      </div>
    </header>
  );
};
