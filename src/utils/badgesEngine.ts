import { UserProgress, Badge } from '../types';

export const ALL_BADGES_DEFINITIONS: Omit<Badge, 'currentValue' | 'unlocked' | 'unlockedAt'>[] = [
  // Streak Badges
  {
    id: 'streak-3',
    title: '3-Day Focus',
    titleVi: '3 Ngày Bền Bỉ',
    description: 'Practice listening 3 days in a row',
    descriptionVi: 'Duy trì học nghe tiếng Anh 3 ngày liên tiếp không gián đoạn.',
    iconName: 'Flame',
    tier: 'bronze',
    category: 'streak',
    targetValue: 3,
  },
  {
    id: 'streak-7',
    title: '7 Days Streak',
    titleVi: 'Chiến Binh 7 Ngày',
    description: 'Keep a 7-day listening habit streak',
    descriptionVi: 'Xuất sắc duy trì chuỗi học 7 ngày liên tiếp để hình thành phản xạ âm thanh.',
    iconName: 'Flame',
    tier: 'silver',
    category: 'streak',
    targetValue: 7,
  },
  {
    id: 'streak-14',
    title: '14-Day Champion',
    titleVi: 'Bậc Thầy Chuyên Cần 14 Ngày',
    description: 'Maintain a 14-day continuous study habit',
    descriptionVi: 'Đạt chuỗi 14 ngày luyện nghe chăm chỉ, biểu tượng của sự kiên trì.',
    iconName: 'Sparkles',
    tier: 'gold',
    category: 'streak',
    targetValue: 14,
  },
  {
    id: 'streak-30',
    title: '30-Day Legend',
    titleVi: 'Huyền Thoại 30 Ngày',
    description: 'Complete 30 consecutive days of practice',
    descriptionVi: 'Thành tựu đỉnh cao với 30 ngày rèn luyện liên tục.',
    iconName: 'Crown',
    tier: 'diamond',
    category: 'streak',
    targetValue: 30,
  },

  // Tests Completed Badges
  {
    id: 'tests-1',
    title: 'First Step',
    titleVi: 'Khởi Đầu Tự Tin',
    description: 'Complete your first listening test',
    descriptionVi: 'Hoàn thành bài luyện nghe đầu tiên trên hệ thống.',
    iconName: 'CheckCircle2',
    tier: 'bronze',
    category: 'tests',
    targetValue: 1,
  },
  {
    id: 'tests-5',
    title: 'Active Learner',
    titleVi: 'Chăm Chỉ Luyện Tập',
    description: 'Complete 5 listening tests',
    descriptionVi: 'Hoàn thành 5 bài luyện tập hoặc đề thi thử Cambridge CEFR.',
    iconName: 'Zap',
    tier: 'silver',
    category: 'tests',
    targetValue: 5,
  },
  {
    id: 'tests-10',
    title: '10 Tests Completed',
    titleVi: 'Kỷ Lục Gia 10 Bài Thi',
    description: 'Successfully finish 10 listening tests',
    descriptionVi: 'Vượt qua mốc 10 bài thi nghe để tích lũy vốn từ và phản xạ vượt trội.',
    iconName: 'Award',
    tier: 'gold',
    category: 'tests',
    targetValue: 10,
  },
  {
    id: 'tests-20',
    title: 'Listening Master',
    titleVi: 'Bậc Thầy Nghe Hiểu',
    description: 'Complete 20 listening tests',
    descriptionVi: 'Chinh phục 20 bài kiểm tra với số điểm đáng tự hào.',
    iconName: 'Crown',
    tier: 'diamond',
    category: 'tests',
    targetValue: 20,
  },

  // Score & Accuracy
  {
    id: 'score-perfect-1',
    title: 'Golden Ear 100%',
    titleVi: 'Thính Giác Vàng 100%',
    description: 'Score 100% on any listening test',
    descriptionVi: 'Đạt điểm số tuyệt đối 100% trong ít nhất một bài kiểm tra nghe.',
    iconName: 'Star',
    tier: 'gold',
    category: 'score',
    targetValue: 1,
  },
  {
    id: 'score-perfect-3',
    title: 'Diamond Listener',
    titleVi: 'Đôi Tai Kim Cương',
    description: 'Score 100% on 3 different listening tests',
    descriptionVi: '3 lần đạt điểm số 100% tuyệt đối, chứng tỏ khả năng bắt từ khóa siêu việt.',
    iconName: 'Sparkles',
    tier: 'diamond',
    category: 'score',
    targetValue: 3,
  },
  {
    id: 'score-high-80',
    title: 'Sharp Reflexes',
    titleVi: 'Phản Xạ Nhạy Bén',
    description: 'Score 80%+ on 5 tests',
    descriptionVi: 'Đạt từ 80% điểm số trở lên trong 5 bài làm khác nhau.',
    iconName: 'Target',
    tier: 'silver',
    category: 'score',
    targetValue: 5,
  },

  // Level Milestones (A1 to B2)
  {
    id: 'level-a1',
    title: 'A1 Achiever',
    titleVi: 'Thành Thạo A1 (Sơ cấp)',
    description: 'Pass an A1 test with 70%+ score',
    descriptionVi: 'Vượt qua bài kiểm tra cấp độ A1 với số điểm từ 70% trở lên.',
    iconName: 'CheckCircle2',
    tier: 'bronze',
    category: 'level',
    targetValue: 1,
  },
  {
    id: 'level-a2',
    title: 'A2 Conqueror',
    titleVi: 'Chinh Phục A2 (Cơ bản)',
    description: 'Pass an A2 test with 70%+ score',
    descriptionVi: 'Vượt qua bài kiểm tra cấp độ A2 hội thoại và thông báo thực tế.',
    iconName: 'Award',
    tier: 'silver',
    category: 'level',
    targetValue: 1,
  },
  {
    id: 'level-b1',
    title: 'B1 Intermediate Hero',
    titleVi: 'Chinh Phục B1 (Trung cấp)',
    description: 'Pass a B1 test with 70%+ score',
    descriptionVi: 'Nắm vững các đoạn thảo luận học thuật và phỏng vấn trình độ B1.',
    iconName: 'Zap',
    tier: 'gold',
    category: 'level',
    targetValue: 1,
  },
  {
    id: 'level-b2',
    title: 'B2 Upper-Intermediate Master',
    titleVi: 'Chinh Phục B2 (Trung cao cấp)',
    description: 'Pass a B2 test with 70%+ score',
    descriptionVi: 'Chinh phục bài giảng học thuật đại học và hội thảo chuyên sâu cấp độ B2.',
    iconName: 'Crown',
    tier: 'diamond',
    category: 'level',
    targetValue: 1,
  },

  // Habits & Knowledge
  {
    id: 'time-30',
    title: 'Steady Ears (30 Mins)',
    titleVi: 'Đôi Tai Bền Bỉ (30 Phút)',
    description: 'Accumulate 30 minutes of listening practice',
    descriptionVi: 'Tích lũy tổng thời gian nghe 30 phút trên hệ thống.',
    iconName: 'Clock',
    tier: 'bronze',
    category: 'learning',
    targetValue: 30,
  },
  {
    id: 'time-60',
    title: 'Listening Pro (60 Mins)',
    titleVi: 'Chiến Binh 60 Phút',
    description: 'Accumulate 60 minutes of listening practice',
    descriptionVi: 'Tích lũy trọn vẹn 1 giờ đồng hồ luyện nghe tiếng Anh chất lượng cao.',
    iconName: 'Clock',
    tier: 'silver',
    category: 'learning',
    targetValue: 60,
  },
  {
    id: 'vocab-5',
    title: 'Vocabulary Explorer',
    titleVi: 'Nhà Thông Thái Từ Vựng',
    description: 'Bookmark at least 5 vocabulary items to notebook',
    descriptionVi: 'Lưu ít nhất 5 từ vựng trọng tâm vào Sổ tay để ghi nhớ lâu dài.',
    iconName: 'BookOpen',
    tier: 'bronze',
    category: 'learning',
    targetValue: 5,
  },
];

/**
 * Evaluates all badges dynamically against user progress
 */
export function calculateBadges(progress: UserProgress): Badge[] {
  // Aggregate stats
  const bestStreak = Math.max(progress.streak.current, progress.streak.best || 0);
  const totalTests = progress.attempts.length;
  
  // Total minutes listened
  let totalMinutes = 0;
  Object.values(progress.dailyActivities).forEach((d) => {
    totalMinutes += d.minutesListened;
  });
  if (totalMinutes === 0 && totalTests > 0) {
    totalMinutes = Math.round(progress.attempts.reduce((acc, a) => acc + a.timeSpentSeconds, 0) / 60);
  }

  // Count perfect tests
  const perfectTestsCount = progress.attempts.filter((a) => a.percentage === 100).length;

  // Count tests >= 80%
  const highScoringTests = progress.attempts.filter((a) => a.percentage >= 80).length;

  // Level pass counts (score >= 70%)
  const a1PassCount = progress.attempts.filter((a) => a.level === 'A1' && a.percentage >= 70).length;
  const a2PassCount = progress.attempts.filter((a) => a.level === 'A2' && a.percentage >= 70).length;
  const b1PassCount = progress.attempts.filter((a) => a.level === 'B1' && a.percentage >= 70).length;
  const b2PassCount = progress.attempts.filter((a) => a.level === 'B2' && a.percentage >= 70).length;

  const savedVocabCount = progress.savedVocabWords?.length || 0;

  return ALL_BADGES_DEFINITIONS.map((def) => {
    let currentValue = 0;

    switch (def.id) {
      case 'streak-3':
      case 'streak-7':
      case 'streak-14':
      case 'streak-30':
        currentValue = bestStreak;
        break;

      case 'tests-1':
      case 'tests-5':
      case 'tests-10':
      case 'tests-20':
        currentValue = totalTests;
        break;

      case 'score-perfect-1':
      case 'score-perfect-3':
        currentValue = perfectTestsCount;
        break;

      case 'score-high-80':
        currentValue = highScoringTests;
        break;

      case 'level-a1':
        currentValue = a1PassCount;
        break;

      case 'level-a2':
        currentValue = a2PassCount;
        break;

      case 'level-b1':
        currentValue = b1PassCount;
        break;

      case 'level-b2':
        currentValue = b2PassCount;
        break;

      case 'time-30':
      case 'time-60':
        currentValue = totalMinutes;
        break;

      case 'vocab-5':
        currentValue = savedVocabCount;
        break;

      default:
        currentValue = 0;
    }

    const unlocked = currentValue >= def.targetValue;

    return {
      ...def,
      currentValue: Math.min(currentValue, def.targetValue),
      unlocked,
      unlockedAt: unlocked ? new Date().toISOString() : undefined,
    };
  });
}
