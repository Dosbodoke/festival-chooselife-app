create policy "Enable update for all users"
on "public"."highline"
as permissive
for update
to public
using (true);



