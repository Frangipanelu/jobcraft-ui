import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  NavigationTab,
  UserProfile,
  Experience,
  Job,
  JDAnalysis,
  ResumeVersion,
  Interview,
  InterviewReview,
  ActivityLog,
  NextActionItem,
  AISuggestionCard,
  PreparedAnswer,
  InterviewPreparation,
  HistoricalResume
} from '../types/jobcraft';
import {
  initialUser,
  initialExperiences,
  initialJobs,
  initialJDAnalyses,
  initialResumeVersion,
  initialInterviews,
  initialNextActions,
  initialActivities,
  initialAISuggestions,
  initialHistoricalResumes
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface JobCraftContextType {
  // Navigation
  currentTab: NavigationTab;
  selectedJobId: string | null;
  selectedInterviewId: string | null;
  selectedJDId: string | null;
  selectedExperienceId: string | null;
  jobWorkspaceSubTab: 'jd' | 'resume' | 'interview';
  userProfileTab: 'resumes' | 'profile' | 'preferences' | 'settings';
  setUserProfileTab: (tab: 'resumes' | 'profile' | 'preferences' | 'settings') => void;
  navigateTo: (
    tab: NavigationTab,
    params?: {
      jobId?: string;
      interviewId?: string;
      jdId?: string;
      expId?: string;
      workspaceTab?: 'jd' | 'resume' | 'interview';
      profileTab?: 'resumes' | 'profile' | 'preferences' | 'settings';
    }
  ) => void;

  // Data
  user: UserProfile;
  jobs: Job[];
  experiences: Experience[];
  jdAnalyses: JDAnalysis[];
  resumes: Record<string, ResumeVersion>;
  interviews: Interview[];
  nextActions: NextActionItem[];
  activities: ActivityLog[];
  aiSuggestions: AISuggestionCard[];
  historicalResumes: HistoricalResume[];
  toasts: ToastMessage[];

  // Actions
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  
  // Historical Resumes actions
  addHistoricalResume: (resume: Omit<HistoricalResume, 'id' | 'uploadDate'>) => void;
  deleteHistoricalResume: (id: string) => void;
  setDefaultHistoricalResume: (id: string) => void;
  
  // Job actions
  createJob: (jobData: { company: string; role: string; department?: string; salaryRange?: string; status?: Job['status'] }) => string;
  updateJobStatus: (jobId: string, status: Job['status']) => void;
  deleteJob: (jobId: string) => void;

  // JD Analysis actions
  createJDAnalysis: (data: { company: string; role: string; rawText: string; jobId?: string }) => string;
  deleteJDAnalysis: (id: string) => void;

  // Resume actions
  applyResumeAISuggestion: (suggestionId: string) => void;
  rejectResumeAISuggestion: (suggestionId: string) => void;
  applyAllResumeAISuggestions: () => void;
  updateResumeBulletText: (sectionId: string, itemId: string, bulletId: string, newText: string) => void;
  addResumeBullet: (sectionId: string, itemId: string, text: string, experienceId?: string) => void;
  deleteResumeBullet: (sectionId: string, itemId: string, bulletId: string) => void;

  // Interview actions
  createInterview: (data: {
    jobId?: string;
    company: string;
    role: string;
    roundNumber: number;
    roundName: string;
    roundType: Interview['roundType'];
    time: string;
    format: Interview['format'];
    interviewer?: string;
    supplementNotes?: string;
  }) => string;
  updateQuestionAnswer: (interviewId: string, questionId: string, answer: Partial<PreparedAnswer>, isPrepared?: boolean) => void;
  addCustomQuestion: (interviewId: string, questionText: string, focusText: string) => void;

  // Review & Experience Feedback actions
  addInterviewReview: (
    interviewId: string,
    customReview?: Partial<InterviewReview>
  ) => void;
  applyReviewFeedback: (interviewId: string, feedbackIndex: number) => void;
  syncReviewToExperience: (experienceId: string, feedbackText: string) => void;
  createReviewFromTranscript: (data: {
    interviewId: string;
    transcript: string;
  }) => void;
  commitExperienceDiff: (
    experienceId: string,
    proposedVersion: string,
    proposedChanges: { field: string; from: string; to: string }[]
  ) => void;

  // Experience Library actions
  createExperience: (exp: Partial<Experience>) => string;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addExperienceVersion: (
    expId: string,
    version: string,
    reason: string,
    updatedFields: Partial<Experience>
  ) => void;
}

const JobCraftContext = createContext<JobCraftContextType | undefined>(undefined);

export const JobCraftProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('workbench');
  const [selectedJobId, setSelectedJobId] = useState<string | null>('job-1');
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>('int-byte-2');
  const [selectedJDId, setSelectedJDId] = useState<string | null>('jd-byte-1');
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>('exp-1');
  const [jobWorkspaceSubTab, setJobWorkspaceSubTab] = useState<'jd' | 'resume' | 'interview'>('jd');
  const [userProfileTab, setUserProfileTab] = useState<'resumes' | 'profile' | 'preferences' | 'settings'>('resumes');

  const [user, setUser] = useState<UserProfile>(initialUser);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [jdAnalyses, setJdAnalyses] = useState<JDAnalysis[]>(initialJDAnalyses);
  const [resumes, setResumes] = useState<Record<string, ResumeVersion>>({
    'res-byte-1': initialResumeVersion
  });
  const [interviews, setInterviews] = useState<Interview[]>(initialInterviews);
  const [nextActions, setNextActions] = useState<NextActionItem[]>(initialNextActions);
  const [activities, setActivities] = useState<ActivityLog[]>(initialActivities);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestionCard[]>(initialAISuggestions);
  const [historicalResumes, setHistoricalResumes] = useState<HistoricalResume[]>(initialHistoricalResumes);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast({
      type: 'success',
      title: '个人资料已更新',
      message: '个人求职信息与偏好设置已成功保存。'
    });
  };

  const addHistoricalResume = (resumeData: Omit<HistoricalResume, 'id' | 'uploadDate'>) => {
    const newResume: HistoricalResume = {
      ...resumeData,
      id: 'hr-' + Date.now(),
      uploadDate: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setHistoricalResumes((prev) => [newResume, ...prev]);
    showToast({
      type: 'success',
      title: '简历上传并解析成功',
      message: `已解析「${resumeData.name}」，沉淀 ${resumeData.parsedExperiencesCount} 条核心经历。`
    });

    setActivities((prev) => [
      {
        id: 'act-' + Date.now(),
        type: 'resume',
        title: `上传并解析了历史简历：${resumeData.name}`,
        desc: `已提取 ${resumeData.parsedExperiencesCount} 项 STAR 经历沉淀至经历资产库`,
        timestamp: '刚刚',
        actionText: '查看经历'
      },
      ...prev
    ]);
  };

  const deleteHistoricalResume = (id: string) => {
    const target = historicalResumes.find((r) => r.id === id);
    setHistoricalResumes((prev) => prev.filter((r) => r.id !== id));
    showToast({
      type: 'info',
      title: '历史简历已删除',
      message: target ? `已移除「${target.name}」` : '简历已删除。'
    });
  };

  const setDefaultHistoricalResume = (id: string) => {
    setHistoricalResumes((prev) =>
      prev.map((r) => ({
        ...r,
        isDefault: r.id === id
      }))
    );
    showToast({
      type: 'success',
      title: '默认底座简历已设置',
      message: '后续新建岗位与简历定制将默认优先调用此版本经历。'
    });
  };

  const navigateTo = (
    tab: NavigationTab,
    params?: {
      jobId?: string;
      interviewId?: string;
      jdId?: string;
      expId?: string;
      workspaceTab?: 'jd' | 'resume' | 'interview';
      profileTab?: 'resumes' | 'profile' | 'preferences' | 'settings';
    }
  ) => {
    if (params?.jobId !== undefined) setSelectedJobId(params.jobId);
    if (params?.interviewId !== undefined) setSelectedInterviewId(params.interviewId);
    if (params?.jdId !== undefined) setSelectedJDId(params.jdId);
    if (params?.expId !== undefined) setSelectedExperienceId(params.expId);
    if (params?.workspaceTab !== undefined) setJobWorkspaceSubTab(params.workspaceTab);
    if (params?.profileTab !== undefined) setUserProfileTab(params.profileTab);
    
    // Auto-sync related items if only jobId is provided
    if (params?.jobId && !params.jdId) {
      const foundJob = jobs.find((j) => j.id === params.jobId);
      if (foundJob?.jdAnalysisId) setSelectedJDId(foundJob.jdAnalysisId);
    }

    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Job CRUD
  const createJob = (jobData: {
    company: string;
    role: string;
    department?: string;
    salaryRange?: string;
    status?: Job['status'];
  }) => {
    const newId = 'job-' + Date.now();
    const newJob: Job = {
      id: newId,
      company: jobData.company,
      role: jobData.role,
      department: jobData.department || '核心业务线',
      salaryRange: jobData.salaryRange || '面议',
      status: jobData.status || 'pending',
      matchScore: 88,
      applyDate: new Date().toISOString().split('T')[0],
      lastUpdated: '刚刚',
      currentStage: '待分析 JD',
      nextAction: '开始进行该岗位的 JD 深度解析',
      steps: {
        jdAnalysis: false,
        expMatched: false,
        customResume: false,
        applied: false,
        prepStage: 'pending',
        reviewStage: 'pending'
      },
      interviewIds: []
    };

    setJobs((prev) => [newJob, ...prev]);
    showToast({
      type: 'success',
      title: '岗位创建成功',
      message: `已添加「${jobData.company} · ${jobData.role}」到您的求职推进中。`
    });

    setActivities((prev) => [
      {
        id: 'act-' + Date.now(),
        type: 'jd',
        title: `新建了岗位申请：${jobData.company} · ${jobData.role}`,
        desc: '已创建岗位工作空间，可开始 JD 分析或简历定制',
        timestamp: '刚刚',
        jobId: newId,
        actionText: '进入岗位',
        targetTab: 'job_workspace'
      },
      ...prev
    ]);

    return newId;
  };

  const updateJobStatus = (jobId: string, status: Job['status']) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          return {
            ...j,
            status,
            lastUpdated: '刚刚',
            steps: {
              ...j.steps,
              applied: status === 'delivered' || status === 'interviewing' || status === 'finished'
            }
          };
        }
        return j;
      })
    );
    showToast({
      type: 'info',
      title: '状态已更新',
      message: `岗位推进状态已切换为「${status === 'interviewing' ? '面试中' : status === 'delivered' ? '已投递' : status === 'finished' ? '已结束' : '待处理'}」。`
    });
  };

  const deleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    showToast({
      type: 'info',
      title: '岗位已移除',
      message: '该岗位及关联信息已移出您的推进列表。'
    });
  };

  // JD Analysis Creation
  const createJDAnalysis = (data: {
    company: string;
    role: string;
    rawText: string;
    jobId?: string;
  }) => {
    const newId = 'jd-' + Date.now();
    let targetJobId = data.jobId;

    if (!targetJobId) {
      // Find or create job
      const existing = jobs.find((j) => j.company === data.company && j.role === data.role);
      if (existing) {
        targetJobId = existing.id;
      }
    }

    const newAnalysis: JDAnalysis = {
      id: newId,
      jobId: targetJobId,
      company: data.company,
      role: data.role,
      salaryRange: '40K–60K · 16薪',
      rawText: data.rawText,
      createdAt: new Date().toISOString().split('T')[0],
      matchScore: Math.floor(86 + Math.random() * 9),
      recommendationStars: 5,
      verdictSummary: '极高价值机会！你的 AI 产品经验与该岗位的核心算法协同、评测基准体系诉求高度重合。',
      whyMatch: '岗位核心考察生成式 AI 的落地质量把控与指标衡量，你的 Eval 体系与 RAG/Agent 经历是坚实的直接证据。',
      keyRisks: '该岗位业务节奏极快，面试中需多展示跨部门拉齐与快速敏捷上线能力。',
      resumeAdvice: [
        '突出核心量化指标：NDCG@5、幻觉率下降、成本优化百分比；',
        '强化与算法团队的深度协作方式，突出从 0 到 1 策略定义能力；',
        '弱化边缘运维事务描述，聚焦核心算法应用产品成果。'
      ],
      coreRequirements: [
        {
          category: '核心职责',
          items: [
            '主导 AI 核心产品功能规划与策略迭代，协同算法建立评测基准；',
            '探索前沿大模型能力与实际业务场景深度结合。'
          ]
        },
        {
          category: '任职资格',
          items: [
            '3年以上 AI/策略产品经验，有深度大模型或搜索推荐落地经历；',
            '极强的数据敏感度与逻辑推演能力。'
          ]
        }
      ],
      atsKeywords: {
        hardSkills: ['AI产品策略', 'LLM评测', 'Prompt工程', 'RAG架构', '数据分析', 'AB测试'],
        softSkills: ['算法深度协作', '从0到1推进', '结构化思考', '自驱力'],
        expKeywords: ['质量基准', '评测管线', '指标增长', 'Bad Case归因'],
        coveragePercent: 91
      },
      subtextAnalysis: [
        {
          id: 'sub-new-1',
          rawJD: '具备跨团队深度协同与技术攻坚能力',
          literalMeaning: '要求沟通好，能推进项目。',
          realEvaluation: '【真实考察】团队算法人员专业度极高，PM 需具备用数据指标说服算法团队的能力，而非被算法牵着走。'
        }
      ],
      skillGaps: [
        {
          id: 'gap-new-1',
          capability: '超大规模并发场景策略',
          userEvidence: '具备千万级调用经验，具备系统性降级意识。',
          requirement: '关注高并发场景下的可用性与降级机制。',
          gap: '轻度差距',
          recommendation: '准备一段关于冷热缓存和容灾降级策略的阐述。'
        }
      ],
      recommendedExperiences: [
        {
          experienceId: 'exp-1',
          matchScore: 96,
          matchingJDReq: 'AI 质量评测体系与自动化管线',
          reason: '核心指标与技术方案完全契合 JD 第一诉求。'
        },
        {
          experienceId: 'exp-2',
          matchScore: 90,
          matchingJDReq: '大模型落地与工程化平台',
          reason: '证明了端到端工具链编排与成本控制能力。'
        }
      ]
    };

    setJdAnalyses((prev) => [newAnalysis, ...prev]);

    // If linked to job, update job steps
    if (targetJobId) {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === targetJobId
            ? {
                ...j,
                jdAnalysisId: newId,
                steps: { ...j.steps, jdAnalysis: true, expMatched: true }
              }
            : j
        )
      );
    }

    showToast({
      type: 'success',
      title: 'JD 分析报告已生成',
      message: `已解析「${data.company} · ${data.role}」，匹配度达 ${newAnalysis.matchScore}%。`
    });

    return newId;
  };

  const deleteJDAnalysis = (id: string) => {
    setJdAnalyses((prev) => prev.filter((a) => a.id !== id));
    showToast({
      type: 'info',
      title: 'JD 分析已删除'
    });
  };

  // Resume Actions
  const applyResumeAISuggestion = (suggestionId: string) => {
    setResumes((prev) => {
      const activeResume = prev['res-byte-1'];
      if (!activeResume) return prev;

      const sug = activeResume.aiSuggestions.find((s) => s.id === suggestionId);
      if (!sug) return prev;

      let updatedSections = [...activeResume.sections];

      if (sug.targetBulletId) {
        updatedSections = updatedSections.map((sec) => ({
          ...sec,
          items: sec.items.map((item) => ({
            ...item,
            bullets: item.bullets.map((b) =>
              b.id === sug.targetBulletId ? { ...b, text: sug.suggestedText } : b
            )
          }))
        }));
      }

      const updatedSuggestions = activeResume.aiSuggestions.map((s) =>
        s.id === suggestionId ? { ...s, applied: true, rejected: false } : s
      );

      return {
        ...prev,
        'res-byte-1': {
          ...activeResume,
          aiSuggestions: updatedSuggestions,
          sections: updatedSections,
          updatedAt: '刚刚'
        }
      };
    });

    showToast({
      type: 'success',
      title: '已应用 AI 优化建议',
      message: '简历内容与 ATS 关键词已实时更新。'
    });
  };

  const rejectResumeAISuggestion = (suggestionId: string) => {
    setResumes((prev) => {
      const activeResume = prev['res-byte-1'];
      if (!activeResume) return prev;

      const updatedSuggestions = activeResume.aiSuggestions.map((s) =>
        s.id === suggestionId ? { ...s, rejected: true, applied: false } : s
      );

      return {
        ...prev,
        'res-byte-1': {
          ...activeResume,
          aiSuggestions: updatedSuggestions
        }
      };
    });

    showToast({
      type: 'info',
      title: '已忽略此建议'
    });
  };

  const applyAllResumeAISuggestions = () => {
    setResumes((prev) => {
      const activeResume = prev['res-byte-1'];
      if (!activeResume) return prev;

      let updatedSections = [...activeResume.sections];

      activeResume.aiSuggestions.forEach((sug) => {
        if (sug.targetBulletId && !sug.rejected) {
          updatedSections = updatedSections.map((sec) => ({
            ...sec,
            items: sec.items.map((item) => ({
              ...item,
              bullets: item.bullets.map((b) =>
                b.id === sug.targetBulletId ? { ...b, text: sug.suggestedText } : b
              )
            }))
          }));
        }
      });

      const updatedSuggestions = activeResume.aiSuggestions.map((s) => ({
        ...s,
        applied: !s.rejected
      }));

      return {
        ...prev,
        'res-byte-1': {
          ...activeResume,
          aiSuggestions: updatedSuggestions,
          sections: updatedSections,
          updatedAt: '刚刚'
        }
      };
    });

    showToast({
      type: 'success',
      title: '已全部应用 AI 优化',
      message: '所有待处理建议已同步至简历正文中。'
    });
  };

  const updateResumeBulletText = (
    sectionId: string,
    itemId: string,
    bulletId: string,
    newText: string
  ) => {
    setResumes((prev) => {
      const activeResume = prev['res-byte-1'];
      if (!activeResume) return prev;

      const updatedSections = activeResume.sections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.map((item) => {
            if (item.id !== itemId) return item;
            return {
              ...item,
              bullets: item.bullets.map((b) => (b.id === bulletId ? { ...b, text: newText } : b))
            };
          })
        };
      });

      return {
        ...prev,
        'res-byte-1': {
          ...activeResume,
          sections: updatedSections,
          updatedAt: '刚刚'
        }
      };
    });
  };

  const addResumeBullet = (
    sectionId: string,
    itemId: string,
    text: string,
    experienceId?: string
  ) => {
    setResumes((prev) => {
      const activeResume = prev['res-byte-1'];
      if (!activeResume) return prev;

      const newBullet = {
        id: 'bullet-' + Date.now(),
        text,
        originalExperienceId: experienceId,
        jdMatchTag: experienceId ? '来源经历资产 · 关联' : '自定义补充'
      };

      const updatedSections = activeResume.sections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.map((item) => {
            if (item.id !== itemId) return item;
            return {
              ...item,
              bullets: [...item.bullets, newBullet]
            };
          })
        };
      });

      return {
        ...prev,
        'res-byte-1': {
          ...activeResume,
          sections: updatedSections,
          updatedAt: '刚刚'
        }
      };
    });

    showToast({
      type: 'success',
      title: '已添加经历要点'
    });
  };

  const deleteResumeBullet = (sectionId: string, itemId: string, bulletId: string) => {
    setResumes((prev) => {
      const activeResume = prev['res-byte-1'];
      if (!activeResume) return prev;

      const updatedSections = activeResume.sections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.map((item) => {
            if (item.id !== itemId) return item;
            return {
              ...item,
              bullets: item.bullets.filter((b) => b.id !== bulletId)
            };
          })
        };
      });

      return {
        ...prev,
        'res-byte-1': {
          ...activeResume,
          sections: updatedSections,
          updatedAt: '刚刚'
        }
      };
    });

    showToast({
      type: 'info',
      title: '已删除该要点'
    });
  };

  // Interview Creation
  const createInterview = (data: {
    jobId?: string;
    company: string;
    role: string;
    roundNumber: number;
    roundName: string;
    roundType: Interview['roundType'];
    time: string;
    format: Interview['format'];
    interviewer?: string;
    supplementNotes?: string;
  }) => {
    const newId = 'int-' + Date.now();
    const newInterview: Interview = {
      id: newId,
      jobId: data.jobId,
      company: data.company,
      role: data.role,
      roundNumber: data.roundNumber,
      roundName: data.roundName,
      roundType: data.roundType,
      time: data.time,
      format: data.format,
      interviewer: data.interviewer || '面试官',
      supplementNotes: data.supplementNotes,
      readinessPercent: 40,
      status: 'preparing',
      preparation: {
        readinessPercent: 40,
        companyResearch: {
          background: `${data.company}核心业务线，关注技术落地与业务增长。`,
          coreBusiness: '大模型与产品业务深度融合。',
          keyProducts: ['核心产品线', '创新 AI 实验室'],
          relevantBusiness: `${data.role}所属业务团队。`,
          recentNews: [`${data.company}持续发力 AI 场景创新与技术基建`],
          aiHiringIntent: `【AI推测】招聘${data.role}，重点考察候选人在${data.roundType === 'tech' ? '算法原理与系统架构' : '业务判断与从0到1推进'}上的真实贡献。`
        },
        aiStrategy: {
          roundTypeDesc: `本场属于${data.roundName}，重点考核实战方法论与应对复杂业务场景的能力。`,
          keyFocusAreas: [
            { name: '专业业务理解', importance: '★★★★★', desc: '考察对实际业务痛点与技术选型的权衡' },
            { name: '项目真实性与量化证据', importance: '★★★★★', desc: '考察过往战绩的量化数据与关键决策' }
          ]
        },
        recommendedExperiences: [
          { experienceId: 'exp-1', recommendScore: 95, proves: ['核心业务能力', '从0到1推进', '数据分析'] },
          { experienceId: 'exp-2', recommendScore: 90, proves: ['技术架构', '协同落地'] }
        ],
        highFreqQuestions: [
          {
            id: 'q-new-1',
            question: `请介绍一下你在过去负责的最具挑战性的 AI 项目，遇到哪些阻碍，如何克服？`,
            probabilityStars: 5,
            evaluationFocus: '项目真实性 / 解决问题能力 / 面对逆境的韧性',
            recommendedExperienceId: 'exp-1',
            isPrepared: false,
            preparedAnswer: {
              mode: 'logic',
              logicFlow: ['业务背景', '核心技术阻碍', '解决方案设计', '最终量化结果'],
              keywords: ['方案选型', '数据驱动', '跨部门协同', '量化成果'],
              aiReference: '以 AI 搜索质量评测项目为例，重点讲从每天 200 条人工评测瓶颈，到设计自动化裁判管线提升至 5 万条吞吐的突破历程……',
              inScript: false
            }
          },
          {
            id: 'q-new-2',
            question: `对于我们公司目前的业务方向，如果你加入，你觉得第一季度最重要的着力点是什么？`,
            probabilityStars: 4,
            evaluationFocus: '业务理解 / 主动思考 / 落地规划',
            recommendedExperienceId: 'exp-2',
            isPrepared: false,
            preparedAnswer: {
              mode: 'logic',
              logicFlow: ['梳理现状指标', '抓核心 Bad Case', '建立敏捷迭代闭环'],
              keywords: ['业务画像', '快速对齐', '快速见效点 Quick Wins'],
              aiReference: '第一月聚焦业务熟悉与核心指标对齐；第二月建立自动化监控与评测基准；第三月推动首个优化方案上线并产出正向增量……',
              inScript: false
            }
          }
        ]
      }
    };

    setInterviews((prev) => [newInterview, ...prev]);

    if (data.jobId) {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === data.jobId
            ? {
                ...j,
                status: 'interviewing',
                interviewIds: [...j.interviewIds, newId],
                currentStage: data.roundName,
                nextAction: `准备${data.roundName}（${data.time}）`,
                steps: { ...j.steps, prepStage: 'in_progress' }
              }
            : j
        )
      );
    }

    setNextActions((prev) => [
      {
        id: 'act-int-' + Date.now(),
        jobId: data.jobId || 'job-custom',
        company: data.company,
        role: data.role,
        actionTitle: `准备「${data.company} · ${data.roundName}」高频问答`,
        dueDate: data.time,
        priority: 'high',
        targetTab: 'interview_prep_workspace',
        targetId: newId
      },
      ...prev
    ]);

    showToast({
      type: 'success',
      title: '面试准备方案已生成',
      message: `已为「${data.company} · ${data.roundName}」制定专属高频题库与公司研判。`
    });

    return newId;
  };

  const updateQuestionAnswer = (
    interviewId: string,
    questionId: string,
    answer: Partial<PreparedAnswer>,
    isPrepared: boolean = true
  ) => {
    setInterviews((prev) =>
      prev.map((int) => {
        if (int.id !== interviewId) return int;

        const updatedQuestions = int.preparation.highFreqQuestions.map((q) => {
          if (q.id !== questionId) return q;
          return {
            ...q,
            isPrepared: isPrepared ?? true,
            preparedAnswer: {
              ...q.preparedAnswer,
              ...answer
            }
          };
        });

        const preparedCount = updatedQuestions.filter((q) => q.isPrepared).length;
        const totalCount = updatedQuestions.length;
        const newReadiness = Math.min(100, Math.round(40 + (preparedCount / totalCount) * 60));

        return {
          ...int,
          readinessPercent: newReadiness,
          preparation: {
            ...int.preparation,
            readinessPercent: newReadiness,
            highFreqQuestions: updatedQuestions
          }
        };
      })
    );

    showToast({
      type: 'success',
      title: '回答准备已保存',
      message: '答题要点与逐字稿已同步更新。'
    });
  };

  const addCustomQuestion = (interviewId: string, questionText: string, focusText: string) => {
    setInterviews((prev) =>
      prev.map((int) => {
        if (int.id !== interviewId) return int;
        const newQ: InterviewPreparation['highFreqQuestions'][0] = {
          id: 'q-custom-' + Date.now(),
          question: questionText,
          probabilityStars: 4,
          evaluationFocus: focusText || '自定义关注考点',
          recommendedExperienceId: 'exp-1',
          isPrepared: false,
          preparedAnswer: {
            mode: 'logic',
            logicFlow: ['背景痛点', '核心行动', '量化成果'],
            keywords: ['数据驱动', '落地实践'],
            aiReference: '根据过往项目经验，建议围绕 STAR 法则展开阐述……',
            inScript: false
          }
        };
        return {
          ...int,
          preparation: {
            ...int.preparation,
            highFreqQuestions: [...int.preparation.highFreqQuestions, newQ]
          }
        };
      })
    );
    showToast({
      type: 'success',
      title: '已添加自定义面试问题'
    });
  };

  // Review & Experience Feedback
  const createReviewFromTranscript = (data: {
    interviewId: string;
    transcript: string;
  }) => {
    const targetInterview = interviews.find((i) => i.id === data.interviewId);
    if (!targetInterview) return;

    const newReview: InterviewReview = {
      id: 'rev-' + Date.now(),
      interviewId: targetInterview.id,
      company: targetInterview.company,
      role: targetInterview.role,
      roundName: targetInterview.roundName,
      reviewDate: new Date().toISOString().split('T')[0],
      overallScore: Math.floor(75 + Math.random() * 12),
      totalQACount: 4,
      competencies: [
        { name: '岗位匹配度', score: 85, benchmark: 80 },
        { name: '回答结构性', score: 76, benchmark: 78 },
        { name: '专业技术深度', score: 80, benchmark: 82 },
        { name: '表达清晰度', score: 78, benchmark: 75 }
      ],
      coreProblems: [
        '① 在回答系统架构设计时，对降级熔断策略的细节描述较少；',
        '② 未主动提及经历中的高价值量化成果（如 4 小时评测周期）。'
      ],
      preparationVsActual: [
        { keyPoint: '核心业务背景介绍', wasPrepared: true, wasAnswered: true, status: 'hit' },
        { keyPoint: '技术选型权衡依据', wasPrepared: true, wasAnswered: true, status: 'hit' },
        { keyPoint: '降级与容灾机制细节', wasPrepared: true, wasAnswered: false, status: 'miss' }
      ],
      aiDiagnosis: '整体回答专业度很高，技术逻辑清晰。如果在被追问系统边界时，能够主动报出历史量化指标，说服力将进一步增强！',
      qaList: [
        {
          id: 'qa-rev-1',
          qIndex: 1,
          question: '请简述你在该岗位相关项目中最有成就感的一次技术选型？',
          candidateAnswer: data.transcript.substring(0, 200) || '我们在项目中对比了纯人工和模型裁判方案，最终实现了 5 万条/天的自动化评测……',
          interviewerIntent: {
            mainPoints: ['选型严谨度', '商业与技术平衡'],
            importanceStars: 5,
            productAbilityStars: 4,
            techDepthStars: 4
          },
          answerAnalysis: {
            completeness: 82,
            structure: 78,
            persuasiveness: 80,
            jobRelevance: 88
          },
          identifiedIssues: ['建议在结尾强化对业务大盘核心指标的拉动数据。'],
          suggestionAdvice: '补充：“通过该选型，直接将评测周期从 2 周缩短至 4 小时以内……”',
          relatedExperienceId: 'exp-1'
        }
      ],
      experienceFeedbacks: [
        {
          experienceId: 'exp-1',
          experienceTitle: 'AI 搜索评测体系与质量自动化评估体系建设',
          discoveredIssues: ['面试中追问到了架构降级容灾与金标一致性。'],
          suggestions: ['＋ 补充：在经历行动中加入高并发降级容灾策略。'],
          currentVersion: 'V3',
          proposedVersion: 'V4',
          proposedChanges: [
            {
              field: 'actions',
              from: '设计多模型交叉校验机制。',
              to: '设计多模型交叉校验与自动化降级容灾流，保障 99.9% 评测管线高可用。'
            }
          ],
          applied: false
        }
      ]
    };

    setInterviews((prev) =>
      prev.map((i) =>
        i.id === targetInterview.id ? { ...i, status: 'completed', review: newReview } : i
      )
    );

    if (targetInterview.jobId) {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === targetInterview.jobId
            ? {
                ...j,
                steps: { ...j.steps, reviewStage: 'done' }
              }
            : j
        )
      );
    }

    showToast({
      type: 'success',
      title: '面试复盘分析完成',
      message: `已解析问答记录，综合评分 ${newReview.overallScore} 分。`
    });
  };

  const addInterviewReview = (
    interviewId: string,
    customReview?: Partial<InterviewReview>
  ) => {
    const targetInterview = interviews.find((i) => i.id === interviewId);
    if (!targetInterview) return;

    const newReview: InterviewReview = {
      id: 'rev-' + Date.now(),
      interviewId: targetInterview.id,
      company: targetInterview.company,
      role: targetInterview.role,
      roundName: targetInterview.roundName,
      reviewDate: new Date().toISOString().split('T')[0],
      overallScore: customReview?.overallScore || Math.floor(78 + Math.random() * 12),
      passProbability: customReview?.passProbability || '通过概率较高 (约 85%)',
      totalQACount: customReview?.qaBreakdown?.length || 4,
      highlights: customReview?.highlights || [
        '熟练掌握大模型评测标准与指标设计，专业度获得认可',
        '对项目量化结果表述清晰，展现了较强的业务主导力'
      ],
      drawbacks: customReview?.drawbacks || [
        '在回答极端并发容灾与降级时略显犹豫，可进一步补充选型对比'
      ],
      competencies: customReview?.competencies || [
        { name: '岗位匹配度', score: 85, benchmark: 80 },
        { name: '回答结构性', score: 78, benchmark: 78 },
        { name: '专业技术深度', score: 82, benchmark: 82 },
        { name: '表达清晰度', score: 80, benchmark: 75 }
      ],
      coreProblems: customReview?.drawbacks || [
        '① 在回答系统架构设计时，对降级熔断策略的细节描述较少；',
        '② 未主动提及经历中的高价值量化成果。'
      ],
      preparationVsActual: customReview?.preparationVsActual || [
        { keyPoint: '核心业务背景介绍', wasPrepared: true, wasAnswered: true, status: 'hit' },
        { keyPoint: '技术选型权衡依据', wasPrepared: true, wasAnswered: true, status: 'hit' },
        { keyPoint: '降级与容灾机制细节', wasPrepared: true, wasAnswered: false, status: 'miss' }
      ],
      aiDiagnosis:
        customReview?.aiDiagnosis ||
        '整体回答专业度很高，技术逻辑清晰。如果在被追问系统边界时，能够主动报出历史量化指标，说服力将进一步增强！',
      qaBreakdown: customReview?.qaBreakdown || [
        {
          id: 'qa-rev-1',
          question: '请简述你在该岗位相关项目中最有成就感的一次技术选型？',
          interviewerIntent: '考察选型严谨度与技术与商业的平衡思考',
          candidatePerformance: '优秀 (88分)',
          analysis: '逻辑严密，清晰阐述了方案权衡与自动化落地全流程。',
          recommendedStrategy: '可进一步补充如何利用该评测集自动化回归测试的落地场景。'
        }
      ],
      qaList: customReview?.qaList || [],
      experienceFeedback: customReview?.experienceFeedback || [
        {
          experienceId: 'exp-1',
          feedbackText: '在本次面试中得到了面试官的高度认可，建议将「多模型交叉裁判」作为亮点写入经历卡片'
        }
      ],
      experienceFeedbacks: customReview?.experienceFeedbacks || [
        {
          experienceId: 'exp-1',
          experienceTitle: 'AI 搜索评测体系与质量自动化评估体系建设',
          discoveredIssues: ['面试中追问到了架构降级容灾与金标一致性。'],
          suggestions: ['＋ 补充：在经历行动中加入高并发降级容灾策略。'],
          currentVersion: 'V3',
          proposedVersion: 'V4',
          proposedChanges: [
            {
              field: 'actions',
              from: '设计多模型交叉校验机制。',
              to: '设计多模型交叉校验与自动化降级容灾流，保障 99.9% 评测管线高可用。'
            }
          ],
          applied: false
        }
      ]
    };

    setInterviews((prev) =>
      prev.map((i) =>
        i.id === targetInterview.id ? { ...i, status: 'completed', review: newReview } : i
      )
    );

    if (targetInterview.jobId) {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === targetInterview.jobId
            ? {
                ...j,
                steps: { ...j.steps, reviewStage: 'done' }
              }
            : j
        )
      );
    }

    showToast({
      type: 'success',
      title: '智能复盘报告已生成',
      message: `已解析面试问答记录，综合评分 ${newReview.overallScore} 分。`
    });
  };

  const syncReviewToExperience = (experienceId: string, feedbackText: string) => {
    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id !== experienceId) return exp;
        const nextVerNum = (parseFloat(exp.currentVersion.replace('V', '')) + 0.1).toFixed(1);
        const nextVersion = `V${nextVerNum}`;
        const newAction = `[实战高光沉淀] ${feedbackText}`;
        const newVersionRecord = {
          version: nextVersion,
          date: new Date().toISOString().split('T')[0],
          reason: '基于面试真实复盘亮点沉淀入库',
          source: 'interview_review' as const,
          changes: [{ field: 'actions', from: '原版本行动', to: newAction }]
        };
        return {
          ...exp,
          currentVersion: nextVersion,
          actions: [newAction, ...exp.actions],
          versionHistory: [newVersionRecord, ...(exp.versionHistory || [])]
        };
      })
    );
  };

  const commitExperienceDiff = (
    experienceId: string,
    proposedVersion: string,
    proposedChanges: { field: string; from: string; to: string }[]
  ) => {
    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id !== experienceId) return exp;

        // Apply proposed changes into experience fields
        const updatedExp = { ...exp };
        proposedChanges.forEach((change) => {
          if (change.field.includes('responsibility')) {
            updatedExp.responsibility = change.to;
          } else if (change.field.includes('actions')) {
            updatedExp.actions = [change.to, ...exp.actions.slice(1)];
          } else if (change.field.includes('background')) {
            updatedExp.background = change.to;
          }
        });

        const newVersionRecord = {
          version: proposedVersion,
          date: new Date().toISOString().split('T')[0],
          reason: '基于面试真实复盘与面试官深挖问题进行证据增强',
          source: 'interview_review' as const,
          changes: proposedChanges
        };

        return {
          ...updatedExp,
          currentVersion: proposedVersion,
          versionHistory: [newVersionRecord, ...exp.versionHistory]
        };
      })
    );

    // Update the review feedback applied flag
    setInterviews((prev) =>
      prev.map((int) => {
        if (!int.review) return int;
        return {
          ...int,
          review: {
            ...int.review,
            experienceFeedbacks: int.review.experienceFeedbacks.map((fb) =>
              fb.experienceId === experienceId ? { ...fb, applied: true } : fb
            )
          }
        };
      })
    );

    showToast({
      type: 'success',
      title: `经历资产已升级为 ${proposedVersion}！`,
      message: `已将面试复盘证据沉淀至「我的经历库」，后续岗位与面试将自动复用。`
    });

    setActivities((prev) => [
      {
        id: 'act-' + Date.now(),
        type: 'experience',
        title: `沉淀面试复盘反馈：升级经历为 ${proposedVersion}`,
        desc: '补充了方案选型决策对比与算法协同量化证据',
        timestamp: '刚刚',
        targetTab: 'experiences'
      },
      ...prev
    ]);
  };

  const applyReviewFeedback = (interviewId: string, feedbackIndex: number) => {
    const targetInterview = interviews.find((i) => i.id === interviewId);
    if (!targetInterview || !targetInterview.review) return;

    const feedbacks = targetInterview.review.experienceFeedbacks || [];
    const feedback = feedbacks[feedbackIndex];
    if (!feedback) return;

    const experienceId = feedback.experienceId;
    const proposedVersion = feedback.proposedVersion || 'V2';
    const proposedChanges = feedback.proposedChanges || [];

    // 1. Update the experience in state
    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id !== experienceId) return exp;

        const updatedExp = { ...exp };
        if (proposedChanges.length > 0) {
          proposedChanges.forEach((change) => {
            if (change.field.includes('responsibility')) {
              updatedExp.responsibility = change.to;
            } else if (change.field.includes('actions')) {
              updatedExp.actions = [change.to, ...exp.actions.slice(1)];
            } else if (change.field.includes('background')) {
              updatedExp.background = change.to;
            }
          });
        } else if (feedback.suggestions && feedback.suggestions.length > 0) {
          updatedExp.actions = [
            `[面试复盘升级] ${feedback.suggestions[0]}`,
            ...exp.actions
          ];
        }

        const newVersionRecord = {
          version: proposedVersion,
          date: new Date().toISOString().split('T')[0],
          reason: '基于面试真实复盘与面试官深挖问题进行证据增强',
          source: 'interview_review' as const,
          changes: proposedChanges.length > 0 ? proposedChanges : [
            { field: 'actions', from: exp.actions[0] || '', to: updatedExp.actions[0] || '' }
          ]
        };

        return {
          ...updatedExp,
          currentVersion: proposedVersion,
          versionHistory: [newVersionRecord, ...(exp.versionHistory || [])]
        };
      })
    );

    // 2. Mark this feedback as applied in the interview's review
    setInterviews((prev) =>
      prev.map((int) => {
        if (int.id !== interviewId || !int.review) return int;
        const updatedFeedbacks = (int.review.experienceFeedbacks || []).map((fb, idx) =>
          idx === feedbackIndex ? { ...fb, applied: true } : fb
        );
        return {
          ...int,
          review: {
            ...int.review,
            experienceFeedbacks: updatedFeedbacks
          }
        };
      })
    );

    // 3. Log activity
    setActivities((prev) => [
      {
        id: 'act-' + Date.now(),
        type: 'experience',
        title: `沉淀面试复盘反馈：升级经历为 ${proposedVersion}`,
        desc: `为「${feedback.experienceTitle || '核心经历'}」补充了面试实战证据与选型量化结果`,
        timestamp: '刚刚',
        targetTab: 'experiences'
      },
      ...prev
    ]);
  };

  // Experience Library CRUD
  const createExperience = (exp: Partial<Experience>) => {
    const newId = 'exp-' + Date.now();
    const newExp: Experience = {
      id: newId,
      title: exp.title || '新增核心经历',
      company: exp.company || '任职企业',
      role: exp.role || '产品经理',
      period: exp.period || '2023 - 至今',
      background: exp.background || '项目背景与面临挑战',
      responsibility: exp.responsibility || '个人核心职责',
      actions: exp.actions || ['制定核心方案并推进落地'],
      results: exp.results || ['实现了业务指标显著提升'],
      metrics: exp.metrics || ['增长 +20%'],
      capabilityTags: exp.capabilityTags || ['AI产品', '数据驱动'],
      targetJobs: [],
      jdMatches: [],
      resumeVersionsUsed: [],
      currentVersion: 'V1',
      versionHistory: [
        {
          version: 'V1',
          date: new Date().toISOString().split('T')[0],
          reason: '初始创建经历卡片',
          source: 'manual',
          changes: []
        }
      ]
    };

    setExperiences((prev) => [newExp, ...prev]);
    showToast({
      type: 'success',
      title: '已添加经历资产',
      message: `已收录「${newExp.title}」至您的长期职业资产库。`
    });
    return newId;
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    );
    showToast({
      type: 'info',
      title: '经历已更新'
    });
  };

  const deleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    showToast({
      type: 'info',
      title: '经历已移除'
    });
  };

  const addExperienceVersion = (
    expId: string,
    version: string,
    reason: string,
    updatedFields: Partial<Experience>
  ) => {
    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id !== expId) return exp;
        const newVersionRecord = {
          version,
          date: new Date().toISOString().split('T')[0],
          reason,
          source: 'ai_optimization' as const,
          changes: Object.keys(updatedFields).map((key) => ({
            field: key,
            from: '原版内容',
            to: String((updatedFields as Record<string, unknown>)[key])
          }))
        };
        return {
          ...exp,
          ...updatedFields,
          currentVersion: version,
          versionHistory: [newVersionRecord, ...(exp.versionHistory || [])]
        };
      })
    );
    showToast({
      type: 'success',
      title: `经历已升级至 ${version}`,
      message: reason
    });
  };

  return (
    <JobCraftContext.Provider
      value={{
        currentTab,
        selectedJobId,
        selectedInterviewId,
        selectedJDId,
        selectedExperienceId,
        jobWorkspaceSubTab,
        navigateTo,
        userProfileTab,
        setUserProfileTab,
        user,
        updateUserProfile,
        jobs,
        experiences,
        jdAnalyses,
        resumes,
        interviews,
        nextActions,
        activities,
        aiSuggestions,
        historicalResumes,
        addHistoricalResume,
        deleteHistoricalResume,
        setDefaultHistoricalResume,
        toasts,
        showToast,
        dismissToast,
        createJob,
        updateJobStatus,
        deleteJob,
        createJDAnalysis,
        deleteJDAnalysis,
        applyResumeAISuggestion,
        rejectResumeAISuggestion,
        applyAllResumeAISuggestions,
        updateResumeBulletText,
        addResumeBullet,
        deleteResumeBullet,
        createInterview,
        updateQuestionAnswer,
        addCustomQuestion,
        addInterviewReview,
        applyReviewFeedback,
        syncReviewToExperience,
        createReviewFromTranscript,
        commitExperienceDiff,
        createExperience,
        updateExperience,
        deleteExperience,
        addExperienceVersion
      }}
    >
      {children}
    </JobCraftContext.Provider>
  );
};

export const useJobCraft = () => {
  const context = useContext(JobCraftContext);
  if (!context) {
    throw new Error('useJobCraft must be used within a JobCraftProvider');
  }
  return context;
};
