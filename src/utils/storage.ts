import { UserProgress, TestAttempt, QuestionMistake } from '../types';

const STORAGE_KEY = 'edulisten_progress_v2';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getInitialProgress(): UserProgress {
  const today = getTodayDateString();
  
  // Seed sample starter activity for the current week so charts look active & motivating
  const sampleActivities: Record<string, { date: string; minutesListened: number; testsCompleted: number; questionsAnswered: number; correctAnswers: number }> = {};
  
  const d = new Date();
  for (let i = 4; i >= 1; i--) {
    const prev = new Date(d);
    prev.setDate(d.getDate() - i);
    const dateStr = prev.toISOString().split('T')[0];
    sampleActivities[dateStr] = {
      date: dateStr,
      minutesListened: 12 + (i % 3) * 5,
      testsCompleted: 1,
      questionsAnswered: 5,
      correctAnswers: 4 + (i % 2),
    };
  }

  return {
    profile: {
      name: 'Học sinh',
      grade: 'Lớp 6',
      school: 'THCS',
      dailyGoalMinutes: 15,
    },
    reminder: {
      enabled: true,
      time: '19:30',
      soundEnabled: true,
      browserNotifications: false,
    },
    attempts: [
      {
        id: 'starter-attempt-1',
        testId: 'a1-test-01',
        testTitle: 'School & Classroom Supplies',
        level: 'A1',
        topic: 'School Life',
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        score: 4,
        totalQuestions: 5,
        percentage: 80,
        timeSpentSeconds: 320,
        mistakes: []
      }
    ],
    dailyActivities: sampleActivities,
    mistakes: [],
    savedVocabWords: ['pencil case', 'crossroads', 'sore throat'],
    streak: {
      current: 3,
      best: 7,
      lastActiveDate: today,
    },
    theme: 'light',
    account: null,
  };
}

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return getInitialProgress();
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const initial = getInitialProgress();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(saved) as UserProgress;
    if (!parsed.theme) {
      parsed.theme = 'light';
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
    return getInitialProgress();
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function recordTestCompletion(
  current: UserProgress,
  attempt: TestAttempt,
  timeSpentSeconds: number
): UserProgress {
  const today = getTodayDateString();
  const minutes = Math.max(1, Math.round(timeSpentSeconds / 60));

  // Update or create daily activity
  const existingDay = current.dailyActivities[today] || {
    date: today,
    minutesListened: 0,
    testsCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
  };

  const updatedDaily: Record<string, typeof existingDay> = {
    ...current.dailyActivities,
    [today]: {
      date: today,
      minutesListened: existingDay.minutesListened + minutes,
      testsCompleted: existingDay.testsCompleted + 1,
      questionsAnswered: existingDay.questionsAnswered + attempt.totalQuestions,
      correctAnswers: existingDay.correctAnswers + attempt.score,
    },
  };

  // Update streak
  let newStreak = current.streak.current;
  const lastActive = current.streak.lastActiveDate;
  if (lastActive !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    if (lastActive === yesterdayStr) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  }

  // Update mistakes list
  // Remove fixed ones and append new ones
  const newMistakes = [...current.mistakes];
  attempt.mistakes.forEach((m) => {
    const exists = newMistakes.find(
      (em) => em.testId === m.testId && em.questionId === m.questionId
    );
    if (!exists) {
      newMistakes.unshift(m);
    }
  });

  const updated: UserProgress = {
    ...current,
    attempts: [attempt, ...current.attempts],
    dailyActivities: updatedDaily,
    mistakes: newMistakes,
    streak: {
      current: newStreak,
      best: Math.max(newStreak, current.streak.best),
      lastActiveDate: today,
    },
  };

  saveUserProgress(updated);
  return updated;
}

export function removeMistake(
  current: UserProgress,
  testId: string,
  questionId: string
): UserProgress {
  const updated: UserProgress = {
    ...current,
    mistakes: current.mistakes.filter(
      (m) => !(m.testId === testId && m.questionId === questionId)
    ),
  };
  saveUserProgress(updated);
  return updated;
}

export function toggleSavedVocab(current: UserProgress, word: string): UserProgress {
  const exists = current.savedVocabWords.includes(word);
  const updatedWords = exists
    ? current.savedVocabWords.filter((w) => w !== word)
    : [...current.savedVocabWords, word];

  const updated: UserProgress = {
    ...current,
    savedVocabWords: updatedWords,
  };
  saveUserProgress(updated);
  return updated;
}
