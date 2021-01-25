import Link from 'next/link';

export default function Post({ post }) {
  return (
    <li>
      <Link href="https://gndclouds.cc">
        <a>{post.content}</a>
        source
      </Link>
    </li>
  );
}
