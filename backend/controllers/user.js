const bcrypt = require('bcrypt'); // Package de hachage du mot de passe
const jwt = require('jsonwebtoken'); // Package générateur de token d'identification

const User = require('../models/User');

// Inscription et enregistrement du nouvel utilisateur dans la base de données
exports.signup = (req, res, next) => { 
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash 
      }); (user)
      user.save() // Enregistrement dans la base de données Mongoose
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(503).json({ error }));
};

// Connection de l'utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user === null) {
            res.status(401).json({ message: 'Identifiant ou mot de passe incorrect'})
        } else {
            bcrypt.compare(req.body.password, user.password) // Comparaison du mot de passe de la base de données avec celui renseigné par l'utilisateur
            .then( valid => {
                if (!valid) {
                    res.status(401).json({ message: 'Identifiant ou mot de passe incorrect'})
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign( // Création d'un token d'identification valable 24h
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    })
                }
            })
            .catch(error => res.status(500).json({ error }))
        }
    })
    .catch(error => {
        res.status(500).json({ error })
    });
};
