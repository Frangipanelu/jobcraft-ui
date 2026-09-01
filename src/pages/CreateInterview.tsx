import React, { useState, useEffect } from 'react';
import { useJobCraft } from '../context/JobCraftContext';
import { InterviewRoundType, InterviewFormat } from '../types/jobcraft';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Loader2
} from 'lucide-react';

const steps = [
  { num: 0, label: '关联岗位' },
  { num: 1, label: '应聘信息' },
  { num: 2, label: '面试信息' },
  { num: 3, label: '补充信息' }
];

const aiGenerateItems = [
  '公司背景及最新动态研究',
  '面试类型策略分析与角色推断',
  '推荐经历与话术方向',
  '高频问题及优化答案',
  '模拟面试题目'
];

export const CreateInterview: React.FC = () => {
  const {
    jobs,
    createInterview,
    createJob,
    createJDAnalysis,
    navigateTo,
    interviewDraft,
    saveInterviewDraft,
    clearInterviewDraft,
    showToast
  } = useJobCraft();

  // Restore from draft if exists
  const [step, setStep] = useState<number>(interviewDraft?.step || 0);

  // Step 0 - Job selection
  const [selectedJobId, setSelectedJobId] = useState<string>(interviewDraft?.selectedJobId || '');
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [newJobCompany, setNewJobCompany] = useState('');
  const [newJobRole, setNewJobRole] = useState('');

  // Step 1 - Application info
  const [resumeVersion, setResumeVersion] = useState<'ai' | 'general'>(interviewDraft?.resumeVersion || 'ai');
  const [coverLetter, setCoverLetter] = useState(interviewDraft?.coverLetter || '');

  // Step 2 - Interview details
  const [roundNumber, setRoundNumber] = useState<number>(interviewDraft?.roundNumber || 2);
  const [roundName, setRoundName] = useState<string>(interviewDraft?.roundName || '第2面 · 技术/架构面');
  const [roundType, setRoundType] = useState<InterviewRoundType>(interviewDraft?.roundType || 'tech');
  const [interviewTime, setInterviewTime] = useState<string>(interviewDraft?.interviewTime || '2026-09-02 14:00');
  const [interviewFormat, setInterviewFormat] = useState<InterviewFormat>(interviewDraft?.interviewFormat || 'video');
  const [platform, setPlatform] = useState<string>(interviewDraft?.platform || '');
  const [interviewer, setInterviewer] = useState<string>(interviewDraft?.interviewer || '');

  // Step 3 - Additional info
  const [supplementNotes, setSupplementNotes] = useState<string>(interviewDraft?.supplementNotes || '');
  const [remindUpload, setRemindUpload] = useState<boolean>(interviewDraft?.remindUpload || false);

  // Loading state
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentAiStep, setCurrentAiStep] = useState(-1);

  const currentJob = jobs.find((j) => j.id === selectedJobId);

  // Clear draft on unmount
  useEffect(() => {
    return () => {
      clearInterviewDraft();
    };
  }, []);

  // Can proceed
  const canNext = () => {
    if (step === 0) {
      return !!selectedJobId;
    }
    return true;
  };

  // Handle back
  const handleBack = () => {
    if (step === 0) {
      navigateTo('interview_prep_center');
    } else {
      setStep((s) => s - 1);
    }
  };

  // Handle next
  const handleNext = () => {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  };

  // Handle create job
  const handleCreateJob = () => {
    if (!newJobCompany.trim() || !newJobRole.trim()) {
      showToast({
        type: 'warning',
        title: '请填写完整信息',
        message: '公司名称和岗位名称不能为空'
      });
      return;
    }

    const newJobId = createJob({
      company: newJobCompany.trim(),
      role: newJobRole.trim(),
      status: 'pending'
    });

    createJDAnalysis({
      company: newJobCompany.trim(),
      role: newJobRole.trim(),
      rawText: '待补充JD内容',
      jobId: newJobId
    });

    setSelectedJobId(newJobId);
    setShowNewJobForm(false);
    setNewJobCompany('');
    setNewJobRole('');

    showToast({
      type: 'success',
      title: '岗位已创建',
      message: '已自动创建岗位和JD记录，请继续完善信息'
    });
  };

  // Handle go to JD analysis page
  const handleGoToJDAnalysis = () => {
    // Save current form state to localStorage
    const draftData = {
      step,
      selectedJobId,
      resumeVersion,
      coverLetter,
      roundNumber,
      roundName,
      roundType,
      interviewTime,
      interviewFormat,
      platform,
      interviewer,
      supplementNotes,
      remindUpload
    };
    localStorage.setItem('interviewDraft', JSON.stringify(draftData));
    navigateTo('jd_analysis');
  };

  // Handle finish
  const handleFinish = () => {
    setIsGenerating(true);
    setCurrentAiStep(0);
  };

  // AI generation animation
  useEffect(() => {
    if (!isGenerating || currentAiStep < 0) return;

    if (currentAiStep < aiGenerateItems.length) {
      const timer = setTimeout(() => {
        setCurrentAiStep((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        const newId = createInterview({
          jobId: selectedJobId || undefined,
          company: currentJob?.company || '待填写公司',
          role: currentJob?.role || '待填写岗位',
          roundNumber,
          roundName,
          roundType,
          time: interviewTime,
          format: interviewFormat,
          interviewer,
          supplementNotes
        });
        clearInterviewDraft();
        showToast({
          type: 'success',
          title: '面试准备已创建',
          message: 'AI 正在为你生成个性化准备方案...'
        });
        navigateTo('interview_prep_workspace', {
          jobId: selectedJobId || undefined,
          interviewId: newId
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, currentAiStep]);

  // Render step content
  const renderStepContent = () => {
    // Step 0: Job selection
    if (step === 0) {
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#202421' }}>
              选择要为哪个岗位新建面试准备
            </h3>
          </div>

          {/* Job list */}
          <div className="space-y-2">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => {
                  setSelectedJobId(job.id);
                  setShowNewJobForm(false);
                }}
                className="p-3.5 rounded-[10px] flex items-center justify-between cursor-pointer transition-all"
                style={{
                  border: selectedJobId === job.id ? '1.5px solid #3E6256' : '1.5px solid #E4E5E0',
                  background: selectedJobId === job.id ? '#F5FAF7' : '#FFFFFF'
                }}
              >
                <div>
                  <div className="text-[14px] font-semibold" style={{ color: '#202421' }}>
                    {job.company} · {job.role}
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: '#A8ADA8' }}>
                    {job.currentStage || '待处理'}
                  </div>
                </div>
                {selectedJobId === job.id && (
                  <CheckCircle2 className="w-[18px] h-[18px]" style={{ color: '#3E6256' }} />
                )}
              </div>
            ))}

            {/* New job button/form */}
            {!showNewJobForm ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowNewJobForm(true)}
                  className="flex-1 py-3 px-3.5 rounded-[10px] text-[13px] font-medium transition-all"
                  style={{
                    border: '1px dashed #C8D8D1',
                    background: 'transparent',
                    color: '#3E6256'
                  }}
                >
                  + 新建岗位
                </button>
                <button
                  onClick={handleGoToJDAnalysis}
                  className="py-3 px-4 rounded-[10px] text-[13px] font-medium transition-all"
                  style={{
                    border: '1px solid #3E6256',
                    background: '#FFFFFF',
                    color: '#3E6256'
                  }}
                >
                  去JD分析页面创建
                </button>
              </div>
            ) : (
              <div
                className="p-4 rounded-[10px] space-y-3"
                style={{
                  border: '1.5px solid #3E6256',
                  background: '#F5FAF7'
                }}
              >
                <div className="text-[13px] font-semibold" style={{ color: '#202421' }}>
                  新建岗位
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="公司名称"
                    value={newJobCompany}
                    onChange={(e) => setNewJobCompany(e.target.value)}
                    className="px-3 py-2 text-[13.5px] rounded-lg outline-none"
                    style={{
                      border: '1px solid #E4E5E0',
                      background: '#FFFFFF',
                      color: '#202421'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="岗位名称"
                    value={newJobRole}
                    onChange={(e) => setNewJobRole(e.target.value)}
                    className="px-3 py-2 text-[13.5px] rounded-lg outline-none"
                    style={{
                      border: '1px solid #E4E5E0',
                      background: '#FFFFFF',
                      color: '#202421'
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowNewJobForm(false);
                      setNewJobCompany('');
                      setNewJobRole('');
                    }}
                    className="flex-1 py-2 text-[13px] rounded-lg transition-all"
                    style={{
                      border: '1px solid #E4E5E0',
                      background: '#FFFFFF',
                      color: '#737873'
                    }}
                  >
                    取消
                  </button>
                  <button
                    onClick={handleCreateJob}
                    className="flex-1 py-2 text-[13px] font-medium rounded-lg transition-all"
                    style={{
                      background: '#3E6256',
                      color: '#FFFFFF'
                    }}
                  >
                    创建
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Step 1: Application info
    if (step === 1) {
      return (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#202421' }}>
              确认此次面试使用的简历及投递附言
            </h3>
          </div>

          {/* Job display */}
          <div>
            <label
              className="block text-[12.5px] font-medium mb-[5px]"
              style={{ color: '#737873' }}
            >
              关联岗位
            </label>
            <div
              className="px-3 py-2.5 rounded-lg text-[13.5px] font-medium"
              style={{
                background: '#F5FAF7',
                border: '1px solid #C8D8D1',
                color: '#3E6256'
              }}
            >
              {currentJob?.company || '待填写公司'} · {currentJob?.role || '待填写岗位'}
            </div>
          </div>

          {/* Resume version */}
          <div>
            <label
              className="block text-[12.5px] font-medium mb-2"
              style={{ color: '#737873' }}
            >
              简历版本
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setResumeVersion('ai')}
                className="flex-1 py-2.5 px-4 rounded-lg text-[13px] transition-all"
                style={{
                  border: resumeVersion === 'ai' ? '1px solid #3E6256' : '1px solid #E4E5E0',
                  background: resumeVersion === 'ai' ? '#E5EEE9' : '#FFFFFF',
                  color: resumeVersion === 'ai' ? '#3E6256' : '#737873',
                  fontWeight: resumeVersion === 'ai' ? 500 : 400
                }}
              >
                AI定制版
              </button>
              <button
                type="button"
                onClick={() => setResumeVersion('general')}
                className="flex-1 py-2.5 px-4 rounded-lg text-[13px] transition-all"
                style={{
                  border: resumeVersion === 'general' ? '1px solid #3E6256' : '1px solid #E4E5E0',
                  background: resumeVersion === 'general' ? '#E5EEE9' : '#FFFFFF',
                  color: resumeVersion === 'general' ? '#3E6256' : '#737873',
                  fontWeight: resumeVersion === 'general' ? 500 : 400
                }}
              >
                通用版
              </button>
            </div>
          </div>

          {/* Cover letter */}
          <div>
            <label
              className="block text-[12.5px] font-medium mb-[5px]"
              style={{ color: '#737873' }}
            >
              投递附言（可选）
            </label>
            <textarea
              rows={4}
              placeholder="可以填写投递时的补充信息或自我介绍..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full px-3 py-2.5 text-[13.5px] rounded-lg outline-none resize-none"
              style={{
                border: '1px solid #E4E5E0',
                background: '#FFFFFF',
                color: '#202421',
                lineHeight: 1.6
              }}
            />
          </div>
        </div>
      );
    }

    // Step 2: Interview details
    if (step === 2) {
      return (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#202421' }}>
              填写本场面试的基本信息，AI 将据此生成准备方案
            </h3>
          </div>

          {/* Grid 1 */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label
                className="block text-[12.5px] font-medium mb-[5px]"
                style={{ color: '#737873' }}
              >
                面试轮次
              </label>
              <select
                value={roundNumber}
                onChange={(e) => {
                  const rNum = parseInt(e.target.value);
                  setRoundNumber(rNum);
                  setRoundName(
                    `第${rNum}面 · ${rNum === 1 ? '业务面' : rNum === 2 ? '技术/架构面' : rNum === 3 ? '总监面' : '终面'}`
                  );
                }}
                className="w-full px-3 py-[9px] text-[13.5px] rounded-lg outline-none"
                style={{
                  border: '1px solid #E4E5E0',
                  background: '#FFFFFF',
                  color: '#202421'
                }}
              >
                <option value={1}>第1面</option>
                <option value={2}>第2面</option>
                <option value={3}>第3面</option>
                <option value={4}>HR面</option>
                <option value={5}>终面</option>
              </select>
            </div>
            <div>
              <label
                className="block text-[12.5px] font-medium mb-[5px]"
                style={{ color: '#737873' }}
              >
                面试类型
              </label>
              <select
                value={roundType}
                onChange={(e) => setRoundType(e.target.value as InterviewRoundType)}
                className="w-full px-3 py-[9px] text-[13.5px] rounded-lg outline-none"
                style={{
                  border: '1px solid #E4E5E0',
                  background: '#FFFFFF',
                  color: '#202421'
                }}
              >
                <option value="business">业务面</option>
                <option value="tech">技术面</option>
                <option value="hr">HR面</option>
                <option value="product">产品面</option>
                <option value="comprehensive">总监面/终面</option>
              </select>
            </div>
          </div>

          {/* Grid 2 */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label
                className="block text-[12.5px] font-medium mb-[5px]"
                style={{ color: '#737873' }}
              >
                面试日期
              </label>
              <input
                type="date"
                value={interviewTime.split(' ')[0] || '2026-09-02'}
                onChange={(e) =>
                  setInterviewTime(`${e.target.value} ${interviewTime.split(' ')[1] || '14:00'}`)
                }
                className="w-full px-3 py-[9px] text-[13.5px] rounded-lg outline-none"
                style={{
                  border: '1px solid #E4E5E0',
                  background: '#FFFFFF',
                  color: '#202421'
                }}
              />
            </div>
            <div>
              <label
                className="block text-[12.5px] font-medium mb-[5px]"
                style={{ color: '#737873' }}
              >
                面试时间
              </label>
              <input
                type="time"
                value={interviewTime.split(' ')[1] || '14:00'}
                onChange={(e) =>
                  setInterviewTime(`${interviewTime.split(' ')[0] || '2026-09-02'} ${e.target.value}`)
                }
                className="w-full px-3 py-[9px] text-[13.5px] rounded-lg outline-none"
                style={{
                  border: '1px solid #E4E5E0',
                  background: '#FFFFFF',
                  color: '#202421'
                }}
              />
            </div>
          </div>

          {/* Grid 3 */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label
                className="block text-[12.5px] font-medium mb-[5px]"
                style={{ color: '#737873' }}
              >
                面试形式
              </label>
              <select
                value={interviewFormat}
                onChange={(e) => setInterviewFormat(e.target.value as InterviewFormat)}
                className="w-full px-3 py-[9px] text-[13.5px] rounded-lg outline-none"
                style={{
                  border: '1px solid #E4E5E0',
                  background: '#FFFFFF',
                  color: '#202421'
                }}
              >
                <option value="video">视频面试</option>
                <option value="phone">电话面试</option>
                <option value="onsite">现场面试</option>
                <option value="written">笔试</option>
              </select>
            </div>
            <div>
              <label
                className="block text-[12.5px] font-medium mb-[5px]"
                style={{ color: '#737873' }}
              >
                平台（可选）
              </label>
              <input
                type="text"
                placeholder="如 Zoom, Teams, 牛客..."
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-[9px] text-[13.5px] rounded-lg outline-none"
                style={{
                  border: '1px solid #E4E5E0',
                  background: '#FFFFFF',
                  color: '#202421'
                }}
              />
            </div>
          </div>

          {/* Interviewer */}
          <div>
            <label
              className="block text-[12.5px] font-medium mb-[5px]"
              style={{ color: '#737873' }}
            >
              面试官信息（可选）
            </label>
            <input
              type="text"
              placeholder="如：技术总监、产品 lead…"
              value={interviewer}
              onChange={(e) => setInterviewer(e.target.value)}
              className="w-full px-3 py-[9px] text-[13.5px] rounded-lg outline-none"
              style={{
                border: '1px solid #E4E5E0',
                background: '#FFFFFF',
                color: '#202421'
              }}
            />
          </div>
        </div>
      );
    }

    // Step 3: Additional info
    if (step === 3) {
      return (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#202421' }}>
              补充额外背景信息，AI 将生成更精准的准备方案
            </h3>
          </div>

          {/* Supplement notes */}
          <div>
            <label
              className="block text-[12.5px] font-medium mb-[5px]"
              style={{ color: '#737873' }}
            >
              补充说明（可选）
            </label>
            <textarea
              rows={5}
              placeholder="例如：特别关注哪方面的准备？有哪些已知信息？"
              value={supplementNotes}
              onChange={(e) => setSupplementNotes(e.target.value)}
              className="w-full px-3 py-2.5 text-[13.5px] rounded-lg outline-none resize-none"
              style={{
                border: '1px solid #E4E5E0',
                background: '#FFFFFF',
                color: '#202421',
                lineHeight: 1.6
              }}
            />
          </div>

          {/* Checkbox */}
          <label
            className="flex items-center gap-2.5 p-3.5 rounded-lg cursor-pointer"
            style={{ background: '#FAFAF8', border: '1px solid #E4E5E0' }}
          >
            <input
              type="checkbox"
              checked={remindUpload}
              onChange={(e) => setRemindUpload(e.target.checked)}
              className="w-3.5 h-3.5"
              style={{ accentColor: '#3E6256' }}
            />
            <span className="text-[13.5px]" style={{ color: '#202421' }}>
              面试结束后提醒我上传录音，用于复盘分析
            </span>
          </label>

          {/* AI Preview */}
          <div
            className="rounded-[10px]"
            style={{
              background: '#F5FAF7',
              border: '1px solid #C8D8D1',
              padding: '14px 16px'
            }}
          >
            <div
              className="text-[12px] font-semibold mb-2"
              style={{ color: '#3E6256' }}
            >
              AI 将为你生成：
            </div>
            <div className="space-y-1">
              {aiGenerateItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: '#3E6256' }}
                  />
                  <span className="text-[12.5px]" style={{ color: '#4A6559' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Loading Animation */}
          {isGenerating && currentAiStep >= 0 && (
            <div
              className="rounded-[10px]"
              style={{
                background: '#F5FAF7',
                border: '1px solid #C8D8D1',
                padding: '14px 16px'
              }}
            >
              <div
                className="text-[12px] font-semibold mb-3 flex items-center gap-1.5"
                style={{ color: '#3E6256' }}
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                AI 正在为你生成...
              </div>
              <div className="space-y-2">
                {aiGenerateItems.map((item, i) => (
                  <div key={item} className="flex items-center gap-2 text-[12.5px]">
                    {i < currentAiStep ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: '#3E6256' }} />
                    ) : i === currentAiStep ? (
                      <Loader2 className="w-3.5 h-3.5 shrink-0 animate-spin" style={{ color: '#3E6256' }} />
                    ) : (
                      <div
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ border: '1.5px solid #D0D2CB' }}
                      />
                    )}
                    <span style={{ color: i <= currentAiStep ? '#202421' : '#A8ADA8' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-full" style={{ background: '#F5F5F2' }}>
      <div className="max-w-[680px] mx-auto px-8 pt-8 pb-16">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm mb-6 transition-colors"
          style={{ color: '#737873' }}
        >
          <ArrowLeft className="w-[13px] h-[13px]" />
          <span>{step === 0 ? '返回面试准备' : '上一步'}</span>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-2xl font-bold"
            style={{
              color: '#202421',
              letterSpacing: '-0.4px'
            }}
          >
            新建面试
          </h1>
          <p className="text-[13.5px] mt-1" style={{ color: '#737873' }}>
            填写面试信息，AI 将生成个性化准备方案
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-7">
          {steps.map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-semibold"
                  style={{
                    background:
                      step > s.num ? '#3E6256' : step === s.num ? '#202421' : '#F0F0EC',
                    color: step >= s.num ? '#FFFFFF' : '#A8ADA8'
                  }}
                >
                  {step > s.num ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    s.num + 1
                  )}
                </div>
                <span
                  className="text-[11px] mt-1.5 whitespace-nowrap"
                  style={{
                    color: step === s.num ? '#202421' : '#A8ADA8',
                    fontWeight: step === s.num ? 600 : 400
                  }}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 mx-2"
                  style={{
                    height: '1.5px',
                    marginTop: '16px',
                    background: step > s.num ? '#3E6256' : '#E4E5E0'
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form card */}
        <div
          className="rounded-[14px]"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E4E5E0',
            padding: '24px'
          }}
        >
          {/* Card header */}
          <div
            className="pb-4 mb-5"
            style={{ borderBottom: '1px solid #F5F5F2' }}
          >
            <h3
              className="text-[14px] font-semibold"
              style={{ color: '#202421' }}
            >
              步骤 {step + 1}：{steps[step]?.label}
            </h3>
          </div>

          {/* Card content */}
          {renderStepContent()}
        </div>

        {/* Footer */}
        {!isGenerating && (
          <div className="flex items-center justify-between mt-5">
            <span className="text-[12px]" style={{ color: '#A8ADA8' }}>
              第 {step + 1} 步 / 共 4 步
            </span>

            <div className="flex items-center gap-3">
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={!canNext()}
                  className="flex items-center gap-2 px-5 py-2.5 text-[13.5px] font-medium rounded-lg transition-all"
                  style={{
                    background: canNext() ? '#3E6256' : '#D0D2CB',
                    color: '#FFFFFF',
                    cursor: canNext() ? 'pointer' : 'not-allowed'
                  }}
                >
                  下一步
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="flex items-center gap-2 px-5 py-2.5 text-[13.5px] font-semibold rounded-lg transition-all"
                  style={{
                    background: '#3E6256',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  创建面试并生成准备方案
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
