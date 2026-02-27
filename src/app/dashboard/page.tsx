import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { getMyApps } from '@/lib/db/apps';

export const metadata = {
  title: 'Dashboard — itsclaw',
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user?.email) redirect('/login');

  const apps = await getMyApps(session.user.email);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="mt-2 text-sm text-white/70">Signed in as {session.user.email}</div>
        </div>
        <a
          href="/api/auth/signout"
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold"
        >
          Sign out
        </a>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold">My apps</h2>
        <Link href="/dashboard/apps/new" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
          + Add app
        </Link>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {apps.map((a) => (
          <Link
            key={a._id}
            href={`/dashboard/apps/${a._id}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
          >
            <div className="text-lg font-semibold">{a.name || 'Untitled app'}</div>
            <div className="mt-1 text-sm text-white/70">{a.one_liner || 'Add a short description'}</div>
            <div className="mt-2 text-xs text-white/50">{a.website}</div>
          </Link>
        ))}
      </div>

      {!apps.length ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          No apps yet. Create your first app — it will appear in the public directory automatically once required fields are filled.
        </div>
      ) : null}
    </main>
  );
}
