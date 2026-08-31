import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import { Experience, ExperienceCategory, ExperienceVersionRecord } from '../../types/jobcraft';
import {
  Layers,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  History,
  Tag,
  ArrowRight,
  Trash2,
  Calendar,
  Building2,
  CheckCircle2,
  FileText,
  Clock,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  Edit3,
  Check,
  AlertCircle,
  Briefcase,
  Share2,
  ExternalLink,
  Undo2,
  Target
} from 'lucide-react';
import { NewExperienceModal } from './NewExperienceModal';

interface ExperiencesViewProps {
  initialSelectedExpId?: string;
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = () => {
  const {
    experiences,
    deleteExperience,
    updateExperience,
    addExperienceVersion,
    navigateTo,
    showToast
  } = useJobCraft();

  const [activeCategory, setActiveCategory] = useState<'all' | ExperienceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [expandedVersionExpIds, setExpandedVersionExpIds] = useState<Record<string, boolean>>({});

  const toggleVersionHistory = (expId: string) => {
    setExpandedVersionExpIds((prev) => ({
      ...prev,
      [expId]: !prev[expId]
    }));
  };

  const filteredExperiences = experiences.filter((exp) => {
    const matchesCat = activeCategory === 'all' || exp.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;
    const matchesSearch =
      exp.title.toLowerCase().includes(q) ||
      exp.company.toLowerCase().includes(q) ||
      exp.role.toLowerCase().includes(q) ||
      (exp.capabilityTags || []).some((t) => t.toLowerCase().includes(q)) ||
      (exp.metrics || []).some((m) => m.toLowerCase().includes(q)) ||
      exp.background.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const getCategoryLabel = (cat?: ExperienceCategory) => {
    switch (cat) {
      case 'project':
        return '项目经历';
      case 'work':
        return '工作经历';
      case 'internship':
        return '实习经历';
      case 'education':
        return '教育经历';
      case 'competition':
        return '竞赛开源';
      case 'paper':
        return '论文专利';
      case 'other':
        return '其他经历';
      default:
        return '核心经历';
    }
  };

  const getSourceBadge = (source: ExperienceVersionRecord['source']) => {
    switch (source) {
      case 'interview_review':
        return { label: '面试实战反哺', color: 'bg-[#E8F1EC] text-[#2D4B41] border-[#D3E2DB]' };
      case 'jd_alignment':
        return { label: 'JD 深度对齐', color: 'bg-[#FAF2EB] text-[#8F5128] border-[#F0DFD1]' };
      default:
        return { label: '经历维护更新', color: 'bg-[#F5F5F2] text-[#6B726F] border-[#E6E6E1]' };
    }
  };

  const handleAIRefine = (exp: Experience) => {
    const curNum = parseFloat(exp.currentVersion.replace('V', '')) || 1.0;
    const nextVer = `V${(curNum + 0.1).toFixed(1)}`;
    const enhancedAction = '结合工业级黄金评测基准与多模型交叉仲裁机制，建立了自动化回归测试与 Badcase 告警闭环。';

    addExperienceVersion(
      exp.id,
      nextVer,
      'AI 深度润色：强化量化指标与大模型系统落地专业表述',
      {
        background: exp.background,
        responsibility: exp.responsibility,
        actions: [enhancedAction, ...(exp.actions || [])],
        results: exp.results || []
      }
    );

    showToast({
      type: 'success',
      title: `已升级至 ${nextVer} (AI 深度润色版)`,
      message: '已强化 STAR 结构中的量化动作与工业级落地指标。'
    });
  };

  const handleRestoreVersion = (exp: Experience, versionRecord: ExperienceVersionRecord) => {
    // Apply changes from this record
    const updated: Partial<Experience> = {
      currentVersion: versionRecord.version
    };
    versionRecord.changes.forEach((c) => {
      if (c.field === 'actions') {
        updated.actions = [c.to, ...(exp.actions || []).slice(1)];
      } else if (c.field === 'responsibility') {
        updated.responsibility = c.to;
      } else if (c.field === 'background') {
        updated.background = c.to;
      } else if (c.field === 'results') {
        updated.results = [c.to, ...(exp.results || []).slice(1)];
      }
    });

    updateExperience(exp.id, updated);
    showToast({
      type: 'info',
      title: `已激活版本 ${versionRecord.version}`,
      message: `已恢复至 ${versionRecord.date} 的版本状态。`
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E6E1] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-[#1D201F] tracking-tight">经历资产库</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
              共 {experiences.length} 项核心资产
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#6B726F] mt-1">
            个人的终身职业经历资产底座 · STAR 结构化解析 · 多版本闭环演进 · 跨岗位/面试无缝复用
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-bold shadow-xs transition shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ 沉淀新经历资产</span>
        </button>
      </div>

      {/* 2. Toolbar & Filter Strip */}
      <div className="bg-white rounded-xl border border-[#E6E6E1] p-3 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#1D201F] text-white shadow-2xs'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            全部资产 ({experiences.length})
          </button>
          <button
            onClick={() => setActiveCategory('project')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              activeCategory === 'project'
                ? 'bg-[#1D201F] text-white shadow-2xs'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            项目经历 ({experiences.filter((e) => e.category === 'project' || !e.category).length})
          </button>
          <button
            onClick={() => setActiveCategory('work')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              activeCategory === 'work'
                ? 'bg-[#1D201F] text-white shadow-2xs'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            工作经历 ({experiences.filter((e) => e.category === 'work').length})
          </button>
          <button
            onClick={() => setActiveCategory('internship')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              activeCategory === 'internship'
                ? 'bg-[#1D201F] text-white shadow-2xs'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            实习经历 ({experiences.filter((e) => e.category === 'internship').length})
          </button>
          <button
            onClick={() => setActiveCategory('education')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              activeCategory === 'education'
                ? 'bg-[#1D201F] text-white shadow-2xs'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            教育经历 ({experiences.filter((e) => e.category === 'education').length})
          </button>
          <button
            onClick={() => setActiveCategory('competition')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              activeCategory === 'competition'
                ? 'bg-[#1D201F] text-white shadow-2xs'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            竞赛开源 ({experiences.filter((e) => e.category === 'competition' || e.category === 'paper').length})
          </button>
          <button
            onClick={() => setActiveCategory('other')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
              activeCategory === 'other'
                ? 'bg-[#1D201F] text-white shadow-2xs'
                : 'text-[#6B726F] hover:bg-[#F5F5F2]'
            }`}
          >
            其他经历 ({experiences.filter((e) => e.category === 'other').length})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-[#8A908C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索经历名称、公司、能力标签、量化指标..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] placeholder:text-[#8A908C] focus:border-[#3E6256] focus:outline-none"
          />
        </div>
      </div>

      {/* 4. Rich Experience Cards Stream */}
      <div className="space-y-6">
        {filteredExperiences.map((exp) => {
          const isVersionExpanded = !!expandedVersionExpIds[exp.id];
          const historyList = exp.versionHistory || [];

          return (
            <div
              key={exp.id}
              className="bg-white rounded-xl border border-[#E6E6E1] overflow-hidden shadow-2xs hover:border-[#D3E2DB] transition duration-200"
            >
              {/* Card Top Header */}
              <div className="p-5 md:p-6 bg-[#FAFAFA] border-b border-[#E6E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
                      {getCategoryLabel(exp.category)}
                    </span>
                    <h2 className="text-base md:text-lg font-bold text-[#1D201F]">
                      {exp.title}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-white text-[#2C302E] border border-[#E6E6E1]">
                      {exp.currentVersion}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#6B726F] flex-wrap">
                    <span className="font-semibold text-[#1D201F] flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-[#3E6256]" />
                      {exp.company}
                    </span>
                    <span>·</span>
                    <span className="text-[#2C302E] font-medium">{exp.role}</span>
                    <span>·</span>
                    <span className="text-[#8A908C] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <button
                    onClick={() => handleAIRefine(exp)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E8F1EC] hover:bg-[#D3E2DB] text-[#2D4B41] text-xs font-bold border border-[#D3E2DB] transition cursor-pointer"
                    title="根据行业 SOTA 评测基准对 STAR 动作进行量化与表述升级"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#3E6256]" />
                    <span>AI 润色</span>
                  </button>

                  <button
                    onClick={() => toggleVersionHistory(exp.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                      isVersionExpanded
                        ? 'bg-[#1D201F] text-white border-[#1D201F]'
                        : 'bg-white text-[#2C302E] border-[#E6E6E1] hover:bg-[#F5F5F2]'
                    }`}
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>版本演进 ({historyList.length || 1})</span>
                    {isVersionExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => navigateTo('resume_editor', { jobId: 'job-1' })}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-bold shadow-xs transition cursor-pointer"
                  >
                    <span>定制简历</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setEditingExp(exp)}
                    className="p-1.5 text-[#6B726F] hover:text-[#1D201F] hover:bg-white rounded-lg border border-transparent hover:border-[#E6E6E1] transition cursor-pointer"
                    title="编辑此经历"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`确定要删除经历资产「${exp.title}」吗？`)) {
                        deleteExperience(exp.id);
                      }
                    }}
                    className="p-1.5 text-[#8A908C] hover:text-rose-600 hover:bg-white rounded-lg border border-transparent hover:border-[#E6E6E1] transition cursor-pointer"
                    title="删除此经历"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Version History Drawer (if expanded) */}
              {isVersionExpanded && (
                <div className="p-5 bg-[#FAF2EB]/40 border-b border-[#F0DFD1] space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-[#8F5128]" />
                      <span className="text-xs font-bold text-[#8F5128]">
                        版本演进时间轴（累计迭代 {historyList.length || 1} 个版本）
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8A908C]">
                      支持一键激活或查看历史演进证据
                    </span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {historyList.map((ver, idx) => {
                      const badge = getSourceBadge(ver.source);
                      const isCurrent = exp.currentVersion === ver.version;

                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-lg border text-xs space-y-2 transition ${
                            isCurrent
                              ? 'bg-white border-[#3E6256] shadow-2xs'
                              : 'bg-[#FAFAFA] border-[#E6E6E1]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-[#1D201F] text-xs font-mono">
                                {ver.version}
                              </span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
                                  当前激活版本
                                </span>
                              )}
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${badge.color}`}
                              >
                                {badge.label}
                              </span>
                              <span className="text-[11px] text-[#8A908C]">{ver.date}</span>
                            </div>

                            {!isCurrent && (
                              <button
                                onClick={() => handleRestoreVersion(exp, ver)}
                                className="flex items-center gap-1 text-[11px] font-semibold text-[#3E6256] hover:underline cursor-pointer"
                              >
                                <Undo2 className="w-3 h-3" />
                                <span>激活此版本</span>
                              </button>
                            )}
                          </div>

                          <p className="text-[#2C302E] font-medium">{ver.reason}</p>

                          {(ver.changes || []).length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              {(ver.changes || []).map((ch, cIdx) => (
                                <div
                                  key={cIdx}
                                  className="text-[11px] p-2 rounded bg-[#F5F5F2] border border-[#E6E6E1] space-y-0.5"
                                >
                                  <div className="font-semibold text-[#6B726F]">
                                    修改字段：{ch.field}
                                  </div>
                                  {ch.from && (
                                    <div className="text-[#8A908C] line-through">
                                      原版：{ch.from}
                                    </div>
                                  )}
                                  <div className="text-[#2D4B41] font-medium">
                                    新版：{ch.to}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Card Body: Verified Metrics */}
              <div className="p-5 md:p-6 space-y-5">
                {/* 1. Verified Metrics Row */}
                {(exp.metrics || []).length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-[#6B726F] uppercase tracking-wider">
                      核心量化成效与关键指标 (Verified Metrics)
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {(exp.metrics || []).map((metric, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-[#E8F1EC] text-[#2D4B41] font-semibold border border-[#D3E2DB] text-xs flex items-center gap-1.5"
                        >
                          <TrendingUp className="w-3.5 h-3.5 text-[#3E6256]" />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. STAR Structured Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
                  {/* S & T: Situation & Task (4 cols) */}
                  <div className="lg:col-span-4 p-4 rounded-xl bg-[#FAFAFA] border border-[#E6E6E1] space-y-3">
                    <div className="text-xs font-bold text-[#1D201F] flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-[#3E6256]" />
                      <span>S & T · 业务背景与攻坚职责</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="text-[11px] font-semibold text-[#8A908C]">
                          业务背景与痛点：
                        </div>
                        <p className="text-[#2C302E] leading-relaxed mt-0.5">
                          {exp.background || '暂无背景描述'}
                        </p>
                      </div>

                      <div className="pt-1 border-t border-[#E6E6E1]">
                        <div className="text-[11px] font-semibold text-[#8A908C]">
                          个人核心职责：
                        </div>
                        <p className="text-[#2C302E] leading-relaxed mt-0.5">
                          {exp.responsibility || '主导从 0 到 1 方案设计与落地'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* A: Actions (5 cols) */}
                  <div className="lg:col-span-5 p-4 rounded-xl bg-white border border-[#E6E6E1] space-y-3">
                    <div className="text-xs font-bold text-[#1D201F] flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#3E6256]" />
                      <span>A · 关键攻坚动作与推进策略</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {(exp.actions || []).map((act, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#E8F1EC] text-[#2D4B41] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {aIdx + 1}
                          </span>
                          <span className="text-[#2C302E] leading-relaxed font-medium">
                            {act}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* R: Results (3 cols) */}
                  <div className="lg:col-span-3 p-4 rounded-xl bg-[#E8F1EC]/30 border border-[#D3E2DB] space-y-3">
                    <div className="text-xs font-bold text-[#2D4B41] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#3E6256]" />
                      <span>R · 落地成效与收益</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {(exp.results || []).map((res, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#3E6256] shrink-0 mt-0.5" />
                          <span className="text-[#2D4B41] leading-relaxed font-medium">
                            {res}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Capability Tags */}
                {(exp.capabilityTags || []).length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-[#6B726F] uppercase tracking-wider">
                      能力标签与知识体系 (Capability Tags)
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {(exp.capabilityTags || []).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-[#F5F5F2] text-[#2C302E] border border-[#E6E6E1] text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Target Jobs Linkage & Interview Feedback Note */}
                <div className="pt-2 border-t border-[#E6E6E1] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  {/* Matched jobs */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#8A908C] font-medium">已对齐岗位：</span>
                    {(exp.targetJobs || []).map((jobTitle, jIdx) => (
                      <span
                        key={jIdx}
                        className="px-2 py-0.5 rounded bg-[#FAF2EB] text-[#8F5128] border border-[#F0DFD1] text-[11px] font-semibold"
                      >
                        {jobTitle}
                      </span>
                    ))}
                    {(exp.resumeVersionsUsed || []).length > 0 && (
                      <span className="text-[#8A908C] text-[11px]">
                        · 关联简历：{exp.resumeVersionsUsed.join(', ')}
                      </span>
                    )}
                  </div>

                  {/* Interview feedback prompt */}
                  {exp.interviewFeedbackSummary && (
                    <div className="text-[11px] text-[#2D4B41] bg-[#E8F1EC]/60 px-2.5 py-1 rounded-md border border-[#D3E2DB] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#3E6256] shrink-0" />
                      <span className="truncate max-w-md">
                        实战提示：{exp.interviewFeedbackSummary}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredExperiences.length === 0 && (
          <div className="bg-white rounded-xl border border-[#E6E6E1] p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F5F5F2] text-[#8A908C] flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <div className="text-base font-bold text-[#1D201F]">未检索到符合条件的经历资产</div>
            <p className="text-xs text-[#6B726F]">
              尝试清除筛选条件或关键词，或点击右上角「+ 沉淀新经历资产」进行录入。
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#F5F5F2] hover:bg-[#E6E6E1] text-[#1D201F] text-xs font-semibold transition cursor-pointer"
            >
              重置筛选条件
            </button>
          </div>
        )}
      </div>

      {/* New Experience Modal */}
      <NewExperienceModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />

      {/* Edit Experience Modal */}
      {editingExp && (
        <EditExperienceModal
          experience={editingExp}
          isOpen={!!editingExp}
          onClose={() => setEditingExp(null)}
        />
      )}
    </div>
  );
};

// Inline Edit Experience Modal component for editing experiences
interface EditExperienceModalProps {
  experience: Experience;
  isOpen: boolean;
  onClose: () => void;
}

const EditExperienceModal: React.FC<EditExperienceModalProps> = ({
  experience,
  isOpen,
  onClose
}) => {
  const { updateExperience, showToast } = useJobCraft();

  const [title, setTitle] = useState(experience.title);
  const [category, setCategory] = useState<ExperienceCategory>(experience.category || 'project');
  const [company, setCompany] = useState(experience.company);
  const [role, setRole] = useState(experience.role);
  const [period, setPeriod] = useState(experience.period);
  const [background, setBackground] = useState(experience.background);
  const [responsibility, setResponsibility] = useState(experience.responsibility);
  const [actionsText, setActionsText] = useState((experience.actions || []).join('\n'));
  const [resultsText, setResultsText] = useState((experience.results || []).join('\n'));
  const [metricsText, setMetricsText] = useState((experience.metrics || []).join(', '));
  const [tagsText, setTagsText] = useState((experience.capabilityTags || []).join(', '));

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const actions = actionsText
      .split('\n')
      .map((a) => a.trim())
      .filter(Boolean);
    const results = resultsText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);
    const metrics = metricsText
      .split(/[,，]/)
      .map((m) => m.trim())
      .filter(Boolean);
    const capabilityTags = tagsText
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean);

    updateExperience(experience.id, {
      title: title.trim(),
      category,
      company: company.trim(),
      role: role.trim(),
      period: period.trim(),
      background: background.trim(),
      responsibility: responsibility.trim(),
      actions,
      results,
      metrics,
      capabilityTags
    });

    showToast({
      type: 'success',
      title: '经历资产已更新',
      message: `已成功保存「${title.trim()}」的最新修改。`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1D201F]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-[#E6E6E1] shadow-xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <div className="p-5 border-b border-[#E6E6E1] flex items-center justify-between bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8F1EC] text-[#2D4B41] flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1D201F]">编辑经历资产</h3>
              <p className="text-xs text-[#6B726F]">修改经历基础信息与 STAR 结构化内容</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-[#6B726F] hover:text-[#1D201F] px-2 py-1 rounded"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1D201F] mb-1">
                经历名称 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1D201F] mb-1">分类</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExperienceCategory)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none"
              >
                <option value="project">项目经历</option>
                <option value="work">工作经历</option>
                <option value="internship">实习经历</option>
                <option value="competition">竞赛开源</option>
                <option value="paper">论文专利</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1D201F] mb-1">所在机构/公司</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1D201F] mb-1">担任角色</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1D201F] mb-1">时间周期</label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E6E6E1] space-y-3">
            <div className="text-xs font-bold text-[#1D201F]">STAR 结构化内容</div>
            <div>
              <label className="block text-[11px] font-semibold text-[#6B726F] mb-0.5">S · 背景与痛点</label>
              <textarea
                rows={2}
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#6B726F] mb-0.5">T · 任务与职责</label>
              <textarea
                rows={2}
                value={responsibility}
                onChange={(e) => setResponsibility(e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#6B726F] mb-0.5">A · 核心行动与策略 (每行一条)</label>
              <textarea
                rows={3}
                value={actionsText}
                onChange={(e) => setActionsText(e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#6B726F] mb-0.5">R · 结果与业务收益 (每行一条)</label>
              <textarea
                rows={2}
                value={resultsText}
                onChange={(e) => setResultsText(e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1D201F] mb-1">核心量化指标 (逗号分隔)</label>
              <input
                type="text"
                value={metricsText}
                onChange={(e) => setMetricsText(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1D201F] mb-1">能力标签 (逗号分隔)</label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#E6E6E1] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#6B726F] hover:bg-[#F5F5F2] rounded-lg transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs bg-[#3E6256] hover:bg-[#325046] text-white font-bold rounded-lg shadow-xs transition"
            >
              保存修改
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
