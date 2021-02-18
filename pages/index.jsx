import React from "react";
import { useCurrentUser } from "@/hooks/index";
import Marketing from "@/components/marketing";
import PostEditor from "@/components/post/editor";
import Posts from "@/components/post/posts";
import Link from "next/link";

const IndexPage = () => {
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
      <div style={{ marginBottom: "2rem" }}></div>
      <div>
        {!user ? (
          <>
            <Marketing />
          </>
        ) : (
          <>
            <h3>
              All posts from the Web{" "}
              <span role="img" aria-label="Earth">
                🌎
              </span>
            </h3>
            <PostEditor />
            <Posts />
          </>
        )}
      </div>
    </>
  );
};

export default IndexPage;
