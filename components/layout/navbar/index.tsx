import { cookies } from "next/headers";

import { useSupabaseServer } from "@/utils/supabase/server";

import LocaleSwitcher from "./LocaleSwitcher";
import ProfileMenu from "./ProfileMenu";
import SignUp from "./SignUp";
import { ThemeModeToggler } from "./ThemeToggler";

export default async function NavBar() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex w-full items-center justify-end gap-4 p-2 pb-4">
      <div className="flex items-center gap-1">
        <LocaleSwitcher />
        <ThemeModeToggler />
        {user ? <ProfileMenu user={user} /> : <SignUp />}
      </div>
    </nav>
  );
}
