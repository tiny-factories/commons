import useSWR from 'swr';
import React from 'react';
import { useCurrentUser } from '@/hooks/index';
import PostEditor from '@/components/post/editor';
import Posts from '@/components/post/posts';
import Link from 'next/link';
import Search from '../components/search';

const fetcher = (url) => fetch(url).then((res) => res.json());

const SearchPage = () => {
  const { data, error } = useSWR('/api/search?term=architecture', fetcher); // pass in data
  console.log(data);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <ul>
        {data.map((p, i) => (
          <Search />
        ))}
      </ul>
    </>
  );
};

export default SearchPage;
