import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/index";
import Navagation from "@/components/navagation";
import Footer from "@/components/footer";

export default function Layout({ children }) {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
  };
  return (
    <>
      <style jsx global>
        {`
          a {
            text-decoration: none !important;
            cursor: pointer;
            color: #0070f3;
          }
          a:hover {
            color: #0366d6;
          }
          body {
            margin: 0;
            padding: 0;
            color: #111;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
              "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
              "Helvetica Neue", sans-serif;
            background-color: #fff;
          }
          h2 {
          }
          label {
            display: flex;
            margin-bottom: 0.5rem;
            align-items: center;
            width: 100%;
          }
          form {
            margin-bottom: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          input,
          textarea {
            font-family: monospace;
            background-color: transparent;
            outline: 0px;
            padding: 10px 25px;
            border: none;
          }
          button {
            color: #000000;
            background: #ffffff;
            border: 1px solid #000;
            box-sizing: border-box;
            margin-bottom: 0.5rem;
            cursor: pointer;
            padding: 10px 25px;
          }
          button:hover,
          button:active {
          }

          main {
            padding: 1rem;
            max-width: 1040px;
            margin: 0 auto;
          }
          footer {
            text-align: center;
            font-size: 0.8rem;
            margin-top: 1rem;
            padding: 3rem;
            color: #888;
          }
        `}
      </style>
      <Head>
        <title>Commons</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="A social reading space at a different pace of conversation, coming in February of 2021"
        />
        <meta property="og:title" content="Commons" />
        <meta
          property="og:description"
          content="A social reading space at a different pace of conversation, coming in February of 2021"
        />
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        />
        <script
          async
          defer
          data-website-id="e51c760e-6e4d-4d60-a3f5-2d79fcf21d81"
          src="https://umami.tinyfactories.space/umami.js"
        ></script>
      </Head>
      <header></header>
      <Navagation />

      <main>{children}</main>
      <Footer />
    </>
  );
}
