import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-10">
        <div className="text-sm text-white/70">itsclaw.com</div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          OpenClaw ecosystem directory
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          A curated list of skills, plugins, and tools built on top of OpenClaw.
          Find what to install next — or submit your own.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/directory"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
          >
            Browse directory
          </Link>
          <Link
            href="/submit"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold"
          >
            Submit a tool
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">File-based catalog</div>
          <div className="mt-2 text-sm text-white/70">
            Tools are YAML files — easy PRs, easy review.
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Fast search & filters</div>
          <div className="mt-2 text-sm text-white/70">
            Type, status, categories, tags — all local, no backend.
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Community-first</div>
          <div className="mt-2 text-sm text-white/70">
            A clean place to discover and share OpenClaw add-ons.
          </div>
        </div>
      </div>
    </main>
  );
}
