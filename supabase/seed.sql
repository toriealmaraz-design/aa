-- Nexify — seed data (matches src/lib/store.ts). Idempotent via upserts.

-- ───────── Networks ─────────
insert into public.networks (id, name, code, color, text_dark, active, sort) values
  ('mtn',        'MTN',        'M',  '#facc15', true,  true, 1),
  ('telecel',    'Telecel',    'T',  '#ef4444', false, true, 2),
  ('airteltigo', 'AirtelTigo', 'AT', '#3b82f6', false, true, 3)
on conflict (id) do update set
  name=excluded.name, code=excluded.code, color=excluded.color,
  text_dark=excluded.text_dark, active=excluded.active, sort=excluded.sort;

-- ───────── Bundles ─────────
delete from public.bundles;
insert into public.bundles (network_id, size, validity, wholesale, price) values
  ('mtn','1GB','30 days',5.20,6),   ('mtn','2GB','30 days',9.50,11),
  ('mtn','5GB','30 days',22,25),    ('mtn','10GB','30 days',41,46),
  ('mtn','20GB','30 days',78,85),
  ('telecel','1GB','30 days',4.30,5),  ('telecel','3GB','30 days',12.5,14),
  ('telecel','6GB','30 days',24,27),   ('telecel','15GB','30 days',54,60),
  ('airteltigo','1GB','30 days',4.3,5),   ('airteltigo','2GB','30 days',8.5,10),
  ('airteltigo','5GB','30 days',20,23),   ('airteltigo','12GB','30 days',47,52);

-- ───────── Vendor (Kofi) ─────────
insert into public.vendors (id, name, email, phone, shop_name, shop_slug, shop_description, momo_number, plan, wallet_balance)
values (
  '11111111-1111-1111-1111-111111111111',
  'Kofi', 'kofi@example.com', '024 123 4567',
  'Kofi Data', 'kofi-data',
  'Fast, reliable data bundles for all networks. Open 24/7.',
  '024 123 4567', 'growth', 1284.50
)
on conflict (id) do update set
  name=excluded.name, shop_name=excluded.shop_name, shop_slug=excluded.shop_slug,
  wallet_balance=excluded.wallet_balance, plan=excluded.plan;

-- ───────── Orders ─────────
delete from public.orders;
insert into public.orders (id, vendor_id, customer_phone, recipient_phone, network, bundle_size, amount, status, created_at) values
  ('NX-10492','11111111-1111-1111-1111-111111111111','024 •••• 231','0241112231','MTN','5GB',25,'Delivered', now() - interval '2 minutes'),
  ('NX-10491','11111111-1111-1111-1111-111111111111','055 •••• 887','0551110887','Telecel','1GB',5,'Delivered', now() - interval '14 minutes'),
  ('NX-10490','11111111-1111-1111-1111-111111111111','020 •••• 014','0201110014','AirtelTigo','2GB',10,'Processing', now() - interval '31 minutes'),
  ('NX-10489','11111111-1111-1111-1111-111111111111','024 •••• 556','0241110556','MTN','10GB',46,'Delivered', now() - interval '1 hour'),
  ('NX-10488','11111111-1111-1111-1111-111111111111','059 •••• 773','0591110773','MTN','1GB',6,'Failed', now() - interval '2 hours');

-- ───────── Wallet transactions ─────────
delete from public.wallet_transactions;
insert into public.wallet_transactions (vendor_id, type, label, amount, created_at) values
  ('11111111-1111-1111-1111-111111111111','in','Sale · MTN 5GB',25, now() - interval '2 minutes'),
  ('11111111-1111-1111-1111-111111111111','in','Sale · Telecel 1GB',5, now() - interval '14 minutes'),
  ('11111111-1111-1111-1111-111111111111','out','Withdrawal to MoMo',500, now() - interval '1 day'),
  ('11111111-1111-1111-1111-111111111111','in','Sale · MTN 10GB',46, now() - interval '1 day');

-- ───────── Arion responses ─────────
insert into public.arion_responses (id, title, keywords, reply, sort) values
  ('greeting','Greeting', array['hi','hello','hey','good morning','good evening'],
    'Hi! I''m Arion, your Nexify assistant. I can help you track an order, explain how buying works, or answer questions about data bundles. What do you need?',1),
  ('buy','How to buy data', array['buy','purchase','how do i','get data','order data'],
    'To buy data: open a vendor shop link, pick a network, choose a bundle, enter the recipient number, and pay with Mobile Money. Your data arrives in seconds.',2),
  ('networks','Supported networks', array['network','mtn','telecel','airteltigo','vodafone','which networks'],
    'Nexify supports MTN, Telecel, and AirtelTigo data bundles across Ghana.',3),
  ('payment','Payment methods', array['pay','payment','momo','mobile money','card'],
    'Payments are made securely via Mobile Money — MTN MoMo, Telecel Cash, or AT Money. You approve the charge with a prompt on your phone.',4),
  ('withdraw','Vendor withdrawals', array['withdraw','payout','cash out','earnings'],
    'Vendors can withdraw earnings to their Mobile Money number anytime from the wallet. Withdrawals are instant with no minimum.',5),
  ('failed','Failed transaction', array['failed','not received','didn''t get','no data','refund'],
    'Sorry about that. Failed transactions are automatically refunded to the payment number, usually within minutes. Share your order ID and I''ll check the status.',6),
  ('human','Talk to a human', array['human','agent','support','contact','help me'],
    'You can reach our support team on WhatsApp at +233 00 000 0000, or email support@nexify.app. We usually reply within minutes.',7)
on conflict (id) do update set
  title=excluded.title, keywords=excluded.keywords, reply=excluded.reply, sort=excluded.sort;

-- ───────── Admin (replace with your real Gmail) ─────────
insert into public.admins (email) values ('toriealmaraz@gmail.com')
on conflict (email) do nothing;
