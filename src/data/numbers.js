export function createNumberLessons(total = 100) {
  return Array.from({ length: total }, (_, index) => {
    const value = index + 1;

    return {
      letter: String(value),
      word: `Number ${value} 🔢`,
      plain: String(value),
      meaning: `${value} ly trà sữa`,
      sentence: `Đây là ${value} ly trà sữa.`,
      emoji: '🧋',
      visual: createNumberVisual(value)
    };
  });
}

function createNumberVisual(value) {
  const visibleCount = Math.min(value, 40);
  const rows = [];

  for (let index = 0; index < visibleCount; index += 10) {
    const rowSize = Math.min(10, visibleCount - index);
    rows.push(Array.from({ length: rowSize }, () => '🧋').join(' '));
  }

  if (value > visibleCount) {
    rows.push(`+${value - visibleCount} more`);
  }

  return rows.join('\n');
}
