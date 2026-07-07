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

// MediaRecorder-based mic capture for server-side (ElevenLabs Scribe) STT.
export function recorderSupported() {
  return typeof window !== 'undefined' && 'MediaRecorder' in window && navigator.mediaDevices?.getUserMedia;
}

export async function recordClip(maxMs = 8000) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const rec = new MediaRecorder(stream);
  const chunks = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  const done = new Promise((resolve) => {
    rec.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      resolve(new Blob(chunks, { type: rec.mimeType || 'audio/webm' }));
    };
  });
  rec.start();
  const stop = () => rec.state !== 'inactive' && rec.stop();
  setTimeout(stop, maxMs);
  return { stop, blob: done };
}
