const User = require('../models/user');
console.log('4')
const bcrypt = require('bcrypt');

exports.signup = (req, res, next => {
    bcrypt.hash(req.body.password)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
});
console.log('5')
exports.login = (req, res, next => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user === null) {
            res.status(401).json({ message: 'Identifiant ou mot de passe incorrect'})
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then( valid => {
                if (!valid) {
                    res.status(401).json({ message: 'Identifiant ou mot de passe incorrect'})
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token : 'TOKEN'
                    })
                }
            })
            .catch(error => res.status(500).json({ error }))
        }
    })
    .catch(error => {
        res.status(500).json({ error })
    });
});
