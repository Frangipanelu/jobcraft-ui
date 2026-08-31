import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import { JobStatus } from '../../types/jobcraft';
import {
  Briefcase,
  Search,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  MoreVertical,
  Filter
} from 'lucide-react';

interface JobsListViewProps {
  onOpenNewJob: () => void;
}

export const JobsListView: React.FC<JobsListViewProps> = ({ onOpenNewJob }) => {
  const { jobs, navigateTo, updateJobStatus } = useJobCraft();
  const [activeFilter, setActiveFilter] = useState<'all' | JobStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter((job) => {
    const matchesFilter = activeFilter === 'all' || job.status === activeFilter;
    const matchesSearch =
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.department && job.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'interviewing':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">面试中</span>;
      case 'delivered':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF2EB] text-[#8F5128] border border-[#F0DFD1]">已投递</span>;
      case 'pending':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F5F5F2] text-[#6B726F] border border-[#E6E6E1]">待处理</span>;
      case 'finished':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F5F5F2] text-[#8A908C] border border-[#E6E6E1]">已结束</span>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E6E1] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1D201F] tracking-tight">我的岗位申请</h1>
          <p className="text-sm text-[#6B726F] mt-0.5">
            统一管理推进中的所有求职机会，每个岗位均可沉淀 JD 分析、定制简历与多轮面试
          </p>
        </div>
        <button
          onClick={onOpenNewJob}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold shadow-xs transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ 添加岗位</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-[#E6E6E1] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === 'all'
                ? 'bg-[#1D201F] text-white'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            全部 ({jobs.length})
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === 'pending'
                ? 'bg-[#1D201F] text-white'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            待处理 ({jobs.filter((j) => j.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveFilter('delivered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === 'delivered'
                ? 'bg-[#1D201F] text-white'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            已投递 ({jobs.filter((j) => j.status === 'delivered').length})
          </button>
          <button
            onClick={() => setActiveFilter('interviewing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === 'interviewing'
                ? 'bg-[#3E6256] text-white'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            面试中 ({jobs.filter((j) => j.status === 'interviewing').length})
          </button>
          <button
            onClick={() => setActiveFilter('finished')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === 'finished'
                ? 'bg-[#1D201F] text-white'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            已结束 ({jobs.filter((j) => j.status === 'finished').length})
          </button>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-[#8A908C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索公司、岗位或部门..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#E6E6E1] bg-[#F5F5F2] focus:bg-white focus:outline-none focus:border-[#3E6256] text-[#1D201F] placeholder:text-[#8A908C]"
          />
        </div>
      </div>

      {/* Jobs Table / Cards */}
      <div className="space-y-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl border border-[#E6E6E1] p-5 shadow-2xs hover:border-[#3E6256]/50 transition flex flex-col lg:flex-row lg:items-center justify-between gap-5"
          >
            {/* Left: Info */}
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-base font-bold text-[#1D201F]">{job.company}</span>
                <span className="text-[#D5D5CE]">·</span>
                <span className="text-base font-semibold text-[#2C302E]">{job.role}</span>
                {getStatusBadge(job.status)}
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#E8F1EC] text-[#2D4B41] font-semibold border border-[#D3E2DB]">
                  匹配度 {job.matchScore}%
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#6B726F] flex-wrap">
                <span>{job.department || '核心团队'}</span>
                <span>·</span>
                <span className="text-[#1D201F] font-medium">{job.salaryRange}</span>
                <span>·</span>
                <span>申请日期: {job.applyDate}</span>
                <span>·</span>
                <span>更新: {job.lastUpdated}</span>
              </div>

              {/* Status checklist pipeline */}
              <div className="flex items-center gap-3 text-xs text-[#6B726F] pt-1">
                <span className="font-semibold text-[#1D201F]">阶段: {job.currentStage}</span>
                <span className="text-[#D5D5CE]">|</span>
                <span className="text-[#6B726F]">下一步: {job.nextAction}</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <select
                value={job.status}
                onChange={(e) => updateJobStatus(job.id, e.target.value as JobStatus)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-[#E6E6E1] text-[#1D201F] bg-[#F5F5F2] focus:outline-none"
              >
                <option value="pending">状态: 待处理</option>
                <option value="delivered">状态: 已投递</option>
                <option value="interviewing">状态: 面试中</option>
                <option value="finished">状态: 已结束</option>
              </select>

              <button
                onClick={() => navigateTo('job_workspace', { jobId: job.id })}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold shadow-xs transition"
              >
                <span>进入岗位空间</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-[#E6E6E1] p-8 space-y-3">
            <Briefcase className="w-8 h-8 text-[#8A908C] mx-auto" />
            <h3 className="text-sm font-bold text-[#1D201F]">未找到匹配的岗位</h3>
            <p className="text-xs text-[#6B726F] max-w-sm mx-auto">
              尝试清除筛选条件，或直接添加新的目标岗位。
            </p>
            <button
              onClick={onOpenNewJob}
              className="px-4 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold"
            >
              + 添加新的岗位
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
