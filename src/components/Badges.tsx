import React, { useState } from 'react';
import {
  Award,
  Flame,
  CheckCircle2,
  Sparkles,
  Crown,
  Zap,
  Star,
  Target,
  Clock,
  BookOpen,
  Lock,
  Unlock,
  ChevronRight,
  X,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgress, Badge, BadgeTier } from '../types';
import { calculateBadges } from '../utils/badgesEngine';
import { playSuccessSound } from '../utils/soundEffects';

interface BadgesProps {
  progress: UserProgress;
  compact?: boolean; // When rendered inside tight report sections
  onSelectMilestone?: (badge: Badge) => void;
}

export const Badges: React.FC<BadgesProps> = ({ progress, compact = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const badges = calculateBadges(progress);
  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalCount = badges.length;
  const completionPercent = Math.round((unlockedCount / totalCount) * 100);

  const filteredBadges = badges.filter((b) => {
    if (selectedCategory === 'unlocked') return b.unlocked;
    if (selectedCategory === 'locked') return !b.unlocked;
    return true;
  });

  const getTierVisuals = (tier: BadgeTier, unlocked: boolean) => {
    if (!unlocked) {
      return {
        bg: 'bg-slate-100 dark:bg-slate-800/80',
        border: 'border-slate-200 dark:border-slate-700/60',
        badgeBg: 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500',
        ribbon: 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300',
        tierLabel: tier === 'bronze' ? 'Đồng' : tier === 'silver' ? 'Bạc' : tier === 'gold' ? 'Vàng' : 'Kim Cương',
        accentText: 'text-slate-500 dark:text-slate-400',
      };
    }

    switch (tier) {
      case 'bronze':
        return {
          bg: 'bg-amber-50/70 dark:bg-amber-950/20',
          border: 'border-amber-300 dark:border-amber-800',
          badgeBg: 'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-50 shadow-md shadow-amber-900/20',
          ribbon: 'bg-amber-700 text-amber-100',
          tierLabel: 'Huy Chương Đồng',
          accentText: 'text-amber-800 dark:text-amber-300',
        };
      case 'silver':
        return {
          bg: 'bg-slate-50 dark:bg-slate-800/40',
          border: 'border-slate-300 dark:border-slate-600',
          badgeBg: 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 text-white shadow-md shadow-slate-900/20',
          ribbon: 'bg-slate-600 text-slate-100',
          tierLabel: 'Huy Chương Bạc',
          accentText: 'text-slate-700 dark:text-slate-200',
        };
      case 'gold':
        return {
          bg: 'bg-yellow-50/80 dark:bg-yellow-950/20',
          border: 'border-yellow-400 dark:border-yellow-600',
          badgeBg: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-600/30',
          ribbon: 'bg-yellow-600 text-yellow-50',
          tierLabel: 'Huy Chương Vàng',
          accentText: 'text-yellow-800 dark:text-yellow-300',
        };
      case 'diamond':
        return {
          bg: 'bg-cyan-50/70 dark:bg-indigo-950/25',
          border: 'border-cyan-400 dark:border-cyan-600',
          badgeBg: 'bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-300/50',
          ribbon: 'bg-cyan-700 text-cyan-50',
          tierLabel: 'Huy Chương Kim Cương',
          accentText: 'text-cyan-800 dark:text-cyan-300',
        };
    }
  };

  const renderBadgeIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'Flame':
        return <Flame className={className} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Crown':
        return <Crown className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Star':
        return <Star className={className} />;
      case 'Target':
        return <Target className={className} />;
      case 'Clock':
        return <Clock className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Award':
      default:
        return <Award className={className} />;
    }
  };

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    if (badge.unlocked) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
        });
        playSuccessSound();
      } catch (err) {
        // silent
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Metric Bar */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-amber-500/10 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-amber-950/30 rounded-2xl p-4 sm:p-5 border border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
            <Award className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Bộ Sưu Tập Huy Chương & Danh Hiệu
              </h3>
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
                {unlockedCount}/{totalCount} đã đạt
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tích lũy chuỗi ngày rèn luyện và số bài thi hoàn thành để mở khóa huy chương danh dự.
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full sm:w-56 shrink-0 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>Tiến độ vinh danh</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{completionPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      {!compact && (
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tất cả ({totalCount})
          </button>
          <button
            onClick={() => setSelectedCategory('unlocked')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'unlocked'
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Đã mở khóa ({unlockedCount})
          </button>
          <button
            onClick={() => setSelectedCategory('locked')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'locked'
                ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Đang phấn đấu ({totalCount - unlockedCount})
          </button>
        </div>
      )}

      {/* Badges Grid */}
      <div className={`grid ${compact ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}`}>
        {filteredBadges.map((badge) => {
          const v = getTierVisuals(badge.tier, badge.unlocked);
          const progressPercent = Math.min(100, Math.round((badge.currentValue / badge.targetValue) * 100));

          return (
            <div
              key={badge.id}
              onClick={() => handleBadgeClick(badge)}
              className={`relative rounded-2xl p-4 border transition-all cursor-pointer group flex flex-col justify-between ${v.bg} ${v.border} ${
                badge.unlocked
                  ? 'hover:scale-[1.02] hover:shadow-md'
                  : 'opacity-85 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {/* Top Row: Medal Icon & Tier Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${v.badgeBg}`}>
                  {renderBadgeIcon(badge.iconName, 'w-6 h-6')}
                </div>

                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${v.ribbon}`}>
                    {v.tierLabel}
                  </span>
                  {badge.unlocked ? (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                      <Unlock className="w-3 h-3" />
                      Đạt thành tích
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1">
                      <Lock className="w-3 h-3" />
                      Chưa mở
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-3 space-y-1">
                <h4 className={`text-sm font-bold ${badge.unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                  {badge.titleVi}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {badge.descriptionVi}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-slate-500 dark:text-slate-400">
                    {badge.unlocked ? 'Hoàn thành' : 'Tiến độ'}
                  </span>
                  <span className={`font-bold tabular-nums ${v.accentText}`}>
                    {badge.currentValue} / {badge.targetValue}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      badge.unlocked
                        ? 'bg-emerald-500'
                        : 'bg-indigo-500'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestone Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    getTierVisuals(selectedBadge.tier, selectedBadge.unlocked).badgeBg
                  }`}
                >
                  {renderBadgeIcon(selectedBadge.iconName, 'w-7 h-7')}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {getTierVisuals(selectedBadge.tier, selectedBadge.unlocked).tierLabel}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedBadge.titleVi}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {selectedBadge.title}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {selectedBadge.descriptionVi}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Trạng thái hiện tại:</span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {selectedBadge.currentValue} / {selectedBadge.targetValue} ({selectedBadge.unlocked ? 'Đã đạt' : 'Đang phấn đấu'})
                </span>
              </div>
            </div>

            {/* Teacher encouragement note */}
            <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Lời khuyên từ Thầy StevenBui: </strong>
                {selectedBadge.unlocked
                  ? 'Thầy chúc mừng em đã hoàn thành xuất sắc cột mốc danh giá này! Hãy tiếp tục rèn luyện mỗi ngày để duy trì thính giác nhạy bén nhé!'
                  : 'Mỗi ngày hãy dành ra 15 phút tập trung nghe, đọc theo phụ đề và ghi lại từ mới để nhanh chóng mở khóa huy chương này nhé!'}
              </div>
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
