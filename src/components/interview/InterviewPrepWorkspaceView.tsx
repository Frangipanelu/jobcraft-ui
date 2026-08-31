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
  Save
} from 'lucide-react';

interface InterviewPrepWorkspaceViewProps {
  interviewId?: string;
  onOpenMockInterview: (interviewId: string) => void;
  onOpenNewReview?: () => void;
}

export const InterviewPrepWorkspaceView: React.FC<InterviewPrepWorkspaceViewProps> = ({
  interviewId = 'int-byte-2',
  onOpenMockInterview,
  onOpenNewReview
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
    prep?.highFreqQuestions[0]?.id || null
  );

  const [answerModes, setAnswerModes] = useState<Record<string, 'logic' | 'keywords' | 'verbatim'>>({
    'q-b2-1': 'logic',
    'q-b2-2': 'keywords',
    'q-b2-3': 'logic',
    'q-b2-4': 'verbatim'
  });

  const [customAnswerText, setCustomAnswerText] = useState<Record<string, string>>({});
  const [newQuestionInput, setNewQuestionInput] = useState('');
  const [newQuestionFocus, setNewQuestionFocus] = useState('');
  const [showAddCustomQ, setShowAddCustomQ] = useState(false);

  if (!currentInterview || !prep) {
    return <div className="p-8 text-center text-slate-500">未找到面试准备方案</div>;
  }

  const handleModeChange = (qId: string, mode: 'logic' | 'keywords' | 'verbatim') => {
    setAnswerModes((prev) => ({ ...prev, [qId]: mode }));
  };

  const handleSaveUserAnswer = (qId: string) => {
    const text = customAnswerText[qId];
    updateQuestionAnswer(currentInterview.id, qId, { userCustomText: text }, true);
  };

  const handleCreateCustomQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionInput.trim()) return;
    addCustomQuestion(currentInterview.id, newQuestionInput.trim(), newQuestionFocus.trim());
    setNewQuestionInput('');
    setNewQuestionFocus('');
    setShowAddCustomQ(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 animate-in fade-in duration-300">
      {/* 1. Top Identity Header (Section 15.1) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{currentInterview.company}</span>
              <span>·</span>
              <span>{currentInterview.role}</span>
              <span>·</span>
              <span className="text-emerald-800 font-semibold">{currentInterview.time}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              {currentInterview.roundName} · 智能准备空间
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-right">
              <span className="text-[10px] text-slate-500 font-medium block">整体准备度</span>
              <span className="text-lg font-bold text-emerald-800">
                {currentInterview.readinessPercent}%
              </span>
            </div>

            <button
              onClick={() => onOpenMockInterview(currentInterview.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition"
            >
              <Play className="w-3.5 h-3.5" />
              <span>开始模拟面试</span>
            </button>

            <button
              onClick={() => {
                if (currentInterview.review) {
                  navigateTo('interview_review_detail', {
                    jobId: currentInterview.jobId,
                    interviewId: currentInterview.id
                  });
                } else if (onOpenNewReview) {
                  onOpenNewReview();
                } else {
                  navigateTo('interview_review_center');
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span>{currentInterview.review ? '查看赛后复盘' : '赛后上传复盘'}</span>
            </button>
          </div>
        </div>

        {/* Readiness Checklist progress pills */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 gap-2 overflow-x-auto">
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 公司研究 ✓
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 考点研判 ✓
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 重点经历调取 ✓
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-800 font-semibold flex items-center gap-1">
            高频问题 ({prep.highFreqQuestions.filter((q) => q.isPrepared).length}/{prep.highFreqQuestions.length})
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">模拟面试 (2次练习)</span>
        </div>
      </div>

      {/* 2. 01 公司研究 (Section 15.4) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">01 目标公司与本场业务研判</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">深入业务底色，掌握主动权</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
            <div className="font-bold text-slate-800">业务背景与主要产品</div>
            <p className="text-slate-600 leading-relaxed">{prep.companyResearch.background}</p>
            <div className="flex flex-wrap gap-1 pt-1">
              {prep.companyResearch.keyProducts.map((p, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-white text-slate-700 text-[11px] border border-slate-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
            <div className="font-bold text-slate-800">本场面试相关核心命题</div>
            <p className="text-slate-600 leading-relaxed">{prep.companyResearch.relevantBusiness}</p>
            <div className="text-[11px] text-slate-400 font-medium">
              近期动态：{prep.companyResearch.recentNews.join(' · ')}
            </div>
          </div>
        </div>

        {/* AI Hiring Intent Prediction */}
        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs space-y-1">
          <div className="font-bold text-emerald-950 flex items-center justify-between">
            <span>AI 推测：为什么此时招聘该岗位？</span>
            <span className="text-[10px] font-normal text-emerald-700">【AI 推测，仅供策略参考】</span>
          </div>
          <p className="text-emerald-900 leading-relaxed font-medium">
            {prep.companyResearch.aiHiringIntent}
          </p>
        </div>
      </div>

      {/* 3. 02 本场面试策略 & 03 考察重点 (Section 15.5) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">02 本场面试策略判断</h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold">{prep.aiStrategy.roundTypeDesc}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {prep.aiStrategy.keyFocusAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{area.name}</span>
                <span className="text-amber-500 font-bold">{area.importance}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 04 推荐调取的重点经历证据 (Section 15.6) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              03 本场建议重点准备的 3 个经历证据
            </h3>
            <p className="text-xs text-slate-500">
              面对技术与架构深度追问时，优先以这 3 段经历作为支撑依据
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {prep.recommendedExperiences.map((rec) => {
            const exp = experiences.find((e) => e.id === rec.experienceId);
            if (!exp) return null;

            return (
              <div
                key={rec.experienceId}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 text-xs leading-snug">{exp.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold shrink-0">
                      推荐度 {rec.recommendScore}%
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500">
                    <strong className="text-slate-700">用于证明：</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {rec.proves.map((p, idx) => (
                        <span key={idx} className="px-1.5 py-0.2 rounded bg-white text-emerald-800 border border-slate-200 text-[10px]">
                          ✓ {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('experiences', { expId: exp.id })}
                  className="w-full py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition text-center"
                >
                  查看经历卡片与版本
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. 05 & 06 高频问题清单与深度回答准备 (Section 15.7 & 15.8) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              04 高频考题与深度回答准备
            </h3>
            <p className="text-xs text-slate-500">
              设计原则：帮助你真正理解答题逻辑与权衡依据，而不是死记硬背
            </p>
          </div>

          <button
            onClick={() => setShowAddCustomQ(!showAddCustomQ)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition"
          >
            + 添加自定义问题
          </button>
        </div>

        {/* Add custom question box */}
        {showAddCustomQ && (
          <form
            onSubmit={handleCreateCustomQ}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in"
          >
            <h4 className="text-xs font-bold text-slate-900">添加自定义关注问题</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="输入问题内容（例如：如何看待某某竞品？）"
                value={newQuestionInput}
                onChange={(e) => setNewQuestionInput(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
              <input
                type="text"
                placeholder="主要考察点（例如：行业洞察/产品审美）"
                value={newQuestionFocus}
                onChange={(e) => setNewQuestionFocus(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddCustomQ(false)}
                className="px-3 py-1 text-xs text-slate-500"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-xs bg-emerald-700 text-white font-semibold rounded-lg"
              >
                确认添加
              </button>
            </div>
          </form>
        )}

        {/* Questions Accordion List */}
        <div className="space-y-4">
          {prep.highFreqQuestions.map((q, idx) => {
            const isExpanded = expandedQuestionId === q.id;
            const currentMode = answerModes[q.id] || q.preparedAnswer.mode || 'logic';
            const matchedExp = experiences.find((e) => e.id === q.recommendedExperienceId);

            return (
              <div
                key={q.id}
                className={`rounded-xl border transition ${
                  isExpanded
                    ? 'border-emerald-300 bg-slate-50/40 ring-1 ring-emerald-100'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Accordion Trigger Header */}
                <div
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{q.question}</h4>
                      {q.isPrepared && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                          已准备
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap pl-7">
                      <span className="text-amber-500 font-medium">
                        考察概率 {'★'.repeat(q.probabilityStars)}
                      </span>
                      <span>·</span>
                      <span>考察核心：{q.evaluationFocus}</span>
                      {matchedExp && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-800 font-medium">
                            推荐支撑经历：{matchedExp.title.substring(0, 16)}...
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-slate-400 p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Answer Workspace (Section 15.8) */}
                {isExpanded && (
                  <div className="p-6 pt-0 border-t border-slate-200/60 space-y-4 animate-in fade-in">
                    {/* Structure Modes Pill Switch */}
                    <div className="flex items-center justify-between gap-3 flex-wrap pt-4">
                      <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-lg text-xs font-semibold">
                        <button
                          type="button"
                          onClick={() => handleModeChange(q.id, 'logic')}
                          className={`px-3 py-1 rounded-md transition ${
                            currentMode === 'logic'
                              ? 'bg-white text-emerald-900 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          推荐答题逻辑流 (思路)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleModeChange(q.id, 'keywords')}
                          className={`px-3 py-1 rounded-md transition ${
                            currentMode === 'keywords'
                              ? 'bg-white text-emerald-900 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          核心关键词清单
                        </button>
                        <button
                          type="button"
                          onClick={() => handleModeChange(q.id, 'verbatim')}
                          className={`px-3 py-1 rounded-md transition ${
                            currentMode === 'verbatim'
                              ? 'bg-white text-emerald-900 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          AI 参考逐字稿
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          updateQuestionAnswer(currentInterview.id, q.id, {}, !q.isPrepared)
                        }
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                          q.isPrepared
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-emerald-700 text-white hover:bg-emerald-800'
                        }`}
                      >
                        {q.isPrepared ? '标记为未完成' : '标记为已掌握 ✓'}
                      </button>
                    </div>

                    {/* Mode 1: Logic Flow */}
                    {currentMode === 'logic' && (
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="font-bold text-slate-800">
                          推荐回答结构（背景 → 问题 → 职责 → 行动 → 结果 → 反思）：
                        </div>
                        <ol className="space-y-1.5 list-decimal list-inside text-slate-700 leading-relaxed font-medium">
                          {q.preparedAnswer.logicFlow.map((step, sIdx) => (
                            <li key={sIdx} className="pl-1">{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Mode 2: Keywords */}
                    {currentMode === 'keywords' && (
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="font-bold text-slate-800">建议在回答中自然提到的硬核关键词：</div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {q.preparedAnswer.keywords.map((kw, kwIdx) => (
                            <span
                              key={kwIdx}
                              className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 font-bold border border-emerald-200 text-xs"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mode 3: Verbatim Reference */}
                    {currentMode === 'verbatim' && (
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="font-bold text-slate-800">AI 参考示范表述：</div>
                        <p className="text-slate-700 leading-relaxed font-sans bg-slate-50 p-3 rounded-lg border border-slate-100 text-justify">
                          {q.preparedAnswer.aiReference}
                        </p>
                      </div>
                    )}

                    {/* Custom Personal Notes Area */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-slate-700">
                          我的个性化备忘笔记与提纲：
                        </label>
                        <button
                          type="button"
                          onClick={() => handleSaveUserAnswer(q.id)}
                          className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>保存笔记</span>
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        placeholder="记录你的个人真实案例数字、开场白或面试当场准备提醒..."
                        defaultValue={q.preparedAnswer.userCustomText || ''}
                        onChange={(e) =>
                          setCustomAnswerText({ ...customAnswerText, [q.id]: e.target.value })
                        }
                        className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-sans leading-relaxed resize-none bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
