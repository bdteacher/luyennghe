import React, { useState } from 'react';
import { Bell, Flame, CheckCircle, Clock, Sparkles, ChevronRight, X } from 'lucide-react';
import { UserProgress } from '../types';
import { getTodayDateString } from '../utils/storage';

interface DailyReminderBannerProps {
  progress: UserProgress;
  onOpenSettings: () => void;
  onStartDailyPractice: () => void;
}

export const DailyReminderBanner: React.FC<DailyReminderBannerProps> = ({
  progress,
  onOpenSettings,
  onStartDailyPractice,
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  const today = getTodayDateString();
  const todayActivity = progress.dailyActivities[today];
  const todayMinutes = todayActivity?.minutesListened || 0;
  const goalMinutes = progress.profile.dailyGoalMinutes || 15;
  const percentComplete = Math.min(100, Math.round((todayMinutes / goalMinutes) * 100));
  const isGoalReached = todayMinutes >= goalMinutes;

  const handleTestNotification = async () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('EduListen - Nhắc nhở ôn tập hôm nay 🎧', {
          body: `Chào ${progress.profile.name}! Đã đến giờ luyện nghe tiếng Anh hôm nay rồi. Hãy hoàn thành 15 phút nhé!`,
          icon: '/favicon.ico',
        });
        setNotificationSent(true);
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification('EduListen - Nhắc nhở ôn tập hôm nay 🎧', {
            body: `Đã kích hoạt thông báo thành công! Chúng mình sẽ nhắc bạn ôn tập hàng ngày lúc ${progress.reminder.time}.`,
          });
          setNotificationSent(true);
        }
      } else {
        alert(`Trình duyệt đang chặn thông báo. Bạn có thể mở cài đặt trình duyệt để cho phép thông báo.`);
      }
    } else {
      alert(`Trình duyệt của bạn chưa hỗ trợ thông báo đẩy trực tiếp.`);
    }
  };

  if (dismissed && isGoalReached) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-sky-50 to-emerald-50 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl p-4 sm:p-5 relative shadow-xs mb-6 no-print transition-colors">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3.5 right-3.5 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800 transition-colors"
        title="Đóng lời nhắc"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pr-6">
        {/* Left: Mascot/Icon + Motivational Message */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Flame className="w-6 h-6 text-amber-300 fill-amber-300" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {isGoalReached
                  ? `Xuất sắc! Hôm nay em đã hoàn thành mục tiêu ${goalMinutes} phút! 🎉`
                  : `Mục tiêu hôm nay: Luyện nghe ${goalMinutes} phút cùng EduListen`}
              </h2>
              {progress.streak.current > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Chuỗi {progress.streak.current} ngày
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              {isGoalReached
                ? 'Em đã duy trì thói quen nghe rất tốt! Có thể tiếp tục thử sức với các bài thi A2 nâng cao hoặc bài thi thử.'
                : `Hôm nay đã nghe được ${todayMinutes} phút. Chỉ còn ${Math.max(0, goalMinutes - todayMinutes)} phút nữa là đạt chỉ tiêu ngày.`}
            </p>

            {/* Reminder Setting Indicator */}
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Bell className="w-3.5 h-3.5 text-indigo-500" />
                <span>Nhắc nhở hàng ngày: <strong className="text-slate-700 dark:text-slate-200">{progress.reminder.time}</strong></span>
              </div>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <button
                onClick={onOpenSettings}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                Đổi giờ nhắc
              </button>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <button
                onClick={handleTestNotification}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline"
              >
                {notificationSent ? '✓ Đã gửi thử' : 'Thử thông báo'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Goal Progress Bar & Start CTA */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-indigo-100 dark:border-indigo-900/40">
          <div className="w-36 hidden sm:block">
            <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Tiến độ ngày</span>
              <span>{percentComplete}%</span>
            </div>
            <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isGoalReached ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>

          <button
            onClick={onStartDailyPractice}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all hover:shadow active:scale-95 whitespace-nowrap"
          >
            <span>Luyện nghe ngay</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
