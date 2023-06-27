import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

export type Tables = Database["public"]["Tables"];

export const MAX_FILE_SIZE = 6 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export default createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
