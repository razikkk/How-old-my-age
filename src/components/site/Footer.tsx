import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-foreground bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl">HowOldAm.me</p>
          <p className="mt-2 text-sm opacity-80">
            The exact age calculator. Real-time, leap-year accurate, private.
          </p>
        </div>
        <div>
          <p className="mb-2 font-semibold uppercase tracking-wider text-xs opacity-70">
            Tools
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:text-accent">
                Age Calculator
              </Link>
            </li>
            <li>
              <Link to="/age-difference" className="hover:text-accent">
                Age Difference
              </Link>
            </li>
            <li>
              <Link to="/workday-calculator" className="hover:text-accent">
                Workday Calculator
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 font-semibold uppercase tracking-wider text-xs opacity-70">
            About
          </p>
          <p className="text-sm opacity-80">
            All calculations happen in your browser. We don't store your date of birth.
          </p>
        </div>
      </div>
      <div className="border-t border-background/20 px-4 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} HowOldAm.me — Built for accuracy.
      </div>
    </footer>
  );
}