# Stageopdracht: Videotheek applicatie
________________________________________
## Doel
Bouw een eenvoudige “Videotheek” webapplicatie waar gebruikers hun favoriete films kunnen opslaan. Het doel van deze opdracht is je vaardigheden te toetsen in het bouwen van een full-stack applicatie met Remix.JS, Typescript, Prisma en Tailwind CSS
________________________________________
## Features
1.	Homepage:
○	Toon een lijst van opgeslagen films met de volgende waarden:
■	Title
■	Genre
■	Release Year
■	Description 
○	Voeg een “Voeg film toe” knop toe aan de pagina
2.	Movies/new:
○	Een formulier waarmee een film kan worden opgeslagen; Sla de volgende waardes op:
■	Title (required)
■	Genre (required)
■	Release Year (required, numeric, between 1900 and the current year)
■	Description (optional)
○	Valideer al deze waarden op correctheid.
3.	Movies/{id}/edit:
○	Een formulier om de waarden bij te werken.
4.	Movies{id}/delete:
○	Een methode om een film te verwijderen.
5.	Optional Features:
○	Zoekfunctionaliteit; Zoeken op filmnaam.
○	Filterfunctie. Filteren op Release Year of Genre
________________________________________
## Technical Requirements
1.	Frontend:
○	Gebruik Remix.js voor server-side rendering en routing.
○	Gebruik TypeScript voor type safety.
○	Gebruik Tailwind CSS voor styling (responsive uiteraard). 
2.	Backend:
○	Gebruik Prisma ORM met de standaard SQLite database voor het opslaan van de data.
○	
3.	Database:
○	Use SQLite as the database.
4.	Validation:
○	Implementeer server-side validatie voor formdata in Remix loaders en/of actions.
○	Toon validatie errors op de front-end.
5.	Styling:
○	Maak een moderne en simpele ui met Tailwind CSS.
○	Zorg ervoor dat de applicatie zo veel mogelijk responsive is.
6.	Bonus Points:
○	Voeg “pagination” toe aan de lijst met films.
________________________________________
## Deliverables
1.	Code Repository:
○	Een Github repository:
■	Met alle source code.

________________________________________
## Handige links

1.	https://remix.run/docs/en/main/start/quickstart
2.	https://remix.run/docs/en/main/start/tutorial (hierin komt vrijwel alles uit deze opdracht aan bod)
3.	https://tailwindcss.com/
4.	https://www.youtube.com/watch?v=ahCwqrYpIuM - typescript getting started
5.	https://www.youtube.com/watch?v=StZt-WrI2to&list=PLXoynULbYuEApkwAGZ7U7LmL-BDHloB0l - (playlist van de maker van remix)
6.	https://www.prisma.io/docs/getting-started/quickstart-sqlite 

