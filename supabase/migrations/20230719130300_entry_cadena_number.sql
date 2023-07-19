alter table "public"."entry" drop column "is_cadena";

alter table "public"."entry" drop column "is_full_line";

alter table "public"."entry" add column "cadenas" integer default 0;

alter table "public"."entry" add column "full_lines" integer default 0;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_total_cadenas(highline_id uuid, page_number integer, page_size integer)
 RETURNS TABLE(instagram text, total_cadenas integer)
 LANGUAGE sql
AS $function$  SELECT instagram, SUM(cadenas) AS total_cadenas
  FROM entry
  WHERE highline_id = get_total_cadenas.highline_id
  GROUP BY instagram
  HAVING SUM(cadenas) > 0
  ORDER BY total_cadenas DESC
  OFFSET (get_total_cadenas.page_number - 1) * get_total_cadenas.page_size
  LIMIT get_total_cadenas.page_size;
$function$
;

CREATE OR REPLACE FUNCTION public.get_total_full_lines(highline_id uuid, page_number integer, page_size integer)
 RETURNS TABLE(instagram text, total_full_lines integer)
 LANGUAGE sql
AS $function$  SELECT instagram, SUM(full_lines) AS total_full_lines
  FROM entry
  WHERE highline_id = get_total_full_lines.highline_id
  GROUP BY instagram
  HAVING SUM(full_lines) > 0
  ORDER BY total_full_lines DESC
  OFFSET (get_total_full_lines.page_number - 1) * get_total_full_lines.page_size
  LIMIT get_total_full_lines.page_size;
$function$
;


