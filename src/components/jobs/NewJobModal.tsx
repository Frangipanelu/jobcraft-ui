import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import { X, Briefcase, Sparkles, Building2, Layers } from 'lucide-react';

interface NewJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewJobModal: React.FC<NewJobModalProps> = ({ isOpen, onClose }) => {
  const { createJob, navigateTo } = useJobCraft();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [salaryRange, setSalaryRange] = useState('40K–60K · 16薪');
  const [status, setStatus] = useState<'pending' | 'delivered' | 'interviewing'>('pending');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    const newJobId = createJob({
      company: company.trim(),
      role: role.trim(),
      department: department.trim() || 'AI 创新业务部',
      salaryRange,
      status
    });

    onClose();
    // Navigate straight to Job Workspace
    navigateTo('job_workspace', { jobId: newJobId, workspaceTab: 'jd' });
  };

  const handleQuickPreset = (pCompany: string, pRole: string, pDept: string, pSalary: string) => {
    setCompany(pCompany);
    setRole(pRole);
    setDepartment(pDept);
    setSalaryRange(pSalary);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">添加新的目标岗位</h3>
              <p className="text-xs text-slate-500">创建岗位工作空间，开启 JD 分析与专属简历定制</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="px-6 pt-4">
          <span className="text-xs text-slate-400 font-medium">快速填充范例：</span>
          <div className="flex flex-wrap gap-2 mt-1.5">
            <button
              type="button"
              onClick={() => handleQuickPreset('阿里巴巴', 'AI 搜推产品专家', '通义实验室 / 淘天搜索', '45K–65K · 16薪')}
              className="px-2.5 py-1 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
            >
              阿里 · AI 搜推专家
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('小红书', '大模型内容理解 PM', '推荐与社区技术部', '38K–55K · 15薪')}
              className="px-2.5 py-1 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
            >
              小红书 · 大模型 PM
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('美团', '商业化 AI 策略 PM', '美团平台 / 智能中台', '40K–60K · 15.5薪')}
              className="px-2.5 py-1 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
            >
              美团 · AI 策略 PM
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              公司名称 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="例如：字节跳动、腾讯、微软"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              岗位名称 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="例如：AI 产品经理、搜索策略专家"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                业务线 / 部门
              </label>
              <input
                type="text"
                placeholder="例如：搜索业务中台"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                薪资范围
              </label>
              <input
                type="text"
                placeholder="例如：40K–60K"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              初始推进状态
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('pending')}
                className={`py-2 text-xs rounded-lg font-medium border text-center transition ${
                  status === 'pending'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                待处理
              </button>
              <button
                type="button"
                onClick={() => setStatus('delivered')}
                className={`py-2 text-xs rounded-lg font-medium border text-center transition ${
                  status === 'delivered'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                已投递
              </button>
              <button
                type="button"
                onClick={() => setStatus('interviewing')}
                className={`py-2 text-xs rounded-lg font-medium border text-center transition ${
                  status === 'interviewing'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                面试中
              </button>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition"
            >
              创建并进入岗位空间 →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
