import { z } from "zod";

export const improveOptions = [
  "More qualified enquiries",
  "Clearer ad reporting",
  "More consistent follow-up",
  "Less manual work",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  business: z.string().trim().min(2, "Please enter your business name").max(120),
  phone: z
    .string()
    .trim()
    .max(30, "That number looks too long")
    .regex(/^[+()\d\s-]*$/, "Use digits, spaces, + or - only"),
  topic: z.enum(improveOptions, {
    errorMap: () => ({ message: "Please choose where to start" }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more detail")
    .max(2000, "Please keep this under 2000 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree so we can reply to you" }),
  }),
  // Honeypot: real people never see or fill this field.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; errors: Partial<Record<string, string>>; message?: string };

export function readContactForm(formData: FormData) {
  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  return {
    name: text("name"),
    email: text("email"),
    business: text("business"),
    phone: text("phone"),
    topic: text("topic"),
    message: text("message"),
    consent: formData.get("consent") === "on",
    website: text("website"),
  };
}

export function flattenErrors(error: z.ZodError): Partial<Record<string, string>> {
  const out: Partial<Record<string, string>> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
