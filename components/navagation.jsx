import React from 'react';
import { useCurrentUser } from '@/hooks/index';
import Link from 'next/link';

export default function Navagation({ post }) {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
  };
  return (
    <>
      <style jsx>
        {`
          nav {
            max-width: 1040px;
            margin: auto;
            padding: 1rem 2rem;
          }
          nav div {
            float: right;
          }
          nav div a {
            font-size: 0.9rem;
            margin-left: 1rem;
          }
          nav h1 {
            font-size: 1rem;
            color: #444;
            margin: 0;
            font-weight: 700;
            float: left;
          }
          nav:after {
            content: '';
            clear: both;
            display: table;
          }
        `}
      </style>
      <nav>
        {!user ? (
          <>
            <Link href="/">
              <a>
                <h1>Commons</h1>
              </a>
            </Link>
            <div>
              <Link href="/login">
                <a>Sign in</a>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img src="" />
              </a>
            </Link>
            <div>
              <input
                type="text"
                autoComplete="off"
                placeholder="search movies..."
                aria-label="Search"
              />
            </div>
          </>
        )}
      </nav>
    </>
  );
}
