import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/utils/database.types";

import LocaleSwitcher from "./LocaleSwitcher";
import { ThemeModeToggler } from "./ThemeToggler";
import Profile from "./Profile";

const NavBar = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <nav className="flex w-full items-center justify-end gap-4 py-2">
      <LocaleSwitcher />
      <ThemeModeToggler />
      <Profile session={session} />
    </nav>
  );
};

export default NavBar;
