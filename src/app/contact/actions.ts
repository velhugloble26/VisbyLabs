"use server";

import { contactSchema, flattenErrors, readContactForm, type ContactResult } from "@/lib/contact-schema";

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const raw = readContactForm(formData);

  // Honeypot: pretend it worked so bots learn nothing.
  if (raw.website) return { ok: true };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: flattenErrors(parsed.error) };
  }

  // TODO: deliver the enquiry. For example, send an email through your provider
  // or create a lead in your CRM using `parsed.data`. Nothing is stored or sent yet.
  return { ok: true };
}
