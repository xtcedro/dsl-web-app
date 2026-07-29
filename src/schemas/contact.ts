import { z } from "zod";

export const SERVICE_AREAS = [
  "Oklahoma City",
  "Edmond",
  "Norman",
  "Moore",
  "Yukon",
  "Mustang",
  "Midwest City",
  "Del City",
  "Bethany",
  "Piedmont",
  "Choctaw",
  "Newcastle",
  "Other OKC metro",
] as const;

export const CARPORT_STYLES = [
  "Attached lean-to",
  "Detached gable",
  "A-frame",
  "Carport + storage combo",
  "Not sure yet",
] as const;

/**
 * Validates a quote-request submission. All fields are trimmed and length-bounded
 * so we never persist or echo back unbounded or control-character-laden input.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "That name is too long."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(200, "That email is too long."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9()+\-.\s]{7,20}$/, "Enter a valid phone number."),
  city: z.enum(SERVICE_AREAS, {
    errorMap: () => ({ message: "Choose the city closest to your driveway." }),
  }),
  style: z.enum(CARPORT_STYLES, {
    errorMap: () => ({ message: "Choose a carport style." }),
  }),
  message: z
    .string()
    .trim()
    .max(2000, "Keep that under 2000 characters.")
    .optional()
    .default(""),
});

export type ContactSubmission = z.infer<typeof contactSchema>;

/** Flattens a ZodError into one message per field for rendering next to form inputs. */
export function flattenContactErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !(field in out)) {
      out[field] = issue.message;
    }
  }
  return out;
}
