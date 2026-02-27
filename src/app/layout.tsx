import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'itsclaw — OpenClaw ecosystem directory',
  description: 'Directory of tools, skills, and plugins built around OpenClaw.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-white antialiased">
        <header className="border-b border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold tracking-tight">
              itsclaw
            </Link>
            <nav className="flex items-center gap-4 text-sm text-white/80">
              <Link className="hover:text-white" href="/apps">
                Apps
              </Link>
              <Link className="hover:text-white" href="/dashboard">
                Dashboard
              </Link>
              <Link className="hover:text-white" href="/submit">
                Submit
              </Link>
              <Link className="hover:text-white" href="/about">
                About
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-16 border-t border-white/10 py-10">
          <div className="mx-auto max-w-5xl px-6 text-sm text-white/60">
            © {new Date().getFullYear()} itsclaw — community directory.
          </div>
        </footer>
      </body>
    </html>
  );
}
