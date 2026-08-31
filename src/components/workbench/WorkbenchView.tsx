import React from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  Plus,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Check,
  Circle,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface WorkbenchViewProps {
  onOpenNewJob: () => void;
  onOpenNewInterview: () => void;
  onOpenNewReview: () => void;
}

interface StepItem {
  key: string;
  name: string;
  status: 'done' | 'active' | 'pending';
}

export const WorkbenchView: React.FC<WorkbenchViewProps> = ({
  onOpenNewJob,
  onOpenNewInterview,
  onOpenNewReview
}) => {
  const {
    user,
    jobs,
    navigateTo,
    nextActions,
    activities
  } = useJobCraft();

  // Calculate or mock display metrics aligned with p2
  const deliveredCount = 12;
  const interviewingCount = 3;
  const pendingCount = 5;
  const finishedCount = 2;

  // Render 6-step pipeline tracker for each job
  const getJobSteps = (job: any, index: number): StepItem[] => {
    if (index === 0) {
      // 字节跳动: 到面试准备
      return [
        { key: 'jd', name: 'JD分析', status: 'done' },
        { key: 'match', name: '经历匹配', status: 'done' },
        { key: 'resume', name: '定制简历', status: 'done' },
        { key: 'applied', name: '已投递', status: 'done' },
        { key: 'prep', name: '面试准备', status: 'active' },
        { key: 'review', name: '面试复盘', status: 'pending' }
      ];
    } else if (index === 1) {
      // 腾讯: 到已投递
      return [
        { key: 'jd', name: 'JD分析', status: 'done' },
        { key: 'match', name: '经历匹配', status: 'done' },
        { key: 'resume', name: '定制简历', status: 'done' },
        { key: 'applied', name: '已投递', status: 'active' },
        { key: 'prep', name: '面试准备', status: 'pending' },
        { key: 'review', name: '面试复盘', status: 'pending' }
      ];
    } else {
      // 某科技创业公司: JD分析中
      return [
        { key: 'jd', name: 'JD分析', status: 'active' },
        { key: 'match', name: '经历匹配', status: 'pending' },
        { key: 'resume', name: '定制简历', status: 'pending' },
        { key: 'applied', name: '已投递', status: 'pending' },
        { key: 'prep', name: '面试准备', status: 'pending' },
        { key: 'review', name: '面试复盘', status: 'pending' }
      ];
    }
  };

  const getStatusBadge = (index: number, job: any) => {
    if (index === 0) {
      return { text: '面试中', className: 'bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]' };
    }
    if (index === 1) {
      return { text: '已投递', className: 'bg-[#F2F4F2] text-[#55605B] border border-[#E1E5E2]' };
    }
    return { text: 'JD 分析中', className: 'bg-[#F5F5F2] text-[#6B726F] border border-[#E6E6E1]' };
  };

  const getNextStepText = (index: number) => {
    if (index === 0) return '准备第一轮业务面';
    if (index === 1) return '等待面试通知';
    return '查看 JD 分析结果';
  };

  const getJobMatchScore = (index: number, job: any) => {
    if (index === 0) return 92;
    if (index === 1) return 76;
    return 68;
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Greeting & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1D201F] tracking-tight">
            晚上好，{user.name || '菁菁'}
          </h1>
          <p className="text-xs md:text-sm text-[#6B726F] mt-1">
            3 个岗位正在推进，今天有 1 个重要任务需要完成。
          </p>
        </div>

        <button
          onClick={onOpenNewJob}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-bold shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>添加新的岗位</span>
        </button>
      </div>

      {/* 2. Top Stats 4 Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => navigateTo('jobs')}
          className="bg-white rounded-xl border border-[#E6E6E1] p-5 shadow-2xs hover:border-[#CBD5D0] transition cursor-pointer space-y-2"
        >
          <div className="text-3xl font-bold text-[#1D201F] tracking-tight">{deliveredCount}</div>
          <div className="text-xs text-[#6B726F] font-medium">已投递</div>
          <div className="text-[11px] text-[#3E6256] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+2 本周</span>
          </div>
        </div>

        <div
          onClick={() => navigateTo('interview_prep_center')}
          className="bg-white rounded-xl border border-[#E6E6E1] p-5 shadow-2xs hover:border-[#CBD5D0] transition cursor-pointer space-y-2"
        >
          <div className="text-3xl font-bold text-[#1D201F] tracking-tight">{interviewingCount}</div>
          <div className="text-xs text-[#6B726F] font-medium">面试中</div>
        </div>

        <div
          onClick={() => navigateTo('jobs')}
          className="bg-white rounded-xl border border-[#E6E6E1] p-5 shadow-2xs hover:border-[#CBD5D0] transition cursor-pointer space-y-2"
        >
          <div className="text-3xl font-bold text-[#1D201F] tracking-tight">{pendingCount}</div>
          <div className="text-xs text-[#6B726F] font-medium">待处理</div>
        </div>

        <div
          onClick={() => navigateTo('interview_review_center')}
          className="bg-white rounded-xl border border-[#E6E6E1] p-5 shadow-2xs hover:border-[#CBD5D0] transition cursor-pointer space-y-2"
        >
          <div className="text-3xl font-bold text-[#1D201F] tracking-tight">{finishedCount}</div>
          <div className="text-xs text-[#6B726F] font-medium">已完成</div>
        </div>
      </div>

      {/* 3. Main Section: 正在推进岗位列表 (Left 8 cols) + 下一步行动/最近活动/AI建议 (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): 正在推进 */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1D201F]">正在推进</h2>
            <button
              onClick={() => navigateTo('jobs')}
              className="text-xs text-[#6B726F] hover:text-[#1D201F] transition flex items-center gap-0.5 font-medium cursor-pointer"
            >
              <span>查看全部</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Job Cards */}
          <div className="space-y-3.5">
            {jobs.slice(0, 3).map((job, index) => {
              const badge = getStatusBadge(index, job);
              const steps = getJobSteps(job, index);
              const nextStep = getNextStepText(index);
              const matchScore = getJobMatchScore(index, job);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-xl border border-[#E6E6E1] p-5 shadow-2xs hover:border-[#CBD5D0] transition space-y-3.5"
                >
                  {/* Row 1: Company & Status Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-[#1D201F]">
                        {index === 2 ? '某科技创业公司' : job.company}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${badge.className}`}>
                      {badge.text}
                    </span>
                  </div>

                  {/* Row 2: Role & Match Score */}
                  <div className="flex items-center justify-between text-xs text-[#6B726F]">
                    <span>{job.role}</span>
                    <span className="font-medium text-[#1D201F]">
                      匹配度 <strong className="font-bold">{matchScore}%</strong>
                    </span>
                  </div>

                  {/* Row 3: 6-Step Pipeline Tracker */}
                  <div className="bg-[#FAFBF9] rounded-lg p-3 border border-[#F0F2ED] overflow-x-auto">
                    <div className="flex items-center justify-between min-w-[520px] text-[11px]">
                      {steps.map((st, sIdx) => {
                        const isLast = sIdx === steps.length - 1;
                        return (
                          <React.Fragment key={st.key}>
                            <div className="flex items-center gap-1 shrink-0">
                              {st.status === 'done' && (
                                <span className="text-[#3E6256] font-semibold flex items-center gap-0.5">
                                  <span>✓</span>
                                  <span>{st.name}</span>
                                </span>
                              )}
                              {st.status === 'active' && (
                                <span className="text-[#1D201F] font-bold flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-[#1D201F] inline-block"></span>
                                  <span>{st.name}</span>
                                </span>
                              )}
                              {st.status === 'pending' && (
                                <span className="text-[#9CA3AF] flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full border border-[#D1D5DB] inline-block"></span>
                                  <span>{st.name}</span>
                                </span>
                              )}
                            </div>

                            {!isLast && (
                              <div className="flex-1 mx-2 h-[1px] bg-[#E5E7EB]" />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 4: Bottom Next Step & Action Link */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-1.5 text-[#6B726F]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A908C]" />
                      <span>下一步：{nextStep}</span>
                    </div>

                    <button
                      onClick={() => navigateTo('job_workspace', { jobId: job.id })}
                      className="text-xs font-semibold text-[#1D201F] hover:text-[#3E6256] flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>进入岗位</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (4 cols): 下一步行动 / 最近活动 / AI 建议 */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: NEXT UP 下一步行动 */}
          <div className="bg-white rounded-xl border border-[#E6E6E1] p-5 shadow-2xs space-y-4">
            <div>
              <div className="text-[10px] font-bold text-[#8A908C] uppercase tracking-wider">
                NEXT UP
              </div>
              <h2 className="text-sm font-bold text-[#1D201F] mt-0.5">下一步行动</h2>
            </div>

            <div className="space-y-3.5">
              {/* Item 1 */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#1D201F]">
                  准备字节跳动第一轮面试
                </div>
                <div className="text-[11px] text-[#8A908C]">明天 14:00</div>
                <button
                  onClick={() => navigateTo('interview_prep_workspace', { jobId: 'job-1' })}
                  className="px-3 py-1 rounded-md border border-[#E6E6E1] bg-white hover:bg-[#F5F5F2] text-[#1D201F] text-xs font-semibold shadow-2xs transition cursor-pointer"
                >
                  开始准备
                </button>
              </div>

              <div className="border-t border-[#F0F2ED]" />

              {/* Item 2 */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#1D201F]">
                  查看腾讯产品经理 JD 分析
                </div>
                <div className="text-[11px] text-[#8A908C]">AI 已完成岗位匹配</div>
                <button
                  onClick={() => navigateTo('jd_report', { jdId: 'jd-tencent-1' })}
                  className="px-3 py-1 rounded-md border border-[#E6E6E1] bg-white hover:bg-[#F5F5F2] text-[#1D201F] text-xs font-semibold shadow-2xs transition cursor-pointer"
                >
                  查看分析
                </button>
              </div>

              <div className="border-t border-[#F0F2ED]" />

              {/* Item 3 */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#1D201F]">
                  完成某科技公司定制简历
                </div>
                <div className="text-[11px] text-[#8A908C]">草稿未完成</div>
                <button
                  onClick={() => navigateTo('resume_editor', { jobId: 'job-3' })}
                  className="px-3 py-1 rounded-md border border-[#E6E6E1] bg-white hover:bg-[#F5F5F2] text-[#1D201F] text-xs font-semibold shadow-2xs transition cursor-pointer"
                >
                  继续编辑
                </button>
              </div>
            </div>

            <div className="border-t border-[#F0F2ED] pt-2">
              <button
                onClick={() => navigateTo('jobs')}
                className="text-xs text-[#6B726F] hover:text-[#1D201F] font-medium flex items-center gap-0.5 cursor-pointer"
              >
                <span>查看全部</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: RECENT 最近活动 */}
          <div className="bg-white rounded-xl border border-[#E6E6E1] p-5 shadow-2xs space-y-4">
            <div>
              <div className="text-[10px] font-bold text-[#8A908C] uppercase tracking-wider">
                RECENT
              </div>
              <h2 className="text-sm font-bold text-[#1D201F] mt-0.5">最近活动</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-[#1D201F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A908C]" />
                  <span>JD 分析完成</span>
                </div>
                <div className="text-[11px] text-[#8A908C] pl-3">腾讯 · 2小时前</div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-[#1D201F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A908C]" />
                  <span>经历匹配完成</span>
                </div>
                <div className="text-[11px] text-[#8A908C] pl-3">字节跳动 · 5小时前</div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-[#1D201F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A908C]" />
                  <span>简历已生成</span>
                </div>
                <div className="text-[11px] text-[#8A908C] pl-3">字节跳动 · 昨天 16:20</div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-[#1D201F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A908C]" />
                  <span>状态更新为已投递</span>
                </div>
                <div className="text-[11px] text-[#8A908C] pl-3">某科技公司 · 昨天 14:00</div>
              </div>
            </div>

            <div className="border-t border-[#F0F2ED] pt-2">
              <button
                onClick={() => navigateTo('jobs')}
                className="text-xs text-[#6B726F] hover:text-[#1D201F] font-medium flex items-center gap-0.5 cursor-pointer"
              >
                <span>查看全部</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: AI 建议 */}
          <div className="bg-[#FAFBF9] rounded-xl border border-[#E6E8E4] p-4 shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D201F]">
              <Sparkles className="w-3.5 h-3.5 text-[#3E6256]" />
              <span>AI 建议</span>
            </div>
            <p className="text-xs text-[#525B56] leading-relaxed">
              有 3 条经历还没有量化成果，完善后可以提升简历匹配度。
            </p>
            <button
              onClick={() => navigateTo('experiences')}
              className="text-xs font-semibold text-[#3E6256] hover:underline flex items-center gap-0.5 pt-1 cursor-pointer"
            >
              <span>查看建议</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

