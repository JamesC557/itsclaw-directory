import SubmitAppForm from '@/components/SubmitAppForm';

export const metadata = {
  title: 'Submit — itsclaw',
};

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-bold">Submit an app</h1>
      <p className="mt-2 text-white/70">
        Add your OpenClaw-based app/service to the directory.
      </p>

      <div className="mt-8">
        <SubmitAppForm />
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
        <div className="font-semibold">Want paid placement?</div>
        <div className="mt-1 text-white/70">
          Contact: <span className="font-mono">@volosatov_dmitrii</span>
        </div>
      </div>
    </main>
  );
}
