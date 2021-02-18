import React, { useState } from "react";
import { useCurrentUser } from "@/hooks/index";
import Tags from "@/components/tag/tags";
import Playlists from "@/components/playlist/playlists";

export default function PostEditor() {
  const [user] = useCurrentUser();

  const [msg, setMsg] = useState(null);

  if (!user) {
    return (
      <div style={{ color: "#555", textAlign: "center" }}>
        Please sign in to post
      </div>
    );
  }

  async function handleSubmit(e) {
    // console.log(e);
    e.preventDefault();
    const body = {
      source: e.currentTarget.source.value,
      labels: e.currentTarget.labels.value,
    };
    if (!e.currentTarget.source.value) return;

    e.currentTarget.source.value = "";
    e.currentTarget.labels.value = "";

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg("Posted!");
      // console.log(body);
      setTimeout(() => setMsg(null), 5000);
    }
  }

  return (
    <>
      <style jsx>
        {`
          div {
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
            padding: 1.5rem;
            margin-bottom: 2rem;
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
      <p style={{ color: "#0070f3", textAlign: "center" }}>{msg}</p>
      <div>
        <form
          onSubmit={handleSubmit}
          style={{ flexDirection: "row" }}
          autoComplete="off"
        >
          <label htmlFor="source">
            <input name="source" type="url" placeholder="https://" />
          </label>
          <label htmlFor="labels">
            <input name="labels" type="text" placeholder="matcha, tea, japan" />
          </label>
          Tags:
          <Tags />
          Playlist:
          <Playlists />
          <button type="submit" style={{ marginLeft: "0.5rem" }}>
            Save
          </button>
        </form>
      </div>
    </>
  );
}
