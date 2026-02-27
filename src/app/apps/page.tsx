import ToolDirectoryClient from '@/components/ToolDirectoryClient';
import SponsorSidebar from '@/components/SponsorSidebar';
import { getAllTools } from '@/lib/tools';

export const metadata = {
  title: 'Apps — itsclaw',
};

export default async function AppsPage() {
  const tools = await getAllTools();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold">Apps around OpenClaw</h1>
          <p className="mt-2 text-white/70">
            A curated directory of applications, services, and products built around OpenClaw.
          </p>

          <div className="mt-8">
            <ToolDirectoryClient tools={tools} />
          </div>
        </div>

        <div className="w-full shrink-0 lg:w-80">
          <SponsorSidebar tools={tools} />
        </div>
      </div>
    </main>
  );
}
