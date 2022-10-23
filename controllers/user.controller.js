const User = require('../schemas/user.schema')
const bcrypt = require(`bcrypt`);
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const secretSeed = process.env.SECRET
const itemsPorPagina = 5 //valor fijo para paginación que debe coincidir con .limit()

//Creacion de usuarios
async function createUser(req, res) {
    try {
        let user = new User(req.body);
        let password = req.body.password;
        const encryptedPassword = await bcrypt.hash(password, saltRounds)
        if (!encryptedPassword) {
            return res.send({
                message: `error al encriptar`
            })
        }
        user.password = encryptedPassword
        const NewUser = await user.save();
        NewUser.password = undefined;
        return res.status(200).send({
            message: 'Usuario creado',
            user: NewUser
        })
    } catch (error) {
        return res.send({
            ok: false,
            massage: 'Error al crear usuario',
            error
        })
    }
}
//buscar todos los usuarios
async function getUsers(req, res) {
    let page = req.query.page || 0;
    try {
        user = await User.find({})
            .skip(page * itemsPorPagina)
            .limit(itemsPorPagina)
        if (user.length == 0) {
            return res.status(200).send({
                ok: true,
                message: 'No existen usuarios registrados'
            })
        }
        //bloque para paginacion
        let cantidad = await User.find({}).countDocuments()
        let botones = Math.ceil(cantidad / itemsPorPagina);
        return res.status(200).send({
            ok: true,
            message: 'Usuario encontrado exitosamente',
            message: 'Limitacion de busqueda a 5 (por paginacion) ',
            users: user,
            botones: botones
        })
    } catch (error) {
        return res.send({
            message: "Error obtenido en la busqueda",
            error
        })
    }
}
//Busqueda de usuarios por id : VER MAS
async function getUser(req, res) {
    try {
        const id = req.params.userID //obtengo el id desde el path
        let usuario = await User.findById(id)
        usuario.password = undefined; // oculto el pass al front
        return res.send({
            message: "Busqueda por params exitosa",
            usuario
        })
    } catch (error) {
        return res.send({
            message: "Error obtenido en la busqueda",
            error
        })
    }
}
//Busqueda por nombre de usuario
async function getName(req, res) {
    const nombre = req.params.name;
    let page = req.query.page || 0;
    try {
        const usuario = await User.find({
                firstName: new RegExp(nombre, 'i')
            })
            .select({
                password: 0
            })
            .skip(page * itemsPorPagina)
            .limit(itemsPorPagina)

        if (usuario.length == 0) { //bloque para control de arreglo vacio
            return res.send({
                message: 'No se enconto ningun usuario'
            })
        }
        //bloque para paginacion
        let cantidad = await User.find({
            firstName: new RegExp(nombre, 'i')
        }).countDocuments()
        let botones = Math.ceil(cantidad / itemsPorPagina);
        return res.send({
            message: 'busqueda por nombre exitosa',
            usuario,
            botones
        })
    } catch (error) {
        return res.send({
            message: 'error al obtener usuario por nombre',
            error
        })
    }
}
//buscar todos los usuarios y los ordena por fecha de creación
async function orderByDate(req, res) {
    try {
        const usuario = await User.find({})
            .sort({
                fecha: -1
            })
        if (usuario.length == 0) { //bloque para control de arreglo vacio
            return res.send({
                message: 'No se enconto ningun usuario'
            })
        }
        return res.send({
            message: 'busqueda exitosa',
            usuario
        })
    } catch (error) {
        return res.send({
            message: 'error al obtener usuarios',
            error
        })
    }
}
//Borrar usuario
async function deleteUsers(req, res) {
    try {
        const id = req.params.userToDeleteID //obtengo el id desde el path
        const deletedUser = await User.findByIdAndDelete(id)
        return res.send({
            message: "Se borro el siguiente usuario",
            deletedUser
        })
    } catch (error) {
        return res.send({
            message: "Error al borrar usuario",
            error
        })
    }
}
//Actualizacion de usuarios por id
async function updateUsers(req, res) {
    try {
        const id = req.params.userToUpdateID //obtengo el id desde el path
        if (req.body.password) { // bloque para hash de nuevo password
            req.body.password = await bcrypt.hash(req.body.password, saltRounds)
        }
        if (!req.body.password) {
            return res.send({
                message: `error al encriptar`
            })
        }
        let usuario = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        return res.send({
            message: "Actualizacion exitosa",
            usuario
        })
    } catch (error) {
        return res.send({
            message: "Error obtenido en la actualizacion",
            error
        })
    }
}
// Funcion para el login del usuario
async function login(req, res) {
    const reqemail = req.body.mail;
    const reqpassword = req.body.password;
    try {
        const usuario = await User.findOne({
            mail: reqemail
        });
        if (usuario == null) {
            return res.send({
                message: 'no existe email'
            })
        }
        const chequeaPass = await bcrypt.compare(reqpassword, usuario.password)
        if (!chequeaPass) {
            return res.send({
                message: 'password ingresado incorrecto'
            })
        }
        usuario.password = undefined;
        const token = await jwt.sign(usuario.toJSON(), secretSeed)
        return res.send({
            message: `Ingreso a login`,
            usuario,
            token
        })
    } catch (error) {
        return res.send({
            message: 'Error en proceso Login',
            error
        })
    }
}

module.exports = {
    getUsers,
    getUser,
    getName,
    orderByDate,
    createUser,
    deleteUsers,
    updateUsers,
    login
}