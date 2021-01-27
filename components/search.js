import React from 'react';
import Link from 'next/link';

function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://.../data');
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Page;
