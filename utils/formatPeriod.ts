export function formatPeriod(value: number) {
  if (value < 0) return `${Math.abs(value)} BCE`;
  if (value === 0) return "0";
  return `${value} CE`; // anno domini
}
