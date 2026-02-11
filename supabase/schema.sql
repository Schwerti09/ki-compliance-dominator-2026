-- Minimal-but-complete demo schema for KI Compliance Dominator 2026 (Supabase/Postgres)
-- Includes: tables, indexes, triggers, RLS policies, and seed data.

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- =========
-- Tables
-- =========

create table if not exists public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, user_id),
  constraint organization_members_role_check check (role in ('owner','admin','compliance_manager','auditor','member','viewer'))
);

create table if not exists public.ai_systems (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  eu_ai_act_risk_category text not null default 'unknown',
  compliance_score int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_systems_risk_check check (eu_ai_act_risk_category in ('unacceptable','high','limited','minimal','unknown'))
);

create table if not exists public.compliance_requirements (
  id uuid primary key default uuid_generate_v4(),
  framework text not null,
  code text not null,
  title text not null,
  description text not null,
  priority text not null default 'medium',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (framework, code),
  constraint compliance_requirements_framework_check check (framework in ('EU_AI_ACT','ISO_42001','GDPR')),
  constraint compliance_requirements_priority_check check (priority in ('low','medium','high','critical'))
);

create table if not exists public.system_compliance (
  id uuid primary key default uuid_generate_v4(),
  ai_system_id uuid not null references public.ai_systems(id) on delete cascade,
  requirement_id uuid not null references public.compliance_requirements(id) on delete cascade,
  status text not null default 'not_assessed',
  evidence_urls text[] not null default '{}',
  notes text,
  assessed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (ai_system_id, requirement_id),
  constraint system_compliance_status_check check (status in ('not_assessed','compliant','partial','non_compliant','not_applicable'))
);

create table if not exists public.audit_runs (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  status text not null default 'planned',
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint audit_runs_status_check check (status in ('planned','in_progress','completed','cancelled'))
);

create table if not exists public.audit_findings (
  id uuid primary key default uuid_generate_v4(),
  audit_id uuid not null references public.audit_runs(id) on delete cascade,
  ai_system_id uuid references public.ai_systems(id) on delete set null,
  title text not null,
  severity text not null,
  detail text not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint audit_findings_severity_check check (severity in ('critical','major','minor','observation')),
  constraint audit_findings_status_check check (status in ('open','in_progress','resolved','closed'))
);

create table if not exists public.activity_events (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id) on delete cascade,
  user_id uuid,
  type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.stripe_event_log (
  id text primary key,
  type text not null,
  livemode boolean not null default false,
  created_at_unix bigint not null,
  inserted_at timestamptz not null default now()
);

-- =========
-- Indexes
-- =========

create index if not exists idx_org_members_org on public.organization_members(organization_id);
create index if not exists idx_ai_systems_org on public.ai_systems(organization_id);
create index if not exists idx_system_compliance_system on public.system_compliance(ai_system_id);
create index if not exists idx_findings_audit on public.audit_findings(audit_id);
create index if not exists idx_events_org_time on public.activity_events(organization_id, created_at desc);

-- =========
-- Triggers
-- =========

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare
  t text;
begin
  foreach t in array array[
    'organizations',
    'organization_members',
    'ai_systems',
    'compliance_requirements',
    'system_compliance',
    'audit_runs',
    'audit_findings'
  ]
  loop
    execute format('drop trigger if exists trg_%s_updated_at on public.%s;', t, t);
    execute format('create trigger trg_%s_updated_at before update on public.%s for each row execute function public.set_updated_at();', t, t);
  end loop;
end $$;

-- =========
-- RLS
-- =========

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.ai_systems enable row level security;
alter table public.compliance_requirements enable row level security;
alter table public.system_compliance enable row level security;
alter table public.audit_runs enable row level security;
alter table public.audit_findings enable row level security;
alter table public.activity_events enable row level security;
alter table public.stripe_event_log enable row level security;

-- Note: In Supabase, auth.uid() works when requests are authenticated.
-- Policies below are safe defaults for demo; production should harden roles.

create policy "orgs: members can read" on public.organizations
for select
using (
  id in (select organization_id from public.organization_members where user_id = auth.uid())
);

create policy "org_members: members can read" on public.organization_members
for select
using (
  organization_id in (select organization_id from public.organization_members where user_id = auth.uid())
);

create policy "ai_systems: members can read" on public.ai_systems
for select
using (
  organization_id in (select organization_id from public.organization_members where user_id = auth.uid())
);

create policy "requirements: readable" on public.compliance_requirements
for select
using (true);

create policy "system_compliance: members can read" on public.system_compliance
for select
using (
  ai_system_id in (
    select s.id from public.ai_systems s
    where s.organization_id in (select organization_id from public.organization_members where user_id = auth.uid())
  )
);

create policy "audit_runs: members can read" on public.audit_runs
for select
using (
  organization_id in (select organization_id from public.organization_members where user_id = auth.uid())
);

create policy "audit_findings: members can read" on public.audit_findings
for select
using (
  audit_id in (
    select id from public.audit_runs
    where organization_id in (select organization_id from public.organization_members where user_id = auth.uid())
  )
);

create policy "activity_events: members can read" on public.activity_events
for select
using (
  organization_id in (select organization_id from public.organization_members where user_id = auth.uid())
);

-- Stripe events: service role only (no rows for anon/auth users)
create policy "stripe_event_log: deny" on public.stripe_event_log
for all
using (false);

-- =========
-- Seed data
-- =========

insert into public.compliance_requirements(framework, code, title, description, priority)
values
('EU_AI_ACT','ART_10','Technische Dokumentation','Dokumentation für High-Risk Systeme muss erstellt und gepflegt werden.','high'),
('EU_AI_ACT','ART_13','Transparenz','Informationen für Nutzer/Betroffene bereitstellen.','high'),
('EU_AI_ACT','ART_14','Human Oversight','Wirksame menschliche Aufsicht sicherstellen.','critical'),
('ISO_42001','4.1','Context of the organization','Externe/interne Themen bestimmen, die AIMS beeinflussen.','medium'),
('ISO_42001','5.3','Roles & responsibilities','Rollen, Verantwortlichkeiten und Befugnisse definieren.','high')
on conflict (framework, code) do nothing;
