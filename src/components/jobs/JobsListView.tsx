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
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">面试中</span>;
      case 'delivered':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">已投递</span>;
      case 'pending':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">待处理</span>;
      case 'finished':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-200 text-slate-600">已结束</span>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">我的岗位申请</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            统一管理推进中的所有求职机会，每个岗位均可沉淀 JD 分析、定制简历与多轮面试
          </p>
        </div>
        <button
          onClick={onOpenNewJob}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ 新建岗位</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            全部 ({jobs.length})
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === 'pending'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            待处理 ({jobs.filter((j) => j.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveFilter('delivered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === 'delivered'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            已投递 ({jobs.filter((j) => j.status === 'delivered').length})
          </button>
          <button
            onClick={() => setActiveFilter('interviewing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === 'interviewing'
                ? 'bg-emerald-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            面试中 ({jobs.filter((j) => j.status === 'interviewing').length})
          </button>
          <button
            onClick={() => setActiveFilter('finished')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === 'finished'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            已结束 ({jobs.filter((j) => j.status === 'finished').length})
          </button>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索公司、岗位或部门..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Jobs Table / Cards */}
      <div className="space-y-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:border-emerald-300 transition flex flex-col lg:flex-row lg:items-center justify-between gap-5"
          >
            {/* Left: Info */}
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-base font-bold text-slate-900">{job.company}</span>
                <span className="text-slate-300">·</span>
                <span className="text-base font-semibold text-slate-800">{job.role}</span>
                {getStatusBadge(job.status)}
                <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                  匹配度 {job.matchScore}%
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                <span>{job.department || '核心团队'}</span>
                <span>·</span>
                <span className="text-slate-700 font-medium">{job.salaryRange}</span>
                <span>·</span>
                <span>申请日期: {job.applyDate}</span>
                <span>·</span>
                <span>更新: {job.lastUpdated}</span>
              </div>

              {/* Status checklist pipeline */}
              <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                <span className="font-semibold text-slate-700">阶段: {job.currentStage}</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">下一步: {job.nextAction}</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <select
                value={job.status}
                onChange={(e) => updateJobStatus(job.id, e.target.value as JobStatus)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-700 bg-slate-50 focus:outline-none"
              >
                <option value="pending">状态: 待处理</option>
                <option value="delivered">状态: 已投递</option>
                <option value="interviewing">状态: 面试中</option>
                <option value="finished">状态: 已结束</option>
              </select>

              <button
                onClick={() => navigateTo('job_workspace', { jobId: job.id })}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition"
              >
                <span>进入岗位空间</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300 p-8 space-y-3">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">未找到匹配的岗位</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              尝试清除筛选条件，或直接添加新的目标岗位。
            </p>
            <button
              onClick={onOpenNewJob}
              className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
            >
              + 添加新的岗位
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
