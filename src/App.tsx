import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DailyReminderBanner } from './components/DailyReminderBanner';
import { TestPracticeView } from './components/TestPracticeView';
import { MockExamView } from './components/MockExamView';
import { WeeklyReportView } from './components/WeeklyReportView';
import { MistakeNotebookView } from './components/MistakeNotebookView';
import { SettingsModal } from './components/SettingsModal';
import { AuthModal } from './components/AuthModal';
import { UserProgress, TestAttempt, UserAccount } from './types';
import {
  loadUserProgress,
  recordTestCompletion,
  removeMistake,
  toggleSavedVocab,
  saveUserProgress,
} from './utils/storage';
import { Phone } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());
  const [activeTab, setActiveTab] = useState<'practice' | 'mock_exam' | 'weekly_report' | 'mistakes' | 'settings'>('practice');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [targetTestId, setTargetTestId] = useState<string | undefined>(undefined);

  // Sync theme to document.documentElement
  useEffect(() => {
    if (progress.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.theme]);

  // Synchronize progress to localStorage
  const handleRecordAttempt = (attempt: TestAttempt, durationSeconds: number) => {
    setProgress((prev) => {
      const updated = recordTestCompletion(prev, attempt, durationSeconds);
      return updated;
    });
  };

  const handleRemoveMistake = (testId: string, questionId: string) => {
    setProgress((prev) => removeMistake(prev, testId, questionId));
  };

  const handleToggleVocab = (word: string) => {
    setProgress((prev) => toggleSavedVocab(prev, word));
  };

  const handleOpenTestFromMistake = (testId: string) => {
    setTargetTestId(testId);
    setActiveTab('practice');
  };

  const handleToggleTheme = () => {
    setProgress((prev) => {
      const newTheme = prev.theme === 'dark' ? 'light' : 'dark';
      const updated: UserProgress = {
        ...prev,
        theme: newTheme,
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  const handleLogin = (account: UserAccount) => {
    setProgress((prev) => {
      const updated: UserProgress = {
        ...prev,
        account,
        profile: {
          ...prev.profile,
          name: account.displayName || prev.profile.name,
        },
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  const handleLogout = () => {
    setProgress((prev) => {
      const updated: UserProgress = {
        ...prev,
        account: null,
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  // Check daily study reminder time
  useEffect(() => {
    if (!progress.reminder.enabled) return;

    const checkReminder = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMins = String(now.getMinutes()).padStart(2, '0');
      const currentTime = `${currentHours}:${currentMins}`;

      if (currentTime === progress.reminder.time) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('EduListen - Nhắc nhở giờ học 🎧', {
            body: `Chào ${progress.profile.name}! Đã đến giờ ôn tập luyện nghe tiếng Anh hôm nay rồi. Hãy dành 15 phút nhé!`,
          });
        }
      }
    };

    const interval = setInterval(checkReminder, 60000);
    return () => clearInterval(interval);
  }, [progress.reminder, progress.profile.name]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      progress.theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'settings') {
            setIsSettingsOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        progress={progress}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleTheme={handleToggleTheme}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Daily Study & Reminder Banner (Visible on practice tab) */}
        {activeTab === 'practice' && (
          <DailyReminderBanner
            progress={progress}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onStartDailyPractice={() => {
              setTargetTestId('a1-test-01');
            }}
          />
        )}

        {/* Practice Tests Screen */}
        {activeTab === 'practice' && (
          <TestPracticeView
            progress={progress}
            onRecordAttempt={handleRecordAttempt}
            onToggleVocab={handleToggleVocab}
            initialTestId={targetTestId}
            onGoToMistakes={() => setActiveTab('mistakes')}
          />
        )}

        {/* Timed Mock Exam Mode */}
        {activeTab === 'mock_exam' && (
          <MockExamView
            progress={progress}
            onRecordAttempt={handleRecordAttempt}
            onGoToReport={() => setActiveTab('weekly_report')}
          />
        )}

        {/* Weekly Detailed Report & Printable Report Card */}
        {activeTab === 'weekly_report' && (
          <WeeklyReportView progress={progress} />
        )}

        {/* Mistake Notebook & Saved Vocabulary */}
        {activeTab === 'mistakes' && (
          <MistakeNotebookView
            progress={progress}
            onRemoveMistake={handleRemoveMistake}
            onToggleVocab={handleToggleVocab}
            onOpenTest={handleOpenTestFromMistake}
          />
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        progress={progress}
        onUpdateProgress={(updated) => setProgress(updated)}
        onOpenAuth={() => {
          setIsSettingsOpen(false);
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Auth / Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentAccount={progress.account}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12 py-8 text-xs text-slate-500 dark:text-slate-400 no-print transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                E
              </div>
              <span className="font-bold text-slate-900 dark:text-white">EduListen A1-B2</span>
              <span>— Luyện nghe tiếng Anh chuẩn cho học sinh</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
              <span>Tác giả: <strong className="text-slate-900 dark:text-white">StevenBui</strong></span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Hotline: <strong className="text-slate-900 dark:text-white">0982826817</strong></span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
