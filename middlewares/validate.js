const expressValidator = require(`express-validator`);
const validationResult =expressValidator.validationResult; 

const validate= (req,res,netx) =>{
    const error = validationResult(req);
    if (error.isEmpty()){
        netx();
    }else{
        const extractedErrors = error.array().map(err => {
            console.log(err);
            return {
                [err.param] :err.msg
            }
        })
        return res.send ({
            errors: extractedErrors
        })
    }

}

module.exports = validate