import React from "react";
import { useSWRInfinite } from "swr";
import Link from "next/link";
import { useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";
import { defaultProfilePicture } from "@/lib/default";

function Tag({ tag }) {
  const user = useUser(tag.creatorId);
  return (
    <>
      <style jsx>
        {`
          div {
            padding: 0.5rem;
            margin-bottom: 0.5rem;
            background: #ffffff;
            border: 1px solid #000000;
            box-sizing: border-box;
            border-radius: 1px;
          }
          div:hover {
          }
          small {
            color: #777;
          }
        `}
      </style>
      <div>
        <small>{tag.name}</small>
      </div>
    </>
  );
}

const PAGE_SIZE = 10;

export function useTagPages({ creatorId } = {}) {
  return useSWRInfinite(
    (index, previousTagData) => {
      // reached the end
      if (previousTagData && previousTagData.tags.length === 0) return null;

      // first page, previousPageData is null
      if (index === 0) {
        return `/api/tags?limit=${PAGE_SIZE}${
          creatorId ? `&by=${creatorId}` : ""
        }`;
      }

      // using oldest posts createdAt date as cursor
      // We want to fetch posts which has a datethat is
      // before (hence the .getTime() - 1) the last post's createdAt
      const from = new Date(
        new Date(
          previousTagData.tags[previousTagData.tags.length - 1].createdAt
        ).getTime() - 1
      ).toJSON();

      return `/api/tags?from=${from}&limit=${PAGE_SIZE}${
        creatorId ? `&by=${creatorId}` : ""
      }`;
    },
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );
}

export default function tags({ creatorId }) {
  const { data, error, size, setSize } = useTagPages({ creatorId });

  const tags = data ? data.reduce((acc, val) => [...acc, ...val.tags], []) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0].tags?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.tags.length < PAGE_SIZE);

  return (
    <div>
      {tags.map((tag) => (
        <Tag key={tag._id} tag={tag} />
      ))}
      {!isReachingEnd && (
        <button
          type="button"
          style={{
            background: "transparent",
            color: "#000",
          }}
          onClick={() => setSize(size + 1)}
          disabled={isReachingEnd || isLoadingMore}
        >
          {isLoadingMore ? ". . ." : "load more"}
        </button>
      )}
    </div>
  );
}
