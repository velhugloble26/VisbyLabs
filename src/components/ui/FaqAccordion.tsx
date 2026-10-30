import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/services";

/** Native <details> accordion: works without JavaScript and is keyboard accessible. */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-card/70">
      {faqs.map((faq) => (
        <details key={faq.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-ink [&::-webkit-details-marker]:hidden">
            {faq.q}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="mt-3 text-muted">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
