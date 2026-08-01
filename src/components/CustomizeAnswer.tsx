import { useEffect, useRef, useState } from "react";
import { AnswerMarkdown } from "./AnswerMarkdown";
import { useServerFn } from "@tanstack/react-start";
import { customizeAI } from "../lib/customize-ai.functions";

type Props = {
  id?: string;
  question: string;
  marks?: number;
  words?: number;
  paper?: string;
  subject?: string;
  previousAnswer?: string;
  onClose: () => void;
};

type Turn = { role: "user" | "assistant"; content: string; label?: string };

const CHIPS = [
  "More Indian Examples",
  "Add Data",
  "Add Case Studies",
  "Add Current Affairs",
  "Add Government Schemes",
  "Add Quotes",
  "Better Introduction",
  "Better Conclusion",
  "Balanced Analysis",
];

const WORD_PRESETS = [150, 250];

export function CustomizeAnswer(props: Props) {
  const customize = useServerFn(customizeAI);
  const [wordCount, setWordCount] = useState<number | undefined>(
    props.words ?? (props.marks && props.marks >= 15 ? 250 : 150),
  );
  const [customWord, setCustomWord] = useState<string>("");
  const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, status]);

  const toggleChip = (c: string) => {
    setSelectedChips((prev) => {
      const n = new Set(prev);
      if (n.has(c)) n.delete(c);
      else n.add(c);
      return n;
    });
  };

  const send = async () => {
    if (status === "sending") return;
    const chips = Array.from(selectedChips);
    const trimmed = input.trim();
    if (!chips.length && !trimmed && !wordCount && turns.length === 0) {
      setError("Choose a word count, chips, or write an instruction.");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("sending");

    const label = [
      wordCount ? `${wordCount} words` : null,
      ...chips,
      trimmed || null,
    ]
      .filter(Boolean)
      .join(" · ");

    const historyForServer = turns.map((t) => ({ role: t.role, content: t.content }));
    const nextTurns: Turn[] = [
      ...turns,
      { role: "user" as const, content: trimmed || "(applied preset options)", label },
    ];
    setTurns(nextTurns);
    setInput("");

    try {
      const res = await customize({
        data: {
          id: props.id,
          question: props.question,
          marks: props.marks,
          words: props.words,
          paper: props.paper,
          subject: props.subject,
          previousAnswer: turns.length ? undefined : props.previousAnswer,
          wordCount,
          chips,
          userMessage: trimmed,
          history: historyForServer,
        },
      });
      setTurns((t) => [...t, { role: "assistant", content: res.answer }]);
      setSelectedChips(new Set());
      setStatus("idle");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
      // Roll back the optimistic user turn so retry is clean.
      setTurns(turns);
      setInput(trimmed);
    }
  };

  const activeWord = customWord ? Number(customWord) || undefined : wordCount;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
      <div className="flex h-full w-full max-w-3xl flex-col rounded-t-2xl bg-background shadow-2xl sm:h-[90vh] sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border p-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              ⚙ Customize AI Answer
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{props.question}</p>
          </div>
          <button
            onClick={props.onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Transcript */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {turns.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
              Choose a word count, tap quick chips, or type a custom instruction below.
              Examples: "Write in 250 words", "Add 5 case studies I can use",
              "Give me a quote-based conclusion".
            </div>
          )}
          {turns.map((t, i) =>
            t.role === "user" ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
                  {t.label ?? t.content}
                </div>
              </div>
            ) : (
              <div key={i} className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  ✨ Customized answer
                </div>
                <AnswerMarkdown>{t.content}</AnswerMarkdown>
              </div>
            ),
          )}
          {status === "sending" && (
            <div className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              Rewriting answer…
            </div>
          )}
          {status === "error" && (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
              {error}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-3 border-t border-border bg-card/40 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Word count
            </span>
            {WORD_PRESETS.map((w) => (
              <button
                key={w}
                onClick={() => {
                  setWordCount(w);
                  setCustomWord("");
                }}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeWord === w && !customWord
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {w}
              </button>
            ))}
            <input
              type="number"
              min={50}
              max={800}
              value={customWord}
              onChange={(e) => {
                setCustomWord(e.target.value);
                setWordCount(undefined);
              }}
              placeholder="Custom"
              className="w-20 rounded-full border border-border bg-background px-3 py-1 text-xs outline-none focus:border-primary/60"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => toggleChip(c)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  selectedChips.has(c)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={2}
              placeholder="Tell AI how you want to customize your answer…"
              className="flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={send}
              disabled={status === "sending"}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === "sending" ? "…" : turns.length === 0 ? "Generate" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
