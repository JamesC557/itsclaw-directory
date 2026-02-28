import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const isConfigured = Boolean(process.env.DATABASE_URL && process.env.RESEND_API_KEY);

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('Missing RESEND_API_KEY');
  return new Resend(key);
}

export const authOptions: NextAuthOptions = isConfigured
  ? {
      adapter: PrismaAdapter(prisma as any),
      pages: {
        signIn: '/login',
      },
      providers: [
        EmailProvider({
          from: process.env.RESEND_FROM || 'hello@resend.itsclaw.com',
          maxAge: 10 * 60,
          async sendVerificationRequest({ identifier, url, provider }) {
            const resend = getResend();
            const from = provider.from || (process.env.RESEND_FROM || 'hello@resend.itsclaw.com');

            await resend.emails.send({
              from,
              to: identifier,
              subject: 'Your sign-in link',
              html: `
                <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5;">
                  <h2>Sign in</h2>
                  <p>Click to sign in:</p>
                  <p><a href="${url}">${url}</a></p>
                  <p style="color:#666;font-size:12px">If you didn’t request this email, you can ignore it.</p>
                </div>
              `,
            });
          },
        }),
      ],
      callbacks: {
        async session({ session, user }) {
          if (session.user) (session.user as any).id = (user as any).id;
          return session;
        },
      },
    }
  : {
      pages: {
        signIn: '/login',
      },
      providers: [],
    };
