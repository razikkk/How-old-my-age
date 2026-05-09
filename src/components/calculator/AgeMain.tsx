import { BrutalCard } from "../BrutalCard";
import type { AgeBreakdown } from "@/lib/age";

export function AgeMain({ age, dobLabel }: { age: AgeBreakdown; dobLabel: string }) {
  return (
    <BrutalCard accent className="overflow-hidden">
      <p className="text-xs font-bold uppercase tracking-[0.2em]">Your exact age</p>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-6">
        <Unit value={age.years} label="Years" />
        <Unit value={age.months} label="Months" />
        <Unit value={age.days} label="Days" />
      </div>
      <p className="mt-4 text-sm font-medium opacity-80">
        Born on <span className="font-bold">{dobLabel}</span>
      </p>
    </BrutalCard>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="border-2 border-foreground bg-background p-3 sm:p-5 text-foreground">
      <p className="font-display text-5xl sm:text-7xl leading-none tracking-tight tabular-nums">
        {value}
      </p>
      <p className="mt-2 text-xs font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
}