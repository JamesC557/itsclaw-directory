import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { createApp } from '@/lib/db/apps';

export default async function NewAppPage() {
  const session = await getSession();
  if (!session?.user?.email) redirect('/login');

  const app = await createApp(session.user.email);
  redirect(`/dashboard/apps/${app._id}`);
}
