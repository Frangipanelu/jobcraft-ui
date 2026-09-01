import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  BookOpenCheck,
  Building2,
  Sparkles,
  Award,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Edit3,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Info,
  Layers,
  Save,
  ArrowLeft,
  Calendar,
  User,
  Plus
} from 'lucide-react';

interface InterviewPrepWorkspaceViewProps {
  interviewId?: string;
  onOpenMockInterview: (interviewId: string) => void;
  onOpenNewInterview: (jobId?: string) => void;
}

export const InterviewPrepWorkspaceView: React.FC<InterviewPrepWorkspaceViewProps> = ({
  interviewId = 'int-byte-1',
  onOpenMockInterview,
  onOpenNewInterview
}) => {
  const {
    interviews,
    experiences,
    updateQuestionAnswer,
    addCustomQuestion,
    navigateTo,
    showToast
  } = useJobCraft();

  const currentInterview = interviews.find((i) => i.id === interviewId) || interviews[0];
  const prep = currentInterview?.preparation;

  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    prep?.highFreqQuestions?.[0]?.id || null
  );

  const [answerModes, setAnswerModes] = useState<Record<string, 'logic' | 'keywords' | 'verbatim'>>({});
  const [customAnswerText, setCustomAnswerText] = useState<Record<string, string>>({});
  const [newQuestionInput, setNewQuestionInput] = useState('');
  const [newQuestionFocus, setNewQuestionFocus] = useState('');
  const [showAddCustomQ, setShowAddCustomQ] = useState(false);

  if (!currentInterview || !prep) {
    return <div className="p-8 text-center text-muted">未找到面试准备方案</div>;
  }

  const handleModeChange = (qId: string, mode: 'logic' | 'keywords' | 'verbatim') => {
    setAnswerModes((prev) => ({ ...prev, [qId]: mode }));
  };

  const handleSaveUserAnswer = (qId: string) => {
    const text = customAnswerText[qId];
    updateQuestionAnswer(currentInterview.id, qId, { userCustomText: text }, true);
    showToast({
      type: 'success',
      title: '已保存作答策略',
      message: '你的个性化应答思路已同步至本次备战方案！'
    });
  };

  const handleCreateCustomQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionInput.trim()) return;
    addCustomQuestion(currentInterview.id, newQuestionInput.trim(), newQuestionFocus.trim());
    setNewQuestionInput('');
    setNewQuestionFocus('');
    setShowAddCustomQ(false);
    showToast({
      type: 'success',
      title: '已添加自定义考题',
      message: '可继续为其配置应答策略与关联经历！'
    });
  };

  const defaultQuestionsToAsk = [
    '团队目前在业务评测与指标落地中，最头疼的评测一致性指标或难点是什么？',
    '如果我有幸加入团队，前三个月最关键的业务交付与攻坚里程碑是什么？',
    '当前业务线在结合大模型能力改造传统流程时，算法与产品团队的分工协作模式是怎样的？'
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-6 animate-in fade-in duration-300">
      {/* 1. Top Identity & Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-edge pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('interview_prep_center')}
            className="p-1.5 rounded-lg border border-edge bg-white hover:bg-page text-muted hover:text-ink transition shrink-0 cursor-pointer"
            title="返回面试准备中心"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-ink tracking-tight">
                {currentInterview.company} · {currentInterview.roundName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sage-soft text-sage border border-sage-soft">
                备战度 {currentInterview.readinessPercent}%
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              岗位：{currentInterview.role} · 面试时间：{currentInterview.time} · 形式：{currentInterview.format === 'video' ? '视频面试' : '电话/现场'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => onOpenMockInterview(currentInterview.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sage hover:bg-sage-dim text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>进入 AI 模拟面试</span>
          </button>

          {currentInterview.review ? (
            <button
              onClick={() => navigateTo('interview_review', { interviewId: currentInterview.id })}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-edge hover:bg-page text-ink text-xs font-semibold transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-sage" />
              <span>查看复盘报告</span>
            </button>
          ) : (
            <button
              onClick={() => navigateTo('create_review')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-edge hover:bg-page text-ink text-xs font-semibold transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-terra" />
              <span>赛后复盘录入</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. SECTION 1: 目标团队与业务考点深度研判表 (Target Business & Interviewer Matrix) */}
      <div className="bg-white rounded-xl border border-edge overflow-hidden shadow-2xs">
        <div className="bg-page px-6 py-4 border-b border-edge flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sage-soft text-sage flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4 text-sage" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink">一、目标业务场景与考官画像研判表</h2>
              <p className="text-[11px] text-muted">
                基于企业最新业务动态与面试官背景提炼的核心攻坚诉求
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-edge text-xs">
          <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-3 font-bold text-ink flex items-center gap-1.5">
              <User className="w-4 h-4 text-sage shrink-0" />
              <span>面试官与考核画像</span>
            </div>
            <div className="md:col-span-9 bg-canvas p-3.5 rounded-lg border border-edge space-y-1">
              <div className="font-semibold text-ink">
                {currentInterview.interviewer || '业务负责人 / 资深专家'}
              </div>
              <p className="text-muted leading-relaxed">
                {currentInterview.supplementNotes || '高度关注系统资源瓶颈与指标真实提升，重视面对模糊问题时的决策依据与跨团队落地推力。'}
              </p>
              {prep.aiStrategy?.roundTypeDesc && (
                <div className="text-[11px] text-sage bg-sage-soft px-2.5 py-1 rounded inline-block font-medium mt-1">
                  考核要点：{prep.aiStrategy.roundTypeDesc}
                </div>
              )}
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-3 font-bold text-ink flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-terra shrink-0" />
              <span>团队背景与招聘诉求</span>
            </div>
            <div className="md:col-span-9 space-y-2">
              <div className="p-3.5 rounded-lg bg-terra-soft/40 border border-terra-soft text-terra font-medium leading-relaxed">
                {prep.companyResearch?.aiHiringIntent || prep.companyResearch?.background || '业务团队正处于技术与体验升级阶段，急需能够把控业务指标并具备扎实落地经验的资深人才。'}
              </div>

              {(prep.companyResearch?.recentNews || []).length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {(prep.companyResearch?.recentNews || []).map((news, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-page text-ink border border-edge text-[11px]">
                      📰 {news}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECTION 2: 推荐调取的王牌经历资产表 (Recommended Experience Proof Table) */}
      <div className="bg-white rounded-xl border border-edge overflow-hidden shadow-2xs">
        <div className="bg-page px-6 py-4 border-b border-edge flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sage-soft text-sage flex items-center justify-center font-bold">
              <Layers className="w-4 h-4 text-sage" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink">二、本场面试主打的王牌经历资产对齐表</h2>
              <p className="text-[11px] text-muted">
                针对本轮考点，从经历库中调取的最佳佐证案例与应答切入点
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-edge text-muted font-semibold bg-canvas">
                <th className="p-3.5 w-60">经历资产名称</th>
                <th className="p-3.5 w-32">推荐匹配指数</th>
                <th className="p-3.5">推荐佐证能力项</th>
                <th className="p-3.5 w-24 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge">
              {(prep.recommendedExperiences || []).map((rec, idx) => {
                const linkedExp = experiences.find((e) => e.id === rec.experienceId);
                return (
                  <tr key={idx} className="hover:bg-page/40 transition">
                    <td className="p-3.5 align-top font-bold text-ink">
                      <div>{linkedExp?.title || `核心经历资产 (${rec.experienceId})`}</div>
                      <div className="text-[11px] text-muted font-normal mt-0.5">
                        {linkedExp?.company} · {linkedExp?.role}
                      </div>
                    </td>
                    <td className="p-3.5 align-top font-medium">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sage-soft text-sage border border-sage-soft">
                        {rec.recommendScore} 分
                      </span>
                    </td>
                    <td className="p-3.5 align-top text-muted leading-relaxed">
                      <div className="flex flex-wrap gap-1.5">
                        {(rec.proves || []).map((p, pIdx) => (
                          <span key={pIdx} className="px-2 py-0.5 rounded bg-page text-ink border border-edge text-[11px] font-medium">
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 align-top text-right">
                      <button
                        onClick={() => navigateTo('experiences', { expId: rec.experienceId })}
                        className="px-2.5 py-1 rounded bg-white hover:bg-page text-ink border border-edge text-[11px] font-medium transition cursor-pointer"
                      >
                        查看档案
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. SECTION 3: 高频核心攻防问答库 (High-Frequency Q&A Matrix) */}
      <div className="bg-white rounded-xl border border-edge overflow-hidden shadow-2xs space-y-4">
        <div className="bg-page px-6 py-4 border-b border-edge flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sage-soft text-sage flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-sage" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink">三、高频问答与应答策略库</h2>
              <p className="text-[11px] text-muted">
                支持「逻辑框架 / 核心关键词 / 示范逐字稿」三态切换，可随时补充自定义作答思路
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddCustomQ(!showAddCustomQ)}
            className="flex items-center gap-1 text-xs font-semibold text-sage hover:text-sage-dim transition self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>添加自定义考题</span>
          </button>
        </div>

        {/* Add custom question inline form */}
        {showAddCustomQ && (
          <form onSubmit={handleCreateCustomQ} className="p-5 bg-terra-soft/40 border-b border-terra-soft space-y-3">
            <div className="text-xs font-bold text-terra">添加预判考题</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="考题内容，例如：如何衡量端侧 Agent 的意图识别幻觉？"
                value={newQuestionInput}
                onChange={(e) => setNewQuestionInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-edge bg-white text-ink focus:border-sage focus:outline-none"
              />
              <input
                type="text"
                placeholder="考察重点，例如：评测基准构建与准确率定义"
                value={newQuestionFocus}
                onChange={(e) => setNewQuestionFocus(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-edge bg-white text-ink focus:border-sage focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddCustomQ(false)}
                className="px-3 py-1.5 text-xs text-muted hover:text-ink cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-sage text-white text-xs font-semibold rounded-lg hover:bg-sage-dim cursor-pointer"
              >
                确认添加
              </button>
            </div>
          </form>
        )}

        {/* Questions Accordion List */}
        <div className="divide-y divide-edge">
          {(prep.highFreqQuestions || []).map((q, idx) => {
            const isExpanded = expandedQuestionId === q.id;
            const currentMode = answerModes[q.id] || q.preparedAnswer?.mode || 'logic';
            const linkedExp = experiences.find((e) => e.id === q.recommendedExperienceId);

            return (
              <div key={q.id} className="transition">
                {/* Question Summary Bar */}
                <div
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-page/50"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-sage-soft text-sage font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-ink">{q.question}</div>
                      <div className="text-xs text-muted flex items-center gap-2 flex-wrap">
                        <span className="text-sage font-medium">考点：{q.evaluationFocus}</span>
                        {linkedExp && (
                          <>
                            <span>·</span>
                            <span className="text-faint">关联经历：{linkedExp.title}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                        q.isPrepared
                          ? 'bg-sage-soft text-sage border border-sage-soft'
                          : 'bg-page text-muted border border-edge'
                      }`}
                    >
                      {q.isPrepared ? '已准备' : '待强化'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-faint" /> : <ChevronDown className="w-4 h-4 text-faint" />}
                  </div>
                </div>

                {/* Expanded Answer Content */}
                {isExpanded && (
                  <div className="p-6 bg-canvas border-t border-edge space-y-5 animate-in fade-in">
                    {/* Strategy View Mode Switcher */}
                    <div className="flex items-center justify-between border-b border-edge pb-3">
                      <div className="flex items-center gap-1 bg-page p-1 rounded-lg border border-edge text-xs font-semibold">
                        <button
                          onClick={() => handleModeChange(q.id, 'logic')}
                          className={`px-3 py-1 rounded transition cursor-pointer ${
                            currentMode === 'logic'
                              ? 'bg-white text-ink shadow-2xs'
                              : 'text-muted hover:text-ink'
                          }`}
                        >
                          1. 逻辑框架链
                        </button>
                        <button
                          onClick={() => handleModeChange(q.id, 'keywords')}
                          className={`px-3 py-1 rounded transition cursor-pointer ${
                            currentMode === 'keywords'
                              ? 'bg-white text-ink shadow-2xs'
                              : 'text-muted hover:text-ink'
                          }`}
                        >
                          2. 核心关键词
                        </button>
                        <button
                          onClick={() => handleModeChange(q.id, 'verbatim')}
                          className={`px-3 py-1 rounded transition cursor-pointer ${
                            currentMode === 'verbatim'
                              ? 'bg-white text-ink shadow-2xs'
                              : 'text-muted hover:text-ink'
                          }`}
                        >
                          3. 示范参考逐字稿
                        </button>
                      </div>

                      <span className="text-[11px] text-faint">建议答题时长：90 - 120 秒</span>
                    </div>

                    {/* Mode 1: Logic Framework */}
                    {currentMode === 'logic' && (
                      <div className="space-y-2">
                        {(q.preparedAnswer?.logicFlow || []).map((pt, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-3 bg-white rounded-lg border border-edge text-xs flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-full bg-sage-soft text-sage text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {pIdx + 1}
                            </span>
                            <span className="text-ink font-medium leading-relaxed">{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Mode 2: Keywords */}
                    {currentMode === 'keywords' && (
                      <div className="p-4 bg-white rounded-lg border border-edge space-y-2">
                        <div className="text-xs font-bold text-ink">应答必须带出的核心关键词与指标：</div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {(q.preparedAnswer?.keywords || []).map((kw, kIdx) => (
                            <span
                              key={kIdx}
                              className="px-2.5 py-1 rounded-md bg-sage-soft text-sage border border-sage-soft text-xs font-semibold"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mode 3: Verbatim */}
                    {currentMode === 'verbatim' && (
                      <div className="p-4 bg-white rounded-lg border border-edge text-xs text-ink leading-relaxed font-mono whitespace-pre-wrap">
                        {q.preparedAnswer?.aiReference || '暂无示范逐字稿'}
                      </div>
                    )}

                    {/* Custom User Answer Box */}
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-ink flex items-center gap-1.5">
                          <Edit3 className="w-3.5 h-3.5 text-sage" />
                          <span>你的个性化备战思路 / 自定义应答笔记：</span>
                        </label>
                        <button
                          onClick={() => handleSaveUserAnswer(q.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-sage text-white text-xs font-semibold rounded-lg hover:bg-sage-dim transition cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>保存笔记</span>
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        placeholder="写下你针对该问题的个人应答切入点或补充的数据指标..."
                        value={
                          customAnswerText[q.id] !== undefined
                            ? customAnswerText[q.id]
                            : q.preparedAnswer?.userCustomText || ''
                        }
                        onChange={(e) =>
                          setCustomAnswerText({ ...customAnswerText, [q.id]: e.target.value })
                        }
                        className="w-full p-3 text-xs rounded-lg border border-edge bg-white text-ink focus:border-sage focus:outline-none placeholder:text-faint"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. SECTION 4: 反问面试官高价值问题清单 (Questions to Ask the Interviewer) */}
      <div className="bg-white rounded-xl border border-edge overflow-hidden shadow-2xs">
        <div className="bg-page px-6 py-4 border-b border-edge flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sage-soft text-sage flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4 text-sage" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink">四、反问面试官的高价值问题清单 (Reverse Inquiries)</h2>
              <p className="text-[11px] text-muted">展现专业深度与战略格局的提问选项</p>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {defaultQuestionsToAsk.map((q, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-page border border-edge text-ink font-medium leading-relaxed flex items-start gap-2">
              <span className="font-bold text-sage">{idx + 1}.</span>
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
