import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQS = [
  {
    q: "How accurate is this age calculator?",
    a: "Down to the second. We use date-fns to correctly handle leap years, varying month lengths, and time zones, so the years/months/days breakdown matches the chronological age standard used by schools, hospitals, and immigration offices.",
  },
  {
    q: "How do I calculate my exact age in years, months, and days?",
    a: "Enter your date of birth and we compute the interval between your DOB and the current moment, then break it down into full years, remaining months, and remaining days — exactly how chronological age is defined.",
  },
  {
    q: "Does it handle leap years correctly?",
    a: "Yes. Every February 29th, every century rule, every quad-century rule. If you were born on Feb 29, your age increments on March 1 in non-leap years.",
  },
  {
    q: "How many days have I lived?",
    a: "Check the live statistics grid above — it shows your total days, weeks, hours, minutes and seconds, ticking in real time.",
  },
  {
    q: "How many days until my next birthday?",
    a: "The Next Birthday card shows the exact countdown plus the day of the week your birthday will fall on this year, with a progress bar of the year elapsed.",
  },
  {
    q: "Is my date of birth stored anywhere?",
    a: "No. All calculations happen in your browser. Optionally we cache your DOB in your own browser's localStorage so you don't have to re-enter it. Clear it anytime.",
  },
  {
    q: "Can I calculate the age difference between two people?",
    a: "Yes — head to the Age Difference Calculator tool linked in the navigation. It computes the exact gap between two dates of birth.",
  },
  {
    q: "Will this work for school admission age or retirement age?",
    a: "Yes. The calculator gives you a precise chronological age in years/months/days — the exact format used for school cut-offs, retirement eligibility, and government age requirements.",
  },
];

export function Faq() {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display text-3xl mb-6">
        Frequently Asked Questions
      </h2>
      <div className="border-2 border-foreground bg-card shadow-[8px_8px_0_0_var(--foreground)]">
        <Accordion type="single" collapsible className="divide-y-2 divide-foreground">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b-0 px-5">
              <AccordionTrigger className="py-4 text-left font-display text-lg hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}