import {
  UserProfile,
  Experience,
  Job,
  JDAnalysis,
  ResumeVersion,
  Interview,
  InterviewReview,
  ActivityLog,
  NextActionItem,
  AISuggestionCard
} from '../types/jobcraft';

export const initialUser: UserProfile = {
  name: '菁菁',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'AI 产品经理 / 资深搜索策略PM',
  targetSalary: '45K–65K',
  yearsOfExp: 5,
  city: '北京 / 远程'
};

export const initialExperiences: Experience[] = [
  {
    id: 'exp-1',
    title: 'AI 搜索评测体系与质量自动化评估体系建设',
    company: '快知智能科技',
    role: '高级 AI 产品经理',
    period: '2023.03 - 至今',
    background: '大模型生成式搜索面临幻觉率高、相关性漂移和意图理解不精准问题，缺乏端到端客观与主观结合的评测基准体系。',
    responsibility: '作为核心产品负责人，主导从 0 到 1 搭建涵盖 15 个垂类的高质量 Eval 评测集与自动化 LLM-as-a-Judge 评测管线。',
    actions: [
      '制定多维度打分标准（忠实度 Faithfulness、答案相关性 Answer Relevance、上下文召回率 Context Recall）；',
      '设计多模型交叉校验机制与人工标注兜底流，将单次评测吞吐量从每天 200 条提升至 50,000 条；',
      '推进评测与 Bad Case 归因闭环，联动算法团队建立自动化 Regression Testing 管线。'
    ],
    results: [
      '模型检索幻觉率下降 34.2%，NDCG@5 关键搜索质量指标提升 18.5%；',
      '评测周期从 2 周缩短至 4 小时以内，支持每周 3 次算法模型敏捷迭代；',
      '沉淀出 200+ 工业级黄金评测基准集，成为全业务线通用质量规范。'
    ],
    metrics: ['幻觉率 -34.2%', 'NDCG@5 +18.5%', '评测周期 2周->4小时', '日评测吞吐 5W条'],
    capabilityTags: ['AI搜索', 'LLM评测', 'Eval体系', 'NDCG', '数据分析', '从0到1'],
    targetJobs: ['字节跳动 · AI 产品经理', '腾讯 · 产品经理'],
    jdMatches: [
      { jdTitle: '字节跳动 · AI 产品经理（搜索方向）', stars: 5 },
      { jdTitle: '腾讯 · 搜索与社交 AI PM', stars: 4 }
    ],
    resumeVersionsUsed: ['字节跳动定制版 V2.1', '通用 AI PM 版 V1.0'],
    interviewFeedbackSummary: '面试官重点关注：方案选型依据为何优于纯人工标注、个人在算法协作中的决策权重、以及指标衡量的量化置信度。',
    currentVersion: 'V3',
    versionHistory: [
      {
        version: 'V1',
        date: '2026-05-10',
        reason: '初始经历录入',
        source: 'manual',
        changes: [{ field: 'title', from: '', to: '搜索评测系统开发' }]
      },
      {
        version: 'V2',
        date: '2026-07-20',
        reason: '根据 JD 分析补充自动化评测指标与量化数字',
        source: 'jd_alignment',
        changes: [{ field: 'results', from: '提升了评测速度', to: '评测周期从2周缩短至4小时' }]
      },
      {
        version: 'V3',
        date: '2026-08-18',
        reason: '第1轮业务面后，补充方案决策对比依据与算法协作职责',
        source: 'interview_review',
        changes: [
          {
            field: 'responsibility',
            from: '负责搭建评测集',
            to: '主导从0到1搭建涵盖15个垂类的高质量Eval评测集与自动化LLM-as-a-Judge评测管线'
          }
        ]
      }
    ]
  },
  {
    id: 'exp-2',
    title: '大语言模型 Prompt 工程与智能 Agent 工作流平台',
    company: '快知智能科技',
    role: '高级 AI 产品经理',
    period: '2023.08 - 2024.12',
    background: '业务端多场景接入大模型成本高、Prompt 调优缺乏版本管理与回归测试、业务人员无法自主编排复杂多步 Agent。',
    responsibility: '负责企业级 Prompt 资产库与可视拖拽 Agent 编排画布从 0 到 1 产品规划与商业化落地。',
    actions: [
      '设计多变量 Prompt 模板引擎、Few-Shot 动态检索增强与 Token 成本实时预估机制；',
      '定义 ReAct 与 Plan-and-Solve 双模 Agent 逻辑流，支持条件分支、API 工具调用与沙箱执行；',
      '建立 Prompt AB 分流实验平台，支持快速验证不同 Prompt 方案的转化效果。'
    ],
    results: [
      '赋能 20+ 内部业务线，平均缩短大模型应用上线周期 65%；',
      'Prompt 调优成本降低 42%，整体 API 响应成功率提升至 99.4%；',
      '月均 Agent 运行调用量突破 1200 万次。'
    ],
    metrics: ['上线周期 -65%', '调用成本 -42%', '月调用 1200W+', '可用性 99.4%'],
    capabilityTags: ['Prompt工程', 'Agent编排', '工具调用', 'AB测试', 'B端产品架构'],
    targetJobs: ['字节跳动 · AI 产品经理', '某科技公司 · AI 产品经理'],
    jdMatches: [
      { jdTitle: '字节跳动 · AI 产品经理', stars: 5 },
      { jdTitle: '某科技公司 · AI 产品经理', stars: 5 }
    ],
    resumeVersionsUsed: ['字节跳动定制版 V2.1'],
    currentVersion: 'V2',
    versionHistory: [
      {
        version: 'V1',
        date: '2026-06-01',
        reason: '初始创建',
        source: 'manual',
        changes: []
      },
      {
        version: 'V2',
        date: '2026-08-05',
        reason: '补充 Token 成本控制与沙箱架构技术细节',
        source: 'manual',
        changes: []
      }
    ]
  },
  {
    id: 'exp-3',
    title: '垂直领域多模态知识问答与 RAG 检索增强引擎',
    company: '前沿数智',
    role: 'AI 产品经理',
    period: '2022.01 - 2023.03',
    background: '行业长文档（PDF/研报/表格）解析困难，传统全文检索召回率低且无法理解图表深层含义。',
    responsibility: '负责多模态 RAG 检索增强引擎的产品定义，优化文档切片、向量索引与重排（Re-rank）策略。',
    actions: [
      '引入结构化版面分析 OCR 与分层 Chunking 策略，支持跨页复杂表格与折线图精准抽取；',
      '设计 Dense+Sparse 混合检索（Hybrid Search）与 Cross-Encoder 重排模型流；',
      '制定拒答（I don\'t know）置信度阈值与事实性溯源高亮交互机制。'
    ],
    results: [
      '复杂长文档问答准确率从 61% 提升至 89.5%，问答召回速度在 1.2s 内；',
      '获得 12 家头部政企客户付费试点，ARR 实现 400 万突破。'
    ],
    metrics: ['问答准确率 61%->89.5%', '响应延迟 1.2s', 'ARR 400万', '混合检索 Hybrid'],
    capabilityTags: ['RAG', '向量检索', '多模态', 'Hybrid Search', '商业化'],
    targetJobs: ['腾讯 · 产品经理', '字节跳动 · AI 产品经理'],
    jdMatches: [
      { jdTitle: '腾讯 · 产品经理', stars: 4 },
      { jdTitle: '字节跳动 · AI 产品经理', stars: 4 }
    ],
    resumeVersionsUsed: ['腾讯定制版 V1.2'],
    currentVersion: 'V2',
    versionHistory: []
  },
  {
    id: 'exp-4',
    title: '个性化内容搜索推荐算法 AB 实验与留存增长',
    company: '前沿数智',
    role: '产品经理',
    period: '2021.03 - 2022.01',
    background: '用户搜索无结果率高（Zero-hit 9.8%），长尾关键词意图识别偏差导致新用户次日留存偏低。',
    responsibility: '负责搜索分发与推荐排序策略优化，搭建策略 AB 实验指标监控仪表盘。',
    actions: [
      '重构 Query 改写与语义纠错算法模型，引入热词补全与冷启动召回策略；',
      '建立以 CTR/CVR/有效停留时长为核心的综合排序权重矩阵；',
      '主导 30+ 组线上分流实验，推动推荐策略快速迭代。'
    ],
    results: [
      '搜索无结果率从 9.8% 降至 2.1%，搜索点击率 CTR 提升 14.6%；',
      '核心品类新用户次留提升 3.8 个百分点。'
    ],
    metrics: ['无结果率 9.8%->2.1%', 'CTR +14.6%', '次留 +3.8%', '30+ 组实验'],
    capabilityTags: ['推荐系统', '搜索召回', 'AB实验', '指标增长', 'Query改写'],
    targetJobs: ['腾讯 · 产品经理'],
    jdMatches: [{ jdTitle: '腾讯 · 产品经理', stars: 4 }],
    resumeVersionsUsed: ['通用产品经理版'],
    currentVersion: 'V1',
    versionHistory: []
  }
];

export const initialJDAnalyses: JDAnalysis[] = [
  {
    id: 'jd-byte-1',
    jobId: 'job-1',
    company: '字节跳动',
    role: 'AI 产品经理（搜索与生成方向）',
    salaryRange: '40K–60K · 16薪',
    createdAt: '2026-08-15',
    matchScore: 92,
    recommendationStars: 5,
    verdictSummary: '值得投！你的 AI 搜索评测、Prompt 平台与从 0 到 1 复杂项目落地经历与岗位核心诉求高度重合。',
    whyMatch: '字节该岗位核心考核"生成式搜索质量评测"、"Prompt/Agent工作流"以及"跨算法团队深度协同"。你的经验不仅具备 0 到 1 体系化落地成果，且有明确的 NDCG 和幻觉率量化数据支撑。',
    keyRisks: '缺少百亿级超大规模 C 端消费级流量与复杂商业化变现场景经历，面试中需强调策略抽象能力与端到端高并发架构理解。',
    resumeAdvice: [
      '将「AI 搜索评测体系建设」置于项目经历首位，突出 LLM-as-a-Judge 与质量把控体系；',
      '高亮关键词：NDCG、Faithfulness、Prompt 编排、Eval、AB 实验、0到1架构；',
      '弱化传统后台系统维护类描述，强化策略思考与算法业务指标联动。'
    ],
    coreRequirements: [
      {
        category: '核心职责',
        items: [
          '主导新一代大模型 AI 搜索的核心策略演进，包括意图理解、检索重排与生成问答；',
          '建立工业级 AI 搜索评测体系，制定自动化 Eval 基准并推动 Bad Case 闭环解决；',
          '与算法团队紧密协同，定义模型训练与微调的数据标注规范及落地效果评估。'
        ]
      },
      {
        category: '任职要求',
        items: [
          '3 年以上搜索、推荐或大模型 AI 产品经验，深入理解 Transformer/RAG/Prompt 机制；',
          '具备从 0 到 1 搭建质量评估基准体系的成熟方法论，熟练掌握常用评估指标（NDCG/BLEU/Recall 等）；',
          '出色的跨团队推进力与数据敏感度，有技术背景或能直接与算法架构师对话者优先。'
        ]
      }
    ],
    atsKeywords: {
      hardSkills: ['AI搜索', 'LLM评测 (Eval)', 'RAG架构', 'NDCG指标', 'Prompt工程', 'AB实验', '意图识别'],
      softSkills: ['算法协同', '从0到1推进', '跨部门沟通', '数据洞察', '结构化表达'],
      expKeywords: ['质量基准体系', '大模型落地', '搜索质量', '自动化评测管线', 'Bad Case归因'],
      coveragePercent: 94
    },
    subtextAnalysis: [
      {
        id: 'sub-1',
        rawJD: '具备从0到1搭建质量评估基准体系的成熟方法论',
        literalMeaning: '要求会做评测集，懂得如何评测算法产出。',
        realEvaluation: '【真实考察】团队目前可能正面临模型上线后效果波动大、业务方质疑、算法无法自我量化的问题。急需一位有骨干经验的 PM 建立强有力的评测裁判标准，压实算法迭代方向。'
      },
      {
        id: 'sub-2',
        rawJD: '出色的跨团队推进力，能直接与算法架构师深度对话',
        literalMeaning: '需要和算法同事搞好关系，推动需求。',
        realEvaluation: '【真实考察】算法团队通常极度专业且强势，PM 不能只提模糊的体验要求，必须懂 Loss/Embedding/Attention/Rerank 等底层逻辑，用严密的数据证据说服算法改动。'
      },
      {
        id: 'sub-3',
        rawJD: '抗压能力强，适应高节奏业务迭代',
        literalMeaning: '工作节奏快，需要加班。',
        realEvaluation: '【真实考察】生成式搜索是字节当期战略级核心项目，竞品压力极大，需求变动频繁，需要 PM 具备极强的敏捷迭代与优先级把控韧性。'
      }
    ],
    skillGaps: [
      {
        id: 'gap-1',
        capability: '亿级高并发搜索流量调优',
        userEvidence: '具备中大型企业级千万级调用经验，但无亿级 C 端高并发直接主导记录。',
        requirement: '字节搜索核心服务数亿用户，关注峰值延迟与降级策略。',
        gap: '中度差距（缺乏超大流量实战案例）',
        recommendation: '面试中强调对 SLA、降级熔断策略、Cache 缓存命中率与冷热分流的系统级设计思考。'
      },
      {
        id: 'gap-2',
        capability: '搜索商业化广告混合排序',
        userEvidence: '主要专注于自然搜索与问答质量，较少涉及变现广告点位平衡。',
        requirement: '搜索结果往往需平衡用户体验与商业变现。',
        gap: '轻微差距',
        recommendation: '准备一段对"搜索体验与商业广告平衡"的结构化思考框架。'
      }
    ],
    recommendedExperiences: [
      {
        experienceId: 'exp-1',
        matchScore: 98,
        matchingJDReq: '工业级 AI 搜索评测体系 & 质量自动化 Eval',
        reason: '项目内容直接命中 JD 的 Eval、NDCG、幻觉率指标，是本岗位最高优先级的王牌证据。'
      },
      {
        experienceId: 'exp-2',
        matchScore: 92,
        matchingJDReq: '大模型应用落地 & Prompt 工程与 Agent 平台',
        reason: '证明了对 LLM 交互、Token 优化、工具调用的系统化工程能力与 B 端产品掌控力。'
      },
      {
        experienceId: 'exp-3',
        matchScore: 88,
        matchingJDReq: 'RAG 检索增强与多模态知识问答',
        reason: '补充了混合检索 Hybrid Search 与 Cross-Encoder 重排策略的技术深度。'
      }
    ],
    rawText: `【职位描述】
1. 负责字节跳动 AI 搜索业务的核心产品策略制定，包括意图识别、智能召回、生成式问答重排；
2. 搭建工业级大模型搜索质量评测体系，制定自动化 Eval 管线与黄金测试集，监控核心搜索指标（NDCG/满意度）；
3. 深入理解算法原理，与搜索、NLP 及多模态大模型团队紧密协作，推进模型微调与数据飞轮；
4. 敏锐洞察行业最新技术进展（Agent/RAG/Reasoning），持续探索 AI 搜索在垂直领域的落地形态。

【职位要求】
1. 本科及以上学历，计算机、数学、统计等相关专业优先；
2. 3年以上搜索、推荐或大语言模型相关产品经验，有生成式搜索或评测体系建设经历者优先；
3. 具备扎实的数据分析能力与逻辑推演能力，能够用数据客观衡量产品价值；
4. 优秀的沟通协调能力与抗压能力，能与顶尖算法团队高效对话。`
  },
  {
    id: 'jd-tencent-1',
    jobId: 'job-2',
    company: '腾讯',
    role: '产品经理（PCG 社交与 AI 助手）',
    salaryRange: '35K–50K · 15薪',
    createdAt: '2026-08-10',
    matchScore: 85,
    recommendationStars: 4,
    verdictSummary: '可积极投递！你的 RAG 问答与 Prompt Agent 经历与社交 AI 助手业务相容度良好。',
    whyMatch: '腾讯社交场景重视人机交互温度与知识召回准确度，你在 RAG 与多轮对话中的沉淀非常契合。',
    keyRisks: '腾讯注重 C 端用户体验细节与社交裂变增长，需多准备 C 端用户体验洞察案列。',
    resumeAdvice: [
      '突出多轮对话体验与用户留存提升的数据表现；',
      '强化知识库问答的响应速度与交互友好度。'
    ],
    coreRequirements: [
      {
        category: '核心职责',
        items: [
          '负责腾讯社交场景下 AI 助手的交互形态与知识问答功能规划；',
          '优化对话满意度与多轮长程记忆能力。'
        ]
      }
    ],
    atsKeywords: {
      hardSkills: ['AI助手', '多轮对话', 'RAG', 'Prompt优化', '用户体验'],
      softSkills: ['跨团队协同', '同理心', '产品审美'],
      expKeywords: ['社交AI', '问答准确率', '留存增长'],
      coveragePercent: 86
    },
    subtextAnalysis: [],
    skillGaps: [],
    recommendedExperiences: [
      {
        experienceId: 'exp-3',
        matchScore: 92,
        matchingJDReq: '多模态知识问答与 RAG',
        reason: '知识召回与准确率数据非常有说服力。'
      }
    ],
    rawText: `腾讯 PCG 招聘 AI 助手产品经理，负责社交与群聊场景下的智能助手体验设计与落地……`
  }
];

export const initialResumeVersion: ResumeVersion = {
  id: 'res-byte-1',
  jobId: 'job-1',
  jobTitle: 'AI 产品经理（搜索方向）',
  company: '字节跳动',
  versionName: '字节跳动定制版 V2.1 · 搜索评测定制',
  updatedAt: '2026-08-20 18:30',
  personalInfo: {
    name: '菁菁',
    email: 'jingjing.ai@example.com',
    phone: '138-0000-8888',
    title: '资深 AI 产品经理 / 5年经验',
    location: '北京',
    wechat: 'jingjing_product'
  },
  summary: '5 年 AI 与搜索策略产品经验，主导过 2 款大模型产品从 0 到 1 落地。核心专精生成式 AI 搜索质量评测（LLM-as-a-Judge）、RAG 检索增强架构与 Prompt/Agent 平台建设。具备深厚算法对话与数据驱动能力，曾推动模型检索幻觉率下降 34.2%、搜索 NDCG@5 提升 18.5%。',
  aiSuggestions: [
    {
      id: 'sug-1',
      type: 'keyword',
      title: '强化 AI 搜索与 Eval 评测关键词',
      originalText: '负责搜索评测体系建设，制定了相关测试标准',
      suggestedText: '主导从 0 到 1 搭建涵盖 15 个垂类的高质量 Eval 评测集与自动化 LLM-as-a-Judge 评测管线',
      applied: true,
      reason: '高频匹配 JD 中"工业级评测体系"与"自动化 Eval"核心要求，提升 ATS 检索评分。',
      targetBulletId: 'bullet-exp1-1'
    },
    {
      id: 'sug-2',
      type: 'metric',
      title: '增加量化业务结果指标',
      originalText: '有效降低了模型的错误率并提升了搜索效果',
      suggestedText: '推动模型检索幻觉率下降 34.2%，NDCG@5 关键搜索质量指标显著提升 18.5%',
      applied: true,
      reason: '用精准的硬核指标（NDCG/幻觉率）替代模糊定性表述，增强说服力。',
      targetBulletId: 'bullet-exp1-2'
    },
    {
      id: 'sug-3',
      type: 'order',
      title: '调整项目顺序：将搜索评测置顶',
      originalText: '首个项目为 Prompt 工作流平台',
      suggestedText: '调整「AI 搜索评测体系」为第 1 项目，紧随其后为「Prompt/Agent平台」',
      applied: true,
      reason: '第一眼建立与字节搜索岗位的最高相关度认知锚点。'
    },
    {
      id: 'sug-4',
      type: 'prune',
      title: '精简传统后台管理类非核心描述',
      originalText: '参与日常权限审批、用户反馈后台界面改版与工单系统流转优化',
      suggestedText: '（建议直接删除该条，释放篇幅留给 AI 算法协同与指标增长）',
      applied: false,
      reason: '与高级 AI PM 岗位定位偏离，容易稀释核心竞争力。',
      targetBulletId: 'bullet-exp1-4'
    },
    {
      id: 'sug-5',
      type: 'polish',
      title: '补充与算法架构团队的深度协作证据',
      originalText: '和算法同事开会讨论模型问题',
      suggestedText: '联动算法团队建立自动化 Regression Testing 管线与 Bad Case 归因闭环，支持每周 3 次算法模型敏捷迭代',
      applied: false,
      reason: 'JD 明确考察跨算法深度对话能力，需强化工业化管线与协同机制。',
      targetBulletId: 'bullet-exp1-3'
    }
  ],
  sections: [
    {
      id: 'sec-edu',
      title: '教育背景',
      items: [
        {
          id: 'edu-1',
          title: '北京邮电大学',
          subtitle: '计算机科学与技术 · 硕士',
          period: '2019.09 - 2021.06',
          bullets: [{ id: 'b-edu-1', text: '研究方向：自然语言处理与信息检索，发表 NLP 国际会议论文 1 篇' }]
        },
        {
          id: 'edu-2',
          title: '北京科技大学',
          subtitle: '软件工程 · 学士',
          period: '2015.09 - 2019.06',
          bullets: [{ id: 'b-edu-2', text: '国家奖学金，校级优秀毕业生' }]
        }
      ]
    },
    {
      id: 'sec-exp',
      title: '工作经历与核心项目',
      items: [
        {
          id: 'item-exp-1',
          title: '快知智能科技 · 高级 AI 产品经理',
          subtitle: 'AI 搜索评测体系与自动化评估管线建设',
          period: '2023.03 - 至今',
          bullets: [
            {
              id: 'bullet-exp1-1',
              text: '主导从 0 到 1 搭建涵盖 15 个垂类的高质量 Eval 评测集与自动化 LLM-as-a-Judge 评测管线；',
              originalExperienceId: 'exp-1',
              jdMatchTag: 'JD核心要求 · 评测体系 ★★★★★'
            },
            {
              id: 'bullet-exp1-2',
              text: '推动模型检索幻觉率下降 34.2%，NDCG@5 关键搜索质量指标显著提升 18.5%，评测周期由 2 周缩短至 4 小时以内；',
              originalExperienceId: 'exp-1',
              jdMatchTag: '量化结果 · 搜索质量 ★★★★★'
            },
            {
              id: 'bullet-exp1-3',
              text: '设计多模型交叉校验机制与人工标注兜底流，日处理评测吞吐量达 50,000 条，沉淀 200+ 工业级黄金基准集；',
              originalExperienceId: 'exp-1',
              jdMatchTag: '算法协同 · 自动化管线 ★★★★☆'
            },
            {
              id: 'bullet-exp1-4',
              text: '参与日常权限审批、用户反馈后台界面改版与工单系统流转优化。',
              originalExperienceId: 'exp-1',
              jdMatchTag: '待精简项'
            }
          ]
        },
        {
          id: 'item-exp-2',
          title: '快知智能科技 · 高级 AI 产品经理',
          subtitle: '大语言模型 Prompt 工程与智能 Agent 工作流平台',
          period: '2023.08 - 2024.12',
          bullets: [
            {
              id: 'bullet-exp2-1',
              text: '从 0 到 1 规划并上线企业级 Prompt 资产库与可视拖拽 Agent 编排画布，赋能内部 20+ 业务线；',
              originalExperienceId: 'exp-2',
              jdMatchTag: 'Agent与Prompt ★★★★★'
            },
            {
              id: 'bullet-exp2-2',
              text: '设计多变量 Prompt 模板引擎与 Token 成本实时预估机制，调优成本降低 42%，月均调用量突破 1200 万次。',
              originalExperienceId: 'exp-2',
              jdMatchTag: '成本控制与落地 ★★★★☆'
            }
          ]
        },
        {
          id: 'item-exp-3',
          title: '前沿数智 · AI 产品经理',
          subtitle: '垂直领域多模态知识问答与 RAG 检索增强引擎',
          period: '2022.01 - 2023.03',
          bullets: [
            {
              id: 'bullet-exp3-1',
              text: '负责多模态 RAG 检索增强引擎产品定义，采用 Dense+Sparse 混合检索与 Cross-Encoder 重排策略；',
              originalExperienceId: 'exp-3',
              jdMatchTag: 'RAG与混合检索 ★★★★☆'
            },
            {
              id: 'bullet-exp3-2',
              text: '长文档问答准确率从 61% 提升至 89.5%，问答响应延迟稳定在 1.2s 内，成功支持 12 家头部政企试点。',
              originalExperienceId: 'exp-3',
              jdMatchTag: '商业化落地 ★★★☆☆'
            }
          ]
        }
      ]
    },
    {
      id: 'sec-skills',
      title: '专业技能',
      items: [
        {
          id: 'skills-1',
          title: 'AI 策略与技术理解',
          bullets: [
            { id: 'b-sk-1', text: '熟练掌握 LLM 评测方法论（LLM-as-a-Judge、Faithfulness、NDCG、BLEU、ROUGE）；' },
            { id: 'b-sk-2', text: '深入理解 Transformer、RAG 检索增强、Prompt 优化与 Agent 工具调用原理；' },
            { id: 'b-sk-3', text: '熟练使用 Python 进行数据清洗与评测脚本编写，熟练使用 SQL/Tableau 进行策略 AB 实验分析。' }
          ]
        }
      ]
    }
  ]
};

export const initialReviewByteRound1: InterviewReview = {
  id: 'rev-byte-round1',
  interviewId: 'int-byte-1',
  company: '字节跳动',
  role: 'AI 产品经理（搜索方向）',
  roundName: '第1面 · 业务面',
  reviewDate: '2026-08-28',
  overallScore: 76,
  passProbability: '通过概率较高 (约 82%)',
  totalQACount: 6,
  highlights: [
    '熟练掌握大模型评测标准设计（Faithfulness、ROUGE、NDCG），专业度获面试官肯定；',
    '回答语速适中，能够紧扣 AI 产品经理核心业务痛点与技术落地展开。'
  ],
  drawbacks: [
    '技术方案选型（纯规则 vs 大模型裁判）对比权衡展开不足；',
    '核心项目成果缺少硬核量化数据背书。'
  ],
  qaBreakdown: [
    {
      id: 'qa-rev-1',
      question: '请先做个简短自我介绍，重点讲讲你在 AI 搜索和评测方向的核心经历。',
      interviewerIntent: '快速建立画像，验证履历真实度，考察表达抓重点能力',
      candidatePerformance: '良好 (80分)',
      analysis: '自我介绍未直接点出量化核心战绩（如 NDCG +18.5%），语速稍快，缺少一句话定位标签。',
      recommendedStrategy: '开场直接用“专精于大模型搜索质量评测与数据驱动落地的产品经理”定调，并在 1 分钟内报出幻觉率下降 34.2% 和 5 万条日评测的核心数字。'
    },
    {
      id: 'qa-rev-2',
      question: '你能详细讲讲那个 AI 搜索评测体系项目吗？你们当初为什么不直接用人工标注，而要搞自动化 LLM-as-a-Judge？',
      interviewerIntent: '考察技术选型思考深度、成本与效率 ROI 权衡、是否盲目迷信大模型',
      candidatePerformance: '中等 (68分)',
      analysis: '没有清晰展示方案选型对比（如纯人工 vs 纯规则 vs 大模型裁判），没解释如何解决大模型自身评测偏差。',
      recommendedStrategy: '补充对比三种路径：A 纯人工、B 基于启发式规则、C 大模型裁判+人工抽检混合流。说明最终选择 C 是在保持 92% 与人工一致率前提下降低 85% 成本。'
    },
    {
      id: 'qa-rev-3',
      question: '在搭建评测体系过程中，你个人具体负责什么？算法团队为什么愿意配合你定下的规则？',
      interviewerIntent: '考察个人真实贡献度、推动跨部门协作的软实力、如何解决技术冲突',
      candidatePerformance: '良好 (75分)',
      analysis: '个人职责描述较模糊，听起来更像“协调者”而非“策略定义者”，缺少解决冲突的具体方法论。',
      recommendedStrategy: '强调作为 PM 独立定义了 Faithfulness/Recall 等三大核心数学指标体系，并通过 Bad Case 交叉校验与数据对齐，让算法心服口服。'
    }
  ],
  experienceFeedback: [
    {
      experienceId: 'exp-1',
      feedbackText: '在本次面试中得到了面试官的高度认可，建议将「双模型交叉判别与 Kappa 一致性度量」作为亮点写入经历卡片'
    }
  ],
  competencies: [
    { name: '岗位匹配度', score: 86, benchmark: 80 },
    { name: '回答结构性', score: 72, benchmark: 78 },
    { name: '专业技术深度', score: 78, benchmark: 82 },
    { name: '表达清晰度', score: 74, benchmark: 75 }
  ],
  coreProblems: [
    '① 产品决策依据表达不足：只讲了选择 LLM-as-a-Judge 自动化方案，未向面试官说明为何放弃其他方案及方案权衡边界。',
    '② 技术理解回答不够深入：在追问检索召回与重排模型交叉影响时，对算法复杂度的表述稍显模糊。',
    '③ 项目结果缺少量化数据佐证：在回答 Agent 落地收益时使用了"大幅提升"等定性词，未当场报出 65% 与 42% 等硬数据。'
  ],
  preparationVsActual: [
    { keyPoint: '项目背景与业务痛点说明', wasPrepared: true, wasAnswered: true, status: 'hit' },
    { keyPoint: '个人作为核心 PM 的职责边界', wasPrepared: true, wasAnswered: true, status: 'hit' },
    { keyPoint: '方案选型对比与决策权衡过程', wasPrepared: true, wasAnswered: false, status: 'miss' },
    { keyPoint: 'NDCG 与幻觉率量化业务结果', wasPrepared: true, wasAnswered: false, status: 'miss' },
    { keyPoint: 'Bad Case 归因与算法协同机制', wasPrepared: false, wasAnswered: true, status: 'bonus' }
  ],
  aiDiagnosis: '你并不是没有准备，而是在面试紧张时未能把准备空间中的"决策权衡逻辑"和"量化成果数据"完整表达出来。下一轮技术面务必在每段回答末尾主动加上量化数字！',
  qaList: [
    {
      id: 'qa-1',
      qIndex: 1,
      question: '请先做个简短自我介绍，重点讲讲你在 AI 搜索和评测方向的核心经历。',
      candidateAnswer: '面试官你好，我是菁菁，有 5 年 AI 产品经验。过去 2 年在快知智能负责 AI 搜索评测体系与 Prompt 平台建设，主导了从 0 到 1 搭建自动化评测管线，主要就是制定打分规则让大模型自动评测搜索问答质量……',
      interviewerIntent: {
        mainPoints: ['快速建立画像', '验证履历真实度', '看表达抓重点能力'],
        importanceStars: 5,
        productAbilityStars: 4,
        techDepthStars: 3
      },
      answerAnalysis: {
        completeness: 80,
        structure: 75,
        persuasiveness: 78,
        jobRelevance: 88
      },
      identifiedIssues: ['自我介绍未直接点出量化核心战绩（如 NDCG +18.5%）', '语速稍快，缺少一句话定位标签'],
      suggestionAdvice: '开场直接用"一位专精于大模型搜索质量评测与数据驱动落地的产品经理"定调，并在 1 分钟内报出幻觉率下降 34.2% 和 5 万条日评测的核心数字。',
      relatedExperienceId: 'exp-1'
    },
    {
      id: 'qa-2',
      qIndex: 2,
      question: '你能详细讲讲那个 AI 搜索评测体系项目吗？你们当初为什么不直接用人工标注，而要搞自动化 LLM-as-a-Judge？',
      candidateAnswer: '因为人工标注太慢了，我们当时每天只能测 200 条，算法发版一周要好几次根本等不及，而且人工标注每个人标准不一样很主观。所以我们就想用 GPT-4 来当裁判，写了很详细的 Prompt 判定答案好坏。',
      interviewerIntent: {
        mainPoints: ['技术选型思考深度', '成本与效率 ROI 权衡', '是否盲目迷信大模型'],
        importanceStars: 5,
        productAbilityStars: 5,
        techDepthStars: 4
      },
      answerAnalysis: {
        completeness: 68,
        structure: 65,
        persuasiveness: 72,
        jobRelevance: 86
      },
      identifiedIssues: [
        '⚠ 没有清晰展示方案选型对比（如：纯人工 vs 纯规则 vs LLM-as-a-Judge vs 混合流）',
        '⚠ 没解释如何解决"大模型自身评测也有偏差"的可靠性问题'
      ],
      suggestionAdvice: '建议补充结构化框架：“当时我们对比了三种路径：A 纯人工、B 基于启发式规则、C 大模型裁判+人工抽检混合流。最终选择 C 是因为在保持 92% 与人工一致率的前提下，将单次成本降低了 85%……”',
      relatedExperienceId: 'exp-1'
    },
    {
      id: 'qa-3',
      qIndex: 3,
      question: '在搭建评测体系过程中，你个人具体负责什么？算法团队为什么愿意配合你定下的规则？',
      candidateAnswer: '我主要是写了评测标准文档，然后跟算法开会沟通。他们一开始也觉得规则太严，后来大家一起坐下来对了几个 Bad Case，统一了标准后就跑通了。',
      interviewerIntent: {
        mainPoints: ['个人真实贡献度', '推动跨部门协作的软实力', '如何解决技术冲突'],
        importanceStars: 5,
        productAbilityStars: 4,
        techDepthStars: 3
      },
      answerAnalysis: {
        completeness: 70,
        structure: 68,
        persuasiveness: 70,
        jobRelevance: 82
      },
      identifiedIssues: [
        '⚠ 个人职责描述较模糊，听起来更像"协调者"而非"策略定义者"',
        '缺少解决冲突的具体方法论与量化依据'
      ],
      suggestionAdvice: '强调作为 PM 独立定义了 Faithfulness/Recall 等三大核心数学指标体系，并通过 Bad Case 交叉校验与数据对齐，让算法心服口服。',
      relatedExperienceId: 'exp-1'
    }
  ],
  experienceFeedbacks: [
    {
      experienceId: 'exp-1',
      experienceTitle: 'AI 搜索评测体系与质量自动化评估体系建设',
      discoveredIssues: [
        '面试官连续追问"为什么选这个方案"与"你个人在算法协作中的决策权重"，暴露原经历描述缺少选型对比依据。',
        '对大模型裁判自身一致性（LLM Consistency）校验的机制未在经历行动中写明。'
      ],
      suggestions: [
        '＋ 补充：对比 A/B/C 三种方案选型依据及成本 ROI；',
        '＋ 补充：增加"设计双模型交叉校验与 5% 人工金标抽检机制"细节；',
        '＋ 强化：从协调者升级为"策略规范制定者与算法评测基准主导人"。'
      ],
      currentVersion: 'V3',
      proposedVersion: 'V4',
      proposedChanges: [
        {
          field: 'background & 方案选型',
          from: '面对评测效率低问题，缺乏评测基准体系。',
          to: '面对评测吞吐瓶颈与主观偏差，对比纯人工与规则方案后，确立 LLM-as-a-Judge + 5% 金标抽检混合评测架构（一致性达 92.4%）。'
        },
        {
          field: 'responsibility & 职责升级',
          from: '负责搭建 15 个垂类评测集与打分标准。',
          to: '主导定义三大核心策略指标（Faithfulness/Recall/NDCG），主导算法决策争议仲裁并建立每周回归自动化基准。'
        },
        {
          field: 'actions & 关键行动',
          from: '设计多模型交叉校验机制与人工标注兜底流。',
          to: '建立双模型交叉判别（GPT-4+Claude）与自洽性检验管线，将机器与专家评审一致率提升至 94.1%，杜绝评测漂移。'
        }
      ],
      applied: false
    }
  ]
};

export const initialInterviews: Interview[] = [
  {
    id: 'int-byte-1',
    jobId: 'job-1',
    company: '字节跳动',
    role: 'AI 产品经理（搜索方向）',
    roundNumber: 1,
    roundName: '第1面 · 业务面',
    roundType: 'business',
    time: '2026-08-28 14:00',
    format: 'video',
    interviewer: '张明（搜索策略负责人）',
    supplementNotes: 'HR提醒关注大模型搜索评测、NDCG理解以及从0到1架构推进。',
    readinessPercent: 100,
    status: 'completed',
    preparation: {
      readinessPercent: 100,
      companyResearch: {
        background: '字节跳动搜索业务线，涵盖抖音搜索、头条搜索及新一代生成式 AI 搜索探索。',
        coreBusiness: '通用搜索、垂类内容搜索、大模型生成式搜索问答与多模态交互。',
        keyProducts: ['抖音搜索', '今日头条搜索', '豆包 AI 搜索模式'],
        relevantBusiness: 'AI 搜索业务团队，负责大模型搜索体验升级与问答召回重排。',
        recentNews: ['豆包上线深度搜索与多步推理模式', '字节加大 AI 搜索评测与数据基建投入'],
        aiHiringIntent: '【AI推测】团队目前正处于从传统搜索向生成式 AI 搜索转型的关键期，急需懂 Eval 体系且能把控算法质量底线的策略 PM。'
      },
      aiStrategy: {
        roundTypeDesc: '业务面核心考核业务匹配度、方法论成熟度与实际项目推进能力。',
        keyFocusAreas: [
          { name: '产品判断能力', importance: '★★★★★', desc: '考察面对模糊需求时的技术选型与优先级权衡' },
          { name: '项目推进能力', importance: '★★★★★', desc: '考察跨算法、工程、业务团队的落地推力' },
          { name: 'AI 产品与 Eval 理解', importance: '★★★★★', desc: '深度考核对大模型评测基准、幻觉控制的工业化实践' },
          { name: '数据分析能力', importance: '★★★★☆', desc: '考察对 NDCG、Recall、CTR 等核心指标的敏锐度' }
        ]
      },
      recommendedExperiences: [
        { experienceId: 'exp-1', recommendScore: 98, proves: ['AI产品能力', 'Eval体系', '数据分析', '项目推进'] },
        { experienceId: 'exp-2', recommendScore: 92, proves: ['Prompt工程', 'Agent平台', 'B端架构'] }
      ],
      highFreqQuestions: [
        {
          id: 'q-1',
          question: '介绍一下你做过的 AI 搜索评测项目，当初如何衡量质量好坏？',
          probabilityStars: 5,
          evaluationFocus: '项目真实性 / AI产品能力 / 评测标准严谨度',
          recommendedExperienceId: 'exp-1',
          isPrepared: true,
          preparedAnswer: {
            mode: 'logic',
            logicFlow: ['背景痛点', '三大评测维度', '双模型校验', '量化成果（-34.2%幻觉）'],
            keywords: ['Faithfulness', 'Answer Relevance', 'NDCG@5', 'LLM-as-a-Judge', '4小时'],
            aiReference: '以快知智能 15 个垂类搜索评测为例，围绕忠实度、答案相关性与上下文召回建立自动化裁判管线……',
            inScript: true
          }
        }
      ]
    },
    review: initialReviewByteRound1
  },
  {
    id: 'int-byte-2',
    jobId: 'job-1',
    company: '字节跳动',
    role: 'AI 产品经理（搜索方向）',
    roundNumber: 2,
    roundName: '第2面 · 技术/交叉业务面',
    roundType: 'tech',
    time: '明天 14:00',
    format: 'video',
    interviewer: '李伟（AI Lab 架构师 / 交叉面试官）',
    supplementNotes: '第一轮面试官反馈候选人业务能力强，本轮将重点考察技术底层理解、系统设计与复杂边界情况。',
    readinessPercent: 72,
    status: 'upcoming',
    preparation: {
      readinessPercent: 72,
      companyResearch: {
        background: '字节跳动 AI Lab 与搜索中台联合团队。',
        coreBusiness: '端到端检索与大模型混合排序管线、Vector Index 与 Cross-Encoder 性能平衡。',
        keyProducts: ['统一搜索架构中台', '豆包通用大模型底座'],
        relevantBusiness: '大模型搜索在复杂 Query（多意图、对比类、长尾知识）下的长程推理与检索优化。',
        recentNews: ['字节自研多模态检索算法在公开 Benchmark 刷新纪录'],
        aiHiringIntent: '【AI推测】考察候选人能否与顶尖算法架构师顺畅对话，避免 PM 成为只会提无理需求的"传话筒"。'
      },
      aiStrategy: {
        roundTypeDesc: '技术/交叉面核心考察算法底层机制理解、系统架构边界、复杂 Bad Case 归因与技术选型权衡。',
        keyFocusAreas: [
          { name: '技术底层原理', importance: '★★★★★', desc: '深入理解 RAG、Vector Embedding、Re-ranking 与 Attention 机制' },
          { name: '系统设计与边界', importance: '★★★★★', desc: '考察延迟 SLA（<800ms）、高并发下降级与缓存策略' },
          { name: 'Bad Case 归因推演', importance: '★★★★☆', desc: '给定具体搜索失效案例，给出结构化排查定位思路' },
          { name: '指标与实验科学性', importance: '★★★★☆', desc: '考察对 AB 实验显著性与指标冲突时的置信度平衡' }
        ]
      },
      recommendedExperiences: [
        { experienceId: 'exp-1', recommendScore: 95, proves: ['自动化管线', '算法校验机制', 'NDCG指标'] },
        { experienceId: 'exp-3', recommendScore: 92, proves: ['混合检索 Hybrid', 'Cross-Encoder重排', '延迟优化'] },
        { experienceId: 'exp-2', recommendScore: 88, proves: ['Token成本控制', '沙箱执行'] }
      ],
      highFreqQuestions: [
        {
          id: 'q-b2-1',
          question: '在大模型搜索中，当检索到的 Top-K 文档包含互相冲突的信息时，你作为 PM 会设计怎样的策略处理？',
          probabilityStars: 5,
          evaluationFocus: '冲突信息消歧 / 事实核验机制 / 置信度降级策略',
          recommendedExperienceId: 'exp-3',
          isPrepared: true,
          preparedAnswer: {
            mode: 'logic',
            logicFlow: [
              '1. 权威度权重优先（基于 Source Tiering 排序）',
              '2. 时间新鲜度校验（针对动态时效 Query）',
              '3. 明确呈现多元观点与争议（不强行合成单一答案）',
              '4. 低置信度场景主动触发溯源出处高亮'
            ],
            keywords: ['权威度分级', '时效性衰减', '多观点对齐', '事实溯源', '兜底拒答'],
            aiReference: '分四步处理：首先在检索层对信源进行 Tier 分级赋予不同权重；其次对时效敏感 Query 引入时间衰减因子；若无法裁定，在生成层以"存在不同观点"形式呈现，并提供溯源链接……',
            inScript: true
          }
        },
        {
          id: 'q-b2-2',
          question: '请详细阐述 Dense 向量检索与 Sparse 关键词检索（BM25）的优劣势，你们在什么场景下如何做加权融合？',
          probabilityStars: 5,
          evaluationFocus: '技术选型深度 / Hybrid Search 架构理解 / 实际工业落地调优',
          recommendedExperienceId: 'exp-3',
          isPrepared: true,
          preparedAnswer: {
            mode: 'keywords',
            logicFlow: [
              'Dense 擅长语义泛化与近义匹配，但在专有名词/SKU精准匹配上容易漂移；',
              'Sparse（BM25）对精确词、型号、长尾 Term 命中极准，但无法理解语义上下文；',
              '采用 RRF（Reciprocal Rank Fusion）或加权评分融合，并通过 Cross-Encoder 统一重排。'
            ],
            keywords: ['BM25 精确命中', 'Dense 语义泛化', 'RRF 倒数排名融合', 'Cross-Encoder 重排', '长尾专有名词'],
            aiReference: '在多模态问答项目中，我们发现纯向量检索在型号匹配上准确率不足 70%，因此引入了 BM25 配合 RRF 融合算法……',
            inScript: true
          }
        },
        {
          id: 'q-b2-3',
          question: '如果生成式搜索端到端耗时达到了 2.5 秒，而业务要求必须压到 1.2 秒内，你会从哪些环节做裁剪优化？',
          probabilityStars: 4,
          evaluationFocus: '系统工程优化思维 / 体验与性能折衷 / 流式输出与首字延迟',
          recommendedExperienceId: 'exp-1',
          isPrepared: false,
          preparedAnswer: {
            mode: 'logic',
            logicFlow: [
              '1. 分解耗时流水线（Query理解 200ms + 检索重排 500ms + LLM 首字 800ms + 生成 1000ms）',
              '2. 实施并发流水线化（Embedding 向量计算与 BM25 并行）',
              '3. 引入 Speculative Decoding 或小模型前置过滤',
              '4. 交互层采用流式打字机渲染，优化 TTFT（首字时间）感知'
            ],
            keywords: ['流水线并行', 'TTFT 首字延迟', '流式渲染', '小模型剪枝', '语义 Cache'],
            aiReference: '优化策略应从物理耗时与感知耗时双向切入。首先对 Query 缓存（Semantic Cache）进行命中拦截，对高频词实现 <100ms 秒开……',
            inScript: false
          }
        },
        {
          id: 'q-b2-4',
          question: '在上一轮业务面中面试官追问的"自动化评测自身可靠性问题"，本轮如果架构师深入追问，你打算如何回答？',
          probabilityStars: 5,
          evaluationFocus: '历史复盘沉淀 / 答辩闭环 / 算法稳定性',
          recommendedExperienceId: 'exp-1',
          isPrepared: false,
          preparedAnswer: {
            mode: 'verbatim',
            logicFlow: [],
            keywords: ['双模型交叉校验', '5% 黄金金标抽检', 'Cohen Kappa 一致性系数 0.88', 'Prompt 扰动鲁棒性'],
            aiReference: '我们在设计评测管线时，通过三个机制保证可靠性：一是 GPT-4 + Claude 3.5 双模型独立打分，分差大于 1 分时进入仲裁池；二是每周由业务专家对 5% 样本进行金标盲测，确保 Kappa 系数稳定在 0.88 以上；三是对评测 Prompt 注入对抗样本进行鲁棒性压测。',
            inScript: false
          }
        }
      ]
    }
  },
  {
    id: 'int-tencent-1',
    jobId: 'job-2',
    company: '腾讯',
    role: '产品经理（PCG 社交与 AI 助手）',
    roundNumber: 1,
    roundName: '第1面 · 业务面',
    roundType: 'business',
    time: '2026-09-04 16:00',
    format: 'video',
    interviewer: '陈总监',
    readinessPercent: 35,
    status: 'preparing',
    preparation: {
      readinessPercent: 35,
      companyResearch: {
        background: '腾讯 PCG 社交产品与 AI 助手技术中心。',
        coreBusiness: 'QQ、微信生态社交智能体、群聊助手与多模态创作。',
        keyProducts: ['QQ 智能群助手', '混元大模型 C 端助手'],
        relevantBusiness: '探索年轻态社交中的 AI 互动形态与情感陪伴交互。',
        recentNews: ['腾讯全面升级混元通用大模型底座'],
        aiHiringIntent: '【AI推测】重点需要具备多轮对话与知识库沉淀、同时懂得 C 端用户心智的复合型 PM。'
      },
      aiStrategy: {
        roundTypeDesc: '业务面注重社交场景敏感度、交互体验设计与留存指标。',
        keyFocusAreas: [
          { name: 'C端用户同理心', importance: '★★★★★', desc: '用户在社交场景下的真实表达与心理防线' },
          { name: '多轮对话体验', importance: '★★★★☆', desc: '上下文记忆与口语化拟人度' }
        ]
      },
      recommendedExperiences: [
        { experienceId: 'exp-3', recommendScore: 92, proves: ['多模态知识问答', '准确率', '长文档解析'] },
        { experienceId: 'exp-4', recommendScore: 85, proves: ['留存增长', '用户体验'] }
      ],
      highFreqQuestions: [
        {
          id: 'q-t1-1',
          question: '在社交场景下，如何避免 AI 助手回复过于生硬或机械化？',
          probabilityStars: 4,
          evaluationFocus: 'Prompt 拟人化 / 语气调优 / 情感计算',
          recommendedExperienceId: 'exp-2',
          isPrepared: false,
          preparedAnswer: {
            mode: 'logic',
            logicFlow: ['人设设定', 'Few-Shot 口语风格注入', '情感关键词感知'],
            keywords: ['Persona 人设', '情感共情', '口语化'],
            aiReference: '通过严格的 System Persona 定义、动态 Few-Shot 情绪样例以及上下文表情包推荐机制……',
            inScript: false
          }
        }
      ]
    }
  }
];

export const initialJobs: Job[] = [
  {
    id: 'job-1',
    company: '字节跳动',
    role: 'AI 产品经理',
    direction: '搜索与生成方向',
    department: '搜索业务中台',
    salaryRange: '40K–60K · 16薪',
    status: 'interviewing',
    matchScore: 92,
    applyDate: '2026-08-15',
    lastUpdated: '今天 10:20',
    currentStage: '第2面 · 业务技术交叉面',
    nextAction: '准备第二轮业务与技术交叉面（明天 14:00）',
    steps: {
      jdAnalysis: true,
      expMatched: true,
      customResume: true,
      applied: true,
      prepStage: 'in_progress',
      reviewStage: 'done'
    },
    jdAnalysisId: 'jd-byte-1',
    resumeId: 'res-byte-1',
    interviewIds: ['int-byte-1', 'int-byte-2']
  },
  {
    id: 'job-2',
    company: '腾讯',
    role: '产品经理',
    direction: 'PCG 社交与 AI 助手',
    department: 'PCG 社交平台部',
    salaryRange: '35K–50K · 15薪',
    status: 'interviewing',
    matchScore: 85,
    applyDate: '2026-08-18',
    lastUpdated: '昨天 15:40',
    currentStage: '第1面 · 业务面',
    nextAction: '开始准备第1面业务面（9月4日 16:00）',
    steps: {
      jdAnalysis: true,
      expMatched: true,
      customResume: true,
      applied: true,
      prepStage: 'in_progress',
      reviewStage: 'pending'
    },
    jdAnalysisId: 'jd-tencent-1',
    resumeId: 'res-byte-1',
    interviewIds: ['int-tencent-1']
  },
  {
    id: 'job-3',
    company: '某科技独角兽公司',
    role: 'AI 产品经理',
    direction: '端侧大模型与生产力工具',
    department: '智能终端创新实验室',
    salaryRange: '38K–55K · 14薪',
    status: 'pending',
    matchScore: 88,
    applyDate: '2026-08-25',
    lastUpdated: '3天前',
    currentStage: '待分析 JD & 制作定制简历',
    nextAction: '粘贴 JD 开始深度分析与 ATS 关键词提取',
    steps: {
      jdAnalysis: false,
      expMatched: false,
      customResume: false,
      applied: false,
      prepStage: 'pending',
      reviewStage: 'pending'
    },
    interviewIds: []
  }
];

export const initialNextActions: NextActionItem[] = [
  {
    id: 'act-1',
    jobId: 'job-1',
    company: '字节跳动',
    role: 'AI 产品经理',
    actionTitle: '完成第2面高频问题准备（剩余 2 题未完成）',
    dueDate: '明天 14:00',
    priority: 'high',
    targetTab: 'interview_prep_workspace',
    targetId: 'int-byte-2'
  },
  {
    id: 'act-2',
    jobId: 'job-1',
    company: '字节跳动',
    role: 'AI 产品经理',
    actionTitle: '沉淀第1面复盘建议至经历库（V3 -> V4 待确认）',
    dueDate: '今天之内',
    priority: 'high',
    targetTab: 'interview_review_detail',
    targetId: 'int-byte-1'
  },
  {
    id: 'act-3',
    jobId: 'job-2',
    company: '腾讯',
    role: '产品经理',
    actionTitle: '完善社交场景多轮对话准备方案',
    dueDate: '9月3日 18:00',
    priority: 'medium',
    targetTab: 'interview_prep_workspace',
    targetId: 'int-tencent-1'
  },
  {
    id: 'act-4',
    jobId: 'job-3',
    company: '某科技独角兽公司',
    role: 'AI 产品经理',
    actionTitle: '完成端侧大模型 JD 深度分析与能力缺口评估',
    dueDate: '本周五前',
    priority: 'normal',
    targetTab: 'jd_analysis'
  }
];

export const initialActivities: ActivityLog[] = [
  {
    id: 'actlog-1',
    type: 'review',
    title: '完成了「字节跳动 · 第1面业务面」智能复盘',
    desc: '识别出 12 组问答，生成了 3 条核心改进建议与经历版本 V4 提议',
    timestamp: '2小时前',
    jobId: 'job-1',
    actionText: '查看复盘报告',
    targetTab: 'interview_review_detail'
  },
  {
    id: 'actlog-2',
    type: 'prep',
    title: '更新了「字节跳动 · 第2面技术面」准备方案',
    desc: '新增了 2 道系统架构与冲突消歧高频题，准备度达到 72%',
    timestamp: '今天 09:15',
    jobId: 'job-1',
    actionText: '继续准备',
    targetTab: 'interview_prep_workspace'
  },
  {
    id: 'actlog-3',
    type: 'resume',
    title: '应用了 3 条 AI 简历润色建议',
    desc: '优化了「AI 搜索评测体系」关键词密度与量化指标表达',
    timestamp: '昨天 17:30',
    jobId: 'job-1',
    actionText: '查看简历',
    targetTab: 'resume_editor'
  },
  {
    id: 'actlog-4',
    type: 'jd',
    title: '生成了「腾讯 · 社交与 AI 助手」JD 分析报告',
    desc: '岗位匹配度 85%，推荐重点展示多模态知识问答与 RAG 经历',
    timestamp: '2天前',
    jobId: 'job-2',
    actionText: '查看 JD 分析',
    targetTab: 'jd_report'
  }
];

export const initialAISuggestions: AISuggestionCard[] = [
  {
    id: 'aisug-1',
    title: '第1面复盘反馈：建议立即更新经历资产 V4',
    description: '面试官重点考察了方案选型权衡依据，将此条补充至经历资产库后，可直接在明天的第2面中自动复用。',
    type: 'opportunity',
    actionText: '立即更新经历 V4 →',
    targetTab: 'interview_review_detail',
    jobId: 'job-1'
  },
  {
    id: 'aisug-2',
    title: '字节第2面技术面：建议重点准备系统延迟优化',
    description: '根据历史架构师面试数据，搜索与生成高并发下的 SLA（首字时间 TTFT）是必考题，已为你预生成回答提纲。',
    type: 'tip',
    actionText: '查看答题提纲 →',
    targetTab: 'interview_prep_workspace',
    jobId: 'job-1'
  },
  {
    id: 'aisug-3',
    title: '简历优化提示：有 1 条低相关工作内容可精简',
    description: '你的字节跳动定制简历中包含一条非核心后台审批描述，建议精简以突出 AI 核心算法协同权重。',
    type: 'warning',
    actionText: '前往简历精简 →',
    targetTab: 'resume_editor',
    jobId: 'job-1'
  }
];
