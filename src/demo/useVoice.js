// Browser-native voice: Web Speech API for STT (Chrome) + speechSynthesis for
// TTS. Zero accounts, zero cost — demo-grade quality; ElevenLabs replaces this
// in the production build. Degrades to hidden controls when unsupported.

import { useCallback, useRef, useState } from 'react';

const LANG_TAGS = { en: 'en-US', ur: 'ur-PK', ar: 'ar-QA', ml: 'ml-IN', tl: 'fil-PH' };

export function sttSupported() {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

export function useSpeechInput(onResult) {
  const recRef = useRef(null);
  const [listening, setListening] = useState(false);

  const start = useCallback(
    (lang = 'en') => {
      if (!sttSupported() || listening) return;
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SR();
      rec.lang = LANG_TAGS[lang] || lang;
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e) => {
        const text = e.results[0]?.[0]?.transcript;
        if (text) onResult(text);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      recRef.current = rec;
      setListening(true);
      try {
        rec.start();
      } catch {
        setListening(false);
      }
    },
    [listening, onResult],
  );

  const stop = useCallback(() => {
    recRef.current?.stop();
    setListening(false);
  }, []);

  return { listening, start, stop };
}

export function speak(text, lang = 'en') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = LANG_TAGS[lang] || lang;
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}
