# HowOldAm.me — Exact Age Calculator

> Note on stack: this project is built on **TanStack Start + React 19 + Tailwind v4** (not Next.js). The framework difference doesn't affect features — file-based routing, SSR, SEO meta tags, and static export all work the same. No database needed (everything runs client-side). I'll proceed on TanStack Start unless you'd prefer I scaffold a separate Next.js project.

## Design direction
Neo-Brutalism / Smart Simplicity:
- Off-white background (`#F5F3EE`), ink black foreground, one saturated accent (electric lime `#D7FF3A` or coral `#FF5C4D` — lime by default).
- Hard 2px black borders, offset block shadows (`8px 8px 0 #000`), no blur.
- Display font **Archivo Black** for headlines; **Inter** for body.
- Card hover: shadow collapses to `2px 2px` + 1px translate (micro-interaction).
- Mobile-first, responsive grid.

## Pages & routes
```
src/routes/
  index.tsx              → Calculator (hero + all result sections + FAQ)
  age-difference.tsx     → Placeholder tool page
  workday-calculator.tsx → Placeholder tool page
  __root.tsx             → site-wide meta, header, footer
```

## Home page sections (single scroll)
1. **Header** — `HowOldAm.me` wordmark + nav (Calculator / Age Difference / Workday / FAQ).
2. **Hero**
   - H1: *Exact Age Calculator — Find Your Real Age Today*
   - Sub-headline + DOB input (native `<input type="date">` styled brutalist) + **Calculate** button.
3. **Main Result Card** — huge type: `27 Years · 4 Months · 12 Days`.
4. **Live Statistics Grid** (7 cards, ticks every second):
   Years · Months · Weeks · Days · Hours · Minutes · Seconds — `setInterval(1000)` re-renders only this grid.
5. **Birthday Card** — Days until next birthday, weekday it falls on, progress bar (% of year elapsed since last birthday).
6. **Fun Data** — Zodiac (date ranges), Chinese Zodiac (year % 12 table), Generation (Gen Alpha / Z / Millennial / X / Boomer / Silent based on birth year).
7. **Milestones Timeline** — vertical brutalist timeline: 1,000 days old · 10,000 days old · next 30 / 40 / 50 birthdays (only future ones rendered with absolute dates + weekday).
8. **More Tools** — two cards linking to `/age-difference` and `/workday-calculator` (placeholder pages with "Coming soon" + back link).
9. **How to Calculate** — 3-step row with Lucide icons (`CalendarDays`, `Calculator`, `Sparkles`).
10. **FAQ Accordion** — uses existing `components/ui/accordion`. Need the actual FAQ text from you (your prompt said "[Paste the FAQ from your message here]" but no FAQ was included). I'll insert 6 sensible default Q&As covering: how it works, leap years, accuracy, time zones, zodiac sources, privacy. Replace later if you have specific copy.
11. **Footer** — copyright, tagline, tool links.

## Calculation logic (`src/lib/age.ts`)
Pure functions using `date-fns`:
- `intervalToDuration({ start, end })` → years/months/days breakdown (handles leap years).
- `differenceInSeconds/Minutes/Hours/Days/Weeks/Months/Years` for the live grid.
- `nextBirthday(dob)` → next anniversary; `differenceInDays` to today; `format(d, 'EEEE')` for weekday.
- `getZodiac(month, day)` → lookup table.
- `getChineseZodiac(year)` → 12-element array.
- `getGeneration(year)` → if/else thresholds (Alpha ≥2013, Z 1997–2012, Millennial 1981–1996, X 1965–1980, Boomer 1946–1964, Silent ≤1945).
- Milestones via `addDays(dob, 1000)`, `addDays(dob, 10000)`, `setYear(dob, dobYear+30)` etc.

## SEO
Per-route `head()` in TanStack Start:
- **Home** title: *Exact Age Calculator 2026 — How Old Am I Today | HowOldAm.me* (≤60 chars version trimmed).
- meta description (≤160) hitting "exact age calculator", "how old am I today", "chronological age".
- Keywords meta with primary/secondary/high-intent terms you listed.
- Open Graph + Twitter card tags.
- JSON-LD `WebApplication` + `FAQPage` schema rendered server-side.
- Single H1, semantic `<section>` headings, alt text, canonical tag, viewport.

## Components
```
src/components/
  Header.tsx · Footer.tsx
  DobForm.tsx           (date input + validation)
  AgeMain.tsx           (big result)
  LiveStatsGrid.tsx     (live ticker)
  BirthdayCard.tsx
  FunData.tsx
  Milestones.tsx
  HowItWorks.tsx
  Faq.tsx
  ToolCard.tsx
  BrutalCard.tsx        (shared border+shadow wrapper)
```
State held in the `Index` route via `useState<Date | null>`. localStorage persistence so refresh keeps the DOB.

## Technical details
- Install `date-fns` via `bun add date-fns`.
- Tailwind v4 tokens added in `src/styles.css`: `--background`, `--foreground`, `--accent` (lime), `--brutal-shadow`, plus radius `0` for sharp corners.
- All icons from `lucide-react` (already present).
- Fully client-side; no backend.

## Open questions
1. **FAQ copy** — you referenced FAQ text but didn't include it. OK to use 6 default Q&As I write, or do you want to paste yours?
2. **Stack** — confirm continuing on TanStack Start (recommended, no setup cost) vs. scaffolding a fresh Next.js project from scratch.
3. **Accent color** — lime `#D7FF3A` or coral `#FF5C4D`?
