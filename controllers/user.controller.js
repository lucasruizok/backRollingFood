const User = require('../schemas/user.schema')
const bcrypt = require(`bcrypt`);   
const saltRounds = 10;              
const jwt =require ('jsonwebtoken')
const secretSeed = require('../config/config').secret
const itemsPorPagina = 5                                 //valor fijo para paginación que debe coincidir con .limit()



//Creacion de usuarios
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



//buscar todos los usuarios
async function getUsers(req,res) {
    let page = req.query.page || 0;
    

    try{
            user = await User.find({})
                             .skip(page * itemsPorPagina)  
                             .limit(itemsPorPagina) 
            if(user.length == 0){
                return res.status(200).send({
                    ok: true,
                    message: 'No existen usuarios registrados'
                })
            } 
             //bloque para paginacion
            let cantidad =  await User.find({}).countDocuments()
            console.log(`La cantidad de usuarios es de: ${cantidad}`);
            let botones = Math.ceil( cantidad / itemsPorPagina);
            console.log(`La cantidad de botones sera de: ${botones}`); 

            return res.status(200).send({
                ok: true,
                message:'Usuario encontrado exitosamente',
                message:'Limitacion de busqueda a 5 (por paginacion) ',
                users: user,
                botones: botones
            })
    }catch(error){
        return res.send({
            message: "Error obtenido en la busqueda",
            error
        })
    }
   
}

//Busqueda de usuarios por id : VER MAS
async function getUser(req,res){
    try{
        const id= req.params.userID                                             //obtengo el id desde el path
        console.log( `El id del usuario solicitado es: ${req.params.userID}` )
        let usuario =await User.findById(id)
        usuario.password=undefined;                                             // oculto el pass al front
        return res.send({
            message: "Busqueda por params exitosa",
            usuario
        })
    }catch(error){
        return res.send({
            message: "Error obtenido en la busqueda",
            error
        })
    }
   
}

//Busqueda por nombre de usuario
async function getName (req,res){
    const nombre= req.params.name;
    console.log(nombre)
    try{
        const usuario = await User.find({firstName: new RegExp(nombre,'i')})
                                  .select({password:0})
                                                            
        if(usuario.length == 0){                                           //bloque para control de arreglo vacio
            return res.send({
                message: 'No se enconto ningun usuario'
            })
        }       
        return res.send({
                message: 'busqueda por nombre exitosa',
                usuario
            })        
    } catch(error){
        return res.send({
            message: 'error al obtener usuario por nombre',
            error
        })
    }
}

//buscar todos los usuarios y los ordena por fecha de creación
async function orderByDate (req,res){
    
    try{
        const usuario = await User.find({})
                                  .sort({fecha:-1})
                                                            
        if(usuario.length == 0){                                           //bloque para control de arreglo vacio
            return res.send({
                message: 'No se enconto ningun usuario'
            })
        }       
        return res.send({
                message: 'busqueda exitosa',
                usuario
            })        
    } catch(error){
        return res.send({
            message: 'error al obtener usuarios',
            error
        })
    }
}

//Borrar usuario
async function deleteUsers (req ,res){
    try{
        console.log(req.params.userToDeleteID )
        const id= req.params.userToDeleteID                                           //obtengo el id desde el path
        console.log( `El id del usuario a borrar es: ${req.params.userToDeleteID}` )
        const deletedUser =await User.findByIdAndDelete(id)
        
        return res.send({
            message: "Se borro el siguiente usuario",
            deletedUser
            
        })
    }catch(error){
        return res.send({
            message: "Error al borrar usuario",
            error
        })
    }

}

//Actualizacion de usuarios por id
async function updateUsers (req ,res){
    try{
        console.log("ingreso updateusers")
        const id= req.params.userToUpdateID                                               //obtengo el id desde el path
        console.log( `El id del usuario a modificar es: ${req.params.userToUpdateID }` )
        
        if(req.body.password){                                                           // bloque para hash de nuevo password
            req.body.password= await bcrypt.hash(req.body.password, saltRounds)
        }
        if(!req.body.password){
            return res.send({
                message: `error al encriptar`
            })
        }

        let usuario =await User.findByIdAndUpdate(id, req.body, {new:true})
                                     
        return res.send({
            message: "Actualizacion exitosa",
            usuario
        })
    }catch(error){
        return res.send({
            message: "Error obtenido en la actualizacion",
            error
        })
    }

}


// Funcion para el login del usuario
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
    getName,
    orderByDate,
    createUser,
    deleteUsers,
    updateUsers,
    login
}