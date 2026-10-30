import { cn } from "@/lib/utils";
import { site } from "@/data/site";

const stages = [
  { label: "Reach", width: "100%" },
  { label: "Clicks", width: "64%" },
  { label: "Enquiries", width: "34%" },
  { label: "Qualified", width: "16%" },
];

/** Static funnel shape. It shows structure only, never real figures. */
export function CampaignVisual({ compact = false, title = "Illustrative campaign view" }: { compact?: boolean; title?: string }) {
  return (
    <figure
      className={cn("rounded-2xl border border-line bg-bg/60", compact ? "p-4" : "p-6")}
      aria-label={`${title}. Not real data.`}
    >
      <figcaption className="mb-4 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-ink">{title}</span>
        <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
          Not real data
        </span>
      </figcaption>
      <ul className="space-y-2.5">
        {stages.map((stage, i) => (
          <li key={stage.label} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-xs text-muted">{stage.label}</span>
            <span className="h-6 flex-1 rounded-md bg-line/30">
              <span
                className={cn(
                  "block h-full rounded-md bg-gradient-to-r from-brand to-success",
                  i > 0 && "opacity-90",
                )}
                style={{ width: stage.width }}
              />
            </span>
          </li>
        ))}
      </ul>
      {!compact && <p className="mt-4 text-xs text-muted">{site.flowDisclaimer}</p>}
    </figure>
  );
}
