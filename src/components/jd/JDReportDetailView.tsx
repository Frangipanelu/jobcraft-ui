import React from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  FileSearch,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  ArrowLeft,
  FileText,
  ShieldAlert,
  Info
} from 'lucide-react';

interface JDReportDetailViewProps {
  analysisId?: string;
  onNavigateToResume?: () => void;
  onNavigateToInterview?: () => void;
}

export const JDReportDetailView: React.FC<JDReportDetailViewProps> = ({
  analysisId = 'jd-byte-1',
  onNavigateToResume,
  onNavigateToInterview
}) => {
  const { jdAnalyses, experiences, navigateTo } = useJobCraft();

  const analysis = jdAnalyses.find((a) => a.id === analysisId) || jdAnalyses[0];

  if (!analysis) {
    return (
      <div className="p-8 text-center text-slate-500">未找到对应的 JD 分析报告</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8 animate-in fade-in duration-300">
      {/* 1. Top Verdict Banner */}
      <div className="bg-[#1D201F] text-white rounded-2xl p-7 shadow-sm space-y-6 border border-[#2C302E]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8EBAAB]">
                AI 岗位深度研判
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3E6256]" />
              <span className="text-xs text-[#A6ACA8]">{analysis.company} · {analysis.role}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
              值得投递 · 综合匹配度 {analysis.matchScore}%
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-[11px] text-[#A6ACA8] font-medium">推荐指数</div>
              <div className="text-[#B7794B] font-bold tracking-widest text-base">
                {'★'.repeat(analysis.recommendationStars)}
              </div>
            </div>
            {onNavigateToResume ? (
              <button
                onClick={onNavigateToResume}
                className="px-4 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <span>定制专属简历</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => navigateTo('resume_editor', { jobId: analysis.jobId })}
                className="px-4 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <span>定制专属简历</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Core Verdict Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Why match */}
          <div className="space-y-1.5 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="text-xs font-bold text-[#8EBAAB] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>为什么高度匹配</span>
            </div>
            <p className="text-xs text-[#C8CEC9] leading-relaxed">{analysis.whyMatch}</p>
          </div>

          {/* Key risks */}
          <div className="space-y-1.5 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="text-xs font-bold text-[#D4986A] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>主要考察风险 / 潜在短板</span>
            </div>
            <p className="text-xs text-[#C8CEC9] leading-relaxed">{analysis.keyRisks}</p>
          </div>

          {/* Resume Advice */}
          <div className="space-y-1.5 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="text-xs font-bold text-[#8EBAAB] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>简历重点表达建议</span>
            </div>
            <ul className="text-xs text-[#C8CEC9] space-y-1 list-disc list-inside leading-relaxed">
              {(analysis.resumeAdvice || []).slice(0, 2).map((adv, idx) => (
                <li key={idx} className="truncate">{adv}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. ATS Keywords & Core Requirements */}
      <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 space-y-5 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#F5F5F2] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#1D201F]">ATS 关键词解析与覆盖率</h3>
            <p className="text-xs text-[#6B726F]">
              招聘系统初筛匹配算法将优先扫描以下硬技能、方法论及经验关键词
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#8A908C] font-medium">当前履历覆盖</span>
            <div className="text-lg font-bold text-[#3E6256]">
              {analysis.atsKeywords?.coveragePercent || 85}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#F5F5F2] border border-[#E6E6E1] space-y-2">
            <div className="text-xs font-bold text-[#1D201F]">核心硬技能关键词</div>
            <div className="flex flex-wrap gap-1.5">
              {(analysis.atsKeywords?.hardSkills || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#E8F1EC] text-[#2D4B41] text-[11px] font-semibold border border-[#D3E2DB]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#F5F5F2] border border-[#E6E6E1] space-y-2">
            <div className="text-xs font-bold text-[#1D201F]">软技能与方法论</div>
            <div className="flex flex-wrap gap-1.5">
              {(analysis.atsKeywords?.softSkills || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#FAF2EB] text-[#8F5128] text-[11px] font-medium border border-[#F0DFD1]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#F5F5F2] border border-[#E6E6E1] space-y-2">
            <div className="text-xs font-bold text-[#1D201F]">高频业务场景词</div>
            <div className="flex flex-wrap gap-1.5">
              {(analysis.atsKeywords?.expKeywords || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#EBF2EE] text-[#3E6256] text-[11px] font-medium border border-[#D3E2DB]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Subtext Analysis */}
      {analysis.subtextAnalysis && analysis.subtextAnalysis.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#F5F5F2] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#1D201F]">JD 招聘暗话深度解读</h3>
              <p className="text-xs text-[#6B726F]">
                穿透字面描述，还原招聘团队当下最真实的业务痛点与考核意图
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#935427] bg-[#FAF2EB] px-2.5 py-1 rounded-full border border-[#F0DFD1]">
              <Info className="w-3.5 h-3.5" />
              <span>AI 推断，不等于招聘方事实，仅供策略参考</span>
            </div>
          </div>

          <div className="space-y-3">
            {analysis.subtextAnalysis.map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded-xl bg-[#F5F5F2] border border-[#E6E6E1] space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1D201F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3E6256]" />
                  <span>JD 原文：</span>
                  <span className="text-[#1D201F] font-bold">"{sub.rawJD}"</span>
                </div>
                <div className="text-xs text-[#6B726F]">
                  <strong className="text-[#1D201F]">字面要求：</strong> {sub.literalMeaning}
                </div>
                <div className="text-xs text-[#2D4B41] bg-[#E8F1EC] p-2.5 rounded-lg border border-[#D3E2DB] leading-relaxed font-medium">
                  {sub.realEvaluation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Skill Gaps & User Evidence */}
      {analysis.skillGaps && analysis.skillGaps.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 space-y-4 shadow-2xs">
          <h3 className="text-base font-bold text-[#1D201F]">能力缺口与证据对照</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E6E6E1] text-[#6B726F] font-semibold bg-[#F5F5F2]">
                  <th className="p-3">考核能力</th>
                  <th className="p-3">你的现有证据</th>
                  <th className="p-3">岗位诉求</th>
                  <th className="p-3">差距评级</th>
                  <th className="p-3">应对建议</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E6E1]">
                {analysis.skillGaps.map((gap) => (
                  <tr key={gap.id} className="hover:bg-[#F5F5F2]/50 transition">
                    <td className="p-3 font-bold text-[#1D201F] align-top">{gap.capability}</td>
                    <td className="p-3 text-[#6B726F] align-top max-w-[200px]">{gap.userEvidence}</td>
                    <td className="p-3 text-[#6B726F] align-top max-w-[180px]">{gap.requirement}</td>
                    <td className="p-3 align-top font-semibold text-[#B7794B]">{gap.gap}</td>
                    <td className="p-3 text-[#1D201F] align-top font-medium max-w-[220px] bg-[#EBF2EE]/30">
                      {gap.recommendation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Recommended Experiences */}
      <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#F5F5F2] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#1D201F]">推荐关联的职业经历证据</h3>
            <p className="text-xs text-[#6B726F]">
              系统从你的「经历资产库」中精准匹配出最能佐证该岗位诉求的王牌经历
            </p>
          </div>
          <button
            onClick={() => navigateTo('experiences')}
            className="text-xs text-[#3E6256] hover:text-[#325046] font-semibold flex items-center gap-1 transition"
          >
            <span>管理经历库</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.recommendedExperiences.map((rec) => {
            const exp = experiences.find((e) => e.id === rec.experienceId);
            if (!exp) return null;

            return (
              <div
                key={rec.experienceId}
                className="p-5 rounded-xl border border-[#E6E6E1] bg-[#F5F5F2]/40 hover:border-[#3E6256]/50 hover:bg-white transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#1D201F] leading-snug">{exp.title}</h4>
                    <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-[#E8F1EC] text-[#2D4B41] shrink-0 border border-[#D3E2DB]">
                      匹配度 {rec.matchScore}%
                    </span>
                  </div>
                  <div className="text-xs text-[#6B726F]">
                    <strong className="text-[#1D201F]">命中要求：</strong> {rec.matchingJDReq}
                  </div>
                  <p className="text-xs text-[#6B726F] bg-white p-2.5 rounded-lg border border-[#E6E6E1] leading-relaxed">
                    <strong className="text-[#3E6256] font-semibold">推荐理由：</strong> {rec.reason}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#E6E6E1]">
                  <button
                    onClick={() => navigateTo('experiences', { expId: exp.id })}
                    className="flex-1 py-1.5 rounded-lg bg-white hover:bg-[#F5F5F2] text-[#1D201F] text-xs font-semibold border border-[#E6E6E1] transition text-center"
                  >
                    查看经历详情
                  </button>
                  <button
                    onClick={() => {
                      if (onNavigateToResume) onNavigateToResume();
                      else navigateTo('resume_editor', { jobId: analysis.jobId });
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold transition text-center shadow-2xs"
                  >
                    用于定制简历 →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
