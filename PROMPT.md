# JobCraft UI 项目开发提示词

## 项目概述
这是一个基于 React 19 + TypeScript + Vite + Tailwind CSS 4 的求职辅助应用，名为 JobCraft UI。项目使用 Google GenAI 进行智能分析。

## 技术栈
- React 19 + TypeScript
- Vite 构建工具
- Tailwind CSS 4（使用 @theme token 系统）
- Google GenAI
- Lucide React 图标库

## 颜色主题系统
项目使用 Tailwind v4 的 @theme token 系统定义颜色：

```css
@theme {
  --color-sage: #3E6256;
  --color-sage-dim: #345449;
  --color-sage-soft: #E5EEE9;
  --color-page: #F5F5F2;
  --color-canvas: #FFFFFF;
  --color-rail: #202421;
  --color-rail-hover: #2A302C;
  --color-ink: #202421;
  --color-muted: #737873;
  --color-faint: #A8ADA8;
  --color-edge: #E4E5E0;
  --color-edge-deep: #D0D2CB;
  --color-terra: #C8D8D1;
  --color-terra-soft: #F5FAF7;
  --color-hazard: #D0D2CB;
  --color-hazard-soft: #FAFAF8;
}
```

## 已实现的核心组件

### 1. 新建面试准备 - 模态框形式
**文件**: `src/components/interview/NewInterviewModal.tsx`

**Props 接口**:
```typescript
interface Props {
  isOpen: boolean;
  jobId?: string;
  mode: 'standalone' | 'from-job';
  onClose: () => void;
}
```

**功能特性**:
- **standalone 模式（4步）**: 关联岗位 → 面试详情 → 关联简历 → 补充信息
- **from-job 模式（3步）**: 面试详情 → 关联简历 → 补充信息
- 遮罩层自适应整个屏幕
- localStorage 草稿保存和恢复
- 新建岗位功能（直接创建或跳转到JD分析页面）
- AI生成动画（逐步打勾效果）

### 2. 新建面试准备 - 全页面向导形式
**文件**: `src/pages/CreateInterview.tsx`

**功能特性**:
- 页面容器：max-width 680px，水平居中
- 4步流程：关联岗位 → 应聘信息 → 面试信息 → 补充信息
- 步骤指示器：圆圈 + 连接线 + 步骤名称
- 表单卡片：白色背景，#E4E5E0 边框，14px 圆角
- 底部操作栏：步骤计数器 + 下一步/创建按钮

**步骤详解**:

**步骤0 - 关联岗位**:
- 岗位列表（可点击卡片）
- "+ 新建岗位"按钮（展开表单）
- "去JD分析页面创建"按钮（保存草稿并跳转）

**步骤1 - 应聘信息**:
- 关联岗位（只读显示）
- 简历版本切换（AI定制版/通用版）
- 投递附言（可选文本框）

**步骤2 - 面试信息**:
- 面试轮次、类型、日期、时间
- 面试形式、平台、面试官信息

**步骤3 - 补充信息**:
- 补充说明文本框
- 提醒上传录音复选框
- AI预览框（5项生成内容）
- AI生成动画

### 3. 新建面试复盘 - 全页面向导形式
**文件**: `src/pages/CreateReview.tsx`

**功能特性**:
- 页面容器：max-width 620px，水平居中
- 3步流程：关联面试 → 面试信息 → 上传记录

**步骤详解**:

**步骤0 - 关联面试**:
- 模式A：关联已有岗位（下拉选择卡片）
- 模式B：暂不关联岗位（自定义radio按钮）

**步骤1 - 面试信息**:
- 场景A：有岗位且有面试记录 → 选择面试卡片
- 场景B：无岗位/新建模式 → 手动填写表单

**步骤2 - 上传记录**:
- 上传模式切换（上传文件/粘贴文本）
- 文件拖拽上传区域
- 文本粘贴区域（带字数统计）
- AI分析预览框（5项标签）

**分析动画**:
- 5个步骤纵向排列
- 每步600ms自动推进
- 已完成：绿色✓ + #4A6559文字
- 进行中：绿色实心圆（带光晕）+ #202421加粗文字
- 未开始：灰色空心圆 + #A8ADA8文字
- 全部完成后自动跳转到复盘结果页

## 状态管理

### InterviewDraft 接口
```typescript
interface InterviewDraft {
  step?: number;
  selectedJobId?: string;
  resumeVersion?: 'ai' | 'general';
  coverLetter?: string;
  roundNumber?: number;
  roundName?: string;
  roundType?: InterviewRoundType;
  interviewTime?: string;
  interviewFormat?: InterviewFormat;
  platform?: string;
  interviewer?: string;
  supplementNotes?: string;
  remindUpload?: boolean;
}
```

### localStorage 草稿保存
- **键名**: `interviewDraft`
- **保存时机**: 点击"去JD分析页面创建"时
- **恢复时机**: 组件挂载时检查并恢复
- **清除时机**: 创建完成后或关闭模态框时

## 路由配置

```typescript
// 在 App.tsx 中的路由
case 'create_interview':
  return <CreateInterview />;

case 'create_review':
  return <CreateReview />;
```

## 组件集成

### App.tsx 中的模态框状态
```typescript
const [isNewInterviewModalOpen, setIsNewInterviewModalOpen] = useState(false);
const [newInterviewModalMode, setNewInterviewModalMode] = useState<'standalone' | 'from-job'>('standalone');
const [newInterviewModalJobId, setNewInterviewModalJobId] = useState<string | undefined>(undefined);

const handleOpenNewInterview = (mode: 'standalone' | 'from-job' = 'standalone', jobId?: string) => {
  setNewInterviewModalMode(mode);
  setNewInterviewModalJobId(jobId);
  setIsNewInterviewModalOpen(true);
};
```

### 调用方式
```typescript
// 在 InterviewPrepCenterView 中
<button onClick={onOpenNewInterview}>+ 新建面试</button>

// 在 JobWorkspaceView 中
<button onClick={() => onOpenNewInterview(currentJob?.id)}>+ 新建面试</button>
```

## 样式规范

### 表单控件样式
- **标签**: 字号 12.5px，字重 500，色 #737873，底部间距 5px
- **输入框/下拉框**: padding 9px 12px，字号 13.5px，色 #202421，背景白色，边框 1px solid #E4E5E0，圆角 8px
- **文本框**: 同输入框样式，resize vertical，line-height 1.6

### 按钮样式
- **主按钮**: 背景 #3E6256，色 #FFFFFF，圆角 8px，padding 9px 20px
- **禁用按钮**: 背景 #D0D2CB，色 #FFFFFF
- **次按钮**: 边框 1px solid #E4E5E0，背景白色，色 #737873
- **虚线按钮**: 边框 1px dashed #C8D8D1，背景 transparent，色 #3E6256

### 卡片样式
- 背景 #FFFFFF
- 边框 1px solid #E4E5E0
- 圆角 14px
- 内边距 24px

### 步骤指示器样式
- 圆圈：28px 正圆
- 已完成：背景 #3E6256，白色 ✓ 图标
- 当前步：背景 #202421，白色数字
- 未到达：背景 #F0F0EC，色 #A8ADA8 数字
- 连接线：高度 1.5px，已完成段 #3E6256，未完成段 #E4E5E0

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行 lint 检查
npm run lint
```

## 文件结构

```
src/
├── components/
│   ├── interview/
│   │   ├── NewInterviewModal.tsx      # 模态框形式的新建面试
│   │   ├── InterviewPrepCenterView.tsx
│   │   └── InterviewPrepWorkspaceView.tsx
│   ├── review/
│   │   └── InterviewReviewCenterView.tsx
│   ├── jobs/
│   │   ├── JobWorkspaceView.tsx
│   │   └── NewJobModal.tsx
│   └── jd/
│       └── JDAnalysisCenterView.tsx
├── pages/
│   ├── CreateInterview.tsx            # 全页面形式的新建面试
│   ├── CreateReview.tsx               # 全页面形式的新建复盘
│   ├── NewInterviewPrep.tsx           # 另一个全页面版本
│   └── NewReview.tsx                  # 另一个全页面版本
├── context/
│   └── JobCraftContext.tsx            # 全局状态管理
├── types/
│   └── jobcraft.ts                    # TypeScript 类型定义
├── App.tsx                            # 主应用组件
└── index.css                          # Tailwind 主题配置
```

## 注意事项

1. 所有颜色值都使用语义化的 Tailwind token，不要使用内联 hex 值
2. 模态框的遮罩层需要自适应整个屏幕
3. 表单数据需要保存到 localStorage 以支持草稿恢复
4. AI 动画使用 600ms 间隔逐步推进
5. 分析完成后需要自动跳转到结果页面
6. 所有按钮点击都需要有相应的反馈（toast 提示或动画）

## 待完成功能

1. 简历上传功能的后端对接
2. JD 分析页面的完整实现
3. 面试复盘结果页面的详细展示
4. 数据持久化（目前使用内存状态）
5. 用户认证和授权
