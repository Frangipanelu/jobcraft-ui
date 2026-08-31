import React from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  ArrowLeft,
  FileText,
  Plus
} from 'lucide-react';

interface InterviewReviewDetailViewProps {
  interviewId?: string;
  onNavigateToPrep?: () => void;
}

export const InterviewReviewDetailView: React.FC<InterviewReviewDetailViewProps> = ({
  interviewId = 'int-byte-1',
  onNavigateToPrep
}) => {
  const { interviews, experiences, syncReviewToExperience, navigateTo, showToast } = useJobCraft();

  const currentInterview = interviews.find((i) => i.id === interviewId) || interviews[0];
  const review = currentInterview?.review;

  if (!currentInterview || !review) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>本场面试尚未生成复盘报告</p>
        <button
          onClick={() => navigateTo('interview_review_center')}
          className="mt-3 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
        >
          返回复盘中心
        </button>
      </div>
    );
  }

  const handleFeedBackToExperience = (expId: string, feedbackText: string) => {
    syncReviewToExperience(expId, feedbackText);
    showToast({
      type: 'success',
      title: '已沉淀为经历资产新要点',
      message: '经历库已自动记录本次面试的实战亮点，并纳入经历版本迭代！'
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8 animate-in fade-in duration-300">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('interview_review_center')}
          className="inline-flex items-center gap-1.5 text-xs text-[#8A908C] hover:text-[#3E6256] font-medium transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回复盘中心</span>
        </button>

        <div className="text-xs text-[#8A908C]">
          面试时间：{currentInterview.time} · 形式：{currentInterview.format === 'video' ? '视频面试' : '电话/现场'}
        </div>
      </div>

      {/* 1. Top Verdict Banner */}
      <div className="bg-[#1D201F] text-white rounded-2xl p-7 shadow-sm space-y-6 border border-[#2C302E]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8EBAAB]">
                AI 赛后智能复盘
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3E6256]" />
              <span className="text-xs text-[#A6ACA8]">
                {currentInterview.company} · {currentInterview.roundName}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
              综合表现评估：{review.overallScore} 分
            </h2>
            <p className="text-xs text-[#8EBAAB] mt-1 font-medium">
              {review.passProbability}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() =>
                navigateTo('interview_prep_workspace', {
                  jobId: currentInterview.jobId,
                  interviewId: currentInterview.id
                })
              }
              className="px-4 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
            >
              <span>查看备战方案</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Highlights & Drawbacks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Highlights */}
          <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="text-xs font-bold text-[#8EBAAB] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>本场最大亮点 (继续保持)</span>
            </div>
            <ul className="text-xs text-[#C8CEC9] space-y-1.5 list-disc list-inside leading-relaxed">
              {(review.highlights || [
                '熟练掌握大模型评测体系，业务逻辑条理清晰',
                '关键回答中给出了清晰的技术选型依据'
              ]).map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>

          {/* Drawbacks */}
          <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="text-xs font-bold text-[#D4986A] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>失分点 / 待补齐认知</span>
            </div>
            <ul className="text-xs text-[#C8CEC9] space-y-1.5 list-disc list-inside leading-relaxed">
              {(review.drawbacks || review.coreProblems || [
                '在回答技术选型权衡时展开较少',
                '量化成果数据表达可以进一步强化'
              ]).map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. QA Breakdown Table */}
      <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 space-y-4 shadow-2xs">
        <div className="border-b border-[#F5F5F2] pb-3">
          <h3 className="text-base font-bold text-[#1D201F]">逐题深度复盘与得分诊断</h3>
          <p className="text-xs text-[#6B726F]">
            还原面试官深层考核意图，对比你的现场回答得失，并给出进阶升级建议
          </p>
        </div>

        <div className="space-y-4">
          {(review.qaBreakdown ||
            review.qaList?.map((q, idx) => ({
              id: q.id || `qa-${idx}`,
              question: q.question,
              interviewerIntent: Array.isArray(q.interviewerIntent?.mainPoints)
                ? q.interviewerIntent.mainPoints.join('；')
                : typeof q.interviewerIntent === 'string'
                ? q.interviewerIntent
                : '考察业务理解与问题解决能力',
              candidatePerformance: `得分: ${q.answerAnalysis?.completeness || 80}分`,
              analysis:
                q.identifiedIssues?.join('；') ||
                '回答逻辑基本完整，但在细节论证与量化成果方面仍有提升空间。',
              recommendedStrategy:
                q.suggestionAdvice || '建议采用 STAR 框架，补充方案对比依据与量化指标。'
            })) ||
            []
          ).map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-5 rounded-xl border border-[#E6E6E1] bg-[#F5F5F2]/50 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1D201F] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    Q{idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-[#1D201F]">{item.question}</h4>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB] shrink-0">
                  表现: {item.candidatePerformance}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-[#E6E6E1]">
                  <div className="text-[#8A908C] font-medium mb-1">面试官真实意图：</div>
                  <div className="text-[#1D201F] font-medium">{item.interviewerIntent}</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#E6E6E1]">
                  <div className="text-[#8A908C] font-medium mb-1">回答得失剖析：</div>
                  <div className="text-[#6B726F] leading-relaxed">{item.analysis}</div>
                </div>

                <div className="p-3 bg-[#E8F1EC]/60 rounded-lg border border-[#D3E2DB]">
                  <div className="text-[#2D4B41] font-bold mb-1">推荐更优答辩策略：</div>
                  <div className="text-[#1D201F] font-medium leading-relaxed">
                    {item.recommendedStrategy}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Closed-Loop Experience Feedback */}
      <div className="bg-white rounded-xl border border-[#D3E2DB] p-6 space-y-4 shadow-2xs bg-gradient-to-b from-[#E8F1EC]/30 to-white">
        <div className="flex items-center justify-between border-b border-[#E6E6E1] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1D201F]">经历资产反哺与闭环沉淀</h3>
              <p className="text-xs text-[#6B726F]">
                将面试实战中被充分验证或补充的高光要点，反向沉淀回经历资产库，持续升级个人求职资产
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {(review.experienceFeedback ||
            review.experienceFeedbacks?.map((ef) => ({
              experienceId: ef.experienceId,
              feedbackText: ef.suggestions?.[0] || '建议补充方案选型对比与量化指标'
            })) || [
              {
                experienceId: 'exp-1',
                feedbackText: '在本次面试中表现突出，建议将相关技术选型经验同步沉淀至经历卡片'
              }
            ]
          ).map((ef, idx) => {
            const exp = experiences.find((e) => e.id === ef.experienceId) || experiences[0];
            if (!exp) return null;

            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-[#E6E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1D201F]">{exp.title}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#F5F5F2] text-[#6B726F] font-mono border border-[#E6E6E1]">
                      当前版本: {exp.currentVersion}
                    </span>
                  </div>
                  <p className="text-xs text-[#2D4B41] font-medium">{ef.feedbackText}</p>
                </div>

                <button
                  onClick={() => handleFeedBackToExperience(exp.id, ef.feedbackText)}
                  className="px-4 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-bold shrink-0 transition flex items-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>沉淀为经历库新版本</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
