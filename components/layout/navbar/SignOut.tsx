"use client";

import { useTranslations } from "next-intl";

import { LogOutIcon } from "@/assets";
import { DropdownMenuItem } from "@/components/ui/DropdownMenu";
import { useRouter } from "@/navigation";
import supabase from "@/utils/supabase";

function SignOut() {
  const t = useTranslations("profileMenu");
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <DropdownMenuItem className="flex justify-between" onClick={signOut}>
      <span>{t("signOut")}</span>
      <LogOutIcon className="h-4 w-4 dark:text-white" />
    </DropdownMenuItem>
  );
}

export default SignOut;
