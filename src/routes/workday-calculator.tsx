import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Briefcase, Calculator } from "lucide-react";
import { differenceInCalendarDays, eachDayOfInterval, isWeekend, format } from "date-fns";
import { BrutalCard } from "@/components/BrutalCard";
import { formatNumber } from "@/lib/age";

const TITLE = "Workday Calculator — HowOldAm.me";
const DESC =
  "Count working days between two dates, automatically excluding weekends. Free tool from HowOldAm.me.";

export const Route = createFileRoute("/workday-calculator")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://howoldam.me/workday-calculator" }],
  }),
  component: WorkdayPage,
});

function parse(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function WorkdayPage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState<{ s: Date; e: Date } | null>(null);

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const s = parse(start);
    const e = parse(end);
    if (!s || !e) {
      setError("Please enter two valid dates.");
      setRange(null);
      return;
    }
    if (e < s) {
      setError("End date must be after start date.");
      setRange(null);
      return;
    }
    setError(null);
    setRange({ s, e });
  }

  const stats = useMemo(() => {
    if (!range) return null;
    const days = eachDayOfInterval({ start: range.s, end: range.e });
    const weekends = days.filter((d) => isWeekend(d)).length;
    const workdays = days.length - weekends;
    return {
      total: days.length,
      workdays,
      weekends,
      weeks: Math.floor(differenceInCalendarDays(range.e, range.s) / 7),
      startLabel: format(range.s, "EEEE, MMM d, yyyy"),
      endLabel: format(range.e, "EEEE, MMM d, yyyy"),
    };
  }, [range]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <Link to="/" className="inline-flex items-center gap-1 text-sm font-bold underline underline-offset-4">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.5} /> Back to calculator
      </Link>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-accent shadow-[4px_4px_0_0_var(--foreground)]">
          <Briefcase className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl">Workday Calculator</h1>
      </div>
      <p className="mt-4 text-lg text-muted-foreground">
        Count business days between two dates — weekends excluded. Perfect for project deadlines, leave planning, and contracts.
      </p>

      <BrutalCard className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest">Start date</span>
              <input
                type="date"
                required
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="mt-2 h-14 w-full border-2 border-foreground bg-background px-4 text-lg font-semibold shadow-[4px_4px_0_0_var(--foreground)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0_0_var(--foreground)] transition-all"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest">End date</span>
              <input
                type="date"
                required
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="mt-2 h-14 w-full border-2 border-foreground bg-background px-4 text-lg font-semibold shadow-[4px_4px_0_0_var(--foreground)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0_0_var(--foreground)] transition-all"
              />
            </label>
          </div>
          <button
            type="submit"
            className="inline-flex h-14 items-center justify-center gap-2 border-2 border-foreground bg-accent px-6 text-lg font-bold shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_var(--foreground)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            <Calculator className="h-5 w-5" strokeWidth={2.5} />
            Calculate
          </button>
          {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
        </form>
      </BrutalCard>

      {stats && (
        <BrutalCard className="mt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Working days</p>
          <p className="mt-2 font-display text-5xl sm:text-7xl leading-[0.95]">
            {formatNumber(stats.workdays)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {stats.startLabel} → {stats.endLabel}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total days", value: stats.total },
              { label: "Workdays", value: stats.workdays },
              { label: "Weekend days", value: stats.weekends },
              { label: "Full weeks", value: stats.weeks },
            ].map((s) => (
              <div key={s.label} className="border-2 border-foreground bg-background p-3 shadow-[3px_3px_0_0_var(--foreground)]">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-display text-xl">{formatNumber(s.value)}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Note: Saturdays and Sundays are excluded. Public holidays are not subtracted.
          </p>
        </BrutalCard>
      )}
    </div>
  );
}