import React from "react";
import { useSWRInfinite } from "swr";
import Link from "next/link";
import { useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";
import { defaultProfilePicture } from "@/lib/default";

function Playlist({ playlist }) {
  const user = useUser(playlist.creatorId);
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
        {/* {user && <b>{user.name}</b>} */}
        <p>{playlist.name}</p>
      </div>
    </>
  );
}

const PAGE_SIZE = 10;

export function usePlaylistPages({ creatorId } = {}) {
  return useSWRInfinite(
    (index, previousPlaylistData) => {
      // reached the end
      if (previousPlaylistData && previousPlaylistData.playlists.length === 0)
        return null;

      // first page, previousPageData is null
      if (index === 0) {
        return `/api/playlists?limit=${PAGE_SIZE}${
          creatorId ? `&by=${creatorId}` : ""
        }`;
      }

      // using oldest posts createdAt date as cursor
      // We want to fetch posts which has a datethat is
      // before (hence the .getTime() - 1) the last post's createdAt
      const from = new Date(
        new Date(
          previousPaylistData.playlists[
            previousPlaylistData.playlists.length - 1
          ].createdAt
        ).getTime() - 1
      ).toJSON();

      return `/api/playlists?from=${from}&limit=${PAGE_SIZE}${
        creatorId ? `&by=${creatorId}` : ""
      }`;
    },
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );
}

export default function Playlists({ creatorId }) {
  const { data, error, size, setSize } = usePlaylistPages({ creatorId });

  const playlists = data
    ? data.reduce((acc, val) => [...acc, ...val.playlists], [])
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0].playlists?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.playlists.length < PAGE_SIZE);

  return (
    <div>
      {playlists.map((playlist) => (
        <Playlist key={playlist._id} playlist={playlist} />
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
