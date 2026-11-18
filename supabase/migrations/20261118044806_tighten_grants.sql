/*
# Tighten grants to least privilege

## Overview
Supabase applies default CRUD grants to `anon` and `authenticated` on every
public table. RLS policies still block the operations that have no matching
policy (e.g. no INSERT policy on `events` means inserts are rejected), but the
principle of least privilege says we should not grant verbs the app never uses
through the Data API. This migration revokes the excess grants so the grant
table matches the actual access model.

## Changes
- `events`, `schedule_days`, `schedule_slots`, `sponsors`: revoke INSERT,
  UPDATE, DELETE from `anon` and `authenticated`. These are read-only catalogue
  tables — visitors only SELECT. Admin writes go through the service role.
- `registrations`: revoke SELECT, UPDATE, DELETE from `anon` and
  `authenticated`. Visitors can only INSERT (submit the form). They cannot read
  other people's registrations, edit them, or delete them.

## Idempotency
REVOKE is safe to re-run.
*/

REVOKE INSERT, UPDATE, DELETE ON events FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON schedule_days FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON schedule_slots FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON sponsors FROM anon, authenticated;

REVOKE SELECT, UPDATE, DELETE ON registrations FROM anon, authenticated;
