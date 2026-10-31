import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, FastForward, Globe2, Eye, EyeOff } from 'lucide-react';
import { speechEngine, VoiceAccent } from '../utils/speechEngine';

interface AudioPlayerBarProps {
  transcriptTexts: string[];
  activeLineIndex: number;
  onLineChange: (index: number) => void;
  showTranscript: boolean;
  onToggleTranscript: () => void;
  onSpeechEnd?: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  transcriptTexts,
  activeLineIndex,
  onLineChange,
  showTranscript,
  onToggleTranscript,
  onSpeechEnd,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [accent, setAccent] = useState<VoiceAccent>('en-GB');

  // Handle play/pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      speechEngine.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speechEngine.setSettings({ rate: playbackSpeed, accent });
      speechEngine.playLines(
        transcriptTexts,
        activeLineIndex >= transcriptTexts.length ? 0 : activeLineIndex,
        (idx) => {
          onLineChange(idx);
        },
        () => {
          setIsPlaying(false);
          if (onSpeechEnd) onSpeechEnd();
        }
      );
    }
  };

  const handleRestart = () => {
    speechEngine.stop();
    setIsPlaying(true);
    onLineChange(0);
    speechEngine.setSettings({ rate: playbackSpeed, accent });
    speechEngine.playLines(
      transcriptTexts,
      0,
      (idx) => onLineChange(idx),
      () => {
        setIsPlaying(false);
        if (onSpeechEnd) onSpeechEnd();
      }
    );
  };

  const handleChangeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    speechEngine.setSettings({ rate: speed });
    if (isPlaying) {
      // restart from current line with new speed
      speechEngine.stop();
      speechEngine.playLines(
        transcriptTexts,
        activeLineIndex,
        (idx) => onLineChange(idx),
        () => {
          setIsPlaying(false);
          if (onSpeechEnd) onSpeechEnd();
        }
      );
    }
  };

  const handleChangeAccent = (newAccent: VoiceAccent) => {
    setAccent(newAccent);
    speechEngine.setSettings({ accent: newAccent });
    if (isPlaying) {
      speechEngine.stop();
      speechEngine.playLines(
        transcriptTexts,
        activeLineIndex,
        (idx) => onLineChange(idx),
        () => {
          setIsPlaying(false);
          if (onSpeechEnd) onSpeechEnd();
        }
      );
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechEngine.stop();
    };
  }, []);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Playback Controls & Waveform */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Main Play / Pause Button */}
          <button
            onClick={handleTogglePlay}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform active:scale-95 shadow-md ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
            title={isPlaying ? 'Tạm dừng audio' : 'Phát bài nghe'}
            aria-label={isPlaying ? 'Tạm dừng' : 'Phát bài nghe'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          {/* Replay from Start Button */}
          <button
            onClick={handleRestart}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Nghe lại từ đầu"
            aria-label="Nghe lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Animated Audio Equalizer Visualizer */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <Volume2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <div className="flex items-end gap-1 h-6 w-16 justify-center">
              {isPlaying ? (
                <>
                  <span className="w-1 bg-indigo-400 rounded-full animate-sound-1" />
                  <span className="w-1 bg-indigo-300 rounded-full animate-sound-2" />
                  <span className="w-1 bg-indigo-500 rounded-full animate-sound-3" />
                  <span className="w-1 bg-indigo-400 rounded-full animate-sound-4" />
                </>
              ) : (
                <>
                  <span className="w-1 h-1.5 bg-slate-600 rounded-full" />
                  <span className="w-1 h-2.5 bg-slate-600 rounded-full" />
                  <span className="w-1 h-1.5 bg-slate-600 rounded-full" />
                  <span className="w-1 h-2 bg-slate-600 rounded-full" />
                </>
              )}
            </div>
            <span className="text-xs font-mono text-slate-300 tabular-nums">
              {activeLineIndex + 1}/{transcriptTexts.length}
            </span>
          </div>
        </div>

        {/* Speed, Accent, and Transcript Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/60 text-xs">
            <FastForward className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {[0.5, 0.75, 1.0, 1.25].map((s) => (
              <button
                key={s}
                onClick={() => handleChangeSpeed(s)}
                className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                  playbackSpeed === s
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={`Tốc độ đọc ${s === 1.0 ? '1x (chuẩn)' : `${s}x`}`}
              >
                {s === 1.0 ? '1x' : `${s}x`}
              </button>
            ))}
          </div>

          {/* Accent Selector */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/60 text-xs">
            <Globe2 className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => handleChangeAccent('en-GB')}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                accent === 'en-GB'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Giọng Anh - Anh (UK standard)"
            >
              UK 🇬🇧
            </button>
            <button
              onClick={() => handleChangeAccent('en-US')}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                accent === 'en-US'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Giọng Anh - Mỹ (US standard)"
            >
              US 🇺🇸
            </button>
            <button
              onClick={() => handleChangeAccent('en-AU')}
              className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                accent === 'en-AU'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Giọng Anh - Úc (AU)"
            >
              AU 🇦🇺
            </button>
          </div>

          {/* Transcript Show/Hide Toggle */}
          <button
            onClick={onToggleTranscript}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              showTranscript
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-slate-800/90 border-slate-700/60 text-slate-300 hover:text-white'
            }`}
            title="Ẩn hoặc mở phụ đề lời thoại"
          >
            {showTranscript ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Ẩn lời thoại</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Hiện lời thoại</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
