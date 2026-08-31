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
  AISuggestionCard,
  HistoricalResume
} from '../types/jobcraft';

export const initialUser: UserProfile = {
  name: '菁菁',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'AI 产品方向',
  targetSalary: '45K–65K',
  yearsOfExp: 5,
  city: '北京 / 远程',
  email: 'jing@email.com',
  phone: '138****6688',
  summary: '5年AI与搜索策略产品经验，主导过从0到1大模型评测体系、Prompt/Agent工作流平台与多模态RAG商业化落地。',
  targetCities: ['北京', '上海', '杭州', '远程'],
  targetCompanies: ['字节跳动', '腾讯', '阿里巴巴', '头部AI创企'],
  targetRoles: ['AI 产品经理', '大模型策略产品专家', '搜索与推荐产品负责人']
};

export const initialHistoricalResumes: HistoricalResume[] = [
  {
    id: 'hr-1',
    name: '2026_AI产品专家_通用底座简历_V3.2.pdf',
    uploadDate: '2026-08-20 14:32',
    fileSize: '1.4 MB',
    isDefault: true,
    parsedExperiencesCount: 5,
    format: 'pdf',
    tags: ['默认底座', 'AI产品', 'STAR解析完成']
  },
  {
    id: 'hr-2',
    name: '2025_搜索算法与推荐策略PM_底座版_V2.0.pdf',
    uploadDate: '2026-07-15 10:18',
    fileSize: '1.1 MB',
    isDefault: false,
    parsedExperiencesCount: 4,
    format: 'pdf',
    tags: ['策略产品', 'AB测试']
  },
  {
    id: 'hr-3',
    name: '端侧大模型与Agent架构_英文简历_V1.1.docx',
    uploadDate: '2026-06-08 19:45',
    fileSize: '820 KB',
    isDefault: false,
    parsedExperiencesCount: 3,
    format: 'docx',
    tags: ['英文简历', 'Global']
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-1',
    title: 'AI 搜索评测体系与质量自动化评估体系建设',
    category: 'project',
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
    category: 'project',
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
    category: 'work',
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
    category: 'work',
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
  },
  {
    id: 'exp-edu-1',
    title: '人工智能与软件工程 · 硕士学位',
    category: 'education',
    company: '清华大学',
    role: '计算机系 / 人工智能实验室',
    period: '2020.09 - 2023.06',
    background: '国家重点实验室大语言模型评测与多模态交互方向，主攻基于强化学习的人机协同决策。',
    responsibility: '作为课题组核心成员，主导大语言模型生成可信度基准测试与跨模态意图识别研究。',
    actions: [
      '参与国家自然科学基金重大研究课题，发表 2 篇 CCF-A 类顶会学术论文（第一作者/共同一作）；',
      '设计多模态交互数据集标注与自动化清洗标准，累计构建 10 万+ 高质量标注样本；',
      '担任学院研究生学生会副主席与算法实战竞赛主教练。'
    ],
    results: [
      '获得国家奖学金（Top 1%）、清华大学优秀毕业生称号；',
      '硕士学位论文被评为院系特等优秀毕业论文。'
    ],
    metrics: ['GPA 3.88/4.0 (Top 3%)', '2篇 CCF-A顶会论文', '国家奖学金', '10W+ 高质量样本'],
    capabilityTags: ['计算机硕研', '学术研究', 'LLM基准', '数据挖掘', '顶会论文'],
    targetJobs: ['字节跳动 · AI 产品经理', '腾讯 · 产品经理'],
    jdMatches: [
      { jdTitle: '字节跳动 · AI 产品经理', stars: 5 },
      { jdTitle: '腾讯 · 产品经理', stars: 5 }
    ],
    resumeVersionsUsed: ['字节跳动定制版 V2.1', '腾讯定制版 V1.2'],
    currentVersion: 'V1',
    versionHistory: []
  },
  {
    id: 'exp-edu-2',
    title: '计算机科学与技术 · 工学学士学位',
    category: 'education',
    company: '浙江大学',
    role: '计算机科学与技术学院',
    period: '2016.09 - 2020.06',
    background: '扎实修读数据结构、算法分析、计算机体系结构、操作系统与数据库系统原理。',
    responsibility: '系统化掌握软件工程与前后端研发全栈技术栈，具备强计算机技术底层素养。',
    actions: [
      '连续 3 年获得浙江大学一等学业奖学金与优秀学生干部荣誉；',
      '作为队长参与 ACM-ICPC 区域赛并斩获银牌；',
      '独立完成分布式数据索引与缓存加速毕业设计课题。'
    ],
    results: [
      '保送攻读清华大学硕士研究生（免试直推）；',
      '以专业前 5% 优异成绩顺利毕业。'
    ],
    metrics: ['GPA 3.82/4.0', '保送清华硕研', 'ACM银牌', '一等奖学金'],
    capabilityTags: ['计算机本科学历', '数据结构', '算法竞赛', '全栈技术', '工科学士'],
    targetJobs: ['字节跳动 · AI 产品经理', '腾讯 · 产品经理'],
    jdMatches: [
      { jdTitle: '字节跳动 · AI 产品经理', stars: 5 }
    ],
    resumeVersionsUsed: ['字节跳动定制版 V2.1'],
    currentVersion: 'V1',
    versionHistory: []
  },
  {
    id: 'exp-oth-1',
    title: '全国人工智能创新创业大赛 · 商业赛道全国一等奖',
    category: 'other',
    company: '中国人工智能学会 (CAAI)',
    role: '项目发起人 & 商业化负责人',
    period: '2024.08 - 2024.11',
    background: '面向中小企业客服与私域转化的端侧 AI 智能 Agent 解决方案，攻坚低算力场景的高质量交互。',
    responsibility: '全面统筹商业计划书编制、产品架构原型设计、商业模式推演与现场路演答辩。',
    actions: [
      '完成 30+ 家中小零售商家的痛点深度访谈，定义了极简可视化的提示词+知识库配置方案；',
      '带领 4 人技术团队完成 MVP 快速原型并实现百位种子用户闭环试用；',
      '在全国总决赛现场面对 10 位头部一线 VC 合伙人完成主旨路演答辩。'
    ],
    results: [
      '从全国 1200+ 支参赛队伍中脱颖而出，以总分第一斩获全国一等奖（奖金 10 万元）；',
      '获得 2 家一线早期风险投资机构意向投资 TS。'
    ],
    metrics: ['全国一等奖 (Top 1)', '1200+ 队伍竞逐', '30+ 商家深度访谈', '获得2家机构TS'],
    capabilityTags: ['创新大赛', '商业计划', '路演答辩', 'MVP原型', '用户洞察'],
    targetJobs: ['字节跳动 · AI 产品经理', '某科技公司 · AI 产品经理'],
    jdMatches: [
      { jdTitle: '某科技公司 · AI 产品经理', stars: 5 }
    ],
    resumeVersionsUsed: ['某科技公司定制版'],
    currentVersion: 'V1',
    versionHistory: []
  },
  {
    id: 'exp-oth-2',
    title: '开源大模型评测套件 LLM-Eval-Kit · 独立主创',
    category: 'other',
    company: 'GitHub Open Source Community',
    role: '开源创作者 & 维护者',
    period: '2024.03 - 至今',
    background: '开源社区缺乏开箱即用的轻量级中文大模型问答质量评估与事实性校验工具链。',
    responsibility: '独立设计并开源轻量级评估库，支持接入主流国产与海外大模型进行端到端批量打分。',
    actions: [
      '使用 Python + FastEval 编写核心打分引擎，撰写完备的中文文档与多场景 Demo 指引；',
      '在知乎与技术社区撰写多篇评测方法论深度长文，累计获得 50W+ 阅读与万次收藏；',
      '主导社区 Pull Request 审核与版本迭代，吸纳 15 位核心代码贡献者。'
    ],
    results: [
      'GitHub 累计斩获 1,800+ Stars 与 320+ Forks；',
      '被多家 AI 初创公司采纳为内部模型日常测试的基础依赖组件。'
    ],
    metrics: ['1.8k+ GitHub Stars', '50W+ 技术阅读', '15位代码贡献者', '320+ Forks'],
    capabilityTags: ['开源项目', '技术影响力', 'Python', 'Eval工具链', '开发者生态'],
    targetJobs: ['字节跳动 · AI 产品经理'],
    jdMatches: [
      { jdTitle: '字节跳动 · AI 产品经理', stars: 5 }
    ],
    resumeVersionsUsed: ['字节跳动定制版 V2.1'],
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
  role: 'AI 产品经理',
  roundName: '第1面 · 业务面',
  reviewDate: '2026-09-01',
  duration: '共 54 分钟',
  overallScore: 74,
  passProbability: '通过概率较高 (约 82%)',
  totalQACount: 12,
  highlights: [
    '熟练掌握大模型评测标准设计（Faithfulness、ROUGE、NDCG），专业度获面试官肯定；',
    '回答语速适中，能够紧扣 AI 产品经理核心业务痛点与技术落地展开。'
  ],
  drawbacks: [
    '技术方案选型（纯规则 vs 大模型裁判）对比权衡展开不足；',
    '核心项目成果缺少硬核量化数据背书。'
  ],
  competencies: [
    { name: '岗位匹配', score: 86, benchmark: 80 },
    { name: '专业深度', score: 78, benchmark: 82 },
    { name: '回答结构', score: 72, benchmark: 78 },
    { name: '表达清晰', score: 74, benchmark: 75 }
  ],
  coreProblems: [
    '① 产品决策依据表达不足，面试官追问时缺少方案选择背景',
    '② 技术理解回答不够深入，停留在现象描述而非原理层',
    '③ 项目结果缺少量化数据，导致说服力偏弱'
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
      question: '介绍一个你从 0 到 1 做过的 AI 产品案例',
      duration: '4:32',
      score: 88,
      candidateAnswer: '好的，我来介绍一个去年我在前公司独立负责的 AI 搜索评测体系项目。背景是：当时团队有很多 AI 搜索相关的迭代，但没有系统性的评估方法，每次判断效果都靠人肉测试，非常低效，而且标准不统一。我负责建立一套完整的评估 pipeline。我做了三件事：第一，制定了基于 nDCG 和 MRR 的评估指标体系；第二，主导了 2000 条标注数据集的建设；第三，和算法团队一起搭了自动化的评测流程。最后的结果是评估效率提升了 4 倍，也把召回率的优化方向变得更可量化，最终召回率提升了 15%。',
      transcript: `"好的，我来介绍一个去年我在前公司独立负责的 AI 搜索评测体系项目。\n\n背景是：当时团队有很多 AI 搜索相关的迭代，但没有系统性的评估方法，每次判断效果都靠人肉测试，非常低效，而且标准不统一。\n\n我负责建立一套完整的评估 pipeline。我做了三件事：第一，制定了基于 nDCG 和 MRR 的评估指标体系；第二，主导了 2000 条标注数据集的建设；第三，和算法团队一起搭了自动化的评测流程。\n\n最后的结果是评估效率提升了 4 倍，也把召回率的优化方向变得更可量化，最终召回率提升了 15%。"`,
      metricCards: {
        clarityScore: 92,
        clarityDesc: 'STAR 结构完整，逻辑层次清晰',
        impactScore: 85,
        impactDesc: '引用了具体指标，但可以更精确',
        decisionScore: 80,
        decisionDesc: '提及了 trade-off，但深度略浅',
        fluencyScore: 88,
        fluencyDesc: '表达清晰，偶有停顿'
      },
      interviewerIntent: {
        mainPoints: ['考察候选人是否有从 0 到 1 的完整产品经验', '是否能用数据量化 Impact 并做取舍', '是否能在不确定中持续推进产品落地'],
        importanceStars: 5,
        productAbilityStars: 5,
        techDepthStars: 4,
        intentItems: [
          {
            title: '产品完整性',
            stars: 5,
            desc: '考察候选人是否有从 0 到 1 的完整产品经验'
          },
          {
            title: '数据意识',
            stars: 4,
            desc: '是否能用数据量化 Impact 并做取舍'
          },
          {
            title: '推动力',
            stars: 3,
            desc: '是否能在不确定中持续推进产品落地'
          }
        ]
      },
      answerAnalysis: {
        completeness: 88,
        structure: 92,
        persuasiveness: 85,
        jobRelevance: 90,
        clarity: 92,
        impact: 85,
        decision: 80,
        fluency: 88
      },
      identifiedIssues: ['方案选型对比（为何放弃纯规则）展开略浅', '可进一步补充如何解决大模型自身评测偏差'],
      suggestionAdvice: '建议在 1 分钟内补充双模型交叉判别机制，说明如何用 5% 金标抽检确保评测一致性达到 94.1%。',
      relatedExperienceId: 'exp-1'
    },
    {
      id: 'qa-2',
      qIndex: 2,
      question: '你如何平衡用户需求和业务目标？',
      duration: '3:15',
      score: 72,
      candidateAnswer: '在日常工作中，用户需求往往偏向于体验与即时满足，而业务目标关注商业变现和留存。我的做法是建立统一的优先级评估矩阵（RICE 模型），对需求进行影响力与开发成本评分，同时设立体验底线红线指标。',
      transcript: `"在日常工作中，用户需求往往偏向于体验与即时满足，而业务目标关注商业变现和留存。我的做法是建立统一的优先级评估矩阵（RICE 模型），对需求进行影响力与开发成本评分，同时设立体验底线红线指标。当商业化变现与搜索相关性冲突时，以相关性 NPS 不跌破 75 分为硬性约束。"`,
      metricCards: {
        clarityScore: 78,
        clarityDesc: '有明确的方法论框架，逻辑顺畅',
        impactScore: 68,
        impactDesc: '缺少实际项目中冲突妥协的量化案例',
        decisionScore: 70,
        decisionDesc: '权衡逻辑较为常规，缺少极端场景取舍',
        fluencyScore: 74,
        fluencyDesc: '表达较稳定，略显理论化'
      },
      interviewerIntent: {
        mainPoints: ['商业敏感度与业务大局观', '需求优先级决策机制', '冲突管理与说服能力'],
        importanceStars: 4,
        productAbilityStars: 4,
        techDepthStars: 3,
        intentItems: [
          {
            title: '商业敏感度',
            stars: 5,
            desc: '考察对商业指标与产品体验平衡的掌控力'
          },
          {
            title: '决策框架',
            stars: 4,
            desc: '是否有成体系的优先级判定与取舍原则'
          },
          {
            title: '实战经验',
            stars: 3,
            desc: '是否经历过真实的业务对抗与两难抉择'
          }
        ]
      },
      answerAnalysis: {
        completeness: 72,
        structure: 78,
        persuasiveness: 68,
        jobRelevance: 75,
        clarity: 78,
        impact: 68,
        decision: 70,
        fluency: 74
      },
      identifiedIssues: ['回答停留在理论模型层面，缺乏具体的商业对抗实操案例'],
      suggestionAdvice: '建议举出一个具体的变现点位测试案例，例如在搜索首屏插入生成式卡片时，如何在 CTR 与用户停留时长之间做灰度实验平衡。',
      relatedExperienceId: 'exp-2'
    },
    {
      id: 'qa-3',
      qIndex: 3,
      question: '你对字节搜索 AI 化的看法？',
      duration: '2:48',
      score: 64,
      candidateAnswer: '我觉得字节搜索 AI 化是必然趋势，豆包大模型的融入可以让搜索从单纯的信息检索转变为直接给出答案与生成式解决方案。重点在于如何把抖音的短视频多模态生态与大模型知识库结合起来。',
      transcript: `"我觉得字节搜索 AI 化是必然趋势，豆包大模型的融入可以让搜索从单纯的信息检索转变为直接给出答案与生成式解决方案。重点在于如何把抖音的短视频多模态生态与大模型知识库结合起来，提升长尾问答的满足率。"`,
      metricCards: {
        clarityScore: 70,
        clarityDesc: '观点明确，但论据展开不够充分',
        impactScore: 60,
        impactDesc: '缺乏对字节业务现状与竞品格局的深度分析',
        decisionScore: 62,
        decisionDesc: '停留于行业宏观共识，缺少独到洞察',
        fluencyScore: 68,
        fluencyDesc: '用词较为泛化，缺少技术术语支撑'
      },
      interviewerIntent: {
        mainPoints: ['对字节业务与生态的理解深度', '行业洞察与前瞻视野', '对生成式搜索技术瓶颈的认知'],
        importanceStars: 5,
        productAbilityStars: 4,
        techDepthStars: 5,
        intentItems: [
          {
            title: '业务洞察',
            stars: 5,
            desc: '是否真正研究过字节搜索的业务现状与核心诉求'
          },
          {
            title: '技术视野',
            stars: 4,
            desc: '对多模态搜索、RAG 延迟与成本瓶颈的认知'
          },
          {
            title: '产品构想',
            stars: 3,
            desc: '是否具备差异化创新的产品策略构想'
          }
        ]
      },
      answerAnalysis: {
        completeness: 64,
        structure: 70,
        persuasiveness: 60,
        jobRelevance: 68,
        clarity: 70,
        impact: 60,
        decision: 62,
        fluency: 68
      },
      identifiedIssues: ['回答停留在通用套话，没有结合字节豆包大模型与抖音短视频生态给出独到策略'],
      suggestionAdvice: '建议从「视频语义切片检索」、「端到端多模态问答」与「大模型推理延迟成本控制」三个技术业务切入点深入阐述。',
      relatedExperienceId: 'exp-3'
    },
    {
      id: 'qa-4',
      qIndex: 4,
      question: '最有挑战的经历是什么？如何克服的？',
      duration: '3:54',
      score: 81,
      candidateAnswer: '最有挑战的是在资源极其有限的情况下，需要在一个月内完成首版评测系统上线。当时算法团队对评测指标质疑很大，我通过组织 3 轮 Bad Case 盲测对齐，并引入 Kappa 一致性度量指标，最终说服算法采纳标准。',
      transcript: `"最有挑战的是在资源极其有限的情况下，需要在一个月内完成首版评测系统上线。当时算法团队对评测指标质疑很大，双方标准不统一。我主导了 3 轮 Bad Case 盲测对齐，并引入 Kappa 一致性度量指标，将人机打分一致率提升到 94.1%，最终平息争议并按期上线。"`,
      metricCards: {
        clarityScore: 85,
        clarityDesc: '情境-任务-行动-结果完整，重点突出',
        impactScore: 82,
        impactDesc: '给出了 94.1% 一致率等量化证据',
        decisionScore: 80,
        decisionDesc: '展现了冲突化解与技术说服能力',
        fluencyScore: 80,
        fluencyDesc: '叙述流畅，情感充沛'
      },
      interviewerIntent: {
        mainPoints: ['逆境中的抗压与执行力', '跨团队冲突仲裁能力', '技术方案的可解释性与公信力'],
        importanceStars: 4,
        productAbilityStars: 4,
        techDepthStars: 4,
        intentItems: [
          {
            title: '抗压力与交付',
            stars: 5,
            desc: '在极端时间与资源限制下的交付确定性'
          },
          {
            title: '协同仲裁',
            stars: 4,
            desc: '如何用客观数据说服强势技术团队'
          }
        ]
      },
      answerAnalysis: {
        completeness: 81,
        structure: 85,
        persuasiveness: 82,
        jobRelevance: 84,
        clarity: 85,
        impact: 82,
        decision: 80,
        fluency: 80
      },
      identifiedIssues: ['对克服困难后的团队沉淀与复用机制展开略简'],
      suggestionAdvice: '可补充这套盲测对齐流程后来被固化为团队每周常规评测 SOP。',
      relatedExperienceId: 'exp-1'
    },
    {
      id: 'qa-5',
      qIndex: 5,
      question: '如何推动跨团队协作中的阻力？',
      duration: '2:10',
      score: 56,
      candidateAnswer: '主要是多开会沟通，找双方领导拉齐目标，如果推进不下去就找上级仲裁。平时多了解对方的 KPI 诉求，尽量在需求中兼顾对方的利益。',
      transcript: `"主要是多开会沟通，找双方领导拉齐目标，如果推进不下去就找上级仲裁。平时多了解对方的 KPI 诉求，尽量在需求中兼顾对方的利益。"`,
      metricCards: {
        clarityScore: 62,
        clarityDesc: '思路较为被动，依赖升级机制',
        impactScore: 50,
        impactDesc: '缺少通过数据与技术共鸣主动破局的手段',
        decisionScore: 52,
        decisionDesc: '未体现高级 PM 的组织影响力',
        fluencyScore: 65,
        fluencyDesc: '篇幅过短，内容偏薄弱'
      },
      interviewerIntent: {
        mainPoints: ['自驱影响力', '非职权领导力', '复杂跨部门博弈策略'],
        importanceStars: 4,
        productAbilityStars: 5,
        techDepthStars: 2,
        intentItems: [
          {
            title: '自驱影响力',
            stars: 5,
            desc: '是否具备不依赖上级施压的主动破局能力'
          },
          {
            title: '利益对齐',
            stars: 4,
            desc: '能否把产品目标转化为合作团队的共同战果'
          }
        ]
      },
      answerAnalysis: {
        completeness: 56,
        structure: 62,
        persuasiveness: 50,
        jobRelevance: 60,
        clarity: 62,
        impact: 50,
        decision: 52,
        fluency: 65
      },
      identifiedIssues: ['过度依赖“找领导升级”，在字节扁平文化中容易被视为推进力偏弱'],
      suggestionAdvice: '重塑回答：“首先将共同问题拆解为数据指标（如召回率瓶颈），主动为算法团队提供高质量 Benchmark 数据资产，用降低他们调试成本的方式变阻力为合力。”',
      relatedExperienceId: 'exp-2'
    },
    {
      id: 'qa-6',
      qIndex: 6,
      question: '你为什么选择 AI 产品方向？',
      duration: '1:52',
      score: 79,
      candidateAnswer: '因为大模型带来了人机交互和生产力工具的底层重塑。传统软件时代我们只能定义确定性规则，而 AI 时代我们需要设计概率性系统的交互容错与反馈闭环，这对我来说极具挑战性和吸引力。',
      transcript: `"因为大模型带来了人机交互和生产力工具的底层重塑。传统软件时代我们只能定义确定性规则，而 AI 时代我们需要设计概率性系统的交互容错与反馈闭环，这对我来说极具挑战性和吸引力。我在研究生期间就专攻 NLP，一直希望把技术转化为真实业务价值。"`,
      metricCards: {
        clarityScore: 82,
        clarityDesc: '热爱与理性思考兼备，动机纯粹清晰',
        impactScore: 75,
        impactDesc: '点出了确定性向概率性转变的本质',
        decisionScore: 78,
        decisionDesc: '职业发展规划连贯性好',
        fluencyScore: 82,
        fluencyDesc: '自信真诚，逻辑自洽'
      },
      interviewerIntent: {
        mainPoints: ['职业自驱力与稳定性', '对 AI 产品本质的认知', '长期发展潜力'],
        importanceStars: 3,
        productAbilityStars: 4,
        techDepthStars: 3,
        intentItems: [
          {
            title: '职业自驱力',
            stars: 4,
            desc: '对 AI 行业的真诚热爱与长期投入意愿'
          },
          {
            title: '认知深度',
            stars: 4,
            desc: '是否理解 AI 产品的概率性与不确定性本质'
          }
        ]
      },
      answerAnalysis: {
        completeness: 79,
        structure: 82,
        persuasiveness: 78,
        jobRelevance: 80,
        clarity: 82,
        impact: 75,
        decision: 78,
        fluency: 82
      },
      identifiedIssues: ['可进一步结合字节的具体业务场景表达向往'],
      suggestionAdvice: '可在结尾补充希望在字节亿级用户场景下，探索生成式交互如何真正走进大众日常生活。',
      relatedExperienceId: 'exp-1'
    },
    {
      id: 'qa-7',
      qIndex: 7,
      question: '如何衡量 AI 产品的成功？',
      duration: '3:08',
      score: 85,
      candidateAnswer: '衡量 AI 产品不能只看模型层面的准确率，必须分三层体系：第一层是底层模型指标（Faithfulness、幻觉率、延迟）；第二层是交互层满意度（无编辑采纳率、单次会话完成率）；第三层是终极商业价值（ROI、留存率、单位任务成本节省）。',
      transcript: `"衡量 AI 产品不能只看模型层面的准确率，必须分三层体系：第一层是底层模型指标（Faithfulness、幻觉率、延迟）；第二层是交互层满意度（无编辑采纳率、单次会话完成率）；第三层是终极商业价值（ROI、留存率、单位任务成本节省）。只有三层形成正向数据飞轮，产品才算真正成功。"`,
      metricCards: {
        clarityScore: 88,
        clarityDesc: '分层指标体系非常完整，逻辑极强',
        impactScore: 84,
        impactDesc: '点出了无编辑采纳率等关键高阶指标',
        decisionScore: 82,
        decisionDesc: '兼顾技术效果与商业闭环',
        fluencyScore: 86,
        fluencyDesc: '结构层次分明，表达精练'
      },
      interviewerIntent: {
        mainPoints: ['指标量化设计能力', '业务闭环与 ROI 意识', '全局产品视野'],
        importanceStars: 5,
        productAbilityStars: 5,
        techDepthStars: 4,
        intentItems: [
          {
            title: '指标体系设计',
            stars: 5,
            desc: '能否建立从模型到业务的端到端北极星指标体系'
          },
          {
            title: '商业 ROI 闭环',
            stars: 4,
            desc: '是否注重算力成本与业务收益的经济学平衡'
          }
        ]
      },
      answerAnalysis: {
        completeness: 85,
        structure: 88,
        persuasiveness: 84,
        jobRelevance: 88,
        clarity: 88,
        impact: 84,
        decision: 82,
        fluency: 86
      },
      identifiedIssues: ['可补充一个反向案例：模型指标提升但业务指标下滑时如何归因'],
      suggestionAdvice: '表现优异，可直接作为标准模版在二面继续保持。',
      relatedExperienceId: 'exp-1'
    },
    {
      id: 'qa-8',
      qIndex: 8,
      question: '大模型幻觉问题在搜索场景如何治理？',
      duration: '3:20',
      score: 83,
      candidateAnswer: '搜索场景对幻觉零容忍。我的治理框架分为检索前、生成中、生成后三道防线。检索前做意图分类与高置信度召回；生成中做 Grounding 强约束 Prompt 与思维链校验；生成后做自洽性验证与基于 Fact-Checking 的事实验证模型过滤。',
      transcript: `"搜索场景对幻觉零容忍。我的治理框架分为三道防线：检索前通过混合检索与语义重排确保上下文高质量；生成中采用基于引用锚点的 Constrained Generation；生成后引入轻量级 NLI 模型做蕴含校验，未通过的降级为结构化卡片展示。"`,
      metricCards: {
        clarityScore: 86,
        clarityDesc: '三道防线体系清晰，工程化落地性强',
        impactScore: 80,
        impactDesc: '降级机制设计合理，兼顾体验安全',
        decisionScore: 82,
        decisionDesc: '对 NLI 校验与延迟权衡有深刻认知',
        fluencyScore: 84,
        fluencyDesc: '术语精准，表达流畅'
      },
      interviewerIntent: {
        mainPoints: ['大模型技术原理掌握', '工程化落地与安全防护', '用户体验降级策略'],
        importanceStars: 5,
        productAbilityStars: 4,
        techDepthStars: 5,
        intentItems: [
          {
            title: '技术深度',
            stars: 5,
            desc: '对 RAG 与幻觉抑制算法原理的理解程度'
          },
          {
            title: '风控与降级',
            stars: 4,
            desc: '在极端坏例下的容灾与安全保底策略'
          }
        ]
      },
      answerAnalysis: {
        completeness: 83,
        structure: 86,
        persuasiveness: 80,
        jobRelevance: 86,
        clarity: 86,
        impact: 80,
        decision: 82,
        fluency: 84
      },
      identifiedIssues: ['缺少对高并发下 NLI 验证延迟成本的量化数据'],
      suggestionAdvice: '补充说明通过异步校验与冷热分流，将整体搜索首字 P99 延迟控制在 800ms 以内。',
      relatedExperienceId: 'exp-3'
    },
    {
      id: 'qa-9',
      qIndex: 9,
      question: '如果算法上线后核心指标下滑，你如何排查与决策？',
      duration: '2:45',
      score: 70,
      candidateAnswer: '首先立即停止全量放量，回滚至上一稳定版本。随后抓取实验组与对照组的分流日志，按照 Query 频次与垂类做切片分析，定位是召回问题、重排问题还是大模型生成断流。',
      transcript: `"首先立即停止全量放量并保护核心大盘。随后抓取两组分流日志，从三大维度排查：分流随机性与实验配置；Query 垂类切片（如长尾搜索 vs 头部词）；模型链路各个阶段的 Bad Case 归因。确认根因后再制定专项修复计划。"`,
      metricCards: {
        clarityScore: 76,
        clarityDesc: '排查顺序合乎规范，具备基本的工程素养',
        impactScore: 68,
        impactDesc: '对业务指标与算法指标的联动分析略欠深入',
        decisionScore: 68,
        decisionDesc: '回滚决策果断，但缺少止损灰度分级机制',
        fluencyScore: 72,
        fluencyDesc: '表达正常，稍有平淡'
      },
      interviewerIntent: {
        mainPoints: ['线上故障应急与抗压能力', 'AB 实验分析深度', '数据归因方法论'],
        importanceStars: 4,
        productAbilityStars: 4,
        techDepthStars: 4,
        intentItems: [
          {
            title: '应急处置',
            stars: 4,
            desc: '线上异常指标的止损与快速响应机制'
          },
          {
            title: '归因深度',
            stars: 4,
            desc: '能否多维度多切片穿透数据异常表象'
          }
        ]
      },
      answerAnalysis: {
        completeness: 70,
        structure: 76,
        persuasiveness: 68,
        jobRelevance: 72,
        clarity: 76,
        impact: 68,
        decision: 68,
        fluency: 72
      },
      identifiedIssues: ['排查流程偏通用，缺少对 LLM 专属特征（如 Token 截断、Prompt 注入）的针对性排查'],
      suggestionAdvice: '增加针对大模型生成特性（如 Temperature 漂移或第三方 API 抖动）的排查逻辑。',
      relatedExperienceId: 'exp-1'
    },
    {
      id: 'qa-10',
      qIndex: 10,
      question: '讲讲你在 Prompt 工程或 Agent 流程设计中的踩坑经验',
      duration: '3:10',
      score: 86,
      candidateAnswer: '最典型的坑是"Prompt 越写越长导致指令遵循度下降和 Token 成本激增"。后来我们将庞杂的 System Prompt 拆解为 Router + Multi-Agent 架构，每个 Agent 专精一个单一职责，准确率提升了 28%，成本降低 40%。',
      transcript: `"最典型的坑是早期把所有规则堆在一个几千 Token 的 System Prompt 里，导致模型出现'Attention 遗忘'和指令冲突。我们的解决方案是重构为 Multi-Agent 状态机，Router 负责意图分发，下游分别调用检索 Agent、推理 Agent 和格式化 Agent，整体稳定性大幅提升。"`,
      metricCards: {
        clarityScore: 90,
        clarityDesc: '问题定义清晰，重构方案与对比数据翔实',
        impactScore: 86,
        impactDesc: '28% 准确率提升与 40% 成本优化很有说服力',
        decisionScore: 84,
        decisionDesc: '架构演进思路符合工业界最佳实践',
        fluencyScore: 85,
        fluencyDesc: '条理清晰，技术沉淀扎实'
      },
      interviewerIntent: {
        mainPoints: ['真实的工程调优经验', '对 LLM 上下文注意力特性的理解', '架构重构魄力'],
        importanceStars: 5,
        productAbilityStars: 4,
        techDepthStars: 5,
        intentItems: [
          {
            title: '实战避坑',
            stars: 5,
            desc: '考察是否在复杂 Agent 系统中有过深度踩坑与优化实操'
          },
          {
            title: '架构抽象',
            stars: 4,
            desc: '能否把复杂业务流抽象为高内聚低耦合的 Agent 链路'
          }
        ]
      },
      answerAnalysis: {
        completeness: 86,
        structure: 90,
        persuasiveness: 86,
        jobRelevance: 88,
        clarity: 90,
        impact: 86,
        decision: 84,
        fluency: 85
      },
      identifiedIssues: ['可进一步说明 Multi-Agent 链路之间的延迟开销是如何优化的'],
      suggestionAdvice: '补充说明通过并行调用与异步流式输出，将端到端延迟维持在 1.5s 以内。',
      relatedExperienceId: 'exp-2'
    },
    {
      id: 'qa-11',
      qIndex: 11,
      question: '如何看待当前生成式搜索的商业化与变现路径？',
      duration: '2:30',
      score: 68,
      candidateAnswer: '生成式搜索直接给出答案会挤压传统搜索广告的点击展示空间。未来的变现路径主要在三个方向：第一是答案中的智能商品推荐与服务履约卡片；第二是针对专业深度内容的付费订阅；第三是企业级垂直知识搜索的 API 计费。',
      transcript: `"生成式搜索直接给出答案会挤压传统列表广告空间。我认为未来的变现核心是'从流量中介走向交易履约'：在生成答案中嵌入高相关性的原生商品卡与服务流，按成交 CPS 分成；同时结合意图识别为高净值用户提供专业研报与深度对比付费模式。"`,
      metricCards: {
        clarityScore: 74,
        clarityDesc: '商业思考方向正确，结构清晰',
        impactScore: 65,
        impactDesc: '缺少对广告主投放意愿与 CPM 测算的深入探讨',
        decisionScore: 66,
        decisionDesc: '观点偏行业共识，缺少突破性解法',
        fluencyScore: 70,
        fluencyDesc: '表达正常'
      },
      interviewerIntent: {
        mainPoints: ['商业嗅觉与变现模式设计', '颠覆性技术对现有商业帝国的冲击反思'],
        importanceStars: 4,
        productAbilityStars: 4,
        techDepthStars: 3,
        intentItems: [
          {
            title: '商业化构想',
            stars: 4,
            desc: '对 AI 搜索商业变现与经济模型的理解'
          },
          {
            title: '生态推演',
            stars: 4,
            desc: '能否平衡搜索广告收入与用户直接获取答案的体验'
          }
        ]
      },
      answerAnalysis: {
        completeness: 68,
        structure: 74,
        persuasiveness: 65,
        jobRelevance: 70,
        clarity: 74,
        impact: 65,
        decision: 66,
        fluency: 70
      },
      identifiedIssues: ['缺少对传统搜索大厂变现困境与创新者窘境的深入剖析'],
      suggestionAdvice: '可引入 Perplexity 的品牌赞助问题与电商佣金闭环作为具体参照物展开。',
      relatedExperienceId: 'exp-2'
    },
    {
      id: 'qa-12',
      qIndex: 12,
      question: '你有什么问题想向我提问的反问环节？',
      duration: '2:05',
      score: 82,
      candidateAnswer: '我想请教面试官两个问题：第一，目前团队在多模态（图文/视频）生成式搜索方向，最核心的技术瓶颈是召回准确率还是推理延迟？第二，这个业务在字节当前战略序列里的优先级以及期望新加入的同学在入职前三个月达成的关键里程碑是什么？',
      transcript: `"我想请教两个问题：第一，目前团队在生成式搜索落地中，核心攻坚点是多模态特征召回还是端到端推理成本优化？第二，您期望新加入的同学在入职前三个月独立主导并交付的关键业务里程碑是什么？"`,
      metricCards: {
        clarityScore: 86,
        clarityDesc: '问题专业且极具针对性，展现了极强的务实态度',
        impactScore: 80,
        impactDesc: '直击团队核心痛点与岗位期望',
        decisionScore: 82,
        decisionDesc: '提问显露出对业务落地的主动思考',
        fluencyScore: 82,
        fluencyDesc: '提问得体，态度谦逊专业'
      },
      interviewerIntent: {
        mainPoints: ['候选人的真实求职意向与成熟度', '对团队业务痛点的敏感度'],
        importanceStars: 4,
        productAbilityStars: 4,
        techDepthStars: 4,
        intentItems: [
          {
            title: '求职动机与务实度',
            stars: 5,
            desc: '通过反问体现候选人的专业段位与落地决心'
          }
        ]
      },
      answerAnalysis: {
        completeness: 82,
        structure: 86,
        persuasiveness: 80,
        jobRelevance: 85,
        clarity: 86,
        impact: 80,
        decision: 82,
        fluency: 82
      },
      identifiedIssues: ['提问质量很高，展现了成熟的产品思维'],
      suggestionAdvice: '保持该提问策略，在二面及 HR 面均可复用。',
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
