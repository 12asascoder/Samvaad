-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Create user_memories table
create table public.user_memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  embedding vector(1024), -- Using 1024 dimensions for mxbai-embed-large or similar local models
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_memories enable row level security;

-- Create policy for user access
create policy "Users can manage their own memories"
  on public.user_memories
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Create an index for faster similarity searches
create index on public.user_memories using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- Create ai_usage_logs table
create table public.ai_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  provider text not null,
  requests integer default 1,
  prompt_tokens integer default 0,
  completion_tokens integer default 0,
  total_tokens integer default 0,
  latency_ms integer default 0,
  estimated_cost numeric(10, 6) default 0,
  is_fallback boolean default false,
  failures integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.ai_usage_logs enable row level security;

-- Create policy for user access
create policy "Users can view their own AI usage"
  on public.ai_usage_logs
  for select
  to authenticated
  using (auth.uid() = user_id);

