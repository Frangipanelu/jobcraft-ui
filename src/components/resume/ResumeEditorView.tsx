import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  FileText,
  Sparkles,
  Check,
  X,
  Download,
  Save,
  Eye,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface ResumeEditorViewProps {
  resumeId?: string;
  jobId?: string;
}

export const ResumeEditorView: React.FC<ResumeEditorViewProps> = ({
  resumeId = 'res-byte-1',
  jobId = 'job-1'
}) => {
  const {
    resumes,
    experiences,
    applyResumeAISuggestion,
    rejectResumeAISuggestion,
    applyAllResumeAISuggestions,
    updateResumeBulletText,
    addResumeBullet,
    deleteResumeBullet,
    navigateTo,
    showToast
  } = useJobCraft();

  const resume = resumes[resumeId] || resumes['res-byte-1'];
  const [editingBulletId, setEditingBulletId] = useState<string | null>(null);
  const [tempBulletText, setTempBulletText] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [selectedBulletForSource, setSelectedBulletForSource] = useState<string | null>('bullet-exp1-1');

  if (!resume) {
    return <div className="p-8 text-center text-slate-500">未找到简历数据</div>;
  }

  const handleStartEditBullet = (bulletId: string, currentText: string) => {
    setEditingBulletId(bulletId);
    setTempBulletText(currentText);
    setSelectedBulletForSource(bulletId);
  };

  const handleSaveBulletEdit = (sectionId: string, itemId: string, bulletId: string) => {
    updateResumeBulletText(sectionId, itemId, bulletId, tempBulletText);
    setEditingBulletId(null);
    showToast({
      type: 'success',
      title: '要点内容已保存'
    });
  };

  const handleExportPDF = () => {
    showToast({
      type: 'success',
      title: '正在生成高保真单页 PDF...',
      message: '已按 1:1 招聘标准排版，导出准备完毕。'
    });
  };

  // Find linked experience for selected bullet
  const allBullets = (resume.sections || []).flatMap((s) => (s.items || []).flatMap((i) => i.bullets || []));
  const activeBullet = allBullets.find((b) => b.id === selectedBulletForSource) || allBullets[0];
  const linkedExp = activeBullet?.originalExperienceId
    ? experiences.find((e) => e.id === activeBullet.originalExperienceId)
    : experiences[0];

  return (
    <div className="min-h-screen bg-[#F5F5F2] p-6">
      <div className="max-w-[1600px] mx-auto space-y-4">
        {/* Top Control Bar */}
        <div className="bg-white rounded-xl border border-[#E6E6E1] px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-base font-bold text-[#1D201F]">{resume.versionName}</h1>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
                针对 {resume.company} · {resume.jobTitle} 定制
              </span>
            </div>
            <p className="text-xs text-[#8A908C] mt-0.5">上次保存：{resume.updatedAt} · 一页纸精炼排版</p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => showToast({ type: 'success', title: '简历草稿已保存' })}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#E6E6E1] bg-white hover:bg-[#F5F5F2] text-[#1D201F] text-xs font-semibold transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>保存</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>导出 PDF</span>
            </button>
          </div>
        </div>

        {/* Three-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (3.5 cols): AI Optimization Suggestions */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-xl border border-[#E6E6E1] p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#F5F5F2] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#3E6256]" />
                  <h3 className="text-sm font-bold text-[#1D201F]">
                    AI 优化建议 ({resume.aiSuggestions.filter((s) => !s.applied && !s.rejected).length})
                  </h3>
                </div>
                <button
                  onClick={applyAllResumeAISuggestions}
                  className="text-xs font-semibold text-[#3E6256] hover:text-[#325046] transition"
                >
                  全部应用
                </button>
              </div>

              <div className="space-y-3 max-h-[calc(100vh-230px)] overflow-y-auto custom-scrollbar pr-1">
                {resume.aiSuggestions.map((sug, idx) => (
                  <div
                    key={sug.id}
                    className={`p-3 rounded-xl border text-xs space-y-2 transition ${
                      sug.applied
                        ? 'bg-[#E8F1EC]/60 border-[#D3E2DB] text-[#2D4B41]'
                        : sug.rejected
                        ? 'bg-[#F5F5F2] border-[#E6E6E1] text-[#8A908C] opacity-60'
                        : 'bg-white border-[#E6E6E1] hover:border-[#3E6256]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#1D201F] text-xs">
                        {idx + 1}. {sug.title}
                      </span>
                      {sug.applied ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E8F1EC] text-[#2D4B41] font-semibold flex items-center gap-1 border border-[#D3E2DB]">
                          <Check className="w-3 h-3" /> 已应用
                        </span>
                      ) : sug.rejected ? (
                        <span className="text-[10px] text-[#8A908C]">已忽略</span>
                      ) : null}
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] text-[#8A908C]">
                        <span className="text-[#6B726F] font-medium">原表达：</span>
                        <span className="line-through">{sug.originalText}</span>
                      </div>
                      <div className="text-xs text-[#2D4B41] font-medium bg-[#E8F1EC] p-2 rounded-lg border border-[#D3E2DB] leading-relaxed">
                        <strong className="text-[#1D201F]">建议：</strong> {sug.suggestedText}
                      </div>
                    </div>

                    <p className="text-[11px] text-[#6B726F]">{sug.reason}</p>

                    {!sug.applied && !sug.rejected && (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => applyResumeAISuggestion(sug.id)}
                          className="flex-1 py-1 rounded bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold transition text-center shadow-2xs"
                        >
                          应用优化
                        </button>
                        <button
                          onClick={() => rejectResumeAISuggestion(sug.id)}
                          className="px-2.5 py-1 rounded bg-[#F5F5F2] hover:bg-[#E6E6E1] text-[#6B726F] text-xs transition"
                        >
                          忽略
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column (5.5 cols): Editable High-Fidelity Resume Document */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-[#E6E6E1] shadow-sm p-8 space-y-6 min-h-[900px]">
            {/* Resume Header */}
            <div className="text-center space-y-2 border-b border-[#E6E6E1] pb-5">
              <h2 className="text-2xl font-bold text-[#1D201F] font-display">
                {resume.personalInfo.name}
              </h2>
              <p className="text-xs text-[#6B726F] font-medium">
                {resume.personalInfo.title} · {resume.personalInfo.location} · {resume.personalInfo.phone} · {resume.personalInfo.email}
              </p>
            </div>

            {/* Personal Summary */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-[#1D201F] uppercase tracking-wider border-b border-[#F5F5F2] pb-1">
                个人优势与核心画像
              </h3>
              <p className="text-xs text-[#2C302E] leading-relaxed text-justify">
                {resume.summary}
              </p>
            </div>

            {/* Sections */}
            {resume.sections.map((section) => (
              <div key={section.id} className="space-y-3">
                <h3 className="text-xs font-bold text-[#1D201F] uppercase tracking-wider border-b border-[#F5F5F2] pb-1">
                  {section.title}
                </h3>

                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#1D201F]">{item.title}</span>
                        {item.period && (
                          <span className="text-[#8A908C] font-mono text-[11px]">{item.period}</span>
                        )}
                      </div>
                      {item.subtitle && (
                        <div className="text-xs font-medium text-[#6B726F] italic">
                          {item.subtitle}
                        </div>
                      )}

                      {/* Bullet points */}
                      <ul className="space-y-2 pt-1">
                        {item.bullets.map((bullet) => {
                          const isEditing = editingBulletId === bullet.id;
                          const isSelected = selectedBulletForSource === bullet.id;

                          return (
                            <li
                              key={bullet.id}
                              onClick={() => setSelectedBulletForSource(bullet.id)}
                              className={`text-xs text-[#2C302E] rounded-lg p-2 transition group relative cursor-pointer border ${
                                isSelected
                                  ? 'border-[#3E6256] bg-[#E8F1EC]/30'
                                  : 'border-transparent hover:border-[#E6E6E1] hover:bg-[#F5F5F2]'
                              }`}
                            >
                              {isEditing ? (
                                <div className="space-y-2">
                                  <textarea
                                    value={tempBulletText}
                                    onChange={(e) => setTempBulletText(e.target.value)}
                                    rows={3}
                                    className="w-full p-2 text-xs border border-[#3E6256] rounded-lg focus:outline-none bg-white font-sans leading-relaxed text-[#1D201F]"
                                  />
                                  <div className="flex items-center gap-2 justify-end">
                                    <button
                                      onClick={() => setEditingBulletId(null)}
                                      className="px-2 py-1 text-xs text-[#8A908C] hover:bg-[#F5F5F2] rounded"
                                    >
                                      取消
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleSaveBulletEdit(section.id, item.id, bullet.id)
                                      }
                                      className="px-3 py-1 text-xs bg-[#3E6256] text-white font-semibold rounded hover:bg-[#325046] shadow-2xs"
                                    >
                                      保存修改
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 leading-relaxed">
                                    <span className="text-[#3E6256] font-bold mr-1.5">•</span>
                                    <span>{bullet.text}</span>
                                    {bullet.jdMatchTag && (
                                      <span className="ml-2 inline-block text-[10px] px-1.5 py-0.2 rounded bg-[#FAF2EB] text-[#8F5128] font-semibold border border-[#F0DFD1]">
                                        {bullet.jdMatchTag}
                                      </span>
                                    )}
                                  </div>

                                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 shrink-0 transition">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleStartEditBullet(bullet.id, bullet.text);
                                      }}
                                      className="p-1 text-[#8A908C] hover:text-[#3E6256] rounded transition"
                                      title="直接编辑"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteResumeBullet(section.id, item.id, bullet.id);
                                      }}
                                      className="p-1 text-[#8A908C] hover:text-rose-600 rounded transition"
                                      title="删除要点"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column (3 cols): Evidence Traceability & Structure */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-xl border border-[#E6E6E1] p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#F5F5F2] pb-3">
                <Layers className="w-4 h-4 text-[#3E6256]" />
                <h3 className="text-sm font-bold text-[#1D201F]">经历资产溯源</h3>
              </div>

              {linkedExp ? (
                <div className="space-y-3 text-xs animate-in fade-in">
                  <div>
                    <div className="text-[11px] text-[#8A908C] font-medium">关联职业经历资产：</div>
                    <div className="font-bold text-[#1D201F] mt-0.5 leading-snug">
                      {linkedExp.title}
                    </div>
                  </div>

                  <div className="p-3 bg-[#F5F5F2] rounded-lg border border-[#E6E6E1] space-y-1.5">
                    <div className="text-[11px] text-[#6B726F] font-medium">资产版本状态：</div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-[#E8F1EC] text-[#2D4B41] font-bold border border-[#D3E2DB]">
                        当前资产库版本: {linkedExp.currentVersion}
                      </span>
                      <span className="text-[11px] text-[#8A908C]">{linkedExp.period}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-[#8A908C] font-medium mb-1">量化证据支撑：</div>
                    <div className="flex flex-wrap gap-1">
                      {(linkedExp.metrics || []).map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white text-[#2C302E] text-[10px] font-semibold border border-[#E6E6E1]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F5F5F2]">
                    <button
                      onClick={() => navigateTo('experiences', { expId: linkedExp.id })}
                      className="w-full py-2 rounded-lg bg-white hover:bg-[#F5F5F2] text-[#1D201F] hover:text-[#3E6256] text-xs font-semibold border border-[#E6E6E1] transition flex items-center justify-center gap-1"
                    >
                      <span>在经历库中查看完整卡片</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-[#8A908C] text-xs">
                  点击简历中的任一经历要点，可实时查看对应的原始经历资产卡片与 JD 匹配依据。
                </div>
              )}
            </div>

            {/* Quick JD Keywords checklist */}
            <div className="bg-white rounded-xl border border-[#E6E6E1] p-5 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold text-[#1D201F]">目标岗位关键词命中</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#2D4B41] font-medium">
                  <span>AI 搜索 / Eval 体系</span>
                  <CheckCircle2 className="w-4 h-4 text-[#3E6256]" />
                </div>
                <div className="flex items-center justify-between text-[#2D4B41] font-medium">
                  <span>LLM-as-a-Judge 评测</span>
                  <CheckCircle2 className="w-4 h-4 text-[#3E6256]" />
                </div>
                <div className="flex items-center justify-between text-[#2D4B41] font-medium">
                  <span>NDCG / 幻觉率指标</span>
                  <CheckCircle2 className="w-4 h-4 text-[#3E6256]" />
                </div>
                <div className="flex items-center justify-between text-[#2D4B41] font-medium">
                  <span>Prompt / Agent 平台</span>
                  <CheckCircle2 className="w-4 h-4 text-[#3E6256]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
