import { nanoid } from "nanoid";

export async function getPlaylists(db, from = new Date(), by, limit) {
  return db
    .collection("playlists")
    .find({
      // Pagination: Fetch playlist from before the input date or fetch from newest
      ...(from && {
        createdAt: {
          $lte: from,
        },
      }),
      ...(by && { creatorId: by }),
    })
    .sort({ createdAt: -1 })
    .limit(limit || 10)
    .toArray();
  console.log("getPlaylists Running");
}

export async function insertPlaylist(db, { name, creatorId }) {
  return db
    .collection("playlists")
    .insertOne({
      _id: nanoid(12),
      name,
      description: "",
      creatorId,
      posts: [],
      team: [],
      shadowedBy: [],
      visible: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
  console.log("insertPlaylists Running");
}
