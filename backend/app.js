const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');

app.use(bodyParser.json());
app.use('/api/auth', userRoute);

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://victorhoff:connect@cluster0.lf6hvo6.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app;



