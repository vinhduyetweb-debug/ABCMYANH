import { letters } from './data/letters.js';
import { createNumberLessons } from './data/numbers.js';
import { celebrate, playRewardSound } from './core/animations.js';
import {
  bindEvents,
  focusLesson,
  hideCompletion,
  renderLesson,
  renderProgress,
  showCompletion,
  showLessonView,
  updateScore
} from './core/dom.js';
import { getProgressPercent, getTotalCount } from './core/progress.js';
import { getState, resetState, saveState } from './core/storage.js';
import { speakEnglish, speakVietnamese } from './core/speech.js';

const MODES = {
  letters: {
    label: 'Letters',
    lessons: letters
  },
  numbers: {
    label: 'Numbers',
    lessons: createNumberLessons(100)
  }
};

const fallbackLesson = {
  letter: '?',
  word: 'Choose a lesson',
  plain: 'Lesson',
  meaning: 'Bài học chưa sẵn sàng',
  sentence: 'Hãy chọn lại chế độ học.',
  emoji: '🌈',
  visual: ''
};

const savedState = getState();
const state = {
  score: Number(savedState.score) || 0,
  mode: isMode(savedState.mode) ? savedState.mode : '',
  currentIndex: Number(savedState.currentIndex) || 0,
  lessons: []
};

init();

function init() {
  if (state.mode) {
    state.lessons = getLessons(state.mode);
    clampIndex();
    showLessonView();
  }

  bindEvents({
    onModeSelect: switchMode,
    onSpeakLetter: speakCurrentLetter,
    onSpeakEnglish: () => speakEnglish(getCurrentLesson().plain),
    onSpeakVietnamese: speakCurrentVietnamese,
    onPrevious: previousLesson,
    onNext: smartNext,
    onResetScore: resetScore
  });

  render();
  registerServiceWorker();
}

function switchMode(mode) {
  state.mode = mode;
  state.lessons = getLessons(mode);
  state.currentIndex = savedState.mode === mode ? Number(savedState.currentIndex) || 0 : 0;
  clampIndex();
  hideCompletion();
  persist();
  showLessonView();
  render();
  focusLesson();
}

function smartNext() {
  if (!state.lessons.length) {
    render();
    return;
  }

  const isAtEnd = state.currentIndex >= state.lessons.length - 1;

  if (!isAtEnd && state.mode === 'numbers') {
    const currentValue = Number.parseInt(getCurrentLesson().letter, 10);
    const minValue = Number.isNaN(currentValue) ? 1 : currentValue + 1;
    const maxValue = Math.min(minValue + 9, state.lessons.length);
    state.currentIndex = randomInt(minValue, maxValue) - 1;
  } else if (!isAtEnd) {
    state.currentIndex += 1;
  }

  state.score += 1;
  persist();
  render();
  playRewardSound();
  celebrateIfComplete();
}

function previousLesson() {
  if (!state.lessons.length) {
    render();
    return;
  }

  state.currentIndex = state.currentIndex <= 0 ? state.lessons.length - 1 : state.currentIndex - 1;
  hideCompletion();
  persist();
  render();
}

function resetScore() {
  if (!window.confirm('Reset score and progress to 0?')) {
    return;
  }

  resetState();
  state.score = 0;
  state.currentIndex = 0;
  hideCompletion();
  persist();
  render();
}

function speakCurrentLetter() {
  const lesson = getCurrentLesson();
  const text = state.mode === 'numbers' ? lesson.plain : lesson.letter.toString().charAt(0);

  speakEnglish(text);
}

function speakCurrentVietnamese() {
  const lesson = getCurrentLesson();

  speakVietnamese(`${lesson.meaning}. ${lesson.sentence}`);
}

function render() {
  const viewState = getViewState();

  updateScore(viewState.score);
  renderProgress(viewState);

  if (state.mode) {
    renderLesson(viewState);
  }
}

function getViewState() {
  return {
    ...state,
    lesson: getCurrentLesson(),
    modeLabel: state.mode ? MODES[state.mode].label : getLastModeLabel()
  };
}

function getCurrentLesson() {
  if (!state.lessons.length) {
    return fallbackLesson;
  }

  clampIndex();

  return normalizeLesson(state.lessons[state.currentIndex]);
}

function normalizeLesson(lesson) {
  if (!lesson || typeof lesson !== 'object') {
    return fallbackLesson;
  }

  return {
    ...fallbackLesson,
    ...lesson,
    plain: lesson.plain || lesson.letter || fallbackLesson.plain,
    word: lesson.word || lesson.plain || fallbackLesson.word,
    emoji: lesson.emoji || fallbackLesson.emoji
  };
}

function getLessons(mode) {
  return isMode(mode) ? MODES[mode].lessons : [];
}

function clampIndex() {
  const total = getTotalCount(state.lessons);

  if (!total) {
    state.currentIndex = 0;
    return;
  }

  state.currentIndex = Math.min(Math.max(state.currentIndex, 0), total - 1);
}

function persist() {
  const total = getTotalCount(state.lessons);

  saveState({
    score: state.score,
    mode: state.mode,
    currentIndex: state.currentIndex,
    progress: {
      current: total ? state.currentIndex + 1 : 0,
      total,
      percent: getProgressPercent(state.currentIndex, total)
    }
  });
}

function celebrateIfComplete() {
  if (state.lessons.length && state.currentIndex >= state.lessons.length - 1) {
    showCompletion();
    celebrate();
  } else {
    hideCompletion();
  }
}

function getLastModeLabel() {
  return isMode(savedState.mode) ? `Last: ${MODES[savedState.mode].label}` : 'Choose Mode';
}

function isMode(mode) {
  return Object.hasOwn(MODES, mode);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
