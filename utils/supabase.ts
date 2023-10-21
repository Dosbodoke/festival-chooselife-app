import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "./database.types";

export type Tables = Database["public"]["Tables"];

export const MAX_FILE_SIZE = 6 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const supabase = createClientComponentClient<Database>({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});

export default supabase;
