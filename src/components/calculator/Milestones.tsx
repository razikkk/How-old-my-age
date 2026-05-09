import { format } from "date-fns";
import { CheckCircle2, Flag } from "lucide-react";
import { getMilestones } from "@/lib/age";

export function Milestones({ dob }: { dob: Date }) {
  const items = getMilestones(dob);
  return (
    <section aria-labelledby="milestones-heading">
      <div className="mb-4 flex items-center gap-2">
        <Flag className="h-5 w-5" strokeWidth={2.5} />
        <h2 id="milestones-heading" className="font-display text-2xl">
          Life Milestones
        </h2>
      </div>
      <ol className="relative border-l-2 border-foreground pl-6">
        {items.map((m) => (
          <li key={m.label} className="mb-5 last:mb-0">
            <span
              className={`absolute -left-[11px] flex h-5 w-5 items-center justify-center border-2 border-foreground ${
                m.isPast ? "bg-foreground text-background" : "bg-accent"
              }`}
            >
              {m.isPast && <CheckCircle2 className="h-3 w-3" strokeWidth={3} />}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <p className="font-display text-lg">{m.label}</p>
              <p className="text-sm text-muted-foreground">
                {m.weekday}, {format(m.date, "MMMM d, yyyy")}
                {m.isPast && (
                  <span className="ml-2 inline-block border border-foreground bg-background px-1.5 text-[0.65rem] font-bold uppercase">
                    Reached
                  </span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}