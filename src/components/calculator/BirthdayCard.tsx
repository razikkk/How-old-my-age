import { BrutalCard } from "../BrutalCard";
import { Cake, PartyPopper } from "lucide-react";
import { getNextBirthday } from "@/lib/age";

export function BirthdayCard({ dob }: { dob: Date }) {
  const b = getNextBirthday(dob);
  return (
    <BrutalCard hover className="bg-foreground text-background">
      <div className="flex items-center gap-2">
        <Cake className="h-5 w-5" strokeWidth={2.5} />
        <h2 className="font-display text-2xl">Next Birthday</h2>
      </div>
      <div className="mt-4 flex items-end gap-3">
        <span className="font-display text-6xl leading-none tabular-nums text-accent">
          {b.daysUntil}
        </span>
        <span className="pb-1 text-sm font-semibold opacity-80">
          {b.daysUntil === 1 ? "day to go" : "days to go"}
        </span>
      </div>
      <p className="mt-3 text-sm">
        Falls on <span className="font-bold text-accent">{b.weekday}</span>,{" "}
        {b.formatted}
      </p>
      <div className="mt-4">
        <div className="flex justify-between text-[0.65rem] font-bold uppercase tracking-widest opacity-70">
          <span>Year progress</span>
          <span>{b.progress}%</span>
        </div>
        <div className="mt-1.5 h-3 w-full border-2 border-background bg-background/10">
          <div
            className="h-full bg-accent"
            style={{ width: `${b.progress}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
      {b.daysUntil <= 7 && (
        <p className="mt-3 inline-flex items-center gap-1.5 border-2 border-accent bg-accent px-2 py-1 text-xs font-bold text-foreground">
          <PartyPopper className="h-3.5 w-3.5" strokeWidth={2.5} />
          Celebration imminent
        </p>
      )}
    </BrutalCard>
  );
}