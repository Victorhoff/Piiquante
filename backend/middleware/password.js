const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(50)                                  // Maximum length 50
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                // Must have at least 1 digit

// Vérification de la force du mot de passe 

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)){
        next()
    } else {
        return res
        .status(400)
        .json({error : `Le mot de passe n'est pas valide ${passwordSchema.validate(req.body.password, {list : true})}`})
    }
}