import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import Link from "next/link";

import supabase, { type Tables } from "@/utils/supabase";
import { transformSecondsToTimeString } from "@/utils/helperFunctions";

interface Props {
  highline: Tables["highline"]["Row"];
}

const PAGE_SIZE = 5;

function Comments({ highline }: Props) {
  const fetchComments = async ({ pageParam = 1 }) => {
    const { data } = await supabase
      .from("entry")
      .select("comment, created_at, instagram")
      .match({ highline_id: highline.id })
      .order("created_at", { ascending: true })
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
    return null;
  }

  if (isError) {
    return <div>OOPS! Aconteceu algum error. Tente recarregar a página.</div>;
  }

  return (
    <div>
      {comments.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page?.map((comment, idx) => (
            <article
              key={`comment-${comment.created_at}`}
              className="py-6 text-base bg-white border-t first:border-t-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Link
                    href={`https://www.instagram.com/${comment.instagram.replace(
                      "@",
                      ""
                    )}/`}
                    target="_blank"
                    className="inline-flex items-center mr-3 text-sm truncate font-medium text-blue-700 dark:text-blue-500"
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
          className="mt-2 text-center text-sm font-medium cursor-pointer text-blue-600 dark:text-blue-500"
        >
          carregar mais
        </button>
      )}
    </div>
  );
}

export default Comments;
