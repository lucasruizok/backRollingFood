const Pedido = require ('../schemas/pedido.schema');


//Creacion de predidos
async function createPedido (req, res){
    try{
        console.log (req.body);
        let pedido = new Pedido (req.body);                                                                       
        const nuevoPedido= await pedido.save();      
        return res.send({
            message:"pedido creado correctamente " ,
            pedido: nuevoPedido
        });
    } catch(error){
        return res.send({
            message:"Error en creacion de pedido ",
            error 
        });    
    }
}

//Buscar todos los pedidos
async function getPedidos (req, res){
    let id= req.params.productId;
    try{
        if(id){
        const pedidos = await Pedido.findById(id).populate(`usuario`, {password:0})
                                                 .populate('producto.productoId') ;
        if(pedidos.lenght == 0){
            return res.send({
                message: 'No existen Pedidos',
            })
        }  
                                       
        return res.send({
            message: 'Pedidos encontrados',
            pedidos
        })
    }   else{
         const pedidos = await Pedido.find().populate(`usuario`, {password:0})
                                           // .populate('usuario.phone')
                                            .populate('producto.productoId') ;
        if(pedidos.lenght == 0){
            return res.send({
                message: 'No existen Pedidos',
            })
        }  
                                       
        return res.send({
            message: 'Pedidos encontrados',
            pedidos
        })

    } 
    }catch(error){
        return res.send({
            message: 'error al buscar pedidos',
            error
        })    
    }
}

//Actualizacion de estado pedidos por id     pedidoToUpdateID
async function updatePedido (req ,res){
    try{
        const id= req.params.pedidoToUpdateID                                       
       let pedido =await Pedido.findByIdAndUpdate(id, req.body, {new:true})                                         
        return res.send({
            message: "Actualizacion exitosa",
            pedido
        })
    }catch(error){
        return res.send({
            message: "Error obtenido en la actualizacion",
            error
        })
    }
}

async function deletePedido (req, res){
    try{
        const id = req.params.pedidoToDeleteID
        const deletePedido = await Pedido.findByIdAndDelete(id);
        return res.send({
            message:"Se borro correctamente el siguiente pedido",
            deletePedido
        })
    } catch {
        return res.send({
            message:"Error al borrar pedido"
        })
    }
}



module.exports ={
    createPedido,
    getPedidos,
    updatePedido,
    deletePedido
}