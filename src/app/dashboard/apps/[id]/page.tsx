import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { getAppByIdForUser, updateApp } from '@/lib/db/apps';

export default async function EditAppPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session?.user?.email) redirect('/login');

  const app = await getAppByIdForUser(id, session.user.email);
  if (!app) redirect('/dashboard');

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <a href="/dashboard" className="text-sm text-white/70 hover:text-white">
          ← Dashboard
        </a>
      </div>

      <h1 className="text-2xl font-bold">Edit app</h1>
      <p className="mt-2 text-sm text-white/70">
        When required fields are filled, your app will be visible publicly automatically.
      </p>

      <form
        className="mt-8 space-y-4"
        action={async (formData) => {
          'use server';
          await updateApp(id, session.user!.email!, {
            name: String(formData.get('name') || ''),
            website: String(formData.get('website') || ''),
            one_liner: String(formData.get('one_liner') || ''),
            pain: String(formData.get('pain') || ''),
            description: String(formData.get('description') || ''),
            x_handle: String(formData.get('x_handle') || ''),
            category: String(formData.get('category') || ''),
          });
        }}
      >
        <div>
          <div className="mb-1 text-xs text-white/60">Website link</div>
          <input
            name="website"
            defaultValue={app.website}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            placeholder="https://yourapp.com"
          />
        </div>

        <div>
          <div className="mb-1 text-xs text-white/60">Product name</div>
          <input
            name="name"
            defaultValue={app.name}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            placeholder="MyApp"
          />
        </div>

        <div>
          <div className="mb-1 text-xs text-white/60">One-liner</div>
          <input
            name="one_liner"
            defaultValue={app.one_liner}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            placeholder="One sentence about what your app does"
          />
        </div>

        <div>
          <div className="mb-1 text-xs text-white/60">What pain does it solve?</div>
          <textarea
            name="pain"
            defaultValue={app.pain}
            className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          />
        </div>

        <div>
          <div className="mb-1 text-xs text-white/60">Product description</div>
          <textarea
            name="description"
            defaultValue={app.description}
            className="h-32 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="mb-1 text-xs text-white/60">Category</div>
            <input
              name="category"
              defaultValue={app.category}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              placeholder="Hosting"
            />
          </div>
          <div>
            <div className="mb-1 text-xs text-white/60">X handle</div>
            <input
              name="x_handle"
              defaultValue={app.x_handle}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              placeholder="@yourhandle"
            />
          </div>
        </div>

        <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black" type="submit">
          Save
        </button>
      </form>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        Public status: <b>{app.is_public ? 'Visible' : 'Hidden (fill required fields)'}</b>
      </div>
    </main>
  );
}
