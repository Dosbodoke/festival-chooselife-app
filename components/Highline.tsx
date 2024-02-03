import { ArrowRightIcon, HeartIcon } from "@radix-ui/react-icons";
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

import HighlineImage from "./HighlineImage";

interface Props {
  highline: Tables["highline"]["Row"];
}

function Highline({ highline }: Props) {
  const t = useTranslations("home");

  return (
    <Card className="flex w-full max-w-[24rem] flex-col">
      <div className="relative h-48 w-full">
        <HighlineImage
          coverImageId={highline.cover_image}
          width={384}
          height={192}
        />
        <Button
          className="absolute right-2 top-2"
          size="icon"
          variant="outline"
        >
          <HeartIcon className="h-6 w-6" />
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{highline.name}</CardTitle>
      </CardHeader>
      {highline.description ? (
        <CardContent className="scrollbar mb-6 mr-2 max-h-28 overflow-auto pb-0 pr-4">
          <p className="text-sm">{highline.description}</p>
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

export default Highline;
