create table "public"."favorite_highline" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "highline_id" uuid not null,
    "profile_id" uuid not null
);


alter table "public"."favorite_highline" enable row level security;

CREATE UNIQUE INDEX favorite_highline_pkey ON public.favorite_highline USING btree (id);

alter table "public"."favorite_highline" add constraint "favorite_highline_pkey" PRIMARY KEY using index "favorite_highline_pkey";

alter table "public"."favorite_highline" add constraint "favorite_highline_highline_id_fkey" FOREIGN KEY (highline_id) REFERENCES highline(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."favorite_highline" validate constraint "favorite_highline_highline_id_fkey";

alter table "public"."favorite_highline" add constraint "favorite_highline_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."favorite_highline" validate constraint "favorite_highline_profile_id_fkey";

create policy "Enable delete for users based on profile_id"
on "public"."favorite_highline"
as permissive
for delete
to public
using ((auth.uid() = profile_id));


create policy "Enable insert for users based on profile_id"
on "public"."favorite_highline"
as permissive
for insert
to public
with check ((auth.uid() = profile_id));


create policy "Enable read users based on profile_id"
on "public"."favorite_highline"
as permissive
for select
to public
using ((auth.uid() = profile_id));



