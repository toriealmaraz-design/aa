-- Nexify — Supabase schema
-- Run in the Supabase SQL editor or via the CLI/MCP.
-- Mirrors the frontend's local store (src/lib/store.ts) so it can swap over cleanly.

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ───────────────────────── Networks (admin-editable badges) ─────────────────────────
create table if not exists public.networks (
  id          text primary key,              -- 'mtn', 'telecel', 'airteltigo'
  name        text not null,                 -- 'MTN'
  code        text not null,                 -- badge letters: 'M', 'T', 'AT'
  color       text not null default '#3b82f6',
  text_dark   boolean not null default false,
  active      boolean not null default true,
  sort        int not null default 0,
  updated_at  timestamptz not null default now()
);

-- ───────────────────────── Data bundles (wholesale + sell price) ─────────────────────────
create table if not exists public.bundles (
  id          uuid primary key default gen_random_uuid(),
  network_id  text not null references public.networks(id) on delete cascade,
  size        text not null,                 -- '5GB'
  validity    text not null default '30 days',
  wholesale   numeric(10,2) not null,
  price       numeric(10,2) not null,        -- default / suggested sell price
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ───────────────────────── Vendors (shops) ─────────────────────────
create table if not exists public.vendors (
  id              uuid primary key default gen_random_uuid(),
  auth_user_id    uuid unique,               -- links to auth.users once Google auth is on
  name            text not null,
  email           text unique,
  phone           text,
  shop_name       text not null,
  shop_slug       text unique not null,      -- nexify.app/pay/<shop_slug>
  shop_description text,
  momo_number     text,
  plan            text not null default 'starter',  -- starter | growth | business
  wallet_balance  numeric(12,2) not null default 0,
  created_at      timestamptz not null default now()
);

-- ───────────────────────── Orders ─────────────────────────
create table if not exists public.orders (
  id              text primary key,          -- 'NX-10492'
  vendor_id       uuid references public.vendors(id) on delete set null,
  customer_phone  text,                       -- masked/stored recipient
  recipient_phone text,
  network         text not null,
  bundle_size     text not null,
  amount          numeric(10,2) not null,
  status          text not null default 'Processing'
                    check (status in ('Delivered','Processing','Failed')),
  created_at      timestamptz not null default now()
);
create index if not exists orders_vendor_idx on public.orders(vendor_id);
create index if not exists orders_created_idx on public.orders(created_at desc);

-- ───────────────────────── Wallet transactions ─────────────────────────
create table if not exists public.wallet_transactions (
  id          uuid primary key default gen_random_uuid(),
  vendor_id   uuid references public.vendors(id) on delete cascade,
  type        text not null check (type in ('in','out')),
  label       text not null,
  amount      numeric(12,2) not null,
  created_at  timestamptz not null default now()
);

-- ───────────────────────── Arion responses (editable canned replies) ─────────────────────────
create table if not exists public.arion_responses (
  id          text primary key,
  title       text not null,
  keywords    text[] not null default '{}',
  reply       text not null,
  sort        int not null default 0,
  updated_at  timestamptz not null default now()
);

-- ───────────────────────── Admins (the authorized Google accounts) ─────────────────────────
create table if not exists public.admins (
  email       text primary key,              -- the "secret Gmail(s)" allowed into /admin
  created_at  timestamptz not null default now()
);

-- ───────────────────────── Row Level Security ─────────────────────────
-- DEMO policies: public read so the frontend works with the anon key before
-- Google auth is wired. TIGHTEN these once auth + admin checks are in place.
alter table public.networks           enable row level security;
alter table public.bundles            enable row level security;
alter table public.vendors            enable row level security;
alter table public.orders             enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.arion_responses    enable row level security;
alter table public.admins             enable row level security;

-- Public catalog + assistant data: readable by anyone (anon key)
create policy "public read networks"  on public.networks        for select using (true);
create policy "public read bundles"   on public.bundles         for select using (true);
create policy "public read arion"     on public.arion_responses for select using (true);

-- Demo read access for the local preview (replace with owner/admin checks after auth)
create policy "demo read vendors" on public.vendors             for select using (true);
create policy "demo read orders"  on public.orders              for select using (true);
create policy "demo read wallet"  on public.wallet_transactions for select using (true);

-- Admins table is never exposed to anon; service role bypasses RLS for seeding/admin.
