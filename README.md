# BlogTester - Projet Full Stack

## Équipe
- Houssam Syouti

## Description
Projet Lab V - Développement Full Stack.
Ceci est une plateforme de blog complète offrant :
- **Accès Public** : Parcourir, rechercher et lire des articles avec un contenu enrichi en Markdown.
- **Accès Membre** : Authentification sécurisée (JWT), création/édition d'articles, publication de commentaires et gestion du profil utilisateur.
- **Stack Technique** : React (Vite+Context+Tailwind), Node.js (Express), MongoDB.

## Prérequis
- **Docker** & **Docker Compose** (Méthode recommandée)
- *Alternativement* : Node.js v18+ & MongoDB v6+ (pour une installation manuelle)

## Installation & Démarrage Rapide

Le projet inclut un script automatisé pour tout gérer (construction, lancement, peuplement de la base de données).

### 1. Démarrer l'application
Ouvrez votre terminal à la racine du projet et exécutez :

```bash
# Rendre le script exécutable (première fois uniquement)
chmod +x run.sh

# Lancer le projet
./run.sh
```

Cette commande va :
1. Nettoyer les conteneurs existants.
2. Construire et démarrer toute la stack (Frontend, Backend, Base de données).
3. Peupler automatiquement la base de données avec des données de test.

### 2. Accéder à l'application
- **Frontend** : http://localhost:3000
- **API Backend** : http://localhost:5000

---

## Spécifications Détaillées

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
- **Frontend** : React + Tailwind CSS.

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


---

## 8. Phase 3 : Frontend & Intégration

### Fonctionnalités réalisées

- Mise en place de l'environnement frontend avec React et Tailwind CSS.
- Configuration du routing de l'application (React Router) pour la navigation entre les pages (Accueil, Login, Register, Détail Article, Éditeur).
- Implémentation du système d'authentification complet :
  - Création du contexte `AuthContext` pour la gestion globale de l'état utilisateur.
  - Formulaires de connexion et d'inscription connectés à l'API.
  - Gestion du stockage sécurisé et de la persistance du JWT (localStorage).
  - Protection des routes privées (ex: création/édition d'articles) via un composant `ProtectedRoute`.
- Développement de la couche service (`api.ts`) pour centraliser les appels API et injecter automatiquement le token d'autorisation dans les headers.
- Création des interfaces utilisateur pour le CRUD des articles :
  - Affichage de la liste des articles sur la page d'accueil.
  - Page de lecture détaillée d'un article.
  - Interface d'écriture et d'édition d'articles.
  - Suppression d'articles pour les propriétaires.
- Intégration du système de commentaires :
  - Affichage des commentaires sous les articles.
  - Formulaire d'ajout de commentaire (réservé aux utilisateurs connectés).
  - Suppression de commentaires.
- Gestion UX : Feedback visuel lors des chargements (loading states) et gestion des erreurs API.

---

## 9. Phase 4 : Améliorations & UX

### Fonctionnalités réalisées

- **Support Markdown Complet** :
  - Intégration de `react-markdown` et `remark-gfm` pour le rendu riche du contenu.
  - Support des titres, listes, code blocks, tables, gras, italique, etc. dans les articles et commentaires.
  - *Note* : Les titres des articles dans les listes restent en texte brut pour préserver la mise en page.
- **Page de Profil Utilisateur** :
  - Nouvelle route `/profile` protégée.
  - Affichage centralisé de tous les articles rédigés par l'utilisateur connecté.
  - Barre latérale listant l'historique des commentaires de l'utilisateur avec liens vers les articles concernés.
- **Design Responsive (Mobile First)** :
  - Adaptation complète de l'interface pour les écrans mobiles, tablettes et bureaux.
  - **Navbar** : Menu "Hamburger" sur mobile, navigation complète sur desktop.
  - **Grilles** : Passage automatique de 1 à 3 colonnes pour les articles selon la taille de l'écran.
  - **Ajustements** : Marges et espacements optimisés pour le tactile sur mobile.
- **Données de Test (Seeding)** :
  - Script `backend/seed.js` pour peupler la base de données avec des utilisateurs, articles et commentaires réalistes utilisant la syntaxe Markdown.
- **Améliorations Diverses** :
  - Affichage de l'auteur des articles et commentaires.
  - Lien vers le profil ajouté dans la barre de navigation.
- **Expérience Utilisateur (UX) & Identité** :
  - **Confirmation de suppression** : Remplacement des alertes natives du navigateur par une modale React esthétique et non-bloquante pour la suppression d'articles et de commentaires.
  - **Identité Visuelle** : Création et intégration d'un logo personnalisé pour l'application, visible notamment en tant que Favicon.
- **DevOps & Déploiement** :
  - **Dockerisation Complète** : Configuration `docker-compose.yml` pour orchestrer le Backend, le Frontend (Nginx) et MongoDB.
  - **Script de Lancement Automatisé** : Script `run.sh` interactif permettant de lancer l'environnement complet et de peupler la base de données (seed) en une seule commande.
  - **Robustesse Backend** : Implémentation d'une logique de reconnexion automatique à MongoDB pour gérer les délais de démarrage des conteneurs.