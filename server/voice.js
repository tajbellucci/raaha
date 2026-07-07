// ElevenLabs voice proxy. Key stays server-side; the browser only ever talks
// to our own /api endpoints.

export function elevenConfigured() {
  return Boolean(process.env.ELEVENLABS_API_KEY);
}

const VOICE_ID = () => process.env.RAAHA_EL_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
const TTS_MODEL = () => process.env.RAAHA_EL_TTS_MODEL || 'eleven_multilingual_v2';

export async function ttsStream(text) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID()}/stream?output_format=mp3_44100_64`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text.slice(0, 900),
        model_id: TTS_MODEL(),
        voice_settings: { stability: 0.45, similarity_boost: 0.7 },
      }),
    },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`elevenlabs tts ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res; // caller pipes res.body
}

// Speech-to-text via ElevenLabs Scribe. Accepts raw audio bytes from the mic.
export async function stt(audioBuffer, mimetype = 'audio/webm') {
  const form = new FormData();
  form.append('model_id', 'scribe_v1');
  form.append('file', new Blob([audioBuffer], { type: mimetype }), 'clip.webm');
  const res = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
    method: 'POST',
    headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY },
    body: form,
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`elevenlabs stt ${res.status}: ${detail.slice(0, 300)}`);
  }
  const data = await res.json();
  return { text: data.text ?? '', language: data.language_code ?? null };
}
