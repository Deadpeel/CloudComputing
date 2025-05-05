import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const RAWG_API_KEY = process.env.RAWG_API_KEY;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=${RAWG_API_KEY}`);
    if (!response.ok) {
      return res.status(404).json({ error: "Jocul nu a fost gasit in RAWG API" });
    }

    const gameData = await response.json();

    const gameToInsert = {
      name: gameData.name,
      slug: slug,
      background_image: gameData.background_image,
      description: gameData.description_raw,
      released: gameData.released,
      rating: gameData.rating,
      genres: gameData.genres.map(g => g.name),
    };

    await client.connect();
    const db = client.db("cloud-computing-project");
    const collection = db.collection("games");

    const result = await collection.insertOne(gameToInsert);

    res.status(200).json({ insertedId: result.insertedId, insertedGame: gameToInsert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}
