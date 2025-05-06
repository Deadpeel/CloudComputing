Proiect Cloud Computing
Game Library App


Stefan Cosmin Adrian
Grupa 1134



Link-uri
Link către aplicație: https://proiect-cloud-puce.vercel.app
Github link: https://github.com/Deadpeel/CloudComputing
YouTube: 


Introducere

Utilizatorii care iubesc jocurile video nu au o modalitate ușoară de a-și forma și organiza colecția de jocuri într-un mod care să le ofere o experiență personalizată și interactivă. Aplicația are ca obiectiv să permită utilizatorilor să își construiască biblioteca personală, folosind doar titlul jocului, fără a fi nevoie să introducă toate informațiile manual, prin accesarea unui API extern care le furnizează aceste detalii.
Descriere Problema
Această aplicație funcționează ca o bibliotecă individuală pentru jocuri video, creată folosind React pentru partea de utilizator și Vercel plus MongoDB pentru partea de server. Utilizatorul are posibilitatea de a introduce numele jocurilor pentru a le adăuga, iar aplicația va contacta API-ul RAWG pentru a obține informații detaliate despre fiecare joc. Jocurile pot fi apoi văzute în interfața aplicației sau eliminate.

Descriere API

Aplicatia mea foloseste doua API-ui care contribuie la buna functionare a acesteia.
MongoDB Cloud
Cu ajutorul acestui API pot sa stochez datele aplicatiei extern pentru a mentine persistenta. In cadrul bazei de date am o singura colectie, respectiv games, care se ocupa cu persistenta jocurilor adaugate de utilizator.
Acest API are trei rute, prima fiind cea mentionata anterior de adaugare si este un POST. O alta r uta care este apelata de fiecare data cand pagina se incarca este ruta de GetGames care face un request catre baza de date si da fetch la toate jocurile pentru a le afisa pe pagina. O ultima ruta folosita este cea de DELETE care sterge un joc selectat din baza de date.
RAWG Video Games Database API
Acest API este folosit pentru a face un fetch la providerul de informatii despre jocuri video pentru a gasii lucruri relevante despre un joc si a le aduce in aplicatie si a le afisa pentru ca utilizatorul sa isi formeze o parere despre joc.

Flux de Date

Utilizatorul introduce numele unui joc in caseta de inserare. Acest nume este trimis catre ruta de insertGame iar in aceasta ruta se face fetch-ul catre RAWG API si se cauta in baza lor de date un joc care sa corespunda numelui scris de catre utilizator.
In caz ca nu exista nici un joc care sa corespunda numelui pus de utilizator o eroare va fi aratata user-ului si nimic nu o sa fie adaugat in baza de date. In caz contrar informatiile despre joc o sa fie aduse iar mai apoi o sa fie apelata baza de date Mongo si o sa fie inserate in baza de date pentru persistenta.
Odata ce minim un joc este introdus in baza de date lista cu jocuri se va genera in pagina si vor aparea cartonase cu aceastea. Pentru a vizualiza informatiile despre joc se va apasa butonul din dreptul cartonasului cu “Deschide”.
In caz ca utilizatorul vrea sa faca curat in biblioteca sa de jocuri poate sa stearga din acestea prin apasarea butonul “Sterge” din dreptul jocului selectat. Odata apasat se transmite id-ul jocului selectat ca si parametru la ruta deleteGame si se sterge din baza de date si dispare din lista.

Exemple pentru metodele de CRUD

POST

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

GET

Request:
Nu trimit nimic
Response:
[
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
},
{
  "insertedGame": {
    "name": "Terraria",
    "slug": "terraria",
    "background_image": "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg",
    "description": "Terraria is a 2D action adventure sandbox game, where players create…",
    "released": "2011-05-16",
    "rating": 4.07,
    "genres": [“Action”, “Indie”, “Platformer”]
  },
  "insertedId": "68192ff218252c1ec569836f"
}
]

DELETE

Request:
{ "_id": "68192ff218252c1ec569836f" }
Response:
{ "message": "Jocul a fost sters cu succes." }

Aplicatia nu foloseste autentificare si nici autorizare, oricine poate sa modifice lista de jocuri. Aceasta aplicatie este concentrata pe functionalitati, mai exact pe gestionarea jocurilor si nu are conturi.

Capturi de Ecran

Pagina principala unde apar jocurile si de unde se adauga acestea prin caseta de input din partea de sus a paginii.
 
Modala care se afiseaza in urma apasarii butonului “Deschide” pe unul dintre cartonasele cu jocuri.
 

Referinte


https://api.rawg.io/docs/

https://www.mongodb.com/docs/

https://vercel.com/docs

