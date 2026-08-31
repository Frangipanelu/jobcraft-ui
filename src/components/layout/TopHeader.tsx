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

      {/* Center/Right controls: Search Bar & Status */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Search bar */}
        <div className="hidden lg:flex items-center relative">
          <Search className="w-3.5 h-3.5 text-[#8A908C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索岗位、经历资产或面试考点..."
            className="w-64 pl-9 pr-4 py-1.5 text-xs rounded-full bg-[#F5F5F2] border border-[#E6E6E1] focus:border-[#3E6256] focus:bg-white focus:outline-none transition text-[#1D201F] placeholder:text-[#8A908C]"
          />
        </div>

        {/* Operational Status Dot */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF2EE] border border-[#D3E2DB] text-xs">
          <div className="w-2 h-2 rounded-full bg-[#3E6256]" />
          <span className="text-[#2D4B41] font-medium text-[11px]">闭环引擎: 正常运行</span>
        </div>

        {currentTab === 'workbench' && (
          <button
            onClick={onOpenNewJob}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>添加岗位</span>
          </button>
        )}

        {currentTab === 'interview_prep_center' && (
          <button
            onClick={onOpenNewInterview}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新建面试准备</span>
          </button>
        )}
      </div>
    </header>
  );
};
