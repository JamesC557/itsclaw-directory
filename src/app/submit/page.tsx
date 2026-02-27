import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

export const metadata = {
  title: 'Submit — itsclaw',
};

export default async function SubmitPage() {
  const session = await getSession();
  if (!session?.user) redirect('/login');
  redirect('/dashboard/apps/new');
}
