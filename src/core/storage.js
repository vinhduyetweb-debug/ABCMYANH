const STORAGE_KEY = 'wonder_abc_state';

const defaultState = {
  score: 0,
  mode: '',
  currentIndex: 0,
  progress: {
    current: 0,
    total: 0,
    percent: 0
  }
};

export function getState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));

    return {
      ...defaultState,
      ...(stored || {}),
      progress: {
        ...defaultState.progress,
        ...(stored?.progress || {})
      }
    };
  } catch {
    return { ...defaultState };
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    score: state.score,
    mode: state.mode,
    currentIndex: state.currentIndex,
    progress: state.progress
  }));
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultState };
}
