"use client";

import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitContact } from "@/app/contact/actions";
import { contactSchema, flattenErrors, improveOptions, readContactForm } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Errors = Partial<Record<string, string>>;

const inputClass =
  "w-full rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand focus:outline-none";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-amber">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string>();
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setFormError(undefined);

    const parsed = contactSchema.safeParse(readContactForm(formData));
    if (!parsed.success) {
      setErrors(flattenErrors(parsed.error));
      return;
    }
    setErrors({});

    startTransition(async () => {
      try {
        const result = await submitContact(formData);
        if (result.ok) setDone(true);
        else {
          setErrors(result.errors);
          setFormError(result.message);
        }
      } catch {
        setFormError("Something went wrong. Please try again in a moment.");
      }
    });
  };

  if (done) {
    return (
      <div role="status" className="rounded-2xl border border-success/40 bg-success/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" aria-hidden />
        <h2 className="mt-4 text-2xl font-semibold">Thank you. Your message is in.</h2>
        <p className="mt-2 text-muted">A person will read it and reply with a practical next step.</p>
      </div>
    );
  }

  const describe = (id: string) => (errors[id] ? `${id}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-line bg-card/70 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={describe("name")} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} aria-describedby={describe("email")} />
        </Field>
        <Field id="business" label="Business name" error={errors.business}>
          <input id="business" name="business" autoComplete="organization" className={inputClass} aria-invalid={!!errors.business} aria-describedby={describe("business")} />
        </Field>
        <Field id="phone" label="Phone or WhatsApp" optional error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} aria-invalid={!!errors.phone} aria-describedby={describe("phone")} />
        </Field>
      </div>

      <Field id="topic" label="What would you like to improve first?" error={errors.topic}>
        <select id="topic" name="topic" defaultValue="" className={inputClass} aria-invalid={!!errors.topic} aria-describedby={describe("topic")}>
          <option value="" disabled>
            Choose one
          </option>
          {improveOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Tell us your goal and current setup" error={errors.message}>
        <textarea id="message" name="message" rows={5} className={inputClass} aria-invalid={!!errors.message} aria-describedby={describe("message")} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4 rounded border-line accent-[rgb(var(--brand))]"
            aria-invalid={!!errors.consent}
            aria-describedby={describe("consent")}
          />
          I agree that Visby Labs may use these details to reply to my message.
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 text-sm text-amber">
            {errors.consent}
          </p>
        )}
      </div>

      {formError && (
        <p role="alert" className="rounded-xl border border-amber/50 bg-amber/10 p-3 text-sm text-amber">
          {formError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className={cn("w-full sm:w-auto")}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {pending ? "Sending" : "Send message"}
      </Button>
    </form>
  );
}
