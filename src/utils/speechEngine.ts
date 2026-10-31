// Text-to-speech audio engine for A1 & A2 English listening practice

export type VoiceAccent = 'en-US' | 'en-GB' | 'en-AU';

export interface SpeechSettings {
  rate: number; // 0.75, 0.9, 1.0, 1.1, 1.25
  accent: VoiceAccent;
  pitch: number;
}

class SpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState = false;
  private isPausedState = false;
  private onLineChangeCallback: ((lineIndex: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;
  private activeSequence: string[] = [];
  private currentLineIndex = 0;
  private settings: SpeechSettings = {
    rate: 1.0,
    accent: 'en-GB',
    pitch: 1.0,
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return !!this.synth;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices().filter((v) => v.lang.startsWith('en'));
  }

  public setSettings(settings: Partial<SpeechSettings>) {
    this.settings = { ...this.settings, ...settings };
  }

  public getSettings(): SpeechSettings {
    return { ...this.settings };
  }

  private pickVoice(accent: VoiceAccent): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices.length) return null;

    // First try exact language match
    const matchingVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().replace('_', '-') === accent.toLowerCase() ||
        (accent === 'en-GB' && (v.name.includes('UK') || v.name.includes('British') || v.lang.startsWith('en-GB'))) ||
        (accent === 'en-US' && (v.name.includes('US') || v.name.includes('United States') || v.lang.startsWith('en-US'))) ||
        (accent === 'en-AU' && (v.name.includes('AU') || v.name.includes('Australia') || v.lang.startsWith('en-AU')))
    );

    if (matchingVoice) return matchingVoice;

    // Fallback to any English voice
    const anyEnglish = voices.find((v) => v.lang.startsWith('en'));
    return anyEnglish || voices[0] || null;
  }

  /**
   * Speak an individual word or short sentence (e.g. for vocabulary or single sentence review)
   */
  public speakSingle(text: string, onFinish?: () => void) {
    if (!this.synth) return;
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.settings.rate;
    utterance.pitch = this.settings.pitch;

    const voice = this.pickVoice(this.settings.accent);
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      this.isSpeakingState = false;
      if (onFinish) onFinish();
    };

    utterance.onerror = () => {
      this.isSpeakingState = false;
    };

    this.isSpeakingState = true;
    this.synth.speak(utterance);
  }

  /**
   * Play continuous lines with line tracking
   */
  public playLines(
    lines: string[],
    startIndex = 0,
    onLineChange?: (lineIndex: number) => void,
    onEnd?: () => void
  ) {
    if (!this.synth) return;
    this.stop();

    this.activeSequence = lines;
    this.currentLineIndex = startIndex;
    this.onLineChangeCallback = onLineChange || null;
    this.onEndCallback = onEnd || null;

    this.isSpeakingState = true;
    this.isPausedState = false;
    this.speakNextLine();
  }

  private speakNextLine() {
    if (!this.synth || !this.isSpeakingState) return;

    if (this.currentLineIndex >= this.activeSequence.length) {
      this.isSpeakingState = false;
      this.isPausedState = false;
      if (this.onEndCallback) this.onEndCallback();
      return;
    }

    const text = this.activeSequence[this.currentLineIndex];
    if (this.onLineChangeCallback) {
      this.onLineChangeCallback(this.currentLineIndex);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.settings.rate;
    utterance.pitch = this.settings.pitch;

    const voice = this.pickVoice(this.settings.accent);
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      if (this.isSpeakingState && !this.isPausedState) {
        this.currentLineIndex++;
        // Small natural speech pause between dialogue sentences
        setTimeout(() => {
          this.speakNextLine();
        }, 350);
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        this.currentLineIndex++;
        this.speakNextLine();
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.isSpeakingState) {
      this.synth.pause();
      this.isPausedState = true;
    }
  }

  public resume() {
    if (this.synth && this.isPausedState) {
      this.synth.resume();
      this.isPausedState = false;
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeakingState = false;
    this.isPausedState = false;
    this.currentUtterance = null;
  }

  public replayCurrentLine() {
    if (this.currentLineIndex > 0) {
      this.currentLineIndex = Math.max(0, this.currentLineIndex - 1);
    }
    this.stop();
    this.isSpeakingState = true;
    this.speakNextLine();
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState && !this.isPausedState;
  }

  public isPaused(): boolean {
    return this.isPausedState;
  }

  public getCurrentLineIndex(): number {
    return this.currentLineIndex;
  }
}

export const speechEngine = new SpeechEngine();
