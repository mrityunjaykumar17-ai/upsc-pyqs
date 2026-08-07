import { useState } from "react";
import { AnswerMarkdown } from "./AnswerMarkdown";
import { useServerFn } from "@tanstack/react-start";
import { getModelAnswer } from "../lib/model-answer.functions";
import { CustomizeAnswer } from "./CustomizeAnswer";

type Props = {
  id: string;
  question: string;
  marks?: number;
  words?: number;
  paper?: string;
  subject?: string;
};

export function AskAI(props: Props) {
  const fetchAnswer = useServerFn(getModelAnswer);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState<string>("");
  const [keywords, setKeywords] = useState<string[] | null>(null);
  const [error, setError] = useState("");
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const run = async () => {
    setState("loading");
    setError("");
    setAnswer("");
    try {
      const res = await fetchAnswer({ data: props });
      setAnswer(res.answer);
      setSource(res.source ?? "");
      setKeywords(res.keywords ?? null);
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
            <span>📖</span> Answer
          </button>
          <button
            onClick={() => setCustomizeOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-background px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
          >
            <span>✨</span> Ask AI
          </button>
        </div>
      )}

      {state === "loading" && (
        <div className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-xs text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Loading model answer…
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
              📖 Model Answer{source === "ai" ? " (AI)" : ""}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCustomizeOpen(true)}
                className="text-xs text-primary hover:underline"
              >
                Ask AI
              </button>
              <button
                onClick={run}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Reload
              </button>
            </div>
          </div>
          <AnswerMarkdown keywords={keywords}>{answer}</AnswerMarkdown>
          <p className="mt-3 text-[10px] italic text-muted-foreground">
            Curated from topper copies & model answer compilations. Verify facts before use.
          </p>
        </div>
      )}

      {customizeOpen && (
        <CustomizeAnswer
          id={props.id}
          question={props.question}
          marks={props.marks}
          words={props.words}
          paper={props.paper}
          subject={props.subject}
          previousAnswer={answer || undefined}
          onClose={() => setCustomizeOpen(false)}
        />
      )}
    </div>
  );
}
