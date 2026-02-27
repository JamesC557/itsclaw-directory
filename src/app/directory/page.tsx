import ToolDirectoryClient from '@/components/ToolDirectoryClient';
import { getAllTools } from '@/lib/tools';

export const metadata = {
  title: 'Directory — itsclaw',
};

export default async function DirectoryPage() {
  const tools = await getAllTools();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-bold">Directory</h1>
      <p className="mt-2 text-white/70">
        Curated tools, skills, and plugins built around OpenClaw.
      </p>

      <div className="mt-8">
        <ToolDirectoryClient tools={tools} />
      </div>
    </main>
  );
}
