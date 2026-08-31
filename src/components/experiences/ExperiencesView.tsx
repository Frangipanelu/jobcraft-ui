import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import { Experience, ExperienceCategory } from '../../types/jobcraft';
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
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { NewExperienceModal } from './NewExperienceModal';

interface ExperiencesViewProps {
  initialSelectedExpId?: string;
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = ({ initialSelectedExpId }) => {
  const { experiences, deleteExperience, addExperienceVersion, navigateTo, showToast } = useJobCraft();

  const [activeCategory, setActiveCategory] = useState<'all' | ExperienceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [expandedVersionExpId, setExpandedVersionExpId] = useState<string | null>(initialSelectedExpId || null);

  const filteredExperiences = experiences.filter((exp) => {
    const matchesCat = activeCategory === 'all' || exp.category === activeCategory;
    const matchesSearch =
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.capabilityTags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
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
      case 'competition':
        return '竞赛与开源';
      case 'paper':
        return '论文与专利';
      default:
        return '核心经历';
    }
  };

  const handleAIRefine = (exp: Experience) => {
    showToast({
      type: 'success',
      title: 'AI 已完成经历深度增强',
      message: '已基于行业评测基准对 STAR 动作进行了量化与表述升级，生成了新版本。'
    });
    addExperienceVersion(
      exp.id,
      `V${(parseFloat(exp.currentVersion.replace('V', '')) + 0.1).toFixed(1)} (AI 增强版)`,
      'AI 深度优化：强化量化指标与大模型策略落地专业词汇',
      {
        background: exp.background,
        responsibility: exp.responsibility,
        actions: [...exp.actions, '结合行业 SOTA 评测基准，建立了多模型打分一致性仲裁机制与高危 Badcase 报警管线。'],
        results: exp.results
      }
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header (Section 6.1) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">经历资产库</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            个人的职业经历资产底座。所有简历定制、JD 匹配与面试问答均直接基于该资产库提供事实支撑。
          </p>
        </div>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ 新增经历资产</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            全部 ({experiences.length})
          </button>
          <button
            onClick={() => setActiveCategory('project')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeCategory === 'project'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            项目经历 ({experiences.filter((e) => e.category === 'project' || !e.category).length})
          </button>
          <button
            onClick={() => setActiveCategory('work')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeCategory === 'work'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            工作经历 ({experiences.filter((e) => e.category === 'work').length})
          </button>
          <button
            onClick={() => setActiveCategory('internship')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeCategory === 'internship'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            实习经历 ({experiences.filter((e) => e.category === 'internship').length})
          </button>
          <button
            onClick={() => setActiveCategory('competition')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeCategory === 'competition'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            竞赛与开源 ({experiences.filter((e) => e.category === 'competition').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索经历、公司或技能标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Experience Cards Grid */}
      <div className="space-y-4">
        {filteredExperiences.map((exp) => {
          const isVersionsExpanded = expandedVersionExpId === exp.id;

          return (
            <div
              key={exp.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:border-emerald-300 transition space-y-4"
            >
              {/* Top row: Title, Meta, and Version Badge */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {getCategoryLabel(exp.category)}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{exp.title}</h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700">
                      {exp.currentVersion}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span className="font-medium text-slate-700">{exp.company}</span>
                    <span>·</span>
                    <span>{exp.role}</span>
                    <span>·</span>
                    <span className="text-slate-400">{exp.period}</span>
                  </div>
                </div>

                {/* Right Quick Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleAIRefine(exp)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AI 深度润色</span>
                  </button>

                  <button
                    onClick={() =>
                      setExpandedVersionExpId(isVersionsExpanded ? null : exp.id)
                    }
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>版本记录 ({exp.versionHistory?.length || 1})</span>
                    {isVersionsExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg transition"
                    title="删除经历"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Core Metrics Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-slate-400">量化产出：</span>
                {exp.metrics.map((metric, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-800 font-semibold border border-slate-200/80 text-xs flex items-center gap-1"
                  >
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span>{metric}</span>
                  </span>
                ))}
              </div>

              {/* STAR Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 space-y-1">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>S · 业务背景与痛点</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {exp.background}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 space-y-1">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>T · 核心职责与攻坚目标</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {exp.responsibility}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 space-y-1 md:col-span-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    <span>A · 关键产品/技术策略与推进动作</span>
                  </div>
                  <ul className="text-xs text-slate-700 leading-relaxed font-sans font-medium list-disc list-inside space-y-1">
                    {exp.actions.map((act, aIdx) => (
                      <li key={aIdx}>{act}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 space-y-1 md:col-span-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                    <span>R · 业务收益与量化结果</span>
                  </div>
                  <ul className="text-xs text-slate-700 leading-relaxed font-sans font-medium list-disc list-inside space-y-1">
                    {exp.results.map((res, rIdx) => (
                      <li key={rIdx}>{res}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags and Version Drawer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {exp.capabilityTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigateTo('resume_editor', { jobId: 'job-1' })}
                  className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold transition"
                >
                  <span>以此经历定制简历</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Version History Accordion */}
              {isVersionsExpanded && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800">经历版本演进历史</h4>
                    <span className="text-[11px] text-slate-400">
                      支持回滚与查看每一次面试复盘反哺的增量要点
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {(exp.versionHistory || []).map((ver, vIdx) => (
                      <div
                        key={vIdx}
                        className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{ver.version}</span>
                            <span className="text-[10px] text-slate-400">{ver.date}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 font-medium">{ver.reason}</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">
                          <strong className="text-slate-700">更新来源：</strong> {ver.source === 'interview_review' ? '面试赛后复盘反哺' : ver.source === 'jd_alignment' ? '针对岗位定制对齐' : '人工优化'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredExperiences.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">未找到匹配的经历资产</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              尝试清除搜索关键词，或立即点击下方按钮沉淀你的首个王牌职业经历。
            </p>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
            >
              + 沉淀首个经历资产
            </button>
          </div>
        )}
      </div>

      {/* New Experience Modal */}
      <NewExperienceModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />
    </div>
  );
};
