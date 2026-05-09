import { CalendarDays, Calculator, Sparkles } from "lucide-react";
import { BrutalCard } from "../BrutalCard";

const steps = [
  {
    icon: CalendarDays,
    title: "1. Enter your DOB",
    body: "Pick your exact date of birth. Everything stays in your browser — we never store it.",
  },
  {
    icon: Calculator,
    title: "2. We do the math",
    body: "Powered by date-fns: leap years, month lengths, and time zones handled correctly.",
  },
  {
    icon: Sparkles,
    title: "3. See it all",
    body: "Real-time age, milestones, zodiacs and your next birthday — instantly.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading">
      <h2 id="how-heading" className="font-display text-3xl mb-6">
        How to calculate your exact age
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((s) => (
          <BrutalCard key={s.title} hover>
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center border-2 border-foreground bg-accent">
              <s.icon className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <h3 className="font-display text-lg">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
          </BrutalCard>
        ))}
      </div>
    </section>
  );
}