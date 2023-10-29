import Image from "next/image";
import { useTranslations } from "next-intl";

import { Database } from "@/utils/database.types";

interface Props {
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
  username: string;
}

function UserHeader({ profile, username }: Props) {
  const t = useTranslations("profile.header");

  if (!profile) {
    return (
      <header className="flex max-w-screen-md gap-4 rounded-xl border border-gray-200 bg-white px-2 py-4 shadow dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
        <Image
          src={"/default-profile-picture.png"}
          width={128}
          height={128}
          alt="Profile picture"
        />
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">@{username}</h1>
          <div className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-500 dark:bg-red-100 dark:text-red-700">
            {t("notVerified")}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="max-w-screen-md space-y-2 rounded-xl border border-gray-200 bg-white px-2 py-4 shadow dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
      <div className="h- flex gap-4">
        <div className="relative h-24 w-24 sm:h-32 sm:w-32">
          <Image
            src={"/default-profile-picture.png"}
            fill={true}
            alt="Profile picture"
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">@{username}</h1>
        </div>
      </div>
      <div>
        <p className="font-medium">{profile.name}</p>
        <p>{profile.description}</p>
      </div>
    </header>
  );
}

export default UserHeader;
