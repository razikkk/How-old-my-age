import { useEffect, useState } from "react";
import { BrutalCard } from "../BrutalCard";
import { formatNumber, getLiveStats } from "@/lib/age";
import { Clock } from "lucide-react";

export function LiveStatsGrid({ dob }: { dob: Date }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const s = getLiveStats(dob, now);
  const items: { label: string; value: number }[] = [
    { label: "Years", value: s.years },
    { label: "Months", value: s.months },
    { label: "Weeks", value: s.weeks },
    { label: "Days", value: s.days },
    { label: "Hours", value: s.hours },
    { label: "Minutes", value: s.minutes },
    { label: "Seconds", value: s.seconds },
  ];

  return (
    <section aria-labelledby="live-stats-heading">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5" strokeWidth={2.5} />
        <h2 id="live-stats-heading" className="font-display text-2xl">
          Total time you've lived
        </h2>
        <span className="ml-2 inline-flex items-center gap-1.5 border-2 border-foreground bg-accent px-2 py-0.5 text-xs font-bold uppercase">
          <span className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
          Live
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
        {items.map((it) => (
          <BrutalCard key={it.label} hover className="!p-4">
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
              {it.label}
            </p>
            <p className="mt-1 font-display text-2xl leading-tight tabular-nums break-all">
              {formatNumber(it.value)}
            </p>
          </BrutalCard>
        ))}
      </div>
    </section>
  );
}