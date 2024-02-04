import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

interface Props {
  username: string;
  className?: string;
}
function UsernameLink({ username, className }: Props) {
  return (
    <Link
      href={`/profile/${username.replace("@", "")}`}
      target="_blank"
      className={cn(
        "truncate font-medium text-blue-700 dark:text-blue-500",
        className
      )}
    >
      {username}
    </Link>
  );
}

export default UsernameLink;
