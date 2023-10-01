"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { usePathname, useRouter } from "@/navigation";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(value: string) {
    startTransition(() => {
      router.replace(pathname, { locale: value });
    });
  }

  return (
    <Select onValueChange={onSelectChange} defaultValue={locale}>
      <SelectTrigger className="w-[142px] bg-white dark:bg-gray-700">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("label")}</SelectLabel>
          {(["pt", "en"] as const).map((cur) => (
            <SelectItem key={cur} value={cur}>
              {cur == "pt" ? "🇧🇷 Português" : "🇺🇸 English"}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
