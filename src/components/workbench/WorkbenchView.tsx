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
  Calendar
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
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. Header Greeting & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E6E6E1]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#1D201F] tracking-tight">
              晚上好，{user.name}
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#EBF2EE] text-[#2D4B41] border border-[#D3E2DB]">
              {user.role}
            </span>
          </div>
          <p className="text-sm text-[#6B726F] mt-1">
            当前共有 <strong className="text-[#1D201F] font-semibold">{jobs.length} 个目标岗位</strong> 推进中，下一场面试将于 <span className="text-[#3E6256] font-semibold">明天 14:00</span> 进行。
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNewJob}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ 添加新的岗位</span>
          </button>
        </div>
      </div>

      {/* 2. Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => navigateTo('jobs')}
          className="bg-white p-5 rounded-2xl border border-[#E6E6E1] shadow-xs hover:border-[#3E6256]/50 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[#6B726F] uppercase tracking-wider">
            <span>已投递岗位</span>
            <div className="w-8 h-8 rounded-lg bg-[#F5F5F2] text-[#1D201F] flex items-center justify-center group-hover:bg-[#EBF2EE] group-hover:text-[#3E6256] transition">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#1D201F] mt-2">{deliveredCount + 1}</div>
          <div className="text-[#3E6256] text-xs font-semibold mt-1 flex items-center gap-1">
            <span>↑ 12.5% 本月新增</span>
          </div>
        </div>

        <div
          onClick={() => navigateTo('interview_prep_center')}
          className="bg-white p-5 rounded-2xl border border-[#E6E6E1] shadow-xs hover:border-[#3E6256]/50 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[#6B726F] uppercase tracking-wider">
            <span>面试中</span>
            <div className="w-8 h-8 rounded-lg bg-[#EBF2EE] text-[#3E6256] flex items-center justify-center">
              <BookOpenCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#1D201F] mt-2">{interviewingCount}</div>
          <div className="text-[#3E6256] text-xs font-semibold mt-1 flex items-center gap-1">
            <span>2 轮准备就绪</span>
          </div>
        </div>

        <div
          onClick={() => navigateTo('jobs')}
          className="bg-white p-5 rounded-2xl border border-[#E6E6E1] shadow-xs hover:border-[#3E6256]/50 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[#6B726F] uppercase tracking-wider">
            <span>待处理事项</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF2EB] text-[#B7794B] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#1D201F] mt-2">{pendingCount + nextActions.length}</div>
          <div className="text-[#B7794B] text-xs font-semibold mt-1 flex items-center gap-1">
            <span>需复盘 / 补齐证据</span>
          </div>
        </div>

        <div
          onClick={() => navigateTo('experiences')}
          className="bg-white p-5 rounded-2xl border border-[#E6E6E1] shadow-xs hover:border-[#3E6256]/50 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[#6B726F] uppercase tracking-wider">
            <span>职业经历资产</span>
            <div className="w-8 h-8 rounded-lg bg-[#EBF2EE] text-[#3E6256] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#1D201F] mt-2">18 项</div>
          <div className="text-[#3E6256] text-xs font-semibold mt-1 flex items-center gap-1">
            <span>已结构化至 V4.2</span>
          </div>
        </div>
      </div>

      {/* Visualizer: Career Preparedness & Match Readiness Distribution */}
      <div className="bg-white border border-[#E6E6E1] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-[#1D201F]">岗位备战与能力对齐度分析</h2>
            <p className="text-xs text-[#6B726F]">各技术栈与产品方法论在目标岗位的证据覆盖分布</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B726F] font-medium">近 7 天备战强度</span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#EBF2EE] text-[#2D4B41]">高活跃</span>
          </div>
        </div>

        {/* Chart Bars */}
        <div className="h-44 bg-[#F5F5F2] rounded-xl border border-dashed border-[#E6E6E1] p-4 flex items-end justify-around gap-2">
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-full max-w-[36px] bg-[#3E6256]/60 rounded-t-md transition-all hover:bg-[#3E6256]" style={{ height: '48%' }}></div>
            <span className="text-[10px] text-[#6B726F] font-medium truncate">大模型策略</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-full max-w-[36px] bg-[#3E6256] rounded-t-md transition-all hover:bg-[#325046]" style={{ height: '78%' }}></div>
            <span className="text-[10px] text-[#6B726F] font-medium truncate">评测体系</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-full max-w-[36px] bg-[#2E4B41] rounded-t-md transition-all hover:bg-[#20362F]" style={{ height: '92%' }}></div>
            <span className="text-[10px] text-[#6B726F] font-medium truncate">端到端落地</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-full max-w-[36px] bg-[#B7794B] rounded-t-md transition-all hover:bg-[#9E643A]" style={{ height: '62%' }}></div>
            <span className="text-[10px] text-[#6B726F] font-medium truncate">业务收益量化</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-full max-w-[36px] bg-[#537D70] rounded-t-md transition-all hover:bg-[#3E6256]" style={{ height: '85%' }}></div>
            <span className="text-[10px] text-[#6B726F] font-medium truncate">系统架构理解</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-full max-w-[36px] bg-[#3E6256]/80 rounded-t-md transition-all hover:bg-[#3E6256]" style={{ height: '70%' }}></div>
            <span className="text-[10px] text-[#6B726F] font-medium truncate">高频真题防守</span>
          </div>
        </div>
      </div>

      {/* 3. Main Grid: Active Jobs (Left) + Right Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Jobs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#1D201F]">正在推进的岗位</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF2EE] text-[#2D4B41] font-medium">
                {jobs.length}
              </span>
            </div>
            <button
              onClick={() => navigateTo('jobs')}
              className="text-xs text-[#3E6256] hover:text-[#325046] font-semibold flex items-center gap-1 transition"
            >
              <span>查看全部岗位</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {jobs.map((job) => {
              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-[#E6E6E1] p-6 shadow-xs hover:border-[#3E6256]/40 transition"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-bold text-[#1D201F] text-base">{job.company}</span>
                        <span className="text-[#D5D5CE]">·</span>
                        <span className="font-semibold text-[#2C302E] text-base">{job.role}</span>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-md font-semibold ${
                            job.status === 'interviewing'
                              ? 'bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]'
                              : job.status === 'delivered'
                              ? 'bg-[#FAF2EB] text-[#8F5128] border border-[#F0DFD1]'
                              : 'bg-[#F5F5F2] text-[#6B726F]'
                          }`}
                        >
                          {job.status === 'interviewing'
                            ? '面试推进中'
                            : job.status === 'delivered'
                            ? '已投递'
                            : '待处理'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#6B726F] mt-1.5">
                        <span>{job.direction || job.department}</span>
                        <span>·</span>
                        <span className="font-medium text-[#2C302E]">{job.salaryRange}</span>
                        <span>·</span>
                        <span className="text-[#3E6256] font-semibold">匹配度 {job.matchScore}%</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigateTo('job_workspace', { jobId: job.id })}
                      className="shrink-0 flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#F5F5F2] hover:bg-[#EBF2EE] hover:text-[#2D4B41] text-[#1D201F] text-xs font-semibold border border-[#E6E6E1] transition"
                    >
                      <span>进入岗位</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Flow Stages Pipeline */}
                  <div className="mt-4 pt-4 border-t border-[#F5F5F2]">
                    <div className="flex items-center justify-between text-xs text-[#6B726F] gap-1 overflow-x-auto pb-1">
                      <div className="flex items-center gap-1 text-[#3E6256] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>JD分析</span>
                      </div>
                      <span className="text-[#D5D5CE]">→</span>

                      <div className="flex items-center gap-1 text-[#3E6256] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>经历匹配</span>
                      </div>
                      <span className="text-[#D5D5CE]">→</span>

                      <div className="flex items-center gap-1 text-[#3E6256] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>定制简历</span>
                      </div>
                      <span className="text-[#D5D5CE]">→</span>

                      <div
                        className={`flex items-center gap-1 font-medium ${
                          job.steps.applied ? 'text-[#3E6256]' : 'text-[#A6ACA8]'
                        }`}
                      >
                        {job.steps.applied ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-[#D5D5CE] inline-block" />
                        )}
                        <span>已投递</span>
                      </div>
                      <span className="text-[#D5D5CE]">→</span>

                      <div
                        className={`flex items-center gap-1 font-medium ${
                          job.steps.prepStage === 'done'
                            ? 'text-[#3E6256]'
                            : job.steps.prepStage === 'in_progress'
                            ? 'text-[#3E6256] font-semibold'
                            : 'text-[#A6ACA8]'
                        }`}
                      >
                        {job.steps.prepStage === 'done' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : job.steps.prepStage === 'in_progress' ? (
                          <span className="w-2 h-2 rounded-full bg-[#3E6256] animate-ping inline-block mr-1" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-[#D5D5CE] inline-block" />
                        )}
                        <span>面试准备</span>
                      </div>
                      <span className="text-[#D5D5CE]">→</span>

                      <div
                        className={`flex items-center gap-1 font-medium ${
                          job.steps.reviewStage === 'done'
                            ? 'text-[#3E6256]'
                            : 'text-[#A6ACA8]'
                        }`}
                      >
                        {job.steps.reviewStage === 'done' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-[#D5D5CE] inline-block" />
                        )}
                        <span>面试复盘</span>
                      </div>
                    </div>
                  </div>

                  {/* Next Step Banner & Quick Actions */}
                  <div className="mt-3 p-3 bg-[#F5F5F2] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#E6E6E1]">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-[#6B726F] shrink-0">下一步行动:</span>
                      <span className="text-[#1D201F] font-medium">{job.nextAction}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {job.id === 'job-1' && (
                        <>
                          <button
                            onClick={() =>
                              navigateTo('interview_prep_workspace', {
                                jobId: job.id,
                                interviewId: 'int-byte-2'
                              })
                            }
                            className="px-3.5 py-1.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold transition shadow-xs"
                          >
                            继续准备 (72%)
                          </button>
                          <button
                            onClick={() =>
                              navigateTo('interview_review_detail', {
                                jobId: job.id,
                                interviewId: 'int-byte-1'
                              })
                            }
                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F5F5F2] text-[#1D201F] text-xs font-medium border border-[#E6E6E1] transition"
                          >
                            查看第1面复盘
                          </button>
                        </>
                      )}

                      {job.id === 'job-2' && (
                        <>
                          <button
                            onClick={() =>
                              navigateTo('interview_prep_workspace', {
                                jobId: job.id,
                                interviewId: 'int-tencent-1'
                              })
                            }
                            className="px-3.5 py-1.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold transition shadow-xs"
                          >
                            开始准备第1面
                          </button>
                          <button
                            onClick={() =>
                              navigateTo('jd_report', {
                                jobId: job.id,
                                jdId: 'jd-tencent-1'
                              })
                            }
                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F5F5F2] text-[#1D201F] text-xs font-medium border border-[#E6E6E1] transition"
                          >
                            查看 JD
                          </button>
                        </>
                      )}

                      {job.id === 'job-3' && (
                        <button
                          onClick={() => navigateTo('jd_analysis', { jobId: job.id })}
                          className="px-3.5 py-1.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold transition shadow-xs"
                        >
                          开始 JD 深度分析
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Action Items, AI Insights, Activity */}
        <div className="lg:col-span-5 space-y-6">
          {/* Next Action Items Checklist */}
          <div className="bg-white rounded-2xl border border-[#E6E6E1] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3E6256]" />
                <h3 className="text-sm font-bold text-[#1D201F]">下一步行动清单</h3>
              </div>
              <span className="text-xs text-[#6B726F] font-medium">按优先级排序</span>
            </div>

            <div className="space-y-2.5">
              {nextActions.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    navigateTo(item.targetTab, {
                      jobId: item.jobId,
                      interviewId: item.targetId
                    })
                  }
                  className="p-3 rounded-xl border border-[#E6E6E1] hover:border-[#3E6256]/50 hover:bg-[#EBF2EE]/30 transition cursor-pointer flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          item.priority === 'high'
                            ? 'bg-[#B7794B]'
                            : item.priority === 'medium'
                            ? 'bg-[#3E6256]'
                            : 'bg-slate-400'
                        }`}
                      />
                      <span className="text-xs font-semibold text-[#1D201F] group-hover:text-[#3E6256] transition">
                        {item.company}
                      </span>
                      <span className="text-[10px] text-[#8A908C]">{item.dueDate}</span>
                    </div>
                    <p className="text-xs text-[#6B726F] leading-relaxed truncate">
                      {item.actionTitle}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A6ACA8] group-hover:text-[#3E6256] transition shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions Widget */}
          <div className="bg-[#1D201F] text-white rounded-2xl p-6 shadow-xs space-y-4 border border-[#2C302E]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8EBAAB]" />
                <h3 className="text-sm font-bold tracking-tight">AI 求职闭环建议</h3>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#3E6256]/40 text-[#8EBAAB] border border-[#3E6256]/60">
                实时计算
              </span>
            </div>

            <div className="space-y-3">
              {aiSuggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition"
                >
                  <div className="text-xs font-semibold text-[#8EBAAB]">
                    {sug.title}
                  </div>
                  <p className="text-xs text-[#C8CEC9] leading-relaxed">
                    {sug.description}
                  </p>
                  <button
                    onClick={() =>
                      navigateTo(sug.targetTab, { jobId: sug.jobId, interviewId: 'int-byte-1' })
                    }
                    className="text-xs font-semibold text-[#8EBAAB] hover:text-[#BCE0D4] flex items-center gap-1 transition pt-1"
                  >
                    <span>{sug.actionText}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="bg-white rounded-2xl border border-[#E6E6E1] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1D201F]">最近活动动态</h3>
              <span className="text-xs text-[#6B726F]">已记录 4 条</span>
            </div>

            <div className="space-y-3">
              {activities.map((act, index) => {
                const colors = ['#3E6256', '#B7794B', '#5A8477', '#8F5128'];
                const avatarColor = colors[index % colors.length];

                return (
                  <div key={act.id} className="flex items-start gap-3 text-xs py-1 border-b border-[#F5F5F2] last:border-none">
                    <div
                      className="w-7 h-7 rounded-full text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ backgroundColor: avatarColor }}
                    >
                      {act.title.slice(0, 1)}
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="font-semibold text-[#1D201F] leading-snug">{act.title}</div>
                      <p className="text-[#6B726F] leading-relaxed">{act.desc}</p>
                      <div className="text-[10px] text-[#8A908C]">{act.timestamp}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
