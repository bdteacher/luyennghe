import React, { useState } from 'react';
import {
  Printer,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Share2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Flame,
  CheckCircle2,
  Unlock
} from 'lucide-react';
import { UserProgress, TestAttempt } from '../types';
import { Badges } from './Badges';
import { calculateBadges } from '../utils/badgesEngine';

interface WeeklyReportViewProps {
  progress: UserProgress;
}

// Helper to get week start and end dates
function getWeekRange(weeksAgo = 0): { start: Date; end: Date; label: string; days: { name: string; dateStr: string }[] } {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday
  const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(now);
  monday.setDate(now.getDate() + distanceToMonday - weeksAgo * 7);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const days: { name: string; dateStr: string }[] = [];
  const dayNames = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    days.push({
      name: dayNames[i],
      dateStr: `${yyyy}-${mm}-${dd}`,
    });
  }

  const startFormatted = `${monday.getDate()}/${monday.getMonth() + 1}`;
  const endFormatted = `${sunday.getDate()}/${sunday.getMonth() + 1}/${sunday.getFullYear()}`;
  const label = weeksAgo === 0 ? `Tuần này (${startFormatted} - ${endFormatted})` : `Cách đây ${weeksAgo} tuần (${startFormatted} - ${endFormatted})`;

  return { start: monday, end: sunday, label, days };
}

export const WeeklyReportView: React.FC<WeeklyReportViewProps> = ({ progress }) => {
  const [selectedWeekOffset, setSelectedWeekOffset] = useState<number>(0);

  const weekInfo = getWeekRange(selectedWeekOffset);

  // Filter attempts in this week range
  const weekAttempts = progress.attempts.filter((a) => {
    const attemptDate = new Date(a.date);
    return attemptDate >= weekInfo.start && attemptDate <= weekInfo.end;
  });

  // Calculate metrics
  let totalMinutes = 0;
  let totalQuestionsAnswered = 0;
  let totalCorrectAnswers = 0;

  weekInfo.days.forEach((day) => {
    const act = progress.dailyActivities[day.dateStr];
    if (act) {
      totalMinutes += act.minutesListened;
      totalQuestionsAnswered += act.questionsAnswered;
      totalCorrectAnswers += act.correctAnswers;
    }
  });

  // Also include direct attempt minutes if dailyActivities had no entry
  if (totalMinutes === 0 && weekAttempts.length > 0) {
    totalMinutes = Math.round(weekAttempts.reduce((acc, a) => acc + a.timeSpentSeconds, 0) / 60);
  }

  const averageAccuracy =
    totalQuestionsAnswered > 0
      ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100)
      : weekAttempts.length > 0
      ? Math.round(
          weekAttempts.reduce((acc, a) => acc + a.percentage, 0) / weekAttempts.length
        )
      : 0;

  // Max minutes for bar chart scaling
  const maxDayMinutes = Math.max(
    25,
    ...weekInfo.days.map((d) => progress.dailyActivities[d.dateStr]?.minutesListened || 0)
  );

  // Teacher feedback calculation based on metrics
  const getTeacherEvaluation = () => {
    if (weekAttempts.length === 0 && totalMinutes === 0) {
      return {
        rating: 'Chưa có dữ liệu tuần này',
        summary:
          'Học sinh chưa hoàn thành bài luyện tập nào trong tuần này. Hãy dành 15 phút mỗi ngày để rèn luyện thói quen phản xạ âm thanh nhé!',
        recommendation:
          'Nên bắt đầu với các bài luyện nghe trình độ A1 về chủ đề Trường học và Thói quen sinh hoạt.',
      };
    }
    if (averageAccuracy >= 85) {
      return {
        rating: 'Xuất sắc ★★★★★',
        summary: `Học sinh ${progress.profile.name} có khả năng bắt từ khóa và nhận diện ngữ điệu rất tốt. Tỉ lệ chính xác đạt ${averageAccuracy}%, hoàn thành ${weekAttempts.length} bài thi và đạt thời lượng nghe ${totalMinutes} phút.`,
        recommendation:
          'Khuyến khích học sinh tiếp tục thử thách với các bài thi thử A2 có tốc độ 1.1x và nghe đoạn hội thoại có nhiều giọng bản ngữ khác nhau (UK, US, AU).',
      };
    }
    if (averageAccuracy >= 70) {
      return {
        rating: 'Tốt ★★★★☆',
        summary: `Học sinh nắm bắt được nội dung chính của các bài đối thoại thông thường. Điểm trung bình tuần đạt ${averageAccuracy}%, cần chú ý thêm dạng bài điền số điện thoại, giờ giấc và từ vựng chỉ đường.`,
        recommendation:
          'Ôn tập lại các câu đã ghi vào Sổ tay câu sai và luyện nghe lại với chế độ Hiện lời thoại để đối chiếu từ vựng.',
      };
    }
    return {
      rating: 'Cần cố gắng ★★★☆☆',
      summary: `Học sinh đã có sự nỗ lực luyện tập trong tuần (${totalMinutes} phút nghe). Tuy nhiên tỉ lệ chính xác còn hạn chế (${averageAccuracy}%). Cần chú ý phát âm chuẩn các âm đuôi và nhận biết từ vựng cơ bản.`,
      recommendation:
        'Nên chọn tốc độ đọc 0.75x (Chậm), đọc kĩ từ vựng trước khi nghe và làm lại mỗi bài ít nhất 2 lần.',
    };
  };

  const evaluation = getTeacherEvaluation();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Week Selector Bar - Hidden on print */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 no-print transition-colors">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
            Báo Cáo Tiến Độ Học Tập Theo Tuần
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedWeekOffset((prev) => prev + 1)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
            title="Xem tuần trước đó"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Tuần trước</span>
          </button>

          <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 tabular-nums">
            {weekInfo.label}
          </span>

          <button
            disabled={selectedWeekOffset === 0}
            onClick={() => setSelectedWeekOffset((prev) => Math.max(0, prev - 1))}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 text-xs font-semibold flex items-center gap-1 transition-colors"
            title="Xem tuần tiếp theo"
          >
            <span className="hidden sm:inline">Tuần sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="ml-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>In phiếu báo cáo</span>
          </button>
        </div>
      </div>

      {/* 4 Weekly Stat KPI Cards - Hidden on print */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Thời gian nghe tuần</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {totalMinutes} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">phút</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Mục tiêu: 105 phút/tuần</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Số bài đã luyện</span>
            <BookOpen className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {weekAttempts.length} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">bài</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Bao gồm cả bài thi thử</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Độ chính xác trung bình</span>
            <TrendingUp className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {averageAccuracy}%
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {totalCorrectAnswers}/{totalQuestionsAnswered || 1} câu trả lời đúng
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Chuỗi ngày chuyên cần</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {progress.streak.current} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">ngày liên tục</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Kỷ lục cao nhất: {progress.streak.best} ngày</p>
        </div>
      </div>

      {/* 7-Day Chart: Practice Minutes per Day - Hidden on print */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs no-print space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
            Biểu Đồ Thời Lượng Luyện Nghe 7 Ngày Trong Tuần
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">Đơn vị tính: Phút</span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 pt-8 border-b border-slate-100 dark:border-slate-800">
          {weekInfo.days.map((day) => {
            const minutes = progress.dailyActivities[day.dateStr]?.minutesListened || 0;
            const barHeightPercent = Math.max(8, Math.round((minutes / maxDayMinutes) * 100));
            const isCompleted = minutes >= (progress.profile.dailyGoalMinutes || 15);

            return (
              <div key={day.dateStr} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-bold text-slate-600 opacity-80 group-hover:opacity-100 tabular-nums">
                  {minutes > 0 ? `${minutes}p` : '0'}
                </span>

                <div className="w-full max-w-[38px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-32">
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      isCompleted ? 'bg-indigo-600' : minutes > 0 ? 'bg-sky-400' : 'bg-transparent'
                    }`}
                    style={{ height: `${barHeightPercent}%` }}
                  />
                </div>

                <div className="text-center">
                  <span className="text-xs font-semibold text-slate-700 block">{day.name}</span>
                  <span className="text-[10px] text-slate-400 block tabular-nums">
                    {day.dateStr.split('-').slice(1).join('/')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIRTUAL BADGES & MEDALS SECTION (HUY CHƯƠNG & DANH HIỆU THÀNH TÍCH)       */}
      {/* ========================================================================= */}
      <div className="no-print">
        <Badges progress={progress} />
      </div>

      {/* ========================================================================= */}
      {/* OFFICIAL PRINTABLE WEEKLY REPORT CARD (PHIẾU BÁO CÁO HỌC TẬP TUẦN)        */}
      {/* Formatted perfectly for both on-screen viewing and window.print() output */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-300 shadow-sm print:border-none print:p-0 print:shadow-none space-y-6">
        {/* Certificate / Report Card Header */}
        <div className="border-b-2 border-indigo-900 pb-5 text-center relative">
          <div className="flex items-center justify-center text-xs text-slate-500 mb-2">
            <span>HỆ THỐNG LUYỆN NGHE TIẾNG ANH CHUẨN A1 - B2</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            PHIẾU ĐÁNH GIÁ KẾT QUẢ RÈN LUYỆN TUẦN
          </h2>
          <p className="text-xs sm:text-sm text-indigo-700 font-semibold mt-1">
            Chương trình rèn luyện kỹ năng nghe tiếng Anh cho học sinh phổ thông
          </p>

          <div className="text-xs text-slate-500 mt-2 font-mono tabular-nums">
            {weekInfo.label}
          </div>
        </div>

        {/* Student Profile Information Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block">Họ và tên học sinh:</span>
            <span className="font-bold text-slate-900 text-sm">{progress.profile.name || 'Học sinh'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Lớp / Khối học:</span>
            <span className="font-bold text-slate-900 text-sm">{progress.profile.grade || 'Lớp 6'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Trường học:</span>
            <span className="font-bold text-slate-900 text-sm">{progress.profile.school || 'THCS'}</span>
          </div>
        </div>

        {/* Weekly Academic Summary Table */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
            1. Bảng Tổng Hợp Kết Quả Luyện Nghe Trong Tuần
          </h4>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Ngày</th>
                  <th className="py-2.5 px-3">Tên bài luyện tập</th>
                  <th className="py-2.5 px-3">Trình độ</th>
                  <th className="py-2.5 px-3 text-center">Số câu đúng</th>
                  <th className="py-2.5 px-3 text-center">Độ chính xác</th>
                  <th className="py-2.5 px-3 text-right">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {weekAttempts.length > 0 ? (
                  weekAttempts.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono text-slate-500 tabular-nums">
                        {new Date(att.date).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        {att.testTitle}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          att.level === 'A1' ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {att.level}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-800 tabular-nums">
                        {att.score}/{att.totalQuestions}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-indigo-700 tabular-nums">
                        {att.percentage}%
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-500 tabular-nums">
                        {Math.round(att.timeSpentSeconds / 60)} phút
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400">
                      Chưa có lượt nộp bài nào trong tuần này.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50 font-bold text-slate-800 border-t border-slate-200">
                <tr>
                  <td colSpan={3} className="py-2.5 px-3">Tổng cộng toàn tuần:</td>
                  <td className="py-2.5 px-3 text-center tabular-nums">
                    {totalCorrectAnswers}/{totalQuestionsAnswered || '-'}
                  </td>
                  <td className="py-2.5 px-3 text-center text-indigo-700 tabular-nums">
                    {averageAccuracy}%
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums">
                    {totalMinutes} phút
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Section 2: Virtual Medals & Milestones Achieved */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Huy Chương & Danh Hiệu Thành Tích Đạt Được
            </h4>
            <span className="text-xs text-indigo-700 font-semibold">
              {calculateBadges(progress).filter((b) => b.unlocked).length} danh hiệu đã mở khóa
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {calculateBadges(progress)
              .filter((b) => b.unlocked)
              .slice(0, 4)
              .map((badge) => (
                <div
                  key={badge.id}
                  className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {badge.titleVi}
                    </span>
                    <span className="text-[10px] text-amber-800 block">
                      {badge.tier === 'bronze'
                        ? 'Huy chương Đồng'
                        : badge.tier === 'silver'
                        ? 'Huy chương Bạc'
                        : badge.tier === 'gold'
                        ? 'Huy chương Vàng'
                        : 'Huy chương Kim Cương'}
                    </span>
                  </div>
                </div>
              ))}

            {calculateBadges(progress).filter((b) => b.unlocked).length === 0 && (
              <div className="col-span-full py-4 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                Học sinh đang trong tiến trình mở khóa huy chương đầu tiên (Ví dụ: 7 Ngày Streak hoặc Hoàn thành 10 bài thi).
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Teacher's Assessment & Detailed Guidance */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              3. Nhận Xét & Đánh Giá Của Giáo Viên Chuyên Môn
            </h4>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Xếp loại: {evaluation.rating}
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            <strong>Đánh giá năng lực: </strong>
            {evaluation.summary}
          </p>

          <p className="text-xs text-slate-700 leading-relaxed">
            <strong>Kế hoạch rèn luyện tuần tới: </strong>
            {evaluation.recommendation}
          </p>
        </div>

        {/* Signatures & Author Branding Section */}
        <div className="grid grid-cols-2 pt-6 text-center text-xs text-slate-600 gap-8">
          <div>
            <p className="font-semibold text-slate-800 uppercase tracking-wider">
              Xác Nhận Của Phụ Huynh Học Sinh
            </p>
            <p className="text-[11px] text-slate-400 italic mt-0.5">(Ký và ghi rõ họ tên)</p>
            <div className="h-16 flex items-end justify-center">
              <span className="text-slate-300">...................................................</span>
            </div>
          </div>

          <div>
            <p className="font-semibold text-slate-800 uppercase tracking-wider">
              Giáo Viên / Tác Giả Chương Trình
            </p>
            <div className="h-16 flex flex-col items-center justify-center pt-2">
              <span className="font-bold text-indigo-950 text-base font-serif">StevenBui</span>
              <span className="text-slate-500 font-mono text-[11px]">Tel: 0982826817</span>
            </div>
            <p className="text-[10px] text-slate-400">Tác giả: StevenBui · Hotline hỗ trợ học tập: 0982826817</p>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 text-center border-t border-slate-100 pt-3">
          EduListen A1-B2 - Nền tảng luyện nghe tiếng Anh học sinh theo chuẩn Cambridge CEFR · Biên soạn bởi StevenBui
        </div>
      </div>
    </div>
  );
};
