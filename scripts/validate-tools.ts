import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import { ToolSchema } from '@/lib/tools';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'tools');

async function main() {
  const entries = await fs.readdir(CONTENT_DIR);
  const files = entries.filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'));

  const errors: string[] = [];

  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const raw = await fs.readFile(full, 'utf8');

    try {
      const parsed = yaml.load(raw);
      ToolSchema.parse(parsed);
    } catch (e: any) {
      errors.push(`${file}: ${e?.message ?? String(e)}`);
    }
  }

  if (errors.length) {
    console.error('Tool validation failed:\n');
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }

  console.log(`OK: validated ${files.length} tool files.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
