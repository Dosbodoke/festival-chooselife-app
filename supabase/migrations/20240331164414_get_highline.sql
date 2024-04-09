CREATE OR REPLACE FUNCTION public.get_highline(searchid uuid DEFAULT NULL::uuid, searchname text DEFAULT ''::text, pagesize integer DEFAULT NULL::integer, pageparam integer DEFAULT NULL::integer, userid uuid DEFAULT NULL::uuid)
 RETURNS TABLE(id uuid, created_at timestamp with time zone, name text, height numeric, lenght numeric, main_webbing text, backup_webbing text, description text, sector_id bigint, cover_image text, riggers text[], anchor_a_long double precision, anchor_a_lat double precision, anchor_b_long double precision, anchor_b_lat double precision, is_favorite boolean)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        h.id,
        h.created_at,
        h.name,
        h.height,
        h.lenght,
        h.main_webbing,
        h.backup_webbing,
        h.description,
        h.sector_id,
        h.cover_image,
        h.riggers,
        st_x(anchor_a::geometry) as anchor_a_long,
        st_y(anchor_a::geometry) as anchor_a_lat,
        st_x(anchor_b::geometry) as anchor_b_long,
        st_y(anchor_b::geometry) as anchor_b_lat,
        EXISTS (
            SELECT 1
            FROM public.favorite_highline fh
            WHERE fh.highline_id = h.id
            AND fh.profile_id = userId
        ) as is_favorite
    FROM
        public.highline h
    WHERE
        (searchId IS NULL OR h.id = searchId)
        AND (searchName = '' OR h.name ilike '%' || searchName || '%')
    LIMIT pageSize OFFSET (pageParam - 1) * pageSize;
END;
$function$
;


