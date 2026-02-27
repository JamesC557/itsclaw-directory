import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import LoginForm from './ui';

export const metadata = {
  title: 'Login — itsclaw',
};

export default async function LoginPage() {
  const session = await getSession();
  if (session?.user) redirect('/dashboard');

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">Log in</h1>
      <p className="mt-2 text-white/70">We’ll email you a magic link. No password.</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </main>
  );
}
