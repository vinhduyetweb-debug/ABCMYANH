export function getProgressPercent(currentIndex, totalCount) {
  if (!totalCount) {
    return 0;
  }

  return Math.round(((currentIndex + 1) / totalCount) * 100);
}

export function getCurrentLabel(currentIndex, totalCount) {
  const current = totalCount > 0 ? currentIndex + 1 : 0;

  return `${current} / ${totalCount}`;
}

export function getTotalCount(items) {
  return Array.isArray(items) ? items.length : 0;
}
