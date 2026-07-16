export function SimilarityBadge({ score }: { score: number }) {
  let cls = "bg-gray-500/15 text-gray-600 dark:text-gray-300 ring-gray-500/30";
  if (score >= 95) cls = "bg-green-500/15 text-green-700 dark:text-green-300 ring-green-500/30";
  else if (score >= 90) cls = "bg-blue-500/15 text-blue-700 dark:text-blue-300 ring-blue-500/30";
  else if (score >= 80) cls = "bg-orange-500/15 text-orange-700 dark:text-orange-300 ring-orange-500/30";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${cls}`}
      title={`Similarity ${score}%`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {score}% match
    </span>
  );
}
