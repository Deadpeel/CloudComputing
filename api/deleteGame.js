import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    await client.connect();
    const db = client.db("cloud-computing-project");
    const collection = db.collection("games");

    const objectId = new ObjectId(id);

    const result = await collection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Jocul nu a fost gasit." });
    }

    res.status(200).json({ message: "Jocul a fost sters cu succes." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}
