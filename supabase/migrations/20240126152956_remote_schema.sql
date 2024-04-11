create extension if not exists "postgis" with schema "extensions";


alter table "public"."highline" add column "anchor_a" geography(Point,4326) default NULL::geography;

alter table "public"."highline" add column "anchor_b" geography(Point,4326) default NULL::geography;

CREATE INDEX highlines_geo_index ON public.highline USING gist (anchor_a);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.highlines_in_view(min_lat double precision, min_long double precision, max_lat double precision, max_long double precision)
 RETURNS TABLE(id uuid, name text, lat double precision, long double precision)
 LANGUAGE sql
AS $function$
	select id, name, st_y(anchor_a::geometry) as lat, st_x(anchor_a::geometry) as long
	from public.highline
	where anchor_a && ST_SetSRID(ST_MakeBox2D(ST_Point(min_long, min_lat), ST_Point(max_long, max_lat)), 4326)
$function$
;


