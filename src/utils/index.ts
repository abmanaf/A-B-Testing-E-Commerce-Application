export function assignVariant(
  userId: string,
  experimentId: string,
  variants: any[]
) {
  let hash = 0;
  const str = userId + experimentId;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return variants[Math.abs(hash) % variants.length];
}
