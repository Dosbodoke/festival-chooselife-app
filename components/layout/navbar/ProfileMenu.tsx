"use client";

import { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";

import { LogOutIcon, UserCircleIcon } from "@/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Link, useRouter } from "@/navigation";
import useSupabaseBrowser from "@/utils/supabase/client";

export default async function ProfileMenu({ user }: { user: User }) {
  const supabase = useSupabaseBrowser();
  const t = useTranslations("profileMenu");
  const router = useRouter();

  const username: string | null = user.user_metadata["username"];

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

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
        {username ? (
          <DropdownMenuItem asChild>
            <Link href={`/profile/${username.replace("@", "")}`}>
              {t("myProfile")}
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between" onClick={signOut}>
          <span>{t("signOut")}</span>
          <LogOutIcon className="h-4 w-4 dark:text-white" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
