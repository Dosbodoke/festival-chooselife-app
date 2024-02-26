import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { usePathname, useRouter } from "@/navigation";

export function useLoginModal() {
  const searchParams = useSearchParams();
  const open = searchParams?.get("loginModal") === "open";
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function toggleLoginModal(status: "open" | "closed") {
    router.push(pathname + "?" + createQueryString("loginModal", status));
  }

  return { open, toggleLoginModal };
}
