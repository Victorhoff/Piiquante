const express = require('express');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb+srv://victorhoff:connect@cluster0.lf6hvo6.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  }); console.log(3)

app.post('/api/auth/signup', (req, res) => {
    const user = new User({ 
    email: req.body.email, 
    password: req.body.password
    });

    bcrypt.hash(user.password, 10)
        .then(hash => {
        user.password = hash;
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error })); console.log(typeof(hash))
        })
        .catch(error => res.status(500).json({ error }));
});

module.exports = app;



