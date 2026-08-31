import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import { InterviewRoundType, InterviewFormat } from '../../types/jobcraft';
import {
  X,
  BookOpenCheck,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

interface NewInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewInterviewModal: React.FC<NewInterviewModalProps> = ({ isOpen, onClose }) => {
  const { jobs, createInterview, navigateTo } = useJobCraft();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedJobId, setSelectedJobId] = useState<string>('job-1');
  const [isCustomJob, setIsCustomJob] = useState<boolean>(false);
  const [customCompany, setCustomCompany] = useState('');
  const [customRole, setCustomRole] = useState('');

  const [roundNumber, setRoundNumber] = useState<number>(2);
  const [roundName, setRoundName] = useState('第2面 · 技术/交叉业务面');
  const [roundType, setRoundType] = useState<InterviewRoundType>('tech');
  const [interviewTime, setInterviewTime] = useState('2026-09-02 14:00');
  const [interviewFormat, setInterviewFormat] = useState<InterviewFormat>('video');
  const [interviewer, setInterviewer] = useState('李伟（AI Lab 架构师）');
  const [supplementNotes, setSupplementNotes] = useState('HR提醒重点关注系统架构、延迟 SLA 优化与大模型评测一致性。');

  if (!isOpen) return null;

  const currentJob = jobs.find((j) => j.id === selectedJobId);

  const handleFinish = () => {
    const finalCompany = isCustomJob ? customCompany : currentJob?.company || '目标企业';
    const finalRole = isCustomJob ? customRole : currentJob?.role || 'AI 产品经理';

    const newInterviewId = createInterview({
      jobId: isCustomJob ? undefined : selectedJobId,
      company: finalCompany,
      role: finalRole,
      roundNumber,
      roundName,
      roundType,
      time: interviewTime,
      format: interviewFormat,
      interviewer,
      supplementNotes
    });

    onClose();
    navigateTo('interview_prep_workspace', {
      jobId: isCustomJob ? undefined : selectedJobId,
      interviewId: newInterviewId
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BookOpenCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">新建面试准备方案</h3>
              <p className="text-xs text-slate-500">
                步骤 {step} / 4 · 先告诉我们这是一场什么面试，AI 会量身制定题库与答题提纲
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="h-1 w-full bg-slate-100">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step 1: 关联已有岗位 (Section 14.2) */}
        {step === 1 && (
          <div className="p-6 space-y-5 animate-in fade-in">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">这场面试属于哪个岗位？</h4>
              <p className="text-xs text-slate-500">
                如果选择已有岗位，系统将自动继承该岗位的 JD 分析、定制简历与推荐经历
              </p>
            </div>

            <div className="space-y-2.5">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => {
                    setSelectedJobId(job.id);
                    setIsCustomJob(false);
                  }}
                  className={`p-4 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${
                    !isCustomJob && selectedJobId === job.id
                      ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">
                      {job.company} · {job.role}
                    </div>
                    <div className="text-slate-500">
                      {job.department} · {job.salaryRange} · 匹配度 {job.matchScore}%
                    </div>
                  </div>
                  {!isCustomJob && selectedJobId === job.id && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                </div>
              ))}

              <div
                onClick={() => setIsCustomJob(true)}
                className={`p-4 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${
                  isCustomJob
                    ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">暂不关联已有岗位 / 系统外独立面试</div>
                  <div className="text-slate-500">直接手动输入公司和岗位信息即可开启准备</div>
                </div>
                {isCustomJob && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
              </div>
            </div>

            {isCustomJob && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <input
                  type="text"
                  placeholder="公司名称 (例如: 微软)"
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  className="px-3 py-2 text-xs border rounded-lg border-slate-300"
                />
                <input
                  type="text"
                  placeholder="岗位名称 (例如: AI PM)"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="px-3 py-2 text-xs border rounded-lg border-slate-300"
                />
              </div>
            )}
          </div>
        )}

        {/* Step 2: 应聘与经历继承确认 (Section 14.3) */}
        {step === 2 && (
          <div className="p-6 space-y-4 animate-in fade-in">
            <h4 className="text-sm font-bold text-slate-900">自动带入的求职资产</h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">目标应聘：</span>
                <span className="font-bold text-slate-900">
                  {isCustomJob ? customCompany : currentJob?.company} · {isCustomJob ? customRole : currentJob?.role}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">关联简历：</span>
                <span className="text-emerald-800 font-medium">字节跳动定制版 V2.1（已包含 3 条 AI 润色）</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">优先调取经历资产：</span>
                <span className="text-slate-800 font-medium">「AI 搜索评测体系建设」等 3 篇</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              AI 会依据上述资产中的量化指标，自动为你生成对齐面试官考察意图的答题要点。
            </p>
          </div>
        )}

        {/* Step 3: 面试基础信息 (Section 14.4) */}
        {step === 3 && (
          <div className="p-6 space-y-4 animate-in fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  第几轮面试
                </label>
                <select
                  value={roundNumber}
                  onChange={(e) => {
                    const rNum = parseInt(e.target.value);
                    setRoundNumber(rNum);
                    setRoundName(`第${rNum}面 · ${rNum === 1 ? '业务面' : rNum === 2 ? '技术/架构面' : 'HR面'}`);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                >
                  <option value={1}>第1面</option>
                  <option value={2}>第2面</option>
                  <option value={3}>第3面</option>
                  <option value={4}>第4面 / 终面</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  面试类型
                </label>
                <select
                  value={roundType}
                  onChange={(e) => setRoundType(e.target.value as InterviewRoundType)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                >
                  <option value="business">业务面 (关注业务判断与推进)</option>
                  <option value="tech">技术面 (关注算法底层与系统架构)</option>
                  <option value="product">产品面 (关注需求分析与交互)</option>
                  <option value="hr">HR面 (关注文化与薪资沟通)</option>
                  <option value="comprehensive">综合/终面</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  面试时间
                </label>
                <input
                  type="text"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  面试形式
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => setInterviewFormat('video')}
                    className={`py-2 text-[11px] rounded border font-medium ${
                      interviewFormat === 'video' ? 'bg-emerald-50 text-emerald-900 border-emerald-600' : 'border-slate-200'
                    }`}
                  >
                    视频
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterviewFormat('phone')}
                    className={`py-2 text-[11px] rounded border font-medium ${
                      interviewFormat === 'phone' ? 'bg-emerald-50 text-emerald-900 border-emerald-600' : 'border-slate-200'
                    }`}
                  >
                    电话
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterviewFormat('onsite')}
                    className={`py-2 text-[11px] rounded border font-medium ${
                      interviewFormat === 'onsite' ? 'bg-emerald-50 text-emerald-900 border-emerald-600' : 'border-slate-200'
                    }`}
                  >
                    现场
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                面试官信息（可选）
              </label>
              <input
                type="text"
                placeholder="例如：李伟（AI Lab 架构师）"
                value={interviewer}
                onChange={(e) => setInterviewer(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
          </div>
        )}

        {/* Step 4: 补充背景信息 (Section 14.5) */}
        {step === 4 && (
          <div className="p-6 space-y-4 animate-in fade-in">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">还有什么关键背景想告诉 AI？</h4>
              <p className="text-xs text-slate-500">
                信息越完整，准备越精准（例如 HR 的提示、特别关注的项目等；不知道也没关系）
              </p>
            </div>

            <textarea
              rows={4}
              placeholder="例如：
• HR 提醒过面试官注重算法底层与延迟 SLA；
• 对方很关注我们做过的搜索评测项目；
• 朋友透露过可能会考高并发下的缓存策略。"
              value={supplementNotes}
              onChange={(e) => setSupplementNotes(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 resize-none font-sans leading-relaxed"
            />
          </div>
        )}

        {/* Footer Navigation */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-3.5 py-2 text-xs text-slate-600 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>上一步</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as any)}
              className="px-5 py-2 text-xs bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg flex items-center gap-1.5 transition"
            >
              <span>下一步</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2 text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg flex items-center gap-1.5 transition shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>创建面试并生成准备方案 →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
