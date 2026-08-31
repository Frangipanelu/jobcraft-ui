import React from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Database,
  ArrowLeft,
  ChevronRight,
  Award,
  Layers,
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';

interface InterviewReviewDetailViewProps {
  interviewId?: string;
}

export const InterviewReviewDetailView: React.FC<InterviewReviewDetailViewProps> = ({
  interviewId = 'int-byte-1'
}) => {
  const { interviews, applyReviewFeedback, navigateTo, showToast } = useJobCraft();

  const currentInterview = interviews.find((i) => i.id === interviewId) || interviews[0];
  const review = currentInterview?.review;

  if (!currentInterview || !review) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
        <div className="text-base text-[#6B726F]">暂无本场面试的复盘报告</div>
        <button
          onClick={() => navigateTo('interview_review_center')}
          className="px-4 py-2 rounded-lg bg-[#3E6256] text-white text-xs font-semibold"
        >
          返回复盘中心
        </button>
      </div>
    );
  }

  const handleApplyFeedback = (feedbackIndex: number, experienceId: string) => {
    applyReviewFeedback(currentInterview.id, feedbackIndex);
    showToast({
      type: 'success',
      title: '经历资产已升级',
      message: '已将本次面试复盘建议沉淀至经历资产库最新版本！'
    });
  };

  const qaList = review.qaList || [];
  const coreProblems = review.coreProblems || review.drawbacks || [];
  const experienceFeedbacks = review.experienceFeedbacks || [];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Navigation & Score Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E6E1] pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('interview_review_center')}
            className="p-1.5 rounded-lg border border-[#E6E6E1] bg-white hover:bg-[#F5F5F2] text-[#6B726F] hover:text-[#1D201F] transition shrink-0 cursor-pointer"
            title="返回复盘中心"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-[#1D201F] tracking-tight">
                {currentInterview.company} · {currentInterview.roundName} · 深度复盘审计
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
                得分 {review.overallScore} 分
              </span>
            </div>
            <p className="text-xs text-[#6B726F] mt-0.5">
              复盘时间：{review.reviewDate} · 岗位：{currentInterview.role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => navigateTo('interview_prep_workspace', { interviewId: currentInterview.id })}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#E6E6E1] hover:bg-[#F5F5F2] text-[#1D201F] text-xs font-semibold transition cursor-pointer"
          >
            查看原备战方案
          </button>
        </div>
      </div>

      {/* 2. SECTION 1: 全局综合评判与胜率研判 (Executive Summary) */}
      <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
        <div className="bg-[#F5F5F2] px-6 py-4 border-b border-[#E6E6E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-[#3E6256]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1D201F]">一、本场综合得失诊断</h2>
              <p className="text-[11px] text-[#6B726F]">AI 综合考官意图与应答表现生成的阶段性诊断建议</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="p-4 rounded-lg bg-[#E8F1EC]/30 border border-[#D3E2DB] text-[#2D4B41] leading-relaxed font-medium">
            💡 {review.aiDiagnosis || '本次面试展现了扎实的项目落地能力，但在方案选型对比与量化业务指标的表达上仍有提升空间。'}
          </div>

          {(review.competencies || []).length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {(review.competencies || []).map((comp, cIdx) => (
                <div key={cIdx} className="p-3 bg-[#FAFAFA] rounded-lg border border-[#E6E6E1] space-y-1">
                  <div className="text-[11px] text-[#6B726F] font-semibold">{comp.name}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-[#1D201F]">{comp.score}分</span>
                    <span className="text-[10px] text-[#8A908C]">行业基准 {comp.benchmark}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. SECTION 2: 逐题攻防得失审计表 (Question-by-Question Ledger) */}
      <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
        <div className="bg-[#F5F5F2] px-6 py-4 border-b border-[#E6E6E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4 text-[#3E6256]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1D201F]">二、逐题应答深度审计与优化建议</h2>
              <p className="text-[11px] text-[#6B726F]">对照考官考核点剖析个人应答亮点与失分根因</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#E6E6E1]">
          {qaList.map((item, idx) => (
            <div key={item.id || idx} className="p-6 space-y-3 text-xs">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#E8F1EC] text-[#2D4B41] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-[#1D201F]">{item.question}</h3>
                    <div className="text-[11px] text-[#6B726F] flex items-center gap-2 flex-wrap">
                      <span className="text-[#3E6256] font-medium">
                        考官真实意图：{(item.interviewerIntent?.mainPoints || []).join(' / ') || '考察专业深度与落地推力'}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#FAF2EB] text-[#8F5128] border border-[#F0DFD1] shrink-0">
                  综合 {item.answerAnalysis?.completeness || 75} 分
                </span>
              </div>

              {/* Candidate answer snippet */}
              {item.candidateAnswer && (
                <div className="p-3 bg-[#FAFAFA] rounded-lg border border-[#E6E6E1] text-[#6B726F] leading-relaxed italic">
                  “{item.candidateAnswer}”
                </div>
              )}

              {/* Issues & Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-[#FAF2EB]/40 border border-[#F0DFD1] space-y-1">
                  <div className="font-bold text-[#8F5128]">主要暴露问题</div>
                  <ul className="space-y-1 text-[#6B726F] list-disc list-inside">
                    {(item.identifiedIssues || []).map((issue, iIdx) => (
                      <li key={iIdx}>{issue}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-[#E8F1EC]/40 border border-[#D3E2DB] space-y-1">
                  <div className="font-bold text-[#2D4B41]">下一轮优化话术建议</div>
                  <p className="text-[#6B726F] leading-relaxed">
                    {item.suggestionAdvice || '建议在回答末尾强化量化结果，并主动对比替代技术路线。'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SECTION 3: 核心改进清单 (Core Action Items) */}
      {coreProblems.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
          <div className="bg-[#F5F5F2] px-6 py-4 border-b border-[#E6E6E1] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4 text-[#8F5128]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#1D201F]">三、下一轮面试必改行动清单</h2>
                <p className="text-[11px] text-[#6B726F]">针对本轮暴露的共性短板制定的强化动作</p>
              </div>
            </div>
          </div>

          <div className="p-6 divide-y divide-[#E6E6E1] text-xs">
            {coreProblems.map((prob, idx) => (
              <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#FAF2EB] text-[#8F5128] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-[#1D201F] font-medium leading-relaxed">{prob}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SECTION 4: 经历资产反哺与升级流转 (Experience Asset Feedback Loop) */}
      <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
        <div className="bg-[#F5F5F2] px-6 py-4 border-b border-[#E6E6E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center font-bold">
              <Database className="w-4 h-4 text-[#3E6256]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1D201F]">四、反哺经历资产库（版本迭代沉淀）</h2>
              <p className="text-[11px] text-[#6B726F]">
                将本场面试得到的实战检验与考官反馈一键沉淀升级至经历资产库
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#E6E6E1]">
          {experienceFeedbacks.map((ref, idx) => (
            <div key={idx} className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#1D201F]">{ref.experienceTitle}</h3>
                  <p className="text-[11px] text-[#6B726F] mt-0.5">
                    版本演进：{ref.currentVersion} → <strong className="text-[#3E6256]">{ref.proposedVersion}</strong>
                  </p>
                </div>

                {ref.applied ? (
                  <span className="flex items-center gap-1 text-[#3E6256] font-bold text-xs bg-[#E8F1EC] px-3 py-1.5 rounded-lg border border-[#D3E2DB]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>已同步至资产库</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleApplyFeedback(idx, ref.experienceId)}
                    className="flex items-center gap-1 px-4 py-2 bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-bold rounded-lg transition shadow-xs cursor-pointer"
                  >
                    <span>一键升级并沉淀为新版本</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Proposed changes diff */}
              {(ref.proposedChanges || []).length > 0 && (
                <div className="space-y-2 pt-1">
                  {(ref.proposedChanges || []).map((ch, cIdx) => (
                    <div key={cIdx} className="p-3 bg-[#FAFAFA] rounded-lg border border-[#E6E6E1] space-y-1">
                      <div className="font-bold text-[#1D201F] text-[11px]">{ch.field}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-[#FAF2EB]/40 border border-[#F0DFD1] text-[#8F5128]">
                          <strong>原描述：</strong>{ch.from}
                        </div>
                        <div className="p-2 rounded bg-[#E8F1EC]/40 border border-[#D3E2DB] text-[#2D4B41]">
                          <strong>升级后：</strong>{ch.to}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
