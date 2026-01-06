#!/bin/bash

# AI-ASSISTED: Gemini generated the base structure for this deployment script
# Prompt: "Script to run docker compose up and wait for services"
# Modification: Added custom ASCII art, wait animation, and seed interaction.

# Arrêter le script si une commande échoue
set -e

echo "🐳 ==================================================="
echo "   Lancement de l'application Full Stack via Docker"
echo "==================================================="

echo "🛑 Arrêt des conteneurs existants (nettoyage)..."
docker compose down

echo "🔨 Construction et démarrage des conteneurs..."
# On lance en mode détaché (-d) pour reprendre la main et lancer le seed ensuite
docker compose up -d --build

echo "⏳ Attente du démarrage de la base de données et du backend (10s)..."
run_animation() {
    local pid=$1
    local delay=0.25
    local spinstr='|/-\'
    while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
}

(sleep 10) & 
run_animation $!

echo "✅ Environnement démarré !"
echo "------------------------------------------------"
echo "🌐 Frontend : http://localhost:3000"
echo "🔌 Backend  : http://localhost:5000"
echo "------------------------------------------------"

# Peuplement automatique de la base de données
echo "🌱 Exécution du seed (données de test)..."
docker exec -it blog_backend node seed.js
echo "✨ Base de données peuplée avec succès !"

echo ""
echo "📝 Pour voir les logs, exécutez : docker compose logs -f"
echo "👋 Bon développement !"
