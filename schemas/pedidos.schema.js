const mongoose = require (`mongoose`);
const Schema = mongoose.Schema;
 
const estados=[ `PENDIENTE`, `REALIZADO`];

const PedidoSchema =new Schema({
        usuario: {type: String , ref:`User` ,required:true},
        fecha: {type: Date, default:Date.now,required:true},
        producto:[
            {
            productoId: {type: String, ref: `Product`},
            cantidad: {type: Number},
            precio: {type: Number}
            }
        ] ,
        estado: {type: String, enum: estados, default:`PENDIENTE`}           
 })


 module.exports =mongoose.model('Pedido',PedidoSchema);