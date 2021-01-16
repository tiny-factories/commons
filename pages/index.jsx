import React from 'react';
import { useCurrentUser } from '@/hooks/index';
import PostEditor from '@/components/post/editor';
import Posts from '@/components/post/posts';
import Link from 'next/link';

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
      <div style={{ marginBottom: '2rem' }}>
        {!user ? (
          <>
            <h2 style={{ paddingTop: '100px' }}>
              A social reading space at a different pace of conversation, coming in February of
              2021.
            </h2>
            <p>
              In the wake of too many video calls and a lack of in-person conversation, we are
              experimenting with a social reading experience. So we can better stay connected and in
              each other's peripheral vision without digital fatigue.
            </p>
            <div style={{ display: 'inline', align: 'center', justifyContent: 'center' }}>
              <Link href="https://commons.substack.com/embed">
                <button style={{ marginLeft: '0.5rem', display: 'inline' }}>Newletter </button>
              </Link>

              <Link href="https://futureland.tv/gndclouds/the-commons">
                <button style={{ marginLeft: '0.5rem', display: 'inline' }}>
                  Development Log
                  {' '}
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2>
              Hello,
              {user ? user.name : 'stranger'}
            </h2>
            <p>Have a wonderful day.</p>
          </>
        )}
      </div>
      <div>
        {!user ? (
          <>
            <div />
          </>
        ) : (
          <>
            <h3>
              All posts from the Web
              {' '}
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
