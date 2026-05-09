import { Link } from "@tanstack/react-router";
import { Cake } from "lucide-react";

export function Header() {
  return (
    <header className="border-b-2 border-foreground bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-accent shadow-[3px_3px_0_0_var(--foreground)] transition-transform group-hover:-translate-y-0.5">
            <Cake className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl tracking-tight">
            HowOldAm<span className="text-muted-foreground">.me</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold sm:flex">
          <Link to="/" activeProps={{ className: "underline underline-offset-4" }}>
            Calculator
          </Link>
          <Link
            to="/age-difference"
            activeProps={{ className: "underline underline-offset-4" }}
          >
            Age Difference
          </Link>
          <Link
            to="/workday-calculator"
            activeProps={{ className: "underline underline-offset-4" }}
          >
            Workday
          </Link>
        </nav>
      </div>
    </header>
  );
}