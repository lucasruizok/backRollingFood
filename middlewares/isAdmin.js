// Archivo creado para comprobar rol del usuario en el llamado a un endpoint

function isAdmin (req,res,next){

    if(req.user.role == 'Administrador'){
        next();
    }else {
        return res.send({
            message: 'No tiene permisos para ejecutar esta acción'
            
        })
    }
}

module.exports = isAdmin;