import { cookies } from "next/headers";

import { useSupabaseServer } from "@/utils/supabase/server";

import LocaleSwitcher from "./LocaleSwitcher";
import ProfileMenu from "./ProfileMenu";
import SignUp from "./SignUp";
import { ThemeModeToggler } from "./ThemeToggler";

export const dynamic = "force-dynamic";

export default async function NavBar() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <nav className="flex w-full items-center justify-between gap-4 p-2 pb-4">
      <LocaleSwitcher />
      <div className="flex items-center gap-2">
        <ThemeModeToggler />
        {session ? <ProfileMenu user={session.user} /> : <SignUp />}
      </div>
    </nav>
  );
}
