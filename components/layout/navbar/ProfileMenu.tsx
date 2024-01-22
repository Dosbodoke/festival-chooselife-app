import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useTranslations } from "next-intl";

import { UserCircleIcon } from "@/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Link } from "@/navigation";

import SignOut from "./SignOut";
import UpdateProfile from "./UpdateProfile";

export default async function ProfileMenu() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-6 w-6">
        <UserCircleIcon
          className="fill-black dark:fill-white"
          width="100%"
          height="100%"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={8}
        className="max-w-[12rem] overflow-hidden"
      >
        <ProfileSection username={user?.user_metadata["username"]} />
        <DropdownMenuSeparator />
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProfileSection({ username }: { username: string | null }) {
  const t = useTranslations("profileMenu");

  if (!username) return null;

  return (
    <DropdownMenuItem asChild>
      <Link href={`/profile/${username.replace("@", "")}`}>
        {t("myProfile")}
      </Link>
    </DropdownMenuItem>
  );
}
