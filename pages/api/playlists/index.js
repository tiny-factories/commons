import nc from "next-connect";
import { all } from "@/middlewares/index";
import { getPlaylists, insertPlaylist } from "@/db/index";
import ogs from "open-graph-scraper-lite";

const handler = nc();

handler.use(all);

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
  const playlists = await getPlaylists(
    req.db,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 30) : undefined
  );

  if (req.query.from && playlists.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of playlists
    res.setHeader("cache-control", `public, max-age=${maxAge}`);
  }
  res.send({ playlists });
  // console.log("API getPlaylists Compleate:");
  // console.log(playlists);
});

handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).send("unauthenticated");
  }

  if (!req.body.name) return res.status(400).send("You must write something");
  // console.log("Working?");
  const playlist = await insertPlaylist(req.db, {
    name: req.body.name,
    creatorId: req.user._id,
  });

  return res.json({ playlist });
  // console.log("API POST Compleate:");
  // console.log(playlist);
});

export default handler;
