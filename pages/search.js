import useSWR from 'swr';
import React from 'react';
import { useCurrentUser } from '@/hooks/index';
import Posts from '@/components/post/posts';
import Link from 'next/link';

function SearchPage({ data }) {
  // Render data...
  console.log(data);

  return (
    <>
      <h1>Search Page</h1>
      <hr />
      <form>
        <input type="text" autoComplete="off" placeholder="search movies..." aria-label="Search" />
      </form>
      <button type="submit">search</button>
      <hr />
      // Move this to antoher function // // https://www.youtube.com/watch?v=Mfp94RjugWQ
      data.map((i) => (
      <li>
        <Link href={`${i.source}`}>{i.content}</Link>
      </li>
      ))
    </>
  );
}

// This gets called on every request
export async function getServerSideProps(req) {
  // Fetch data from external API
  const handleSubmit = '';
  const makeURL = '?term=earth';

  const res = await fetch(`http://localhost:3000/api/search${makeURL}`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

export default SearchPage;
