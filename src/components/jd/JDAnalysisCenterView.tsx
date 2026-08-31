import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  FileSearch,
  Sparkles,
  Plus,
  ArrowRight,
  Trash2,
  Building2,
  Calendar,
  Layers,
  Search,
  ExternalLink
} from 'lucide-react';

export const JDAnalysisCenterView: React.FC = () => {
  const { jdAnalyses, createJDAnalysis, deleteJDAnalysis, navigateTo } = useJobCraft();

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [rawText, setRawText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleJD = `【职位描述】
1. 负责端侧大模型与个人生产力工具的 AI 交互形态设计与策略落地；
2. 搭建面向端侧轻量化模型的评测基准，优化上下文感知与本地意图召回；
3. 与算法及客户端架构团队紧密协作，推进量化压缩与内存占用优化。

【任职要求】
1. 3年以上 AI 产品经验，深入理解端侧计算与云端协作机制；
2. 具备严谨的数据分析思维与评测指标方法论（NDCG/准确率）；
3. 优秀的沟通与跨团队攻坚能力。`;

  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim() || !rawText.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const newAnalysisId = createJDAnalysis({
        company: company.trim(),
        role: role.trim(),
        rawText: rawText.trim()
      });
      setIsAnalyzing(false);
      setCompany('');
      setRole('');
      setRawText('');
      navigateTo('jd_report', { jdId: newAnalysisId });
    }, 800);
  };

  const handleUsePreset = () => {
    setCompany('某科技独角兽公司');
    setRole('AI 产品经理（端侧大模型方向）');
    setRawText(sampleJD);
  };

  const filteredAnalyses = jdAnalyses.filter(
    (a) =>
      a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E6E1] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1D201F] tracking-tight">全局 JD 分析中心</h1>
          <p className="text-sm text-[#6B726F] mt-1">
            只依赖用户提供的 JD 原文进行全景深度研判，提取 ATS 关键词、隐藏招聘意图与能力缺口
          </p>
        </div>
      </div>

      {/* Main Grid: Left New Analysis Form + Right History List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (6 cols): Input Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E6E6E1] p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#EBF2EE] text-[#2D4B41] flex items-center justify-center font-bold">
                <FileSearch className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-[#1D201F]">分析新的 JD</h2>
            </div>
            <button
              type="button"
              onClick={handleUsePreset}
              className="text-xs text-[#3E6256] hover:text-[#325046] font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>填入范例文档</span>
            </button>
          </div>

          <form onSubmit={handleStartAnalysis} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1D201F] mb-1">
                  目标公司 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：字节跳动、腾讯"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D5CE] focus:ring-2 focus:ring-[#3E6256] focus:border-[#3E6256] text-xs text-[#1D201F] bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D201F] mb-1">
                  岗位名称 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：AI 产品经理"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D5CE] focus:ring-2 focus:ring-[#3E6256] focus:border-[#3E6256] text-xs text-[#1D201F] bg-white outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#1D201F]">
                  JD 原文内容 <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-[#8A908C]">支持直接复制粘贴招聘信息</span>
              </div>
              <textarea
                required
                rows={8}
                placeholder="粘贴岗位的职责描述、任职要求、加分项等..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D5CE] focus:ring-2 focus:ring-[#3E6256] focus:border-[#3E6256] text-xs leading-relaxed font-mono resize-none bg-[#F5F5F2] text-[#1D201F] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-2.5 rounded-xl bg-[#3E6256] hover:bg-[#325046] disabled:bg-slate-300 text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>AI 正在全景分析与提炼关键词...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>开始生成 JD 深度分析报告 →</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column (6 cols): History List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#1D201F]">历史分析记录</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#EBF2EE] text-[#2D4B41] font-medium">
                {jdAnalyses.length}
              </span>
            </div>

            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 text-[#8A908C] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜索历史报告..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-2.5 py-1 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:outline-none focus:border-[#3E6256]"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                className="bg-white rounded-xl border border-[#E6E6E1] p-5 shadow-2xs hover:border-[#3E6256]/50 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#1D201F] text-sm">{analysis.company}</span>
                      <span className="text-[#D5D5CE]">·</span>
                      <span className="font-semibold text-[#2C302E] text-sm">{analysis.role}</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#E8F1EC] text-[#2D4B41] text-xs font-bold border border-[#D3E2DB]">
                        {analysis.matchScore}% 匹配
                      </span>
                    </div>
                    <div className="text-xs text-[#8A908C] mt-1 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>分析时间: {analysis.createdAt}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteJDAnalysis(analysis.id)}
                    className="text-[#A6ACA8] hover:text-rose-600 p-1 transition"
                    title="删除记录"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-[#6B726F] line-clamp-2 leading-relaxed bg-[#F5F5F2] p-2.5 rounded-lg border border-[#E6E6E1]">
                  {analysis.verdictSummary}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#F5F5F2]">
                  <div className="text-xs text-[#B7794B] font-semibold">
                    推荐指数 {'★'.repeat(analysis.recommendationStars)}
                  </div>

                  <button
                    onClick={() => navigateTo('jd_report', { jdId: analysis.id })}
                    className="flex items-center gap-1 text-xs font-semibold text-[#3E6256] hover:text-[#325046] transition"
                  >
                    <span>查看完整研判报告</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
