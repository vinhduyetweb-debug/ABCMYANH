let voiceCache = [];

if ('speechSynthesis' in window) {
  voiceCache = window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener?.('voiceschanged', () => {
    voiceCache = window.speechSynthesis.getVoices();
  });
}

export function speakEnglish(text) {
  speak(text, 'en-US', 0.82);
}

export function speakVietnamese(text) {
  speak(text, 'vi-VN', 0.72);
}

function speak(text, lang, rate) {
  if (!text || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getVoice(lang);

  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = 1;

  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

function getVoice(lang) {
  const prefix = lang.slice(0, 2).toLowerCase();
  const voices = voiceCache.length ? voiceCache : window.speechSynthesis.getVoices();

  return voices.find((voice) => voice.lang.toLowerCase().startsWith(prefix));
}
