import React, { useState } from 'react';
import {
  X,
  Bell,
  User,
  Clock,
  Download,
  Upload,
  Phone,
  Save,
  CheckCircle,
  RotateCcw,
  Sun,
  Moon,
  LogIn,
  LogOut,
  Mail,
  Sparkles
} from 'lucide-react';
import { UserProgress, UserAccount } from '../types';
import { saveUserProgress, getInitialProgress } from '../utils/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  progress,
  onUpdateProgress,
  onOpenAuth,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(progress.profile.name || '');
  const [grade, setGrade] = useState(progress.profile.grade || 'Lớp 6');
  const [school, setSchool] = useState(progress.profile.school || 'THCS');
  const [goalMinutes, setGoalMinutes] = useState(progress.profile.dailyGoalMinutes || 15);
  const [reminderTime, setReminderTime] = useState(progress.reminder.time || '19:30');
  const [reminderEnabled, setReminderEnabled] = useState(progress.reminder.enabled ?? true);
  const [theme, setTheme] = useState<'light' | 'dark'>(progress.theme || 'light');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    const updated: UserProgress = {
      ...progress,
      profile: {
        ...progress.profile,
        name: name.trim() || 'Học sinh',
        grade,
        school: school.trim() || 'THCS',
        dailyGoalMinutes: Number(goalMinutes),
      },
      reminder: {
        ...progress.reminder,
        time: reminderTime,
        enabled: reminderEnabled,
      },
      theme,
    };

    saveUserProgress(updated);
    onUpdateProgress(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `EduListen_TienTrinh_${progress.profile.name || 'HocSinh'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.profile && json.attempts) {
          saveUserProgress(json);
          onUpdateProgress(json);
          alert('Đã khôi phục dữ liệu tiến trình học tập thành công!');
          onClose();
        } else {
          alert('Tệp dữ liệu không hợp lệ.');
        }
      } catch {
        alert('Lỗi đọc tệp dữ liệu.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetProgress = () => {
    if (confirm('Em có chắc chắn muốn đặt lại toàn bộ tiến trình luyện tập không?')) {
      const reset = getInitialProgress();
      saveUserProgress(reset);
      onUpdateProgress(reset);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs no-print animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Cài Đặt Hệ Thống & Giao Diện</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm">
          {/* Section 0: Theme / Dark Mode */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              1. Chế độ giao diện (Dark Mode)
            </h4>

            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs transition-all ${
                  theme === 'light'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Giao diện sáng (Light)</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Giao diện tối (Dark)</span>
              </button>
            </div>
          </div>

          {/* Section 1: Account Status & Login */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              2. Tài khoản người dùng (Gmail / Google / Trường học)
            </h4>

            {progress.account ? (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center shrink-0">
                    {progress.account.avatarUrl ? (
                      <img src={progress.account.avatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-xs block">
                      {progress.account.displayName}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                      {progress.account.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onOpenAuth}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                  >
                    Đổi tài khoản
                  </button>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="text-xs text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-xs block">
                      Chưa liên kết tài khoản
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Đăng nhập bằng Gmail để sao lưu điểm thi tự động
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Đăng nhập
                </button>
              </div>
            )}
          </div>

          {/* Section 2: Student Information */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              3. Thông tin học sinh (Hiển thị trên Phiếu báo cáo tuần)
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Họ và tên học sinh:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Minh Anh"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Lớp / Khối:
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Lớp 3">Lớp 3</option>
                  <option value="Lớp 4">Lớp 4</option>
                  <option value="Lớp 5">Lớp 5</option>
                  <option value="Lớp 6">Lớp 6</option>
                  <option value="Lớp 7">Lớp 7</option>
                  <option value="Lớp 8">Lớp 8</option>
                  <option value="Lớp 9">Lớp 9</option>
                  <option value="THPT / Khác">THPT / Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Trường học:
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Ví dụ: THCS Nguyễn Tri Phương"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Daily Reminders & Study Goal */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              4. Nhắc nhở ôn tập hàng ngày & Mục tiêu
            </h4>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs block">
                    Bật nhắc nhở ôn tập mỗi ngày
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Gửi thông báo nhắc nhở vào khung giờ cố định
                  </span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={(e) => setReminderEnabled(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Giờ nhắc nhở hàng ngày:
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mục tiêu luyện nghe/ngày:
                </label>
                <select
                  value={goalMinutes}
                  onChange={(e) => setGoalMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value={10}>10 phút / ngày</option>
                  <option value={15}>15 phút / ngày (Khuyên dùng)</option>
                  <option value={20}>20 phút / ngày</option>
                  <option value={30}>30 phút / ngày</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Data Backup & Restore */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              5. Lưu trữ & Sao lưu dữ liệu học tập
            </h4>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleExportData}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Sao lưu dữ liệu (Tải file JSON)</span>
              </button>

              <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Khôi phục dữ liệu</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={handleResetProgress}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-xs font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại từ đầu</span>
              </button>
            </div>
          </div>

          {/* Section 5: Author Contact Card */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-1 text-xs">
            <span className="font-bold text-indigo-950 dark:text-indigo-200 block">Thông tin tác giả & Hỗ trợ kỹ thuật:</span>
            <p className="text-slate-700 dark:text-slate-300">
              Tác giả: <strong>StevenBui</strong>
            </p>
            <p className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Số điện thoại / Zalo: <strong>0982826817</strong></span>
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700"
          >
            Đóng
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            {savedSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Đã lưu thành công!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu thay đổi</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
