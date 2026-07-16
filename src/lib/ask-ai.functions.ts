import { createServerFn } from "@tanstack/react-start";

export const askAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const data = input as { question?: string; marks?: number; words?: number };
    if (!data?.question || typeof data.question !== "string") {
      throw new Error("question is required");
    }
    return {
      question: data.question,
      marks: typeof data.marks === "number" ? data.marks : undefined,
      words: typeof data.words === "number" ? data.words : undefined,
    };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const wordTarget = data.words ?? (data.marks && data.marks >= 15 ? 250 : 150);

    const system = `You are an expert UPSC Civil Services Mains answer-writing coach. Produce a model answer in the official UPSC Mains format:

1. Introduction — a crisp 2-3 line context/definition.
2. Body — clearly structured with descriptive sub-headings, bullet points, and where relevant: examples, data, committee/report references, constitutional articles, case laws, or schemes. Use dimensions like political, economic, social, environmental, ethical, administrative as applicable.
3. Way Forward / Conclusion — a balanced, forward-looking conclusion.

Use markdown headings (##, ###) and bullet points. Keep the answer within approximately ${wordTarget} words. Be factual, balanced, and avoid rhetoric.`;

    const userPrompt = `Question${data.marks ? ` (${data.marks} marks${data.words ? `, ${data.words} words` : ""})` : ""}: ${data.question}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      body: JSON.stringify({
        model: "openai/gpt-5.5",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      if (response.status === 429) {
        throw new Error("AI is busy right now (rate limit). Please try again in a moment.");
      }
      if (response.status === 402) {
        throw new Error("AI credits exhausted for this workspace. Please add credits to continue.");
      }
      throw new Error(`AI request failed (${response.status}): ${text.slice(0, 200)}`);
    }

    const json = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const answer = json.choices?.[0]?.message?.content ?? "";
    if (!answer) throw new Error("AI returned an empty response.");
    return { answer };
  });
