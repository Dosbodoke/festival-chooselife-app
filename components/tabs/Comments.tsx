"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useFormatter } from "next-intl";
import React from "react";

import useSupabaseBrowser from "@/utils/supabase/client";
import type { Tables } from "@/utils/supabase/database.types";

import LoadingSkeleton from "./Ranking/LoadingSkeleton";
import UsernameLink from "./Ranking/UsernameLink";
import SeeMore from "./SeeMore";

interface Props {
  highline: Tables["highline"]["Row"];
}

const PAGE_SIZE = 5;

function Comments({ highline }: Props) {
  const supabase = useSupabaseBrowser();
  const format = useFormatter();

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
          {page?.map((comment) => (
            <article
              key={`comment-${comment.created_at}`}
              className="bg border-t border-gray-200 py-6 text-base first:border-t-0 dark:border-gray-700"
            >
              <footer className="mb-2 flex items-center justify-between">
                <div className="flex items-end gap-3">
                  <UsernameLink username={comment.instagram} />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format.dateTime(new Date(comment.created_at), {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
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
        <SeeMore onClick={() => fetchNextPage()} disabled={isLoading} />
      )}
    </>
  );
}

export default Comments;
