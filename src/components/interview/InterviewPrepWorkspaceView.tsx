import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  ArrowLeft,
  CheckCircle2,
  Mic,
  Sparkles,
  Save,
  Check,
  RotateCcw
} from 'lucide-react';

interface InterviewPrepWorkspaceViewProps {
  interviewId?: string;
  onOpenMockInterview: (interviewId: string) => void;
  onOpenNewInterview?: (jobId?: string) => void;
}

const SECTIONS = [
  '公司研究',
  '本场面试判断',
  '推荐经历',
  '高频问题',
  '回答准备',
  '模拟面试'
] as const;

type SectionType = (typeof SECTIONS)[number];

const companyData = {
  name: '字节跳动',
  founded: '2012年',
  headcount: '11万+',
  products: ['抖音', 'TikTok', 'Today头条', 'Lark'],
  focus: 'AI全面转型，将 AI 能力嵌入核心产品，搜索、推荐、创作等场景均在快速升级。',
  news: [
    '字节跳动 2026 Q2 营收同比增长 31%，AI 广告营收占比首次超 40%',
    '「豆包」大模型已面向 B 端商业化，获 300+ 企业采购',
    '搜索部门招聘大幅扩张，主攻 AI 搜索方向'
  ],
  culture: ['Be Real', 'Always Day 1', '不设边界', '追求极致']
};

const initialQuestions = [
  {
    id: '1',
    q: '介绍一个你从 0 到 1 做过的 AI 产品案例',
    type: '经历深挖',
    difficulty: 'high',
    prepared: true,
    starSuggestion:
      '建议使用 STAR 结构：先说明 Situation（AI 搜索评测体系缺失），Task（建立自动化评估 pipeline），Action（设计指标体系 + 标注数据集），Result（效率提升 4× + 召回率 +15%）。避免开头直接说“我负责”，而是先提背景让面试官有代入感。',
    defaultDraft:
      '在快知智能期间，我从 0 到 1 主导了 AI 搜索与评测体系。当时核心挑战是模型幻觉与评估周期过长（2周）。我设计了双裁判仲裁与自动化黄金测试集，将评测时间缩短至 4 小时以内，模型幻觉率下降 34.2%。'
  },
  {
    id: '2',
    q: '你如何平衡用户需求和业务目标的冲突？',
    type: '价值观',
    difficulty: 'medium',
    prepared: true,
    starSuggestion:
      '建议先表明原则：短期看指标妥协，长期看用户价值沉淀。举一个具体的 A/B 测试或功能取舍实例，说明如何通过阶段性灰度和体验守护线达成共赢。',
    defaultDraft:
      '在处理广告召回与用户满意度冲突时，我们设定了不可触碰的体验红线（负反馈率 ≤ 0.2%），并在灰度测试中通过动态权重算法，在保障广告 ROI 的同时维持次留无显著负向。'
  },
  {
    id: '3',
    q: '你对字节搜索的 AI 化有什么看法？',
    type: '行业认知',
    difficulty: 'high',
    prepared: false,
    starSuggestion:
      '建议从三个维度展开：1. 交互形态从传统关键词匹配向问答生成与 Agent 意图承接升级；2. 挑战在于高并发下的推理成本控制与多模态生成质量；3. 结合字节庞大生态（抖音视频、头条图文）的内容资产闭环优势。',
    defaultDraft: ''
  },
  {
    id: '4',
    q: '你在 JD 里最有挑战的经历是什么？',
    type: '经历深挖',
    difficulty: 'medium',
    prepared: false,
    starSuggestion:
      '选一个有明显冲突/资源瓶颈但最终突破的项目。突出你的决策魄力与跨团队统筹手段（如与算法、工程跨部门协作的争议化解）。',
    defaultDraft: ''
  },
  {
    id: '5',
    q: '如何推动跨团队协作中的阻力？',
    type: '软技能',
    difficulty: 'low',
    prepared: false,
    starSuggestion:
      '强调对齐目标（OKR 统一）、机制化沟通（建立对齐例会与指标看板），以及“让算法团队用数据看到价值”而非单纯催促进度。',
    defaultDraft: ''
  }
];

function SectionHeader({
  num,
  title,
  done
}: {
  num: number;
  title: string;
  done?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-3.5">
      <span className="text-[11px] font-bold text-[#A8ADA8] min-w-[20px]">
        {String(num).padStart(2, '0')}
      </span>
      <span className="text-[15px] font-bold text-[#202421] tracking-tight">{title}</span>
      {done && (
        <span className="text-[11px] text-[#3E6256] bg-[#E5EEE9] px-1.5 py-0.5 rounded font-medium">
          已完成
        </span>
      )}
    </div>
  );
}

export const InterviewPrepWorkspaceView: React.FC<InterviewPrepWorkspaceViewProps> = ({
  interviewId = 'int-byte-1',
  onOpenMockInterview
}) => {
  const { interviews, navigateTo, showToast } = useJobCraft();

  const currentInterview = interviews.find((i) => i.id === interviewId) || interviews[0];

  const [activeSection, setActiveSection] = useState<SectionType>('公司研究');
  const [expandedQ, setExpandedQ] = useState<string | null>('1');
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedQIdForAnswer, setSelectedQIdForAnswer] = useState<string>('1');
  const [answerDrafts, setAnswerDrafts] = useState<Record<string, string>>({
    '1': initialQuestions[0].defaultDraft,
    '2': initialQuestions[1].defaultDraft,
    '3': '',
    '4': '',
    '5': ''
  });

  const sectionStatus: Record<SectionType, boolean> = {
    '公司研究': true,
    '本场面试判断': true,
    '推荐经历': true,
    '高频问题': questions.some((q) => q.prepared),
    '回答准备': questions.filter((q) => q.prepared).length >= 2,
    '模拟面试': false
  };

  const iv = {
    company: currentInterview?.company || '字节跳动',
    position: currentInterview?.role || 'AI 产品经理',
    round: currentInterview?.roundName || '第2面 · 业务面',
    time: currentInterview?.time || '明天 14:00',
    readiness: currentInterview?.readinessPercent || 72
  };

  const toggleQuestionPrepared = (qId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, prepared: !q.prepared } : q))
    );
    showToast({
      type: 'info',
      title: '状态已更新',
      message: '已更新高频问题备战记录。'
    });
  };

  const handleSaveAnswer = () => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === selectedQIdForAnswer ? { ...q, prepared: true } : q))
    );
    showToast({
      type: 'success',
      title: '回答草稿已保存',
      message: '已记录你的应答思路并标记为已准备。'
    });
  };

  const handleQuickPrepare = (qId: string) => {
    setSelectedQIdForAnswer(qId);
    setActiveSection('回答准备');
  };

  const currentQObj =
    questions.find((q) => q.id === selectedQIdForAnswer) || questions[0];

  const renderContent = () => {
    switch (activeSection) {
      // ── Tab 1: 01 公司研究 (Exact match with Image 1) ──
      case '公司研究':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <SectionHeader num={1} title="公司研究" done />

            {/* Basic Info & Strategy Focus (2 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-4">
              <div className="bg-[#FAFAF8] border border-[#E4E5E0] rounded-xl p-4 sm:p-5 shadow-2xs">
                <div className="text-[11px] font-bold text-[#A8ADA8] uppercase tracking-wider mb-2.5">
                  基本信息
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#F0F0EC]">
                    <span className="text-[#737873]">成立</span>
                    <span className="text-[#202421] font-medium">{companyData.founded}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F0F0EC]">
                    <span className="text-[#737873]">员工</span>
                    <span className="text-[#202421] font-medium">{companyData.headcount}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {companyData.products.map((p) => (
                    <span
                      key={p}
                      className="text-[11.5px] px-2.5 py-1 bg-[#E5EEE9] text-[#3E6256] rounded-md font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#FAFAF8] border border-[#E4E5E0] rounded-xl p-4 sm:p-5 shadow-2xs">
                <div className="text-[11px] font-bold text-[#A8ADA8] uppercase tracking-wider mb-2.5">
                  战略重心
                </div>
                <p className="text-[12.5px] text-[#4A5A52] leading-relaxed m-0">
                  {companyData.focus}
                </p>
              </div>
            </div>

            {/* Recent News */}
            <div className="mb-4">
              <div className="text-[13px] font-bold text-[#202421] mb-2.5">近期动态</div>
              <div className="space-y-2">
                {companyData.news.map((n, i) => (
                  <div
                    key={i}
                    className="flex gap-2.5 py-2 border-b border-[#F5F5F2] text-xs items-start"
                  >
                    <span className="font-bold text-[#A8ADA8] min-w-[18px] mt-0.5">
                      {i + 1}.
                    </span>
                    <p className="text-[#4A5252] leading-relaxed m-0">{n}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Keywords */}
            <div>
              <div className="text-[13px] font-bold text-[#202421] mb-2.5">文化关键词</div>
              <div className="flex flex-wrap gap-2">
                {companyData.culture.map((c) => (
                  <span
                    key={c}
                    className="text-[12.5px] px-3 py-1.5 bg-[#F0F0EC] text-[#737873] rounded-lg border border-[#E8E8E4]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      // ── Tab 2: 02 本场面试判断 (Exact match with Image 2) ──
      case '本场面试判断':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <SectionHeader num={2} title="本场面试判断" done />

            {/* AI Strategy Analysis Box */}
            <div className="bg-[#F5FAF7] border border-[#C8D8D1] rounded-2xl p-5 sm:p-6 mb-5 shadow-2xs">
              <div className="text-[11px] font-bold text-[#3E6256] uppercase tracking-wider mb-2">
                AI 策略分析
              </div>
              <div className="text-[14.5px] font-bold text-[#202421] mb-2">
                业务面试 · 聚焦产品经验与思维
              </div>
              <p className="text-[13px] text-[#4A6559] leading-relaxed mb-3.5">
                第1轮业务面通常由产品总监/组长把关，核心考察你的产品感、思考框架和过往经历的深度。
                建议重点准备 AI 产品案例与 0 到 1 经历，避免泛泛而谈。
              </p>
              <div className="text-xs font-semibold text-[#3E6256]">
                预计时长：45–60 分钟
              </div>
            </div>

            {/* Key Focus Directions */}
            <div>
              <div className="text-[13px] font-bold text-[#202421] mb-3">重点方向</div>
              <div className="space-y-3.5">
                {[
                  {
                    focus: '深挖 AI 产品经历',
                    desc: '需要有完整闭环的案例，准备 Challenge & Iteration 细节'
                  },
                  {
                    focus: '搜索 / 推荐类产品认知',
                    desc: '可能追问你对该类产品指标体系和优化方向的理解'
                  },
                  {
                    focus: '数据驱动决策',
                    desc: '举例时注意量化 Impact，避免用模糊词语描述结果'
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-3 py-2.5 border-b border-[#F5F5F2] items-start"
                  >
                    <span className="text-xs font-bold text-[#A8ADA8] min-w-[20px] mt-0.5">
                      {i + 1}.
                    </span>
                    <div>
                      <div className="text-[13.5px] font-bold text-[#202421] mb-1">
                        {item.focus}
                      </div>
                      <div className="text-[12.5px] text-[#737873] leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ── Tab 3: 03 推荐经历 ──
      case '推荐经历':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <SectionHeader num={3} title="推荐经历" done />
            <p className="text-xs text-[#737873] mb-4">
              基于本场面试需求，AI 推荐以下经历重点讲述
            </p>

            <div className="space-y-3.5">
              {[
                {
                  title: 'AI 搜索优化项目',
                  level: '首推',
                  lc: 'text-[#3E6256]',
                  lb: 'bg-[#E5EEE9]',
                  border: 'border-[#C8D8D1]',
                  bg: 'bg-[#FAFCFB]',
                  match: '与岗位直接相关，包含 AI + 搜索 + 数据分析三大核心标签',
                  tips: [
                    '强调从 0 建立评估体系的完整过程',
                    '量化提升指标：nDCG 提升 0.12，效率提升 4×'
                  ]
                },
                {
                  title: 'AI 产品 MVP 项目',
                  level: '重要',
                  lc: 'text-[#B7794B]',
                  lb: 'bg-[#F4E8DE]',
                  border: 'border-[#E4E5E0]',
                  bg: 'bg-[#FAFAF8]',
                  match: '有完整产品闭环和用户验证，展示产品感和推动力',
                  tips: [
                    '准备 1-2 个关键决策点的 trade-off 说明',
                    '强调 NPS 42 与 3 个月上线成果'
                  ]
                }
              ].map((exp, i) => (
                <div
                  key={i}
                  className={`border ${exp.border} ${exp.bg} rounded-xl p-4 sm:p-5 shadow-2xs`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-bold text-[#202421]">{exp.title}</div>
                    <span
                      className={`text-[11.5px] font-bold px-2 py-0.5 rounded ${exp.lc} ${exp.lb}`}
                    >
                      {exp.level}
                    </span>
                  </div>
                  <p className="text-xs text-[#737873] mb-3">{exp.match}</p>
                  <div className="text-xs font-bold text-[#202421] mb-1.5">讲述提示</div>
                  <div className="space-y-1">
                    {exp.tips.map((tip, ti) => (
                      <div key={ti} className="flex items-start gap-1.5 text-xs text-[#4A5A52]">
                        <span className="text-[#3E6256] font-bold">·</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ── Tab 4: 04 高频问题 (Exact match with Image 3) ──
      case '高频问题':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <SectionHeader num={4} title="高频问题" />
            <p className="text-xs text-[#737873] mb-4">
              AI 根据岗位 JD 和面试类型生成，共 {questions.length} 道
            </p>

            <div className="space-y-2">
              {questions.map((q) => {
                const dStars =
                  q.difficulty === 'high'
                    ? '★★★'
                    : q.difficulty === 'medium'
                    ? '★★'
                    : '★';
                const dColor =
                  q.difficulty === 'high'
                    ? 'text-[#B7794B]'
                    : q.difficulty === 'medium'
                    ? 'text-[#737873]'
                    : 'text-[#A8ADA8]';

                const isExpanded = expandedQ === q.id;

                return (
                  <div
                    key={q.id}
                    className="border border-[#E4E5E0] rounded-xl overflow-hidden bg-white shadow-2xs"
                  >
                    <div
                      onClick={() => setExpandedQ(isExpanded ? null : q.id)}
                      className="w-full flex justify-between items-center px-4 py-3.5 cursor-pointer hover:bg-[#FAFAF8] transition text-left"
                    >
                      <div className="flex items-center gap-2.5 flex-1 pr-3">
                        <button
                          type="button"
                          onClick={(e) => toggleQuestionPrepared(q.id, e)}
                          className="shrink-0 cursor-pointer"
                          title="标记为已准备"
                        >
                          {q.prepared ? (
                            <CheckCircle2 className="w-4 h-4 text-[#3E6256]" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-[#D0D2CB] inline-block" />
                          )}
                        </button>
                        <span className="text-[13.5px] font-medium text-[#202421]">
                          {q.q}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-[#737873] bg-[#F0F0EC] px-2 py-0.5 rounded">
                          {q.type}
                        </span>
                        <span className={`text-xs ${dColor}`}>{dStars}</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-3.5 pt-1 bg-[#FAFAF8] border-t border-[#F0F0EC]">
                        <button
                          type="button"
                          onClick={() => handleQuickPrepare(q.id)}
                          className="mt-2 px-3 py-1.5 text-xs font-semibold text-[#3E6256] border border-[#C8D8D1] rounded-lg bg-white hover:bg-[#F5FAF7] shadow-2xs transition cursor-pointer"
                        >
                          去准备这道题
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      // ── Tab 5: 05 回答准备 (Exact match with Image 4) ──
      case '回答准备':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <SectionHeader num={5} title="回答准备" />
            <p className="text-xs text-[#737873] mb-4">
              选择问题并练习你的回答，AI 给出优化建议
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4">
              {/* Left Column: Questions List */}
              <div className="space-y-1.5">
                {questions.map((q) => {
                  const isSelected = selectedQIdForAnswer === q.id;
                  return (
                    <div
                      key={q.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedQIdForAnswer(q.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedQIdForAnswer(q.id);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition cursor-pointer flex items-start gap-2 ${
                        isSelected
                          ? 'border-[#3E6256] bg-[#E5EEE9] text-[#3E6256]'
                          : 'border-[#E4E5E0] bg-white text-[#202421] hover:bg-[#FAFAF8]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => toggleQuestionPrepared(q.id, e)}
                        className="mt-0.5 shrink-0 hover:opacity-80 transition cursor-pointer"
                        title={q.prepared ? '标记为未准备' : '标记为已准备'}
                      >
                        {q.prepared ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6256]" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-[#D0D2CB] inline-block" />
                        )}
                      </button>
                      <span
                        className={`text-xs leading-relaxed ${
                          isSelected ? 'font-bold' : 'font-medium'
                        }`}
                      >
                        {q.q}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Active Question, Answer Box & AI Suggestions */}
              <div className="space-y-3.5">
                {/* Active Question Box */}
                <div className="bg-[#F5FAF7] border border-[#C8D8D1] rounded-xl p-4 shadow-2xs">
                  <div className="text-xs font-bold text-[#3E6256] mb-1.5">当前问题</div>
                  <div className="text-sm font-bold text-[#202421]">{currentQObj.q}</div>
                </div>

                {/* My Answer Editor Box */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-[#737873]">我的回答</span>
                    <button
                      type="button"
                      onClick={handleSaveAnswer}
                      className="text-xs font-bold text-[#3E6256] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Save className="w-3 h-3" />
                      <span>保存作答草稿</span>
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    value={answerDrafts[selectedQIdForAnswer] || ''}
                    onChange={(e) =>
                      setAnswerDrafts((prev) => ({
                        ...prev,
                        [selectedQIdForAnswer]: e.target.value
                      }))
                    }
                    placeholder="输入你的回答思路或草稿..."
                    className="w-full p-3.5 bg-white border border-[#E4E5E0] focus:border-[#3E6256] rounded-xl text-xs sm:text-[13px] text-[#202421] placeholder:text-[#A8ADA8] outline-none resize-y leading-relaxed font-sans shadow-2xs"
                  />
                </div>

                {/* AI STAR Optimization Suggestions */}
                <div className="bg-[#FAFAF8] border border-[#E4E5E0] rounded-xl p-4 shadow-2xs">
                  <div className="text-xs font-bold text-[#202421] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#3E6256]" />
                    <span>AI 优化建议（示例）</span>
                  </div>
                  <p className="text-xs sm:text-[12.5px] text-[#4A5A52] leading-relaxed m-0">
                    {currentQObj.starSuggestion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      // ── Tab 6: 06 模拟面试 (Exact match with Image 5) ──
      case '模拟面试':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <SectionHeader num={6} title="模拟面试" />
            <div className="bg-[#F5FAF7] border border-[#C8D8D1] rounded-2xl p-8 md:p-10 text-center shadow-2xs">
              <div className="text-3xl mb-3">🎤</div>
              <div className="text-base font-bold text-[#202421] mb-2 tracking-tight">
                AI 模拟面试官
              </div>
              <p className="text-xs sm:text-[13.5px] text-[#4A6559] leading-relaxed max-w-md mx-auto mb-6">
                模拟真实面试场景，AI 将按业务面逻辑提问，并在每轮问答后给出反馈。
              </p>
              <button
                type="button"
                onClick={() => onOpenMockInterview(currentInterview.id)}
                className="px-6 py-2.5 bg-[#3E6256] hover:bg-[#345449] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
              >
                开始模拟面试
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-full bg-white pb-24">
      {/* ── Sticky Header (Exact Match with Image 1-5) ── */}
      <div className="bg-white border-b border-[#E4E5E0] sticky top-0 z-10">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8 pt-4">
          {/* Breadcrumb back link */}
          <button
            type="button"
            onClick={() => navigateTo('interview_prep_center')}
            className="flex items-center gap-1 text-xs text-[#737873] hover:text-[#202421] transition cursor-pointer mb-2.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>面试准备</span>
          </button>

          {/* Job Title & Readiness Indicator */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-lg font-bold text-[#202421] tracking-tight">
                {iv.company} · {iv.position}
              </h1>
              <div className="text-xs text-[#737873] mt-0.5">
                {iv.round} · {iv.time}
              </div>
            </div>

            {/* Readiness */}
            <div className="flex items-center gap-2.5">
              <div>
                <div
                  className={`text-lg font-extrabold leading-none ${
                    iv.readiness >= 80 ? 'text-[#3E6256]' : 'text-[#B7794B]'
                  }`}
                >
                  {iv.readiness}%
                </div>
                <div className="text-[11px] text-[#A8ADA8] text-right mt-0.5">准备度</div>
              </div>
              <div className="w-16 h-1.5 bg-[#F0F0EC] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    iv.readiness >= 80 ? 'bg-[#3E6256]' : 'bg-[#B7794B]'
                  }`}
                  style={{ width: `${iv.readiness}%` }}
                />
              </div>
            </div>
          </div>

          {/* Section Tabs (6 items with ✓ badge) */}
          <div className="flex gap-1 overflow-x-auto custom-scrollbar">
            {SECTIONS.map((s, i) => {
              const isDone = sectionStatus[s];
              const isActive = activeSection === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setActiveSection(s)}
                  className={`flex items-center gap-1 px-3.5 py-2 text-xs transition cursor-pointer whitespace-nowrap border-b-2 -mb-px ${
                    isActive
                      ? 'font-bold text-[#202421] border-[#3E6256]'
                      : 'text-[#737873] hover:text-[#202421] border-transparent'
                  }`}
                >
                  {isDone && <span className="text-[#3E6256] text-xs">✓</span>}
                  <span>
                    {String(i + 1).padStart(2, '0')} {s}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content Container (Max 800px width as in images) ── */}
      <div className="max-w-[800px] mx-auto px-6 sm:px-8 pt-6">
        {renderContent()}
      </div>
    </div>
  );
};
