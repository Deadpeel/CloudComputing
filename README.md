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
Utilizatorii care iubesc jocurile video nu au o modalitate ușoară de a-și forma și organiza colecția de jocuri într-un mod care să le ofere o experiență personalizată și interactivă. Aplicația are ca obiectiv să permită utilizatorilor să își construiască biblioteca personală, folosind doar titlul jocului, fără a fi nevoie să introducă toate informațiile manual, prin accesarea unui API extern care le furnizează aceste detalii.
</p>

<h2 id="descriere-problema">Descriere Problema</h2>
<p>
Această aplicație funcționează ca o bibliotecă individuală pentru jocuri video, creată folosind React pentru partea de utilizator și Vercel plus MongoDB pentru partea de server. Utilizatorul are posibilitatea de a introduce numele jocurilor pentru a le adăuga, iar aplicația va contacta API-ul RAWG pentru a obține informații detaliate despre fiecare joc. Jocurile pot fi apoi văzute în interfața aplicației sau eliminate. 
O problema pe care si eu am intampinat-o este sa nu pot sa recomand cuiva unui joc pentru ca nu imi amintesc pe moment ce am jucat. O buna metoda de a tine evidenta acestora si de a le organiza intr-o librarie este aplicatia prezentata. Cu o astfel de aplicatie fiecare persoana care vrea sa caute un joc nou pe care vrea sa il joace poate sa acceseze libraria si sa afle informatii despre jocurile dorite precum genurile acesuita, descriera sau rating-ul.
</p>

<h2 id="descriere-api">Descriere API</h2>
<h3>MongoDB Cloud</h3>
<p>
Folosit pentru stocarea persistentă a datelor. Trei rute principale:
</p>
<p>
Cu ajutorul acestui API pot sa stochez datele aplicatiei extern pentru a mentine persistenta. In cadrul bazei de date am o singura colectie, respectiv games, care se ocupa cu persistenta jocurilor adaugate de utilizator.
Acest API are trei rute, prima fiind cea mentionata anterior de adaugare si este un POST. O alta r uta care este apelata de fiecare data cand pagina se incarca este ruta de GetGames care face un request catre baza de date si da fetch la toate jocurile pentru a le afisa pe pagina. O ultima ruta folosita este cea de DELETE care sterge un joc selectat din baza de date.
</p>

<h3>RAWG Video Games Database API</h3>
<p>
Acest API este folosit pentru a face un fetch la providerul de informatii despre jocuri video pentru a gasii lucruri relevante despre un joc si a le aduce in aplicatie si a le afisa pentru ca utilizatorul sa isi formeze o parere despre joc.
</p>

<h2 id="flux-de-date">Flux de Date</h2>
<p>
Utilizatorul introduce numele unui joc in caseta de inserare. Acest nume este trimis catre ruta de insertGame iar in aceasta ruta se face fetch-ul catre RAWG API si se cauta in baza lor de date un joc care sa corespunda numelui scris de catre utilizator.
In caz ca nu exista nici un joc care sa corespunda numelui pus de utilizator o eroare va fi aratata user-ului si nimic nu o sa fie adaugat in baza de date. In caz contrar informatiile despre joc o sa fie aduse iar mai apoi o sa fie apelata baza de date Mongo si o sa fie inserate in baza de date pentru persistenta.
Odata ce minim un joc este introdus in baza de date lista cu jocuri se va genera in pagina si vor aparea cartonase cu aceastea. Pentru a vizualiza informatiile despre joc se va apasa butonul din dreptul cartonasului cu “Deschide”.
In caz ca utilizatorul vrea sa faca curat in biblioteca sa de jocuri poate sa stearga din acestea prin apasarea butonul “Sterge” din dreptul jocului selectat. Odata apasat se transmite id-ul jocului selectat ca si parametru la ruta deleteGame si se sterge din baza de date si dispare din lista.
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
  ![Poza1](photos/Poza1.jpg)
2. Modala cu detalii afișată la apăsarea butonului “Deschide”.
  ![Poza2](photos/Poza2.jpg)
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
