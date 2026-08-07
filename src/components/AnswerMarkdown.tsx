import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { splitAnswer } from "@/lib/answer-keywords";

/**
 * Shared renderer for UPSC model answers. Adds GFM support (tables,
 * strikethrough, task lists) on top of the `.upsc-answer` typography, and
 * always surfaces exam-ready keywords beneath the answer.
 *
 * `keywords` overrides the auto-derived list (admins can curate them per answer).
 */
export function AnswerMarkdown({
  children,
  keywords: curated,
}: {
  children: string;
  keywords?: string[] | null;
}) {
  const { body, keywords: derived } = splitAnswer(children);
  const keywords = curated?.length ? curated : derived;
  return (
    <div>
      <div className="upsc-answer text-sm leading-relaxed text-foreground">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
      {keywords.length > 0 && (
        <div className="mt-4 rounded-lg border border-border bg-secondary/40 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Keywords
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {keywords.map((k) => (
              <span
                key={k}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
