import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  RotateCcw,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Calendar,
  CheckCircle2,
  Search
} from 'lucide-react';

interface InterviewReviewCenterViewProps {
  onOpenNewReview: () => void;
}

export const InterviewReviewCenterView: React.FC<InterviewReviewCenterViewProps> = ({
  onOpenNewReview
}) => {
  const { interviews, navigateTo } = useJobCraft();
  const [searchQuery, setSearchQuery] = useState('');

  const interviewsWithReviews = interviews.filter((i) => !!i.review);
  const interviewsWithoutReviews = interviews.filter((i) => !i.review);

  const filteredReviewed = interviewsWithReviews.filter(
    (i) =>
      i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">智能面试复盘中心</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            把每一场真实面试转化为你的能力沉淀与经历资产，形成求职闭环
          </p>
        </div>
        <button
          onClick={onOpenNewReview}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ 新建面试复盘</span>
        </button>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs text-slate-400 font-medium">累计完成复盘</div>
          <div className="text-2xl font-bold text-slate-900">{interviewsWithReviews.length} 场</div>
          <div className="text-[11px] text-emerald-700 font-semibold">100% 完成逐题诊断与要点反哺</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs text-slate-400 font-medium">面试平均得分</div>
          <div className="text-2xl font-bold text-emerald-700">85.0 分</div>
          <div className="text-[11px] text-slate-500">最高分 88 分 (字节跳动 · 业务面)</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs text-slate-400 font-medium">待复盘面试</div>
          <div className="text-2xl font-bold text-amber-600">
            {interviewsWithoutReviews.length} 场
          </div>
          <div className="text-[11px] text-slate-500">及时复盘，遗忘率降低 80%</div>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">已完成复盘列表</h2>
          <div className="relative w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索公司或岗位..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredReviewed.map((interview) => {
            const review = interview.review!;
            return (
              <div
                key={interview.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-emerald-300 transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{interview.company}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-semibold text-slate-800 text-sm">{interview.role}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                        {interview.roundName}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>面试时间：{interview.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-medium">综合表现评估</div>
                      <div className="text-lg font-bold text-emerald-700">
                        {review.overallScore} 分
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        navigateTo('interview_review_detail', {
                          jobId: interview.jobId,
                          interviewId: interview.id
                        })
                      }
                      className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1"
                    >
                      <span>查看复盘报告</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Highlights snippet */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>核心亮点摘要：</span>
                  </div>
                  <p className="text-slate-600 line-clamp-1 leading-relaxed">
                    {review.highlights?.[0] ||
                      review.coreProblems?.[0] ||
                      review.aiDiagnosis ||
                      '已生成多维度深度复盘诊断'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
