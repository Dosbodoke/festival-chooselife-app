import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Database } from "./database.types";

const supabase = createServerComponentClient<Database>({ cookies });

export default supabase;
