const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        console.log(hash)
        const user = new User({ 
          email: req.body.email, 
          password: hash
        })
        user.save()
          .then(() => res.status(200).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
          console.log(user)
    })
  };
  