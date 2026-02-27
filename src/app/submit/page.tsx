export const metadata = {
  title: 'Submit — itsclaw',
};

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Submit a tool</h1>
      <p className="mt-2 text-white/70">
        For now, submissions are via GitHub PR. Later we can add a form.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">How to add</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-white/80">
          <li>Fork the repo.</li>
          <li>Add a YAML file to <code className="rounded bg-white/10 px-1">content/apps</code> (use <code className="rounded bg-white/10 px-1">content/templates/tool.yml</code> as a base).</li>
          <li>Open a PR with a short description + screenshots if possible.</li>
        </ol>

        <h3 className="mt-6 text-sm font-semibold text-white/80">YAML template</h3>
        <pre className="mt-2 overflow-auto rounded-xl bg-black/40 p-4 text-xs text-white/80">
{`name: "My Tool"
slug: my-tool
one_liner: "One sentence about what it does"
description: |
  Longer description. Can be multi-line.
featured: false

type: tool # skill|plugin|tool|template|example
categories: [Automation]
tags: [openclaw]
status: beta # active|beta|experimental|abandoned
links:
  repo: https://github.com/user/repo
  docs: https://...
install:
  - "npm i -g ..."
compatibility:
  notes: "Any important constraints"
author: "Your name"
license: MIT
last_verified: 2026-02-27
`}
        </pre>
      </div>
    </main>
  );
}
