import nc from "next-connect";
import { all } from "@/middlewares/index";
import { getPosts, insertPost } from "@/db/index";
import ogs from "open-graph-scraper-lite";

const handler = nc();

handler.use(all);

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
  const posts = await getPosts(
    req.db,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 30) : undefined
  );

  if (req.query.from && posts.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of posts
    res.setHeader("cache-control", `public, max-age=${maxAge}`);
  }
  res.send({ posts });
});

handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).send("unauthenticated");
  }

  if (!req.body.source) return res.status(400).send("You must write something");
  console.log(req.body.tags);
  const post = await insertPost(req.db, {
    source: req.body.source,
    creatorId: req.user._id,
    shadowedBy: [req.user._id],
    inPlaylists: [req.body.inPlaylists],
    tags: [req.body.tags],
  });

  return res.json({ post });
});

// handler.post(async (req, res) => {
//   if (!req.user) {
//     return res.status(401).send("unauthenticated");
//   }
//   if (!req.body.source)
//     return res.status(400).send("Please enter the full path of the url");
//   //   const options = { url: req.body.source };
//   //   ogs(options).then((data) => {
//   //     const { error, result, response } = data;
//   //     // const { result } = data;
//   //     // console.log("error:", error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
//   //     //console.log("result:", result); // This contains all of the Open Graph results
//   //     //console.log("response:", response); // This contains the HTML of page
//   //
//   //     const newData = {
//   //       content: data.result.ogTitle,
//   //       source: req.body.source,
//   //       labels: req.body.labels,
//   //       creatorId: req.user._id,
//   //     };
//   //     console.log(newData);
//   //
//   //
//   //   });
//   const post = await insertPost(newData.db, {
//     source: req.body.source,
//     labels: req.body.labels,
//     creatorId: req.user._id,
//   });
//   return res.json({ post });
// });

export default handler;
