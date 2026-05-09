import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Users, ArrowLeftRight } from "lucide-react";
import { intervalToDuration, differenceInDays, differenceInWeeks, differenceInMonths, differenceInHours, differenceInMinutes } from "date-fns";
import { BrutalCard } from "@/components/BrutalCard";
import { parseDob, formatNumber } from "@/lib/age";

const TITLE = "Age Difference Calculator — HowOldAm.me";
const DESC =
  "Calculate the exact age difference between two birthdays in years, months, and days. Free tool from HowOldAm.me.";

export const Route = createFileRoute("/age-difference")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://howoldam.me/age-difference" }],
  }),
  component: AgeDifferencePage,
});

function AgeDifferencePage() {
  const today = new Date().toISOString().slice(0, 10);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ start: Date; end: Date } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const da = parseDob(a);
    const db = parseDob(b);
    if (!da || !db) {
      setError("Please enter two valid dates.");
      setResult(null);
      return;
    }
    const [start, end] = da <= db ? [da, db] : [db, da];
    setError(null);
    setResult({ start, end });
  }

  const stats = useMemo(() => {
    if (!result) return null;
    const { start, end } = result;
    const dur = intervalToDuration({ start, end });
    return {
      years: dur.years ?? 0,
      months: dur.months ?? 0,
      days: dur.days ?? 0,
      totalDays: differenceInDays(end, start),
      totalWeeks: differenceInWeeks(end, start),
      totalMonths: differenceInMonths(end, start),
      totalHours: differenceInHours(end, start),
      totalMinutes: differenceInMinutes(end, start),
    };
  }, [result]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <Link to="/" className="inline-flex items-center gap-1 text-sm font-bold underline underline-offset-4">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.5} /> Back to calculator
      </Link>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-accent shadow-[4px_4px_0_0_var(--foreground)]">
          <Users className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl">Age Difference Calculator</h1>
      </div>
      <p className="mt-4 text-lg text-muted-foreground">
        Compare two dates of birth and get the precise gap — useful for siblings, couples, classmates, and family-tree research.
      </p>

      <BrutalCard className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest">Person A — DOB</span>
              <input
                type="date"
                required
                max={today}
                min="1900-01-01"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="mt-2 h-14 w-full border-2 border-foreground bg-background px-4 text-lg font-semibold shadow-[4px_4px_0_0_var(--foreground)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0_0_var(--foreground)] transition-all"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest">Person B — DOB</span>
              <input
                type="date"
                required
                max={today}
                min="1900-01-01"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="mt-2 h-14 w-full border-2 border-foreground bg-background px-4 text-lg font-semibold shadow-[4px_4px_0_0_var(--foreground)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0_0_var(--foreground)] transition-all"
              />
            </label>
          </div>
          <button
            type="submit"
            className="inline-flex h-14 items-center justify-center gap-2 border-2 border-foreground bg-accent px-6 text-lg font-bold shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_var(--foreground)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            <ArrowLeftRight className="h-5 w-5" strokeWidth={2.5} />
            Compare
          </button>
          {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
        </form>
      </BrutalCard>

      {stats && (
        <BrutalCard className="mt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Age difference</p>
          <p className="mt-2 font-display text-4xl sm:text-6xl leading-[0.95]">
            {stats.years}<span className="text-2xl sm:text-3xl"> yr</span> · {stats.months}<span className="text-2xl sm:text-3xl"> mo</span> · {stats.days}<span className="text-2xl sm:text-3xl"> d</span>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total months", value: stats.totalMonths },
              { label: "Total weeks", value: stats.totalWeeks },
              { label: "Total days", value: stats.totalDays },
              { label: "Total hours", value: stats.totalHours },
            ].map((s) => (
              <div key={s.label} className="border-2 border-foreground bg-background p-3 shadow-[3px_3px_0_0_var(--foreground)]">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-display text-xl">{formatNumber(s.value)}</p>
              </div>
            ))}
          </div>
        </BrutalCard>
      )}
    </div>
  );
}