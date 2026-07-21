import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listEvaluations, deleteEvaluation } from "@/lib/evaluations.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/evaluate/history")({
  component: History,
});

function History() {
  const listFn = useServerFn(listEvaluations);
  const delFn = useServerFn(deleteEvaluation);
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({ queryKey: ["evaluations"], queryFn: () => listFn() });
  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["evaluations"] }),
  });

  const rows = (data ?? []).filter((r) =>
    !q || (r.detected_question?.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My evaluations</h1>
          <Link to="/evaluate/upload" className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            New evaluation
          </Link>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by question…"
          className="mt-6 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
        <div className="mt-6 space-y-2">
          {isLoading && <p className="text-muted-foreground">Loading…</p>}
          {!isLoading && rows.length === 0 && (
            <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
              No evaluations yet. Upload your first answer sheet.
            </div>
          )}
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <Link to="/evaluate/$id" params={{ id: r.id }} className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {new Date(r.created_at).toLocaleString()} · <span className="capitalize">{r.status}</span>
                </div>
                <div className="mt-1 truncate text-sm font-medium">
                  {r.detected_question || "(question not detected)"}
                </div>
                {r.marks_awarded != null && (
                  <div className="mt-1 text-sm text-primary">
                    {r.marks_awarded} / {r.marks_out_of}
                  </div>
                )}
              </Link>
              <button
                onClick={() => del.mutate(r.id)}
                disabled={del.isPending}
                className="ml-4 text-xs text-muted-foreground hover:text-destructive"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
