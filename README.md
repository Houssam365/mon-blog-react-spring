# Blog App – Phase 1 (Spécification + Backend)

## 1. Description du projet

Ce projet est une application de blogging.  
Les utilisateurs peuvent :
- consulter une liste d’articles,
- voir le détail d’un article,
- rechercher des articles,
- laisser des commentaires (pour les utilisateurs connectés).

À terme, l’application proposera une authentification (inscription, connexion) et une interface web en React.

## 2. Objectifs et public cible

- Objectif : offrir un blog simple pour publier et lire des articles, avec recherche et commentaires.
- Public cible :
  - auteurs qui veulent écrire et gérer leurs articles,
  - lecteurs qui veulent découvrir des articles et les commenter.

## 3. Fonctionnalités prévues

### 3.1 Must-have (prioritaires)

- Authentification (inscription, connexion, déconnexion) via JWT.
- Affichage de la liste des articles.
- Vue détaillée d’un article.
- Commentaires sur les articles.
- Système de recherche (par titre / contenu).
- Pages statiques : À propos, Contact.

### 3.2 Nice-to-have (si temps disponible)

- Tags ou catégories d’articles.
- Pagination des articles.
- Profil utilisateur (bio, photo).
- Like des articles.

## 4. Critères de succès

Le projet sera considéré comme réussi si :

- Un utilisateur peut créer un compte, se connecter et rester connecté via un token JWT.
- Un utilisateur connecté peut créer, modifier et supprimer ses propres articles (plus tard, phases suivantes).
- Un visiteur peut voir la liste des articles et le détail d’un article.
- Un utilisateur connecté peut poster un commentaire visible immédiatement sous l’article.
- La recherche renvoie les articles contenant un mot-clé dans le titre ou le contenu.

### Périmètre spécifique Phase 1

Pour la Phase 1, l’objectif est :

- Définir clairement l’idée du projet et les fonctionnalités.
- Mettre en place le dépôt Git et la structure du projet.
- Avoir un backend Node.js/Express connecté à MongoDB, avec au minimum :
  - un serveur qui démarre,
  - une route de test qui répond,
  - une connexion MongoDB fonctionnelle.

## 5. Stack technique

- Backend : Node.js + Express.
- Base de données : MongoDB (mongoose).


## 6. Installation (backend – Phase 1)

### 6.1 Prérequis

- Node.js installé
- MongoDB en local (ou une URL MongoDB Atlas)
- Git


