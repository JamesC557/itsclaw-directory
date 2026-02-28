import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { createApp } from '@/lib/db/apps';

export default async function NewAppPage() {
  const session = await getSession();
  if (!session?.user?.id) redirect('/login');

  const app = await createApp(session.user.id);
  redirect(`/dashboard/apps/${app.id}`);
}
