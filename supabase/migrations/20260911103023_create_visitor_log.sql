/*
# Create visitor_log table for tracking page visits

1. New Tables
- `visitor_log`
  - `id` (uuid, primary key, auto-generated)
  - `visited_at` (timestamptz, when the visit occurred)
  - `page` (text, which page was visited)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `visitor_log`.
- Allow anon + authenticated to INSERT (log a visit) and SELECT (read count).
- This is a single-tenant, no-auth app — data is intentionally public/shared.

3. Notes
- The frontend inserts a row on each visit and reads the total count for display.
- No user_id or auth integration — this is a simple visitor counter.
*/

CREATE TABLE IF NOT EXISTS visitor_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visited_at timestamptz NOT NULL,
  page text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE visitor_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_visitor_log" ON visitor_log;
CREATE POLICY "anon_insert_visitor_log" ON visitor_log FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_visitor_log" ON visitor_log;
CREATE POLICY "anon_select_visitor_log" ON visitor_log FOR SELECT
  TO anon, authenticated USING (true);
