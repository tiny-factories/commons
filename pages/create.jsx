import React from "react";
import { useCurrentUser } from "@/hooks/index";
import PostEditor from "@/components/post/editor";

import TagEditor from "@/components/tag/tageditor";
import PlaylistEditor from "@/components/playlist/playlisteditor";
import Tags from "@/components/tag/tags";
import Playlists from "@/components/playlist/playlists";

import Link from "next/link";

const CreatePage = () => {
  const [user] = useCurrentUser();

  return (
    <>
      <style jsx>
        {`
          p {
            text-align: center;
            color: #888;
          }
          h3 {
            color: #555;
          }
        `}
      </style>
      <div style={{ marginBottom: "2rem" }}>
        <>
          <PostEditor />
        </>
        <>
          <h2 style={{ paddingTop: "100px" }}>
            Test Page for Creating and Displaying Lable and playlists
          </h2>

          <h2 style={{ paddingTop: "100px" }}>Tags</h2>
          <TagEditor />
          <Tags />

          <h2 style={{ paddingTop: "100px" }}>Playlists </h2>
          <PlaylistEditor />
          <Playlists />
        </>
      </div>
    </>
  );
};

export default CreatePage;
