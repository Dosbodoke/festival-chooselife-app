set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_crossing_time(highline_id uuid, page_number integer, page_size integer)
 RETURNS TABLE(instagram text, crossing_time integer, profile_picture text)
 LANGUAGE sql
AS $function$
  select e.instagram, e.crossing_time, COALESCE(p.profile_picture, '') AS profile_picture
  from entry e
  LEFT JOIN profiles p on e.instagram = p.username
  where highline_id = get_crossing_time.highline_id 
  order by e.crossing_time asc
  OFFSET (get_crossing_time.page_number - 1) * get_crossing_time.page_size
  LIMIT get_crossing_time.page_size;
$function$
;

CREATE OR REPLACE FUNCTION public.get_total_cadenas(highline_id uuid, page_number integer, page_size integer)
 RETURNS TABLE(instagram text, total_cadenas integer, profile_picture text)
 LANGUAGE sql
AS $function$  SELECT e.instagram, SUM(e.cadenas) AS total_cadenas, COALESCE(p.profile_picture, '') AS profile_picture
  FROM entry e
  LEFT JOIN profiles p on e.instagram = p.username
  WHERE highline_id = get_total_cadenas.highline_id
  GROUP BY e.instagram, p.profile_picture
  HAVING SUM(e.cadenas) > 0
  ORDER BY total_cadenas DESC
  OFFSET (get_total_cadenas.page_number - 1) * get_total_cadenas.page_size
  LIMIT get_total_cadenas.page_size;
$function$
;

CREATE OR REPLACE FUNCTION public.get_total_full_lines(highline_id uuid, page_number integer, page_size integer)
 RETURNS TABLE(instagram text, total_full_lines integer, profile_picture text)
 LANGUAGE sql
AS $function$
  SELECT e.instagram, SUM(e.full_lines) AS total_full_lines, COALESCE(p.profile_picture, '') AS profile_picture
  FROM entry e
  LEFT JOIN profiles p ON e.instagram = p.username
  WHERE e.highline_id = get_total_full_lines.highline_id
  GROUP BY e.instagram, p.profile_picture
  HAVING SUM(e.full_lines) > 0
  ORDER BY total_full_lines DESC
  OFFSET (get_total_full_lines.page_number - 1) * get_total_full_lines.page_size
  LIMIT get_total_full_lines.page_size;
$function$
;

CREATE OR REPLACE FUNCTION public.get_total_walked(highline_id uuid, page_number integer, page_size integer)
 RETURNS TABLE(instagram text, total_distance_walked integer, profile_picture text)
 LANGUAGE sql
AS $function$
  SELECT e.instagram, SUM(e.distance_walked) AS total_distance_walked, COALESCE(p.profile_picture, '') AS profile_picture
  FROM entry e
  LEFT JOIN profiles p on e.instagram = p.username
  WHERE e.highline_id = get_total_walked.highline_id
    AND e.distance_walked IS NOT NULL
  GROUP BY e.instagram, p.profile_picture
  ORDER BY total_distance_walked DESC
  OFFSET (get_total_walked.page_number - 1) * get_total_walked.page_size
  LIMIT page_size;
$function$
;


