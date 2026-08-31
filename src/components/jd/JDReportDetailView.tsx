import React, { useState } from 'react';
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
  Info,
  ExternalLink,
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  Target,
  BarChart3,
  HelpCircle,
  Briefcase
} from 'lucide-react';

interface JDReportDetailViewProps {
  analysisId?: string;
  onNavigateToResume?: () => void;
  onNavigateToInterview?: () => void;
  embedded?: boolean;
}

export const JDReportDetailView: React.FC<JDReportDetailViewProps> = ({
  analysisId = 'jd-byte-1',
  onNavigateToResume,
  onNavigateToInterview,
  embedded = false
}) => {
  const { jdAnalyses, experiences, navigateTo } = useJobCraft();
  const [showRawJD, setShowRawJD] = useState(false);
  const [copiedKeywords, setCopiedKeywords] = useState(false);
  const [activeSection, setActiveSection] = useState<'all' | 'verdict' | 'ats' | 'subtext' | 'gaps' | 'experiences'>('all');

  const analysis = jdAnalyses.find((a) => a.id === analysisId) || jdAnalyses[0];

  if (!analysis) {
    return (
      <div className="p-8 text-center text-[#6B726F]">未找到对应的 JD 分析报告</div>
    );
  }

  const handleCopyKeywords = () => {
    const allKeywords = [
      ...(analysis.atsKeywords?.hardSkills || []),
      ...(analysis.atsKeywords?.softSkills || []),
      ...(analysis.atsKeywords?.expKeywords || [])
    ].join(', ');
    navigator.clipboard.writeText(allKeywords);
    setCopiedKeywords(true);
    setTimeout(() => setCopiedKeywords(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-6 animate-in fade-in duration-300">
      {/* 1. Header (Rendered ONLY when not embedded in JobWorkspace to prevent duplicate header) */}
      {!embedded && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E6E1] pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('jd_analysis_center')}
              className="p-1.5 rounded-lg border border-[#E6E6E1] bg-white hover:bg-[#F5F5F2] text-[#6B726F] hover:text-[#1D201F] transition shrink-0"
              title="返回 JD 分析中心"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#1D201F] tracking-tight">
                  {analysis.company} · {analysis.role}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
                  匹配度 {analysis.matchScore}%
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FAF2EB] text-[#8F5128] border border-[#F0DFD1]">
                  {analysis.salaryRange || '薪资面议'}
                </span>
              </div>
              <p className="text-xs text-[#6B726F] mt-0.5">
                深度研判报告 · 生成时间：{analysis.createdAt} · 结构化分析
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowRawJD(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E6E6E1] bg-white hover:bg-[#F5F5F2] text-[#1D201F] text-xs font-medium transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#3E6256]" />
              <span>查看 JD 原文</span>
            </button>

            {onNavigateToResume ? (
              <button
                onClick={onNavigateToResume}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold shadow-xs transition"
              >
                <span>进入简历定制</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => navigateTo('resume_editor', { jobId: analysis.jobId })}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold shadow-xs transition"
              >
                <span>进入简历定制</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Embedded Quick Toolbar */}
      {embedded && (
        <div className="flex items-center justify-between gap-4 bg-white rounded-xl border border-[#E6E6E1] px-4 py-2.5 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3E6256]" />
            <span className="text-xs font-bold text-[#1D201F]">JD 深度研判报告已就绪</span>
            <span className="text-xs text-[#6B726F]">（综合匹配度 {analysis.matchScore}%）</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRawJD(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E6E6E1] bg-[#FAFBF9] hover:bg-[#F0F0EB] text-[#1D201F] text-xs transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#3E6256]" />
              <span>查看 JD 原文</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Structured Reading Flow Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium text-[#6B726F] border-b border-[#E6E6E1]/70">
        <span className="text-[#8A908C] font-normal shrink-0">研判报告动线：</span>
        <button
          onClick={() => setActiveSection('all')}
          className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
            activeSection === 'all'
              ? 'bg-[#1D201F] text-white font-semibold'
              : 'hover:bg-[#F5F5F2] text-[#2C302E]'
          }`}
        >
          全景研判总览
        </button>
        <button
          onClick={() => setActiveSection('verdict')}
          className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
            activeSection === 'verdict'
              ? 'bg-[#1D201F] text-white font-semibold'
              : 'hover:bg-[#F5F5F2] text-[#2C302E]'
          }`}
        >
          1. 投递决策与核心研判
        </button>
        <button
          onClick={() => setActiveSection('ats')}
          className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
            activeSection === 'ats'
              ? 'bg-[#1D201F] text-white font-semibold'
              : 'hover:bg-[#F5F5F2] text-[#2C302E]'
          }`}
        >
          2. ATS 关键词穿透
        </button>
        <button
          onClick={() => setActiveSection('subtext')}
          className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
            activeSection === 'subtext'
              ? 'bg-[#1D201F] text-white font-semibold'
              : 'hover:bg-[#F5F5F2] text-[#2C302E]'
          }`}
        >
          3. 隐性要求与黑话解密
        </button>
        <button
          onClick={() => setActiveSection('gaps')}
          className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
            activeSection === 'gaps'
              ? 'bg-[#1D201F] text-white font-semibold'
              : 'hover:bg-[#F5F5F2] text-[#2C302E]'
          }`}
        >
          4. 差距分析与面试防守
        </button>
        <button
          onClick={() => setActiveSection('experiences')}
          className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
            activeSection === 'experiences'
              ? 'bg-[#1D201F] text-white font-semibold'
              : 'hover:bg-[#F5F5F2] text-[#2C302E]'
          }`}
        >
          5. 经历库支撑映射 ({analysis.experienceMatches?.length || 0})
        </button>
      </div>

      {/* 3. Section 1: Executive Verdict & Strategic Recommendation */}
      {(activeSection === 'all' || activeSection === 'verdict') && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5F5F2] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#3E6256]" />
              <h2 className="text-base font-bold text-[#1D201F]">1. 投递决策判决与核心研判</h2>
            </div>
            <span className="text-xs font-semibold text-[#3E6256] bg-[#E8F1EC] px-2.5 py-0.5 rounded-full border border-[#D3E2DB]">
              AI 推荐建议：强力推进
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FAFBF9] p-4 rounded-xl border border-[#E6E6E1] space-y-1">
              <div className="text-xs text-[#8A908C] font-medium">综合匹配评级</div>
              <div className="text-2xl font-bold text-[#3E6256]">{analysis.matchScore}% / 极度契合</div>
              <div className="text-[11px] text-[#6B726F]">具备大模型全栈评估与 Prompt/Agent 架构实战经历</div>
            </div>

            <div className="bg-[#FAFBF9] p-4 rounded-xl border border-[#E6E6E1] space-y-1">
              <div className="text-xs text-[#8A908C] font-medium">业务真实紧迫度</div>
              <div className="text-2xl font-bold text-[#1D201F]">高 (核心战略团队)</div>
              <div className="text-[11px] text-[#6B726F]">字节核心业务线重点项目，HC 直通总监面</div>
            </div>

            <div className="bg-[#FAFBF9] p-4 rounded-xl border border-[#E6E6E1] space-y-1">
              <div className="text-xs text-[#8A908C] font-medium">定制策略重点</div>
              <div className="text-2xl font-bold text-[#8F5128]">突出工程+业务闭环</div>
              <div className="text-[11px] text-[#6B726F]">强化量化 Benchmark 评测集与降本提效数据</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF2EB] border border-[#F0DFD1] text-xs text-[#8F5128] leading-relaxed">
            <strong className="font-semibold">研判决策小结：</strong> 该岗位要求求职者不仅懂大模型技术原理（如 Eval、微调、RAG、Prompt 工程），更看重在复杂业务场景下的指标定义与可解释性评测落地。您的经历资产库中有 2 个项目能够提供 5 星级证据支撑，建议重点强化「量化评测指标」与「业务指标提升」两项成果输出。
          </div>
        </div>
      )}

      {/* 4. Section 2: ATS Keywords & Frequency Penetration */}
      {(activeSection === 'all' || activeSection === 'ats') && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5F5F2] pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#3E6256]" />
              <h2 className="text-base font-bold text-[#1D201F]">2. ATS 筛选关键词穿透与词频矩阵</h2>
            </div>
            <button
              onClick={handleCopyKeywords}
              className="flex items-center gap-1 text-xs font-semibold text-[#3E6256] hover:text-[#325046] transition"
            >
              {copiedKeywords ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>已复制全部关键词</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>一键复制关键词</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Hard skills */}
            <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E6E6E1] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1D201F]">硬技能 / 技术栈</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E8F1EC] text-[#2D4B41] font-semibold">
                  命中率 95%
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(analysis.atsKeywords?.hardSkills || [
                  '大模型评测',
                  'Benchmark',
                  'Prompt工程',
                  'RAG',
                  'Badcase分析',
                  'Python',
                  '评测平台'
                ]).map((k, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white border border-[#E6E6E1] text-[#1D201F] text-xs font-medium"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft skills */}
            <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E6E6E1] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1D201F]">软性素质 / 协同能力</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E8F1EC] text-[#2D4B41] font-semibold">
                  命中率 90%
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(analysis.atsKeywords?.softSkills || [
                  '跨团队协作',
                  '算法团队协同',
                  '数据驱动',
                  '复杂业务抽象',
                  '抗压与交付'
                ]).map((k, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white border border-[#E6E6E1] text-[#1D201F] text-xs font-medium"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience keywords */}
            <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E6E6E1] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1D201F]">业务与行业经历词</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E8F1EC] text-[#2D4B41] font-semibold">
                  命中率 88%
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(analysis.atsKeywords?.expKeywords || [
                  '从0到1平台搭建',
                  '日均千万级调用',
                  '商业化落地',
                  'A/B测试实验'
                ]).map((k, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white border border-[#E6E6E1] text-[#1D201F] text-xs font-medium"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Section 3: Hidden Subtext & Team Culture Breakdown */}
      {(activeSection === 'all' || activeSection === 'subtext') && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5F5F2] pb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#3E6256]" />
              <h2 className="text-base font-bold text-[#1D201F]">3. 隐性要求深度解密（JD 字面背后）</h2>
            </div>
            <span className="text-xs text-[#8A908C]">帮助洞悉团队业务痛点与面试官隐藏关切</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(analysis.hiddenRequirements || [
              {
                point: '“具备大模型实战经验”的潜台词',
                analysis: '不要只停留在调用 API 层面的玩具项目，必须能说清楚真实业务场景下的幻觉抑制、评测闭环与成本控制收益。'
              },
              {
                point: '“与算法紧密配合”的潜台词',
                analysis: '算法团队往往看重指标，产品需要能用工程与评测语言给算法定 Benchmark，而不是被动等待算法产出。'
              },
              {
                point: '“从0到1构建体系”的潜台词',
                analysis: '目前该方向基础沉淀较少，入职后需要具备极强的主动性，能够自己找业务场景与合作方并完成落地闭环。'
              },
              {
                point: '“数据敏感度极高”的潜台词',
                analysis: '面试时一定会追问指标量化的计算口径、AB 测试的置信度、以及负向样本分析过程，必须准备详实数据。'
              }
            ]).map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E6E6E1] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1D201F]">
                  <span className="w-5 h-5 rounded-full bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{item.point}</span>
                </div>
                <p className="text-xs text-[#6B726F] leading-relaxed pl-7">{item.analysis}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Section 4: Capability Gap Analysis & Interview Defense */}
      {(activeSection === 'all' || activeSection === 'gaps') && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5F5F2] pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#8F5128]" />
              <h2 className="text-base font-bold text-[#1D201F]">4. 能力短板预警与面试防守策略</h2>
            </div>
            <span className="text-xs text-[#8F5128] font-semibold bg-[#FAF2EB] px-2.5 py-0.5 rounded-full border border-[#F0DFD1]">
              已生成 2 条防守话术建议
            </span>
          </div>

          <div className="space-y-3">
            {(analysis.gapsAndSuggestions || [
              {
                gap: '缺乏千万级 C 端用户直接搜索产品的运营数据',
                suggestion: '突出在 B 端平台中应对高并发高稳定性（99.9% 可用性）的架构能力，并强调已沉淀的模型评测方法论可以直接迁移至 C 端搜索。',
                interviewProbe: '“如果面临亿级用户的日活请求，你之前的评测机制如何做动态采样与降噪？”'
              },
              {
                gap: '简历中尚未体现多模态（视觉/语音）大模型的评测落地',
                suggestion: '将现有文本大模型评测的泛化经验展开，阐明 Prompt 与 RAG 的评测范式在多模态理解任务中的共性与扩展路径。',
                interviewProbe: '“多模态图文问答场景下，你如何定义视觉幻觉的评测基准？”'
              }
            ]).map((gapItem, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E6E6E1] space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF2EB] text-[#8F5128] border border-[#F0DFD1] shrink-0 mt-0.5">
                    潜在差距 {idx + 1}
                  </span>
                  <div className="space-y-1 flex-1">
                    <div className="text-xs font-bold text-[#1D201F]">{gapItem.gap}</div>
                    <div className="text-xs text-[#6B726F] leading-relaxed">
                      <strong className="text-[#3E6256] font-semibold">推荐防守表述：</strong> {gapItem.suggestion}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-[#E6E6E1] text-[11px] text-[#2C302E] flex items-center gap-2">
                  <span className="font-semibold text-[#8F5128] shrink-0">高频追问预警：</span>
                  <span className="italic">{gapItem.interviewProbe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Section 5: Experience Library Evidence Mapping */}
      {(activeSection === 'all' || activeSection === 'experiences') && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5F5F2] pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#3E6256]" />
              <h2 className="text-base font-bold text-[#1D201F]">5. 经历资产库支撑度映射与定制建议</h2>
            </div>
            <span className="text-xs text-[#6B726F]">
              已关联 {analysis.experienceMatches?.length || experiences.length} 项核心经历资产
            </span>
          </div>

          <div className="space-y-3">
            {(analysis.experienceMatches || []).map((m, idx) => {
              const matchedExp = experiences.find((e) => e.id === m.experienceId);
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E6E6E1] hover:border-[#3E6256]/30 transition space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-xs text-[#1D201F]">
                        {matchedExp?.title || m.experienceId}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#E8F1EC] text-[#2D4B41] font-semibold">
                        匹配度 {m.matchScore}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#8A908C]">推荐突出：</span>
                      <span className="text-xs font-semibold text-[#3E6256]">
                        {m.customizationTip || '强化 Benchmark 量化产出'}
                      </span>
                    </div>
                  </div>

                  {matchedExp && (
                    <div className="text-xs text-[#6B726F] line-clamp-2 leading-relaxed bg-white p-2.5 rounded-lg border border-[#E6E6E1]/80">
                      {matchedExp.responsibility || matchedExp.background}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Raw JD Text Modal/Drawer */}
      {showRawJD && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E6E6E1] max-w-2xl w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E6E6E1] pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#3E6256]" />
                <h3 className="text-base font-bold text-[#1D201F]">
                  {analysis.company} · {analysis.role} · 原始招聘要求
                </h3>
              </div>
              <button
                onClick={() => setShowRawJD(false)}
                className="p-1 rounded-lg hover:bg-[#F5F5F2] text-[#6B726F] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 bg-[#F5F5F2] rounded-xl border border-[#E6E6E1] text-xs text-[#2C302E] leading-relaxed font-mono whitespace-pre-wrap">
              {analysis.rawText || '暂无原始 JD 文本'}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowRawJD(false)}
                className="px-4 py-1.5 rounded-lg bg-[#1D201F] text-white text-xs font-semibold hover:bg-[#2C302E] transition cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
