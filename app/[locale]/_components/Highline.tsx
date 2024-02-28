import { ArrowRightIcon } from "@radix-ui/react-icons";
import { UnfoldHorizontalIcon, UnfoldVerticalIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/navigation";
import type { Tables } from "@/utils/supabase/database.types";

import HighlineImage from "../../../components/HighlineImage";
import { FavoriteHighline } from "./FavoriteHighline";

interface Props {
  highline: Tables["highline"]["Row"] & { is_favorite: boolean };
}

export function Highline({ highline }: Props) {
  const t = useTranslations("home");

  return (
    <Card className="flex w-full max-w-[24rem] flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <HighlineImage coverImageId={highline.cover_image} />
        <FavoriteHighline id={highline.id} isFavorite={highline.is_favorite} />
      </div>
      <CardHeader className="space-y-1 pb-3">
        <CardTitle className="text-xl">{highline.name}</CardTitle>
        <div className="flex items-baseline gap-2 space-y-2 text-sm text-muted-foreground">
          <div className="flex gap-2">
            <UnfoldVerticalIcon className="h-4 w-4" />{" "}
            {highline.height.toFixed(0)}m
          </div>
          <div className="flex gap-2">
            <UnfoldHorizontalIcon className="h-4 w-4" />{" "}
            {highline.lenght.toFixed(0)}m
          </div>
        </div>
      </CardHeader>
      {highline.description ? (
        <CardContent className="scrollbar mb-6 mr-2 max-h-20 overflow-auto pb-0 pr-4">
          <p className="text-sm text-muted-foreground">
            {highline.description}
          </p>
        </CardContent>
      ) : null}
      <CardFooter className="mt-auto">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/${highline.id}`}>
            {t("seeDetails")}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
