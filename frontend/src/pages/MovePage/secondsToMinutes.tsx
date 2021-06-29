export function secondsToMinutes(seconds: number): string {
  const minutes = ~~(seconds / 60);
  const remainingSeconds = ~~(seconds % 60);

  if (!minutes) return `${remainingSeconds}s`;

  return `${minutes}:${remainingSeconds}`;
}
