'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Tool } from '@/lib/tools';

function uniq(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export default function ToolDirectoryClient({ tools }: { tools: Tool[] }) {
  const [q, setQ] = useState('');
  const [type, setType] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sort, setSort] = useState<string>('featured');

  const allTypes = useMemo(() => uniq(tools.map((t) => t.type)), [tools]);
  const allStatuses = useMemo(() => uniq(tools.map((t) => t.status)), [tools]);
  const allCategories = useMemo(
    () => uniq(tools.flatMap((t) => t.categories ?? [])),
    [tools]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();

    const rows = tools.filter((t) => {
      if (type && t.type !== type) return false;
      if (status && t.status !== status) return false;
      if (category && !(t.categories ?? []).includes(category)) return false;
      if (!needle) return true;

      const hay = [
        t.name,
        t.one_liner,
        t.description ?? '',
        t.slug,
        ...(t.tags ?? []),
        ...(t.categories ?? []),
      ]
        .join(' ')
        .toLowerCase();

      return hay.includes(needle);
    });

    const byName = (a: Tool, b: Tool) => a.name.localeCompare(b.name);
    const byLastVerified = (a: Tool, b: Tool) =>
      String(b.last_verified ?? '').localeCompare(String(a.last_verified ?? ''));

    if (sort === 'new') return [...rows].sort(byLastVerified);
    if (sort === 'name') return [...rows].sort(byName);

    // featured (default)
    return [...rows].sort((a, b) => {
      const fa = a.featured ? 1 : 0;
      const fb = b.featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return byName(a, b);
    });
  }, [tools, q, type, status, category, sort]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-5">
        <input
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
          placeholder="Search tools, tags, categories…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All types</option>
          {allTypes.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          {allStatuses.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {allCategories.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="featured">Sort: Featured</option>
          <option value="new">Sort: New</option>
          <option value="name">Sort: Name</option>
        </select>
      </div>

      <div className="text-sm text-white/70">{filtered.length} tools</div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{t.name}</div>
                <div className="mt-1 text-sm text-white/70">{t.one_liner}</div>
              </div>
              <div className="shrink-0 rounded-full border border-white/10 bg-black/20 px-2 py-1 text-xs text-white/80">
                {t.type} · {t.status}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {(t.tags ?? []).slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
