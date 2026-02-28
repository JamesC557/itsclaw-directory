import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
import { getPublicApps } from '@/lib/db/apps';

export async function generateStaticParams() {
  return [];
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const apps = await getPublicApps();
  const app = apps.find((a) => a.id === slug);
  if (!app) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <a href="/apps" className="text-sm text-white/70 hover:text-white">
        ← Apps
      </a>
      <h1 className="mt-6 text-3xl font-bold">{app.name}</h1>
      <p className="mt-2 text-white/70">{app.one_liner}</p>
      {app.description ? <p className="mt-4 whitespace-pre-line text-white/70">{app.description}</p> : null}
      <div className="mt-6">
        <a className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black" href={app.website} target="_blank">
          Visit website
        </a>
      </div>
    </main>
  );
}
