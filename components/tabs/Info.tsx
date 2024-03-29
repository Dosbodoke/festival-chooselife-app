import { useTranslations } from "next-intl";

import type { Tables } from "@/utils/supabase/database.types";

interface Props {
  highline: Tables["highline"]["Row"];
}

function Info({ highline }: Props) {
  const t = useTranslations("highline.tabs.informations");

  return (
    <div>
      <InfoItem
        label={t("height")}
        value={`${highline.height} ${t("meters")}`}
      />
      <InfoItem
        label={t("length")}
        value={`${highline.lenght} ${t("meters")}`}
      />
      <InfoItem label={t("mainWebbing")} value={highline.main_webbing} />
      <InfoItem label={t("backupWebbing")} value={highline.backup_webbing} />
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-muted-foreground">{label}:</div>
      <hr className="flex-1 border-t border-dashed border-muted-foreground" />
      <div className="text-sm font-medium leading-none">{value}</div>
    </div>
  );
}

export default Info;
