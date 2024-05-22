set check_function_bodies = off;

DROP FUNCTION IF EXISTS public.get_total_cadenas (
  highline_id UUID,
  page_number INTEGER,
  page_size INTEGER
);

CREATE OR REPLACE FUNCTION public.get_total_cadenas(highline_ids uuid[], page_number integer, page_size integer)
 RETURNS TABLE(instagram text, total_cadenas integer, profile_picture text)
 LANGUAGE sql
AS $function$
SELECT e.instagram, SUM(e.cadenas) AS total_cadenas, COALESCE(p.profile_picture, '') AS profile_picture
FROM entry e
LEFT JOIN profiles p ON e.instagram = p.username
WHERE e.highline_id = ANY(get_total_cadenas.highline_ids)
GROUP BY e.instagram, p.profile_picture
HAVING SUM(e.cadenas) > 0
ORDER BY total_cadenas DESC
OFFSET (get_total_cadenas.page_number - 1) * get_total_cadenas.page_size
LIMIT get_total_cadenas.page_size;
$function$
;


DROP FUNCTION IF EXISTS public.get_total_full_lines (
  highline_id UUID,
  page_number INTEGER,
  page_size INTEGER
);

CREATE OR REPLACE FUNCTION public.get_total_full_lines(highline_ids uuid[], page_number integer, page_size integer)
 RETURNS TABLE(instagram text, total_full_lines integer, profile_picture text)
 LANGUAGE sql
AS $function$
SELECT e.instagram, SUM(e.full_lines) AS total_full_lines, COALESCE(p.profile_picture, '') AS profile_picture
FROM entry e
LEFT JOIN profiles p ON e.instagram = p.username
WHERE e.highline_id = ANY(get_total_full_lines.highline_ids)
GROUP BY e.instagram, p.profile_picture
HAVING SUM(e.full_lines) > 0
ORDER BY total_full_lines DESC
OFFSET (get_total_full_lines.page_number - 1) * get_total_full_lines.page_size
LIMIT get_total_full_lines.page_size;
$function$
;

DROP FUNCTION IF EXISTS public.get_total_walked (
  highline_id UUID,
  page_number INTEGER,
  page_size INTEGER
);

CREATE OR REPLACE FUNCTION public.get_total_walked(highline_ids uuid[], page_number integer, page_size integer)
 RETURNS TABLE(instagram text, total_distance_walked integer, profile_picture text)
 LANGUAGE sql
AS $function$
SELECT e.instagram, SUM(e.distance_walked) AS total_distance_walked, COALESCE(p.profile_picture, '') AS profile_picture
FROM entry e
LEFT JOIN profiles p ON e.instagram = p.username
WHERE e.highline_id = ANY(get_total_walked.highline_ids)
AND e.distance_walked IS NOT NULL
GROUP BY e.instagram, p.profile_picture
ORDER BY total_distance_walked DESC
OFFSET (get_total_walked.page_number - 1) * get_total_walked.page_size
LIMIT page_size;
$function$
;


