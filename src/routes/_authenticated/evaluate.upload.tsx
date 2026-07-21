import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { createEvaluation, processEvaluation } from "@/lib/evaluations.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/_authenticated/evaluate/upload")({
  component: UploadPage,
});

const ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";

function UploadPage() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);
  const createFn = useServerFn(createEvaluation);
  const processFn = useServerFn(processEvaluation);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter((f) => ACCEPT.split(",").includes(f.type));
    setFiles((prev) => [...prev, ...dropped]);
  }

  async function handleSubmit() {
    if (!files.length) return;
    setBusy(true); setErr(null); setProgress("Uploading files…");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not signed in");
      const paths: string[] = [];
      let i = 0;
      for (const f of files) {
        i++;
        const ext = f.name.split(".").pop() || "bin";
        const path = `${user.id}/${crypto.randomUUID()}/page-${i}.${ext}`;
        const { error } = await supabase.storage.from("answer-uploads").upload(path, f, { contentType: f.type });
        if (error) throw new Error(error.message);
        paths.push(path);
      }
      setProgress("Creating evaluation…");
      const { id } = await createFn({ data: { filePaths: paths } });
      setProgress("Running OCR and evaluation (this can take 30-90 seconds)…");
      await processFn({ data: { id } });
      navigate({ to: "/evaluate/$id", params: { id } });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Upload answer sheet</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          PDF, JPG, PNG or WebP. Multi-page supported. Include the question at the top of the first page for best matching.
        </p>

        <label
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card px-6 py-14 text-center hover:border-primary/50"
        >
          <div className="text-lg font-semibold">Drag & drop files here</div>
          <div className="mt-1 text-sm text-muted-foreground">or click to browse</div>
          <input
            type="file"
            accept={ACCEPT}
            multiple
            className="hidden"
            onChange={(e) => setFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])])}
          />
        </label>

        {files.length > 0 && (
          <ul className="mt-6 space-y-2">
            {files.map((f, idx) => (
              <li key={idx} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm">
                <span className="truncate">{f.name}</span>
                <button
                  onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}
                  disabled={busy}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex items-center gap-3">
          <button
            disabled={!files.length || busy}
            onClick={handleSubmit}
            className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {busy ? "Processing…" : "Evaluate my answer"}
          </button>
          {progress && <span className="text-sm text-muted-foreground">{progress}</span>}
        </div>
        {err && <p className="mt-4 text-sm text-destructive">{err}</p>}
      </main>
    </div>
  );
}
