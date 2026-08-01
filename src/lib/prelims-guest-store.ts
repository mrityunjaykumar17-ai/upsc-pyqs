/**
 * Guest (signed-out) prelims progress, kept in the browser only.
 * Signed-in users always use the database-backed attempt tables instead.
 */
export type GuestDraft = {
  startedAt: string;
  states: Record<string, { selected: "a" | "b" | "c" | "d" | null; flagged: boolean; visited: boolean }>;
};

export const GUEST_RESULT_KEY = "prelims_guest_result";

export function guestDraftKey(mode: "year" | "subject", year?: number, subject?: string) {
  return `prelims_guest_draft:${mode}:${mode === "year" ? (year ?? "") : (subject ?? "")}`;
}

export function loadGuestDraft(key: string): GuestDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GuestDraft;
    if (!parsed?.startedAt) return null;
    return { startedAt: parsed.startedAt, states: parsed.states ?? {} };
  } catch {
    return null;
  }
}

export function saveGuestDraft(key: string, draft: GuestDraft) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(draft));
  } catch {
    /* storage full or unavailable — practice still works in-memory */
  }
}

export function clearGuestDraft(key: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}
