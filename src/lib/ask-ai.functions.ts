import { createServerFn } from "@tanstack/react-start";
import { buildAnswerPrompt, callLovableChat } from "./answer-prompt";

export const askAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const data = input as {
      question?: string; marks?: number; words?: number;
      paper?: string; subject?: string;
    };
    if (!data?.question || typeof data.question !== "string") {
      throw new Error("question is required");
    }
    return {
      question: data.question,
      marks: typeof data.marks === "number" ? data.marks : undefined,
      words: typeof data.words === "number" ? data.words : undefined,
      paper: typeof data.paper === "string" ? data.paper : undefined,
      subject: typeof data.subject === "string" ? data.subject : undefined,
    };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const { system, user } = buildAnswerPrompt({
      question: data.question,
      marks: data.marks,
      words: data.words,
      paper: data.paper,
      subject: data.subject,
    });

    const answer = await callLovableChat(apiKey, [
      { role: "system", content: system },
      { role: "user", content: user },
    ]);
    return { answer };
  });
