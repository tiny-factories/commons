import { nanoid } from "nanoid";

export async function getTags(db, from = new Date(), by, limit) {
  return db
    .collection("tags")
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
  console.log("getTags Running");
}

export async function insertTag(db, { name, creatorId }) {
  return db
    .collection("tags")
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
  console.log("insertTags Running");
}
