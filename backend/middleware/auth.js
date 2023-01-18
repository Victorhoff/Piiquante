const jwt = require('jsonwebtoken'); // Package générateur de token d'identification

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Enregistrement du token de la requête dans une variable
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Vérification du token
        const userId = decodedToken.userId; // Enregistrement de l'ID du token dans une variable
       if (req.body.userId && req.body.userId !== userId) {
            throw 'User id non valable !';
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({ error });
    }
}