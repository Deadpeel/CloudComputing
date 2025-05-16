<h1>Proiect Cloud Computing</h1>
<h2>Game Library App</h2>
<p><strong>Autor:</strong> Ștefan Cosmin Adrian<br>
<strong>Grupa:</strong> 1134</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#link-uri">Link-uri</a></li>
  <li><a href="#introducere">Introducere</a></li>
  <li><a href="#descriere-problema">Descriere Problema</a></li>
  <li><a href="#descriere-api">Descriere API</a></li>
  <li><a href="#flux-de-date">Flux de Date</a></li>
  <li><a href="#capturi-de-ecran">Capturi de Ecran</a></li>
  <li><a href="#referinte">Referințe</a></li>
</ul>

<h2 id="link-uri">Link-uri</h2>
<ul>
  <li>Aplicație: <a href="https://proiect-cloud-puce.vercel.app">https://proiect-cloud-puce.vercel.app</a></li>
  <li>GitHub: <a href="https://github.com/Deadpeel/CloudComputing">https://github.com/Deadpeel/CloudComputing</a></li>
  <li>YouTube: <a href="https://youtu.be/wzp8xHZyAxQ">https://youtu.be/wzp8xHZyAxQ</a></li>
</ul>

<h2 id="introducere">Introducere</h2>
<p>
Utilizatorii care iubesc jocurile video nu au o modalitate ușoară de a-și organiza colecția de jocuri. Aplicația are ca scop construirea unei biblioteci personale de jocuri folosind doar titlul acestora, prin accesarea unui API extern care oferă detalii despre joc.
</p>

<h2 id="descriere-problema">Descriere Problema</h2>
<p>
Aplicația este construită cu React, Vercel și MongoDB și permite adăugarea jocurilor în bibliotecă prin nume. Detaliile sunt extrase automat folosind API-ul RAWG. Utilizatorii pot vizualiza și șterge jocurile din aplicație.
</p>

<h2 id="descriere-api">Descriere API</h2>
<h3>MongoDB Cloud</h3>
<p>
Folosit pentru stocarea persistentă a datelor. Trei rute principale:
</p>
<ul>
  <li><strong>POST</strong> – adaugă un joc</li>
  <li><strong>GET</strong> – returnează toate jocurile</li>
  <li><strong>DELETE</strong> – șterge un joc</li>
</ul>

<h3>RAWG Video Games Database API</h3>
<p>
Furnizează informații detaliate despre jocuri, precum descriere, genuri, rating etc.
</p>

<h2 id="flux-de-date">Flux de Date</h2>
<p>
1. Utilizatorul introduce numele jocului.<br>
2. Aplicația caută informații în RAWG API.<br>
3. Dacă există, se inserează în MongoDB și se afișează în interfață.<br>
4. Utilizatorul poate șterge jocuri cu un buton dedicat.
</p>

<h3>Exemple CRUD</h3>

<h4>POST</h4>
<pre>
Request:
{ "slug": "minecraft" }

Response:
{
  "insertedGame": {
    "name": "Minecraft",
    "slug": "minecraft",
    "background_image": "https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg",
    "description": " One of the most popular games of the 2010s, Minecraft allows you to rebuild…",
    "released": "2011-11-18",
    "rating": 4.5,
    "genres": ["Adventure", "Survival"]
  },
  "insertedId": "681930e618252c1ec5698372"
}
</pre>

<h4>GET</h4>
<pre>
Request: (none)

Response:
[
  {
    "insertedGame": {
      "name": "Minecraft",
      "slug": "minecraft",
      "background_image": "...",
      ...
    }
  },
  {
    "insertedGame": {
      "name": "Terraria",
      "slug": "terraria",
      "background_image": "...",
      ...
    }
  }
]
</pre>

<h4>DELETE</h4>
<pre>
Request:
{ "_id": "68192ff218252c1ec569836f" }

Response:
{ "message": "Jocul a fost sters cu succes." }
</pre>

<p>
Aplicația nu are sistem de autentificare – orice utilizator poate modifica lista.
</p>

<h2 id="capturi-de-ecran">Capturi de Ecran</h2>
<p>
1. Pagina principală cu lista de jocuri și formularul de adăugare.<br>
2. Modala cu detalii afișată la apăsarea butonului “Deschide”.
</p>

<h2 id="referinte">Referințe</h2>
<ul>
  <li><a href="https://api.rawg.io/docs/">https://api.rawg.io/docs/</a></li>
  <li><a href="https://www.mongodb.com/docs/">https://www.mongodb.com/docs/</a></li>
  <li><a href="https://vercel.com/docs">https://vercel.com/docs</a></li>
  <li><a href="https://react.dev/learn">https://react.dev/learn</a></li>
  <li><a href="https://vite.dev/guide/">https://vite.dev/guide/</a></li>
  <li><a href="https://carment.ase.ro/cc/curs/cc-1-introducere.pdf">https://carment.ase.ro/cc/curs</a></li>
</ul>
