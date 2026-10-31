import React, { useState } from 'react';
import {
  BookMarked,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Volume2,
  Sparkles,
  ArrowRight,
  BookOpen,
  BookmarkCheck,
  Check
} from 'lucide-react';
import { UserProgress, QuestionMistake, CefrLevel } from '../types';
import { LISTENING_TESTS } from '../data/listeningTests';
import { speechEngine } from '../utils/speechEngine';
import { playSuccessSound } from '../utils/soundEffects';

interface MistakeNotebookViewProps {
  progress: UserProgress;
  onRemoveMistake: (testId: string, questionId: string) => void;
  onToggleVocab: (word: string) => void;
  onOpenTest: (testId: string) => void;
}

export const MistakeNotebookView: React.FC<MistakeNotebookViewProps> = ({
  progress,
  onRemoveMistake,
  onToggleVocab,
  onOpenTest,
}) => {
  const [activeTab, setActiveTab] = useState<'mistakes' | 'saved_vocab'>('mistakes');
  const [filterLevel, setFilterLevel] = useState<'ALL' | CefrLevel>('ALL');
  const [solvedMistakes, setSolvedMistakes] = useState<Record<string, boolean>>({});

  const filteredMistakes = progress.mistakes.filter(
    (m) => filterLevel === 'ALL' || m.level === filterLevel
  );

  // Get saved vocabulary full details
  const allVocabMap = new Map<string, { word: string; ipa: string; meaning: string; example: string; exampleVi: string; testTitle: string }>();

  LISTENING_TESTS.forEach((test) => {
    test.vocabulary.forEach((v) => {
      if (!allVocabMap.has(v.word)) {
        allVocabMap.set(v.word, { ...v, testTitle: test.title });
      }
    });
  });

  const savedVocabList = progress.savedVocabWords
    .map((word) => allVocabMap.get(word))
    .filter(Boolean) as { word: string; ipa: string; meaning: string; example: string; exampleVi: string; testTitle: string }[];

  const handleMarkResolved = (m: QuestionMistake) => {
    playSuccessSound();
    setSolvedMistakes((prev) => ({ ...prev, [m.questionId]: true }));
    setTimeout(() => {
      onRemoveMistake(m.testId, m.questionId);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Sổ Tay Ôn Tập & Câu Cần Rèn Luyện</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ghi nhớ lỗi sai là cách nhanh nhất để nâng cao kỹ năng nghe và phản xạ từ vựng tiếng Anh.
          </p>
        </div>

        {/* Segmented Tab */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'mistakes' ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Câu làm sai ({progress.mistakes.length})
          </button>
          <button
            onClick={() => setActiveTab('saved_vocab')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'saved_vocab' ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Từ vựng đã lưu ({progress.savedVocabWords.length})
          </button>
        </div>
      </div>

      {/* MISTAKES TAB */}
      {activeTab === 'mistakes' && (
        <div className="space-y-4">
          {/* Level Filter Bar */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <span className="text-slate-400 mr-1 font-medium">Lọc theo:</span>
              {(['ALL', 'A1', 'A2'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilterLevel(lvl)}
                  className={`px-2.5 py-1 rounded-md font-semibold ${
                    filterLevel === lvl ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  {lvl === 'ALL' ? 'Tất cả' : `Trình độ ${lvl}`}
                </button>
              ))}
            </div>

            <span className="text-slate-500">
              Có <strong className="text-slate-800">{filteredMistakes.length}</strong> câu cần xem lại
            </span>
          </div>

          {filteredMistakes.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Sổ tay sạch sẽ! Không có câu sai nào</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Em đã giải đúng toàn bộ các câu trong các bài luyện nghe gần đây. Tiếp tục phát huy nhé!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMistakes.map((m) => {
                const isSolved = solvedMistakes[m.questionId];

                return (
                  <div
                    key={`${m.testId}-${m.questionId}`}
                    className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border transition-all ${
                      isSolved
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            m.level === 'A1'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                          }`}
                        >
                          {m.level}
                        </span>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{m.testTitle}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMarkResolved(m)}
                          className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg transition-colors"
                          title="Đánh dấu đã hiểu bài và xóa khỏi sổ tay"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã nắm vững</span>
                        </button>
                        <button
                          onClick={() => onRemoveMistake(m.testId, m.questionId)}
                          className="p-1 rounded text-slate-400 hover:text-rose-500"
                          title="Xóa câu hỏi này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{m.prompt}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{m.promptVi}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl text-xs">
                      <div>
                        <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Câu trả lời của em:</span>
                        <span className="font-semibold text-rose-600 dark:text-rose-400 line-through">{m.studentAnswer}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Đáp án đúng:</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">{m.correctAnswer}</span>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 bg-indigo-50/60 dark:bg-indigo-950/40 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>Giải thích ghi nhớ: </strong>
                        <span>{m.explanationVi}</span>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => onOpenTest(m.testId)}
                        className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        <span>Mở lại bài nghe này</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SAVED VOCABULARY TAB */}
      {activeTab === 'saved_vocab' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Danh sách từ vựng trọng tâm em đã đánh dấu để học thuộc</span>
            <span>{savedVocabList.length} từ vựng</span>
          </div>

          {savedVocabList.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <BookmarkCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Chưa có từ vựng nào được lưu</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Khi làm các bài luyện nghe, em hãy nhấn vào biểu tượng Bookmark để lưu lại các từ mới vào đây nhé!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {savedVocabList.map((v) => (
                <div
                  key={v.word}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-base">{v.word}</span>
                      <span className="text-xs text-indigo-600 font-mono">{v.ipa}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => speechEngine.speakSingle(v.word)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                        title="Phát âm từ vựng"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onToggleVocab(v.word)}
                        className="p-1.5 rounded-lg text-amber-500 hover:text-rose-500 hover:bg-slate-100 transition-colors"
                        title="Bỏ lưu khỏi sổ tay"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-slate-800">{v.meaning}</p>
                  <p className="text-xs text-slate-600 italic">"{v.example}"</p>
                  <p className="text-[11px] text-slate-400">→ {v.exampleVi}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
