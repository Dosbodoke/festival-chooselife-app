import Image from "next/image";

interface Props {
  username: string;
}

function UserHeader({ username }: Props) {
  return (
    <header className="flex max-w-screen-md gap-4 rounded-xl border border-gray-200 bg-white px-2 py-4 shadow dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
      <Image
        src={"/default-profile-picture.png"}
        width={128}
        height={128}
        alt="Profile picture"
      />
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">@{username}</h1>
        <div className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-500 dark:bg-red-100 dark:text-red-700">
          Este usuário não é verificado
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
