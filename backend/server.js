require('dotenv').config(); // Charge les variables du fichier .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connexion à MongoDB réussie !');
    // Démarrage du serveur une fois la connexion DB établie
    app.listen(PORT, () => {
      console.log(`Serveur Express démarré sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error.message);
  });

// Route de test simple (endpoint)
app.get('/', (req, res) => {
  res.send('API Express du blog est active !');
});
