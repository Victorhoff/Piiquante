const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const helmet = require('helmet');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce')

const app = express();

// Connection à la base de données Mongoose
mongoose.connect('mongodb+srv://victorhoff:connect@cluster0.lf6hvo6.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Parsing des requêtes JSON 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Sécurisation des en-têtes HTTP grâce à Helmet
app.use(helmet());

// Utilisation de cross-origin pour afficher les images uploadées par les utilisateurs
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Configuration du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;



