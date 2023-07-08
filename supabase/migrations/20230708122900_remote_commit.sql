
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE FUNCTION "public"."get_total_cadenas"("highline_id" "uuid", "page_number" integer, "page_size" integer) RETURNS TABLE("instagram" "text", "total_cadenas" integer)
    LANGUAGE "sql"
    AS $$
  SELECT instagram, COUNT(*) AS total_cadenas
  FROM entry
  WHERE highline_id = get_total_cadenas.highline_id AND is_cadena = true
  GROUP BY instagram
  ORDER BY total_cadenas DESC
  OFFSET (get_total_cadenas.page_number - 1) * page_size
  LIMIT page_size;
$$;

ALTER FUNCTION "public"."get_total_cadenas"("highline_id" "uuid", "page_number" integer, "page_size" integer) OWNER TO "postgres";

CREATE FUNCTION "public"."get_total_full_lines"("highline_id" "uuid", "page_number" integer, "page_size" integer) RETURNS TABLE("instagram" "text", "total_full_lines" integer)
    LANGUAGE "sql"
    AS $$
  SELECT instagram, COUNT(*) AS total_full_lines
  FROM entry
  WHERE highline_id = get_total_full_lines.highline_id AND is_full_line = true
  GROUP BY instagram
  ORDER BY total_full_lines DESC
  OFFSET (get_total_full_lines.page_number - 1) * page_size
  LIMIT page_size;
$$;

ALTER FUNCTION "public"."get_total_full_lines"("highline_id" "uuid", "page_number" integer, "page_size" integer) OWNER TO "postgres";

CREATE FUNCTION "public"."get_total_walked"("highline_id" "uuid", "page_number" integer, "page_size" integer) RETURNS TABLE("instagram" "text", "total_distance_walked" integer)
    LANGUAGE "sql"
    AS $$
  SELECT instagram, SUM(distance_walked) AS total_distance_walked
  FROM entry
  WHERE highline_id = get_total_walked.highline_id
    AND distance_walked IS NOT NULL
  GROUP BY instagram
  ORDER BY total_distance_walked DESC
  OFFSET (get_total_walked.page_number - 1) * get_total_walked.page_size
  LIMIT page_size;
$$;

ALTER FUNCTION "public"."get_total_walked"("highline_id" "uuid", "page_number" integer, "page_size" integer) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE "public"."entry" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "instagram" "text" NOT NULL,
    "is_highliner" boolean NOT NULL,
    "is_full_line" boolean,
    "is_cadena" boolean,
    "distance_walked" numeric,
    "highline_id" "uuid" NOT NULL,
    "witness" "text"[],
    "crossing_time" numeric,
    "comment" "text"
);

ALTER TABLE "public"."entry" OWNER TO "postgres";

CREATE TABLE "public"."highline" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "height" numeric NOT NULL,
    "lenght" numeric NOT NULL,
    "main_webbing" "text" DEFAULT ''::"text" NOT NULL,
    "backup_webbing" "text" DEFAULT ''::"text" NOT NULL,
    "description" "text",
    "sector_id" bigint,
    "cover_image" "text",
    "riggers" "text"[]
);

ALTER TABLE "public"."highline" OWNER TO "postgres";

CREATE TABLE "public"."sector" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "description" "text",
    "name" "text" NOT NULL
);

ALTER TABLE "public"."sector" OWNER TO "postgres";

ALTER TABLE "public"."sector" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."sector_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY "public"."entry"
    ADD CONSTRAINT "entry_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."highline"
    ADD CONSTRAINT "highline_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."sector"
    ADD CONSTRAINT "sector_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."entry"
    ADD CONSTRAINT "entry_highline_id_fkey" FOREIGN KEY ("highline_id") REFERENCES "public"."highline"("id");

ALTER TABLE ONLY "public"."highline"
    ADD CONSTRAINT "highline_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "public"."sector"("id");

CREATE POLICY "Enable insert for everyone" ON "public"."entry" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."entry" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."highline" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."sector" FOR SELECT USING (true);

ALTER TABLE "public"."entry" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."highline" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert" ON "public"."highline" FOR INSERT TO "anon" WITH CHECK (true);

ALTER TABLE "public"."sector" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."get_total_cadenas"("highline_id" "uuid", "page_number" integer, "page_size" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_total_cadenas"("highline_id" "uuid", "page_number" integer, "page_size" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_total_cadenas"("highline_id" "uuid", "page_number" integer, "page_size" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_total_full_lines"("highline_id" "uuid", "page_number" integer, "page_size" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_total_full_lines"("highline_id" "uuid", "page_number" integer, "page_size" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_total_full_lines"("highline_id" "uuid", "page_number" integer, "page_size" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_total_walked"("highline_id" "uuid", "page_number" integer, "page_size" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_total_walked"("highline_id" "uuid", "page_number" integer, "page_size" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_total_walked"("highline_id" "uuid", "page_number" integer, "page_size" integer) TO "service_role";

GRANT ALL ON TABLE "public"."entry" TO "anon";
GRANT ALL ON TABLE "public"."entry" TO "authenticated";
GRANT ALL ON TABLE "public"."entry" TO "service_role";

GRANT ALL ON TABLE "public"."highline" TO "anon";
GRANT ALL ON TABLE "public"."highline" TO "authenticated";
GRANT ALL ON TABLE "public"."highline" TO "service_role";

GRANT ALL ON TABLE "public"."sector" TO "anon";
GRANT ALL ON TABLE "public"."sector" TO "authenticated";
GRANT ALL ON TABLE "public"."sector" TO "service_role";

GRANT ALL ON SEQUENCE "public"."sector_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."sector_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."sector_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
