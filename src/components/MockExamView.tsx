import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Clock, Play, Pause, RotateCcw, Award, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserProgress, TestAttempt, CefrLevel, QuestionMistake, ListeningQuestion, ListeningTest } from '../types';
import { LISTENING_TESTS } from '../data/listeningTests';
import { AudioPlayerBar } from './AudioPlayerBar';
import { speechEngine } from '../utils/speechEngine';
import { playSuccessSound, playTryAgainSound } from '../utils/soundEffects';

interface MockExamViewProps {
  progress: UserProgress;
  onRecordAttempt: (attempt: TestAttempt, durationSeconds: number) => void;
  onGoToReport: () => void;
}

export const MockExamView: React.FC<MockExamViewProps> = ({
  progress,
  onRecordAttempt,
  onGoToReport,
}) => {
  const [examLevel, setExamLevel] = useState<CefrLevel>('A1');
  const [examState, setExamState] = useState<'intro' | 'running' | 'finished'>('intro');
  const [examQuestions, setExamQuestions] = useState<{ question: ListeningQuestion; test: ListeningTest }[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600); // 10 minutes
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [examResult, setExamResult] = useState<{ score: number; total: number; percentage: number } | null>(null);

  // Generate 10 mixed questions for the chosen level
  const startExam = (level: CefrLevel) => {
    speechEngine.stop();
    setExamLevel(level);

    const levelTests = LISTENING_TESTS.filter((t) => t.level === level);
    const combined: { question: ListeningQuestion; test: ListeningTest }[] = [];

    levelTests.forEach((t) => {
      t.questions.forEach((q) => {
        combined.push({ question: q, test: t });
      });
    });

    // Shuffle and pick 8 questions
    const shuffled = [...combined].sort(() => 0.5 - Math.random()).slice(0, 8);

    setExamQuestions(shuffled);
    setCurrentIdx(0);
    setAnswers({});
    setTimeLeftSeconds(480); // 8 minutes
    setShowTranscript(false);
    setActiveLineIndex(0);
    setExamResult(null);
    setExamState('running');
  };

  // Timer countdown
  useEffect(() => {
    if (examState !== 'running') return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState, answers, examQuestions]);

  const finishExam = () => {
    speechEngine.stop();
    let score = 0;
    const mistakes: QuestionMistake[] = [];

    examQuestions.forEach(({ question: q, test }) => {
      const userAns = answers[q.id];
      const isCorrect =
        userAns &&
        (userAns.trim().toLowerCase() === q.correctAnswer.toLowerCase() ||
          q.acceptableAnswers?.some((a) => a.toLowerCase() === userAns.trim().toLowerCase()));

      if (isCorrect) {
        score++;
      } else {
        mistakes.push({
          testId: test.id,
          testTitle: `[Thi thử ${examLevel}] ${test.title}`,
          questionId: q.id,
          prompt: q.prompt,
          promptVi: q.promptVi,
          studentAnswer: userAns || '(Chưa làm)',
          correctAnswer: q.options?.find((o) => o.id === q.correctAnswer)?.text || q.correctAnswer,
          explanationVi: q.explanationVi,
          date: new Date().toISOString(),
          level: examLevel,
        });
      }
    });

    const total = examQuestions.length;
    const percentage = Math.round((score / total) * 100);
    setExamResult({ score, total, percentage });
    setExamState('finished');

    const elapsed = 480 - timeLeftSeconds;
    const attempt: TestAttempt = {
      id: `mock-${Date.now()}`,
      testId: `mock-${examLevel}-${Date.now()}`,
      testTitle: `Bài thi thử mô phỏng ${examLevel}`,
      level: examLevel,
      topic: 'Bài thi thử tổng hợp',
      date: new Date().toISOString(),
      score,
      totalQuestions: total,
      percentage,
      timeSpentSeconds: Math.max(30, elapsed),
      mistakes,
    };

    onRecordAttempt(attempt, elapsed);

    if (percentage >= 80) {
      playSuccessSound();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      playTryAgainSound();
    }
  };

  const currentItem = examQuestions[currentIdx];

  // INTRO SCREEN
  if (examState === 'intro') {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-6 transition-colors">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Bài Thi Thử Mô Phỏng Chuẩn CEFR</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
            Hệ thống sẽ chọn ngẫu nhiên 8 câu hỏi nghe từ ngân hàng đề, tính giờ trong 8 phút để học sinh rèn luyện tâm lý phòng thi thực tế.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
          <button
            onClick={() => startExam('A1')}
            className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 text-base">Đề thi A1</span>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-semibold">Sơ cấp</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              8 câu hỏi · Thời gian: 8 phút · Giọng đọc chuẩn bản ngữ
            </p>
          </button>

          <button
            onClick={() => startExam('A2')}
            className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-indigo-800 dark:text-indigo-400 text-base">Đề thi A2</span>
              <span className="text-xs bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded font-semibold">Cơ bản</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              8 câu hỏi · Thời gian: 8 phút · Hội thoại & thông báo
            </p>
          </button>

          <button
            onClick={() => startExam('B1')}
            className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-amber-800 dark:text-amber-400 text-base">Đề thi B1</span>
              <span className="text-xs bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-semibold">Trung cấp</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              8 câu hỏi · Thời gian: 8 phút · Phỏng vấn & dự án xã hội
            </p>
          </button>

          <button
            onClick={() => startExam('B2')}
            className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-purple-800 dark:text-purple-400 text-base">Đề thi B2</span>
              <span className="text-xs bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded font-semibold">Nâng cao</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              8 câu hỏi · Thời gian: 8 phút · Tọa đàm học thuật & khoa học
            </p>
          </button>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 pt-2">
          Học sinh có thể nghe lại audio nhiều lần trước khi hết giờ.
        </div>
      </div>
    );
  }

  // FINISHED SCREEN
  if (examState === 'finished' && examResult) {
    const isPass = examResult.percentage >= 70;
    const titleAward =
      examResult.percentage === 100
        ? 'Xuất sắc (Pass with Distinction)'
        : examResult.percentage >= 85
        ? 'Giỏi (Pass with Merit)'
        : examResult.percentage >= 70
        ? 'Đạt yêu cầu (Pass)'
        : 'Cần rèn luyện thêm (Needs Practice)';

    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-6 transition-colors">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
            isPass ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
          }`}
        >
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Kết quả thi thử trình độ {examLevel}
          </span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {examResult.score}/{examResult.total} Câu đúng ({examResult.percentage}%)
          </h2>
          <p className="text-base font-semibold text-indigo-600 mt-1">{titleAward}</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl text-left text-xs text-slate-600 space-y-2">
          <p>
            • Kết quả này đã được tự động lưu vào <strong>Hệ thống Báo cáo tuần</strong> của em.
          </p>
          <p>
            • Các câu làm chưa đúng đã được lưu vào <strong>Sổ tay câu sai</strong> để ôn luyện lại.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setExamState('intro')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold"
          >
            Làm bài thi khác
          </button>
          <button
            onClick={onGoToReport}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2"
          >
            <span>Xem Báo cáo tuần & In phiếu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // RUNNING EXAM SCREEN
  if (!currentItem) return null;

  const currentTest = currentItem.test;
  const currentQ = currentItem.question;
  const transcriptLines = currentTest.transcripts.map((t) => t.text);

  const mins = Math.floor(timeLeftSeconds / 60);
  const secs = timeLeftSeconds % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Exam Status Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
            Bài thi thử {examLevel}
          </span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Câu {currentIdx + 1}/{examQuestions.length}
          </span>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-800 dark:text-amber-300 font-mono text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>{timeFormatted}</span>
        </div>

        <button
          onClick={finishExam}
          className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
        >
          Nộp bài sớm
        </button>
      </div>

      {/* Embedded Audio Player */}
      <AudioPlayerBar
        transcriptTexts={transcriptLines}
        activeLineIndex={activeLineIndex}
        onLineChange={(idx) => setActiveLineIndex(idx)}
        showTranscript={showTranscript}
        onToggleTranscript={() => setShowTranscript(!showTranscript)}
      />

      {/* Transcript accordion if toggled on */}
      {showTranscript && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
          <span className="font-bold block text-slate-900 dark:text-white mb-1">Lời thoại bài nghe:</span>
          {currentTest.transcripts.map((t) => (
            <p key={t.id}>
              {t.speaker ? <strong>{t.speaker}: </strong> : null}
              {t.text}
            </p>
          ))}
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        <div>
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            Chủ đề: {currentTest.topicVi}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {currentQ.prompt}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{currentQ.promptVi}</p>
        </div>

        {/* Multiple choice options */}
        {currentQ.type === 'multiple_choice' && currentQ.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [currentQ.id]: opt.id }))
                  }
                  className={`p-3.5 rounded-xl border text-left text-sm transition-all ${
                    isSelected
                      ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 font-semibold ring-2 ring-indigo-200 dark:ring-indigo-900'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
        )}

        {/* True / False */}
        {currentQ.type === 'true_false' && (
          <div className="flex gap-3 pt-2">
            {[
              { id: 'true', label: 'True (Đúng)' },
              { id: 'false', label: 'False (Sai)' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setAnswers((prev) => ({ ...prev, [currentQ.id]: item.id }))
                }
                className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                  answers[currentQ.id] === item.id
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200'
                    : 'border-slate-200 bg-white hover:border-indigo-200 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Fill in blank */}
        {currentQ.type === 'fill_in_blank' && (
          <div className="pt-2 max-w-sm">
            <input
              type="text"
              value={answers[currentQ.id] || ''}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
              }
              placeholder="Nhập câu trả lời ngắn..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Question Pagination Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            disabled={currentIdx === 0}
            onClick={() => {
              speechEngine.stop();
              setCurrentIdx((prev) => Math.max(0, prev - 1));
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-100"
          >
            ← Câu trước
          </button>

          {/* Quick jump question dots */}
          <div className="flex items-center gap-1.5">
            {examQuestions.map((qItem, i) => (
              <button
                key={i}
                onClick={() => {
                  speechEngine.stop();
                  setCurrentIdx(i);
                }}
                className={`w-6 h-6 rounded-md text-xs font-semibold transition-colors ${
                  i === currentIdx
                    ? 'bg-indigo-600 text-white'
                    : answers[qItem.question.id]
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentIdx === examQuestions.length - 1 ? (
            <button
              onClick={finishExam}
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm"
            >
              Nộp bài thi
            </button>
          ) : (
            <button
              onClick={() => {
                speechEngine.stop();
                setCurrentIdx((prev) => Math.min(examQuestions.length - 1, prev + 1));
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
            >
              Câu kế tiếp →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
