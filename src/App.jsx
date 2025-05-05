import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [games, setGames] = useState([]);
  const [input, setInput] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetch("/api/getGames")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Eroare la fetch:", err));

      //mock

      // setGames([
      //   { name: "Witcher", id: 1 },
      //   { name: "Dishonored", id: 2 }
      // ]);
  }, []);
  
  const handleDelete = async (id) => {
    const res = await fetch(`/api/deleteGame?id=${id}`, { method: "DELETE" });
    const result = await res.json();
    if (res.ok) {
      setGames(games.filter((game) => game._id !== id));
    } else {
      alert("Nu s-a putut sterge jocul.");
      console.error(result);
    }
  };

  const handleAddGame = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("/api/insertGame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: input.trim() }),
      });

      const result = await res.json();

      if (res.ok && result.insertedGame) {
        setGames((prev) => [...prev, result.insertedGame]);
        setInput("");
      } else {
        alert("Nu s-a putut adauga jocul.");
      }
    } catch (err) {
      console.error("Eroare la insert:", err);
    }
  };
  
  const openModal = (game) => setSelectedGame(game);
  const closeModal = () => setSelectedGame(null);

  return (
    <>
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Introdu numele jocului"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "0.5rem", width: "300px", marginRight: "1rem" }}
        />
        <button onClick={handleAddGame}>Adauga joc</button>
      </div>

      <div className="library-container">
        <h1>Biblioteca Mea de Jocuri</h1>
        <div className="game-grid">
          {games.map((game) => (
            <div className="game-card" key={game.id}>
              <img src={game.background_image} alt={game.name} />
              <h3>{game.name}</h3>
              <button onClick={() => handleDelete(game.id)}>Sterge</button>
              <button onClick={() => openModal(game)}>Deschide</button>
            </div>
          ))}
        </div>
      </div>

      {selectedGame && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedGame.name}</h2>
            <img src={selectedGame.background_image} alt={selectedGame.name} />
            <p><strong>Descriere:</strong> {selectedGame.description}</p>
            <p><strong>Data lansarii:</strong> {selectedGame.released}</p>
            <p><strong>Rating:</strong> {selectedGame.rating}</p>
            <p><strong>Genuri:</strong> {selectedGame.genres.join(', ')}</p>
            <button onClick={closeModal}>Inchide</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
