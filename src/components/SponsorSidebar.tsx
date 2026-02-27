import type { Tool } from '@/lib/tools';

export default function SponsorSidebar({ tools }: { tools: Tool[] }) {
  const sponsors = tools
    .filter((t) => t.sponsor)
    .sort((a, b) => String(a.sponsor?.tier ?? '').localeCompare(String(b.sponsor?.tier ?? '')));

  if (!sponsors.length) return null;

  return (
    <aside className="space-y-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-white/60">Sponsors</div>
      <div className="space-y-3">
        {sponsors.map((s) => (
          <a
            key={s.slug}
            href={s.sponsor?.href ?? s.links?.repo ?? '#'}
            target="_blank"
            className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">{s.name}</div>
              <div className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[11px] text-white/70">
                {s.sponsor?.label ?? s.sponsor?.tier}
              </div>
            </div>
            <div className="mt-1 text-sm text-white/70">{s.one_liner}</div>
          </a>
        ))}
      </div>
    </aside>
  );
}
