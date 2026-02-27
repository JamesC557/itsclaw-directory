export const metadata = {
  title: 'About — itsclaw',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-2 text-white/70">
        itsclaw is a community directory for tools built around OpenClaw.
      </p>

      <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
        <div>
          <div className="font-semibold">Curation rules (prototype)</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-white/80">
            <li>Must have a repo link and a minimal README.</li>
            <li>Should specify license and status.</li>
            <li>Entries may be marked abandoned if unmaintained.</li>
          </ul>
        </div>

        <div className="text-sm text-white/70">
          Disclaimer: this is not an official OpenClaw registry (unless we decide it is).
        </div>
      </div>
    </main>
  );
}
