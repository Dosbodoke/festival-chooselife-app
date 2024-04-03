import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { usePathname, useRouter } from "@/navigation";

export const useQueryString = () => {
  const searchParams = useSearchParams();
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

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);

      return params.toString();
    },
    [searchParams]
  );

  function pushQueryParam(name: string, value: string) {
    router.push(pathname + "?" + createQueryString(name, value));
  }

  function replaceQueryParam(name: string, value: string) {
    router.replace(pathname + "?" + createQueryString(name, value));
  }

  function deleteQueryParam(name: string) {
    router.push(pathname + "?" + deleteQueryString(name));
  }

  return {
    pushQueryParam,
    replaceQueryParam,
    deleteQueryParam,
    searchParams,
  };
};
