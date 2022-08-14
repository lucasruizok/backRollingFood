const User = require('../schemas/user.schema')

function getUser(req,res) {
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
            userEncontrado: user
        })
    })
}

async function createUser(req,res){
    try{

        console.log(req.body);
        let user = new User(req.body);
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
function login(req, res){
    return res.send({
        message: 'USUARIO LOGEADO'
    })
}
module.exports = {
    getUser,
    createUser,
    deleteUser,
    updateUser,
    login
}