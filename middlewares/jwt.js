const jwt =require ('jsonwebtoken')
const secretSeed = require('../config/config').secret

const jwtControl=(req,res,next) =>{
    const token =req.headers.authorization;
    jwt.verify (token, secretSeed, (error,decoded) => {
        if(error){
            return res.send({
                message: 'token invalido'
            })
        }
        console.log(decoded);
        next();
    }  
    )
}

module.exports = jwtControl ;