import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export type AppDoc = {
  _id: string;
  owner_email: string;
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
  featured_rank?: number;
  sponsor?: { tier: string; label?: string; href?: string };
  metrics?: {
    revenue_30d?: number;
    mrr?: number;
    total?: number;
    currency?: string;
  };
};

function toPublic(a: any): AppDoc {
  return {
    _id: String(a._id),
    owner_email: a.owner_email,
    name: a.name ?? '',
    website: a.website ?? '',
    one_liner: a.one_liner ?? '',
    pain: a.pain ?? '',
    description: a.description ?? '',
    x_handle: a.x_handle ?? '',
    category: a.category ?? '',
    created_at: a.created_at ?? new Date(),
    updated_at: a.updated_at ?? new Date(),
    is_public: Boolean(a.is_public),
    featured_rank: a.featured_rank,
    sponsor: a.sponsor,
    metrics: a.metrics,
  };
}

function shouldBePublic(app: any): boolean {
  const required = [app.name, app.website, app.one_liner, app.pain, app.x_handle];
  return required.every((v) => (v ?? '').trim().length > 0);
}

export async function createApp(owner_email: string) {
  if (!clientPromise) throw new Error('DB not configured');
  const client = await clientPromise;
  const db = client.db();
  const now = new Date();

  const doc = {
    owner_email,
    name: '',
    website: '',
    one_liner: '',
    pain: '',
    description: '',
    x_handle: '',
    category: 'Hosting',
    created_at: now,
    updated_at: now,
    is_public: false,
  };

  const res = await db.collection('apps').insertOne(doc);
  return { _id: String(res.insertedId) };
}

export async function getMyApps(owner_email: string): Promise<AppDoc[]> {
  if (!clientPromise) return [];
  const client = await clientPromise;
  const db = client.db();
  const rows = await db
    .collection('apps')
    .find({ owner_email })
    .sort({ updated_at: -1 })
    .limit(100)
    .toArray();

  return rows.map(toPublic);
}

export async function getAppByIdForUser(id: string, owner_email: string): Promise<AppDoc | null> {
  if (!clientPromise) return null;
  const client = await clientPromise;
  const db = client.db();
  const row = await db.collection('apps').findOne({ _id: new ObjectId(id), owner_email });
  return row ? toPublic(row) : null;
}

export async function updateApp(id: string, owner_email: string, patch: Partial<AppDoc>) {
  if (!clientPromise) throw new Error('DB not configured');
  const client = await clientPromise;
  const db = client.db();
  const now = new Date();

  const next = {
    ...patch,
    updated_at: now,
  };

  // Determine visibility automatically.
  const row = await db.collection('apps').findOne({ _id: new ObjectId(id), owner_email });
  const merged = { ...(row ?? {}), ...next };
  (next as any).is_public = shouldBePublic(merged);

  await db.collection('apps').updateOne({ _id: new ObjectId(id), owner_email }, { $set: next });
}

export async function getPublicApps(): Promise<AppDoc[]> {
  if (!clientPromise) return [];
  const client = await clientPromise;
  const db = client.db();
  const rows = await db
    .collection('apps')
    .find({ is_public: true })
    .sort({ featured_rank: -1, updated_at: -1 })
    .limit(500)
    .toArray();
  return rows.map(toPublic);
}
