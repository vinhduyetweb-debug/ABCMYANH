import { animateScore, celebrate } from './animations.js';
import { getCurrentLabel, getProgressPercent, getTotalCount } from './progress.js';

export const dom = {
  modeSelect: select('#modeSelect'),
  lessonCard: select('#lessonCard'),
  score: select('#score'),
  modeLabel: select('#modeLabel'),
  progressText: select('#progressText'),
  percentText: select('#percentText'),
  progressBar: select('#progressBar'),
  lessonMeta: select('#lessonMeta'),
  completionMessage: select('#completionMessage'),
  lessonBox: select('#lessonBox'),
  emoji: select('#emoji'),
  letter: select('#letter'),
  word: select('#word'),
  meaning: select('#meaning'),
  sentence: select('#sentence'),
  visualCount: select('#visualCount'),
  buttons: {
    lettersMode: select('#lettersMode'),
    numbersMode: select('#numbersMode'),
    resetScore: select('#resetScoreBtn'),
    letter: select('#letterBtn'),
    english: select('#englishBtn'),
    vietnamese: select('#vietnameseBtn'),
    previous: select('#prevBtn'),
    next: select('#nextBtn')
  }
};

let lastLessonKey = '';

export function select(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Missing required DOM element: ${selector}`);
  }

  return element;
}

export function bindEvents(handlers) {
  dom.buttons.lettersMode.addEventListener('click', () => handlers.onModeSelect('letters'));
  dom.buttons.numbersMode.addEventListener('click', () => handlers.onModeSelect('numbers'));
  dom.buttons.resetScore.addEventListener('click', handlers.onResetScore);
  dom.buttons.letter.addEventListener('click', handlers.onSpeakLetter);
  dom.buttons.english.addEventListener('click', handlers.onSpeakEnglish);
  dom.buttons.vietnamese.addEventListener('click', handlers.onSpeakVietnamese);
  dom.buttons.previous.addEventListener('click', handlers.onPrevious);
  dom.buttons.next.addEventListener('click', handlers.onNext);
}

export function renderLesson(state) {
  const lesson = state.lesson;
  const lessonKey = `${state.mode}:${state.currentIndex}:${lesson.letter}`;

  if (lessonKey === lastLessonKey) {
    return;
  }

  lastLessonKey = lessonKey;
  dom.emoji.innerText = lesson.emoji;
  dom.letter.innerText = lesson.letter;
  dom.word.innerText = lesson.word;
  dom.meaning.innerText = lesson.meaning;
  dom.sentence.innerText = lesson.sentence;

  if (state.mode === 'numbers' && lesson.visual) {
    dom.visualCount.innerText = lesson.visual;
    dom.visualCount.setAttribute('aria-label', `${lesson.plain} items`);
  } else {
    dom.visualCount.innerText = '';
    dom.visualCount.removeAttribute('aria-label');
  }
}

export function renderProgress(state) {
  const total = getTotalCount(state.lessons);
  const currentLabel = getCurrentLabel(state.currentIndex, total);
  const percent = getProgressPercent(state.currentIndex, total);

  dom.modeLabel.innerText = state.modeLabel;
  dom.progressText.innerText = currentLabel;
  dom.percentText.innerText = `${percent}%`;
  dom.lessonMeta.innerText = `Lesson ${currentLabel.replace(' / ', ' of ')}`;
  dom.progressBar.style.width = `${percent}%`;
}

export function updateScore(score) {
  dom.score.innerText = String(score);
  animateScore(dom.score);
}

export function showLessonView() {
  dom.modeSelect.classList.add('hidden');
  dom.lessonCard.classList.remove('hidden');
}

export function focusLesson() {
  dom.lessonBox.focus?.();
}

export function showCompletion() {
  dom.completionMessage.classList.remove('hidden');
  dom.completionMessage.focus?.();
  celebrate();
}

export function hideCompletion() {
  dom.completionMessage.classList.add('hidden');
}
