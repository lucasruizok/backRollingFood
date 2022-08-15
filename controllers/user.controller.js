const User = require('../schemas/user.schema')
const bcrypt = require(`bcrypt`);   
const saltRounds = 10;              
const jwt =require ('jsonwebtoken')
const secretSeed = require('../config/config').secret


function getUsers(req,res) {
    User.find({}, (error, user) =>{
        if(error){
            return res.status(500).send({
                ok: false,
                message:'Error al buscar el usuario '
            })
        }
        if(user.length == 0){
            return res.status(200).send({
                ok: true,
                message: 'No existen usuarios registrados'
            })
        }
        return res.status(200).send({
            ok: true,
            message:'Usuario encontrado exitosamente',
            users: user
        })
    })
}
async function getUser(req,res){
    console.log(req.params);
    const id = req.params.userID
    const user = await User.findById(id);
    console.log(`EL usuario encontrado es ${user}`)
    if(!user) return res.status(200).send({
        ok:false,
        message:'No se encontró ningun usuario'
    })
    return res.send({
        ok: true,
        message:'Usuario especifico',
        user
    })
}
async function createUser(req,res){
    try{
        console.log(req.body);
        let user = new User(req.body);

        let password = req.body.password;
        const encryptedPassword = await bcrypt.hash(password, saltRounds) 
        if(!encryptedPassword){
            return res.send({
                message: `error al encriptar`
            })
        }
        console.log( `pass encriptado: ${encryptedPassword}`)
        user.password = encryptedPassword

        console.log(user);
        const NewUser = await user.save();
        NewUser.password = undefined;
        console.log('Nuevo usuario', NewUser);
        return res.status(200).send(
            {
                message: 'USUARIO CREADO',
                user: NewUser
            }
        )
    } catch(error){
        console.log('error al crear usuario');
        return res.send({
            ok:false,
            massage:'Error al crear usuario',
            error
        })
    }
}

function deleteUser(req,res) {
    return res.status(200).send(
        {
            message: 'USUARIO ELIMINADO'
        }
    )
}

function updateUser(req,res) {
    return res.status(200).send(
        {
            message: 'USUARIO ACTUALIZAD'
        }
    )
}


// Funcion para el loguin del usuario
async function login (req, res){ 
    const reqemail= req.body.mail;
    const reqpassword= req.body.password;
    console.log(`email= ${reqemail} y pass= ${reqpassword}`);   
    try{
        const usuario = await User.findOne( {mail:reqemail});
    if( usuario == null){
        return res.send({
            message: 'no existe email'
        })
    }
    const chequeaPass = await bcrypt.compare (reqpassword, usuario.password)
    if (! chequeaPass){
        return res.send ({
            message: 'password ingresado incorrecto'
        })
    }
    usuario.password= undefined;
    const token= await jwt.sign (usuario.toJSON(),secretSeed)
    console.log(token)
    return res.send ({
        message: `Ingreso a login`,
        usuario,
        token
    })
    } catch(error){
        return res.send({
            message: 'Error en proceso Login',
            error
        })
    }
    
}



module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    login
}