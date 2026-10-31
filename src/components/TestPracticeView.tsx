import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Award,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Check,
  Search,
  Filter
} from 'lucide-react';
import { ListeningTest, CefrLevel, UserProgress, TestAttempt, QuestionMistake } from '../types';
import { LISTENING_TESTS } from '../data/listeningTests';
import { AudioPlayerBar } from './AudioPlayerBar';
import { speechEngine } from '../utils/speechEngine';
import { playSuccessSound, playTryAgainSound, playCompleteSound } from '../utils/soundEffects';

interface TestPracticeViewProps {
  progress: UserProgress;
  onRecordAttempt: (attempt: TestAttempt, durationSeconds: number) => void;
  onToggleVocab: (word: string) => void;
  initialTestId?: string;
  onGoToMistakes?: () => void;
}

export const TestPracticeView: React.FC<TestPracticeViewProps> = ({
  progress,
  onRecordAttempt,
  onToggleVocab,
  initialTestId,
  onGoToMistakes,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | CefrLevel>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTest, setActiveTest] = useState<ListeningTest | null>(null);

  // In-test states
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showViTranslation, setShowViTranslation] = useState(false);
  const [activeTabInsideTest, setActiveTabInsideTest] = useState<'questions' | 'transcript' | 'vocab'>('questions');
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Set initial test if passed
  useEffect(() => {
    if (initialTestId) {
      const match = LISTENING_TESTS.find((t) => t.id === initialTestId);
      if (match) {
        startTest(match);
      }
    }
  }, [initialTestId]);

  const startTest = (test: ListeningTest) => {
    speechEngine.stop();
    setActiveTest(test);
    setUserAnswers({});
    setSubmitted(false);
    setActiveLineIndex(0);
    setShowTranscript(false);
    setShowViTranslation(false);
    setActiveTabInsideTest('questions');
    setStartTime(Date.now());
  };

  const handleSelectOption = (questionId: string, answerId: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleFillBlankInput = (questionId: string, text: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  const checkAnswerIsCorrect = (q: ListeningTest['questions'][0], answer?: string): boolean => {
    if (!answer) return false;
    const cleanUser = answer.trim().toLowerCase();
    const cleanCorrect = q.correctAnswer.toLowerCase();

    if (cleanUser === cleanCorrect) return true;

    if (q.acceptableAnswers) {
      return q.acceptableAnswers.some((alt) => alt.trim().toLowerCase() === cleanUser);
    }
    return false;
  };

  const handleSubmitTest = () => {
    if (!activeTest || submitted) return;

    let score = 0;
    const mistakes: QuestionMistake[] = [];

    activeTest.questions.forEach((q) => {
      const ans = userAnswers[q.id];
      const isCorrect = checkAnswerIsCorrect(q, ans);
      if (isCorrect) {
        score++;
      } else {
        mistakes.push({
          testId: activeTest.id,
          testTitle: activeTest.title,
          questionId: q.id,
          prompt: q.prompt,
          promptVi: q.promptVi,
          studentAnswer: ans || '(Chưa điền)',
          correctAnswer: q.options?.find((o) => o.id === q.correctAnswer)?.text || q.correctAnswer,
          explanationVi: q.explanationVi,
          date: new Date().toISOString(),
          level: activeTest.level,
        });
      }
    });

    const elapsedSeconds = Math.max(30, Math.round((Date.now() - startTime) / 1000));
    const percentage = Math.round((score / activeTest.questions.length) * 100);

    const attempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      testId: activeTest.id,
      testTitle: activeTest.title,
      level: activeTest.level,
      topic: activeTest.topic,
      date: new Date().toISOString(),
      score,
      totalQuestions: activeTest.questions.length,
      percentage,
      timeSpentSeconds: elapsedSeconds,
      mistakes,
    };

    setSubmitted(true);
    onRecordAttempt(attempt, elapsedSeconds);

    if (percentage >= 80) {
      playSuccessSound();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } else {
      playTryAgainSound();
    }
  };

  // Filter tests list
  const filteredTests = LISTENING_TESTS.filter((t) => {
    const matchLevel = selectedLevel === 'ALL' || t.level === selectedLevel;
    const query = searchQuery.toLowerCase().trim();
    const matchQuery =
      !query ||
      t.title.toLowerCase().includes(query) ||
      t.vietnameseTitle.toLowerCase().includes(query) ||
      t.topic.toLowerCase().includes(query);
    return matchLevel && matchQuery;
  });

  // Calculate test attempts & best score
  const getTestStats = (testId: string) => {
    const attempts = progress.attempts.filter((a) => a.testId === testId);
    if (!attempts.length) return null;
    const bestScore = Math.max(...attempts.map((a) => a.score));
    const totalQuestions = attempts[0].totalQuestions;
    return {
      count: attempts.length,
      bestScore,
      totalQuestions,
      bestPercent: Math.round((bestScore / totalQuestions) * 100),
    };
  };

  // ================= VIEW 1: ACTIVE TEST SCREEN =================
  if (activeTest) {
    const transcriptLines = activeTest.transcripts.map((t) => t.text);
    const score = activeTest.questions.reduce((acc, q) => {
      return acc + (checkAnswerIsCorrect(q, userAnswers[q.id]) ? 1 : 0);
    }, 0);
    const percent = Math.round((score / activeTest.questions.length) * 100);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back and Navigation Header */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => {
              speechEngine.stop();
              setActiveTest(null);
            }}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách bài</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span
              className={`px-2.5 py-1 rounded-md font-bold ${
                activeTest.level === 'A1'
                  ? 'bg-emerald-100 text-emerald-800'
                  : activeTest.level === 'A2'
                  ? 'bg-indigo-100 text-indigo-800'
                  : activeTest.level === 'B1'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-purple-100 text-purple-800'
              }`}
            >
              Trình độ {activeTest.level}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-medium">{activeTest.topicVi}</span>
          </div>
        </div>

        {/* Test Title Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {activeTest.title}
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            {activeTest.vietnameseTitle} · {activeTest.descriptionVi}
          </p>
        </div>

        {/* Audio Player Bar */}
        <AudioPlayerBar
          transcriptTexts={transcriptLines}
          activeLineIndex={activeLineIndex}
          onLineChange={(idx) => setActiveLineIndex(idx)}
          showTranscript={showTranscript}
          onToggleTranscript={() => setShowTranscript(!showTranscript)}
        />

        {/* In-Test Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button
            onClick={() => setActiveTabInsideTest('questions')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTabInsideTest === 'questions'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Câu hỏi luyện tập ({Object.keys(userAnswers).length}/{activeTest.questions.length})
          </button>

          <button
            onClick={() => setActiveTabInsideTest('transcript')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTabInsideTest === 'transcript'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Lời thoại & Phụ đề
          </button>

          <button
            onClick={() => setActiveTabInsideTest('vocab')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTabInsideTest === 'vocab'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Từ vựng trọng tâm ({activeTest.vocabulary.length})
          </button>
        </div>

        {/* SUBMITTED RESULT BANNER */}
        {submitted && (
          <div
            className={`p-6 rounded-2xl border ${
              percent >= 80
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-bold">
                    Kết quả của em: {score}/{activeTest.questions.length} ({percent}%)
                  </h3>
                </div>
                <p className="text-sm mt-1">
                  {percent === 100
                    ? 'Tuyệt đỉnh! Em đã trả lời đúng toàn bộ câu hỏi!'
                    : percent >= 80
                    ? 'Rất xuất sắc! Kỹ năng nghe của em đang tiến bộ rất nhanh!'
                    : 'Hãy xem lại các câu chưa chính xác và ghi nhớ từ vựng để ôn tập nhé!'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startTest(activeTest)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại bài</span>
                </button>
                {onGoToMistakes && percent < 100 && (
                  <button
                    onClick={onGoToMistakes}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Vào sổ tay câu sai</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: QUESTIONS */}
        {activeTabInsideTest === 'questions' && (
          <div className="space-y-5">
            {activeTest.questions.map((q, qIndex) => {
              const selectedAns = userAnswers[q.id];
              const isCorrect = checkAnswerIsCorrect(q, selectedAns);

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
                    submitted
                      ? isCorrect
                        ? 'border-emerald-300 dark:border-emerald-800 ring-1 ring-emerald-200 dark:ring-emerald-900'
                        : 'border-rose-300 dark:border-rose-800 ring-1 ring-rose-200 dark:ring-rose-900'
                      : 'border-slate-200/90 dark:border-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {qIndex + 1}
                      </span>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-base leading-snug">
                        {q.prompt}
                      </h4>
                    </div>

                    {submitted && (
                      <div className="shrink-0">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">
                            <CheckCircle2 className="w-4 h-4" /> Đúng
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-md">
                            <XCircle className="w-4 h-4" /> Chưa đúng
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 ml-9">
                    {q.promptVi}
                  </p>

                  {/* Multiple Choice Options */}
                  {q.type === 'multiple_choice' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 ml-0 sm:ml-9">
                      {q.options.map((opt) => {
                        const isSelected = selectedAns === opt.id;
                        const isThisCorrect = q.correctAnswer === opt.id;

                        let btnStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-200';

                        if (submitted) {
                          if (isThisCorrect) {
                            btnStyle = 'border-emerald-500 dark:border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold';
                          } else if (isSelected && !isThisCorrect) {
                            btnStyle = 'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300';
                          }
                        } else if (isSelected) {
                          btnStyle = 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 font-semibold ring-2 ring-indigo-200 dark:ring-indigo-900';
                        }

                        return (
                          <button
                            key={opt.id}
                            disabled={submitted}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
                          >
                            <span className="pr-2">{opt.text}</span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'border-indigo-600 bg-indigo-600 text-white'
                                  : 'border-slate-300'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* True / False Question */}
                  {q.type === 'true_false' && (
                    <div className="flex items-center gap-3 ml-0 sm:ml-9">
                      {[
                        { id: 'true', label: 'True (Đúng)' },
                        { id: 'false', label: 'False (Sai)' },
                      ].map((item) => {
                        const isSelected = selectedAns === item.id;
                        const isThisCorrect = q.correctAnswer === item.id;

                        let btnStyle = 'border-slate-200 bg-white hover:border-indigo-300 text-slate-700';
                        if (submitted) {
                          if (isThisCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                          } else if (isSelected && !isThisCorrect) {
                            btnStyle = 'border-rose-400 bg-rose-50 text-rose-800';
                          }
                        } else if (isSelected) {
                          btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-2 ring-indigo-200';
                        }

                        return (
                          <button
                            key={item.id}
                            disabled={submitted}
                            onClick={() => handleSelectOption(q.id, item.id)}
                            className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${btnStyle}`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Fill in the Blank Question */}
                  {q.type === 'fill_in_blank' && (
                    <div className="ml-0 sm:ml-9 max-w-md">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          disabled={submitted}
                          value={selectedAns || ''}
                          onChange={(e) => handleFillBlankInput(q.id, e.target.value)}
                          placeholder="Nhập câu trả lời ngắn..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm"
                        />
                      </div>
                      {submitted && (
                        <p className="text-xs text-slate-600 mt-2">
                          Đáp án đúng: <strong className="text-emerald-700 font-bold">{q.correctAnswer}</strong>
                          {q.acceptableAnswers && q.acceptableAnswers.length > 1 && (
                            <span> (hoặc: {q.acceptableAnswers.join(', ')})</span>
                          )}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Explanations and Transcript Evidence Clue */}
                  {submitted && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-1.5 ml-0 sm:ml-9 bg-slate-50 p-3.5 rounded-xl">
                      <div className="flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800">Giải thích: </strong>
                          <span className="text-slate-700">{q.explanationVi}</span>
                        </div>
                      </div>
                      {q.transcriptClue && (
                        <div className="text-indigo-800 italic bg-indigo-50/70 p-2 rounded-lg border border-indigo-100">
                          "Dẫn chứng trong bài: {q.transcriptClue}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Submit Test Button */}
            {!submitted ? (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSubmitTest}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
                >
                  <span>Nộp bài & Chấm điểm</span>
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            ) : (
              <div className="pt-4 flex justify-between items-center">
                <button
                  onClick={() => startTest(activeTest)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại bài này</span>
                </button>

                <button
                  onClick={() => {
                    speechEngine.stop();
                    setActiveTest(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <span>Chọn bài luyện tập khác</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TRANSCRIPT WITH BILINGUAL TOGGLE & READ-ALONG */}
        {activeTabInsideTest === 'transcript' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Toàn văn bài nghe & Dịch nghĩa</h3>
                <p className="text-xs text-slate-500">
                  Nhấn vào nút loa bên cạnh từng câu để nghe lại riêng câu đó.
                </p>
              </div>

              <button
                onClick={() => setShowViTranslation(!showViTranslation)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  showViTranslation
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {showViTranslation ? 'Ẩn bản dịch tiếng Việt' : 'Hiện bản dịch tiếng Việt'}
              </button>
            </div>

            <div className="space-y-3">
              {activeTest.transcripts.map((t, idx) => {
                const isActive = activeLineIndex === idx;

                return (
                  <div
                    key={t.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-200'
                        : 'bg-white border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        {t.speaker && (
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block">
                            {t.speaker}
                          </span>
                        )}
                        <p className={`text-sm ${isActive ? 'text-indigo-950 font-semibold' : 'text-slate-800'}`}>
                          {t.text}
                        </p>
                        {showViTranslation && t.viText && (
                          <p className="text-xs text-slate-500 pt-0.5">
                            {t.viText}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => speechEngine.speakSingle(t.text)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 shrink-0 transition-colors"
                        title="Nghe câu này"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: VOCABULARY */}
        {activeTabInsideTest === 'vocab' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Từ vựng quan trọng trong bài</h3>
              <p className="text-xs text-slate-500">
                Lưu lại từ vựng để ôn tập trong Sổ tay cá nhân.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {activeTest.vocabulary.map((v) => {
                const isSaved = progress.savedVocabWords.includes(v.word);

                return (
                  <div
                    key={v.word}
                    className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 space-y-2 relative group hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">{v.word}</span>
                        <span className="text-xs text-indigo-600 font-mono">{v.ipa}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speechEngine.speakSingle(v.word)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white transition-colors"
                          title="Phát âm từ vựng"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onToggleVocab(v.word)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSaved ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500 hover:bg-white'
                          }`}
                          title={isSaved ? 'Đã lưu trong sổ tay' : 'Lưu vào sổ tay'}
                        >
                          {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-slate-700">{v.meaning}</p>
                    <p className="text-xs text-slate-500 italic">"{v.example}"</p>
                    <p className="text-[11px] text-slate-400">→ {v.exampleVi}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= VIEW 2: TESTS LIST & FILTER =================
  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
        {/* Level Segments */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'ALL', label: 'Tất cả bài học' },
            { id: 'A1', label: 'A1 (Sơ cấp)' },
            { id: 'A2', label: 'A2 (Cơ bản)' },
            { id: 'B1', label: 'B1 (Trung cấp)' },
            { id: 'B2', label: 'B2 (Nâng cao)' },
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id as 'ALL' | CefrLevel)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedLevel === lvl.id
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo chủ đề, tiêu đề..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTests.map((test) => {
          const stats = getTestStats(test.id);

          return (
            <div
              key={test.id}
              onClick={() => startTest(test)}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                        test.level === 'A1'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : test.level === 'A2'
                          ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                          : test.level === 'B1'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                      }`}
                    >
                      {test.level}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{test.topicVi}</span>
                  </div>

                  {stats ? (
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 tabular-nums">
                      Điểm cao nhất: {stats.bestScore}/{stats.totalQuestions}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Chưa luyện tập</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {test.vietnameseTitle}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                  {test.descriptionVi}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <span>⏱ {test.estimatedMinutes} phút</span>
                  <span>·</span>
                  <span>{test.questions.length} câu hỏi</span>
                  <span>·</span>
                  <span>Độ khó: {test.difficulty}</span>
                </div>

                <div className="flex items-center gap-1 font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>Bắt đầu</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
