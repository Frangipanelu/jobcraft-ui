import React, { useState, useEffect } from 'react';
import { useJobCraft } from '../context/JobCraftContext';
import { InterviewRoundType } from '../types/jobcraft';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Upload,
  FileText,
  Loader2
} from 'lucide-react';

const steps = [
  { num: 0, label: '关联面试' },
  { num: 1, label: '面试信息' },
  { num: 2, label: '上传记录' }
];

const analysisSteps = [
  '识别文档',
  '提取问答',
  '分析面试官意图',
  '分析回答',
  '生成建议'
];

export const CreateReview: React.FC = () => {
  const {
    jobs,
    interviews,
    addInterviewReview,
    createReviewFromTranscript,
    createJob,
    createJDAnalysis,
    navigateTo,
    showToast
  } = useJobCraft();

  const [step, setStep] = useState<0 | 1 | 2>(0);

  // Step 0 - Job selection
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [noJobLink, setNoJobLink] = useState(false);

  // Step 1 - Interview selection
  const [selectedInterviewId, setSelectedInterviewId] = useState<string>('');
  const [newInterviewMode, setNewInterviewMode] = useState(false);
  const [manualForm, setManualForm] = useState({
    company: '',
    role: '',
    roundNumber: 2,
    roundType: 'tech' as InterviewRoundType,
    date: '2026-09-01',
    time: '14:00'
  });

  // Step 2 - Upload
  const [uploadMode, setUploadMode] = useState<'file' | 'paste'>('paste');
  const [pasteText, setPasteText] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeStep, setAnalyzeStep] = useState(-1);

  const selectedJob = jobs.find((j) => j.id === selectedJobId);
  const jobInterviews = selectedJobId
    ? interviews.filter((i) => i.jobId === selectedJobId)
    : [];
  const selectedInterview = interviews.find((i) => i.id === selectedInterviewId);

  // Can proceed
  const canNext = () => {
    if (step === 0) {
      return selectedJobId || noJobLink;
    }
    if (step === 1) {
      if (noJobLink) return true;
      if (newInterviewMode) return true;
      return !!selectedInterviewId;
    }
    return true;
  };

  // Handle back
  const handleBack = () => {
    if (step === 0) {
      navigateTo('interview_review_center');
    } else {
      setStep((s) => (s - 1) as 0 | 1 | 2);
    }
  };

  // Handle next
  const handleNext = () => {
    if (step < 2) {
      setStep((s) => (s + 1) as 0 | 1 | 2);
    }
  };

  // Handle start analysis
  const handleStartAnalysis = () => {
    if (!pasteText.trim()) return;
    setIsAnalyzing(true);
    setAnalyzeStep(0);
  };

  // Analysis animation
  useEffect(() => {
    if (!isAnalyzing || analyzeStep < 0) return;

    if (analyzeStep < analysisSteps.length) {
      const timer = setTimeout(() => {
        setAnalyzeStep((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        if (selectedInterviewId) {
          createReviewFromTranscript({
            interviewId: selectedInterviewId,
            transcript: pasteText
          });
          navigateTo('interview_review_detail', { interviewId: selectedInterviewId });
        } else {
          addInterviewReview(interviews[0]?.id || 'int-byte-1', {
            overallScore: 88,
            passProbability: '通过概率较高',
            highlights: ['回答逻辑清晰，量化数据充分'],
            drawbacks: ['可补充更多技术深度细节']
          });
          navigateTo('interview_review_center');
        }
        showToast({ type: 'success', title: '智能复盘报告已生成' });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, analyzeStep]);

  // Render step content
  const renderStepContent = () => {
    // Step 0: Link interview
    if (step === 0) {
      return (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#202421' }}>
              先告诉我们这场复盘属于哪个岗位，AI 会自动关联你的 JD、简历和面试准备数据。
            </h3>
          </div>

          {!noJobLink && (
            <>
              <div>
                <div className="text-[13px] font-medium mb-3" style={{ color: '#737873' }}>
                  关联已有岗位
                </div>
                <div className="space-y-2">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setSelectedInterviewId('');
                        setNewInterviewMode(false);
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
                          已有 {job.interviewIds.length} 场面试记录
                        </div>
                      </div>
                      {selectedJobId === job.id && (
                        <CheckCircle2 className="w-[18px] h-[18px]" style={{ color: '#3E6256' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: '1px', background: '#F0F0EC' }} />
            </>
          )}

          {/* No job link option */}
          <label
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setNoJobLink(true);
              setSelectedJobId('');
              setSelectedInterviewId('');
              setNewInterviewMode(false);
            }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                border: noJobLink ? '2px solid #3E6256' : '2px solid #D0D2CB'
              }}
            >
              {noJobLink && (
                <div
                  className="w-[7px] h-[7px] rounded-full"
                  style={{ background: '#3E6256' }}
                />
              )}
            </div>
            <span
              className="text-[13.5px]"
              style={{
                color: noJobLink ? '#3E6256' : '#737873',
                fontWeight: noJobLink ? 500 : 400
              }}
            >
              暂不关联岗位
            </span>
          </label>
        </div>
      );
    }

    // Step 1: Interview info
    if (step === 1) {
      // Scene A: Has job and interviews
      if (selectedJobId && jobInterviews.length > 0 && !newInterviewMode) {
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: '#202421' }}>
                选择这场复盘对应哪一次面试
              </h3>
            </div>

            <div className="space-y-2">
              {jobInterviews.map((int) => (
                <div
                  key={int.id}
                  onClick={() => setSelectedInterviewId(int.id)}
                  className="p-3.5 rounded-[10px] flex items-center justify-between cursor-pointer transition-all"
                  style={{
                    border: selectedInterviewId === int.id ? '1.5px solid #3E6256' : '1.5px solid #E4E5E0',
                    background: selectedInterviewId === int.id ? '#F5FAF7' : '#FFFFFF'
                  }}
                >
                  <div>
                    <div className="text-[13.5px] font-semibold" style={{ color: '#202421' }}>
                      {int.roundName} · {int.roundType === 'tech' ? '技术面' : '业务面'}
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: '#A8ADA8' }}>
                      {int.time}
                    </div>
                  </div>
                  {selectedInterviewId === int.id && (
                    <CheckCircle2 className="w-[18px] h-[18px]" style={{ color: '#3E6256' }} />
                  )}
                </div>
              ))}
            </div>

            <div style={{ height: '1px', background: '#F0F0EC' }} />

            <button
              onClick={() => setNewInterviewMode(true)}
              className="w-full py-3 px-3.5 rounded-[10px] text-[13px] font-medium transition-all"
              style={{
                border: '1px dashed #C8D8D1',
                background: 'transparent',
                color: '#3E6256'
              }}
            >
              + 新建一场面试记录
            </button>
          </div>
        );
      }

      // Scene B: No job / new mode / no interviews
      return (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#202421' }}>
              {noJobLink ? '请手动填写这场面试的基本信息' : '新建面试记录'}
            </h3>
          </div>

          {/* Company and role (only when no job) */}
          {noJobLink && (
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label
                  className="block text-[12.5px] font-medium mb-[5px]"
                  style={{ color: '#737873' }}
                >
                  公司
                </label>
                <input
                  type="text"
                  placeholder="例如：字节跳动"
                  value={manualForm.company}
                  onChange={(e) => setManualForm({ ...manualForm, company: e.target.value })}
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
                  岗位
                </label>
                <input
                  type="text"
                  placeholder="例如：AI PM"
                  value={manualForm.role}
                  onChange={(e) => setManualForm({ ...manualForm, role: e.target.value })}
                  className="w-full px-3 py-[9px] text-[13.5px] rounded-lg outline-none"
                  style={{
                    border: '1px solid #E4E5E0',
                    background: '#FFFFFF',
                    color: '#202421'
                  }}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label
                className="block text-[12.5px] font-medium mb-[5px]"
                style={{ color: '#737873' }}
              >
                第几面
              </label>
              <select
                value={manualForm.roundNumber}
                onChange={(e) => setManualForm({ ...manualForm, roundNumber: parseInt(e.target.value) })}
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
                value={manualForm.roundType}
                onChange={(e) => setManualForm({ ...manualForm, roundType: e.target.value as InterviewRoundType })}
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
                <option value="comprehensive">综合面</option>
              </select>
            </div>
          </div>

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
                value={manualForm.date}
                onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
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
                value={manualForm.time}
                onChange={(e) => setManualForm({ ...manualForm, time: e.target.value })}
                className="w-full px-3 py-[9px] text-[13.5px] rounded-lg outline-none"
                style={{
                  border: '1px solid #E4E5E0',
                  background: '#FFFFFF',
                  color: '#202421'
                }}
              />
            </div>
          </div>

          {newInterviewMode && !noJobLink && (
            <button
              onClick={() => {
                setNewInterviewMode(false);
                setSelectedInterviewId('');
              }}
              className="text-[13px] font-medium"
              style={{ color: '#3E6256' }}
            >
              ← 返回选择已有面试
            </button>
          )}
        </div>
      );
    }

    // Step 2: Upload record
    if (step === 2) {
      return (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#202421' }}>
              上传包含「面试官问题 + 你的回答」的面试记录，AI 会自动识别 QA 对并分析本场面试。
            </h3>
          </div>

          {/* Upload mode switch */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setUploadMode('file')}
              className="px-4 py-2.5 rounded-lg text-[13px] font-medium flex items-center gap-2 transition-all"
              style={{
                border: uploadMode === 'file' ? '1px solid #3E6256' : '1px solid #E4E5E0',
                background: uploadMode === 'file' ? '#E5EEE9' : '#FFFFFF',
                color: uploadMode === 'file' ? '#3E6256' : '#737873'
              }}
            >
              <Upload className="w-4 h-4" />
              上传文件
            </button>
            <button
              type="button"
              onClick={() => setUploadMode('paste')}
              className="px-4 py-2.5 rounded-lg text-[13px] font-medium flex items-center gap-2 transition-all"
              style={{
                border: uploadMode === 'paste' ? '1px solid #3E6256' : '1px solid #E4E5E0',
                background: uploadMode === 'paste' ? '#E5EEE9' : '#FFFFFF',
                color: uploadMode === 'paste' ? '#3E6256' : '#737873'
              }}
            >
              <FileText className="w-4 h-4" />
              粘贴文本
            </button>
          </div>

          {uploadMode === 'file' ? (
            <div
              className="rounded-xl text-center transition-all"
              style={{
                border: isDragOver ? '2px dashed #3E6256' : '2px dashed #D0D2CB',
                background: isDragOver ? '#F5FAF7' : '#FAFAF8',
                padding: '36px 20px'
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
              }}
            >
              <div className="text-[32px] mb-2">📄</div>
              <div className="text-[14px] font-semibold mb-1" style={{ color: '#202421' }}>
                拖入面试记录文件
              </div>
              <div className="text-[12.5px] mb-3" style={{ color: '#A8ADA8' }}>
                支持 DOCX / PDF / TXT / Markdown
              </div>
              <button
                type="button"
                className="px-4 py-2 text-[13px] rounded-lg"
                style={{
                  border: '1px solid #C8D8D1',
                  background: '#FFFFFF',
                  color: '#3E6256'
                }}
              >
                浏览文件
              </button>
            </div>
          ) : (
            <div>
              <textarea
                rows={10}
                placeholder={`粘贴面试过程中的核心提问与作答记录...\n\n例如：\n面试官：请介绍一下你在过去负责的最具挑战性的 AI 项目？\n我：我们设计了一套 LLM-as-a-Judge 自动化评测管线...`}
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                className="w-full px-3.5 py-3 text-[13.5px] rounded-[10px] outline-none resize-none"
                style={{
                  border: '1px solid #E4E5E0',
                  background: '#FFFFFF',
                  color: '#202421',
                  lineHeight: 1.65
                }}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-[12px]" style={{ color: '#A8ADA8' }}>
                  记录越完整，分析越准确
                </span>
                <span className="text-[12px]" style={{ color: '#A8ADA8' }}>
                  {pasteText.length} 字
                </span>
              </div>
            </div>
          )}

          {/* AI preview */}
          <div
            className="rounded-[9px]"
            style={{
              background: '#F5FAF7',
              border: '1px solid #C8D8D1',
              padding: '12px 14px'
            }}
          >
            <div
              className="text-[12px] font-semibold mb-2"
              style={{ color: '#3E6256' }}
            >
              AI 分析将包含
            </div>
            <div className="flex flex-wrap gap-3">
              {['QA 对识别', '面试官意图', '回答完整度', '问题识别', '改进建议'].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#3E6256' }} />
                  <span className="text-[12px]" style={{ color: '#4A6559' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Analysis animation
  const renderAnalysis = () => (
    <div className="py-8 text-center space-y-8">
      <div>
        <div className="text-base font-semibold mb-2" style={{ color: '#202421' }}>
          正在分析你的面试记录…
        </div>
        <div className="text-[13px]" style={{ color: '#A8ADA8' }}>
          预计需要 30 秒
        </div>
      </div>

      <div className="space-y-4 max-w-[280px] mx-auto">
        {analysisSteps.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            {i < analyzeStep ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: '#3E6256' }} />
            ) : i === analyzeStep ? (
              <div
                className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                style={{
                  background: '#3E6256',
                  boxShadow: '0 0 0 4px #E5EEE9'
                }}
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            ) : (
              <div
                className="w-5 h-5 rounded-full shrink-0"
                style={{ border: '1.5px solid #D0D2CB' }}
              />
            )}
            <span
              className="text-[14px]"
              style={{
                color: i <= analyzeStep ? '#202421' : '#A8ADA8',
                fontWeight: i === analyzeStep ? 600 : 400
              }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-full" style={{ background: '#F5F5F2' }}>
      <div className="max-w-[620px] mx-auto px-8 pt-8 pb-16">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm mb-6 transition-colors"
          style={{ color: '#737873' }}
        >
          <ArrowLeft className="w-[13px] h-[13px]" />
          <span>{step === 0 ? '返回面试复盘' : '上一步'}</span>
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
            新建面试复盘
          </h1>
          <p className="text-[13.5px] mt-1" style={{ color: '#737873' }}>
            复盘每一次真实面试，让下一次回答更好。
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
          {isAnalyzing ? (
            renderAnalysis()
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Footer */}
        {!isAnalyzing && (
          <div className="flex items-center justify-between mt-5">
            <span className="text-[12px]" style={{ color: '#A8ADA8' }}>
              第 {step + 1} 步 / 共 3 步
            </span>

            <div className="flex items-center gap-3">
              {step < 2 ? (
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
                  onClick={handleStartAnalysis}
                  disabled={!pasteText.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 text-[13.5px] font-semibold rounded-lg transition-all"
                  style={{
                    background: pasteText.trim() ? '#3E6256' : '#D0D2CB',
                    color: '#FFFFFF',
                    cursor: pasteText.trim() ? 'pointer' : 'not-allowed'
                  }}
                >
                  开始分析
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
