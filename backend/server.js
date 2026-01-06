require('dotenv').config(); // Charge les variables du fichier .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/comments', require('./routes/comments'));

// Connexion à MongoDB avec retry
const connectWithRetry = () => {
  console.log('Tentative de connexion à MongoDB...');
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connexion à MongoDB réussie !');
      // Démarrage du serveur si pas déjà démarré
      if (!server) {
        server = app.listen(PORT, () => {
          console.log(`Serveur Express démarré sur le port ${PORT}`);
        });
      }
    })
    .catch((error) => {
      console.error('Erreur de connexion à MongoDB :', error.message);
      console.log('Nouvelle tentative dans 5 secondes...');
      setTimeout(connectWithRetry, 5000);
    });
};

let server = null;
connectWithRetry();

// Route de test simple (endpoint)
app.get('/', (req, res) => {
  res.send('API Express du blog est active !');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue !', error: err.message });
});
