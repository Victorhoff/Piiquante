const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://victorhoff:connect@cluster0.lf6hvo6.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
  }); console.log(3)

app.use(express.json());

app.use('/api/auth', userRoutes);

module.exports = app;



