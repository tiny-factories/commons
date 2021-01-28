import React, { useState } from 'react';
import { useCurrentUser } from '@/hooks/index';

export default function PostEditor() {
  const [user] = useCurrentUser();

  const [msg, setMsg] = useState(null);

  if (!user) {
    return <div style={{ color: '#555', textAlign: 'center' }}>Please sign in to post</div>;
  }

  async function handleSubmit(e) {
    // console.log(e);
    e.preventDefault();
    const body = {
      source: e.currentTarget.source.value,
      labels: e.currentTarget.labels.value,
    };
    if (!e.currentTarget.source.value) return;

    e.currentTarget.source.value = '';
    e.currentTarget.labels.value = '';

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg('Posted!');
      // console.log(body);
      setTimeout(() => setMsg(null), 5000);
    }
  }

  return (
    <>
      <p style={{ color: '#0070f3', textAlign: 'center' }}>{msg}</p>
      <form onSubmit={handleSubmit} style={{ flexDirection: 'row' }} autoComplete="off">
        <label htmlFor="source">
          <input name="source" type="url" placeholder="https://" />
        </label>
        <label htmlFor="labels">
          <input name="labels" type="text" placeholder="matcha, tea, japan" />
        </label>
        <button type="submit" style={{ marginLeft: '0.5rem' }}>
          Save
        </button>
      </form>
    </>
  );
}
