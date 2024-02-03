import { cookies } from "next/headers";
import Image from "next/image";

import { useSupabaseServer } from "@/utils/supabase/server";

interface HighlinePropsImage {
  coverImageId: string | null;
  width?: number;
  height?: number;
}

function HighlineImage({ coverImageId, width, height }: HighlinePropsImage) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  if (!coverImageId) {
    return (
      <Image
        src={"/chooselife-black.png"}
        alt="Chooselife Icon"
        fill
        priority
        className="object-contain object-center dark:invert"
      />
    );
  }

  const hasDefinedDimensions = width && height;

  const {
    data: { publicUrl: URL },
  } = supabase.storage.from("images").getPublicUrl(
    `${coverImageId}`,
    hasDefinedDimensions
      ? {
          transform: {
            width,
            height,
          },
        }
      : undefined
  );

  if (hasDefinedDimensions) {
    return (
      <Image
        src={URL}
        alt="Image of the Highline"
        width={width}
        height={height}
        priority
        className="object-cover object-center"
      />
    );
  }

  return (
    <Image
      src={URL}
      alt="Image of the Highline"
      fill
      priority
      className="object-cover object-center"
    />
  );
}

export default HighlineImage;
