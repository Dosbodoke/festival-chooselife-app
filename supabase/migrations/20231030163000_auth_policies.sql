drop policy "Enable insert for everyone" on "public"."entry";

drop policy "Enable read access for all users" on "public"."entry";

drop policy "Enable read access for all users" on "public"."highline";

drop policy "public_insert" on "public"."highline";

drop policy "Public profiles are viewable by everyone." on "public"."profiles";

drop policy "Users can update own profile." on "public"."profiles";

drop policy "Enable read access for all users" on "public"."sector";

create policy "Enable insert for everyone"
on "public"."entry"
as permissive
for insert
to anon, authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."entry"
as permissive
for select
to anon, authenticated
using (true);


create policy "Enable read access for all users"
on "public"."highline"
as permissive
for select
to anon, authenticated
using (true);


create policy "public_insert"
on "public"."highline"
as permissive
for insert
to anon, authenticated
with check (true);


create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to anon, authenticated
using (true);


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to authenticated
using ((auth.uid() = id));


create policy "Enable read access for all users"
on "public"."sector"
as permissive
for select
to anon, authenticated
using (true);




