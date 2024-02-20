import Image from "next/image";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { Database } from "@/utils/supabase/database.types";

interface Props {
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
  username: string;
}

function UserHeader({ profile, username }: Props) {
  const t = useTranslations("profile.header");

  if (!profile) {
    return (
      <Card>
        <CardContent className="flex gap-4 space-y-2 overflow-hidden px-2 py-4">
          <Image
            src={"/default-profile-picture.png"}
            width={128}
            height={128}
            alt="Profile picture"
          />
          <div className="space-y-3">
            <h1 className="text-xl font-semibold">@{username}</h1>
            <div className="rounded-lg bg-red-50 p-2 text-center text-sm text-red-500 dark:bg-red-100 dark:text-red-700 md:p-4">
              {t("notVerified")}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-2 overflow-hidden px-2 py-4">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 sm:h-32 sm:w-32">
            <Image
              src={profile.profile_picture || "/default-profile-picture.png"}
              fill={true}
              alt="Profile picture"
              className="rounded-full"
            />
          </div>
          <div className="mt-4 flex-1">
            <h1 className="flex-1 text-xl font-semibold">{profile.name}</h1>
            <p className="text-muted-foreground">@{username}</p>
          </div>
        </div>
        <div>
          <p>{profile.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserHeader;
