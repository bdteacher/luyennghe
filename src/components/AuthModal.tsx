import React, { useState } from 'react';
import { X, Mail, Shield, User, Check, LogIn, Sparkles, School } from 'lucide-react';
import { UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAccount?: UserAccount | null;
  onLogin: (account: UserAccount) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentAccount,
  onLogin,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState<'google' | 'school' | 'email'>('google');
  const [gmailInput, setGmailInput] = useState('bdteacher@gmail.com');
  const [nameInput, setNameInput] = useState('');
  const [schoolIdInput, setSchoolIdInput] = useState('');
  const [schoolNameInput, setSchoolNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = (emailToUse: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const email = emailToUse.trim();
      const derivedName = nameInput.trim() || email.split('@')[0];
      const account: UserAccount = {
        id: `google-${Date.now()}`,
        email,
        displayName: derivedName,
        provider: 'google',
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      };
      onLogin(account);
      setIsLoading(false);
      onClose();
    }, 450);
  };

  const handleSchoolSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolIdInput.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const account: UserAccount = {
        id: `school-${Date.now()}`,
        email: `${schoolIdInput.trim().toLowerCase()}@school.edu.vn`,
        displayName: nameInput.trim() || `Học sinh ${schoolIdInput.trim()}`,
        provider: 'school',
        schoolId: schoolIdInput.trim(),
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(schoolIdInput)}`,
      };
      onLogin(account);
      setIsLoading(false);
      onClose();
    }, 450);
  };

  const handleCustomEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gmailInput.trim()) return;
    handleGoogleSignIn(gmailInput);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs no-print animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {currentAccount ? 'Tài Khoản Học Tập' : 'Đăng Nhập Tài Khoản'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Lưu trữ và đồng bộ hóa tiến trình học trên mọi thiết bị
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {currentAccount ? (
            /* Logged in state */
            <div className="space-y-4">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center border-2 border-indigo-500 shrink-0">
                  {currentAccount.avatarUrl ? (
                    <img
                      src={currentAccount.avatarUrl}
                      alt={currentAccount.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  )}
                </div>

                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm truncate">
                      {currentAccount.displayName}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                      Đã kết nối
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {currentAccount.email}
                  </p>
                  <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-1">
                    Phương thức: {currentAccount.provider === 'google' ? 'Google / Gmail' : 'Tài khoản trường'}
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                <p className="flex items-center gap-1.5 text-indigo-900 dark:text-indigo-300 font-semibold">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Tiến trình luyện nghe tự động đồng bộ</span>
                </p>
                <p>
                  Mọi điểm số, chuỗi ngày rèn luyện và phiếu báo cáo tuần đều được gắn liền với tài khoản của em.
                </p>
              </div>

              <div className="pt-2 flex justify-between items-center gap-3">
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors"
                >
                  Đăng xuất tài khoản
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Hoàn tất
                </button>
              </div>
            </div>
          ) : (
            /* Login forms */
            <div className="space-y-4">
              {/* Login Method Segment */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setAuthMode('google')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'google'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Gmail / Google</span>
                </button>

                <button
                  onClick={() => setAuthMode('school')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'school'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <School className="w-4 h-4 text-emerald-600" />
                  <span>Trường học / Khác</span>
                </button>
              </div>

              {/* Mode 1: Google / Gmail */}
              {authMode === 'google' && (
                <div className="space-y-3.5 pt-1">
                  {/* Quick One-Click Google Login Button */}
                  <button
                    onClick={() => handleGoogleSignIn(gmailInput)}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs transition-all active:scale-[0.98]"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>
                      {isLoading ? 'Đang xác thực...' : 'Đăng nhập nhanh với Google'}
                    </span>
                  </button>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                    <span className="flex-shrink mx-3 text-[11px] text-slate-400 uppercase tracking-wider">
                      Hoặc nhập địa chỉ Gmail
                    </span>
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                  </div>

                  <form onSubmit={handleCustomEmailSignIn} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Địa chỉ Gmail của học sinh / phụ huynh:
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={gmailInput}
                          onChange={(e) => setGmailInput(e.target.value)}
                          placeholder="tenhocsinh@gmail.com"
                          className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Họ và tên hiển thị (Tùy chọn):
                      </label>
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Minh Anh"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>{isLoading ? 'Đang kết nối...' : 'Xác nhận đăng nhập Gmail'}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Mode 2: School / Student ID */}
              {authMode === 'school' && (
                <form onSubmit={handleSchoolSignIn} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Mã định danh học sinh / Số báo danh:
                    </label>
                    <input
                      type="text"
                      required
                      value={schoolIdInput}
                      onChange={(e) => setSchoolIdInput(e.target.value)}
                      placeholder="Ví dụ: HS2026-6A1"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Họ và tên học sinh:
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Ví dụ: Trần Bảo Châu"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Mật khẩu / Mã PIN:
                    </label>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Mã PIN 4 hoặc 6 chữ số"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{isLoading ? 'Đang xác thực...' : 'Đăng nhập tài khoản trường'}</span>
                  </button>
                </form>
              )}

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:underline"
                >
                  Tiếp tục học thử không cần đăng nhập
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
