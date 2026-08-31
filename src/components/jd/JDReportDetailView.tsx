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
  X
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
      {/* 1. Header & Navigation Context Bar */}
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
              分析生成时间：{analysis.createdAt} · 数据来源：自主提交 JD 原文
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

      {/* 2. Structured Reading Flow Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium text-[#6B726F] border-b border-[#E6E6E1]/70">
        <span className="text-[#8A908C] font-normal shrink-0">研判动线：</span>
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
          2. ATS 关键词与任职画像
        </button>
        <button
          onClick={() => setActiveSection('subtext')}
          className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
            activeSection === 'subtext'
              ? 'bg-[#1D201F] text-white font-semibold'
              : 'hover:bg-[#F5F5F2] text-[#2C302E]'
          }`}
        >
          3. 招聘暗话与潜台词深度解读
        </button>
        <button
          onClick={() => setActiveSection('gaps')}
          className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
            activeSection === 'gaps'
              ? 'bg-[#1D201F] text-white font-semibold'
              : 'hover:bg-[#F5F5F2] text-[#2C302E]'
          }`}
        >
          4. 能力缺口与证据对照
        </button>
        <button
          onClick={() => setActiveSection('experiences')}
          className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
            activeSection === 'experiences'
              ? 'bg-[#1D201F] text-white font-semibold'
              : 'hover:bg-[#F5F5F2] text-[#2C302E]'
          }`}
        >
          5. 推荐经历调取清单
        </button>
      </div>

      {/* 3. SECTION 1: 核心研判与投递决策表单 (Executive Decision Form) */}
      {(activeSection === 'all' || activeSection === 'verdict') && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
          <div className="bg-[#F5F5F2] px-6 py-4 border-b border-[#E6E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center font-bold">
                <Award className="w-4 h-4 text-[#3E6256]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#1D201F]">一、岗位综合研判与投递决策表</h2>
                <p className="text-[11px] text-[#6B726F]">基于岗位要求与候选人经历库的匹配度矩阵生成的综合结论</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="text-[#6B726F] font-normal">推荐指数：</span>
                <span className="text-[#B7794B] tracking-wider font-bold text-sm">
                  {'★'.repeat(analysis.recommendationStars || 5)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#6B726F] font-normal">决策结论：</span>
                <span className="px-2 py-0.5 rounded bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
                  值得投递
                </span>
              </div>
            </div>
          </div>

          {/* Form-style structured key findings */}
          <div className="divide-y divide-[#E6E6E1]">
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-xs font-bold text-[#1D201F] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3E6256] shrink-0" />
                <span>核心匹配亮点与杀手锏</span>
              </div>
              <div className="md:col-span-9 text-xs text-[#2C302E] leading-relaxed bg-[#F5F5F2]/50 p-3.5 rounded-lg border border-[#E6E6E1]">
                <p className="font-medium text-[#1D201F] mb-1">{analysis.verdictSummary}</p>
                <p className="text-[#6B726F]">{analysis.whyMatch}</p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-xs font-bold text-[#1D201F] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#B7794B] shrink-0" />
                <span>关键考察风险与潜在短板</span>
              </div>
              <div className="md:col-span-9 text-xs text-[#2C302E] leading-relaxed bg-[#FAF2EB]/40 p-3.5 rounded-lg border border-[#F0DFD1]">
                <p className="text-[#8F5128] font-medium">{analysis.keyRisks}</p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-xs font-bold text-[#1D201F] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#3E6256] shrink-0" />
                <span>简历定制与突破策略</span>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="grid grid-cols-1 gap-2">
                  {(analysis.resumeAdvice || []).map((adv, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-[#2C302E] bg-white p-2.5 rounded-lg border border-[#E6E6E1]"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#E8F1EC] text-[#2D4B41] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SECTION 2: ATS 关键词与任职画像拆解表 (ATS Keyword Form/Table) */}
      {(activeSection === 'all' || activeSection === 'ats') && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
          <div className="bg-[#F5F5F2] px-6 py-4 border-b border-[#E6E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center font-bold">
                <FileSearch className="w-4 h-4 text-[#3E6256]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#1D201F]">二、ATS 关键词扫描与岗位画像分解表</h2>
                <p className="text-[11px] text-[#6B726F]">
                  招聘系统（ATS）初筛算法加权词库与候选人现有履历覆盖率对照
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#6B726F]">
                <span>初筛预估覆盖率：</span>
                <span className="text-[#3E6256] font-bold text-sm">
                  {analysis.atsKeywords?.coveragePercent || 94}%
                </span>
              </div>
              <button
                onClick={handleCopyKeywords}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-[#F5F5F2] text-[#1D201F] border border-[#E6E6E1] text-xs font-medium transition"
              >
                {copiedKeywords ? <Check className="w-3.5 h-3.5 text-[#3E6256]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKeywords ? '已复制' : '一键复制关键词'}</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E6E6E1] text-[#6B726F] font-semibold bg-[#FAFAFA]">
                  <th className="p-3.5 w-36">能力维度</th>
                  <th className="p-3.5">ATS 关键词列表与状态</th>
                  <th className="p-3.5 w-32">考核权重</th>
                  <th className="p-3.5 w-48">简历推荐植入位置</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E6E1]">
                <tr>
                  <td className="p-3.5 font-bold text-[#1D201F] align-top bg-[#F5F5F2]/30">
                    硬性技能与技术栈
                  </td>
                  <td className="p-3.5 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      {(analysis.atsKeywords?.hardSkills || []).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#E8F1EC] text-[#2D4B41] text-[11px] font-semibold border border-[#D3E2DB] flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-[#3E6256]" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 align-top font-bold text-[#3E6256]">极高 (核心机筛项)</td>
                  <td className="p-3.5 align-top text-[#6B726F]">项目经历首句、专业技能栏</td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-[#1D201F] align-top bg-[#F5F5F2]/30">
                    业务场景与经验关键词
                  </td>
                  <td className="p-3.5 align-top">
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
                  </td>
                  <td className="p-3.5 align-top font-semibold text-[#1D201F]">高 (业务匹配度)</td>
                  <td className="p-3.5 align-top text-[#6B726F]">项目背景、核心行动与业务结果</td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-[#1D201F] align-top bg-[#F5F5F2]/30">
                    软技能与方法论
                  </td>
                  <td className="p-3.5 align-top">
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
                  </td>
                  <td className="p-3.5 align-top text-[#6B726F]">中 (加分参考)</td>
                  <td className="p-3.5 align-top text-[#6B726F]">团队协同、项目主导描述</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. SECTION 3: JD 招聘暗话与底层考核意图深度解读表 (Subtext Matrix) */}
      {(activeSection === 'all' || activeSection === 'subtext') && analysis.subtextAnalysis && analysis.subtextAnalysis.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
          <div className="bg-[#F5F5F2] px-6 py-4 border-b border-[#E6E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 text-[#3E6256]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#1D201F]">三、招聘暗话与底层考核意图深度解读表</h2>
                <p className="text-[11px] text-[#6B726F]">穿透岗位字面描述，还原招聘团队真实业务痛点与面试官考点</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[#8F5128] bg-[#FAF2EB] px-2.5 py-1 rounded-full border border-[#F0DFD1]">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>AI 策略研判，旨在帮助求职者精准对齐考官期待</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E6E6E1] text-[#6B726F] font-semibold bg-[#FAFAFA]">
                  <th className="p-3.5 w-12 text-center">#</th>
                  <th className="p-3.5 w-64">JD 原文字句</th>
                  <th className="p-3.5 w-52">字面表层含义</th>
                  <th className="p-3.5">背后真实业务痛点 & 考官真实考察意图</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E6E1]">
                {(analysis.subtextAnalysis || []).map((sub, idx) => (
                  <tr key={sub.id || idx} className="hover:bg-[#F5F5F2]/40 transition">
                    <td className="p-3.5 text-center font-bold text-[#8A908C] align-top">
                      {idx + 1}
                    </td>
                    <td className="p-3.5 font-semibold text-[#1D201F] align-top bg-[#F5F5F2]/20">
                      <div className="border-l-2 border-[#3E6256] pl-2">
                        "{sub.rawJD}"
                      </div>
                    </td>
                    <td className="p-3.5 text-[#6B726F] align-top leading-relaxed">
                      {sub.literalMeaning}
                    </td>
                    <td className="p-3.5 text-[#1D201F] align-top leading-relaxed bg-[#E8F1EC]/20 font-medium">
                      <div className="text-[#2D4B41]">
                        {sub.realEvaluation}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. SECTION 4: 能力缺口与证据对照审计表 (Capability Gap & Evidence Audit) */}
      {(activeSection === 'all' || activeSection === 'gaps') && analysis.skillGaps && analysis.skillGaps.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
          <div className="bg-[#F5F5F2] px-6 py-4 border-b border-[#E6E6E1] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center font-bold">
                <ShieldAlert className="w-4 h-4 text-[#B7794B]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#1D201F]">四、能力缺口与个人证据对照审计表</h2>
                <p className="text-[11px] text-[#6B726F]">评估岗位硬性指标与现有资产的差距，提前制定应对策略</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E6E6E1] text-[#6B726F] font-semibold bg-[#FAFAFA]">
                  <th className="p-3.5 w-36">考核能力维度</th>
                  <th className="p-3.5 w-48">岗位核心诉求</th>
                  <th className="p-3.5 w-48">你的现有证据数据</th>
                  <th className="p-3.5 w-28">差距评级</th>
                  <th className="p-3.5">推荐弥补与防守话术建议</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E6E1]">
                {(analysis.skillGaps || []).map((gap) => (
                  <tr key={gap.id} className="hover:bg-[#F5F5F2]/40 transition">
                    <td className="p-3.5 font-bold text-[#1D201F] align-top bg-[#F5F5F2]/20">
                      {gap.capability}
                    </td>
                    <td className="p-3.5 text-[#6B726F] align-top leading-relaxed">
                      {gap.requirement}
                    </td>
                    <td className="p-3.5 text-[#1D201F] align-top leading-relaxed font-medium">
                      {gap.userEvidence}
                    </td>
                    <td className="p-3.5 align-top">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FAF2EB] text-[#8F5128] border border-[#F0DFD1] inline-block">
                        {gap.gap}
                      </span>
                    </td>
                    <td className="p-3.5 text-[#1D201F] align-top leading-relaxed bg-[#E8F1EC]/30 font-medium">
                      {gap.recommendation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. SECTION 5: 推荐关联的职业经历资产调取表 (Linked Experience Table) */}
      {(activeSection === 'all' || activeSection === 'experiences') && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs">
          <div className="bg-[#F5F5F2] px-6 py-4 border-b border-[#E6E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center font-bold">
                <Layers className="w-4 h-4 text-[#3E6256]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#1D201F]">五、推荐调取的王牌经历资产清单</h2>
                <p className="text-[11px] text-[#6B726F]">从你的「经历资产库」中精准识别最匹配该岗位的结构化经历</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('experiences')}
              className="text-xs text-[#3E6256] hover:text-[#325046] font-semibold flex items-center gap-1 transition self-start sm:self-auto"
            >
              <span>管理经历资产库</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E6E6E1] text-[#6B726F] font-semibold bg-[#FAFAFA]">
                  <th className="p-3.5 w-60">经历资产名称</th>
                  <th className="p-3.5 w-24">匹配度</th>
                  <th className="p-3.5 w-52">命中 JD 具体诉求</th>
                  <th className="p-3.5">推荐调取理由</th>
                  <th className="p-3.5 w-32 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E6E1]">
                {(analysis.recommendedExperiences || []).map((rec) => {
                  const exp = experiences.find((e) => e.id === rec.experienceId);
                  if (!exp) return null;

                  return (
                    <tr key={rec.experienceId} className="hover:bg-[#F5F5F2]/40 transition">
                      <td className="p-3.5 align-top font-bold text-[#1D201F]">
                        <div className="leading-snug">{exp.title}</div>
                        <div className="text-[10px] text-[#8A908C] font-normal mt-0.5">
                          {exp.company} · {exp.period}
                        </div>
                      </td>
                      <td className="p-3.5 align-top">
                        <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
                          {rec.matchScore}%
                        </span>
                      </td>
                      <td className="p-3.5 align-top text-[#6B726F] leading-relaxed">
                        {rec.matchingJDReq}
                      </td>
                      <td className="p-3.5 align-top text-[#1D201F] leading-relaxed">
                        {rec.reason}
                      </td>
                      <td className="p-3.5 align-top text-right space-y-1">
                        <button
                          onClick={() => navigateTo('experiences', { expId: exp.id })}
                          className="w-full px-2.5 py-1 rounded bg-white hover:bg-[#F5F5F2] text-[#1D201F] border border-[#E6E6E1] text-[11px] font-medium transition"
                        >
                          查看经历
                        </button>
                        <button
                          onClick={() => {
                            if (onNavigateToResume) onNavigateToResume();
                            else navigateTo('resume_editor', { jobId: analysis.jobId });
                          }}
                          className="w-full px-2.5 py-1 rounded bg-[#3E6256] hover:bg-[#325046] text-white text-[11px] font-semibold transition"
                        >
                          用于定制
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
                className="p-1 rounded-lg hover:bg-[#F5F5F2] text-[#6B726F] transition"
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
                className="px-4 py-1.5 rounded-lg bg-[#1D201F] text-white text-xs font-semibold hover:bg-[#2C302E] transition"
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
