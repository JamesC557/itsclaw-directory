import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import { z } from 'zod';

export const ToolType = z.enum(['app']);
export const ToolStatus = z.enum(['active', 'beta', 'experimental', 'abandoned', 'for-sale']);

export const ToolSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  one_liner: z.string().min(1),
  description: z.string().optional(),
  type: ToolType,
  categories: z.array(z.string().min(1)).default([]),
  tags: z.array(z.string().min(1)).default([]),
  featured: z.boolean().optional(),
  badges: z.array(z.string().min(1)).default([]),
  status: ToolStatus,
  metrics: z
    .object({
      revenue_30d: z.number().nonnegative().optional(),
      mrr: z.number().nonnegative().optional(),
      total: z.number().nonnegative().optional(),
      currency: z.string().min(1).optional(),
    })
    .optional(),
  links: z
    .object({
      repo: z.string().url().optional(),
      docs: z.string().url().optional(),
      demo: z.string().url().optional(),
    })
    .default({}),
  install: z.array(z.string().min(1)).default([]),
  compatibility: z
    .object({
      notes: z.string().optional(),
      openclaw: z.string().optional(),
      node: z.string().optional(),
    })
    .default({}),
  author: z.string().min(1).optional(),
  license: z.string().min(1).optional(),
  last_verified: z.preprocess(
    (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
    z.string().min(1).optional()
  ),
});

export type Tool = z.infer<typeof ToolSchema>;

const CONTENT_DIR = path.join(process.cwd(), 'content', 'apps');

async function readYamlFile(filePath: string): Promise<unknown> {
  const raw = await fs.readFile(filePath, 'utf8');
  return yaml.load(raw);
}

export async function getAllTools(): Promise<Tool[]> {
  // Apps directory: we keep the function name for now to avoid churn in imports.

  let entries: string[] = [];
  try {
    entries = await fs.readdir(CONTENT_DIR);
  } catch {
    return [];
  }

  const files = entries.filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'));
  const tools: Tool[] = [];

  for (const f of files) {
    const full = path.join(CONTENT_DIR, f);
    const parsed = await readYamlFile(full);
    const tool = ToolSchema.parse(parsed);
    tools.push(tool);
  }

  tools.sort((a, b) => a.name.localeCompare(b.name));
  return tools;
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const tools = await getAllTools();
  return tools.find((t) => t.slug === slug) ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  const tools = await getAllTools();
  return tools.map((t) => t.slug);
}
