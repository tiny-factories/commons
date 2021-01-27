import { connectToDatabase } from '../../util/mongodb';

export default async function getResult(req, res) {
  // conect to database
  const { db } = await connectToDatabase();

  const { term } = req.query;

  const data = await db
    .collection('posts')
    .aggregate([
      {
        $search: {
          search: {
            query: term,
            path: ['content', 'source', 'labels'],
          },
        },
      },
      {
        $limit: 20,
      },
    ])
    .toArray();

  res.status(200).json(data);
}
