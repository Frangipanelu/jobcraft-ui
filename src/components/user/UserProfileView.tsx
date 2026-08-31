import React, { useState } from 'react';
import { useJobCraft } from '../../context/JobCraftContext';
import {
  FileText,
  User,
  Target,
  Settings,
  Upload,
  CheckCircle2,
  Trash2,
  Star,
  Download,
  Eye,
  Plus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  MapPin,
  Briefcase,
  DollarSign,
  Mail,
  Phone,
  Save,
  Clock,
  Layers
} from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const {
    user,
    updateUserProfile,
    historicalResumes,
    addHistoricalResume,
    deleteHistoricalResume,
    setDefaultHistoricalResume,
    experiences,
    navigateTo,
    userProfileTab,
    setUserProfileTab,
    showToast
  } = useJobCraft();

  const [activeTab, setActiveTab] = useState<'resumes' | 'profile' | 'preferences' | 'settings'>(userProfileTab || 'resumes');

  // Form states for profile
  const [profileForm, setProfileForm] = useState({
    name: user.name || '菁菁',
    role: user.role || 'AI 产品方向',
    targetSalary: user.targetSalary || '45K–65K',
    yearsOfExp: user.yearsOfExp || 5,
    city: user.city || '北京 / 远程',
    email: user.email || 'jing@email.com',
    phone: user.phone || '138****6688',
    summary: user.summary || '5年AI与搜索策略产品经验，主导过从0到1大模型评测体系、Prompt/Agent工作流平台与多模态RAG商业化落地。'
  });

  // Target preferences
  const [targetRoles, setTargetRoles] = useState<string[]>(user.targetRoles || ['AI 产品经理', '大模型策略产品专家', '搜索与推荐产品负责人']);
  const [newRoleInput, setNewRoleInput] = useState('');
  const [targetCompanies, setTargetCompanies] = useState<string[]>(user.targetCompanies || ['字节跳动', '腾讯', '阿里巴巴', '头部AI创企']);
  const [newCompanyInput, setNewCompanyInput] = useState('');

  // Upload modal state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
  };

  const handleAddRole = () => {
    if (!newRoleInput.trim()) return;
    const updated = [...targetRoles, newRoleInput.trim()];
    setTargetRoles(updated);
    updateUserProfile({ targetRoles: updated });
    setNewRoleInput('');
  };

  const handleRemoveRole = (role: string) => {
    const updated = targetRoles.filter((r) => r !== role);
    setTargetRoles(updated);
    updateUserProfile({ targetRoles: updated });
  };

  const handleAddCompany = () => {
    if (!newCompanyInput.trim()) return;
    const updated = [...targetCompanies, newCompanyInput.trim()];
    setTargetCompanies(updated);
    updateUserProfile({ targetCompanies: updated });
    setNewCompanyInput('');
  };

  const handleRemoveCompany = (comp: string) => {
    const updated = targetCompanies.filter((c) => c !== comp);
    setTargetCompanies(updated);
    updateUserProfile({ targetCompanies: updated });
  };

  const handleSimulateUpload = () => {
    if (!uploadFileName.trim()) return;
    setIsUploading(true);
    setTimeout(() => {
      addHistoricalResume({
        name: uploadFileName.endsWith('.pdf') ? uploadFileName : uploadFileName + '.pdf',
        fileSize: '1.2 MB',
        isDefault: historicalResumes.length === 0,
        parsedExperiencesCount: 4,
        format: 'pdf',
        tags: ['新导入', '已完成STAR结构化']
      });
      setIsUploading(false);
      setUploadFileName('');
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in duration-200">
      {/* 1. Profile Banner */}
      <div className="bg-white rounded-2xl border border-[#E6E6E1] p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#3E6256] text-white flex items-center justify-center font-bold text-2xl shadow-sm ring-4 ring-[#E8F1EC]">
            菁
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#1D201F] tracking-tight">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB]">
                求职中 · 积极沟通
              </span>
            </div>
            <p className="text-xs text-[#6B726F] flex items-center gap-3">
              <span className="font-medium text-[#1D201F]">{user.role}</span>
              <span>·</span>
              <span>{user.yearsOfExp} 年工作经验</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#6B726F]" />
                {user.city}
              </span>
              <span>·</span>
              <span className="text-[#3E6256] font-semibold">{user.targetSalary}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => navigateTo('experiences')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#F5F5F2] hover:bg-[#EBEBE6] text-[#1D201F] text-xs font-semibold transition"
          >
            <Layers className="w-3.5 h-3.5 text-[#3E6256]" />
            <span>查看经历资产库 ({experiences.length})</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E6E6E1] pb-1">
        <button
          onClick={() => setActiveTab('resumes')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition ${
            activeTab === 'resumes'
              ? 'bg-[#1D201F] text-white shadow-xs'
              : 'text-[#6B726F] hover:text-[#1D201F] hover:bg-[#F5F5F2]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>历史简历管理</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
            {historicalResumes.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition ${
            activeTab === 'profile'
              ? 'bg-[#1D201F] text-white shadow-xs'
              : 'text-[#6B726F] hover:text-[#1D201F] hover:bg-[#F5F5F2]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>个人基本资料</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition ${
            activeTab === 'preferences'
              ? 'bg-[#1D201F] text-white shadow-xs'
              : 'text-[#6B726F] hover:text-[#1D201F] hover:bg-[#F5F5F2]'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>求职偏好</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition ${
            activeTab === 'settings'
              ? 'bg-[#1D201F] text-white shadow-xs'
              : 'text-[#6B726F] hover:text-[#1D201F] hover:bg-[#F5F5F2]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>账号设置</span>
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* TAB 1: 历史简历管理 (p1 requirement) */}
      {activeTab === 'resumes' && (
        <div className="space-y-6">
          {/* Top description & Upload box */}
          <div className="bg-[#FAFBF9] border border-[#E6E6E1] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#1D201F] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#3E6256]" />
                <span>底座简历与历史版本管理</span>
              </h2>
              <p className="text-xs text-[#6B726F] mt-1 max-w-2xl leading-relaxed">
                上传您的原始简历（PDF 或 Word），AI 将自动解析其中的项目、工作、教育经历，并将其结构化沉淀至「经历资产库」。您可以随时设定任意版本为默认底座。
              </p>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="简历名称 (如: 2026_AI产品_V4.pdf)"
                value={uploadFileName}
                onChange={(e) => setUploadFileName(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg border border-[#E6E6E1] bg-white text-[#1D201F] focus:border-[#3E6256] focus:outline-none w-full md:w-60"
              />
              <button
                onClick={handleSimulateUpload}
                disabled={isUploading || !uploadFileName.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition shrink-0 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? '解析中...' : '上传并解析'}</span>
              </button>
            </div>
          </div>

          {/* Resumes List Grid */}
          <div className="grid grid-cols-1 gap-4">
            {historicalResumes.map((resume) => (
              <div
                key={resume.id}
                className={`bg-white rounded-xl border p-5 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs ${
                  resume.isDefault
                    ? 'border-[#3E6256] ring-1 ring-[#3E6256]/20 bg-[#FBFCFA]'
                    : 'border-[#E6E6E1] hover:border-[#D5D5CE]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      resume.isDefault
                        ? 'bg-[#3E6256] text-white'
                        : 'bg-[#F5F5F2] text-[#6B726F]'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-bold text-sm text-[#1D201F]">{resume.name}</span>
                      {resume.isDefault && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F1EC] text-[#2D4B41] border border-[#D3E2DB] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          默认底座简历
                        </span>
                      )}
                      {resume.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#F5F5F2] text-[#6B726F]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#6B726F]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#A6ACA8]" />
                        上传时间：{resume.uploadDate}
                      </span>
                      <span>·</span>
                      <span>大小：{resume.fileSize}</span>
                      <span>·</span>
                      <span className="text-[#3E6256] font-medium">
                        已解析沉淀 {resume.parsedExperiencesCount} 条核心经历
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {!resume.isDefault && (
                    <button
                      onClick={() => setDefaultHistoricalResume(resume.id)}
                      className="px-3 py-1.5 rounded-lg border border-[#E6E6E1] hover:border-[#3E6256] text-xs font-semibold text-[#1D201F] hover:text-[#3E6256] bg-white transition cursor-pointer"
                    >
                      设为默认底座
                    </button>
                  )}

                  <button
                    onClick={() => navigateTo('experiences')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E8F1EC] text-[#2D4B41] hover:bg-[#D3E2DB] text-xs font-semibold transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>查看已解析经历</span>
                  </button>

                  <button
                    onClick={() =>
                      showToast({
                        type: 'success',
                        title: '开始下载',
                        message: `正在导出「${resume.name}」`
                      })
                    }
                    className="p-1.5 rounded-lg border border-[#E6E6E1] hover:bg-[#F5F5F2] text-[#6B726F] transition"
                    title="下载原始简历"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  {historicalResumes.length > 1 && (
                    <button
                      onClick={() => deleteHistoricalResume(resume.id)}
                      className="p-1.5 rounded-lg border border-[#E6E6E1] hover:bg-[#FDF2F2] text-[#BC4C4C] hover:border-[#BC4C4C]/40 transition"
                      title="删除此简历"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: 个人基本资料 */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-xl border border-[#E6E6E1] p-6 md:p-8 space-y-6 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#1D201F] mb-1.5">姓名 / 称呼</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E6E6E1] focus:border-[#3E6256] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D201F] mb-1.5">目标岗位定位</label>
              <input
                type="text"
                value={profileForm.role}
                onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E6E6E1] focus:border-[#3E6256] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D201F] mb-1.5">期望薪资范围</label>
              <input
                type="text"
                value={profileForm.targetSalary}
                onChange={(e) => setProfileForm({ ...profileForm, targetSalary: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E6E6E1] focus:border-[#3E6256] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D201F] mb-1.5">工作年限 (年)</label>
              <input
                type="number"
                value={profileForm.yearsOfExp}
                onChange={(e) => setProfileForm({ ...profileForm, yearsOfExp: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E6E6E1] focus:border-[#3E6256] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D201F] mb-1.5">常用邮箱</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E6E6E1] focus:border-[#3E6256] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D201F] mb-1.5">联系电话</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E6E6E1] focus:border-[#3E6256] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1D201F] mb-1.5">个人核心优势与职业概述</label>
            <textarea
              rows={4}
              value={profileForm.summary}
              onChange={(e) => setProfileForm({ ...profileForm, summary: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E6E6E1] focus:border-[#3E6256] focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E6E6E1]">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#3E6256] hover:bg-[#325046] text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>保存个人资料</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: 求职偏好 */}
      {activeTab === 'preferences' && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 md:p-8 space-y-6 shadow-2xs">
          {/* Target Roles */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1D201F]">意向职位方向</label>
            <div className="flex items-center gap-2 flex-wrap">
              {targetRoles.map((role, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs bg-[#E8F1EC] text-[#2D4B41] font-medium flex items-center gap-2"
                >
                  {role}
                  <button
                    type="button"
                    onClick={() => handleRemoveRole(role)}
                    className="hover:text-red-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 max-w-sm pt-1">
              <input
                type="text"
                placeholder="添加意向岗位 (如: 生成式AI策略PM)"
                value={newRoleInput}
                onChange={(e) => setNewRoleInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRole())}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#E6E6E1] focus:border-[#3E6256] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddRole}
                className="px-3 py-1.5 rounded-lg bg-[#1D201F] text-white text-xs font-semibold hover:bg-black transition"
              >
                添加
              </button>
            </div>
          </div>

          {/* Target Companies */}
          <div className="space-y-2 pt-4 border-t border-[#E6E6E1]">
            <label className="block text-xs font-bold text-[#1D201F]">重点意向公司</label>
            <div className="flex items-center gap-2 flex-wrap">
              {targetCompanies.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs bg-[#FAF2EB] text-[#8F5128] font-medium flex items-center gap-2"
                >
                  {comp}
                  <button
                    type="button"
                    onClick={() => handleRemoveCompany(comp)}
                    className="hover:text-red-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 max-w-sm pt-1">
              <input
                type="text"
                placeholder="添加目标公司 (如: 快手)"
                value={newCompanyInput}
                onChange={(e) => setNewCompanyInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCompany())}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#E6E6E1] focus:border-[#3E6256] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCompany}
                className="px-3 py-1.5 rounded-lg bg-[#1D201F] text-white text-xs font-semibold hover:bg-black transition"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 账号设置 */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border border-[#E6E6E1] p-6 md:p-8 space-y-6 shadow-2xs">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1D201F]">AI 研判与模型引擎配置</h3>
            <div className="p-4 rounded-xl bg-[#F5F5F2] border border-[#E6E6E1] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#1D201F]">当前推理模型</div>
                <div className="text-[11px] text-[#6B726F] mt-0.5">Gemini 2.5 Pro (深度长上下文与岗位经历反哺匹配)</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#E8F1EC] text-[#2D4B41] text-xs font-bold">运行正常</span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E6E6E1]">
            <h3 className="text-sm font-bold text-[#1D201F]">数据资产备份与导出</h3>
            <p className="text-xs text-[#6B726F]">
              您可以随时将经历资产库、岗位研判记录与模拟面试题库完整打包导出为 Markdown 或 JSON 格式。
            </p>
            <button
              onClick={() =>
                showToast({
                  type: 'success',
                  title: '导出成功',
                  message: '已成功打包 JobCraft 全量职业资产数据包。'
                })
              }
              className="px-4 py-2 rounded-lg border border-[#E6E6E1] hover:bg-[#F5F5F2] text-xs font-semibold text-[#1D201F] transition"
            >
              导出全量数据包 (.JSON)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
