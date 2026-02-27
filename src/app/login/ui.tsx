'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await signIn('email', {
        email,
        callbackUrl: '/dashboard',
        redirect: false,
      });
      if (res?.error) {
        setStatus('error');
      } else {
        setStatus('sent');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
        placeholder="you@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
      />
      <button
        className="w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
        disabled={status === 'loading'}
        type="submit"
      >
        {status === 'loading' ? 'Sending…' : 'Send magic link'}
      </button>
      {status === 'sent' ? (
        <div className="text-sm text-white/70">Check your email for the sign-in link.</div>
      ) : null}
      {status === 'error' ? (
        <div className="text-sm text-red-300">Could not send the link. Try again.</div>
      ) : null}
    </form>
  );
}
