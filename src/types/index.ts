export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2';

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond';
export type BadgeCategory = 'streak' | 'tests' | 'score' | 'level' | 'learning';

export interface Badge {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  iconName: string;
  tier: BadgeTier;
  category: BadgeCategory;
  currentValue: number;
  targetValue: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export type QuestionType = 'multiple_choice' | 'fill_in_blank' | 'true_false';

export interface QuestionOption {
  id: string;
  text: string;
  imageEmoji?: string;
}

export interface ListeningQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  promptVi: string;
  options?: QuestionOption[];
  correctAnswer: string; // id or text (for fill in blank)
  acceptableAnswers?: string[]; // alternative spellings for fill-in
  explanation: string;
  explanationVi: string;
  transcriptClue?: string; // Sentence snippet in transcript
}

export interface TranscriptLine {
  id: string;
  speaker?: string;
  text: string;
  viText?: string;
  startSec?: number;
}

export interface VocabItem {
  word: string;
  ipa: string;
  meaning: string;
  example: string;
  exampleVi: string;
}

export interface ListeningTest {
  id: string;
  level: CefrLevel;
  title: string;
  vietnameseTitle: string;
  topic: string;
  topicVi: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khá' | 'Nâng cao';
  estimatedMinutes: number;
  description: string;
  descriptionVi: string;
  transcripts: TranscriptLine[];
  questions: ListeningQuestion[];
  vocabulary: VocabItem[];
}

export interface QuestionMistake {
  testId: string;
  testTitle: string;
  questionId: string;
  prompt: string;
  promptVi: string;
  studentAnswer: string;
  correctAnswer: string;
  explanationVi: string;
  date: string;
  level: CefrLevel;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  level: CefrLevel;
  topic: string;
  date: string; // ISO date string
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  mistakes: QuestionMistake[];
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  minutesListened: number;
  testsCompleted: number;
  questionsAnswered: number;
  correctAnswers: number;
}

export interface ReminderSettings {
  enabled: boolean;
  time: string; // e.g., "19:30"
  soundEnabled: boolean;
  browserNotifications: boolean;
  lastNotifiedDate?: string;
}

export interface StudentProfile {
  name: string;
  grade: string;
  school: string;
  dailyGoalMinutes: number;
}

export interface UserProgress {
  profile: StudentProfile;
  reminder: ReminderSettings;
  attempts: TestAttempt[];
  dailyActivities: Record<string, DailyActivity>; // keyed by YYYY-MM-DD
  mistakes: QuestionMistake[];
  savedVocabWords: string[];
  streak: {
    current: number;
    best: number;
    lastActiveDate: string;
  };
  theme: 'light' | 'dark';
  account?: UserAccount | null;
}

export interface UserAccount {
  id: string;
  email: string;
  displayName: string;
  provider: 'google' | 'email' | 'school';
  avatarUrl?: string;
  schoolId?: string;
}
