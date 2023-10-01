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
    <nav className="flex w-full items-center justify-between gap-4 p-2 pb-8">
      <LocaleSwitcher />
      <div>
        <ThemeModeToggler />
        <Profile session={session} />
      </div>
    </nav>
  );
};

export default NavBar;
