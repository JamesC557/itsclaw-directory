import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getToolBySlug } from '@/lib/tools';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

function formatMoney(v: number, currency?: string) {
  const c = currency ?? '$';
  if (v >= 1000) {
    const k = Math.round((v / 1000) * 10) / 10;
    return `${c}${k}k`;
  }
  return `${c}${v}`;
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <Link href="/apps" className="text-sm text-white/70 hover:text-white">
          ← Apps
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="mt-2 text-white/70">{tool.one_liner}</p>
            {tool.description ? (
              <p className="mt-3 whitespace-pre-line text-sm text-white/70">{tool.description}</p>
            ) : null}
          </div>

          <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm text-white/80">
            {tool.status}
          </div>
        </div>

        {tool.metrics ? (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <div className="text-xs text-white/60">Revenue (30d)</div>
              <div className="mt-1 font-semibold">
                {tool.metrics.revenue_30d != null
                  ? formatMoney(tool.metrics.revenue_30d, tool.metrics.currency)
                  : '—'}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <div className="text-xs text-white/60">MRR</div>
              <div className="mt-1 font-semibold">
                {tool.metrics.mrr != null ? formatMoney(tool.metrics.mrr, tool.metrics.currency) : '—'}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <div className="text-xs text-white/60">Total</div>
              <div className="mt-1 font-semibold">
                {tool.metrics.total != null
                  ? formatMoney(tool.metrics.total, tool.metrics.currency)
                  : '—'}
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-white/80">Categories</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {(tool.categories ?? []).map((c) => (
                <span key={c} className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                  {c}
                </span>
              ))}
            </div>

            <h2 className="mt-5 text-sm font-semibold text-white/80">Tags</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {(tool.tags ?? []).map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white/80">Links</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {tool.links?.repo ? (
                <li>
                  <a className="text-white underline" href={tool.links.repo} target="_blank">
                    Website / Repo
                  </a>
                </li>
              ) : null}
              {tool.links?.docs ? (
                <li>
                  <a className="text-white underline" href={tool.links.docs} target="_blank">
                    Docs
                  </a>
                </li>
              ) : null}
              {tool.links?.demo ? (
                <li>
                  <a className="text-white underline" href={tool.links.demo} target="_blank">
                    Demo
                  </a>
                </li>
              ) : null}
            </ul>

            {tool.compatibility?.notes ? (
              <>
                <h2 className="mt-5 text-sm font-semibold text-white/80">Notes</h2>
                <p className="mt-2 text-sm text-white/70">{tool.compatibility.notes}</p>
              </>
            ) : null}

            {(tool.author || tool.license || tool.last_verified) && (
              <>
                <h2 className="mt-5 text-sm font-semibold text-white/80">Meta</h2>
                <div className="mt-2 text-sm text-white/70">
                  {tool.author ? <div>Author: {tool.author}</div> : null}
                  {tool.license ? <div>License: {tool.license}</div> : null}
                  {tool.last_verified ? <div>Last verified: {tool.last_verified}</div> : null}
                </div>
              </>
            )}
          </div>
        </div>

        {tool.install?.length ? (
          <>
            <h2 className="mt-7 text-sm font-semibold text-white/80">Install / Quickstart</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-white/80">
              {tool.install.map((line) => (
                <li key={line} className="font-mono text-[13px] text-white/80">
                  {line}
                </li>
              ))}
            </ol>
          </>
        ) : null}
      </div>
    </main>
  );
}
