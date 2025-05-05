import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    await client.connect();
    const db = client.db("cloud-computing-project");
    const collection = db.collection("test");

    const result = await collection.insertOne(req.body);
    res.status(200).json({ insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}
