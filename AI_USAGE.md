# Déclaration d'Utilisation de l'IA - BlogTester

Équipe : Houssam Syouti
Date : 06-01-2026

## Déclaration

Nous reconnaissons l'utilisation d'outils d'IA générative dans ce projet comme détaillé ci-dessous. Tout le code généré par l'IA a été revu, testé et compris avant intégration.

## Outils d'IA Utilisés

### Outil 1 : Google Gemini

Dates : 06-01-2026
Objectif : Automatisation du déploiement local et génération de données de test.

**Prompt :**
> "Crée un script bash pour lancer docker compose et vérifier que les services sont prêts. Écris aussi un script seed.js pour MongoDB pour peupler les utilisateurs et les articles."

**Résultat de l'IA :**
La structure initiale de `run.sh` (gestion des vérifications de processus) et `backend/seed.js` (utilisation de crypto et tableaux prédefinis).

**Mes Modifications :**
J'ai ajusté les chaînes de connexion à la base de données pour qu'elles fonctionnent dans le réseau Docker, personnalisé la structure spécifique des données des articles pour correspondre à mon schéma Mongoose, et ajouté la logique d'animation spécifique dans le script shell.

**Vérification :**
**Comment j'ai testé ce code :** J'ai lancé le script dans un environnement propre plusieurs fois pour m'assurer que l'installation des dépendances et le séquençage des conteneurs fonctionnaient correctement. J'ai utilisé MongoDB Compass pour vérifier que les données de test étaient bien insérées.
**Ce que j'ai appris :** J'ai appris à utiliser `trap` en bash pour nettoyer les processus enfants et comment gérer le remplissage asynchrone de la base de données en Node.js.

### Outil 2 : ChatGPT / Assistant LLM

Utilisé tout au long du projet pour : Problèmes spécifiques de typage TypeScript et réactivité Tailwind CSS.

**Exemples d'assistance de l'IA :**

1.  **Interfaces TypeScript (`types.ts`)**
    *   **Avant :** J'avais du mal à définir l'Interface pour les champs peuplés (utilisateur dans article).
    *   **Après :** L'IA a suggéré de créer un type union `string | User` pour les champs qui pourraient être peuplés ou simplement des IDs.

2.  **Classes Responsives Tailwind (`Navbar.tsx`)**
    *   **Contexte :** Rendre le menu responsive sur mobile.
    *   **Assistance :** L'IA a suggéré d'utiliser `hidden md:flex` et le positionnement absolu pour le menu déroulant mobile.

**Ma contribution originale :** 95% de la logique frontend (gestion d'état, effets, appels API) est mon propre travail. Je n'ai consulté l'IA que pour des blocages syntaxiques spécifiques.

## Attribution du Code

Toutes les sections de code assistées par l'IA sont marquées dans la source avec des commentaires :

**Exemple dans `run.sh` :**
```bash
# AI-ASSISTED: Gemini generated the base structure for this deployment script
# Prompt: "Script to run docker compose up and wait for services"
# Modification: Added custom ASCII art and seed prompt
```

**Exemple dans `backend/seed.js` :**
```javascript
// AI-ASSISTED: Gemini provided the scaffolding for connecting and clearing the DB
// Prompt: "Node.js script to connect to mongo and delete all collections"
```

## Évaluation Globale

**Pourcentage du projet écrit par l'IA :** ~10%
**Pourcentage du projet écrit par l'équipe :** ~90%

**Comment l'IA a amélioré l'apprentissage :**
L'IA a agi comme un "accélérateur StackOverflow". Au lieu de chercher pendant des heures comment centrer une div ou typer un événement spécifique en TypeScript, je pouvais obtenir un exemple de syntaxe immédiatement. Cependant, la logique centrale de l'authentification (Context API) et l'architecture backend sont implémentées manuellement pour garantir ma compréhension du flux full stack.
