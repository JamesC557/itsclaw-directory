import SponsorSidebar from '@/components/SponsorSidebar';
import Link from 'next/link';
import { getPublicApps } from '@/lib/db/apps';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Apps — itsclaw',
};

function formatMoney(v: number, currency?: string) {
  const c = currency ?? '$';
  if (v >= 1000) {
    const k = Math.round((v / 1000) * 10) / 10;
    return `${c}${k}k`;
  }
  return `${c}${v}`;
}

export default async function AppsPage() {
  const apps = await getPublicApps();

  // Sponsor sidebar expects Tool shape; we keep it minimal by mapping.
  const sponsorTools = apps.map((a) => ({
    slug: a.id,
    name: a.name,
    one_liner: a.one_liner,
    sponsor: a.sponsor,
    links: { website: a.website },
  })) as any;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Apps around OpenClaw</h1>
              <p className="mt-2 text-white/70">
                A curated directory of applications, services, and products built around OpenClaw.
              </p>
            </div>
            <Link
              href="/submit"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              Submit
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {apps.map((a) => (
              <a
                key={a.id}
                href={a.website}
                target="_blank"
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold">{a.name}</div>
                    <div className="mt-1 text-sm text-white/70">{a.one_liner}</div>
                  </div>
                </div>

                {a.metrics ? (
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div className="rounded-lg border border-white/10 bg-black/20 p-2">
                      <div className="text-white/60">Revenue (30d)</div>
                      <div className="mt-1 font-semibold">
                        {a.metrics.revenue_30d != null
                          ? formatMoney(a.metrics.revenue_30d, a.metrics.currency)
                          : '—'}
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-black/20 p-2">
                      <div className="text-white/60">MRR</div>
                      <div className="mt-1 font-semibold">
                        {a.metrics.mrr != null ? formatMoney(a.metrics.mrr, a.metrics.currency) : '—'}
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-black/20 p-2">
                      <div className="text-white/60">Total</div>
                      <div className="mt-1 font-semibold">
                        {a.metrics.total != null ? formatMoney(a.metrics.total, a.metrics.currency) : '—'}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  {a.category ? (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
                      {a.category}
                    </span>
                  ) : null}
                  {a.x_handle ? (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
                      {a.x_handle}
                    </span>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="w-full shrink-0 lg:w-80">
          <SponsorSidebar tools={sponsorTools} />
        </div>
      </div>
    </main>
  );
}
