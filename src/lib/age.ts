import {
  intervalToDuration,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  addDays,
  addYears,
  format,
  isAfter,
  isValid,
} from "date-fns";

export type AgeBreakdown = {
  years: number;
  months: number;
  days: number;
};

export function getAgeBreakdown(dob: Date, now: Date = new Date()): AgeBreakdown {
  const d = intervalToDuration({ start: dob, end: now });
  return {
    years: d.years ?? 0,
    months: d.months ?? 0,
    days: d.days ?? 0,
  };
}

export type LiveStats = {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getLiveStats(dob: Date, now: Date = new Date()): LiveStats {
  return {
    years: differenceInYears(now, dob),
    months: differenceInMonths(now, dob),
    weeks: differenceInWeeks(now, dob),
    days: differenceInDays(now, dob),
    hours: differenceInHours(now, dob),
    minutes: differenceInMinutes(now, dob),
    seconds: differenceInSeconds(now, dob),
  };
}

export function getNextBirthday(dob: Date, now: Date = new Date()) {
  const year = now.getFullYear();
  let next = new Date(year, dob.getMonth(), dob.getDate());
  if (!isAfter(next, now)) {
    next = new Date(year + 1, dob.getMonth(), dob.getDate());
  }
  const last = new Date(
    isAfter(new Date(year, dob.getMonth(), dob.getDate()), now) ? year - 1 : year,
    dob.getMonth(),
    dob.getDate(),
  );
  const totalDays = Math.max(1, differenceInDays(next, last));
  const elapsed = Math.max(0, differenceInDays(now, last));
  const progress = Math.min(100, Math.round((elapsed / totalDays) * 100));
  const daysUntil = differenceInDays(next, now);
  return {
    date: next,
    daysUntil,
    weekday: format(next, "EEEE"),
    formatted: format(next, "MMMM d, yyyy"),
    progress,
  };
}

const ZODIAC: { name: string; emoji: string; from: [number, number]; to: [number, number] }[] = [
  { name: "Capricorn", emoji: "♑", from: [12, 22], to: [1, 19] },
  { name: "Aquarius", emoji: "♒", from: [1, 20], to: [2, 18] },
  { name: "Pisces", emoji: "♓", from: [2, 19], to: [3, 20] },
  { name: "Aries", emoji: "♈", from: [3, 21], to: [4, 19] },
  { name: "Taurus", emoji: "♉", from: [4, 20], to: [5, 20] },
  { name: "Gemini", emoji: "♊", from: [5, 21], to: [6, 20] },
  { name: "Cancer", emoji: "♋", from: [6, 21], to: [7, 22] },
  { name: "Leo", emoji: "♌", from: [7, 23], to: [8, 22] },
  { name: "Virgo", emoji: "♍", from: [8, 23], to: [9, 22] },
  { name: "Libra", emoji: "♎", from: [9, 23], to: [10, 22] },
  { name: "Scorpio", emoji: "♏", from: [10, 23], to: [11, 21] },
  { name: "Sagittarius", emoji: "♐", from: [11, 22], to: [12, 21] },
];

export function getZodiac(dob: Date) {
  const m = dob.getMonth() + 1;
  const d = dob.getDate();
  for (const z of ZODIAC) {
    if (z.name === "Capricorn") {
      if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return z;
    } else if (
      (m === z.from[0] && d >= z.from[1]) ||
      (m === z.to[0] && d <= z.to[1])
    ) {
      return z;
    }
  }
  return ZODIAC[0];
}

const CHINESE = [
  { name: "Monkey", emoji: "🐒" },
  { name: "Rooster", emoji: "🐓" },
  { name: "Dog", emoji: "🐕" },
  { name: "Pig", emoji: "🐖" },
  { name: "Rat", emoji: "🐀" },
  { name: "Ox", emoji: "🐂" },
  { name: "Tiger", emoji: "🐅" },
  { name: "Rabbit", emoji: "🐇" },
  { name: "Dragon", emoji: "🐉" },
  { name: "Snake", emoji: "🐍" },
  { name: "Horse", emoji: "🐎" },
  { name: "Goat", emoji: "🐐" },
];

export function getChineseZodiac(dob: Date) {
  return CHINESE[dob.getFullYear() % 12];
}

export function getGeneration(dob: Date) {
  const y = dob.getFullYear();
  if (y >= 2013) return { name: "Generation Alpha", range: "2013–2024" };
  if (y >= 1997) return { name: "Generation Z", range: "1997–2012" };
  if (y >= 1981) return { name: "Millennial", range: "1981–1996" };
  if (y >= 1965) return { name: "Generation X", range: "1965–1980" };
  if (y >= 1946) return { name: "Baby Boomer", range: "1946–1964" };
  return { name: "Silent Generation", range: "≤ 1945" };
}

export type Milestone = {
  label: string;
  date: Date;
  weekday: string;
  isPast: boolean;
};

export function getMilestones(dob: Date, now: Date = new Date()): Milestone[] {
  const items: { label: string; date: Date }[] = [
    { label: "1,000 days old", date: addDays(dob, 1000) },
    { label: "10,000 days old", date: addDays(dob, 10000) },
    { label: "20,000 days old", date: addDays(dob, 20000) },
    { label: "30th birthday", date: addYears(dob, 30) },
    { label: "40th birthday", date: addYears(dob, 40) },
    { label: "50th birthday", date: addYears(dob, 50) },
    { label: "60th birthday", date: addYears(dob, 60) },
  ];
  return items
    .map((m) => ({
      label: m.label,
      date: m.date,
      weekday: format(m.date, "EEEE"),
      isPast: !isAfter(m.date, now),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function parseDob(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value + "T00:00:00");
  if (!isValid(d)) return null;
  if (d.getTime() > Date.now()) return null;
  if (d.getFullYear() < 1900) return null;
  return d;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}