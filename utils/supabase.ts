import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

export type Tables = Database["public"]["Tables"];

export default createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
