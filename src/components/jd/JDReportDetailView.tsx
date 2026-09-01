import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  ArrowLeft,
  ArrowRight,
  Edit,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Star,
  ExternalLink,
  BookOpen,
  Check,
  Briefcase,
  FileText
} from 'lucide-react';

interface JDReportDetailViewProps {
  analysisId?: string;
  onNavigateToResume?: () => void;
  onNavigateToInterview?: () => void;
  embedded?: boolean;
}

// Default structured high-fidelity mock data matching screenshot 6
const FALLBACK_DATA = {
  company: '字节跳动',
  position: 'AI 产品经理',
  location: '上海',
  date: '2026-08-30',
  verdict: {
    label: '值得投',
    score: 92,
    stars: 5,
    why: '你的 AI 产品、搜索评测和项目推进经历与岗位核心要求高度重合。从 0 到 1 的经历和数据驱动决策能力尤其匹配。',
    risk: '缺少大型 AI 产品商业化经验，以及 B2B 方向的规模化落地案例。',
    suggestions: [
      '简历重点突出 AI 搜索与评测体系建设',
      '补充 Prompt 工程相关经历或描述',
      '强化从 0 到 1 的完整项目闭环表达'
    ]
  },
  coreGoal:
    '负责 AI 产品从需求分析、产品设计到落地的完整流程，推动 AI 能力在实际业务中的规模化应用，提升核心产品指标。',
  responsibilities: [
    {
      num: '01',
      title: '产品规划',
      desc: '制定 AI 产品的年度规划和阶段性 OKR，协调研发、算法资源，确保核心功能按时交付。'
    },
    {
      num: '02',
      title: '用户需求分析',
      desc: '深入了解用户场景，挖掘真实需求，将模糊的业务诉求转化为清晰的产品方案。'
    },
    {
      num: '03',
      title: '产品落地',
      desc: '负责 AI 功能从方案评审、开发跟进到上线验证的完整流程，把控产品质量和上线节奏。'
    },
    {
      num: '04',
      title: '跨团队协作',
      desc: '与算法、工程、运营、BD 等多个团队协作，推动业务目标的一致性与资源的有效调配。'
    }
  ],
  ats: {
    hardSkills: ['产品设计', '数据分析', '搜索评测', 'SQL', 'A/B 测试', 'nDCG/MRR'],
    softSkills: ['跨团队协作', '项目推进', '用户洞察', '优先级判断'],
    coverage: [
      { word: 'AI 产品', covered: true },
      { word: '搜索', covered: true },
      { word: '数据分析', covered: true },
      { word: 'Prompt', covered: false },
      { word: '从0到1', covered: true },
      { word: '商业化', covered: false },
      { word: 'B2B', covered: false },
      { word: 'LLM', covered: true }
    ],
    expKeywords: ['2+ 年 AI 产品', '搜索/推荐经验', '大模型产品化']
  },
  subtext: [
    {
      num: '01',
      original: '“有大模型或 AIGC 产品经验者优先”',
      literal: '候选人需要有 LLM / AIGC 相关产品经验',
      actual:
        '这是核心门槛之一，非加分项。没有 AI 产品经验很可能直接被过滤。建议你将 AI 搜索评测项目放在最前面。'
    },
    {
      num: '02',
      original: '“推动跨部门协作、高效落地”',
      literal: '有协作经验，能够跨部门推动项目',
      actual:
        '字节内部通常有较高协作成本。这里实际考察的是你有没有在阻力下推动过项目，而不只是“有协作经验”。'
    },
    {
      num: '03',
      original: '“对 AI 和搜索产品有深度思考”',
      literal: '对行业有认知和见解',
      actual:
        '面试中大概率会有开放题考察你的产品判断力，例如“你觉得 AI 搜索的核心挑战是什么”。提前准备观点。'
    }
  ],
  skillGap: [
    {
      ability: 'AI 产品设计',
      evidence: 'AI 搜索评测项目 + MVP 项目',
      requirement: '有完整 AI 产品经验',
      status: 'strong' as const,
      suggestion: '维持，确保简历表达清晰'
    },
    {
      ability: '数据分析',
      evidence: 'nDCG/MRR 评估体系建设',
      requirement: '数据驱动决策',
      status: 'strong' as const,
      suggestion: '可进一步量化具体数字'
    },
    {
      ability: '搜索/推荐经验',
      evidence: 'AI 搜索优化项目',
      requirement: '搜索或推荐产品经验',
      status: 'strong' as const,
      suggestion: '放在简历首位'
    },
    {
      ability: '商业化经验',
      evidence: '暂无直接证据',
      requirement: '有 AI 产品商业化落地经验',
      status: 'none' as const,
      suggestion: '挖掘数据平台中 ToB 场景'
    },
    {
      ability: 'B2B 产品经验',
      evidence: '数据平台部分场景',
      requirement: '有 B2B 产品经验',
      status: 'partial' as const,
      suggestion: '将数据平台中的 ToB 经历显性化'
    }
  ],
  recommended: [
    {
      id: '1',
      num: '#1',
      title: 'AI 搜索优化项目',
      type: '项目经历',
      year: '2026',
      matchScore: 95,
      tags: ['AI 产品能力', '数据分析', '搜索评测'],
      reason:
        '直接命中岗位核心要求，有 AI + 搜索 + 数据分析三大关键词，建议作为简历首个项目。'
    },
    {
      id: '2',
      num: '#2',
      title: 'AI 产品 MVP 项目',
      type: '项目经历',
      year: '2025',
      matchScore: 88,
      tags: ['从0到1产品经验', '用户研究', '产品落地'],
      reason:
        '有完整产品闭环，体现从需求到上线的推动力，补充 AI 搜索项目之外的产品感。'
    },
    {
      id: '3',
      num: '#3',
      title: '数据平台产品经理',
      type: '工作经历',
      year: '2023–2025',
      matchScore: 62,
      tags: ['跨团队协作', '需求管理'],
      reason:
        '跨团队推进经验可作为协作能力的证据，但需要突出可迁移能力，降低“背景不相关”的认知。'
    }
  ]
};

function SectionNum({ n }: { n: string }) {
  return (
    <span className="w-6 h-6 rounded-full bg-[#E5EEE9] inline-flex items-center justify-center text-[11px] font-bold text-[#3E6256] shrink-0">
      {n}
    </span>
  );
}

function SectionTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5 pb-3.5 border-b border-[#F0F0EC]">
      <SectionNum n={num} />
      <h2 className="text-[15px] font-bold text-[#202421] tracking-tight">{title}</h2>
    </div>
  );
}

export const JDReportDetailView: React.FC<JDReportDetailViewProps> = ({
  analysisId,
  onNavigateToResume,
  onNavigateToInterview,
  embedded = false
}) => {
  const {
    jdAnalyses,
    jobs,
    setSelectedJobId,
    setSelectedJDId,
    jdAnalysisReturnTarget,
    setJdAnalysisReturnTarget,
    navigateTo,
    showToast
  } = useJobCraft();

  const currentAnalysis = jdAnalyses.find((a) => a.id === analysisId) || jdAnalyses[0];

  // Merge context data with screenshot high-fidelity defaults
  const data = {
    company: currentAnalysis?.company || FALLBACK_DATA.company,
    position: currentAnalysis?.role || FALLBACK_DATA.position,
    location: currentAnalysis?.location || FALLBACK_DATA.location,
    date: currentAnalysis?.createdAt || FALLBACK_DATA.date,
    verdict: {
      label: currentAnalysis?.matchScore && currentAnalysis.matchScore >= 85 ? '值得投' : '可以投',
      score: currentAnalysis?.matchScore || FALLBACK_DATA.verdict.score,
      stars: 5,
      why: currentAnalysis?.keyInsights?.[0] || FALLBACK_DATA.verdict.why,
      risk: currentAnalysis?.keyRisks?.[0] || FALLBACK_DATA.verdict.risk,
      suggestions: currentAnalysis?.strategicAdvice || FALLBACK_DATA.verdict.suggestions
    },
    coreGoal: currentAnalysis?.rawJdText?.slice(0, 150) || FALLBACK_DATA.coreGoal,
    responsibilities: FALLBACK_DATA.responsibilities,
    ats: {
      hardSkills: currentAnalysis?.atsKeywords?.hardSkills || FALLBACK_DATA.ats.hardSkills,
      softSkills: currentAnalysis?.atsKeywords?.softSkills || FALLBACK_DATA.ats.softSkills,
      coverage: FALLBACK_DATA.ats.coverage,
      expKeywords: currentAnalysis?.atsKeywords?.expKeywords || FALLBACK_DATA.ats.expKeywords
    },
    subtext: FALLBACK_DATA.subtext,
    skillGap: FALLBACK_DATA.skillGap,
    recommended: FALLBACK_DATA.recommended
  };

  const matchedJob = currentAnalysis
    ? jobs.find(
        (j) =>
          j.id === currentAnalysis.jobId ||
          (j.company === currentAnalysis.company && j.role === currentAnalysis.role)
      ) || jobs[0]
    : undefined;

  const handleReturnToWizard = () => {
    if (matchedJob) {
      setSelectedJobId(matchedJob.id);
    }
    if (currentAnalysis) {
      setSelectedJDId(currentAnalysis.id);
    }
    const target = jdAnalysisReturnTarget;
    setJdAnalysisReturnTarget(null);

    if (target === 'create_interview') {
      showToast({
        type: 'success',
        title: '已带入岗位并返回',
        message: `已自动关联「${data.company} · ${data.position}」进入新建面试。`
      });
      navigateTo('create_interview');
    } else if (target === 'create_review') {
      showToast({
        type: 'success',
        title: '已带入岗位并返回',
        message: `已自动关联「${data.company} · ${data.position}」进入新建复盘。`
      });
      navigateTo('create_review');
    } else {
      navigateTo('jd_analysis_center');
    }
  };

  const handleGoToResume = () => {
    if (onNavigateToResume) {
      onNavigateToResume();
    } else if (matchedJob) {
      setSelectedJobId(matchedJob.id);
      navigateTo('resume_editor', { jobId: matchedJob.id });
    } else {
      navigateTo('resume_editor');
    }
  };

  return (
    <div className="min-h-full bg-white pb-24">
      <div className="max-w-[800px] mx-auto px-6 sm:px-8 pt-6 md:pt-8 animate-in fade-in duration-300">
        {/* Back Link */}
        <button
          type="button"
          onClick={() => {
            if (jdAnalysisReturnTarget) {
              handleReturnToWizard();
            } else {
              navigateTo('jd_analysis_center');
            }
          }}
          className="flex items-center gap-1.5 text-xs text-[#737873] hover:text-[#202421] transition cursor-pointer mb-5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>
            {jdAnalysisReturnTarget === 'create_interview'
              ? '返回新建面试'
              : jdAnalysisReturnTarget === 'create_review'
              ? '返回新建复盘'
              : 'JD 分析'}
          </span>
        </button>

        {/* Title Header & Edit Controls (Exact Match with Image 6) */}
        <div className="flex justify-between items-start mb-7">
          <div>
            <h1 className="text-[22px] md:text-2xl font-bold text-[#202421] tracking-tight mb-1.5">
              {data.position}
            </h1>
            <div className="text-xs sm:text-[13px] text-[#A8ADA8]">
              {data.company} · {data.location} · 分析于 {data.date}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                showToast({
                  type: 'info',
                  title: '编辑 JD',
                  message: '可重新修改岗位 JD 描述并再次研判。'
                })
              }
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#737873] hover:text-[#202421] border border-[#E4E5E0] hover:border-[#C8D8D1] rounded-lg bg-white shadow-2xs transition cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>编辑</span>
            </button>
            <button
              type="button"
              onClick={() =>
                showToast({
                  type: 'info',
                  title: '更多操作',
                  message: '支持重新分析、导出报告或删除。'
                })
              }
              className="w-8 h-8 rounded-lg border border-[#E4E5E0] hover:border-[#C8D8D1] bg-white flex items-center justify-center text-[#737873] hover:text-[#202421] shadow-2xs transition cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── AI 岗位判断 Card (Exact Match with Image 6) ── */}
        <div className="bg-[#F5FAF7] border border-[#C8D8D1] rounded-2xl p-6 sm:p-7 mb-7 shadow-2xs">
          <div className="text-[11px] font-bold text-[#3E6256] uppercase tracking-wider mb-3">
            AI 岗位判断
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="text-[28px] font-extrabold text-[#202421] tracking-tight mb-1.5">
                {data.verdict.label}
              </div>

              {/* Stars & Recommendation Index */}
              <div className="flex items-center gap-1 mb-3.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < data.verdict.stars ? 'text-[#B7794B]' : 'text-[#DDD8D0]'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-xs text-[#A8ADA8] ml-2">推荐指数</span>
              </div>

              {/* Reason description */}
              <p className="text-[13.5px] text-[#4A6559] leading-relaxed mb-3">
                {data.verdict.why}
              </p>

              {/* Risk warning */}
              <div className="text-[12.5px] text-[#B7794B] flex items-start gap-1.5">
                <span className="shrink-0 mt-0.5">⚠</span>
                <span>
                  <strong>主要风险：</strong>
                  {data.verdict.risk}
                </span>
              </div>
            </div>

            {/* Score Big Display */}
            <div className="text-center shrink-0 self-center sm:self-start">
              <div className="text-[44px] font-black text-[#3E6256] leading-none tracking-tight">
                {data.verdict.score}%
              </div>
              <div className="text-xs text-[#A8ADA8] mt-1">匹配度</div>
            </div>
          </div>

          {/* Suggestions List */}
          {data.verdict.suggestions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#C8D8D1]/80">
              <div className="text-xs font-bold text-[#3E6256] mb-2">简历调整建议</div>
              <div className="space-y-1.5">
                {data.verdict.suggestions.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#4A6559]">
                    <span className="font-bold text-[#A8ADA8] shrink-0">
                      {'①②③④⑤'[i] || `${i + 1}`}
                    </span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── 01 岗位理解 ── */}
        <div className="mb-8">
          <SectionTitle num="01" title="岗位理解" />

          {/* Core Goal */}
          <div className="bg-[#FAFAF8] rounded-xl p-4 sm:p-5 mb-5 border border-[#E4E5E0]/50">
            <div className="text-[11px] font-bold text-[#A8ADA8] uppercase tracking-wider mb-2">
              核心岗位目标
            </div>
            <p className="text-[13.5px] text-[#4A5A52] leading-relaxed m-0">
              {data.coreGoal}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="text-[13px] font-bold text-[#202421] mb-3.5">核心职责</div>
          <div className="space-y-4">
            {data.responsibilities.map((r) => (
              <div key={r.num} className="flex items-start gap-3.5">
                <span className="text-[11.5px] font-bold text-[#A8ADA8] min-w-[22px] pt-0.5">
                  {r.num}
                </span>
                <div>
                  <div className="text-[13.5px] font-bold text-[#202421] mb-1">
                    {r.title}
                  </div>
                  <p className="text-[13px] text-[#737873] leading-relaxed m-0">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 02 ATS 解析 ── */}
        <div className="mb-8">
          <SectionTitle num="02" title="ATS 解析" />

          {/* Hard and Soft Skills 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-[#FAFAF8] border border-[#E4E5E0] rounded-xl p-4">
              <div className="text-[11px] font-bold text-[#A8ADA8] uppercase tracking-wider mb-2.5">
                核心硬技能
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.ats.hardSkills.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 bg-white border border-[#E4E5E0] rounded-md text-[#4A5252]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#FAFAF8] border border-[#E4E5E0] rounded-xl p-4">
              <div className="text-[11px] font-bold text-[#A8ADA8] uppercase tracking-wider mb-2.5">
                软技能
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.ats.softSkills.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 bg-white border border-[#E4E5E0] rounded-md text-[#4A5252]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Keyword Coverage */}
          <div className="mb-3.5">
            <div className="text-[13px] font-bold text-[#202421] mb-2.5">
              JD 关键词覆盖情况
            </div>
            <div className="flex flex-wrap gap-2">
              {data.ats.coverage.map(({ word, covered }) => (
                <span
                  key={word}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium border flex items-center gap-1 ${
                    covered
                      ? 'text-[#3E6256] bg-[#E5EEE9] border-[#C8D8D1]'
                      : 'text-[#B7794B] bg-[#F4E8DE] border-[#E8C8A8]'
                  }`}
                >
                  <span>{covered ? '✓' : '✗'}</span>
                  <span>{word}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Exp Keywords */}
          <div>
            <div className="text-xs text-[#A8ADA8] mb-2">经验关键词要求</div>
            <div className="flex flex-wrap gap-1.5">
              {data.ats.expKeywords.map((kw) => (
                <span
                  key={kw}
                  className="text-xs px-2.5 py-1 bg-[#F5F5F2] border border-[#E4E5E0] rounded-md text-[#737873]"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── 03 暗话分析 ── */}
        <div className="mb-8">
          <SectionTitle num="03" title="暗话分析" />
          <div className="text-xs text-[#A8ADA8] mb-4 flex items-center gap-1.5">
            <span>⚠</span>
            <span>以下为 AI 推断，不代表招聘方事实。仅供参考。</span>
          </div>

          <div className="space-y-4">
            {data.subtext.map((item, idx) => (
              <div
                key={item.num}
                className={`pb-4 ${
                  idx < data.subtext.length - 1 ? 'border-b border-[#F0F0EC]' : ''
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <span className="text-[11px] font-bold text-[#A8ADA8] min-w-[22px] pt-1">
                    {item.num}
                  </span>
                  <div className="flex-1">
                    <div className="text-[13px] italic text-[#737873] bg-[#FAFAF8] p-2.5 rounded-md mb-2.5 border-l-2 border-[#D0D2CB]">
                      {item.original}
                    </div>
                    <div className="grid grid-cols-[70px_1fr] gap-x-3 gap-y-1.5 text-xs">
                      <span className="font-semibold text-[#A8ADA8] pt-0.5">字面要求</span>
                      <p className="text-[#4A5252] m-0 leading-relaxed">{item.literal}</p>
                      <span className="font-semibold text-[#3E6256] pt-0.5">实际考察</span>
                      <p className="text-[#4A5A52] font-medium m-0 leading-relaxed">
                        {item.actual}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 04 能力缺口 ── */}
        <div className="mb-8">
          <SectionTitle num="04" title="能力缺口" />
          <div className="border border-[#E4E5E0] rounded-xl overflow-hidden shadow-2xs">
            {/* Table Header */}
            <div className="grid grid-cols-[100px_1fr_1fr_60px_1fr] bg-[#FAFAF8] px-3.5 py-2.5 border-b border-[#E4E5E0] text-[11px] font-bold text-[#A8ADA8] uppercase tracking-wider">
              <span>能力</span>
              <span>你的证据</span>
              <span>岗位要求</span>
              <span>评估</span>
              <span>建议</span>
            </div>

            {/* Table Rows */}
            {data.skillGap.map((item, i) => {
              const icon =
                item.status === 'strong' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6256]" />
                ) : item.status === 'partial' ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-[#B7794B]" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-[#C44040]" />
                );

              const rowBg =
                item.status === 'partial'
                  ? 'bg-[#FFFCF9]'
                  : item.status === 'none'
                  ? 'bg-[#FDFAFB]'
                  : 'bg-white';

              return (
                <div
                  key={i}
                  className={`grid grid-cols-[100px_1fr_1fr_60px_1fr] px-3.5 py-3 border-b border-[#F5F5F2] last:border-b-0 items-start text-xs ${rowBg}`}
                >
                  <span className="font-bold text-[#202421]">{item.ability}</span>
                  <span className="text-[#737873] pr-2 leading-relaxed">{item.evidence}</span>
                  <span className="text-[#4A5252] pr-2 leading-relaxed">{item.requirement}</span>
                  <div className="flex items-center">{icon}</div>
                  <span className="text-[#737873] leading-relaxed">{item.suggestion}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 05 推荐经历 ── */}
        <div className="mb-8">
          <SectionTitle num="05" title="推荐经历" />
          <p className="text-xs text-[#737873] mb-4">
            根据 JD 要求，以下经历最值得在简历和面试中重点表达
          </p>

          <div className="space-y-4">
            {data.recommended.map((exp, idx) => (
              <div
                key={exp.id}
                className={`flex gap-3.5 pb-4 ${
                  idx < data.recommended.length - 1 ? 'border-b border-[#F0F0EC]' : ''
                }`}
              >
                <div className="min-w-[22px] pt-0.5 text-xs font-bold text-[#A8ADA8]">
                  {exp.num}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <span className="text-sm font-bold text-[#202421] mr-2">
                        {exp.title}
                      </span>
                      <span className="text-xs text-[#A8ADA8]">
                        {exp.type} · {exp.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={`text-sm font-extrabold ${
                          exp.matchScore >= 80 ? 'text-[#3E6256]' : 'text-[#B7794B]'
                        }`}
                      >
                        {exp.matchScore}%
                      </span>
                      <span className="text-[11px] text-[#A8ADA8]">匹配度</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11.5px] px-2 py-0.5 bg-[#E5EEE9] text-[#3E6256] rounded border border-[#C8D8D1]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Reason */}
                  <p className="text-xs text-[#737873] leading-relaxed mb-2.5">
                    {exp.reason}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => navigateTo('experiences', { initialExpId: exp.id })}
                      className="px-3 py-1 text-xs font-semibold text-[#3E6256] border border-[#C8D8D1] rounded-lg bg-[#F5FAF7] hover:bg-[#E5EEE9] transition cursor-pointer"
                    >
                      查看经历
                    </button>
                    <button
                      type="button"
                      onClick={handleGoToResume}
                      className="px-3 py-1 text-xs font-medium text-[#737873] border border-[#E4E5E0] rounded-lg bg-white hover:bg-[#FAFAF8] transition cursor-pointer"
                    >
                      用于简历
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 底部下一步卡片 (Exact Match with Image 6 & Return Flow) ── */}
        {jdAnalysisReturnTarget ? (
          <div className="space-y-2.5">
            <div className="bg-[#F5FAF7] border border-[#C8D8D1] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xs">
              <div>
                <div className="text-sm font-bold text-[#202421] mb-1">
                  {jdAnalysisReturnTarget === 'create_interview'
                    ? '返回新建面试并使用此岗位'
                    : '返回新建复盘并使用此岗位'}
                </div>
                <p className="text-xs text-[#4A6559] m-0">
                  {jdAnalysisReturnTarget === 'create_interview'
                    ? 'JD 分析已完成，AI 将自动带入此岗位的分析结果为你生成面试准备方案。'
                    : 'JD 分析已完成，AI 将自动关联此岗位数据进行面试复盘。'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleReturnToWizard}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#3E6256] hover:bg-[#345449] text-white rounded-xl text-xs sm:text-[13px] font-bold shadow-xs transition shrink-0 cursor-pointer"
              >
                <span>
                  {jdAnalysisReturnTarget === 'create_interview'
                    ? '返回新建面试'
                    : '返回新建复盘'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white border border-[#E4E5E0] rounded-2xl px-6 py-4 flex justify-between items-center">
              <p className="text-xs text-[#737873] m-0">也可以先去制作定制简历，再回来创建面试。</p>
              <button
                type="button"
                onClick={handleGoToResume}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-transparent text-[#3E6256] border border-[#C8D8D1] rounded-lg text-xs font-semibold hover:bg-[#F5FAF7] transition cursor-pointer"
              >
                <span>去定制简历</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E4E5E0] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xs">
            <div>
              <div className="text-sm font-bold text-[#202421] mb-1">下一步</div>
              <p className="text-xs text-[#737873] m-0">
                整体匹配度较高，可以开始制作定制简历，重点突出推荐经历。
              </p>
            </div>
            <button
              type="button"
              onClick={handleGoToResume}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#3E6256] hover:bg-[#345449] text-white rounded-xl text-xs sm:text-[13px] font-bold shadow-xs transition shrink-0 cursor-pointer"
            >
              <span>去定制简历</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
