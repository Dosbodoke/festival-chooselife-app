import { useTranslations } from "next-intl";

import { ArrowLongLeftIcon } from "@/assets";
import { Link } from "@/navigation";

function GoBack() {
  const t = useTranslations("profile");

  return (
    <Link href={"/"} className="flex gap-1">
      <ArrowLongLeftIcon className="inline-block h-6 w-6" />
      {t("goBack")}
    </Link>
  );
}

export default GoBack;
