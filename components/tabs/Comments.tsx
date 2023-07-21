import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import Link from "next/link";

import supabase, { type Tables } from "@/utils/supabase";
import { transformSecondsToTimeString } from "@/utils/helperFunctions";
import LoadingSkeleton from "./Ranking/LoadingSkeleton";

interface Props {
  highline: Tables["highline"]["Row"];
}

const PAGE_SIZE = 5;

function Comments({ highline }: Props) {
  const fetchComments = async ({ pageParam = 1 }) => {
    const { data } = await supabase
      .from("entry")
      .select("comment, created_at, instagram")
      .not("comment", "eq", "")
      .not("comment", "eq", null)
      .match({ highline_id: highline.id })
      .order("created_at", { ascending: false })
      .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);

    return data;
  };

  const {
    data: comments,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["entry", highline.id, "comments"],
    ({ pageParam = 1 }) => fetchComments({ pageParam }),
    {
      enabled: !!highline.id,
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return lastPage?.length === PAGE_SIZE ? nextPage : undefined;
      },
    }
  );

  if (isLoading) {
    // TODO: Create a different loading skeleton for comment section
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <div>OOPS! Aconteceu algum error. Tente recarregar a página.</div>;
  }

  return (
    <>
      {comments.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page?.map((comment, idx) => (
            <article
              key={`comment-${comment.created_at}`}
              className="bg border-t border-gray-200 py-6 text-base first:border-t-0 dark:border-gray-700"
            >
              <footer className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Link
                    href={`https://www.instagram.com/${comment.instagram.replace(
                      "@",
                      ""
                    )}/`}
                    target="_blank"
                    className="mr-3 inline-flex items-center truncate text-sm font-medium text-blue-700 dark:text-blue-500"
                  >
                    {comment.instagram}
                  </Link>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(comment.created_at).toLocaleString("pt-BR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "America/Sao_Paulo",
                    })}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400"></p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">
                {comment.comment}
              </p>
            </article>
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isLoading}
          className="mt-2 cursor-pointer text-center text-sm font-medium text-blue-600 dark:text-blue-500"
        >
          carregar mais
        </button>
      )}
    </>
  );
}

export default Comments;
