// Date helpers. Absolute formatters are safe to run on the server (stable
// output); the relative "TODAY / TOMORROW / THIS WEEKEND" label is derived
// against a passed-in `now` and is only used client-side to avoid hydration
// mismatches.

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export function parseDate(iso: string): Date {
  return new Date(iso);
}

export function dayNum(iso: string): string {
  return String(parseDate(iso).getDate()).padStart(2, "0");
}

export function monthShort(iso: string): string {
  return MONTHS[parseDate(iso).getMonth()];
}

export function weekdayShort(iso: string): string {
  return DAYS[parseDate(iso).getDay()];
}

/** e.g. "SAT 12 SEP" */
export function formatEventDate(iso: string): string {
  const d = parseDate(iso);
  return `${DAYS[d.getDay()]} ${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]}`;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * Relative label for a date against `now`. Client-only.
 * Returns "TONIGHT", "TOMORROW", "THIS WEEKEND", or "" (fall back to absolute).
 */
export function relativeDayLabel(iso: string, now: Date): string {
  const event = startOfDay(parseDate(iso));
  const today = startOfDay(now);
  const diffDays = Math.round(
    (event.getTime() - today.getTime()) / 86_400_000,
  );

  if (diffDays < 0) return "";
  if (diffDays === 0) return "TONIGHT";
  if (diffDays === 1) return "TOMORROW";

  // "This weekend" if the event falls on the upcoming Fri/Sat/Sun.
  const dow = event.getDay();
  const isWeekend = dow === 5 || dow === 6 || dow === 0;
  if (isWeekend && diffDays <= 7) return "THIS WEEKEND";

  return "";
}

export function isPast(iso: string, now: Date): boolean {
  return parseDate(iso).getTime() < now.getTime();
}
