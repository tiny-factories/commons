import React, { useState } from 'react';
import { useCurrentUser } from '@/hooks/index';

export default function PostEditor() {
  const [user] = useCurrentUser();

  const [msg, setMsg] = useState(null);

  if (!user) {
    return <div style={{ color: '#555', textAlign: 'center' }}>Please sign in to post</div>;
  }

  async function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    const body = {
      content: e.currentTarget.content.value,
      source: e.currentTarget.source.value,
    };
    if (!e.currentTarget.content.value) return;
    e.currentTarget.content.value = '';
    e.currentTarget.source.value = '';
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg('Posted!');
      console.log(body);
      setTimeout(() => setMsg(null), 5000);
    }
  }

  return (
    <>
      <p style={{ color: '#0070f3', textAlign: 'center' }}>{msg}</p>
      <form onSubmit={handleSubmit} style={{ flexDirection: 'row' }} autoComplete="off">
        <label htmlFor="name">
          <input name="content" type="text" placeholder="Title" />
        </label>
        <label htmlFor="source">
          <input name="source" type="url" placeholder="https://" />
        </label>

        <button type="submit" style={{ marginLeft: '0.5rem' }}>
          Post
        </button>
      </form>
    </>
  );
}
