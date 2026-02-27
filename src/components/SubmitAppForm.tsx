'use client';

import { useMemo, useState } from 'react';

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function yamlEscape(value: string) {
  // For simple scalar values.
  const v = value.replace(/"/g, '\\"');
  return `"${v}"`;
}

export default function SubmitAppForm({
  repoOwner = 'JamesC557',
  repoName = 'itsclaw-directory',
}: {
  repoOwner?: string;
  repoName?: string;
}) {
  const [website, setWebsite] = useState('');
  const [name, setName] = useState('');
  const [oneLiner, setOneLiner] = useState('');
  const [pain, setPain] = useState('');
  const [details, setDetails] = useState('');
  const [xHandle, setXHandle] = useState('');
  const [category, setCategory] = useState('Hosting');

  const slug = useMemo(() => {
    if (name.trim()) return slugify(name);
    if (website.trim()) return slugify(website);
    return 'my-app';
  }, [name, website]);

  const yaml = useMemo(() => {
    const descBlocks: string[] = [];
    if (pain.trim()) descBlocks.push(`Pain it solves: ${pain.trim()}`);
    if (details.trim()) descBlocks.push(details.trim());

    const description = descBlocks.join('\n\n');

    return [
      `name: ${yamlEscape(name.trim() || 'My App')}`,
      `slug: ${slug}`,
      `one_liner: ${yamlEscape(oneLiner.trim() || 'Short description')}`,
      `description: |`,
      `  ${description ? description.replace(/\n/g, '\n  ') : 'Describe what your app does.'}`,
      `type: app`,
      `categories:`,
      `  - ${category}`,
      `tags: []`,
      `status: active`,
      `links:`,
      website.trim() ? `  website: ${website.trim()}` : `  website: https://example.com`,
      `x_handle: ${yamlEscape((xHandle.trim() || '@yourhandle').startsWith('@') ? (xHandle.trim() || '@yourhandle') : '@' + xHandle.trim())}`,
      `last_verified: ${new Date().toISOString().slice(0, 10)}`,
      '',
    ].join('\n');
  }, [name, slug, oneLiner, pain, details, website, xHandle, category]);

  const githubNewFileUrl = useMemo(() => {
    const path = `content/apps/${slug}.yml`;
    const base = `https://github.com/${repoOwner}/${repoName}/new/main/${encodeURIComponent('content/apps')}`;

    const params = new URLSearchParams();
    params.set('filename', `${slug}.yml`);
    params.set('value', yaml);

    return `${base}?${params.toString()}`;
  }, [repoOwner, repoName, slug, yaml]);

  async function copy() {
    await navigator.clipboard.writeText(yaml);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div>
          <div className="text-sm font-semibold">Submit your app</div>
          <div className="mt-1 text-sm text-white/70">
            Fill this form → we generate a ready-to-submit entry.
          </div>
        </div>

        <label className="block">
          <div className="mb-1 text-xs text-white/60">Website link</div>
          <input
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="https://yourapp.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>

        <label className="block">
          <div className="mb-1 text-xs text-white/60">Product name</div>
          <input
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="MyApp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block">
          <div className="mb-1 text-xs text-white/60">Short description (one-liner)</div>
          <input
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="One sentence about what your app does"
            value={oneLiner}
            onChange={(e) => setOneLiner(e.target.value)}
          />
        </label>

        <label className="block">
          <div className="mb-1 text-xs text-white/60">What pain does it solve?</div>
          <textarea
            className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="E.g. Setting up OpenClaw is hard for non-technical users…"
            value={pain}
            onChange={(e) => setPain(e.target.value)}
          />
        </label>

        <label className="block">
          <div className="mb-1 text-xs text-white/60">Product details</div>
          <textarea
            className="h-28 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Add 2–6 lines: who it’s for, key features, how it works…"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="block">
            <div className="mb-1 text-xs text-white/60">Category</div>
            <select
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {[
                'Hosting',
                'Setup',
                'Wrappers',
                'Agent Management',
                'Templates',
                'Education',
                'Vertical Solutions',
                'Integrations',
                'Utilities',
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <div className="mb-1 text-xs text-white/60">X handle</div>
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
              placeholder="@yourhandle"
              value={xHandle}
              onChange={(e) => setXHandle(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={copy}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
            type="button"
          >
            Copy YAML
          </button>
          <a
            href={githubNewFileUrl}
            target="_blank"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold"
          >
            Submit (opens GitHub)
          </a>
        </div>

        <div className="text-xs text-white/60">
          Submissions are reviewed before appearing in the directory.
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-white/60">Preview</div>
        <pre className="mt-3 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-xl bg-black/40 p-4 text-xs text-white/80">
{yaml}
        </pre>
      </div>
    </div>
  );
}
