import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ArrowDown, Sparkles } from "lucide-react";
import { DobForm } from "@/components/calculator/DobForm";
import { AgeMain } from "@/components/calculator/AgeMain";
import { LiveStatsGrid } from "@/components/calculator/LiveStatsGrid";
import { BirthdayCard } from "@/components/calculator/BirthdayCard";
import { FunData } from "@/components/calculator/FunData";
import { Milestones } from "@/components/calculator/Milestones";
import { ToolsRow } from "@/components/calculator/ToolsRow";
import { HowItWorks } from "@/components/calculator/HowItWorks";
import { Faq, FAQS } from "@/components/calculator/Faq";
import { getAgeBreakdown, parseDob } from "@/lib/age";

const TITLE = "Exact Age Calculator 2026 — How Old Am I Today | HowOldAm.me";
const DESC =
  "Find your exact chronological age in years, months, days, hours, minutes & seconds. Free 2026 age calculator with birthday countdown, zodiac & milestones.";
const KEYWORDS =
  "exact age calculator, how old am I today, chronological age calculator, age calculator 2026, days until next birthday, how many days have I lived, age difference between two dates, age for school admission calculator, retirement age tracker";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: KEYWORDS },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://howoldam.me/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://howoldam.me/" },
    { rel: "icon", type: "image/x-icon", href: "/how-old-am-i.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/icon-32x32.png" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "HowOldAm.me Age Calculator",
          url: "https://howoldam.me/",
          applicationCategory: "UtilityApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: DESC,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const STORAGE_KEY = "howoldam:dob";

function Index() {
  const [dob, setDob] = useState<Date | null>(null);
  const [raw, setRaw] = useState<string>("");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      const d = parseDob(stored);
      if (d) {
        setDob(d);
        setRaw(stored);
      }
    }
  }, []);

  function handleSubmit(d: Date, r: string) {
    setDob(d);
    setRaw(r);
    try {
      localStorage.setItem(STORAGE_KEY, r);
    } catch {}
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  return (
    <>
      <section className="relative overflow-hidden border-b-2 border-foreground bg-background">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="mb-6 inline-flex items-center gap-2 border-2 border-foreground bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0_0_var(--foreground)]">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={3} />
            Free · Real-time · Private
          </div>
          <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Exact Age Calculator —
            <br />
            <span className="bg-accent px-2 py-0.5">Find Your Real Age</span> Today
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            How old am I today, down to the second? Enter your date of birth and get
            an accurate chronological age, your next birthday countdown, life
            milestones, and zodiac details — all calculated live in your browser.
          </p>
          <div className="mt-8 max-w-2xl">
            <DobForm initial={raw} onSubmit={handleSubmit} />
          </div>
          {dob && (
            <a
              href="#results"
              className="mt-6 inline-flex items-center gap-1 text-sm font-bold underline underline-offset-4"
            >
              See your results <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
            </a>
          )}
        </div>
      </section>

      {dob && (
        <div id="results" className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <AgeMain
              age={getAgeBreakdown(dob)}
              dobLabel={format(dob, "MMMM d, yyyy")}
            />
            <BirthdayCard dob={dob} />
          </div>
          <LiveStatsGrid dob={dob} />
          <FunData dob={dob} />
          <Milestones dob={dob} />
          <ToolsRow />
        </div>
      )}

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:py-16">
        {!dob && <ToolsRow />}
        <HowItWorks />
        <Faq />
      </div>
    </>
  );
}