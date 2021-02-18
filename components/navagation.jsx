import React from "react";
import { useCurrentUser } from "@/hooks/index";
import Link from "next/link";

export default function Navagation({ post }) {
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
          nav {
            max-width: 850px;
            height: 36px;
            margin: auto;
            margin-top: 30px;
            background: #ffffff;
            border: 1px solid #000000;
          }
          nav .logo {
            float: left;
            width: 36px;
            height: 36px;
            border: 1px solid #000000;
            box-sizing: border-box;
          }
          .links {
            float: right;
            display: inline-block;
          }
          .search {
            text-align: left;
            display: inline-block;
             {
              /* border: 1px solid #000000; */
            }
          }
          .search input {
            width: 100%;
          }
          nav div a {
            font-size: 0.9rem;
          }

          nav:after {
            content: "";
            clear: both;
            display: table;
          }
        `}
      </style>
      <nav>
        {!user ? (
          <>
            <div className="logo">
              <Link href="/">
                <a>L</a>
              </Link>
            </div>
            <div className="search">
              <input
                type="text"
                autoComplete="off"
                placeholder="search movies..."
                aria-label="Search"
              />
            </div>
            <div className="links">
              <Link href="/login">
                <a>
                  <button>Sign in</button>
                </a>
              </Link>
              <Link href="/signup">
                <a>
                  <button>Sign up</button>
                </a>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="logo">
              <Link href="/">
                <a>L</a>
              </Link>
            </div>
            <div className="search">
              <input
                type="text"
                autoComplete="off"
                placeholder="search movies..."
                aria-label="Search"
              />
            </div>
            <div className="links">
              <Link href="/create">
                <a>
                  <button>+</button>
                </a>
              </Link>
              <Link href="/logout">
                <a>
                  <button>Log Out</button>
                </a>
              </Link>
            </div>
          </>
        )}
      </nav>
    </>
  );
}
