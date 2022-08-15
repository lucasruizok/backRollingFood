const Pedido = require ('../schemas/pedidos.schema');


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



module.exports ={
    createPedido
}