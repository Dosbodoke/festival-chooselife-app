"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useFormatter } from "next-intl";
import React from "react";

import type { Highline } from "@/app/actions/getHighline";
import useSupabaseBrowser from "@/utils/supabase/client";

import LoadingSkeleton from "./Ranking/LoadingSkeleton";
import UsernameLink from "./Ranking/UsernameLink";
import SeeMore from "./SeeMore";

interface Props {
  highline: Highline;
}

const PAGE_SIZE = 5;

function Comments({ highline }: Props) {
  const supabase = useSupabaseBrowser();
  const format = useFormatter();

  async function fetchComments({ pageParam }: { pageParam: number }) {
    const { data } = await supabase
      .from("entry")
      .select("comment, created_at, instagram")
      .not("comment", "eq", "")
      .not("comment", "eq", null)
      .match({ highline_id: highline.id })
      .order("created_at", { ascending: false })
      .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);

    return data;
  }

  const {
    data: comments,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["entry", highline.id, "comments"],
    queryFn: ({ pageParam }) => fetchComments({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const nextPage = allPages.length + 1;
      return lastPage?.length === PAGE_SIZE ? nextPage : undefined;
    },
    enabled: !!highline.id,
  });

  if (isLoading) {
    // TODO: Create a different loading skeleton for comment section
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <div>OOPS! Aconteceu algum error. Tente recarregar a página.</div>;
  }

  return (
    <div className="space-y-4">
      {comments?.pages.map((page) =>
        page?.map((comment) => (
          <div
            className="flex items-start space-x-4"
            key={`comment-${comment.created_at}`}
          >
            {/* <div className="relative flex-shrink-0">
              <Image
                src={"/default-profile-picture.png"}
                fill={true}
                alt="Profile picture"
                className="h-12 w-12 rounded-full"
              />
            </div> */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <UsernameLink username={comment.instagram} />
                {/* <h4 className="text-sm font-semibold">{comment.instagram}</h4> */}
                <span className="text-xs text-muted-foreground">
                  {format.relativeTime(new Date(comment.created_at))}
                </span>
              </div>
              <p className="text-sm leading-none text-muted-foreground">
                {comment.comment}
              </p>
            </div>
          </div>
        ))
      )}
      {hasNextPage && (
        <SeeMore onClick={() => fetchNextPage()} disabled={isLoading} />
      )}
    </div>
  );
}

export default Comments;
