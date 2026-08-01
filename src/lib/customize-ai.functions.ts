import { createServerFn } from "@tanstack/react-start";
import { buildAnswerPrompt, callLovableChat } from "./answer-prompt";
import { fetchEthicsExampleBank, isEthicsQuestion } from "./ethics-cache.server";
import { cacheModelAnswerIfMissing } from "./model-answer-cache.server";

type ChatMsg = { role: "user" | "assistant"; content: string };

export const customizeAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const d = input as {
      id?: string;
      question?: string;
      marks?: number;
      words?: number;
      paper?: string;
      subject?: string;
      previousAnswer?: string;
      wordCount?: number;
      chips?: string[];
      userMessage?: string;
      history?: ChatMsg[];
    };
    if (!d?.question) throw new Error("question required");
    if (!d?.userMessage && !(d.chips && d.chips.length) && !d.wordCount) {
      throw new Error("Tell the AI how to customize the answer.");
    }
    return {
      id: typeof d.id === "string" ? d.id : undefined,
      question: d.question,
      marks: typeof d.marks === "number" ? d.marks : undefined,
      words: typeof d.words === "number" ? d.words : undefined,
      paper: typeof d.paper === "string" ? d.paper : undefined,
      subject: typeof d.subject === "string" ? d.subject : undefined,
      previousAnswer: typeof d.previousAnswer === "string" ? d.previousAnswer : undefined,
      wordCount: typeof d.wordCount === "number" ? d.wordCount : undefined,
      chips: Array.isArray(d.chips) ? d.chips.filter((c) => typeof c === "string").slice(0, 12) : [],
      userMessage: typeof d.userMessage === "string" ? d.userMessage : "",
      history: Array.isArray(d.history)
        ? d.history
            .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
            .slice(-12)
        : [],
    };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const ethics = isEthicsQuestion({
      question: data.question,
      paper: data.paper,
      subject: data.subject,
    });
    const exampleBank = ethics.isEthics
      ? await fetchEthicsExampleBank(data.question)
      : undefined;

    const { system } = buildAnswerPrompt({
      question: data.question,
      marks: data.marks,
      words: data.wordCount ?? data.words,
      paper: data.paper,
      subject: data.subject,
      previousAnswer: data.previousAnswer,
      exampleBank,
    });

    const contextBlock = [
      `UPSC PYQ${data.paper ? ` (${data.paper}${data.subject ? ` · ${data.subject}` : ""})` : ""}:`,
      data.question,
      data.marks ? `Marks: ${data.marks}${data.words ? `, Words: ${data.words}` : ""}` : "",
      data.previousAnswer ? `\nPrevious answer for reference:\n${data.previousAnswer}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const instructionParts: string[] = [];
    if (data.wordCount) instructionParts.push(`Target length: ~${data.wordCount} words.`);
    if (data.chips.length) instructionParts.push(`Apply these focus areas: ${data.chips.join(", ")}.`);
    if (data.userMessage) instructionParts.push(data.userMessage);

    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      {
        role: "system",
        content: `${system}

You are now in a customization chat. The user will iteratively refine the answer. On each turn:
- Regenerate the FULL model answer applying the user's latest instructions, keeping earlier accepted changes.
- Preserve UPSC topper style, structure, and all HARD RULES.
- Never fabricate. If asked for something you cannot verify, say so briefly and omit.`,
      },
      { role: "user", content: contextBlock },
      ...data.history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: instructionParts.join("\n\n") },
    ];

    const answer = await callLovableChat(apiKey, messages);

    // Persist the first AI answer for this question so the "Answer" button
    // never has to call the model again.
    if (data.id) {
      await cacheModelAnswerIfMissing({
        id: data.id,
        question: data.question,
        paper: data.paper,
        answer,
      });
    }

    return { answer };
  });
