import React from 'react';
import { Headphones, Flame, Clock, Bell, Sun, Moon, User, LogIn } from 'lucide-react';
import { UserProgress } from '../types';
import { getTodayDateString } from '../utils/storage';

interface HeaderProps {
  activeTab: 'practice' | 'mock_exam' | 'weekly_report' | 'mistakes' | 'settings';
  setActiveTab: (tab: 'practice' | 'mock_exam' | 'weekly_report' | 'mistakes' | 'settings') => void;
  progress: UserProgress;
  onOpenSettings: () => void;
  onToggleTheme: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  progress,
  onOpenSettings,
  onToggleTheme,
  onOpenAuth,
}) => {
  const today = getTodayDateString();
  const todayMinutes = progress.dailyActivities[today]?.minutesListened || 0;
  const goalMinutes = progress.profile.dailyGoalMinutes || 15;
  const isDarkMode = progress.theme === 'dark';
  const account = progress.account;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs no-print transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('practice')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors whitespace-nowrap">
                  EduListen <span className="text-indigo-600 dark:text-indigo-400">A1-B2</span>
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-none mt-0.5">
                  Luyện nghe tiếng Anh học sinh
                </p>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('practice')}
              className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
                activeTab === 'practice'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Luyện nghe A1 - B2
            </button>

            <button
              onClick={() => setActiveTab('mock_exam')}
              className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
                activeTab === 'mock_exam'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bài thi thử
            </button>

            <button
              onClick={() => setActiveTab('weekly_report')}
              className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
                activeTab === 'weekly_report'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Báo cáo tuần
            </button>

            <button
              onClick={() => setActiveTab('mistakes')}
              className={`whitespace-nowrap transition-colors pb-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'mistakes'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Sổ tay câu sai</span>
              {progress.mistakes.length > 0 && (
                <span className="text-xs font-semibold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300">
                  {progress.mistakes.length}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: Actions, Auth, Theme & Author Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Daily Streak & Minutes Stats */}
            <div className="hidden xl:flex items-center gap-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400" title="Chuỗi ngày luyện tập liên tiếp">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="tabular-nums">{progress.streak.current} ngày</span>
              </div>
              <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">|</span>
              <div className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-400" title="Thời gian nghe hôm nay">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="tabular-nums">{todayMinutes}/{goalMinutes} phút</span>
              </div>
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối (Dark mode)'}
              aria-label="Đổi giao diện sáng/tối"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Account / Login Button */}
            {account ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                title={`Đang đăng nhập: ${account.email}`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center shrink-0">
                  {account.avatarUrl ? (
                    <img src={account.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-300" />
                  )}
                </div>
                <div className="hidden sm:block max-w-[100px] truncate">
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight truncate">
                    {account.displayName}
                  </span>
                  <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium leading-none">
                    {account.provider === 'google' ? 'Google' : 'Trường'}
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-xs font-semibold transition-colors"
                title="Đăng nhập tài khoản Gmail / Học sinh"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </button>
            )}

            {/* Author Credit Badge */}
            <div className="hidden lg:flex flex-col items-end text-[11px] text-slate-500 dark:text-slate-400 pr-1">
              <span className="font-medium text-slate-700 dark:text-slate-300">Tác giả: StevenBui</span>
              <span className="text-slate-500 dark:text-slate-400">Tel: 0982826817</span>
            </div>

            {/* Daily Reminder & Settings Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              title="Cài đặt & Lời nhắc ôn tập"
              aria-label="Cài đặt học tập"
            >
              <Bell className="w-5 h-5" />
              {progress.reminder.enabled && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around py-2.5 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 overflow-x-auto">
          <button
            onClick={() => setActiveTab('practice')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'practice'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-semibold'
                : ''
            }`}
          >
            Luyện nghe
          </button>
          <button
            onClick={() => setActiveTab('mock_exam')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'mock_exam'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-semibold'
                : ''
            }`}
          >
            Thi thử
          </button>
          <button
            onClick={() => setActiveTab('weekly_report')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'weekly_report'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-semibold'
                : ''
            }`}
          >
            Báo cáo tuần
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'mistakes'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-semibold'
                : ''
            }`}
          >
            Sổ câu sai ({progress.mistakes.length})
          </button>
        </div>
      </div>
    </header>
  );
};
