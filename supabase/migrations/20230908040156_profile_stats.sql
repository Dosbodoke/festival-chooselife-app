
CREATE OR REPLACE FUNCTION public.profile_stats(username text)
 RETURNS TABLE( total_distance_walked numeric, total_cadenas integer, total_full_lines integer)
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
