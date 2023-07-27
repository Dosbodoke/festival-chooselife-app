"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { ArrowLongLeftIcon } from "@/assets";

function GoBack() {
  const t = useTranslations("highline");

  return (
    <Link href={"/"} className="flex gap-1">
      <ArrowLongLeftIcon className="inline-block h-6 w-6" />
      {t("goBack")}
    </Link>
  );
}

export default GoBack;
