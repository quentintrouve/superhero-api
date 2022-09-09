# TP API

Lien : https://superhero-app.netlify.app/

## Installation

```
npm install
npm run dev
```

## But de l'application en une phrase

Créer sa propre Team de Super Héros en combinant les différentes caractéristiques

## URL de l'API utilisée

https://superheroapi.com/index.html

## Liste des routes sollicitées

- https://superheroapi.com/api/access-token/search/name
  -> Permet la recherche par nom
  -> Renvoi toutes les données du héro

## Fonctionnement détaillé de l'application

[ Toutes les actions possibles sont caractérisées par la couleur rouge ]

- Recherche d'un super héro par son nom via une barre de recherche.
- Le bouton loupe lance la recherche.
- Une fois la recherche lancée, le bouton loupe et 'Ajouter à ma team' se désactivent le temps de la réponse.
- Une fois la recherche effectuée, une carte regroupant les caractéristiques du super héro s'affiche.
- Le bouton contenant un chevron plein permet d'ouvrir le volet contenant l'image du super héro.
  -> Ce même volet sur la carte 'Ma Team' contient au fur et à mesure les images des héros ajoutés à la Team.
- Le bouton 'Ajouter à ma Team' permet d'ajouter un nouveau Super à sa Team.
- Les caractéristiquent s'ajoutent à celles des héros déjà présents dans la Team.
- Le bouton 'Rafraîchir ma Team' permet de mettre à zéro sa Team sans reload la page.
- Le bouton 'Tous les héros' renvoi sur la page qui liste tous les héros présents dans l'API.
- Clic sur le titre recharge index.html.
