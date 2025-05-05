import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const RAWG_API_KEY = process.env.RAWG_API_KEY;
const client = new MongoClient(uri);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("cloud-computing-project");
    const collection = db.collection("games");

    const { slug } = req.body;

    const searchRes = await fetch(`https://api.rawg.io/api/games?search=${slug}&key=${RAWG_API_KEY}`);
    console.log("Request URL:", `https://api.rawg.io/api/games?search=${slug}&key=${RAWG_API_KEY}`);
    const searchData = await searchRes.json();

    if (!searchData.results || searchData.results.length === 0) {
      return res.status(404).json({ error: "Jocul nu a fost gasit." });
    }

    const actualSlug = searchData.results[0].slug;

    const rawgRes = await fetch(`https://api.rawg.io/api/games/${actualSlug}?key=${RAWG_API_KEY}`);
    const gameData = await rawgRes.json();

    const gameToInsert = {
      name: gameData.name,
      slug: actualSlug,
      background_image: gameData.background_image,
      description: gameData.description_raw,
      released: gameData.released,
      rating: gameData.rating,
      genres: gameData.genres.map((g) => g.name),
    };

    const result = await collection.insertOne(gameToInsert);
    res.status(200).json({ insertedGame: gameToInsert, insertedId: result.insertedId });

  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}