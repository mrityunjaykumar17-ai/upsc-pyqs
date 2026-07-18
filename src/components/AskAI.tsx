import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useServerFn } from "@tanstack/react-start";
import { askAI } from "../lib/ask-ai.functions";
import { CustomizeAnswer } from "./CustomizeAnswer";

type Props = {
  question: string;
  marks?: number;
  words?: number;
  paper?: string;
  subject?: string;
};

export function AskAI(props: Props) {
  const ask = useServerFn(askAI);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const run = async () => {
    setState("loading");
    setError("");
    setAnswer("");
    try {
      const res = await ask({ data: props });
      setAnswer(res.answer);
      setState("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setState("error");
    }
  };

  return (
    <div className="mt-4">
      {state === "idle" && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={run}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <span>✨</span> Ask AI
          </button>
          <button
            onClick={() => setCustomizeOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-background px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
          >
            <span>⚙</span> Customize
          </button>
        </div>
      )}

      {state === "loading" && (
        <div className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-xs text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Generating UPSC-format answer…
        </div>
      )}

      {state === "error" && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
          {error}
          <button onClick={run} className="ml-2 underline">
            Retry
          </button>
        </div>
      )}

      {state === "done" && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              ✨ AI Model Answer
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCustomizeOpen(true)}
                className="text-xs text-primary hover:underline"
              >
                Customize
              </button>
              <button
                onClick={run}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Regenerate
              </button>
            </div>
          </div>
          <div className="upsc-answer text-sm leading-relaxed text-foreground">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
          <p className="mt-3 text-[10px] italic text-muted-foreground">
            AI-generated. Verify facts before use in your actual answers.
          </p>
        </div>
      )}

      {customizeOpen && (
        <CustomizeAnswer
          {...props}
          previousAnswer={answer || undefined}
          onClose={() => setCustomizeOpen(false)}
        />
      )}
    </div>
  );
}
