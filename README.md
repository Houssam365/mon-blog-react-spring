# Blog App – Spécification et Backend

## 1. Description du projet

Ce projet est une application de blogging.  
Les utilisateurs peuvent :
- consulter une liste d’articles,
- voir le détail d’un article,
- rechercher des articles,
- laisser des commentaires (pour les utilisateurs connectés).

À terme, l’application proposera une authentification (inscription, connexion) et une interface web en React.

## 2. Objectifs et public cible

- **Objectif** : offrir un blog simple pour publier et lire des articles, avec recherche et commentaires.
- **Public cible** :
  - auteurs qui veulent écrire et gérer leurs articles,
  - lecteurs qui veulent découvrir des articles et les commenter.

## 3. Fonctionnalités prévues

### 3.1 Must-have (prioritaires)
- Authentification (inscription, connexion, déconnexion) via JWT.
- Affichage de la liste des articles.
- Vue détaillée d’un article.
- Commentaires sur les articles.
- Système de recherche (par titre/contenu).
- Pages statiques : À propos, Contact.

### 3.2 Nice-to-have (si temps disponible)
- Tags ou catégories d’articles.
- Pagination des articles.
- Profil utilisateur (bio, photo).
- Like des articles.

## 4. Critères de succès

Le projet sera considéré comme réussi si :
- Un utilisateur peut créer un compte, se connecter et rester connecté via un token JWT.
- Un utilisateur connecté peut créer, modifier et supprimer ses propres articles.
- Un visiteur peut voir la liste des articles et le détail d’un article.
- Un utilisateur connecté peut poster un commentaire visible immédiatement sous l’article.
- La recherche renvoie les articles contenant un mot-clé dans le titre ou le contenu.

---

## 5. Stack technique

- **Backend** : Node.js + Express.
- **Base de données** : MongoDB (mongoose).

---

## 6. Phase 1 : Mise en place initiale

- Définir clairement l’idée du projet et les fonctionnalités.
- Mettre en place le dépôt Git et la structure du projet.
- Avoir un backend Node.js/Express connecté à MongoDB, avec au minimum :
  - un serveur qui démarre,
  - une route de test qui répond,
  - une connexion MongoDB fonctionnelle.

#Installation et Prérequis

- Node.js installé
- MongoDB en local ou MongoDB Atlas
- Git avec .gitignore
- Express.js server + MongoDB connection

---

## 7. Phase 2 : Architecture & Backend avancé

### Livrables à réaliser

- Diagramme d’architecture du système (schéma montrant frontend, backend, BDD, flux principaux)
- Schéma de base de données MongoDB (User, Article, Comment, etc.)
- Design de l’API (liste des endpoints REST, ex. `POST /api/auth/register`, `GET /api/articles`, …)
- Diagramme du flux d’authentification (inscription, hash, token JWT, etc.)

### Fonctionnalités techniques à implémenter

- Endpoint d’inscription (`POST /api/auth/register`) avec hash du mot de passe (bcrypt)
- Endpoint de connexion (`POST /api/auth/login`) avec génération de JWT
- Middleware vérifiant le JWT pour l’accès aux routes protégées
- Middleware de gestion des erreurs
- Code testé via Postman (création utilisateur, login, test JWT)

### Conseils d’intégration

- Respecter la structure du projet (`/routes`, `/controllers`, `/models`, etc.)
- Documenter l’organisation des fichiers dans le README
- Indiquer comment lancer/arrêter le backend, avec ou sans données de test


