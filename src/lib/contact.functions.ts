import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z
    .string()
    .trim()
    .max(320)
    .email()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  contact_number: z
    .string()
    .trim()
    .max(50)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  message: z.string().trim().min(5).max(5000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    });

    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email ?? null,
      contact_number: data.contact_number ?? null,
      message: data.message,
    });
    if (error) throw new Error(`Could not save your message: ${error.message}`);

    // Best-effort email notification via Lovable Emails. If the email domain
    // is not configured yet, the DB row still exists as backup.
    let emailed = false;
    try {
      const apiKey = process.env.LOVABLE_API_KEY;
      const senderDomain = process.env.EMAIL_SENDER_DOMAIN;
      if (apiKey && senderDomain) {
        const res = await fetch("https://api.lovable.dev/v1/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: `UPSC PYQ <notify@${senderDomain}>`,
            to: "mrityunjay.tab@gmail.com",
            subject: `New feedback from ${data.name}`,
            text: [
              `Name: ${data.name}`,
              `Email: ${data.email ?? "(not provided)"}`,
              `Phone: ${data.contact_number ?? "(not provided)"}`,
              "",
              data.message,
            ].join("\n"),
          }),
        });
        emailed = res.ok;
      }
    } catch {
      // Swallow — DB backup is authoritative; user is not blocked.
    }

    return { ok: true, emailed };
  });
