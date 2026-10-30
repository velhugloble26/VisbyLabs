import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { AnimatedText } from "./AnimatedText";

export function Section({
  children,
  className,
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 sm:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  id,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  id?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>
      )}
      <AnimatedText as={Tag} id={id} text={title} className="text-3xl font-semibold sm:text-4xl" />
      {text && <p className="mt-4 text-base text-muted sm:text-lg">{text}</p>}
    </div>
  );
}
