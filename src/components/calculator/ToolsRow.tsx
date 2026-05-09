import { Link } from "@tanstack/react-router";
import { ArrowRight, Users, Briefcase } from "lucide-react";
import { BrutalCard } from "../BrutalCard";

export function ToolsRow() {
  return (
    <section aria-labelledby="tools-heading">
      <h2 id="tools-heading" className="font-display text-3xl mb-6">
        More age tools
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/age-difference" className="block">
          <BrutalCard hover className="h-full">
            <Users className="h-6 w-6" strokeWidth={2.5} />
            <h3 className="mt-3 font-display text-2xl">Age Difference Calculator</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Compare two birthdays and get the exact gap in years, months, and days.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold">
              Open tool <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </BrutalCard>
        </Link>
        <Link to="/workday-calculator" className="block">
          <BrutalCard hover className="h-full">
            <Briefcase className="h-6 w-6" strokeWidth={2.5} />
            <h3 className="mt-3 font-display text-2xl">Workday Calculator</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Count working days between two dates, skipping weekends automatically.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold">
              Open tool <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </BrutalCard>
        </Link>
      </div>
    </section>
  );
}