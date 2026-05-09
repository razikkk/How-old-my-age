import { useState, type FormEvent } from "react";
import { Calculator } from "lucide-react";
import { parseDob } from "@/lib/age";

interface Props {
  initial?: string;
  onSubmit: (dob: Date, raw: string) => void;
}

export function DobForm({ initial = "", onSubmit }: Props) {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const dob = parseDob(value);
    if (!dob) {
      setError("Please enter a valid date of birth.");
      return;
    }
    setError(null);
    onSubmit(dob, value);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Date of birth</span>
          <input
            type="date"
            required
            max={today}
            min="1900-01-01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-14 w-full border-2 border-foreground bg-background px-4 text-lg font-semibold shadow-[4px_4px_0_0_var(--foreground)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0_0_var(--foreground)] transition-all"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-14 items-center justify-center gap-2 border-2 border-foreground bg-accent px-6 text-lg font-bold text-accent-foreground shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_var(--foreground)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
        >
          <Calculator className="h-5 w-5" strokeWidth={2.5} />
          Calculate
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm font-semibold text-destructive">{error}</p>
      )}
    </form>
  );
}