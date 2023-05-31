import Image from "next/image";

function HighlineImage({ coverImageId }: { coverImageId: string | null }) {
  return (
    <Image
      src={
        coverImageId
          ? `${
              process.env.NEXT_PUBLIC_SUPABASE_URL
            }/storage/v1/object/public/${"images"}/${coverImageId}`
          : "/chooselife-black.png"
      }
      alt="highline"
      fill
      priority
      className={`object-center ${
        coverImageId ? "object-cover" : "object-contain dark:invert"
      }`}
    />
  );
}

export default HighlineImage;
