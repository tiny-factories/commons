import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { getPosts, insertPost } from '@/db/index';
import ogs from 'open-graph-scraper-lite';

const handler = nc();

handler.use(all);

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
  const posts = await getPosts(
    req.db,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 30) : undefined,
  );

  if (req.query.from && posts.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of posts
    res.setHeader('cache-control', `public, max-age=${maxAge}`);
  }

  res.send({ posts });
});

handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).send('unauthenticated');
  }

  if (!req.body.source) return res.status(400).send('You must write something');

  // TESTING

  // TESTING END

  const post = await insertPost(req.db, {
    content: req.body.content,
    source: req.body.source,
    labels: req.body.labels,
    creatorId: req.user._id,
  });

  return res.json({ post });
});

export default handler;
