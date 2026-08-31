import React from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import { NavigationTab } from '../../types/jobcraft';
import {
  LayoutDashboard,
  Briefcase,
  FileSearch,
  BookOpenCheck,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  Plus
} from 'lucide-react';

interface SidebarProps {
  onOpenNewJob: () => void;
  onOpenNewInterview: () => void;
  onOpenNewReview: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenNewJob,
  onOpenNewInterview,
  onOpenNewReview
}) => {
  const { currentTab, navigateTo, jobs, interviews } = useJobCraft();

  const interviewingJobsCount = jobs.filter((j) => j.status === 'interviewing').length;
  const pendingReviewCount = interviews.filter((i) => i.status === 'completed' && !i.review).length || 1;

  const navItems: {
    section?: string;
    items: {
      id: NavigationTab;
      label: string;
      icon: React.ReactNode;
      badge?: string | number;
      badgeColor?: string;
    }[];
  }[] = [
    {
      items: [
        {
          id: 'workbench',
          label: '工作台',
          icon: <LayoutDashboard className="w-4 h-4" />
        }
      ]
    },
    {
      section: '职业资产',
      items: [
        {
          id: 'experiences',
          label: '我的经历',
          icon: <Award className="w-4 h-4" />
        }
      ]
    },
    {
      section: '求职',
      items: [
        {
          id: 'jobs',
          label: '我的岗位',
          icon: <Briefcase className="w-4 h-4" />,
          badge: interviewingJobsCount > 0 ? `${interviewingJobsCount}推进中` : undefined,
          badgeColor: 'bg-[#E8F1EC] text-[#2D4B41]'
        },
        {
          id: 'jd_analysis',
          label: 'JD 分析',
          icon: <FileSearch className="w-4 h-4" />
        }
      ]
    },
    {
      section: '面试',
      items: [
        {
          id: 'interview_prep_center',
          label: '面试准备',
          icon: <BookOpenCheck className="w-4 h-4" />
        },
        {
          id: 'interview_review_center',
          label: '面试复盘',
          icon: <RotateCcw className="w-4 h-4" />,
          badge: pendingReviewCount > 0 ? '待复盘' : undefined,
          badgeColor: 'bg-[#F8EFE9] text-[#935427]'
        }
      ]
    }
  ];

  return (
    <aside className="w-64 h-screen bg-[#1D201F] text-[#A6ACA8] flex flex-col justify-between shrink-0 select-none border-r border-[#2C302E]">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-[#2C302E]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3E6256] flex items-center justify-center text-white shadow-sm shadow-[#3E6256]/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight text-base">JobCraft</span>
                <span className="text-[10px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded bg-[#3E6256]/30 text-[#8EBAAB] border border-[#3E6256]/50">
                  V2
                </span>
              </div>
              <p className="text-xs text-[#8A908C] font-medium">求职与经历闭环系统</p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-270px)] custom-scrollbar">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {group.section && (
                <div className="px-3 py-1 text-[11px] font-semibold text-[#6C726E] uppercase tracking-wider">
                  {group.section}
                </div>
              )}
              {group.items.map((item) => {
                const isActive =
                  currentTab === item.id ||
                  (item.id === 'jobs' && currentTab === 'job_workspace') ||
                  (item.id === 'jd_analysis' && (currentTab === 'jd_report' || currentTab === 'jd_analysis_center')) ||
                  (item.id === 'interview_prep_center' && currentTab === 'interview_prep_workspace') ||
                  (item.id === 'interview_review_center' && currentTab === 'interview_review_detail');

                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#3E6256] text-white font-semibold shadow-xs'
                        : 'text-[#A6ACA8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={isActive ? 'text-white' : 'text-[#8A908C]'}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold shrink-0 ${
                          item.badgeColor || 'bg-[#2C302E] text-[#D0D5D2]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Quick Shortcuts Section */}
          <div className="pt-2 border-t border-[#2C302E]">
            <div className="px-3 py-1 text-[11px] font-semibold text-[#6C726E] uppercase tracking-wider flex items-center justify-between">
              <span>快速发起</span>
              <Layers className="w-3.5 h-3.5 text-[#6C726E]" />
            </div>
            <div className="space-y-1 mt-1">
              <button
                onClick={onOpenNewJob}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#A6ACA8] hover:text-white hover:bg-white/5 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5 text-[#B7794B]" />
                <span>新建岗位申请</span>
              </button>
              <button
                onClick={onOpenNewInterview}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#A6ACA8] hover:text-white hover:bg-white/5 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5 text-[#B7794B]" />
                <span>独立创建面试准备</span>
              </button>
              <button
                onClick={onOpenNewReview}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#A6ACA8] hover:text-white hover:bg-white/5 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5 text-[#B7794B]" />
                <span>上传真实面试复盘</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Asset quota widget & User Profile */}
      <div className="p-3 space-y-2 border-t border-[#2C302E]">
        {/* Asset Meter widget */}
        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <div className="flex items-center justify-between text-xs text-[#C8CEC9] font-medium">
            <span>经历资产库沉淀率</span>
            <span className="text-[#8EBAAB] font-semibold">82%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full my-2 overflow-hidden">
            <div className="w-[82%] h-full bg-[#3E6256] rounded-full"></div>
          </div>
          <div className="text-[10px] text-[#8A908C] flex items-center justify-between">
            <span>已结构化 18 个证据卡</span>
            <span className="text-[#B7794B] font-medium">SOTA 就绪</span>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="菁菁"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-[#3E6256] shrink-0"
            />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">菁菁</div>
              <div className="text-[10px] text-[#8A908C] truncate">AI 产品专家</div>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#3E6256] ring-2 ring-[#3E6256]/30 shrink-0" title="系统正常运行" />
        </div>
      </div>
    </aside>
  );
};
