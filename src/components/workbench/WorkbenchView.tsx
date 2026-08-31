import React from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  FileSearch,
  BookOpenCheck,
  RotateCcw,
  FileText,
  Plus,
  Compass,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

interface WorkbenchViewProps {
  onOpenNewJob: () => void;
  onOpenNewInterview: () => void;
  onOpenNewReview: () => void;
}

export const WorkbenchView: React.FC<WorkbenchViewProps> = ({
  onOpenNewJob,
  onOpenNewInterview,
  onOpenNewReview
}) => {
  const {
    user,
    jobs,
    nextActions,
    activities,
    aiSuggestions,
    navigateTo,
    interviews
  } = useJobCraft();

  const deliveredCount = jobs.filter((j) => j.status === 'delivered').length;
  const interviewingCount = jobs.filter((j) => j.status === 'interviewing').length;
  const pendingCount = jobs.filter((j) => j.status === 'pending').length;
  const finishedCount = jobs.filter((j) => j.status === 'finished').length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Greeting & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E6E1] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-[#1D201F] tracking-tight">
              工作台 · 全景推进
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
              {user.role}
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#6B726F] mt-1">
            当前共有 <strong className="text-[#1D201F] font-semibold">{jobs.length} 个目标岗位</strong> 推进中，下一场面试将于 <span className="text-[#3E6256] font-semibold">明天 14:00</span> 进行。
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenNewJob}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ 添加岗位</span>
          </button>
        </div>
      </div>

      {/* 2. Executive Metrics Strip (平整横向指标流，去除笨重的 4 张大卡片) */}
      <div className="bg-white rounded-xl border border-[#E6E6E1] p-4 shadow-2xs grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E6E6E1]">
        <div
          onClick={() => navigateTo('jobs')}
          className="p-3 hover:bg-[#F5F5F2]/50 transition rounded-lg cursor-pointer space-y-1"
        >
          <div className="text-[11px] font-semibold text-[#6B726F] uppercase tracking-wider">已投递岗位</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1D201F]">{deliveredCount + 1}</span>
            <span className="text-[11px] text-[#3E6256] font-semibold">↑ 12.5% 本月</span>
          </div>
        </div>

        <div
          onClick={() => navigateTo('interview_prep_center')}
          className="p-3 hover:bg-[#F5F5F2]/50 transition rounded-lg cursor-pointer space-y-1"
        >
          <div className="text-[11px] font-semibold text-[#6B726F] uppercase tracking-wider">面试中 (待战)</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#3E6256]">{interviewingCount}</span>
            <span className="text-[11px] text-[#2D4B41] font-semibold">高优推进</span>
          </div>
        </div>

        <div
          onClick={() => navigateTo('jobs')}
          className="p-3 hover:bg-[#F5F5F2]/50 transition rounded-lg cursor-pointer space-y-1"
        >
          <div className="text-[11px] font-semibold text-[#6B726F] uppercase tracking-wider">待投递 / 定制中</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#8F5128]">{pendingCount}</span>
            <span className="text-[11px] text-[#8F5128]">需加速对齐</span>
          </div>
        </div>

        <div
          onClick={() => navigateTo('interview_review_center')}
          className="p-3 hover:bg-[#F5F5F2]/50 transition rounded-lg cursor-pointer space-y-1"
        >
          <div className="text-[11px] font-semibold text-[#6B726F] uppercase tracking-wider">已录入复盘</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1D201F]">{interviews.filter((i) => !!i.review).length}</span>
            <span className="text-[11px] text-[#3E6256] font-semibold">100% 反哺率</span>
          </div>
        </div>
      </div>

      {/* 3. Main Section: 优先待办任务议程与最新岗位推进表 (Two-Column Master View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col (7 cols): 优先待办议程与行动清单 */}
        <div className="lg:col-span-7 space-y-6">
          {/* Priority Agenda Table */}
          <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
            <div className="bg-[#F5F5F2] px-5 py-3.5 border-b border-[#E6E6E1] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3E6256]" />
                <h2 className="text-sm font-bold text-[#1D201F]">优先待办与推进日程</h2>
              </div>
              <span className="text-[11px] text-[#8A908C]">根据求职紧迫度智能排序</span>
            </div>

            <div className="divide-y divide-[#E6E6E1]">
              {nextActions.map((action) => (
                <div
                  key={action.id}
                  className="p-4 hover:bg-[#F5F5F2]/40 transition flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                          action.urgency === 'high'
                            ? 'bg-[#FAF2EB] text-[#8F5128] border border-[#F0DFD1]'
                            : 'bg-[#F5F5F2] text-[#6B726F] border border-[#E6E6E1]'
                        }`}
                      >
                        {action.urgency === 'high' ? '高优' : '常规'}
                      </span>
                      <span className="font-bold text-[#1D201F]">{action.title}</span>
                    </div>
                    <p className="text-[#6B726F]">{action.description}</p>
                    <div className="text-[11px] text-[#8A908C] pt-0.5">
                      关联岗位：{action.targetJobTitle} · 截止：{action.dueDate}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (action.actionType === 'interview_prep') {
                        navigateTo('interview_prep_workspace', { jobId: action.targetJobId });
                      } else if (action.actionType === 'resume_custom') {
                        navigateTo('resume_editor', { jobId: action.targetJobId });
                      } else if (action.actionType === 'interview_review') {
                        navigateTo('interview_review', { interviewId: 'int-byte-1' });
                      } else {
                        navigateTo('jobs');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#E8F1EC] hover:bg-[#D3E2DB] text-[#2D4B41] font-semibold text-xs transition shrink-0 self-center flex items-center gap-1 cursor-pointer"
                  >
                    <span>去处理</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Jobs Pipeline Summary */}
          <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
            <div className="bg-[#F5F5F2] px-5 py-3.5 border-b border-[#E6E6E1] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#3E6256]" />
                <h2 className="text-sm font-bold text-[#1D201F]">目标岗位实时推进流水</h2>
              </div>
              <button
                onClick={() => navigateTo('jobs')}
                className="text-xs text-[#3E6256] hover:underline font-semibold"
              >
                查看全部岗位 →
              </button>
            </div>

            <div className="divide-y divide-[#E6E6E1]">
              {jobs.slice(0, 4).map((job) => (
                <div
                  key={job.id}
                  onClick={() => navigateTo('job_workspace', { jobId: job.id })}
                  className="p-4 hover:bg-[#F5F5F2]/40 transition cursor-pointer flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1D201F] text-sm">{job.company}</span>
                      <span className="text-[#8A908C]">·</span>
                      <span className="font-semibold text-[#2C302E]">{job.role}</span>
                    </div>
                    <div className="text-[#6B726F] text-[11px]">
                      {job.salary} · {job.location} · 匹配度 {job.matchScore}%
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        job.status === 'interviewing'
                          ? 'bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]'
                          : job.status === 'delivered'
                          ? 'bg-[#F5F5F2] text-[#6B726F] border border-[#E6E6E1]'
                          : 'bg-[#FAF2EB] text-[#8F5128] border border-[#F0DFD1]'
                      }`}
                    >
                      {job.currentRound || '待投递'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#8A908C]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col (5 cols): AI 智能研判与求职闭环动态 */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Strategy Advisory (结构化策略建议，非花哨卡片) */}
          <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
            <div className="bg-[#F5F5F2] px-5 py-3.5 border-b border-[#E6E6E1] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#3E6256]" />
                <h2 className="text-sm font-bold text-[#1D201F]">AI 阶段性求职策略研判</h2>
              </div>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3.5 bg-[#E8F1EC]/30 rounded-lg border border-[#D3E2DB] space-y-1.5">
                <div className="font-bold text-[#2D4B41] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6256]" />
                  <span>核心优势：端侧 AI 与大模型评测壁垒突出</span>
                </div>
                <p className="text-[#6B726F] leading-relaxed">
                  在字节跳动与小红书的岗位对齐度已达 94% 以上，历史面试得分稳定在 85+，具备头部大厂议价空间。
                </p>
              </div>

              <div className="p-3.5 bg-[#FAF2EB]/40 rounded-lg border border-[#F0DFD1] space-y-1.5">
                <div className="font-bold text-[#8F5128] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#B7794B]" />
                  <span>待强化点：系统吞吐量与极端流量压测经历</span>
                </div>
                <p className="text-[#6B726F] leading-relaxed">
                  蚂蚁与腾讯的二面中均高频提问高并发场景。建议前往经历资产库沉淀补充压测指标。
                </p>
                <button
                  onClick={() => navigateTo('experiences')}
                  className="text-[11px] font-bold text-[#3E6256] hover:underline block pt-1"
                >
                  去经历资产库完善 →
                </button>
              </div>
            </div>
          </div>

          {/* Activity Log / Activity Feed */}
          <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
            <div className="bg-[#F5F5F2] px-5 py-3.5 border-b border-[#E6E6E1] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#3E6256]" />
                <h2 className="text-sm font-bold text-[#1D201F]">经历资产反哺与流转动态</h2>
              </div>
            </div>

            <div className="divide-y divide-[#E6E6E1]">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="p-4 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#8A908C]">
                    <span className="font-semibold text-[#1D201F]">{act.title}</span>
                    <span>{act.timestamp}</span>
                  </div>
                  <p className="text-[#6B726F]">{act.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
