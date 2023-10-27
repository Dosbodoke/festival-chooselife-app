create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  username text,

  primary key (id)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to get profile stats
CREATE OR REPLACE FUNCTION public.profile_stats(username text)
 RETURNS TABLE(total_distance_walked numeric, total_cadenas integer, total_full_lines integer)
 LANGUAGE sql
AS $function$ 
    SELECT      
        sum(distance_walked) as total_distance_walked,
        sum(cadenas) as total_cadenas,
        sum(full_lines) as total_full_lines
  FROM entry
  WHERE
    instagram = username;
$function$
;


