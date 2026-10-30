import Link from "next/link";
import { site } from "@/data/site";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 font-display text-lg font-semibold">
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand to-success text-sm font-bold text-bg"
      >
        V
      </span>
      <span>{site.name}</span>
    </Link>
  );
}
