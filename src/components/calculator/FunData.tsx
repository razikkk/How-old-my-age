import { BrutalCard } from "../BrutalCard";
import { getZodiac, getChineseZodiac, getGeneration } from "@/lib/age";
import { Sparkles } from "lucide-react";

export function FunData({ dob }: { dob: Date }) {
  const z = getZodiac(dob);
  const c = getChineseZodiac(dob);
  const g = getGeneration(dob);

  return (
    <section aria-labelledby="fun-heading">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5" strokeWidth={2.5} />
        <h2 id="fun-heading" className="font-display text-2xl">
          About you
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <BrutalCard hover>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Western Zodiac
          </p>
          <p className="mt-2 font-display text-4xl">{z.emoji}</p>
          <p className="mt-1 font-display text-2xl">{z.name}</p>
        </BrutalCard>
        <BrutalCard hover>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Chinese Zodiac
          </p>
          <p className="mt-2 font-display text-4xl">{c.emoji}</p>
          <p className="mt-1 font-display text-2xl">Year of the {c.name}</p>
        </BrutalCard>
        <BrutalCard hover>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Generation
          </p>
          <p className="mt-2 font-display text-2xl leading-tight">{g.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">Born {g.range}</p>
        </BrutalCard>
      </div>
    </section>
  );
}