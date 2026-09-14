const COVER_PALETTES = [
  ['#2B2118', '#C4A574'],
  ['#24302A', '#9BB39A'],
  ['#3A1E1C', '#D4A29C'],
  ['#1E2638', '#9AADC8'],
  ['#3A2E18', '#E0C989'],
  ['#2A1F2E', '#C9B0C8'],
  ['#1F2E2C', '#8FBFB6'],
  ['#3A2418', '#D7B08A'],
] as const;

export function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function coverPalette(seed: string): readonly [string, string] {
  return COVER_PALETTES[hashString(seed) % COVER_PALETTES.length];
}

export function coverInitials(title: string): string {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'S';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase();
}
