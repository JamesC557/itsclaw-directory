import { prisma } from '@/lib/prisma';

function requireDb() {
  if (!prisma) throw new Error('DB not configured');
  return prisma;
}

export type AppDoc = {
  id: string;
  ownerId: string;
  name: string;
  website: string;
  one_liner: string;
  pain: string;
  description: string;
  x_handle: string;
  category: string;
  created_at: Date;
  updated_at: Date;
  is_public: boolean;
  featured_rank?: number | null;
  sponsor?: { tier: string; label?: string; href?: string } | null;
  metrics?: {
    revenue_30d?: number;
    mrr?: number;
    total?: number;
    currency?: string;
  };
};

function toDoc(a: any): AppDoc {
  return {
    id: a.id,
    ownerId: a.ownerId,
    name: a.name,
    website: a.website,
    one_liner: a.oneLiner,
    pain: a.pain,
    description: a.description,
    x_handle: a.xHandle,
    category: a.category,
    created_at: a.createdAt,
    updated_at: a.updatedAt,
    is_public: a.isPublic,
    featured_rank: a.featuredRank,
    sponsor: a.sponsorTier
      ? { tier: a.sponsorTier, label: a.sponsorLabel ?? undefined, href: a.sponsorHref ?? undefined }
      : null,
    metrics: undefined,
  };
}

function shouldBePublic(app: Partial<AppDoc>): boolean {
  const required = [app.name, app.website, app.one_liner, app.pain, app.x_handle];
  return required.every((v) => (v ?? '').trim().length > 0);
}

export async function createApp(ownerId: string) {
  const db = requireDb();
  const row = await db.app.create({
    data: {
      ownerId,
      name: '',
      website: '',
      oneLiner: '',
      pain: '',
      description: '',
      xHandle: '',
      category: 'Hosting',
      isPublic: false,
    },
    select: { id: true },
  });
  return { id: row.id };
}

export async function getMyApps(ownerId: string): Promise<AppDoc[]> {
  if (!prisma) return [];
  try {
    const rows = await prisma.app.findMany({
      where: { ownerId },
      orderBy: { updatedAt: 'desc' },
      take: 100,
    });
    return rows.map(toDoc);
  } catch {
    return [];
  }
}

export async function getAppByIdForUser(id: string, ownerId: string): Promise<AppDoc | null> {
  if (!prisma) return null;
  try {
    const row = await prisma.app.findFirst({ where: { id, ownerId } });
    return row ? toDoc(row) : null;
  } catch {
    return null;
  }
}

export async function updateApp(id: string, ownerId: string, patch: Partial<AppDoc>) {
  if (!prisma) throw new Error('DB not configured');

  const current = await prisma.app.findFirst({ where: { id, ownerId } });
  if (!current) return;

  const merged: AppDoc = {
    ...toDoc(current),
    ...patch,
    id,
    ownerId,
  };

  const isPublic = shouldBePublic(merged);

  await prisma.app.update({
    where: { id },
    data: {
      name: patch.name ?? undefined,
      website: patch.website ?? undefined,
      oneLiner: patch.one_liner ?? undefined,
      pain: patch.pain ?? undefined,
      description: patch.description ?? undefined,
      xHandle: patch.x_handle ?? undefined,
      category: patch.category ?? undefined,
      isPublic,
    },
  });
}

export async function getPublicApps(): Promise<AppDoc[]> {
  if (!prisma) return [];
  try {
    const rows = await prisma.app.findMany({
      where: { isPublic: true },
      orderBy: [{ featuredRank: 'desc' }, { updatedAt: 'desc' }],
      take: 500,
    });
    return rows.map(toDoc);
  } catch {
    return [];
  }
}
