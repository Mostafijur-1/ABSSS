export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] w-full items-center justify-center bg-slate-50"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-200 border-t-primary-700" aria-hidden="true"></div>
        <p className="text-sm font-bold text-primary-900">Loading ABSSS…</p>
      </div>
    </div>
  );
}
