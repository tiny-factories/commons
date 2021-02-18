import React from "react";
import { useCurrentUser } from "@/hooks/index";
import Link from "next/link";

export default function Marketing({ post }) {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
  };
  return (
    <>
      <style jsx>
        {`
          .footer {
            padding: 0;
            margin-top: 20px;
            list-style: none;
            text-align: center;
          }

          .footer-item {
            display: inline-block;
            margin-right: 1em;
          }

          .footer-item a[href]:not(:hover) {
            text-decoration: none;
          }

          .footer-item a[href]:hover {
            text-decoration: none;
            font-weight: 500;
          }

          .footer-item-active {
            font-weight: 500;
          }
        `}
      </style>
      <div className="">
        <>
          <h2 style={{ paddingTop: "100px" }}>
            A social reading space at a different pace of conversation, coming
            in February of 2021.
          </h2>
          <p>
            In the wake of too many video calls and a lack of in-person
            conversation, we are experimenting with a social reading experience.
            So we can better stay connected and in each other's peripheral
            vision without digital fatigue.
          </p>
          <div
            style={{
              display: "inline",
              align: "center",
              justifyContent: "center",
            }}
          >
            <Link href="https://commons.substack.com/embed">
              <button style={{ marginLeft: "0.5rem", display: "inline" }}>
                Newletter{" "}
              </button>
            </Link>

            <Link href="https://futureland.tv/gndclouds/the-commons">
              <button style={{ marginLeft: "0.5rem", display: "inline" }}>
                Development Log{" "}
              </button>
            </Link>
          </div>
          <h2>Title</h2>
          <h2>Title 2</h2>

          <h2>Title 3</h2>
        </>
      </div>
    </>
  );
}
