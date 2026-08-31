import React, { useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface SidebarProps {
  onOpenNewJob: () => void;
  onOpenNewInterview: () => void;
  onOpenNewReview?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenNewJob,
  onOpenNewInterview,
  onOpenNewReview
}) => {
  const { currentTab, navigateTo, jobs, interviews } = useJobCraft();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          badge: interviewingJobsCount > 0 ? `${interviewingJobsCount}` : undefined,
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
          badge: pendingReviewCount > 0 ? `${pendingReviewCount}` : undefined,
          badgeColor: 'bg-[#F8EFE9] text-[#935427]'
        }
      ]
    }
  ];

  return (
    <aside
      className={`h-screen bg-[#1D201F] text-[#A6ACA8] flex flex-col justify-between shrink-0 select-none border-r border-[#2C302E] transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-4 border-b border-[#2C302E] flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
            <div
              onClick={() => isCollapsed && setIsCollapsed(false)}
              className={`w-8 h-8 rounded-lg bg-[#3E6256] flex items-center justify-center text-white shadow-sm shadow-[#3E6256]/30 shrink-0 ${
                isCollapsed ? 'cursor-pointer hover:bg-[#325046]' : ''
              }`}
              title="JobCraft"
            >
              <Sparkles className="w-4 h-4" />
            </div>

            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white tracking-tight text-sm">JobCraft</span>
                  <span className="text-[10px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded bg-[#3E6256]/30 text-[#8EBAAB] border border-[#3E6256]/50 shrink-0">
                    V2
                  </span>
                </div>
                <p className="text-[11px] text-[#8A908C] font-medium truncate">求职与经历闭环</p>
              </div>
            )}
          </div>

          {/* Collapse/Expand toggle button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md text-[#8A908C] hover:text-white hover:bg-white/10 transition shrink-0 ml-1"
            title={isCollapsed ? '展开侧边栏' : '收起侧边栏'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-[#8EBAAB]" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation list */}
        <div className="p-2 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!isCollapsed && group.section && (
                <div className="px-3 py-1 text-[11px] font-semibold text-[#6C726E] uppercase tracking-wider">
                  {group.section}
                </div>
              )}
              {group.items.map((item) => {
                const isActivewk =
                  currentTab === item.id ||
                  (item.id === 'jobs' && currentTab === 'job_workspace') ||
                  (item.id === 'jd_analysis' && (currentTab === 'jd_report' || currentTab === 'jd_analysis_center')) ||
                  (item.id === 'interview_prep_center' && currentTab === 'interview_prep_workspace') ||
                  (item.id === 'interview_review_center' && currentTab === 'interview_review_detail');

                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'
                    } rounded-lg text-xs font-medium transition-all ${
                      isActivewk
                        ? 'bg-[#3E6256] text-white font-semibold shadow-xs'
                        : 'text-[#A6ACA8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={isActivewk ? 'text-white' : 'text-[#8A908C]'}>
                        {item.icon}
                      </span>
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold shrink-0 ${
                          item.badgeColor || 'bg-[#2C302E] text-[#D0D5D2]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {isCollapsed && item.badge && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#B7794B]" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
