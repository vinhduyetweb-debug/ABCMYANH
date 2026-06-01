const reducedMotionQuery = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : { matches: false };

export function celebrate() {
  const icons = ['✨', '🌈', '⭐', '💖'];
  const count = reducedMotionQuery.matches ? 4 : 18;

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement('div');

    particle.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    particle.className = 'particle';
    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.top = '55%';
    particle.style.transition = reducedMotionQuery.matches ? '.2s ease-out' : '1.2s ease-out';

    document.body.appendChild(particle);

    setTimeout(() => {
      const distance = reducedMotionQuery.matches ? 80 : Math.random() * 350;

      particle.style.transform = `translateY(-${distance}px)`;
      particle.style.opacity = '0';
    }, 10);

    setTimeout(() => particle.remove(), reducedMotionQuery.matches ? 250 : 1200);
  }
}

export function animateScore(scoreElement) {
  if (!scoreElement || reducedMotionQuery.matches) {
    return;
  }

  scoreElement.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.12)' },
      { transform: 'scale(1)' }
    ],
    { duration: 240, easing: 'ease-out' }
  );
}

export function playRewardSound() {
  const audio = new Audio('https://actions.google.com/sounds/v1/human_voices/applause.ogg');

  audio.volume = 0.55;
  audio.play().catch(() => {});
}
