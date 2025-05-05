export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("cloud-computing-project");
    const collection = db.collection("games");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Jocul nu a fost gasit." });
    }

    res.status(200).json({ message: "Jocul a fost sters cu succes." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
