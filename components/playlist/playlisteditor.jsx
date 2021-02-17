import React, { useState } from "react";
import { useCurrentUser } from "@/hooks/index";

export default function PlaylistEditor() {
  const [user] = useCurrentUser();

  const [msg, setMsg] = useState(null);

  {
    /* if (!user) {
    return (
      <div style={{ color: "#555", textAlign: "center" }}>
        Please sign in to create playlist
      </div>
    );
  } */
  }

  async function handleSubmit(e) {
    // console.log(e);
    e.preventDefault();
    const body = {
      name: e.currentTarget.name.value,
    };
    if (!e.currentTarget.name.value) return;

    e.currentTarget.name.value = "";

    const res = await fetch("/api/playlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg("Playlist Created");
      // console.log(body);
      setTimeout(() => setMsg(null), 5000);
    }
  }

  return (
    <>
      <p style={{ color: "#0070f3", textAlign: "center" }}>{msg}</p>
      <form
        onSubmit={handleSubmit}
        style={{ flexDirection: "row" }}
        autoComplete="off"
      >
        <label htmlFor="source">
          <input name="name" type="text" placeholder="playlist name" />
        </label>

        <button type="submit" style={{ marginLeft: "0.5rem" }}>
          Create Playlist
        </button>
      </form>
    </>
  );
}
