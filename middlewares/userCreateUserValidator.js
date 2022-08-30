const expressValidator = require(`express-validator`);
const body =expressValidator.body;

function userCreateUserValidator () {
    console.log("ingreso a userCreateUserValidator")
    
    return [
        body ('mail', 'Ingrese e-mail correcto').isEmail(),
        body ('password', 'La cantidad de caracteres minimos es 3'). isLength({min: 4}),
        body ('age', 'El campo edad debe ser numérico').isNumeric()
    ]
}

module.exports= userCreateUserValidator;
