alter table "storage"."objects" add constraint "objects_owner_fkey" FOREIGN KEY (owner) REFERENCES auth.users(id) not valid;

alter table "storage"."objects" validate constraint "objects_owner_fkey";

create policy "Give read acess to images for everyone 1ffg0oo_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'images'::text));


create policy "public_upload 1ffg0oo_0"
on "storage"."objects"
as permissive
for insert
to anon
with check ((bucket_id = 'images'::text));



